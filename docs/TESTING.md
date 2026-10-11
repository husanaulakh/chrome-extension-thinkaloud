# Testing

Run `npm test` for the unit and integration suite. The tests cover stable timer formatting, the presence of the capture/review surfaces, and the local persistence/export/delete seams.

For browser integration coverage, use Playwright against `python3 -m http.server 4173`: start a session, switch to Question tags, add a marker, end the session, and assert the marker appears in the review timeline. The browser version should also cover microphone permission denial, refresh recovery, export download, delete confirmation, and reduced-motion behavior.

The browser build requests microphone access only after Start, persists the recording in IndexedDB, and uses native playback. Tests should still run with microphone permission denied to verify that the session does not start and the user gets a clear recovery path.
