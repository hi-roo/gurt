export const meta = {
  name: 'review-beitrag',
  description:
    'Fachredaktionelle Prüfstraße für einen GURT-Beitrag: fünf unabhängige Desks prüfen parallel, die Chefredaktion synthetisiert eine Freigabe-Empfehlung. Gate, kein Autor — gibt Findings zurück, ändert nichts.',
  whenToUse: 'Vor Freigabe/Veröffentlichung eines NEUEN GURT-Beitrags (nicht für kleine Edits).',
  phases: [
    { title: 'Fachredaktionen', detail: 'Fünf Desks prüfen den Beitrag parallel und unabhängig' },
    { title: 'Chefredaktion', detail: 'Synthese der Voten → Freigabe-Empfehlung' },
  ],
}

// args: { slug: '<beitrags-slug>' } oder direkt der Slug-String (auch als JSON-String robust).
let parsedArgs = args
if (typeof parsedArgs === 'string') {
  try {
    parsedArgs = JSON.parse(parsedArgs)
  } catch {
    /* einfacher Slug-String — so lassen */
  }
}
const slug = parsedArgs && typeof parsedArgs === 'object' ? parsedArgs.slug : parsedArgs
if (!slug) throw new Error('review-beitrag braucht einen Beitrags-Slug (args.slug oder args).')

const ORT =
  `Der Beitrag liegt in apps/web/content/seed.ts als Article-Objekt mit slug: '${slug}'. ` +
  `Finde per Grep die zugehörige Konstante (…Article mit diesem slug) und ALLE von ihr referenzierten ` +
  `Block-Konstanten (visualisierungBlock / datentabelleBlock / diskursBlock / quellenNote sowie titel, ` +
  `standfirst, methodik, body). Lies sie vollständig. Block- und Chart-Typen erklärt apps/web/content/types.ts.`

const REGELN =
  `Du bist eine FACHREDAKTION in der Prüfstraße der gemeinnützigen Daten-Journalismus-Plattform GURT. ` +
  `Du PRÜFST — du schreibst NICHT um und änderst KEINE Dateien. Gib ausschließlich strukturierte Findings zurück. ` +
  `Leitmotiv von GURT: „Mehrere Dinge können gleichzeitig richtig sein." Sei streng, konkret und fair; ` +
  `nenne je Finding die genaue Fundstelle und einen Beleg oder Direktiven-Bezug. Wenn alles in Ordnung ist, ` +
  `gib ein grünes Votum mit leerer Findings-Liste zurück (keine erfundenen Mängel).`

const DESKS = [
  {
    key: 'fakten',
    label: 'Faktencheck & Quellen',
    prompt:
      `${REGELN}\n\nDEIN DESK: Faktencheck & Quellen (Direktiven: docs/08-methodology.md, Skill gurt-quellen).\n` +
      `${ORT}\n\nPrüfe: Hat JEDE Zahl eine belastbare Primärquelle (titel + url)? Stimmen Bezugsjahr/Datenstand und ` +
      `sind sie aktuell? Sind Einheiten/Definitionen korrekt? Wird eine Sekundärquelle genutzt, wo eine Primärquelle möglich wäre?\n` +
      `WICHTIG: Verifiziere die 2–4 tragendsten Zahlen UNABHÄNGIG. Lade dir dazu über ToolSearch die Tools WebSearch und ` +
      `WebFetch (query "select:WebSearch,WebFetch") und gleiche gegen die Primärquelle ab. Jede belegbare Abweichung ist ein Blocker.`,
  },
  {
    key: 'neutral',
    label: 'Neutralität & Editorial',
    prompt:
      `${REGELN}\n\nDEIN DESK: Neutralität & redaktionelle Integrität (Direktiven: docs/07-editorial-guidelines.md, docs/10-style-storytelling.md).\n` +
      `${ORT}\n\nPrüfe: wertende oder suggestive Sprache in Titel, Standfirst, Überschriften, Fließtext, Captions und Schluss? ` +
      `Wird eine THESE erzählt statt einer sauberen Vergleichsanordnung? Ist der Diskurs ausgewogen (4–5 Stimmen über das ` +
      `politische Spektrum, je paraphrasiert und direkt bequellt)? Ist der Schluss urteilsfrei? Wird „mehrere Dinge gleichzeitig ` +
      `richtig" strukturell eingelöst, statt eine Seite zu bevorzugen?`,
  },
  {
    key: 'methodik',
    label: 'Methodik & Vergleichbarkeit',
    prompt:
      `${REGELN}\n\nDEIN DESK: Methodik & Vergleichbarkeit (Direktive: docs/08-methodology.md).\n` +
      `${ORT}\n\nPrüfe: Werden unterschiedliche Bemessungsgrundlagen sauber getrennt — kein „Äpfel-mit-Birnen"-Vergleich ohne ` +
      `PROMINENTEN Hinweis im Haupttext (nicht nur in der Methodik-Note)? Sind abgeleitete oder geschätzte Werte gekennzeichnet ` +
      `(Rechenweg nachvollziehbar)? Ist die Methodik-Note vollständig (Datenstand, Auswahl, Abgrenzungen, Definitionen)? ` +
      `Stehen Caveats dort, wo Leser:innen sie brauchen?`,
  },
  {
    key: 'viz',
    label: 'Visualisierung & A11y',
    prompt:
      `${REGELN}\n\nDEIN DESK: Visualisierung & Barrierefreiheit (Direktiven: docs/06-visualization-guidelines.md, Skill gurt-visualisierung).\n` +
      `${ORT}\n\nPrüfe je Visualisierung: Passt der Charttyp zur Erzähl-Absicht? Gibt es eine A11y-Beschreibung (Pflichtfeld) und ` +
      `einen Tabellen-Fallback? Ist Farbe NIE der alleinige Bedeutungsträger? Ist die Caption bequellt? Stimmen die Encoding-Felder ` +
      `zu den Datenspalten? Passt jede Zahl im Chart zur Aussage im Fließtext? Drohen Mobile-Overflow, schwache Kontraste oder ` +
      `fehlendes Reduced-Motion-Verhalten?`,
  },
  {
    key: 'technik',
    label: 'Technik & Schichten',
    prompt:
      `${REGELN}\n\nDEIN DESK: Technik & Schichten (Direktiven: CLAUDE.md im Root und je Schicht).\n` +
      `${ORT}\n\nPrüfe: Werden die Schichtgrenzen gewahrt (Daten in packages/data, Chart-Logik in packages/visualizations, ` +
      `einzige Content→Chart-Brücke ist visualization-renderer)? Trägt jeder Datensatz Provenienz (quelle)? Sind Encoding- und ` +
      `Datensatz-Referenzen konsistent (bei datentabelleBlock: Zeilen-Keys == Spalten-Namen)? Stehen keine Secrets im Klartext? ` +
      `Ist der Beitrag in seedArticles aufgenommen und das Ressort gültig (siehe content/ressorts.ts)?`,
  },
]

const FINDINGS_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    desk: { type: 'string' },
    votum: {
      type: 'string',
      enum: ['gruen', 'gelb', 'rot'],
      description: 'gruen = keine relevanten Mängel · gelb = Major(s) zu beheben · rot = mindestens ein Blocker',
    },
    zusammenfassung: { type: 'string' },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          schwere: { type: 'string', enum: ['blocker', 'major', 'minor'] },
          fundstelle: { type: 'string', description: 'genaue Stelle, z. B. Titel / Chart 2 / Methodik / Diskurs-Stimme X' },
          problem: { type: 'string' },
          beleg: { type: 'string', description: 'Quelle/Beleg oder Direktiven-Bezug' },
          empfehlung: { type: 'string', description: 'konkreter Fix-Vorschlag (kein Umschreiben durch dich)' },
        },
        required: ['schwere', 'fundstelle', 'problem', 'empfehlung'],
      },
    },
  },
  required: ['desk', 'votum', 'zusammenfassung', 'findings'],
}

const SYNTHESE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    empfehlung: { type: 'string', enum: ['go', 'go-mit-auflagen', 'no-go'] },
    begruendung: { type: 'string' },
    blocker: { type: 'array', items: { type: 'string' } },
    majors: { type: 'array', items: { type: 'string' } },
    minors: { type: 'array', items: { type: 'string' } },
  },
  required: ['empfehlung', 'begruendung', 'blocker', 'majors', 'minors'],
}

phase('Fachredaktionen')
const reviews = (
  await parallel(
    DESKS.map((d) => () =>
      agent(d.prompt, { label: d.key, phase: 'Fachredaktionen', schema: FINDINGS_SCHEMA }).then((r) => ({
        ...r,
        desk: (r && r.desk) || d.label,
      })),
    ),
  )
).filter(Boolean)

phase('Chefredaktion')
const synthese = await agent(
  `Du bist die CHEFREDAKTION der GURT-Prüfstraße für den Beitrag '${slug}'. Dir liegen die Voten und Findings der ` +
    `fünf Fachredaktionen vor (JSON unten). Aggregiere sie zu EINER Freigabe-Empfehlung: 'go' (keine Blocker, höchstens ` +
    `Minors), 'go-mit-auflagen' (Majors zuerst beheben, dann frei), 'no-go' (mindestens ein Blocker). Liste Blocker, Majors ` +
    `und Minors knapp und priorisiert (je mit Fundstelle); dedupliziere Überschneidungen zwischen Desks. Du schreibst nichts um.\n\n` +
    `VOTEN UND FINDINGS:\n${JSON.stringify(reviews, null, 2)}`,
  { label: 'chefredaktion', phase: 'Chefredaktion', schema: SYNTHESE_SCHEMA },
)

log(
  `Freigabe-Empfehlung: ${synthese.empfehlung} — Blocker ${synthese.blocker.length}, ` +
    `Majors ${synthese.majors.length}, Minors ${synthese.minors.length}`,
)

return { slug, synthese, desks: reviews }
