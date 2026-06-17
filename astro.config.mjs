// @ts-check
import { defineConfig } from 'astro/config';

import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Capsule',
      social: [],
      sidebar: [
        {
          label: 'Guides',
          items: [
            { label: 'Getting Started', slug: 'guides/getting-started' },
            { label: 'Android', slug: 'guides/android' },
            { label: 'Web', slug: 'guides/web' },
            { label: 'CLI', slug: 'guides/cli' },
          ],
        },
        {
          label: 'API',
          items: [
            { label: 'Reference', slug: 'api/reference' },
          ],
        },
        {
          label: 'Self-Hosting',
          items: [
            { label: 'Setup', slug: 'self-hosting/setup' },
          ],
        },
      ],
    }),
  ]
});
