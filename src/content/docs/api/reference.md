---
title: API Reference
description: HTTP endpoints exposed by the Capsule server.
---

Capsule keeps the HTTP surface small on purpose. The core API is enough to upload, inspect, download, and delete temporary files without introducing accounts or sessions.

Examples below use the hosted API at `https://send.withcapsule.dev`. See [Getting Started](/guides/getting-started/#first-transfer) for the distinction between the API host and the web client.

## POST /curlup
Uploads a file using multipart form data.

- form field: `f`
- success response: plain text containing the generated file ID

Example:

```bash
curl -F "f=@myfile.txt" "https://send.withcapsule.dev/curlup"
```

## GET /download/:file_id
Streams the file back with its original filename.

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
Returns a minimal built-in HTML menu with links to the server's simple upload and download forms.

Highly applicable for LAN usage.
