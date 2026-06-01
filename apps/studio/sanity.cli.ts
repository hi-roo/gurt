import { defineCliConfig } from 'sanity/cli';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? 'nfndwwt2';
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production';

export default defineCliConfig({
  api: { projectId, dataset },
  /** Studio deployt frei auf <name>.sanity.studio */
  studioHost: 'gurt',
});
