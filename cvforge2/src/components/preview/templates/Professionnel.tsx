// src/components/preview/templates/Professionnel.tsx
// Template "Professionnel" — Personne 2 will style/expand this in Sprint 2

import type { CVData } from '../../../types/cv';
import { SectionTitle, SkillDots, formatDate } from './helpers';

export function ProfessionnelTemplate({ data }: { data: CVData }) {
  const { personal, education, skills } = data;

  return (
    <div className="font-serif text-slate-800" style={{ fontSize: '10pt', lineHeight: 1.5 }}>
      {/* Header */}
      <div className="text-center border-b-2 border-teal-600 pb-4 mb-5">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          {personal.fullName || <span className="text-slate-300">Votre nom</span>}
        </h1>
        <div className="flex flex-wrap justify-center gap-3 mt-2 text-sm text-slate-500">
          {personal.email    && <span>✉ {personal.email}</span>}
          {personal.phone    && <span>📞 {personal.phone}</span>}
          {personal.address  && <span>📍 {personal.address}</span>}
          {personal.linkedin && <span>in {personal.linkedin}</span>}
          {personal.github   && <span>⌥ {personal.github}</span>}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <div className="mb-5">
          <SectionTitle title="Profil" />
          <p className="text-slate-600 text-sm leading-relaxed">{personal.summary}</p>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-5">
          <SectionTitle title="Formation" />
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-slate-800">{edu.degree}{edu.field ? ` — ${edu.field}` : ''}</p>
                  <p className="text-teal-700 text-sm">{edu.institution}</p>
                </div>
                <span className="text-xs text-slate-400 whitespace-nowrap ml-2 mt-1">
                  {edu.startDate && formatDate(edu.startDate)} — {edu.current ? 'Présent' : edu.endDate ? formatDate(edu.endDate) : ''}
                </span>
              </div>
              {edu.description && <p className="text-sm text-slate-500 mt-1">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-5">
          <SectionTitle title="Compétences" />
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center justify-between">
                <span className="text-sm text-slate-700">{skill.name}</span>
                <SkillDots level={skill.level} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!personal.fullName && education.length === 0 && skills.length === 0 && (
        <div className="text-center py-16 text-slate-300">
          <p className="text-4xl mb-2">📄</p>
          <p className="text-sm">Remplissez le formulaire pour voir votre CV ici</p>
        </div>
      )}
    </div>
  );
}
