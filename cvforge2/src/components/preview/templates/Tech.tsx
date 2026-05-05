import type { CVData } from '../../../types/cv';
import type { ReactNode } from 'react';


interface TechProps {
  data: CVData;
}

export default function Tech({ data }: TechProps) {
  const { personal, education, experiences, skills, languages, projects, certifications } = data;

  const skillColor = (level: number) => {
    if (level >= 4) return '#22c55e';
    if (level >= 3) return '#3b82f6';
    if (level >= 2) return '#f59e0b';
    return '#6b7280';
  };

  return (
    <div
      className="min-h-[297mm] text-sm"
      style={{
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
        background: '#0f1117',
        color: '#e2e8f0',
      }}
    >
      {/* Header */}
      <div
        className="px-10 pt-8 pb-6"
        style={{ borderBottom: '1px solid #1e2d3d' }}
      >
        <div className="flex justify-between items-start">
          <div>
            <div className="text-[10px] mb-1" style={{ color: '#64748b' }}>
              {'// curriculum_vitae'}
            </div>
            <h1
              className="text-3xl font-bold"
              style={{ color: '#f8fafc', letterSpacing: '-0.5px' }}
            >
              {personal.fullName || 'Votre Nom'}
            </h1>
    
          </div>
          <div className="text-right space-y-0.5">
            {personal.email && (
              <p className="text-[10px]" style={{ color: '#3b82f6' }}>{personal.email}</p>
            )}
            {personal.phone && (
              <p className="text-[10px]" style={{ color: '#64748b' }}>{personal.phone}</p>
            )}
            {personal.linkedin && (
              <p className="text-[10px]" style={{ color: '#64748b' }}>{personal.linkedin}</p>
            )}
            {personal.github && (
              <p className="text-[10px]" style={{ color: '#22c55e' }}>{personal.github}</p>
            )}
            {personal.website && (
              <p className="text-[10px]" style={{ color: '#3b82f6' }}>{personal.website}</p>
            )}
            {personal.address && (
              <p className="text-[10px]" style={{ color: '#64748b' }}>{personal.address}</p>
            )}
          </div>
        </div>

        {personal.summary && (
          <div
            className="mt-5 p-3 rounded text-xs leading-relaxed"
            style={{ background: '#1e2d3d', color: '#94a3b8', borderLeft: '2px solid #3b82f6' }}
          >
            <span style={{ color: '#64748b' }}>/** </span>
            {personal.summary}
            <span style={{ color: '#64748b' }}> */</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-[1fr_230px]">
        {/* MAIN */}
        <div className="px-10 py-7" style={{ borderRight: '1px solid #1e2d3d' }}>

          {experiences.length > 0 && (
            <section className="mb-8">
              <TechSectionTitle>experience</TechSectionTitle>
              <div className="space-y-5">
                {experiences.map((exp, idx) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <span style={{ color: '#f59e0b' }} className="font-bold text-xs">
                          {exp.position}
                        </span>
                        <span style={{ color: '#64748b' }} className="text-xs"> @ </span>
                        <span style={{ color: '#e2e8f0' }} className="text-xs">
                          {exp.company}
                        </span>
                      </div>
                      <span
                        className="text-[10px] font-mono px-2 py-0.5 rounded"
                        style={{ background: '#1e2d3d', color: '#64748b' }}
                      >
                        {exp.startDate} → {exp.current ? 'now' : exp.endDate}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="mt-1.5 text-[11px] leading-relaxed" style={{ color: '#94a3b8' }}>
                        {exp.description}
                      </p>
                    )}
                    {exp.achievements.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {exp.achievements.map((a, i) => (
                          <li key={i} className="text-[11px] flex gap-2" style={{ color: '#94a3b8' }}>
                            <span style={{ color: '#22c55e' }}>✓</span>
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {idx < experiences.length - 1 && (
                      <div className="mt-4 border-t" style={{ borderColor: '#1e2d3d' }} />
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section className="mb-8">
              <TechSectionTitle>projects</TechSectionTitle>
              <div className="space-y-4">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 rounded"
                    style={{ background: '#1a1f2e', border: '1px solid #1e2d3d' }}
                  >
                    <div className="flex items-center gap-2">
                      <span style={{ color: '#22c55e' }} className="text-xs font-bold">{p.name}</span>
                      {p.url && (
                        <a
                          href={p.url}
                          className="text-[10px]"
                          style={{ color: '#3b82f6' }}
                        >
                          ↗ {p.url}
                        </a>
                      )}
                    </div>
                    <p className="text-[11px] mt-1 leading-relaxed" style={{ color: '#94a3b8' }}>
                      {p.description}
                    </p>
                    {p.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {p.technologies.map((t, i) => (
                          <span
                            key={i}
                            className="text-[9px] px-1.5 py-0.5 rounded font-mono"
                            style={{ background: '#1e2d3d', color: '#3b82f6', border: '1px solid #2d3d50' }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <TechSectionTitle>education</TechSectionTitle>
              <div className="space-y-4">
                {education.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-4">
                    <div>
                      <p className="text-xs font-bold" style={{ color: '#f8fafc' }}>{item.degree}</p>
                      <p className="text-[11px]" style={{ color: '#94a3b8' }}>
                        {item.institution}{item.field ? ` · ${item.field}` : ''}
                      </p>
                      {item.description && (
                        <p className="text-[10px] mt-0.5" style={{ color: '#64748b' }}>{item.description}</p>
                      )}
                    </div>
                    <span
                      className="text-[10px] whitespace-nowrap px-2 py-0.5 rounded"
                      style={{ background: '#1e2d3d', color: '#64748b' }}
                    >
                      {item.startDate} → {item.current ? 'now' : item.endDate}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* SIDEBAR */}
        <div className="px-6 py-7 space-y-7" style={{ background: '#0a0d14' }}>

          {skills.length > 0 && (
            <section>
              <TechSectionTitle small>skills</TechSectionTitle>
              <div className="space-y-2.5">
                {skills.map((s) => (
                  <div key={s.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px]" style={{ color: '#cbd5e1' }}>{s.name}</span>
                      <span
                        className="text-[9px] font-bold"
                        style={{ color: skillColor(s.level) }}
                      >
                        {'█'.repeat(s.level)}{'░'.repeat(5 - s.level)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <TechSectionTitle small>languages</TechSectionTitle>
              <div className="space-y-2">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between items-center">
                    <span className="text-[11px]" style={{ color: '#cbd5e1' }}>{l.name}</span>
                    <span
                      className="text-[9px] px-1.5 py-0.5 rounded font-mono"
                      style={{ background: '#1e2d3d', color: '#94a3b8' }}
                    >
                      {l.level}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <TechSectionTitle small>certifications</TechSectionTitle>
              <div className="space-y-3">
                {certifications.map((c) => (
                  <div
                    key={c.id}
                    className="p-2 rounded"
                    style={{ background: '#1a1f2e', border: '1px solid #1e2d3d' }}
                  >
                    <p className="text-[10px] font-bold" style={{ color: '#22c55e' }}>{c.name}</p>
                    <p className="text-[9px] mt-0.5" style={{ color: '#64748b' }}>{c.issuer}</p>
                    <p className="text-[9px]" style={{ color: '#475569' }}>{c.date}</p>
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

function TechSectionTitle({
  children,
  small,
}: {
  children: ReactNode;
  small?: boolean;
}) {
  return (
    <h2
      className={`font-bold uppercase tracking-[2px] mb-3 ${
        small ? 'text-[10px]' : 'text-xs'
      }`}
      style={{ color: '#3b82f6' }}
    >
      <span style={{ color: '#64748b' }}>// </span>
      {children}
    </h2>
  );
}