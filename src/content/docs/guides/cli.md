---
title: CLI
description: Install, configure, and use the Capsule CLI.
---

The Capsule CLI is the most capable client. It is aimed at terminal-first workflows where a browser would be inconvenient or too limited.

## Install & uninstall

Pick the method for your platform. The CLI installs to a per-user location, so no method requires root, and each method's uninstall is listed right alongside it.

### Install script
Detects your architecture (x86_64 or ARM64) and downloads the latest release binary from GitHub.

##### macOS
Installs to `~/.local/bin`
```sh
curl -fsSL https://withcapsule.dev/install-macos.sh | sh      # install
```
```sh
curl -fsSL https://withcapsule.dev/uninstall-macos.sh | sh    # uninstall
```

##### Linux
Installs to `~/.local/bin`
```sh
curl -fsSL https://withcapsule.dev/install-linux.sh | sh      # install
```
```sh
curl -fsSL https://withcapsule.dev/uninstall-linux.sh | sh    # uninstall
```

##### Windows
Installs to `%LOCALAPPDATA%\Programs\capsule\` and adds it to your user PATH (run in PowerShell)
```sh
irm https://withcapsule.dev/install.ps1 | iex      # install
```
```sh
irm https://withcapsule.dev/uninstall.ps1 | iex    # uninstall
```

### Homebrew (macOS, Linux)
```sh
brew tap withcapsule/capsule  # enable the Capsule repository
brew install capsule          # install
```
```sh
brew uninstall capsule    # uninstall
```

### COPR (Fedora 43+)
```sh
sudo dnf copr enable seanathan/capsule  # enable the COPR repository
sudo dnf install capsule                # install
```
```sh
sudo dnf remove capsule
```

### From source
From the `CLI` directory:
```sh
cargo install --path .         # install
```
```sh
cargo uninstall capsule-cli    # uninstall
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
  status            Show status and metadata for an uploaded file [aliases: s]
  recents           Show recent uploads and downloads, --help for more [aliases: r]
  delete            Delete a file by ID [aliases: del]
  server            Manage the server address [aliases: sv]
  help              Print this message or the help of the given subcommand(s)

Options:
      --server <SERVER>
  -h, --help             Print help
  -V, --version          Print version
```

## Configuration
The CLI keeps a small local state directory with the active server URL and your recent transfers. It uses your platform data directory via `dirs::data_dir()`, and stores:

- `capsule/server.txt` for the saved default server
- `capsule/history.json` for recent transfers

For one-off commands, `--server <url>` overrides the saved server without changing it permanently.

## Global options
`capsule --server <url> <command>` sends a single command to a specific Capsule server without changing the saved default.

`capsule --help` prints the command list, and `capsule --version` prints the current CLI version.

<!--## Shell completions

`capsule completions <shell>` prints a completion script to stdout. Write it to the appropriate file for your shell and it will be sourced automatically — no rc file edits needed.

**Bash**
```sh
capsule completions bash > ~/.local/share/bash-completion/completions/capsule
```

**Zsh**
```sh
mkdir -p ~/.zfunc
capsule completions zsh > ~/.zfunc/_capsule
```
Add these two lines to `~/.zshrc` once if not already present:
```sh
fpath=(~/.zfunc $fpath)
autoload -Uz compinit && compinit
```

**Fish** (auto-sourced, no setup needed)
```sh
capsule completions fish > ~/.config/fish/completions/capsule.fish
```

**PowerShell**
```powershell
capsule completions powershell > "$HOME/Documents/PowerShell/completions/capsule.ps1"
. "$HOME/Documents/PowerShell/completions/capsule.ps1"
```

Supported shells: `bash`, `zsh`, `fish`, `powershell`, `elvish`.-->

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

Shows recent uploads + downloads history.

`capsule recents clear`

Clears the local history file.

#### `server` (`sv`)
`capsule server info`

Shows the currently active server URL.

`capsule server set <address>`

Stores a custom default server address.

`capsule server reset`

Restores the default hosted server, `https://send.withcapsule.dev`.

## Encryption model
Encryption happens entirely on the client; see [how it works](/guides/getting-started/#how-does-it-work) for the shared model and the rules around the 12-word mnemonic. In the CLI specifically, `upload-encrypted` encrypts before upload and `download` prompts for the mnemonic when a file is marked encrypted. After encrypting, the CLI can display the mnemonic as text or a QR code; once it is on screen, pressing any key wipes the terminal.
