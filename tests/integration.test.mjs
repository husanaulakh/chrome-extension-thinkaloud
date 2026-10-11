import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('preview ships the complete capture and review surfaces', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /id="session-form"/);
  assert.match(html, /id="recording"/);
  assert.match(html, /id="review"/);
  assert.match(html, /id="export"/);
  assert.match(html, /id="delete"/);
});

test('browser module contains local persistence and export behavior', async () => {
  const source = await readFile(new URL('../app.js', import.meta.url), 'utf8');
  assert.match(source, /thinkaloud:last-session/);
  assert.match(source, /new Blob/);
  assert.match(source, /confirm\(/);
});
