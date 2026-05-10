// src/components/forms/LanguagesSection.tsx (Personne 1)

import { useFormContext, useFieldArray } from 'react-hook-form';
import { nanoid } from 'nanoid';
import type { CVFormValues } from '../../types/schemas';

const LEVELS = ['Débutant', 'Intermédiaire', 'Avancé', 'Courant', 'Natif'] as const;

export function LanguagesSection() {
  const { register, control } = useFormContext<CVFormValues>();
  const { fields, append, remove } = useFieldArray({ control, name: 'languages' });

  const addLanguage = () => append({ id: nanoid(), name: '', level: 'Intermédiaire' });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <h2 className="text-lg font-semibold text-slate-700">Langues</h2>
        <button type="button" onClick={addLanguage}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition">
          <span className="text-lg leading-none">+</span> Ajouter
        </button>
      </div>

      {fields.length === 0 && (
        <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-lg">
          Aucune langue.{' '}
          <button type="button" onClick={addLanguage} className="text-teal-500 hover:underline">Ajouter</button>
        </div>
      )}

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            <input
              {...register(`languages.${index}.name`)}
              placeholder="Français, Anglais, Arabe..."
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white transition"
            />
            <select
              {...register(`languages.${index}.level`)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white text-slate-600"
            >
              {LEVELS.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
            <button type="button" onClick={() => remove(index)}
              className="w-7 h-7 flex items-center justify-center rounded-full text-slate-400 hover:bg-rose-100 hover:text-rose-500 transition text-lg flex-shrink-0">
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
