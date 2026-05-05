// src/components/dashboard/SearchBar.tsx (Personne 2 — UI)

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Rechercher un CV...',
}: SearchBarProps) {
  return (
    <div className="relative w-full max-w-sm">
      {/* Icône loupe */}
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        width="15" height="15" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>

      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Rechercher un CV par titre"
        className="
          w-full pl-9 pr-4 py-2.5
          rounded-xl border border-slate-200 bg-white
          text-sm text-slate-700 placeholder:text-slate-400
          shadow-sm
          focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent
          transition
        "
      />

      {/* Bouton effacer */}
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Effacer la recherche"
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            text-slate-300 hover:text-slate-500 transition
          "
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}