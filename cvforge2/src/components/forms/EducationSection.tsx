// src/components/forms/EducationSection.tsx (Personne 1)

import { useFormContext, useFieldArray } from 'react-hook-form';
import { nanoid } from 'nanoid';
import type { CVFormValues } from '../../types/schemas';

export function EducationSection() {
  const { register, control, watch, formState: { errors } } = useFormContext<CVFormValues>();
  const { fields, append, remove } = useFieldArray({ control, name: 'education' });

  const addEducation = () => {
    append({ id: nanoid(), institution: '', degree: '', field: '', startDate: '', endDate: '', current: false, description: '' });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <h2 className="text-lg font-semibold text-slate-700">Formation</h2>
        <button type="button" onClick={addEducation}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition">
          <span className="text-lg leading-none">+</span> Ajouter
        </button>
      </div>

      {fields.length === 0 && (
        <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-lg">
          Aucune formation.{' '}
          <button type="button" onClick={addEducation} className="text-teal-500 hover:underline">
            Ajouter
          </button>
        </div>
      )}

      {fields.map((field, index) => {
        const isCurrent = watch(`education.${index}.current`);
        return (
          <div key={field.id} className="relative border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
            <button type="button" onClick={() => remove(index)}
              className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full text-slate-400 hover:bg-rose-100 hover:text-rose-500 transition text-lg">
              ×
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-500 mb-1">Établissement <span className="text-rose-500">*</span></label>
                <input {...register(`education.${index}.institution`)} placeholder="ENSA Berrechid..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white transition" />
                {errors.education?.[index]?.institution && (
                  <p className="text-xs text-rose-500 mt-0.5">{errors.education[index]?.institution?.message}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Diplôme <span className="text-rose-500">*</span></label>
                <input {...register(`education.${index}.degree`)} placeholder="Ingénieur, Master..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white transition" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Spécialité</label>
                <input {...register(`education.${index}.field`)} placeholder="Informatique..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white transition" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Début <span className="text-rose-500">*</span></label>
                <input {...register(`education.${index}.startDate`)} type="month"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white transition" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Fin</label>
                <input {...register(`education.${index}.endDate`)} type="month" disabled={isCurrent}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white disabled:bg-slate-100 disabled:text-slate-400 transition" />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
              <input type="checkbox" {...register(`education.${index}.current`)} className="w-4 h-4 rounded accent-teal-500" />
              En cours
            </label>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Description</label>
              <textarea {...register(`education.${index}.description`)} rows={2}
                placeholder="Projets, spécialisations, mention..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white resize-none transition" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
