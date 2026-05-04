# CVForge — Sprint 1

## Démarrage rapide

```bash
npm install
npm run dev
```

---

## Structure du projet

```
src/
├── components/
│   ├── forms/              ← Personne 1 (formulaires)
│   │   ├── CVForm.tsx
│   │   ├── PersonalSection.tsx
│   │   ├── EducationSection.tsx
│   │   └── SkillsSection.tsx
│   ├── preview/            ← Personne 2 (affichage)
│   │   ├── CVPreview.tsx
│   │   └── templates/
│   │       ├── Professionnel.tsx
│   │       ├── Minimaliste.tsx
│   │       ├── Tech.tsx
│   │       └── helpers.tsx
│   ├── analysis/           ← Sprint 3 (ATS, score)
│   ├── actions/            ← Sprint 3 (import/export, partage)
│   └── ui/                 ← Composants réutilisables
├── store/
│   └── cvStore.ts          ← Personne 1 (Zustand + localStorage)
├── types/
│   ├── cv.ts               ← FICHIER COMMUN (Personne 1 + 2)
│   └── schemas.ts          ← Personne 1 (Zod)
├── utils/                  ← Utilitaires partagés
└── tests/                  ← Sprint 4
```

---

## Règle de collaboration

**`src/types/cv.ts` est le seul fichier partagé.** Les deux personnes peuvent le modifier ensemble. C'est le contrat entre les deux parties :
- Personne 1 lit/écrit les données via les formulaires
- Personne 2 lit les données pour les afficher

---

## Sprint 1 — Personne 1 ✅ Terminé

- [x] Types TypeScript complets (`src/types/cv.ts`)
- [x] Store Zustand avec localStorage (`src/store/cvStore.ts`)
- [x] Formulaire infos personnelles
- [x] Formulaire formation
- [x] Formulaire compétences avec niveau 1-5
- [x] Validation Zod

## Sprint 1 — Personne 2

- [ ] CVPreview (affichage infos personnelles)
- [ ] Affichage formation dans le preview
- [ ] Mise en page split-screen

> Note : des versions de base sont déjà présentes dans `components/preview/` pour que l'app tourne. Personne 2 doit les améliorer/remplacer.

---

## Déploiement Netlify

- Build command : `npm run build`
- Publish directory : `dist`
