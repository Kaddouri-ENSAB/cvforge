// src/components/analysis/CVAnalysisDrawer.tsx (Personne 2 — UI Polish)

import { useState, useEffect, useRef } from 'react';
import CompletenessScore from './CompletenessScore';
import ATSTips from './ATSTips';
import SkillsRadar from './SkillsRadar';

export default function CVAnalysisDrawer() {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Fermer avec Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) setOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  // Focus sur le bouton fermer quand le drawer s'ouvre
  useEffect(() => {
    if (open) {
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    }
  }, [open]);

  // Bloquer le scroll du body
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* ── Bouton déclencheur ── */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir l'analyse du CV"
        aria-expanded={open}
        aria-haspopup="dialog"
        className="
          inline-flex items-center gap-2
          px-4 py-2 rounded-lg text-xs font-semibold
          bg-blue-600 text-white shadow-md
          hover:bg-blue-700 hover:shadow-lg
          active:scale-95
          transition-all duration-150
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
          no-print
        "
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          strokeLinejoin="round" aria-hidden="true">
          <path d="M3 3v18h18" />
          <path d="M18 9l-5 5-3-3-5 5" />
        </svg>
        Analyse CV
      </button>

      {/* ── Overlay ── */}
      <div
        className={`
          fixed inset-0 z-40 no-print
          bg-black/50
          transition-opacity duration-300
          ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        style={{ backdropFilter: open ? 'blur(3px)' : 'none' }}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />

      {/* ── Drawer ── */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Analyse du CV"
        tabIndex={-1}
        className={`
          fixed top-0 right-0 h-full z-50 no-print
          w-full sm:w-[460px]
          bg-white
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{
          boxShadow: open ? '-8px 0 40px rgba(0,0,0,0.15)' : 'none',
        }}
      >
        {/* Header */}
        <div className="
          flex items-center justify-between
          px-6 py-5
          border-b border-slate-100
          bg-gradient-to-r from-blue-600 to-blue-700
          flex-shrink-0
        ">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Analyse CV
            </h2>
            <p className="text-xs text-blue-200 mt-0.5">
              Score, radar et conseils ATS
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fermer l'analyse CV"
            className="
              w-8 h-8 flex items-center justify-center rounded-full
              text-blue-200 hover:bg-white/20 hover:text-white
              transition-colors duration-150
              focus:outline-none focus:ring-2 focus:ring-white/50
            "
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
              aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenu scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 bg-slate-50">
          <CompletenessScore />
          <SkillsRadar />
          <ATSTips />
        </div>

        {/* Footer */}
        <div className="
          flex-shrink-0 px-6 py-3
          border-t border-slate-100 bg-white
        ">
          <p className="text-[11px] text-slate-400 text-center">
            Se met à jour automatiquement • Appuyez sur{' '}
            <kbd className="px-1 py-0.5 bg-slate-100 rounded text-[10px] font-mono">Esc</kbd>
            {' '}pour fermer
          </p>
        </div>
      </aside>
    </>
  );
}