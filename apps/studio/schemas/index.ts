import type { SchemaTypeDefinition } from 'sanity';

// Dokumente
import { beitrag } from './documents/beitrag';
import { thema } from './documents/thema';
import { akteur } from './documents/akteur';
import { massnahme } from './documents/massnahme';
import { position } from './documents/position';
import { datensatz } from './documents/datensatz';
import { visualisierung } from './documents/visualisierung';
import { quelle } from './documents/quelle';
import { autor } from './documents/autor';

// Objekte
import { body } from './objects/body';

export const schemaTypes: SchemaTypeDefinition[] = [
  // Dokumente
  beitrag,
  thema,
  akteur,
  massnahme,
  position,
  datensatz,
  visualisierung,
  quelle,
  autor,
  // Objekte
  body,
];
