# ThinkAloud — local study recorder

Keep the reasoning, not just the answer. ThinkAloud records what you were thinking while you study: one continuous local audio file with timestamp question markers you can jump back to later. Everything stays on the device.

No account. No transcript. No page access. Free, local, and deliberately small.

## How it works

1. **Start a session** — name it, pick a capture mode:
   - **Audio only**: record everything, no tagging, no interruptions.
   - **Question tags**: mark questions as you say them ("question 17"), then jump back later.
2. **Record** — microphone is requested only after you click Start. Markers autosave every 5 seconds to IndexedDB; refresh recovery restores an interrupted recording.
3. **Review** — play back the continuous recording, jump to any marker, export the session as JSON, or delete it from the device.

Question tags are timestamps attached to one audio file, not separate recordings. That keeps the mental model simple and review fast.

## Run locally

No dependencies, no build step. Requires a current browser over `localhost` or HTTPS (microphone requirement).

```bash
npm test                    # unit + integration suite
npm run serve               # python3 -m http.server 4173
```

Open http://localhost:4173. For the full browser-integration checklist (mic denial, refresh recovery, export, delete, reduced motion), see [docs/TESTING.md](docs/TESTING.md).

## Chrome extension

`extension/` is a Manifest V3 popup (`storage` permission only) that opens the local recorder in a full tab. A pre-packaged build ships at `download/thinkaloud-chrome.zip`; the preview site links to it from the header.

## Project layout

- `index.html`, `app.js`, `styles.css` — static preview site (capture → review flow)
- `extension/` — Chrome extension (popup + recorder pages, manifest)
- `download/thinkaloud-chrome.zip` — packaged extension
- `tests/` — `node:test` unit + integration suite
- `docs/` — [business case](docs/BUSINESS.md), [architecture](docs/ARCHITECTURE.md), [testing](docs/TESTING.md)

## Design principles

- **Local-first**: IndexedDB for audio blobs + session metadata, `localStorage` for the last-session pointer. No server, no analytics.
- **Trust by doing less**: no correctness scoring, answer extraction, forced transcription, page scraping, or social feed.
- **Crash-safe**: autosaved marker events and recording chunks; permission issues never silently lose a session.
- **Accessible**: optional on-device transcription (browser speech recognition), reduced-motion support.

## Docs

- [Why this exists](docs/BUSINESS.md) — customer pain, product wedge, success signals, non-goals
- [How it works](docs/ARCHITECTURE.md) — `CaptureSession` / `MarkerStore` / `ReviewModel` / `ExportService` seams
- [Testing](docs/TESTING.md) — unit suite + Playwright browser coverage
