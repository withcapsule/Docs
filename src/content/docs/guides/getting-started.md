---
title: Getting Started
description: Send your first file with Capsule in under a minute.
---

## What is Capsule?
Capsule is a simple file transfer service for the Web, Android, and servers via CLI. For when LAN file sharing isn't an option, you don't want to deal with cloud storage accounts, and don't trust a random person's cloud. Capsule is designed for quick, temporary file transfers. No account needed, no long-term storage, and (via the CLI) full end-to-end encryption.

## How does it work?
1. Upload a file from any device. If you are on Android or in a Terminal, you can also choose to encrypt the file with a decryption key that only you have access to.
2. The server generates both a download link and QR code.
3. Download the file from another device using the link or by scanning the QR code through your system camera or the Android app.
4. If you elected to encrypt, the file will be completely unreadable and only your decryption key can unscramble it. The CLI provides options to view the decryption key as a QR code, or view it as text. Once the keys are made visible, pressing any key on the keyboard will exit the tool and wipe the terminal screen clean.
    * The Android app can also encrypt and decrypt files, and supports reading the decryption key from the CLI-provided decryption QR code.
5. The Android app and CLI provide a local history of the 15 most recent file transfers and store both the download and file IDs. However, the decryption key is never stored, so if you lose the decryption key, the file is unrecoverable.

## Pick a client
- Use the [Web UI](/guides/web/) when you want a fast browser-only transfer.
- Use the [Android app](/guides/android/) when you want native sharing, QR scanning, and mobile-friendly receive flows.
- Use the [CLI](/guides/cli/) when you want scripting, self-hosting support, or encrypted terminal transfers.

## First transfer
The quickest way to try Capsule is with the hosted service:

```bash
curl -F "f=@photo.jpg" https://send.withcapsule.dev/curlup
```

The response includes a short file ID. Anyone with that ID or the full download URL can fetch the file until it expires or is deleted.

## What Capsule is good at
Capsule works best for short-lived file handoffs: moving logs off a server, sending a file from a phone to a laptop, or sharing a one-off download without creating an account.

It is not meant to be permanent storage, collaboration software, or a general-purpose sync service.
