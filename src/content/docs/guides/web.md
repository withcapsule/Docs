---
title: Web UI
description: Upload and download files from the browser without installing anything.
---

The hosted web client lives at `https://withcapsule.dev`. It is the intended browser entry point for Capsule, and it is the quickest way to try the project because there is nothing to install and the flow is deliberately simple.

## Sending a file
Choose a file, upload it, and wait for the transfer to finish. The page returns a file ID and a QR code pointing at the download URL, which makes cross-device handoff easy.

## Receiving a file
Paste either the short file ID or the full Capsule download URL into the receive form. If the file still exists, the page shows the filename, file size, and time remaining before enabling the Receive button.

## Encrypted transfers
The web client supports the same end-to-end encryption as the other clients, performed entirely in your browser:

- Tick **Encrypt** before sending. The file is encrypted locally and a 12-word decryption key is shown to you.
- Copy the mnemonic and keep it somewhere safe. If you lose it, the file is unrecoverable.
- When you receive a file that was uploaded encrypted (detected via the server's `X-Encrypted` response header), the page asks for the mnemonic and decrypts in the browser before saving.

Encryption is interoperable across every Capsule client: a file encrypted in the browser can be decrypted by the [CLI](/guides/cli/) or [Android app](/guides/android/), and vice-versa. See [how encryption works](/guides/getting-started/#how-does-it-work) for the shared model.

The crypto runs from a self-hosted bundle (no third-party CDN) built on [typage](https://github.com/FiloSottile/typage) (`age`) for file encryption and [scure-bip39](https://github.com/paulmillr/scure-bip39) for the 12-word recovery mnemonic.

> **Note:** The filename itself is not encrypted. It's stored as metadata so the recipient sees the original name. Put sensitive information inside the file, not in its name.

## Scope
The web client supports encryption and decryption, but it is still intentionally simple: it does not keep a saved transfer history nor any integration. For more features, use the [CLI](/guides/cli/) or [Android app](/guides/android/).
