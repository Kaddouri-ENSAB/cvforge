# CVForge — Générateur de CV ATS-optimisé

Outil de création de CV destiné aux étudiants en fin de formation. Formulaire multi-sections avec prévisualisation live, radar de compétences, export PDF et partage par URL.

## Démarrage rapide

```bash
npm install
npm run dev
```

## Lancer les tests

```bash
npm run test
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
│   │   ├── SkillsSection.tsx
│   │   ├── ExperiencesSection.tsx
│   │   └── ProjectsSection.tsx
│   ├── preview/            ← Personne 2 (affichage)
│   │   ├── CVPreview.tsx
│   │   └── templates/
│   │       ├── Professionnel.tsx
│   │       ├── Minimaliste.tsx
│   │       ├── Tech.tsx
│   │       └── helpers.tsx
│   ├── analysis/           ← Personne 2 (ATS, score)
│   ├── actions/            ← Personne 1 (import/export, partage)
│   │   └── ShareableURL.tsx
│   └── ui/                 ← Composants réutilisables partagés
├── store/
│   └── cvStore.ts          ← Zustand + localStorage
├── types/
│   ├── cv.ts               ← FICHIER COMMUN (Personne 1 + 2)
│   └── schemas.ts          ← Validation Zod
├── utils/
└── tests/
    ├── serialization.test.ts
    └── validation.test.ts
```

---

## Règle de collaboration

`src/types/cv.ts` est le seul fichier partagé entre Personne 1 et Personne 2. C'est le contrat de données entre les formulaires et la prévisualisation.

---

## Fonctionnalités implémentées

### Formulaire (Personne 1)
- Infos personnelles, formation, expériences, projets, compétences
- Validation Zod sur tous les champs
- Persistance automatique en localStorage via Zustand
- Partage du CV via URL encodée en base64
- Import / Export JSON

### Prévisualisation (Personne 2)
- Split-screen live (mise à jour sans action manuelle)
- 3 templates : Minimaliste, Professionnel, Tech
- Export PDF via window.print()
- Radar de compétences (Recharts)
- Score de complétude & suggestions ATS

---

## Déploiement Netlify

- Build command : `npm run build`
- Publish directory : `dist`
- Le fichier `netlify.toml` gère le routing SPA automatiquement
