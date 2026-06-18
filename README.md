# Capsule Docs

This repository contains the Capsule documentation site. It is built with Astro and Starlight and covers the project overview, client guides, API reference, and self-hosting notes.

## Stack

- Astro
- Starlight
- PNPM
- Wrangler for Workers deployment

## Local development

```sh
pnpm install
pnpm dev
```

The local dev server runs at `http://localhost:4321`.

## Build

```sh
pnpm build
```

Static output is written to `dist/`.

## Deploy

This docs site is configured for Cloudflare Workers static asset deployment.

```sh
pnpm deploy
```

That runs `wrangler deploy` using the checked-in `wrangler.toml`.

## Structure

- `src/content/docs/` - documentation pages
- `public/` - static assets, including screenshots
- `astro.config.mjs` - Starlight site configuration
- `wrangler.toml` - Workers deployment config
