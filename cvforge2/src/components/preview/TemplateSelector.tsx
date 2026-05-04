import { useCVStore } from '../../store/cvStore';
import type { Template } from '../../types/cv';

const templates: { id: Template; label: string; description: string }[] = [
  {
    id: 'minimaliste',
    label: 'Minimaliste',
    description: 'Simple, clair et élégant',
  },
  {
    id: 'professionnel',
    label: 'Professionnel',
    description: 'Formel et adapté aux stages',
  },
  {
    id: 'tech',
    label: 'Tech',
    description: 'Moderne pour profils informatiques',
  },
];

export default function TemplateSelector() {
  const template = useCVStore((state) => state.template);
  const setTemplate = useCVStore((state) => state.setTemplate);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
      <h2 className="text-lg font-semibold text-slate-800 mb-1">
        Choisir un template
      </h2>

      <p className="text-sm text-slate-500 mb-4">
        Sélectionnez le style du CV à afficher dans la prévisualisation.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {templates.map((item) => {
          const isActive = template === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTemplate(item.id)}
              className={`text-left rounded-xl border p-4 transition-all ${
                isActive
                  ? 'border-blue-600 bg-blue-50 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`font-semibold ${
                    isActive ? 'text-blue-700' : 'text-slate-800'
                  }`}
                >
                  {item.label}
                </span>

                {isActive && (
                  <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                    Actif
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-500">{item.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}