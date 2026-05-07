// src/store/authStore.ts (Personne 1 — Sprint A)

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types/cv';

interface AuthStore {
  currentUser: string | null; // email of logged-in user
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

// ── Helpers to manage users list in localStorage ──────────────────────────────

const getUsers = (): User[] => {
  try {
    return JSON.parse(localStorage.getItem('cvforge-users') || '[]');
  } catch {
    return [];
  }
};

const saveUsers = (users: User[]) => {
  localStorage.setItem('cvforge-users', JSON.stringify(users));
};

// ── Store ─────────────────────────────────────────────────────────────────────

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      currentUser: null,

      login: (email, password) => {
        const users = getUsers();
        const user = users.find((u) => u.email === email && u.password === password);
        if (!user) {
          return { success: false, error: 'Email ou mot de passe incorrect' };
        }
        set({ currentUser: email });
        return { success: true };
      },

      register: (email, password) => {
        const users = getUsers();
        const exists = users.find((u) => u.email === email);
        if (exists) {
          return { success: false, error: 'Un compte existe déjà avec cet email' };
        }
        saveUsers([...users, { email, password }]);
        set({ currentUser: email });
        return { success: true };
      },

      logout: () => set({ currentUser: null }),
    }),
    { name: 'cvforge-auth' }
  )
);
