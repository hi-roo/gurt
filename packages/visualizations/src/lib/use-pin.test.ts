import { describe, expect, it } from 'vitest';
import { clampFocus, togglePinned } from './use-pin';

describe('togglePinned', () => {
  it('setzt einen neuen Index', () => {
    expect(togglePinned(null, 2)).toBe(2);
    expect(togglePinned(1, 2)).toBe(2);
  });
  it('hebt denselben Index auf (Toggle)', () => {
    expect(togglePinned(2, 2)).toBe(null);
  });
});

describe('clampFocus', () => {
  it('klemmt auf 0..count-1', () => {
    expect(clampFocus(0, null, -1, 5)).toBe(0);
    expect(clampFocus(4, null, 1, 5)).toBe(4);
    expect(clampFocus(2, null, 1, 5)).toBe(3);
    expect(clampFocus(2, null, -1, 5)).toBe(1);
  });
  it('startet ohne Fokus sinnvoll (vorwärts ab 0)', () => {
    expect(clampFocus(null, null, 1, 5)).toBe(0);
    expect(clampFocus(null, null, -1, 5)).toBe(0);
  });
  it('fällt auf den Pin zurück, wenn kein Hover', () => {
    expect(clampFocus(null, 3, 1, 5)).toBe(4);
  });
  it('liefert null bei count 0', () => {
    expect(clampFocus(0, null, 1, 0)).toBe(null);
  });
});
