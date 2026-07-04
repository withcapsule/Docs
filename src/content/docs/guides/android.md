---
title: Android
description: Upload and download files with the Capsule Android app.
---

The Android app is the main mobile Capsule client. It is built for quick send-and-receive workflows, especially when you are moving files between a phone and another device.

## Screens
Click any screenshot to open the full-size image.

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;align-items:start;">
  <a href="/images/android/Android_Send.png" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">
    <img src="/images/android/thumbs/Android_Send.webp" alt="Capsule Android send screen" style="width:100%;max-width:280px;height:auto;border-radius:12px;" />
    <div style="margin-top:0.5rem;font-size:0.95rem;">Send</div>
  </a>
  <a href="/images/android/Android_Receive.png" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">
    <img src="/images/android/thumbs/Android_Receive.webp" alt="Capsule Android receive screen" style="width:100%;max-width:280px;height:auto;border-radius:12px;" />
    <div style="margin-top:0.5rem;font-size:0.95rem;">Receive</div>
  </a>
  <a href="/images/android/Android_History.png" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">
    <img src="/images/android/thumbs/Android_History.webp" alt="Capsule Android history screen" style="width:100%;max-width:280px;height:auto;border-radius:12px;" />
    <div style="margin-top:0.5rem;font-size:0.95rem;">History</div>
  </a>
  <a href="/images/android/Android_Settings.png" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">
    <img src="/images/android/thumbs/Android_Settings.webp" alt="Capsule Android settings screen" style="width:100%;max-width:280px;height:auto;border-radius:12px;" />
    <div style="margin-top:0.5rem;font-size:0.95rem;">Settings</div>
  </a>
</div>

## Sending
You can upload from inside the app or share a file from another Android app directly into Capsule. After upload, the app returns the file ID and download URL so you can pass them on immediately.

The app will output a QR code for scanning once the upload is complete.

## Receiving
Paste a file ID or full download URL into the app to fetch a file. Downloads can go to the system Downloads area or to a folder you choose during setup.

The app can also scan a QR code containing an ID, a download link, or a decryption key.

## Encrypted transfers
The app handles the full encryption flow: it encrypts before upload, detects encrypted downloads automatically (via the server's `X-Encrypted` response header), and prompts for the 12-word mnemonic before decrypting. As with every Capsule client, the mnemonic is never stored (see [how encryption works](/guides/getting-started/#how-does-it-work)).

It also keeps a local transfer history and supports custom server configuration, so it works against both the hosted Capsule service and self-hosted instances.

## Building and contributing

This section is for developers who want to build the Android client from source or contribute to it.

### Project details

- **Package:** `dev.withcapsule.android`
- **Minimum SDK:** 29 (Android 10 "Quince Tart")
- **[Target SDK](https://apilevels.com/):** 36 (Android 16 "Baklava")

### Tech stack

- **Language:** Kotlin
- **UI:** Jetpack Compose (Material 3), Navigation Compose, core-splashscreen
- **Networking:** Retrofit + OkHttp, kotlinx.serialization
- **Storage:** DataStore Preferences
- **Camera / QR scan:** CameraX + Google ML Kit barcode scanning
- **QR generation:** [QRose](https://github.com/alexzhirkevich/qrose)
- **Encryption:** [kage](https://github.com/android-password-store/kage) (age) for file encryption, [kotlin-bip39](https://github.com/zcash/kotlin-bip39) for the 12-word recovery mnemonic
- **Analytics:** via [umami-kotlin](https://github.com/AppOutlet/umami-kotlin)

### Project structure

```
app/src/main/java/dev/withcapsule/android/
├── MainActivity.kt          # Entry point, NavHost (Upload/Download/History/Settings/QRScanner), onboarding gate, share-intent handling
├── CapsuleApp.kt            # @HiltAndroidApp Application class
├── Analytics.kt             # AnalyticsManager
├── dependencyinjector/      # Hilt modules (DB, DataStore repo, OkHttpClient bindings)
├── data/
│   ├── local/               # SettingsRepository (DataStore); AppDB + HistoryDataAccessObject + HistoryEntry (Room)
│   └── remote/              # ApiService (Retrofit interface), ApiServiceFactory (builds an ApiService per base URL)
└── ui/
    ├── screens/             # Upload, Download, History, Settings, Onboarding, QRScanner
    ├── components/          # Shared composables
    ├── viewmodel/           # Upload, Download, History, Settings view models
    └── theme/               # Color, Type, Theme (light/dark/system)
```

The server API (`data/remote/ApiService.kt`) is small: `ping`, `upload`, `download/{id}`, `status/{id}`, and `delete/{id}`.

### Building and running

Open the `Android/` directory as a Gradle project in Android Studio and run the imported `app` configuration, or use the wrapper from that directory:

Mac/Linux:
```bash
./gradlew assembleDebug     # build debug APK
./gradlew installDebug      # build + install on a connected device/emulator
```

Windows:
```ps1
gradlew.bat assembleDebug  # build debug APK
gradlew.bat installDebug   # build + install APK
```

### Testing

The test suite is instrumented (Compose UI tests plus Hilt-injected ViewModel tests), so it needs a connected device or emulator rather than a plain JVM:

```bash
./gradlew connectedAndroidTest      # run the full suite
```

To iterate on a single class or method: `./gradlew connectedDebugAndroidTest -Pandroid.testInstrumentationRunnerArguments.class=<FQCN>` (append `#methodName` to target one test).

Tests live under `app/src/androidTest/java/dev/withcapsule/android/`, mirroring `ui/screens/` and `ui/viewmodel/` (`ui/screens/*ComposeTest.kt`, `ui/viewmodel/*InstrumentedTest.kt`). The network layer is mocked with MockK; local storage (Room, DataStore) is exercised for real against an in-memory/on-device store.

### Release signing

The release build reads its signing config from 4 environment variables:

| Variable            | Description                       |
| ------------------- | --------------------------------- |
| `KEYSTORE_PATH`     | Path to the release keystore file |
| `KEYSTORE_PASSWORD` | Keystore password                 |
| `KEY_ALIAS`         | Key alias                         |
| `KEY_PASSWORD`      | Key password                      |
