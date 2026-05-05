// src/tests/validation.test.ts (Personne 1 — Sprint 4)

import { describe, it, expect } from 'vitest';
import {
  personalInfoSchema,
  educationSchema,
  skillSchema,
  experienceSchema,
  projectSchema,
  cvFormSchema,
} from '../types/schemas';

// ── personalInfoSchema ────────────────────────────────────────────────────────

describe('Validation — personalInfoSchema', () => {
  it('accepts a valid personal info object', () => {
    const result = personalInfoSchema.safeParse({
      fullName: 'Jean Dupont',
      email: 'jean@example.com',
    });
    expect(result.success).toBe(true);
  });

  it('rejects fullName shorter than 2 characters', () => {
    const result = personalInfoSchema.safeParse({ fullName: 'J', email: '' });
    expect(result.success).toBe(false);
  });

  it('rejects an invalid email', () => {
    const result = personalInfoSchema.safeParse({ fullName: 'Jean', email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('accepts an empty email (optional)', () => {
    const result = personalInfoSchema.safeParse({ fullName: 'Jean', email: '' });
    expect(result.success).toBe(true);
  });

  it('rejects summary longer than 600 characters', () => {
    const result = personalInfoSchema.safeParse({
      fullName: 'Jean',
      email: '',
      summary: 'a'.repeat(601),
    });
    expect(result.success).toBe(false);
  });

  it('accepts summary of exactly 600 characters', () => {
    const result = personalInfoSchema.safeParse({
      fullName: 'Jean',
      email: '',
      summary: 'a'.repeat(600),
    });
    expect(result.success).toBe(true);
  });

  it('fills in default values for optional fields', () => {
    const result = personalInfoSchema.safeParse({ fullName: 'Jean', email: '' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.phone).toBe('');
      expect(result.data.summary).toBe('');
    }
  });
});

// ── educationSchema ───────────────────────────────────────────────────────────

describe('Validation — educationSchema', () => {
  const valid = {
    id: 'e1',
    institution: 'ENSA Berrechid',
    degree: 'Ingénieur',
    startDate: '2022-09',
  };

  it('accepts a valid education entry', () => {
    expect(educationSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects missing institution', () => {
    expect(educationSchema.safeParse({ ...valid, institution: '' }).success).toBe(false);
  });

  it('rejects missing degree', () => {
    expect(educationSchema.safeParse({ ...valid, degree: '' }).success).toBe(false);
  });

  it('rejects missing startDate', () => {
    expect(educationSchema.safeParse({ ...valid, startDate: '' }).success).toBe(false);
  });

  it('defaults current to false', () => {
    const result = educationSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.current).toBe(false);
  });
});

// ── skillSchema ───────────────────────────────────────────────────────────────

describe('Validation — skillSchema', () => {
  const valid = { id: 's1', name: 'React', level: 3, category: 'hard' as const };

  it('accepts a valid skill', () => {
    expect(skillSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects level below 1', () => {
    expect(skillSchema.safeParse({ ...valid, level: 0 }).success).toBe(false);
  });

  it('rejects level above 5', () => {
    expect(skillSchema.safeParse({ ...valid, level: 6 }).success).toBe(false);
  });

  it('rejects invalid category', () => {
    expect(skillSchema.safeParse({ ...valid, category: 'other' }).success).toBe(false);
  });

  it('accepts soft category', () => {
    expect(skillSchema.safeParse({ ...valid, category: 'soft' }).success).toBe(true);
  });

  it('rejects empty skill name', () => {
    expect(skillSchema.safeParse({ ...valid, name: '' }).success).toBe(false);
  });
});

// ── experienceSchema ──────────────────────────────────────────────────────────

describe('Validation — experienceSchema', () => {
  const valid = { id: 'x1', company: 'Google', position: 'Développeur' };

  it('accepts a valid experience', () => {
    expect(experienceSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects empty company', () => {
    expect(experienceSchema.safeParse({ ...valid, company: '' }).success).toBe(false);
  });

  it('rejects empty position', () => {
    expect(experienceSchema.safeParse({ ...valid, position: '' }).success).toBe(false);
  });

  it('defaults current to false', () => {
    const result = experienceSchema.safeParse(valid);
    if (result.success) expect(result.data.current).toBe(false);
  });

  it('defaults achievements to empty array', () => {
    const result = experienceSchema.safeParse(valid);
    if (result.success) expect(result.data.achievements).toEqual([]);
  });
});

// ── projectSchema ─────────────────────────────────────────────────────────────

describe('Validation — projectSchema', () => {
  const valid = { id: 'p1', name: 'CVForge' };

  it('accepts a valid project', () => {
    expect(projectSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects empty project name', () => {
    expect(projectSchema.safeParse({ ...valid, name: '' }).success).toBe(false);
  });

  it('defaults optional fields to empty string', () => {
    const result = projectSchema.safeParse(valid);
    if (result.success) {
      expect(result.data.url).toBe('');
      expect(result.data.github).toBe('');
      expect(result.data.description).toBe('');
    }
  });
});

// ── cvFormSchema (full form) ──────────────────────────────────────────────────

describe('Validation — cvFormSchema', () => {
  it('accepts a minimal valid form (only fullName required)', () => {
    const result = cvFormSchema.safeParse({
      personal: { fullName: 'Jean', email: '' },
    });
    expect(result.success).toBe(true);
  });

  it('defaults all arrays to empty', () => {
    const result = cvFormSchema.safeParse({
      personal: { fullName: 'Jean', email: '' },
    });
    if (result.success) {
      expect(result.data.education).toEqual([]);
      expect(result.data.skills).toEqual([]);
      expect(result.data.experiences).toEqual([]);
      expect(result.data.projects).toEqual([]);
    }
  });

  it('rejects if personal is missing', () => {
    expect(cvFormSchema.safeParse({}).success).toBe(false);
  });
});
