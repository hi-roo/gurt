import { z } from 'zod';

/**
 * Zod-Schemas für die Bundestag-DIP-API (search.dip.bundestag.de/api/v1).
 * `passthrough`, damit zusätzliche Felder die Validierung nicht brechen — wir
 * binden nur, worauf wir uns verlassen.
 */
export const dipVorgangSchema = z
  .object({
    id: z.string(),
    typ: z.string().optional(),
    vorgangstyp: z.string().optional(),
    titel: z.string(),
    datum: z.string().optional(),
    abstract: z.string().optional(),
    sachgebiet: z.array(z.string()).optional(),
  })
  .passthrough();

export const dipResponseSchema = z.object({
  numFound: z.number().optional(),
  documents: z.array(dipVorgangSchema),
  cursor: z.string().optional(),
});

export type DipVorgang = z.infer<typeof dipVorgangSchema>;
export type DipResponse = z.infer<typeof dipResponseSchema>;

/** Validiert eine rohe DIP-Antwort an der Systemgrenze. */
export function parseDipResponse(json: unknown): DipResponse {
  return dipResponseSchema.parse(json);
}
