import type { CVData } from '../../../types/cv';
import type { ReactNode } from 'react';
interface ProfessionnelProps {
  data: CVData;
}

const ACCENT = '#1a56db'; // bleu corporate propre

export default function Professionnel({ data }: ProfessionnelProps) {
  const { personal, education, experiences, skills, languages, projects, certifications } = data;

  return (
    <div
      className="bg-white text-slate-900 min-h-[297mm]"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      {/* TOP accent bar */}
      <div style={{ background: ACCENT, height: '4px', width: '100%' }} />

      {/* Header */}
      <div className="px-12 pt-8 pb-6 flex justify-between items-end border-b border-slate-200">
        <div>
          <h1
            className="text-4xl font-bold text-slate-900"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.5px' }}
          >
            {personal.fullName || 'Votre Nom'}
          </h1>
        
        </div>
        <div className="text-right text-xs text-slate-500 space-y-0.5">
          {personal.email && <p>{personal.email}</p>}
          {personal.phone && <p>{personal.phone}</p>}
          {personal.address && <p>{personal.address}</p>}
          {personal.linkedin && <p>{personal.linkedin}</p>}
          {personal.github && <p>{personal.github}</p>}
          {personal.website && <p>{personal.website}</p>}
        </div>
      </div>

      <div className="px-12 py-8">

        {personal.summary && (
          <section className="mb-8">
            <ProfSectionTitle accent={ACCENT}>Résumé professionnel</ProfSectionTitle>
            <p className="text-sm leading-relaxed text-slate-700 italic">{personal.summary}</p>
          </section>
        )}

        <div className="grid grid-cols-[1fr_220px] gap-10">
          {/* MAIN */}
          <div className="space-y-7">

            {experiences.length > 0 && (
              <section>
                <ProfSectionTitle accent={ACCENT}>Expériences professionnelles</ProfSectionTitle>
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline">
                        <div>
                          <h3 className="font-bold text-sm text-slate-900">{exp.position}</h3>
                          <p className="text-sm text-slate-600 font-normal" style={{ fontStyle: 'italic' }}>
                            {exp.company}
                          </p>
                        </div>
                        <span
                          className="text-xs font-medium px-2.5 py-0.5 rounded"
                          style={{ background: '#eff6ff', color: ACCENT, whiteSpace: 'nowrap' }}
                        >
                          {exp.startDate} – {exp.current ? 'Présent' : exp.endDate}
                        </span>
                      </div>
                      {exp.description && (
                        <p className="mt-2 text-xs text-slate-600 leading-relaxed">{exp.description}</p>
                      )}
                      {exp.achievements.length > 0 && (
                        <ul className="mt-2 space-y-1 pl-4">
                          {exp.achievements.map((a, i) => (
                            <li key={i} className="text-xs text-slate-600 list-disc">{a}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {education.length > 0 && (
              <section>
                <ProfSectionTitle accent={ACCENT}>Formation</ProfSectionTitle>
                <div className="space-y-4">
                  {education.map((item) => (
                    <div key={item.id} className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-bold text-sm">{item.degree}</h3>
                        <p className="text-xs text-slate-600 italic">{item.institution}{item.field ? `, ${item.field}` : ''}</p>
                        {item.description && <p className="text-xs text-slate-500 mt-1">{item.description}</p>}
                      </div>
                      <span
                        className="text-xs whitespace-nowrap font-medium px-2.5 py-0.5 rounded"
                        style={{ background: '#eff6ff', color: ACCENT }}
                      >
                        {item.startDate} – {item.current ? 'Présent' : item.endDate}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {projects.length > 0 && (
              <section>
                <ProfSectionTitle accent={ACCENT}>Projets</ProfSectionTitle>
                <div className="space-y-4">
                  {projects.map((p) => (
                    <div key={p.id}>
                      <h3 className="font-bold text-sm">{p.name}</h3>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{p.description}</p>
                      {p.technologies.length > 0 && (
                        <p className="text-[10px] text-slate-400 mt-1">{p.technologies.join(' · ')}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">

            {skills.length > 0 && (
              <section>
                <ProfSectionTitle accent={ACCENT} small>Compétences</ProfSectionTitle>
                <div className="space-y-2">
                  {skills.map((s) => (
                    <div key={s.id}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-700 font-medium">{s.name}</span>
                        <span className="text-slate-400">{s.level}/5</span>
                      </div>
                      <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${(s.level / 5) * 100}%`, background: ACCENT }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {languages.length > 0 && (
              <section>
                <ProfSectionTitle accent={ACCENT} small>Langues</ProfSectionTitle>
                <div className="space-y-1.5">
                  {languages.map((l) => (
                    <div key={l.id} className="flex justify-between text-xs">
                      <span className="font-medium text-slate-700">{l.name}</span>
                      <span className="text-slate-500">{l.level}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {certifications.length > 0 && (
              <section>
                <ProfSectionTitle accent={ACCENT} small>Certifications</ProfSectionTitle>
                <div className="space-y-3">
                  {certifications.map((c) => (
                    <div key={c.id} className="border-l-2 pl-2" style={{ borderColor: ACCENT }}>
                      <p className="text-xs font-semibold text-slate-800 leading-tight">{c.name}</p>
                      <p className="text-[10px] text-slate-500">{c.issuer}</p>
                      <p className="text-[10px] text-slate-400">{c.date}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfSectionTitle({
  children,
  accent,
  small,
}: {
  children: ReactNode;
  accent: string;
  small?: boolean;
}) {
 
  return (
    <div className="flex items-center gap-3 mb-3">
      <h2
        className={`font-bold uppercase tracking-widest whitespace-nowrap ${small ? 'text-[9px]' : 'text-[10px]'}`}
        style={{ color: accent }}
      >
        {children}
      </h2>
      <div className="flex-1 h-px bg-slate-200" />
    </div>
  );
}