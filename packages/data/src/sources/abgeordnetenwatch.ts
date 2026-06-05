import { getJson } from '../lib/http';
import { parsePollList, parsePollWithVotes, type AwPoll } from '../schemas/abgeordnetenwatch';

/**
 * Adapter für die abgeordnetenwatch.de-API v2 — namentliche Abstimmungen ("polls")
 * des Bundestags samt Einzelstimmen ("votes"). Keyless, CC0; Urquelle sind die
 * amtlichen namentlichen Abstimmungen des Deutschen Bundestags (bundestag.de/abstimmung).
 *
 * Faire Nutzung: die API erlaubt 30 Requests/Minute pro IP → wir drosseln per Default.
 */
const BASE_URL = 'https://www.abgeordnetenwatch.de/api/v2';

/** Eine Einzelstimme, bereits auf die Transform-Form normalisiert. */
export interface NormalizedVote {
  /** Fraktionslabel der API (z. B. "SPD (Bundestag 2021 - 2025)") oder null. */
  fraktion: string | null;
  /** Roher Vote-Wert ("yes" | "no" | "abstain" | "no_show" | …). */
  vote: string;
}

export interface PollWithVotes {
  id: number;
  titel: string;
  /** ISO-Datum (YYYY-MM-DD) oder null. */
  datum: string | null;
  votes: NormalizedVote[];
}

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/** Wiederholt einen Request bei transienten Fehlern (Netz/429) mit linearem Backoff. */
async function withRetry<T>(fn: () => Promise<T>, retries = 3, baseDelayMs = 1500): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < retries) await sleep(baseDelayMs * (attempt + 1));
    }
  }
  throw lastError;
}

/** Alle Abstimmungen einer Legislaturperiode (`field_legislature`), über Pagination gesammelt. */
export async function fetchPolls(legislatureId: number, pagerLimit = 100): Promise<AwPoll[]> {
  const all: AwPoll[] = [];
  for (let page = 0; page < 50; page++) {
    const json = await withRetry(() =>
      getJson(`${BASE_URL}/polls`, {
        query: {
          field_legislature: legislatureId,
          pager_limit: pagerLimit,
          page,
          sort_by: 'field_poll_date',
          sort_direction: 'asc',
        },
      }),
    );
    const parsed = parsePollList(json);
    all.push(...parsed.data);
    const total = parsed.meta.result.total ?? all.length;
    if (parsed.data.length === 0 || all.length >= total) break;
  }
  return all;
}

/** Eine Abstimmung samt Einzelstimmen (`related_data=votes`). */
export async function fetchPollVotes(pollId: number): Promise<PollWithVotes> {
  const json = await withRetry(() =>
    getJson(`${BASE_URL}/polls/${pollId}`, {
      query: { related_data: 'votes' },
    }),
  );
  const { data } = parsePollWithVotes(json);
  const votes = (data.related_data?.votes ?? []).map((vote) => ({
    fraktion: vote.fraction?.label ?? null,
    vote: vote.vote,
  }));
  return {
    id: data.id,
    titel: data.label,
    datum: data.field_poll_date ?? null,
    votes,
  };
}

export interface FetchAllOptions {
  /** Pause zwischen den Einzel-Requests in ms (Default 2100 ≈ 28 Requests/Min.). */
  delayMs?: number;
  /** Fortschritts-Callback (z. B. für stderr-Logging). */
  onProgress?: (done: number, total: number) => void;
}

/**
 * Lädt alle Abstimmungen einer Periode samt Stimmen — gedrosselt, der Reihe nach.
 * Bewusst sequentiell, um das Rate-Limit (30/Min.) sicher einzuhalten.
 */
export async function fetchAllPollsWithVotes(
  legislatureId: number,
  options: FetchAllOptions = {},
): Promise<PollWithVotes[]> {
  const polls = await fetchPolls(legislatureId);
  const delayMs = options.delayMs ?? 2100;
  const result: PollWithVotes[] = [];
  for (let i = 0; i < polls.length; i++) {
    const poll = polls[i];
    if (!poll) continue;
    result.push(await fetchPollVotes(poll.id));
    options.onProgress?.(i + 1, polls.length);
    if (i < polls.length - 1) await sleep(delayMs);
  }
  return result;
}
