// src/components/preview/templates/Minimaliste.tsx

import type { CVData } from '../../../types/cv';
import { SkillDots, formatDate } from './helpers';

export function MinimalisteTemplate({ data }: { data: CVData }) {
  const { personal, education, skills } = data;

  return (
    <div className="font-sans text-slate-800" style={{ fontSize: '10pt', lineHeight: 1.6 }}>
      <h1 className="text-4xl font-light tracking-widest text-slate-900 mb-1">
        {personal.fullName || <span className="text-slate-200">NOM PRÉNOM</span>}
      </h1>
      <div className="flex gap-4 text-xs text-slate-400 mb-6">
        {personal.email   && <span>{personal.email}</span>}
        {personal.phone   && <span>{personal.phone}</span>}
        {personal.address && <span>{personal.address}</span>}
      </div>

      {personal.summary && (
        <p className="text-sm text-slate-500 mb-6 border-l-2 border-slate-200 pl-3">{personal.summary}</p>
      )}

      {education.length > 0 && (
        <div className="mb-5">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">Formation</p>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3 grid grid-cols-4 gap-2">
              <span className="text-xs text-slate-400">{edu.startDate ? formatDate(edu.startDate) : ''}</span>
              <div className="col-span-3">
                <p className="font-medium">{edu.degree}</p>
                <p className="text-sm text-slate-500">{edu.institution}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">Compétences</p>
          <div className="grid grid-cols-2 gap-2">
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center justify-between">
                <span className="text-sm">{skill.name}</span>
                <SkillDots level={skill.level} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
