---
title: Web UI
description: Upload and download files from the browser without installing anything.
---

The hosted web client lives at `https://withcapsule.dev`. It is the intended public-facing browser entry point for Capsule, and it is the quickest way to try the project because there is nothing to install and the flow is deliberately simple.

## Sending a file
Choose a file, upload it, and wait for the transfer to finish. The page returns a file ID and a QR code pointing at the download URL, which makes cross-device handoff easy.

## Receiving a file
Paste either the short file ID or the full Capsule download URL into the receive form. If the file still exists, the page shows the filename, file size, and time remaining before enabling the Receive button.

## Scope
The web client is intentionally simple. It does not handle encryption, decryption, or saved transfer history. For those features, please use the [CLI](/guides/cli/) or [Android app](/guides/android/).
