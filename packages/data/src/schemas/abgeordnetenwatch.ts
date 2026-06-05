/**
 * Zod-Schemas für die abgeordnetenwatch.de-API v2 (www.abgeordnetenwatch.de/api/v2).
 * Wir validieren nur die Felder, die wir tatsächlich nutzen, und lassen den Rest
 * via `.passthrough()` unangetastet. Die API ist keyless und CC0-lizenziert; sie
 * republiziert die amtlichen namentlichen Abstimmungen des Deutschen Bundestags.
 */
import { z } from 'zod';

const pollSchema = z
  .object({
    id: z.number(),
    label: z.string(),
    field_poll_date: z.string().nullish(),
  })
  .passthrough();

// abgeordnetenwatch liefert `fraction` bei Stimmen ohne Fraktion teils als `[]`
// statt `null` → leeres Array zu null normalisieren, bevor validiert wird.
const fractionField = z.preprocess(
  (value) => (Array.isArray(value) ? null : value),
  z.object({ id: z.number(), label: z.string() }).passthrough().nullish(),
);

const voteSchema = z
  .object({
    /** "yes" | "no" | "abstain" | "no_show" (weitere Werte werden ignoriert). */
    vote: z.string(),
    fraction: fractionField,
  })
  .passthrough();

const listResponseSchema = z
  .object({
    meta: z
      .object({
        result: z
          .object({ total: z.number().nullish(), count: z.number().nullish() })
          .passthrough(),
      })
      .passthrough(),
    data: z.array(pollSchema),
  })
  .passthrough();

const pollWithVotesSchema = z
  .object({
    data: pollSchema
      .extend({
        related_data: z
          .object({ votes: z.array(voteSchema) })
          .passthrough()
          .nullish(),
      })
      .passthrough(),
  })
  .passthrough();

export type AwPoll = z.infer<typeof pollSchema>;
export type AwVote = z.infer<typeof voteSchema>;

/** Validiert eine Polls-Listenantwort (mit `meta.result.total` für die Pagination). */
export function parsePollList(json: unknown): z.infer<typeof listResponseSchema> {
  return listResponseSchema.parse(json);
}

/** Validiert eine einzelne Abstimmung samt `related_data.votes`. */
export function parsePollWithVotes(json: unknown): z.infer<typeof pollWithVotesSchema> {
  return pollWithVotesSchema.parse(json);
}
