/** GROQ-Abfragen. Single Source of Truth für Lese-Zugriffe (siehe docs/02). */

export const articlesQuery = /* groq */ `
*[_type == "beitrag" && status == "veroeffentlicht"] | order(veroeffentlicht desc){
  _id,
  titel,
  "slug": slug.current,
  standfirst,
  veroeffentlicht,
  ressort,
  "themen": themen[]->{ name, "slug": slug.current }
}`;

export const articleSlugsQuery = /* groq */ `
*[_type == "beitrag" && status == "veroeffentlicht" && defined(slug.current)].slug.current`;

/** Flacher Volltext-Index: Titel, Standfirst, Themen + Fließtext (pt::text). */
export const searchIndexQuery = /* groq */ `
*[_type == "beitrag" && status == "veroeffentlicht"] | order(veroeffentlicht desc){
  "slug": slug.current,
  titel,
  "standfirst": coalesce(standfirst, ""),
  "themen": themen[]->{ name, "slug": slug.current },
  "text": pt::text(body)
}`;

export const articleBySlugQuery = /* groq */ `
*[_type == "beitrag" && slug.current == $slug][0]{
  _id,
  titel,
  "slug": slug.current,
  standfirst,
  veroeffentlicht,
  ressort,
  methodik,
  "autoren": autoren[]->{ name, rolle },
  "themen": themen[]->{ name, "slug": slug.current },
  body[]{
    ...,
    _type == "visualisierungBlock" => {
      _type, _key,
      "visualisierung": visualisierung->{
        titel, typ, beschreibung, caption, encoding,
        "positionen": matrixPositionen[]{ akteur, massnahme, haltung, zitat, quelle{ titel, url } },
        "datensatz": datensatz->{
          titel, spalten, datenJson,
          "quelle": quelle->{ titel, url, herausgeber }
        }
      }
    },
    _type == "datentabelleBlock" => {
      _type, _key, caption,
      "datensatz": datensatz->{ titel, spalten, datenJson, "quelle": quelle->{ titel, url } }
    },
    _type == "zitatBlock" => { _type, _key, zitat, "quelle": quelle->{ titel, url } },
    _type == "quellenNote" => { _type, _key, text, "quelle": quelle->{ titel, url } },
    _type == "diskursBlock" => {
      _type, _key, titel, frage, einleitung, einordnung,
      perspektiven[]{ label, aussage, quelle{ titel, url, herausgeber } }
    }
  }
}`;

/**
 * Hero-Zitate für die Startseiten-CTA: alle `zitatBlock`-Blöcke mit `imHero == true` über
 * alle veröffentlichten Beiträge, samt Quell-Titel (Zuschreibung) und Beitrags-Slug (für den
 * „Was die Daten zeigen"-Button). Eine Quelle für Beitrag UND Hero — redaktionell pflegbar.
 */
export const heroZitateQuery = /* groq */ `
*[_type == "beitrag" && status == "veroeffentlicht" && count(body[_type == "zitatBlock" && imHero == true]) > 0]{
  "slug": slug.current,
  "zitate": body[_type == "zitatBlock" && imHero == true]{
    zitat,
    heroEyebrow,
    "attribution": quelle->titel
  }
}`;

/**
 * Positionen für eine Positions-Matrix. Im Go-Live-Modell speist die Matrix sich
 * aus `position`-Dokumenten (gefiltert nach den Maßnahmen des Beitrags).
 */
export const positionsForMassnahmenQuery = /* groq */ `
*[_type == "position" && massnahme->slug.current in $massnahmen]{
  "akteur": akteur->name,
  "massnahme": massnahme->titel,
  haltung,
  zitat
}`;
