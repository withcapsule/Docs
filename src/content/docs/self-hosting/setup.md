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

- max upload size: `256 MB`
- file expiry window: `1 hour`
- cleanup pass: every `60 seconds`
- SQLite in WAL mode

## Reverse proxy
In practice you will usually place Capsule behind Caddy, nginx, or another reverse proxy and expose it over HTTPS. Point the proxy at the Capsule process on port `9001`.

## Point clients at your server
For the CLI:

```bash
capsule server set https://your-server.example.com
```

The Android app also supports a custom server in its setup and settings flow.

## Customizing behavior
If you want different CORS origins, upload limits, or expiry rules, those are currently code changes rather than runtime config.
