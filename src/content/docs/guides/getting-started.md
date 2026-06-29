---
title: Getting Started
description: Send your first file with Capsule in under a minute.
---

## What is Capsule?
Capsule is a simple file transfer service for the Web, Android, and servers via CLI. For when LAN file sharing isn't an option, you don't want to deal with cloud storage accounts, and don't trust a random person's cloud. Capsule is designed for quick, temporary file transfers. No account needed, no long-term storage, and client-side encryption is available on every client.

## How does it work?
1. Upload a file from any device. You can also choose to encrypt it first, with a decryption key that only you have access to.
2. The server returns a file ID and download URL. Capsule clients can turn that into a QR code for easier cross-device handoff.
3. Download the file from another device using the link or by scanning the QR code through your system camera or the Android app.
4. If you elect to encrypt, the file becomes completely unreadable and only your decryption key can recover it. The client you encrypt with will show the key once (make sure to save it) and the client you download with will prompt for it and decrypt locally.
5. The Android app and CLI provide a local history of the 15 most recent file transfers and store both the download and file IDs. However, the decryption key is never stored, so if you lose the decryption key, the file is unrecoverable.

## Pick a client
- Use the [Web UI](/guides/web/) when you just want a simple, fast transfer.
- Use the [Android app](/guides/android/) when you want native integration, QR scanning, and mobile-friendly receive flows.
- Use the [CLI](/guides/cli/) for that in-terminal convenience.

All clients provide encryption support and QR code generation.

## First transfer
The quickest way to try Capsule is with the hosted service. Capsule has two hosted addresses: the public web UI at `https://withcapsule.dev`, and the API that backs direct HTTP calls and client integrations at `https://send.withcapsule.dev`. The API host is not the web client. Direct examples throughout these docs use the API host:

```bash
curl -F "f=@photo.jpg" https://send.withcapsule.dev/upload
```

The response includes a memorable file ID made of three short words joined by hyphens, such as `duck-view-time` — easy to read aloud or retype on another device. Anyone with that ID or the full download URL can fetch the file until it expires or is deleted. IDs are matched case-insensitively, so `Duck-View-Time` works just as well.

## What Capsule is good at
Capsule works best for short-lived file handoffs: moving logs off a server, sending a file from a phone to a laptop, or sharing a one-off download.

It is not meant to be permanent storage, collaboration software, or a general-purpose sync service.
