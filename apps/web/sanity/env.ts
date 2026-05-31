export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2025-01-01';

const PLACEHOLDERS = new Set(['your-project-id', 'placeholder-project-id', '']);

/**
 * True, sobald ein echtes Sanity-Projekt konfiguriert ist. Solange nicht, läuft
 * das Frontend auf lokalen Seed-Daten (siehe content/repository.ts) — so ist die
 * Plattform sofort lauffähig, bevor ein Projekt existiert.
 */
export const isSanityConfigured = Boolean(projectId && !PLACEHOLDERS.has(projectId));
