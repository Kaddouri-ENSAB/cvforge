// src/components/preview/CVPreview.tsx (Personne 2 will expand in Sprint 2)

import { useCVStore } from '../../store/cvStore';
import { ProfessionnelTemplate } from './templates/Professionnel';
import { MinimalisteTemplate } from './templates/Minimaliste';
import { TechTemplate } from './templates/Tech';

export function CVPreview() {
  const { data, template } = useCVStore();

  return (
    <div className="h-full overflow-y-auto bg-gray-100 p-4">
      <div className="text-xs text-center text-slate-400 mb-3 uppercase tracking-widest font-medium">
        Aperçu — template : {template}
      </div>
      <div
        className="cv-page bg-white shadow-lg mx-auto"
        style={{ width: '210mm', minHeight: '297mm', padding: '15mm' }}
      >
        {template === 'professionnel' && <ProfessionnelTemplate data={data} />}
        {template === 'minimaliste'   && <MinimalisteTemplate data={data} />}
        {template === 'tech'          && <TechTemplate data={data} />}
      </div>
    </div>
  );
}
