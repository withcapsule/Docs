---
title: CLI
description: Install, configure, and use the Capsule CLI.
---

The Capsule CLI is the most capable client. It is aimed at terminal-first workflows where a browser would be inconvenient or too limited.

## Installation
#### Via `brew`
This repository includes a Homebrew formula under `homebrew-capsule/` for a tap-based install flow for Linux and MacOS.
```
brew tap withcapsule/capsule
```
Followed by:
```
brew install capsule
```


#### Via Source
From the `CLI` directory:
```bash
cargo install --path .
```

## Interface
```
CLI for the Capsule server

Usage: capsule [OPTIONS] <COMMAND>

Commands:
  ping              Test server connection with a ping [aliases: p]
  upload            Upload a file to the server [aliases: u]
  upload-encrypted  Locally encrypt a file, then upload a file to the server [aliases: ue]
  download          Download a recently uploaded file [aliases: d]
  status            Show metadata for an uploaded file [aliases: s]
  recents           Show recent uploads and downloads, --help for more [aliases: r]
  delete            Delete a file by ID [aliases: del]
  server            Manage the server address [aliases: srv]
  help              Print this message or the help of the given subcommand(s)

Options:
      --server <SERVER>  
  -h, --help             Print help
  -V, --version          Print version

```

## Configuration
The CLI keeps a small local state directory with the active server URL and the last 15 transfers. For one-off commands, `--server <url>` overrides the saved server without changing it permanently.

## Global options
`capsule --server <url> <command>` sends a single command to a specific Capsule server without changing the saved default.

`capsule --help` prints the command list, and `capsule --version` prints the current CLI version.

## Commands
#### `ping` (`p`)
`capsule ping`

Checks connectivity against the active server and prints the server response.

#### `upload` (`u`)
`capsule upload <path>`

Uploads a file as-is, shows progress while streaming it, and returns the file ID and download URL.

#### `upload-encrypted` (`ue`)
`capsule upload-encrypted <path>`

Encrypts the file locally first, then uploads the encrypted output. This is the command to use when you want the server to store ciphertext rather than the original file.

#### `download` (`d`)
`capsule download <id-or-url> [--output <path>]`

Downloads by short file ID or full Capsule download URL. `--output` lets you choose the destination path explicitly. If the file is marked as encrypted, the CLI prompts for the mnemonic and decrypts locally.

#### `status` (`s`)
`capsule status <id-or-url>`

Shows file metadata such as filename, size, upload age, remaining lifetime, and whether the file was uploaded as encrypted.

#### `delete` (`del`)
`capsule delete <id-or-url>`

Deletes a file from the server before it expires naturally.

#### `recents` (`r`)
`capsule recents`

Shows the last 15 local uploads and downloads.

`capsule recents clear`

Clears the local history file.

#### `server` (`srv`)
`capsule server info`

Shows the currently active server URL.

`capsule server set <address>`

Stores a custom default server address.

`capsule server reset`

Restores the default hosted server, `https://send.withcapsule.dev`.

## Encryption model
Encrypted uploads are handled on the client before the server sees the file. The generated 12-word mnemonic is the key, and Capsule does not store it for you.
