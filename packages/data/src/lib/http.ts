export interface HttpOptions {
  headers?: Record<string, string>;
  /** Query-Parameter; undefined-Werte werden ausgelassen. */
  query?: Record<string, string | number | undefined>;
  timeoutMs?: number;
}

/**
 * Holt JSON mit Timeout und klarer Fehlermeldung. Validierung der Form passiert
 * danach mit Zod (an der Systemgrenze) — siehe docs/05-data-pipeline.md.
 */
export async function getJson<T = unknown>(baseUrl: string, options: HttpOptions = {}): Promise<T> {
  const url = new URL(baseUrl);
  for (const [key, value] of Object.entries(options.query ?? {})) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 20_000);

  try {
    const response = await fetch(url, {
      headers: { accept: 'application/json', ...options.headers },
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText} für ${url.href}`);
    }
    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

export interface PostFormOptions {
  headers?: Record<string, string>;
  /** Formularfelder (x-www-form-urlencoded); undefined-Werte werden ausgelassen. */
  form: Record<string, string | number | undefined>;
  timeoutMs?: number;
}

/**
 * POST mit `application/x-www-form-urlencoded`-Body und JSON-Antwort, mit Timeout
 * und klarer Fehlermeldung. Für APIs, die Parameter im Body erwarten (z. B. das
 * GENESIS-Webservice von Destatis). Validierung danach mit Zod an der Grenze.
 */
export async function postForm<T = unknown>(url: string, options: PostFormOptions): Promise<T> {
  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(options.form)) {
    if (value !== undefined) body.set(key, String(value));
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 30_000);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
        ...options.headers,
      },
      body,
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText} für ${url}`);
    }
    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

/** Holt rohen Text (z. B. RSS/XML). */
export async function getText(url: string, headers: Record<string, string> = {}): Promise<string> {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText} für ${url}`);
  }
  return response.text();
}
