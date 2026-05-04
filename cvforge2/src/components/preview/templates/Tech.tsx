// src/components/preview/templates/Tech.tsx

import type { CVData } from '../../../types/cv';
import { SkillDots, formatDate } from './helpers';

export function TechTemplate({ data }: { data: CVData }) {
  const { personal, education, skills } = data;

  return (
    <div style={{ fontSize: '10pt', lineHeight: 1.5 }}>
      <div className="bg-slate-900 text-white rounded-lg p-5 mb-5 -mx-2">
        <h1 className="text-2xl font-bold font-mono tracking-tight">
          {personal.fullName || <span className="text-slate-500">$ whoami</span>}
        </h1>
        <div className="flex flex-wrap gap-3 mt-2 text-xs text-teal-400 font-mono">
          {personal.email  && <span>{personal.email}</span>}
          {personal.github && <span>github/{personal.github}</span>}
          {personal.phone  && <span>{personal.phone}</span>}
        </div>
      </div>

      {personal.summary && (
        <div className="mb-5 bg-slate-50 rounded p-3 border-l-4 border-teal-500">
          <p className="text-sm text-slate-600">{personal.summary}</p>
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-5">
          <p className="font-mono text-teal-600 text-sm font-bold mb-3">// Formation</p>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3 flex gap-3">
              <div className="w-1 bg-teal-500 rounded flex-shrink-0" />
              <div>
                <p className="font-semibold">{edu.degree}{edu.field ? ` · ${edu.field}` : ''}</p>
                <p className="text-sm text-teal-700">{edu.institution}</p>
                <p className="text-xs text-slate-400">
                  {edu.startDate ? formatDate(edu.startDate) : ''} — {edu.current ? 'présent' : edu.endDate ? formatDate(edu.endDate) : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div>
          <p className="font-mono text-teal-600 text-sm font-bold mb-3">// Compétences</p>
          <div className="grid grid-cols-2 gap-2">
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center justify-between bg-slate-50 rounded px-3 py-1.5">
                <span className="text-sm font-mono text-slate-700">{skill.name}</span>
                <SkillDots level={skill.level} color="teal" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
