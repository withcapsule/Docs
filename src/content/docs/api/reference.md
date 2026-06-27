---
title: API Reference
description: HTTP endpoints exposed by the Capsule server.
---

Capsule keeps the HTTP surface small on purpose. The core API is enough to upload, inspect, download, and delete temporary files without introducing accounts or sessions.

Examples below use the hosted API at `https://send.withcapsule.dev`. See [Getting Started](/guides/getting-started/#first-transfer) for the distinction between the API host and the web client.

## POST /upload
Uploads a file using multipart form data.

- form field: `f`
- query param: `encrypted` (`true` / `false`, default `false`) - used to mark the file as client-side encrypted
- success response: plain text containing the generated file ID. The ID is three short words joined by hyphens, such as `duck-view-time`.

Example:

```bash
curl -F "f=@myfile.txt" "https://send.withcapsule.dev/upload"
# Success, uploaded myfile.txt of 1234 bytes. File ID for downloading is duck-view-time.
```

## GET /download/:file_id
Streams the file back with its original filename. The `:file_id` is matched case-insensitively.

Relevant response headers:

- `Content-Disposition`
- `Content-Length`
- `X-Encrypted`

## GET /status/:file_id
Returns metadata for a file without downloading it.

```json
{
  "file_name": "myfile.txt",
  "file_size": 1234,
  "upload_time": 1710000000,
  "time_remaining": 3540,
  "is_encrypted": false
}
```

## DELETE /delete/:file_id
Deletes a file immediately and removes its database record.

## GET /ping
Simple health check that returns a JSON `pong` response.

## GET /
On the default hosted server (`LOCAL_HTML = false`), redirects to `https://withcapsule.dev`. On a self-hosted server with `LOCAL_HTML` enabled, returns a minimal built-in HTML menu with upload and download forms — useful for LAN use without a separate web client.

## Rate limiting
The server enforces a limit of 1 request per second per IP. Requests that exceed this return `429 Too Many Requests` with a `Retry-After: 1` header.

## Bandwidth limiting
Each IP is limited to 2 GB per hour across all uploads and downloads combined, using a fixed one-hour window. Requests that would exceed this cap return `429 Too Many Requests` before any data is transferred.
