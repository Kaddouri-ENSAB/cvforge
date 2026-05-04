// src/components/forms/PersonalSection.tsx (Personne 1)

import { useFormContext } from 'react-hook-form';
import type { CVFormValues } from '../../types/schemas';

export function PersonalSection() {
  const { register, formState: { errors } } = useFormContext<CVFormValues>();

  const fields: {
    name: keyof CVFormValues['personal'];
    label: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
  }[] = [
    { name: 'fullName', label: 'Nom complet', placeholder: 'Jean Dupont', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'jean@example.com' },
    { name: 'phone', label: 'Téléphone', placeholder: '+212 6 12 34 56 78' },
    { name: 'address', label: 'Adresse', placeholder: 'Casablanca, Maroc' },
    { name: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/...' },
    { name: 'github', label: 'GitHub', placeholder: 'github.com/username' },
    { name: 'website', label: 'Site web', placeholder: 'https://monsite.com' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2">
        Informations personnelles
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(({ name, label, type = 'text', placeholder, required }) => (
          <div key={name} className={name === 'fullName' ? 'sm:col-span-2' : ''}>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              {label} {required && <span className="text-rose-500">*</span>}
            </label>
            <input
              {...register(`personal.${name}`)}
              type={type}
              placeholder={placeholder}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white placeholder-slate-300 transition"
            />
            {errors.personal?.[name] && (
              <p className="text-xs text-rose-500 mt-1">{errors.personal[name]?.message}</p>
            )}
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">
          Résumé professionnel
          <span className="ml-2 text-xs text-slate-400 font-normal">(max 600 caractères)</span>
        </label>
        <textarea
          {...register('personal.summary')}
          rows={4}
          placeholder="Décrivez votre profil en quelques lignes..."
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white placeholder-slate-300 transition resize-none"
        />
        {errors.personal?.summary && (
          <p className="text-xs text-rose-500 mt-1">{errors.personal.summary.message}</p>
        )}
      </div>
    </div>
  );
}
