// @ts-check
import { defineConfig } from 'astro/config';

import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Capsule',
      social: [],
      head: [
        {
          tag: 'script',
          content: `((window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)}),(plausible.init=plausible.init||function(i){plausible.o=i||{}}));plausible.init();`,
        },
        {
          tag: 'script',
          attrs: { defer: true, src: '/p.js' },
        },
        {
          tag: 'script',
          attrs: { defer: true, src: '/u.js', 'data-website-id': 'c7715639-99fc-407e-9e97-513b63db8410', 'data-api': '/cdn/u' },
        },
      ],
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
        {
          label: 'Legal',
          items: [
            { label: 'Privacy Policy', slug: 'privacy' },
            { label: 'Terms of Service', slug: 'terms' },
          ],
        },
      ],
    }),
  ]
});
