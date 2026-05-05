// src/components/dashboard/Dashboard.tsx (Personne 2 — UI)
// Les callbacks onEdit / onDuplicate / onDelete / onCreate sont des props
// → Personne 1 branchera la logique Zustand dessus depuis App.tsx

import { useState } from 'react';
import type { CVEntry } from '../../types/cv';
import CVCard from './CVCard';
import EmptyState from './EmptyState';
import SearchBar from './SearchBar';

// ── Données mock — à remplacer par useCVStore() quand Personne 1 sera prête ──
const mockEntries: CVEntry[] = [
  {
    id: '1',
    title: 'CV Développeur Frontend',
    createdAt: '2024-11-01T10:00:00Z',
    updatedAt: '2024-11-15T14:30:00Z',
    data: {
      personal: {
        fullName: 'Assia Kaddouri',
        email: 'assia@example.com',
        phone: '+212 6 00 00 00 00',
        address: 'Casablanca, Maroc',
        linkedin: 'linkedin.com/in/assia',
        github: 'github.com/assia',
        website: '',
        summary: 'Développeuse frontend passionnée par React et TypeScript.',
      },
      education: [{
        id: 'e1', institution: 'ENSA Marrakech', degree: 'Ingénieure',
        field: 'Génie Logiciel', startDate: '2020-09', endDate: '2025-06',
        current: true, description: '',
      }],
      experiences: [],
      skills: [
        { id: 's1', name: 'React',      level: 4, category: 'hard' },
        { id: 's2', name: 'TypeScript', level: 3, category: 'hard' },
        { id: 's3', name: 'Tailwind',   level: 4, category: 'hard' },
      ],
      languages: [{ id: 'l1', name: 'Français', level: 'Courant' }],
      projects: [],
      certifications: [],
    },
  },
  {
    id: '2',
    title: 'CV Stage PFE',
    createdAt: '2024-12-01T09:00:00Z',
    updatedAt: '2024-12-10T11:00:00Z',
    data: {
      personal: {
        fullName: 'Assia Kaddouri',
        email: 'assia@example.com',
        phone: '+212 6 00 00 00 00',
        address: 'Casablanca, Maroc',
        linkedin: '', github: '', website: '',
        summary: 'Étudiante ingénieure cherchant un stage PFE en développement web.',
      },
      education: [],
      experiences: [],
      skills: [{ id: 's1', name: 'React', level: 3, category: 'hard' }],
      languages: [],
      projects: [],
      certifications: [],
    },
  },
];

interface DashboardProps {
  // Personne 1 branchera ces callbacks depuis App.tsx
  onCreateCV?:    () => void;
  onEditCV?:      (id: string) => void;
  onDuplicateCV?: (id: string) => void;
  onDeleteCV?:    (id: string) => void;
  // Données réelles depuis le store (optionnel — mock si absent)
  entries?: CVEntry[];
}

export default function Dashboard({
  onCreateCV    = () => {},
  onEditCV      = () => {},
  onDuplicateCV = () => {},
  onDeleteCV    = () => {},
  entries,
}: DashboardProps) {
  const [search, setSearch]         = useState('');
  const [previewId, setPreviewId]   = useState<string | null>(null);

  // Utiliser les vraies données si fournies, sinon mock
  const allEntries = entries ?? mockEntries;

  // Filtrage par recherche
  const filtered = allEntries.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  const isSearching = search.trim().length > 0;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <header className="bg-white border-b border-slate-200 shadow-sm no-print">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center text-white font-bold text-sm shadow">
              CV
            </div>
            <div>
              <span className="font-bold text-slate-800 text-lg">CVForge</span>
              <span className="text-slate-400 text-sm ml-2 hidden sm:inline">— Mes CVs</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onCreateCV}
            aria-label="Créer un nouveau CV"
            className="
              inline-flex items-center gap-2
              px-4 py-2.5 rounded-xl
              bg-teal-500 text-white text-sm font-semibold
              shadow-md hover:bg-teal-600 hover:shadow-lg
              active:scale-95 transition-all duration-150
              focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2
            "
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5"  y1="12" x2="19" y2="12" />
            </svg>
            Nouveau CV
          </button>
        </div>
      </header>

      {/* ── Contenu ── */}
      <main className="max-w-6xl mx-auto px-6 py-8">

        {/* Stats + Recherche */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Mes CVs</h1>
            <p className="text-sm text-slate-400 mt-1">
              {allEntries.length} CV{allEntries.length > 1 ? 's' : ''} enregistré{allEntries.length > 1 ? 's' : ''}
            </p>
          </div>
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* Cartes statistiques */}
        {allEntries.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'CVs créés',   value: allEntries.length,   icon: '📄', color: 'bg-teal-50  border-teal-100  text-teal-700'  },
              { label: 'Ce mois-ci',  value: allEntries.filter(e => new Date(e.createdAt).getMonth() === new Date().getMonth()).length, icon: '📅', color: 'bg-blue-50  border-blue-100  text-blue-700'  },
              { label: 'Complets',    value: allEntries.filter(e => e.data.personal.fullName && e.data.skills.length >= 3).length, icon: '✅', color: 'bg-green-50 border-green-100 text-green-700' },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`rounded-2xl border p-4 flex items-center gap-3 ${stat.color.split(' ').slice(0,2).join(' ')} border-${stat.color.split(' ')[1]}`}
              >
                <span className="text-2xl" aria-hidden="true">{stat.icon}</span>
                <div>
                  <p className={`text-xl font-bold ${stat.color.split(' ')[2]}`}>{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grille de CVs ou état vide */}
        {filtered.length === 0 ? (
          <EmptyState isSearching={isSearching} onCreateClick={onCreateCV} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((entry) => (
              <CVCard
                key={entry.id}
                entry={entry}
                onEdit={onEditCV}
                onDuplicate={onDuplicateCV}
                onDelete={onDeleteCV}
                onPreview={(id) => setPreviewId(id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Aperçu modal — simple, sans dépendance */}
      {previewId && (
        <PreviewModal
          entry={allEntries.find((e) => e.id === previewId)!}
          onClose={() => setPreviewId(null)}
        />
      )}
    </div>
  );
}

// ── Modal aperçu inline (léger, sans fichier séparé) ────────────────────────
function PreviewModal({ entry, onClose }: { entry: CVEntry; onClose: () => void }) {
  const p = entry.data.personal;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 no-print"
      style={{ backdropFilter: 'blur(3px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Aperçu du CV : ${entry.title}`}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white rounded-t-2xl">
          <div>
            <h2 className="text-sm font-bold text-slate-800">{entry.title}</h2>
            <p className="text-xs text-slate-400">Aperçu rapide</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer l'aperçu"
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenu du CV */}
        <div className="px-6 py-6 space-y-5">
          {/* Infos perso */}
          <div className="text-center pb-4 border-b border-slate-100">
            <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xl font-bold mx-auto mb-3">
              {p.fullName?.[0]?.toUpperCase() || '?'}
            </div>
            <h3 className="text-lg font-bold text-slate-800">{p.fullName || '—'}</h3>
            <p className="text-sm text-slate-500 mt-0.5">{p.email}</p>
            <p className="text-sm text-slate-400">{p.phone}</p>
            {p.summary && (
              <p className="text-xs text-slate-500 mt-3 leading-relaxed italic max-w-sm mx-auto">
                {p.summary}
              </p>
            )}
          </div>

          {/* Compétences */}
          {entry.data.skills.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Compétences</h4>
              <div className="flex flex-wrap gap-2">
                {entry.data.skills.map((s) => (
                  <span key={s.id} className="text-xs px-2.5 py-1 bg-teal-50 text-teal-700 rounded-full border border-teal-100 font-medium">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Formation */}
          {entry.data.education.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Formation</h4>
              {entry.data.education.map((edu) => (
                <div key={edu.id} className="text-sm">
                  <p className="font-semibold text-slate-700">{edu.degree}</p>
                  <p className="text-slate-500">{edu.institution}</p>
                </div>
              ))}
            </div>
          )}

          {/* Expériences */}
          {entry.data.experiences.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Expériences</h4>
              {entry.data.experiences.map((exp) => (
                <div key={exp.id} className="text-sm">
                  <p className="font-semibold text-slate-700">{exp.position}</p>
                  <p className="text-slate-500">{exp.company}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}