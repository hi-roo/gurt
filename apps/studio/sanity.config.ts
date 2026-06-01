import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

// projectId ist öffentlich (nicht geheim). Default = das Gurt-Projekt; per Env überschreibbar.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? 'nfndwwt2';
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production';
const previewOrigin = process.env.SANITY_STUDIO_PREVIEW_URL ?? 'http://localhost:3000';

export default defineConfig({
  name: 'gurt',
  title: 'Gurt — Redaktion',
  projectId,
  dataset,
  plugins: [
    structureTool(),
    // Visual Editing: rendert das Frontend im Studio, Klick-zum-Bearbeiten.
    presentationTool({
      previewUrl: {
        origin: previewOrigin,
        previewMode: { enable: '/api/draft-mode/enable' },
      },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
