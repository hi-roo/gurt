import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from './env';

export const client = createClient({
  projectId: projectId ?? 'placeholder-project-id',
  dataset,
  apiVersion,
  useCdn: true,
  // Content Source Maps für Visual Editing; Studio liegt unter /studio bzw. extern.
  stega: { studioUrl: '/studio' },
});
