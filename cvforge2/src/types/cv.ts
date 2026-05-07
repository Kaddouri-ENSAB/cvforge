// ─────────────────────────────────────────────────────────────────────────────
// src/types/cv.ts
// FICHIER COMMUN — Personne 1 & Personne 2 travaillent ensemble sur ce fichier
// C'est le seul lien entre les deux parties du projet.
// ─────────────────────────────────────────────────────────────────────────────

// ── Personal info ─────────────────────────────────────────────────────────────

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  github: string;
  website: string;
  summary: string;
}

// ── Education ─────────────────────────────────────────────────────────────────

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

// ── Work experience ───────────────────────────────────────────────────────────

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

// ── Skills ────────────────────────────────────────────────────────────────────

export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
  category: 'hard' | 'soft';
}

// ── Languages ─────────────────────────────────────────────────────────────────

export type LanguageLevel = 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Courant' | 'Natif';

export interface Language {
  id: string;
  name: string;
  level: LanguageLevel;
}

// ── Projects ──────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url: string;
  github: string;
}

// ── Certifications ────────────────────────────────────────────────────────────

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

// ── Root CV data ──────────────────────────────────────────────────────────────

export interface CVData {
  personal: PersonalInfo;
  education: Education[];
  experiences: WorkExperience[];
  skills: Skill[];
  languages: Language[];
  projects: Project[];
  certifications: Certification[];
}

// ── Template ──────────────────────────────────────────────────────────────────

export type Template = 'minimaliste' | 'professionnel' | 'tech';

// ── Default empty CV (used to init the store) ─────────────────────────────────

export const defaultCVData: CVData = {
  personal: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    github: '',
    website: '',
    summary: '',
  },
  education: [],
  experiences: [],
  skills: [],
  languages: [],
  projects: [],
  certifications: [],
};

// ── Auth ──────────────────────────────────────────────────────────────────────

export interface User {
  email: string;
  password: string;
}

export interface AuthState {
  currentUser: string | null; // stores email
}

// ── CV Entry (dashboard) ──────────────────────────────────────────────────────

export interface CVEntry {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  data: CVData;
}
