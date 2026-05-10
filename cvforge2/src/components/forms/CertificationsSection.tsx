// src/components/forms/CertificationsSection.tsx (Personne 1)

import { useFormContext, useFieldArray } from 'react-hook-form';
import { nanoid } from 'nanoid';
import type { CVFormValues } from '../../types/schemas';

export function CertificationsSection() {
  const { register, control } = useFormContext<CVFormValues>();
  const { fields, append, remove } = useFieldArray({ control, name: 'certifications' });

  const addCert = () => append({ id: nanoid(), name: '', issuer: '', date: '', url: '' });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <h2 className="text-lg font-semibold text-slate-700">Certifications</h2>
        <button type="button" onClick={addCert}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition">
          <span className="text-lg leading-none">+</span> Ajouter
        </button>
      </div>

      {fields.length === 0 && (
        <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-lg">
          Aucune certification.{' '}
          <button type="button" onClick={addCert} className="text-teal-500 hover:underline">Ajouter</button>
        </div>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="relative border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
          <button type="button" onClick={() => remove(index)}
            className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full text-slate-400 hover:bg-rose-100 hover:text-rose-500 transition text-lg">
            ×
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-500 mb-1">Nom de la certification <span className="text-rose-500">*</span></label>
              <input {...register(`certifications.${index}.name`)}
                placeholder="AWS Cloud Practitioner, TOEFL..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white transition" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Organisme</label>
              <input {...register(`certifications.${index}.issuer`)}
                placeholder="Amazon, ETS, Coursera..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white transition" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Date</label>
              <input {...register(`certifications.${index}.date`)} type="month"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white transition" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-500 mb-1">Lien de vérification</label>
              <input {...register(`certifications.${index}.url`)}
                placeholder="https://..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white transition" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
