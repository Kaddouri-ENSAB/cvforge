// src/components/preview/CVPreview.tsx (Personne 2 — UI Polish)

import { useState } from 'react';
import { useCVStore } from '../../store/cvStore';
import Minimaliste from './templates/Minimaliste';
import { ProfessionnelTemplate } from './templates/Professionnel';
import Tech from './templates/Tech';
import PrintButton from './PrintButton';

export default function CVPreview() {
  const data     = useCVStore((state) => state.data);
  const template = useCVStore((state) => state.template);
  const [zoom, setZoom]   = useState(0.85);

  const renderTemplate = () => {
    switch (template) {
      case 'minimaliste':   return <Minimaliste data={data} />;
      case 'professionnel': return <ProfessionnelTemplate data={data} />;
      case 'tech':          return <Tech data={data} />;
      default:              return <ProfessionnelTemplate data={data} />;
    }
  };

  return (
    <section
      className="h-full overflow-y-auto bg-slate-200 p-6"
      style={{ background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)' }}
    >
      {/* Barre d'outils */}
      <div className="mb-5 flex items-center justify-between no-print">

        {/* Contrôles zoom */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
            aria-label="Réduire le zoom"
            className="
              w-9 h-9 flex items-center justify-center
              rounded-lg bg-white text-slate-600 font-bold shadow
              hover:bg-slate-50 hover:shadow-md
              active:scale-95 transition-all
              focus:outline-none focus:ring-2 focus:ring-blue-400
            "
          >
            −
          </button>

          <div className="
            px-3 py-1.5 rounded-lg bg-white shadow
            text-xs font-semibold text-slate-600
            min-w-[60px] text-center
          ">
            {Math.round(zoom * 100)}%
          </div>

          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(1.3, z + 0.1))}
            aria-label="Augmenter le zoom"
            className="
              w-9 h-9 flex items-center justify-center
              rounded-lg bg-white text-slate-600 font-bold shadow
              hover:bg-slate-50 hover:shadow-md
              active:scale-95 transition-all
              focus:outline-none focus:ring-2 focus:ring-blue-400
            "
          >
            +
          </button>
        </div>

        {/* Bouton PDF */}
        <PrintButton />
      </div>

      {/* Zone CV */}
      <div id="cv-print-area" className="flex justify-center">
        <div
          className="origin-top"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
        >
          <div
            className="w-[794px] min-h-[1123px] bg-white overflow-hidden"
            style={{
              boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08)',
              borderRadius: '4px',
            }}
          >
            {renderTemplate()}
          </div>
        </div>
      </div>
    </section>
  );
}