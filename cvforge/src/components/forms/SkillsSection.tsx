// src/components/forms/SkillsSection.tsx (Personne 1)

import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { nanoid } from 'nanoid';
import type { CVFormValues } from '../../types/schemas';

const LEVEL_LABELS = ['', 'Débutant', 'Basique', 'Intermédiaire', 'Avancé', 'Expert'];

export function SkillsSection() {
  const { register, control } = useFormContext<CVFormValues>();
  const { fields, append, remove } = useFieldArray({ control, name: 'skills' });

  const addSkill = () => append({ id: nanoid(), name: '', level: 3, category: 'hard' });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <h2 className="text-lg font-semibold text-slate-700">Compétences</h2>
        <button type="button" onClick={addSkill}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition">
          <span className="text-lg leading-none">+</span> Ajouter
        </button>
      </div>

      {fields.length === 0 && (
        <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-lg">
          Aucune compétence.{' '}
          <button type="button" onClick={addSkill} className="text-teal-500 hover:underline">Ajouter</button>
        </div>
      )}

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            <input
              {...register(`skills.${index}.name`)}
              placeholder="React, Python, Communication..."
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white transition"
            />
            <select
              {...register(`skills.${index}.category`)}
              className="px-2 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white text-slate-600"
            >
              <option value="hard">Technique</option>
              <option value="soft">Soft skill</option>
            </select>
            <Controller
              control={control}
              name={`skills.${index}.level`}
              render={({ field: { value, onChange } }) => (
                <div className="flex flex-col items-center gap-1 min-w-[100px]">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => onChange(star)}
                        className={`w-5 h-5 rounded-full border-2 transition-all ${star <= value ? 'bg-teal-500 border-teal-500' : 'bg-white border-slate-300 hover:border-teal-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">{LEVEL_LABELS[value]}</span>
                </div>
              )}
            />
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
