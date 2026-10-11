# Architecture notes

The system is intentionally dependency-free: semantic HTML, CSS, and a small ES module. The browser build now uses the native recording primitives and keeps the same seams:

1. `CaptureSession` owns microphone lifecycle and writes an append-only local recording.
2. `MarkerStore` owns `{ sessionId, timestamp, label, confidence }` records.
3. `ReviewModel` derives question clips from adjacent timestamps without splitting audio during capture.
4. `ExportService` produces audio plus JSON/CSV markers, so the user owns the data.

Use IndexedDB for session metadata and audio blobs. The implementation autosaves marker events and recording chunks, requests microphone permission only after the user clicks Start, stops all tracks when a session ends, and uses native audio playback for review. It does not use content scripts for the core path.

The remaining production hardening is recovery UI for an interrupted recording, richer marker editing, and a packaged extension host. The capture and playback path itself is real and runs on localhost or HTTPS.
