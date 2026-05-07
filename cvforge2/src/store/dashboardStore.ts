// src/store/dashboardStore.ts (Personne 1 — Sprint B)

import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { CVEntry, CVData } from '../types/cv';
import { defaultCVData } from '../types/cv';

interface DashboardStore {
  cvList: CVEntry[];
  loadForUser: (email: string) => void;
  saveForUser: (email: string) => void;
  createCV: (email: string, title?: string) => CVEntry;
  deleteCV: (email: string, id: string) => void;
  duplicateCV: (email: string, id: string) => CVEntry;
  updateCV: (email: string, id: string, data: CVData, title?: string) => void;
  getCVById: (id: string) => CVEntry | undefined;
}

// ── localStorage key per user ─────────────────────────────────────────────────
const storageKey = (email: string) => `cvforge-cvs-${email}`;

const loadFromStorage = (email: string): CVEntry[] => {
  try {
    return JSON.parse(localStorage.getItem(storageKey(email)) || '[]');
  } catch {
    return [];
  }
};

const saveToStorage = (email: string, cvList: CVEntry[]) => {
  localStorage.setItem(storageKey(email), JSON.stringify(cvList));
};

// ── Store ─────────────────────────────────────────────────────────────────────
export const useDashboardStore = create<DashboardStore>()((set, get) => ({
  cvList: [],

  // Load all CVs for a given user from localStorage
  loadForUser: (email) => {
    const cvList = loadFromStorage(email);
    set({ cvList });
  },

  // Persist current cvList to localStorage
  saveForUser: (email) => {
    saveToStorage(email, get().cvList);
  },

  // Create a new empty CV
  createCV: (email, title = 'Mon CV') => {
    const newCV: CVEntry = {
      id: nanoid(),
      title,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      data: { ...defaultCVData },
    };
    const updated = [...get().cvList, newCV];
    set({ cvList: updated });
    saveToStorage(email, updated);
    return newCV;
  },

  // Delete a CV by id
  deleteCV: (email, id) => {
    const updated = get().cvList.filter((cv) => cv.id !== id);
    set({ cvList: updated });
    saveToStorage(email, updated);
  },

  // Duplicate a CV
  duplicateCV: (email, id) => {
    const original = get().cvList.find((cv) => cv.id === id);
    if (!original) throw new Error('CV not found');
    const copy: CVEntry = {
      ...original,
      id: nanoid(),
      title: `${original.title} (copie)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [...get().cvList, copy];
    set({ cvList: updated });
    saveToStorage(email, updated);
    return copy;
  },

  // Update CV data (called when user saves from the editor)
  updateCV: (email, id, data, title) => {
    const updated = get().cvList.map((cv) =>
      cv.id === id ? { ...cv, data, ...(title ? { title } : {}), updatedAt: new Date().toISOString() } : cv
    );
    set({ cvList: updated });
    saveToStorage(email, updated);
  },

  // Get a single CV by id
  getCVById: (id) => get().cvList.find((cv) => cv.id === id),
}));
