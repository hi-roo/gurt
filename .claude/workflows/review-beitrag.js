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
      `fehlendes Reduced-Motion-Verhalten?\n` +
      `BESONDERS bei LINIEN-Diagrammen mit nur EINER Datenreihe: Ist die Aussage ohne Vergleichsgröße tragfähig — oder fehlt eine ` +
      `relevante Bezugsreihe (EU-Mittel, Inflation/VPI, BIP, Bevölkerung, Mindest-/Medianlohn, Beitragssatz, gesetzliche Schwelle)? ` +
      `Eine einreihige Linie, deren Kernaussage Einordnung verlangt, ist Scheinklarheit (Major). Ist eine vorhandene Bezugsgröße exakt ` +
      `benannt (politisch aufgeladene wie Mindestlohn nur, wenn die Leitfrage genau so lautet)?`,
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
).filter((r) => r && r.votum)

if (reviews.length === 0) throw new Error('Kein Desk-Votum erhalten — Synthese nicht möglich.')
if (reviews.length < DESKS.length)
  log(`Warnung: nur ${reviews.length}/${DESKS.length} Desk-Voten erhalten — Synthese läuft mit Teilmenge.`)

phase('Chefredaktion')

// --- Deterministische Vor-Aggregation --------------------------------------
// Warum: Die Synthese stallte bisher, weil der Agent die Findings eigenständig
// „nachverifizierte" (Dateien las / lange dachte → 180s-Watchdog, 6× ohne Token).
// Wir nehmen ihm die Klassifikation ab: Findings werden hier nach Schwere
// gebündelt, die Empfehlung folgt deterministisch aus den Schweregraden (docs/11).
// Der Agent muss nur noch deduplizieren und begründen — auf einem kleinen Input.
const clip = (s, n) => {
  const t = String(s || '')
    .replace(/\s+/g, ' ')
    .trim()
  return t.length > n ? t.slice(0, n - 1).trimEnd() + '…' : t
}
const allFindings = reviews.flatMap((r) =>
  (r.findings || []).map((f) => ({
    schwere: f.schwere,
    text:
      `[${r.desk || 'Desk'}] ${f.fundstelle ? clip(f.fundstelle, 80) + ' — ' : ''}` +
      `${clip(f.problem, 400)}${f.empfehlung ? ` → ${clip(f.empfehlung, 300)}` : ''}`,
  })),
)
const bucket = (sev) => allFindings.filter((f) => f.schwere === sev).map((f) => f.text)
const blockerRaw = bucket('blocker')
const majorsRaw = bucket('major')
const minorsRaw = bucket('minor')
// Empfehlung = Funktion der Schweregrade: Blocker→no-go, sonst Major→go-mit-auflagen, sonst go.
const empfehlungDet = blockerRaw.length ? 'no-go' : majorsRaw.length ? 'go-mit-auflagen' : 'go'

const deskKontext = reviews.map((r) => ({
  desk: r.desk || 'Desk',
  votum: r.votum || '—',
  zusammenfassung: clip(r.zusammenfassung, 280),
}))

// --- Synthese-Agent: schlanker Input, eng begrenzte Aufgabe, low effort ----
const list = (arr) => arr.map((x) => '- ' + x).join('\n') || '—'
const synthesePrompt =
  `Du bist die CHEFREDAKTION der GURT-Prüfstraße für den Beitrag '${slug}'. Die fünf Fachredaktionen haben ` +
  `unabhängig geprüft; ihre Findings stehen unten BEREITS nach Schwere gebündelt. Deine Aufgabe ist NUR die Synthese.\n` +
  `WICHTIG: Prüfe NICHTS nach und lies KEINE Dateien — alles, was du brauchst, steht unten. Nutze ausschließlich das ` +
  `StructuredOutput-Tool (keine Read-, Such- oder Web-Tools); Felder: empfehlung, begruendung, blocker[], majors[], minors[].\n\n` +
  `TU GENAU DIES:\n` +
  `1) Dedupliziere inhaltliche Überschneidungen zwischen Desks innerhalb jeder Stufe (z. B. dieselbe Zahl von mehreren ` +
  `Desks) zu je einem prägnanten Punkt mit Fundstelle. Erfinde nichts, lösche keine echten Punkte — fasse nur Dubletten zusammen.\n` +
  `2) Schreibe eine knappe, faire 'begruendung' (3–6 Sätze), die das Gesamtbild trägt.\n` +
  `3) Setze 'empfehlung' = '${empfehlungDet}' (folgt zwingend aus den Schweregraden: Blocker→no-go, sonst Major→go-mit-auflagen, sonst go).\n\n` +
  `DESK-VOTEN (Kurzfassung):\n${JSON.stringify(deskKontext, null, 2)}\n\n` +
  `BLOCKER (${blockerRaw.length}):\n${list(blockerRaw)}\n\n` +
  `MAJORS (${majorsRaw.length}):\n${list(majorsRaw)}\n\n` +
  `MINORS (${minorsRaw.length}):\n${list(minorsRaw)}`

let synthese = null
try {
  synthese = await agent(synthesePrompt, {
    label: 'chefredaktion',
    phase: 'Chefredaktion',
    schema: SYNTHESE_SCHEMA,
    effort: 'low',
  })
} catch (err) {
  log(`Synthese-Agent fehlgeschlagen (${(err && err.message) || err}) — nutze deterministische Aggregation.`)
}

// --- Safety-Net: deterministische Aggregation, falls der Agent ausfällt -----
// Garantiert ein valides Verdikt, selbst wenn der Agent stallt oder leer liefert.
const detBegruendung =
  `Automatische Aggregation der ${reviews.length} Desk-Voten: ${blockerRaw.length} Blocker, ` +
  `${majorsRaw.length} Majors, ${minorsRaw.length} Minors. Empfehlung folgt den Schweregraden ` +
  `(Blocker→no-go, sonst Major→go-mit-auflagen, sonst go).`
if (!synthese || typeof synthese !== 'object') {
  synthese = { empfehlung: empfehlungDet, begruendung: detBegruendung, blocker: blockerRaw, majors: majorsRaw, minors: minorsRaw }
} else {
  // Empfehlung deterministisch erzwingen (Konsistenz mit den Schweregraden) …
  synthese.empfehlung = empfehlungDet
  // … und je Liste auf die deterministischen Buckets zurückfallen, wenn der Agent eine Stufe leer lässt.
  if (!Array.isArray(synthese.blocker) || (blockerRaw.length && synthese.blocker.length === 0)) synthese.blocker = blockerRaw
  if (!Array.isArray(synthese.majors) || (majorsRaw.length && synthese.majors.length === 0)) synthese.majors = majorsRaw
  if (!Array.isArray(synthese.minors) || (minorsRaw.length && synthese.minors.length === 0)) synthese.minors = minorsRaw
  if (!synthese.begruendung || !String(synthese.begruendung).trim()) synthese.begruendung = detBegruendung
}

log(
  `Freigabe-Empfehlung: ${synthese.empfehlung} — Blocker ${synthese.blocker.length}, ` +
    `Majors ${synthese.majors.length}, Minors ${synthese.minors.length}`,
)

return { slug, synthese, desks: reviews }
