// src/components/dashboard/EmptyState.tsx (Personne 2 — UI)

interface EmptyStateProps {
  isSearching?: boolean;
  onCreateClick: () => void;
}

export default function EmptyState({ isSearching = false, onCreateClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      {/* Illustration */}
      <div className="w-20 h-20 rounded-2xl bg-teal-50 flex items-center justify-center mb-5 shadow-sm">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
          stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round"
          strokeLinejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      </div>

      <h3 className="text-lg font-bold text-slate-700 mb-2">
        {isSearching ? 'Aucun résultat trouvé' : 'Aucun CV pour le moment'}
      </h3>

      <p className="text-sm text-slate-400 max-w-xs mb-6 leading-relaxed">
        {isSearching
          ? 'Aucun CV ne correspond à votre recherche. Essayez un autre titre.'
          : 'Commencez par créer votre premier CV. Cela ne prend que quelques minutes.'}
      </p>

      {!isSearching && (
        <button
          type="button"
          onClick={onCreateClick}
          className="
            inline-flex items-center gap-2
            px-5 py-2.5 rounded-xl
            bg-teal-500 text-white text-sm font-semibold
            shadow-md hover:bg-teal-600 hover:shadow-lg
            active:scale-95 transition-all duration-150
            focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2
          "
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
            aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Créer mon premier CV
        </button>
      )}
    </div>
  );
}