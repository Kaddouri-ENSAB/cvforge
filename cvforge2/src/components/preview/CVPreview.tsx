import { useCVStore } from '../../store/cvStore';
import Minimaliste from './templates/Minimaliste';
import Professionnel from './templates/Professionnel';
import Tech from './templates/Tech';

import { useState } from 'react';

export default function CVPreview() {
  const data = useCVStore((state) => state.data);
  const template = useCVStore((state) => state.template);

  const [zoom, setZoom] = useState(0.85);

  const renderTemplate = () => {
    switch (template) {
      case 'minimaliste':
        return <Minimaliste data={data} />;
      case 'professionnel':
        return <Professionnel data={data} />;
      case 'tech':
        return <Tech data={data} />;
      default:
        return <Professionnel data={data} />;
    }
  };

 return (
  <section className="h-full overflow-y-auto bg-slate-200 p-6">
    <div className="mb-4 flex justify-end gap-2">
      <button
        type="button"
        onClick={() => setZoom((z) => Math.max(0.6, z - 0.1))}
        className="rounded-lg bg-white px-3 py-2 text-sm font-semibold shadow hover:bg-slate-100"
      >
        -
      </button>

      <span className="rounded-lg bg-white px-3 py-2 text-sm shadow">
        {Math.round(zoom * 100)}%
      </span>

      <button
        type="button"
        onClick={() => setZoom((z) => Math.min(1.2, z + 0.1))}
        className="rounded-lg bg-white px-3 py-2 text-sm font-semibold shadow hover:bg-slate-100"
      >
        +
      </button>
    </div>

    <div className="flex justify-center">
      <div
        className="w-[794px] min-h-[1123px] bg-white shadow-2xl rounded-sm overflow-hidden origin-top"
        style={{ transform: `scale(${zoom})` }}
      >
        {renderTemplate()}
      </div>
    </div>
  </section>
);
}