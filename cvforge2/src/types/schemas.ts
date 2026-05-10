// src/types/schemas.ts — Validation Zod (Personne 1)

import { z } from 'zod';

export const personalInfoSchema = z.object({
  fullName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide').or(z.literal('')),
  phone: z.string().optional().default(''),
  address: z.string().optional().default(''),
  linkedin: z.string().url('URL LinkedIn invalide').or(z.literal('')).optional().default(''),
  github: z.string().optional().default(''),
  website: z.string().url('URL invalide').or(z.literal('')).optional().default(''),
  summary: z.string().max(600, 'Max 600 caractères').optional().default(''),
});

export const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, "Établissement requis"),
  degree: z.string().min(1, 'Diplôme requis'),
  field: z.string().optional().default(''),
  startDate: z.string().min(1, 'Date de début requise'),
  endDate: z.string().optional().default(''),
  current: z.boolean().default(false),
  description: z.string().optional().default(''),
});

export const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Nom requis'),
  level: z.number().min(1).max(5).default(3),
  category: z.enum(['hard', 'soft']).default('hard'),
});

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, 'Entreprise requise'),
  position: z.string().min(1, 'Poste requis'),
  startDate: z.string().optional().default(''),
  endDate: z.string().optional().default(''),
  current: z.boolean().default(false),
  description: z.string().optional().default(''),
  achievements: z.array(z.string()).default([]),
});

export const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Nom requis'),
  description: z.string().optional().default(''),
  technologiesRaw: z.string().optional().default(''),
  technologies: z.array(z.string()).default([]),
  url: z.string().optional().default(''),
  github: z.string().optional().default(''),
});

export const languageSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Langue requise'),
  level: z.enum(['Débutant', 'Intermédiaire', 'Avancé', 'Courant', 'Natif']).default('Intermédiaire'),
});

export const certificationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Nom requis'),
  issuer: z.string().optional().default(''),
  date: z.string().optional().default(''),
  url: z.string().optional().default(''),
});

export const cvFormSchema = z.object({
  personal: personalInfoSchema,
  education: z.array(educationSchema).default([]),
  skills: z.array(skillSchema).default([]),
  experiences: z.array(experienceSchema).default([]),
  projects: z.array(projectSchema).default([]),
  languages: z.array(languageSchema).default([]),
  certifications: z.array(certificationSchema).default([]),
});

export type CVFormValues = z.infer<typeof cvFormSchema>;
