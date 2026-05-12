// src/store/cvStore.ts (Personne 1)
// cvStore is a TEMPORARY workspace — dashboardStore handles persistence

import { create } from 'zustand';
import type { CVData, Template } from '../types/cv';
import { defaultCVData } from '../types/cv';

interface CVStore {
  data: CVData;
  template: Template;
  setData: (data: CVData) => void;
  updateData: (partial: Partial<CVData>) => void;
  setTemplate: (template: Template) => void;
  reset: () => void;
  importJSON: (json: string) => boolean;
  exportJSON: () => string;
}

export const useCVStore = create<CVStore>()((set, get) => ({
  data: defaultCVData,
  template: 'professionnel',

  setData: (data) => set({ data }),

  updateData: (partial) =>
    set((state) => ({ data: { ...state.data, ...partial } })),

  setTemplate: (template) => set({ template }),

  reset: () => set({ data: defaultCVData }),

  importJSON: (json) => {
    try {
      const parsed = JSON.parse(json) as CVData;
      set({ data: parsed });
      return true;
    } catch {
      return false;
    }
  },

  exportJSON: () => JSON.stringify(get().data, null, 2),
}));