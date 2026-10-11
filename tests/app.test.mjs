import test from 'node:test';
import assert from 'node:assert/strict';
import { format } from '../app.js';
test('formats recording time with stable tabular-style values', () => { assert.equal(format(0), '00:00'); assert.equal(format(67), '01:07'); assert.equal(format(3601), '60:01'); });
