import type { CVData } from '../../../types/cv';
import type { ReactNode } from 'react';


interface MinimalisteProps {
  data: CVData;
}

export default function Minimaliste({ data }: MinimalisteProps) {
  const { personal, education, experiences, skills, languages, projects, certifications } = data;

  const levelBar = (level: number) => (
    <div className="flex gap-[3px] mt-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={`h-[3px] w-5 rounded-full ${i < level ? 'bg-slate-800' : 'bg-slate-200'}`}
        />
      ))}
    </div>
  );

  return (
    <div
      className="bg-white text-slate-900 font-sans min-h-[297mm]"
      style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
    >
      {/* Header band */}
      <div className="bg-slate-900 text-white px-12 py-10">
        <h1 className="text-[2.4rem] font-light tracking-[-0.5px] leading-tight">
          {personal.fullName || 'Votre Nom'}
        </h1>
    
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-400">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.address && <span>{personal.address}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.github && <span>{personal.github}</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
      </div>

      <div className="grid grid-cols-[1fr_260px]">
        {/* LEFT COLUMN — main */}
        <div className="px-10 py-8 border-r border-slate-100">

          {personal.summary && (
            <section className="mb-8">
              <SectionTitle>Profil</SectionTitle>
              <p className="text-sm leading-relaxed text-slate-600">{personal.summary}</p>
            </section>
          )}

          {experiences.length > 0 && (
            <section className="mb-8">
              <SectionTitle>Expériences</SectionTitle>
              <div className="space-y-5">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative pl-4 border-l-2 border-slate-200">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className="font-semibold text-sm text-slate-900">{exp.position}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{exp.company}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap pt-0.5">
                        {exp.startDate} – {exp.current ? 'Présent' : exp.endDate}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-xs mt-2 text-slate-600 leading-relaxed">{exp.description}</p>
                    )}
                    {exp.achievements.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {exp.achievements.map((a, i) => (
                          <li key={i} className="text-xs text-slate-600 flex gap-2">
                            <span className="text-slate-300 mt-0.5">—</span>
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section className="mb-8">
              <SectionTitle>Formation</SectionTitle>
              <div className="space-y-4">
                {education.map((item) => (
                  <div key={item.id} className="relative pl-4 border-l-2 border-slate-200">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className="font-semibold text-sm">{item.degree}</h3>
                        <p className="text-xs text-slate-500">{item.institution}{item.field ? ` · ${item.field}` : ''}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap pt-0.5">
                        {item.startDate} – {item.current ? 'Présent' : item.endDate}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-xs mt-1 text-slate-600">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <SectionTitle>Projets</SectionTitle>
              <div className="space-y-4">
                {projects.map((p) => (
                  <div key={p.id}>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm">{p.name}</h3>
                      {p.url && (
                        <a href={p.url} className="text-[10px] text-slate-400 underline">{p.url}</a>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{p.description}</p>
                    {p.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {p.technologies.map((t, i) => (
                          <span key={i} className="text-[10px] bg-slate-100 text-slate-600 rounded px-2 py-0.5">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN — sidebar */}
        <div className="px-6 py-8 bg-slate-50 space-y-7">

          {skills.length > 0 && (
            <section>
              <SectionTitle small>Compétences</SectionTitle>
              <div className="space-y-3">
                {skills.map((s) => (
                  <div key={s.id}>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-slate-700">{s.name}</span>
                      <span className="text-[10px] text-slate-400">{s.level}/5</span>
                    </div>
                    {levelBar(s.level)}
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <SectionTitle small>Langues</SectionTitle>
              <div className="space-y-2">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between items-center">
                    <span className="text-xs font-medium text-slate-700">{l.name}</span>
                    <span className="text-[10px] text-slate-500 bg-white border border-slate-200 rounded-full px-2 py-0.5">{l.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <SectionTitle small>Certifications</SectionTitle>
              <div className="space-y-3">
                {certifications.map((c) => (
                  <div key={c.id}>
                    <p className="text-xs font-semibold text-slate-800">{c.name}</p>
                    <p className="text-[10px] text-slate-500">{c.issuer} · {c.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children, small }: { children: ReactNode; small?: boolean }) {
  return (
    <h2
      className={`font-semibold tracking-[1.5px] uppercase text-slate-400 border-b border-slate-200 pb-1.5 mb-3 ${
        small ? 'text-[9px]' : 'text-[10px]'
      }`}
    >
      {children}
    </h2>
  );
}