// src/tests/serialization.test.ts (Personne 1 — Sprint 4)

import { describe, it, expect } from 'vitest';
import { defaultCVData } from '../types/cv';
import type { CVData } from '../types/cv';

// ── Helpers (mirror the logic in cvStore & ShareableURL) ─────────────────────

const exportJSON = (data: CVData): string => JSON.stringify(data, null, 2);

const importJSON = (json: string): CVData | null => {
  try {
    return JSON.parse(json) as CVData;
  } catch {
    return null;
  }
};

const toHash = (data: CVData): string => btoa(exportJSON(data));

const fromHash = (hash: string): CVData | null => {
  try {
    return importJSON(atob(hash));
  } catch {
    return null;
  }
};

// ── Sample data ───────────────────────────────────────────────────────────────

const sampleCV: CVData = {
  ...defaultCVData,
  personal: {
    fullName: 'Jean Dupont',
    email: 'jean@example.com',
    phone: '+212 6 00 00 00 00',
    address: 'Casablanca',
    linkedin: '',
    github: 'github.com/jean',
    website: '',
    summary: 'Développeur passionné.',
  },
  skills: [
    { id: '1', name: 'React', level: 4, category: 'hard' },
    { id: '2', name: 'Communication', level: 3, category: 'soft' },
  ],
  education: [
    {
      id: 'e1',
      institution: 'ENSA Berrechid',
      degree: 'Ingénieur',
      field: 'Informatique',
      startDate: '2022-09',
      endDate: '2025-06',
      current: false,
      description: '',
    },
  ],
};

// ── Tests: JSON export/import ─────────────────────────────────────────────────

describe('Serialization — JSON', () => {
  it('exports CV data to a valid JSON string', () => {
    const json = exportJSON(sampleCV);
    expect(typeof json).toBe('string');
    expect(() => JSON.parse(json)).not.toThrow();
  });

  it('exported JSON contains all top-level keys', () => {
    const json = exportJSON(sampleCV);
    const parsed = JSON.parse(json);
    expect(parsed).toHaveProperty('personal');
    expect(parsed).toHaveProperty('education');
    expect(parsed).toHaveProperty('experiences');
    expect(parsed).toHaveProperty('skills');
    expect(parsed).toHaveProperty('projects');
    expect(parsed).toHaveProperty('languages');
    expect(parsed).toHaveProperty('certifications');
  });

  it('imports JSON back to the original object', () => {
    const json = exportJSON(sampleCV);
    const imported = importJSON(json);
    expect(imported).toEqual(sampleCV);
  });

  it('preserves personal info through export → import', () => {
    const json = exportJSON(sampleCV);
    const imported = importJSON(json);
    expect(imported?.personal.fullName).toBe('Jean Dupont');
    expect(imported?.personal.email).toBe('jean@example.com');
  });

  it('preserves skills array through export → import', () => {
    const json = exportJSON(sampleCV);
    const imported = importJSON(json);
    expect(imported?.skills).toHaveLength(2);
    expect(imported?.skills[0].name).toBe('React');
    expect(imported?.skills[0].level).toBe(4);
  });

  it('preserves education array through export → import', () => {
    const json = exportJSON(sampleCV);
    const imported = importJSON(json);
    expect(imported?.education[0].institution).toBe('ENSA Berrechid');
  });

  it('returns null for invalid JSON', () => {
    expect(importJSON('not json at all')).toBeNull();
    expect(importJSON('')).toBeNull();
    expect(importJSON('{broken')).toBeNull();
  });

  it('export → import is a round-trip (no data loss)', () => {
    const json = exportJSON(sampleCV);
    const imported = importJSON(json);
    expect(exportJSON(imported!)).toBe(json);
  });
});

// ── Tests: URL hash ───────────────────────────────────────────────────────────

describe('Serialization — URL hash (base64)', () => {
  it('encodes CV to a non-empty base64 string', () => {
    const hash = toHash(sampleCV);
    expect(typeof hash).toBe('string');
    expect(hash.length).toBeGreaterThan(0);
  });

  it('decodes hash back to the original CV', () => {
    const hash = toHash(sampleCV);
    const decoded = fromHash(hash);
    expect(decoded).toEqual(sampleCV);
  });

  it('hash does not contain raw JSON characters', () => {
    const hash = toHash(sampleCV);
    expect(hash).not.toContain('{');
    expect(hash).not.toContain('"');
  });

  it('returns null for an invalid hash', () => {
    expect(fromHash('!!!invalid base64!!!')).toBeNull();
  });

  it('different CVs produce different hashes', () => {
    const hash1 = toHash(sampleCV);
    const hash2 = toHash(defaultCVData);
    expect(hash1).not.toBe(hash2);
  });

  it('hash round-trip preserves personal info', () => {
    const decoded = fromHash(toHash(sampleCV));
    expect(decoded?.personal.fullName).toBe('Jean Dupont');
  });
});
