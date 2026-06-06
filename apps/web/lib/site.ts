/**
 * Zentrale Site-Konstanten. Die Basis-URL steuert Canonical-Links, Sitemap,
 * RSS-Feed und OpenGraph-/Share-Bilder. In Produktion via `NEXT_PUBLIC_SITE_URL`
 * gesetzt; Fallback ist die Live-Domain (robust, falls die Env fehlt).
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gurt.info').replace(/\/+$/, '');
export const SITE_NAME = 'GURT';
/** Postfach für Leser-Hinweise & Korrekturen (mailto). Muss ein echtes Postfach sein. */
export const CORRECTIONS_EMAIL = process.env.NEXT_PUBLIC_CORRECTIONS_EMAIL ?? 'hinweise@gurt.info';
export const SITE_DESCRIPTION =
  'GURT erklärt politische Leitlinien aus Deutschland und der EU durch Datenvisualisierung und anschauliche Beispiele — kritisch, quellennah und ohne parteipolitische Vereinnahmung.';
