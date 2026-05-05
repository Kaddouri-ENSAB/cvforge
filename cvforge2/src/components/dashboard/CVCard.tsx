// src/components/dashboard/CVCard.tsx (Personne 2 — UI)

import type { CVEntry } from '../../types/cv';

interface CVCardProps {
  entry: CVEntry;
  onEdit:      (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete:    (id: string) => void;
  onPreview:   (id: string) => void;
}

function formatDate(iso: string): string {
  if (!iso) return '—';
  return new Intl.DateTimeFormat('fr-FR', {
    day:   '2-digit',
    month: 'short',
    year:  'numeric',
  }).format(new Date(iso));
}

function getInitials(title: string): string {
  return title
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

// Couleur d'accent basée sur le titre (déterministe)
const ACCENT_COLORS = [
  { bg: 'bg-teal-100',   text: 'text-teal-700',   border: 'border-teal-200'   },
  { bg: 'bg-blue-100',   text: 'text-blue-700',   border: 'border-blue-200'   },
  { bg: 'bg-violet-100', text: 'text-violet-700', border: 'border-violet-200' },
  { bg: 'bg-amber-100',  text: 'text-amber-700',  border: 'border-amber-200'  },
  { bg: 'bg-rose-100',   text: 'text-rose-700',   border: 'border-rose-200'   },
];

function getAccent(title: string) {
  const idx = title.charCodeAt(0) % ACCENT_COLORS.length;
  return ACCENT_COLORS[idx];
}

export default function CVCard({
  entry,
  onEdit,
  onDuplicate,
  onDelete,
  onPreview,
}: CVCardProps) {
  const accent = getAccent(entry.title);
  const fullName = entry.data.personal.fullName || 'Sans nom';
  const email    = entry.data.personal.email    || '';

  return (
    <article
      className="
        bg-white rounded-2xl border border-slate-200 shadow-sm
        hover:shadow-md hover:-translate-y-0.5
        transition-all duration-200
        flex flex-col overflow-hidden
        focus-within:ring-2 focus-within:ring-teal-400
      "
      aria-label={`CV : ${entry.title}`}
    >
      {/* Bandeau couleur + initiales */}
      <div className={`px-5 pt-5 pb-4 flex items-start gap-4`}>
        <div className={`
          w-12 h-12 rounded-xl flex items-center justify-center
          text-base font-bold flex-shrink-0
          border ${accent.bg} ${accent.text} ${accent.border}
        `}>
          {getInitials(entry.title) || 'CV'}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-slate-800 truncate">{entry.title}</h3>
          <p className="text-xs text-slate-500 truncate mt-0.5">{fullName}</p>
          {email && (
            <p className="text-[11px] text-slate-400 truncate">{email}</p>
          )}
        </div>
      </div>

      {/* Métadonnées */}
      <div className="px-5 pb-4 flex gap-4 text-[11px] text-slate-400">
        <div className="flex items-center gap-1">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8"  y1="2" x2="8"  y2="6" />
            <line x1="3"  y1="10" x2="21" y2="10" />
          </svg>
          <span>Créé le {formatDate(entry.createdAt)}</span>
        </div>
        <div className="flex items-center gap-1">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          <span>Modifié le {formatDate(entry.updatedAt)}</span>
        </div>
      </div>

      {/* Séparateur */}
      <div className="border-t border-slate-100 mx-4" />

      {/* Actions */}
      <div className="px-4 py-3 flex items-center gap-2">
        {/* Aperçu */}
        <button
          type="button"
          onClick={() => onPreview(entry.id)}
          aria-label={`Aperçu du CV : ${entry.title}`}
          className="
            flex-1 inline-flex items-center justify-center gap-1.5
            px-3 py-2 rounded-lg
            text-xs font-semibold text-slate-600
            bg-slate-100 hover:bg-slate-200
            transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400
          "
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Aperçu
        </button>

        {/* Modifier */}
        <button
          type="button"
          onClick={() => onEdit(entry.id)}
          aria-label={`Modifier le CV : ${entry.title}`}
          className="
            flex-1 inline-flex items-center justify-center gap-1.5
            px-3 py-2 rounded-lg
            text-xs font-semibold text-white
            bg-teal-500 hover:bg-teal-600
            transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400
          "
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Modifier
        </button>

        {/* Dupliquer */}
        <button
          type="button"
          onClick={() => onDuplicate(entry.id)}
          aria-label={`Dupliquer le CV : ${entry.title}`}
          title="Dupliquer"
          className="
            w-9 h-9 flex items-center justify-center rounded-lg
            text-slate-400 hover:text-blue-600 hover:bg-blue-50
            transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400
          "
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        </button>

        {/* Supprimer */}
        <button
          type="button"
          onClick={() => onDelete(entry.id)}
          aria-label={`Supprimer le CV : ${entry.title}`}
          title="Supprimer"
          className="
            w-9 h-9 flex items-center justify-center rounded-lg
            text-slate-400 hover:text-rose-600 hover:bg-rose-50
            transition-colors focus:outline-none focus:ring-2 focus:ring-rose-400
          "
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </button>
      </div>
    </article>
  );
}