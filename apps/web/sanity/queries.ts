/** GROQ-Abfragen. Single Source of Truth für Lese-Zugriffe (siehe docs/02). */

export const articlesQuery = /* groq */ `
*[_type == "beitrag" && status == "veroeffentlicht"] | order(veroeffentlicht desc){
  _id,
  titel,
  "slug": slug.current,
  standfirst,
  veroeffentlicht,
  "themen": themen[]->{ name, "slug": slug.current }
}`;

export const articleSlugsQuery = /* groq */ `
*[_type == "beitrag" && status == "veroeffentlicht" && defined(slug.current)].slug.current`;

export const articleBySlugQuery = /* groq */ `
*[_type == "beitrag" && slug.current == $slug][0]{
  _id,
  titel,
  "slug": slug.current,
  standfirst,
  veroeffentlicht,
  methodik,
  "autoren": autoren[]->{ name, rolle },
  "themen": themen[]->{ name, "slug": slug.current },
  body[]{
    ...,
    _type == "visualisierungBlock" => {
      _type, _key,
      "visualisierung": visualisierung->{
        titel, typ, beschreibung, caption, encoding,
        "positionen": matrixPositionen[]{ akteur, massnahme, haltung, zitat },
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
    _type == "vergleichBlock" => {
      _type, _key, titel, einleitung,
      "links": links->{ titel }, "rechts": rechts->{ titel }
    }
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
