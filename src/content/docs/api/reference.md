---
title: API Reference
description: HTTP endpoints exposed by the Capsule server.
---

Capsule keeps the HTTP surface small on purpose. The API is enough to upload, inspect, download, and delete temporary files without introducing accounts or sessions.

## POST /curlup
Uploads a file using multipart form data.

- form field: `f`
- optional query parameter: `encrypted=true`
- success response: plain text containing the generated file ID

Example:

```bash
curl -F "f=@myfile.txt" "https://send.withcapsule.dev/curlup?encrypted=true"
```

The `encrypted` flag does not encrypt the file on the server. It only marks the upload so clients know they should prompt for decryption later.

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

## GET /delete/:file_id
Deletes a file immediately and removes its database record.

## GET /ping
Simple health check that returns a JSON `pong` response.

## Rate limits and limits
- default request limit: `20 req/s` per IP
- `/curlup`: `2 req/s` per IP
- `/html_upload_processor`: `1 req/s` per IP
- `/html_download_processor`: `1 req/s` per IP
- `429` responses include `Retry-After: 1`
- upload body limit: `256 MB`
