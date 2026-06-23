---
title: Self-Hosting
description: Run your own Capsule server.
---

Self-hosting Capsule is straightforward. The server is a single Rust binary backed by SQLite and a local uploads directory.

## Build and run
From the `Server` directory:

```bash
cargo build --release
./target/release/capsule-server
```

On first run, the server creates:

- `capsule.db` for file metadata
- `uploads/temp/` for uploaded files

By default it listens on `0.0.0.0:9001`.

## Operational behavior
The current server behavior is fixed in code:

- max upload size: 256 MB
- file expiry window: 1 hour
- cleanup pass: every 60 seconds
- SQLite in WAL mode
- rate limit: 1 request/second per IP (returns a `429` with `Retry-After: 1`)
- bandwidth limit: 2 GB/hour per IP across uploads and downloads (fixed window, in-memory only, resets on server restart)

## Reverse proxy
In practice you will usually place Capsule behind Caddy, nginx, or another reverse proxy and expose it over HTTPS. Point the proxy at the Capsule process on port `9001` (or change the port).

The simplest method is to run a Cloudflare Tunnel. Note that this will cap file sizes at 100 MB.

## Point clients at your server
For the CLI:

```bash
capsule server set https://your-server.example.com
```

The Android app and CLI also support custom servers in their settings, and can ping that server to validate its address and status. If set up correctly, the ping should result in a `{ "message", "pong" }` response.

## Built-in Server UI
The Capsule server ships with simple upload and download HTML pages which are highly suitable for LAN use. They are disabled by default. To enable them, set `LOCAL_HTML = true` at the top of `Server/src/pages.rs` and recompile. When enabled, `GET /` serves a menu page; when disabled, `GET /` redirects to `https://withcapsule.dev`.

- `http://IP:PORT/` returns a main menu with buttons linking to rudimentary upload and download pages

## Customizing behavior
If you want different CORS origins, upload limits, expiry rules, or rate limits, those are currently code changes rather than runtime config. The server would have to be recompiled and restarted.
