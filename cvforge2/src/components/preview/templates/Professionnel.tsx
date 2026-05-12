// src/components/preview/templates/Professionnel.tsx (Personne 2 — fix layout)

import type { CVData } from '../../../types/cv';
import { SectionTitle, SkillDots, formatDate } from './helpers';

export function ProfessionnelTemplate({ data }: { data: CVData }) {
  const { personal, education, skills, experiences, projects, languages, certifications } = data;

  const hardSkills = skills.filter((s) => s.category === 'hard');
  const softSkills = skills.filter((s) => s.category === 'soft');

  return (
    <div
      className="bg-white text-slate-800 w-full min-h-full"
      style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        fontSize: '10pt',
        lineHeight: 1.6,
        padding: '12mm 14mm',
        boxSizing: 'border-box',
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          textAlign: 'center',
          borderBottom: '2px solid #0d9488',
          paddingBottom: '14px',
          marginBottom: '18px',
        }}
      >
        <h1 style={{ fontSize: '22pt', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>
          {personal.fullName || 'Votre nom'}
        </h1>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginTop: '6px' }}>
          {personal.email    && <span style={{ fontSize: '9pt', color: '#475569' }}>✉ {personal.email}</span>}
          {personal.phone    && <span style={{ fontSize: '9pt', color: '#475569' }}>📞 {personal.phone}</span>}
          {personal.address  && <span style={{ fontSize: '9pt', color: '#475569' }}>📍 {personal.address}</span>}
          {personal.linkedin && <span style={{ fontSize: '9pt', color: '#475569' }}>in {personal.linkedin}</span>}
          {personal.github   && <span style={{ fontSize: '9pt', color: '#475569' }}>⌥ {personal.github}</span>}
        </div>
      </div>

      {/* ── Résumé ── */}
      {personal.summary && (
        <div style={{ marginBottom: '16px' }}>
          <SectionTitle title="Profil" />
          <p style={{ fontSize: '9.5pt', color: '#475569', margin: 0, lineHeight: 1.6 }}>
            {personal.summary}
          </p>
        </div>
      )}

      {/* ── Formation ── */}
      {education.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <SectionTitle title="Formation" />
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontWeight: 'bold', fontSize: '9.5pt', margin: 0 }}>
                    {edu.degree}{edu.field ? ` — ${edu.field}` : ''}
                  </p>
                  <p style={{ color: '#0d9488', fontSize: '9pt', margin: '2px 0 0' }}>
                    {edu.institution}
                  </p>
                </div>
                <span style={{ fontSize: '8.5pt', color: '#94a3b8', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                  {edu.startDate && formatDate(edu.startDate)} — {edu.current ? 'Présent' : edu.endDate ? formatDate(edu.endDate) : ''}
                </span>
              </div>
              {edu.description && (
                <p style={{ fontSize: '8.5pt', color: '#64748b', margin: '4px 0 0' }}>{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Expériences ── */}
      {experiences.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <SectionTitle title="Expériences" />
          {experiences.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontWeight: 'bold', fontSize: '9.5pt', margin: 0 }}>{exp.position}</p>
                  <p style={{ color: '#0d9488', fontSize: '9pt', margin: '2px 0 0' }}>{exp.company}</p>
                </div>
                <span style={{ fontSize: '8.5pt', color: '#94a3b8', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                  {exp.startDate && formatDate(exp.startDate)} — {exp.current ? 'Présent' : exp.endDate ? formatDate(exp.endDate) : ''}
                </span>
              </div>
              {exp.description && (
                <p style={{ fontSize: '8.5pt', color: '#64748b', margin: '4px 0 0' }}>{exp.description}</p>
              )}
              {exp.achievements?.length > 0 && (
                <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                  {exp.achievements.map((a, i) => (
                    <li key={i} style={{ fontSize: '8.5pt', color: '#64748b' }}>{a}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Compétences techniques ── */}
      {hardSkills.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <SectionTitle title="Compétences techniques" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 24px' }}>
            {hardSkills.map((skill) => (
              <div key={skill.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '9pt', color: '#334155' }}>{skill.name}</span>
                <SkillDots level={skill.level} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Soft Skills ── */}
      {softSkills.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <SectionTitle title="Soft skills" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 24px' }}>
            {softSkills.map((skill) => (
              <div key={skill.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '9pt', color: '#334155' }}>{skill.name}</span>
                <SkillDots level={skill.level} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Langues ── */}
      {languages.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <SectionTitle title="Langues" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {languages.map((lang) => (
              <div key={lang.id} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '9pt', fontWeight: '600', color: '#334155' }}>{lang.name}</span>
                <span style={{
                  fontSize: '8pt', color: '#64748b',
                  background: '#f1f5f9', padding: '1px 8px',
                  borderRadius: '999px',
                }}>
                  {lang.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Projets ── */}
      {projects.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <SectionTitle title="Projets" />
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '8px' }}>
              <p style={{ fontWeight: 'bold', fontSize: '9.5pt', margin: 0 }}>{proj.name}</p>
              {proj.description && (
                <p style={{ fontSize: '8.5pt', color: '#64748b', margin: '2px 0 0' }}>{proj.description}</p>
              )}
              {proj.technologies?.length > 0 && (
                <p style={{ fontSize: '8pt', color: '#0d9488', margin: '2px 0 0' }}>
                  {Array.isArray(proj.technologies)
                    ? proj.technologies.join(' · ')
                    : proj.technologies}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Certifications ── */}
      {certifications.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <SectionTitle title="Certifications" />
          {certifications.map((cert) => (
            <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <div>
                <p style={{ fontWeight: 'bold', fontSize: '9pt', margin: 0 }}>{cert.name}</p>
                {cert.issuer && <p style={{ fontSize: '8.5pt', color: '#64748b', margin: '1px 0 0' }}>{cert.issuer}</p>}
              </div>
              {cert.date && <span style={{ fontSize: '8pt', color: '#94a3b8' }}>{formatDate(cert.date)}</span>}
            </div>
          ))}
        </div>
      )}

      {/* ── Empty state ── */}
      {!personal.fullName && education.length === 0 && skills.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#cbd5e1' }}>
          <p style={{ fontSize: '32pt', margin: 0 }}>📄</p>
          <p style={{ fontSize: '9pt', marginTop: '8px' }}>Remplissez le formulaire pour voir votre CV ici</p>
        </div>
      )}
    </div>
  );
}

// Export default pour compatibilité avec CVPreview.tsx
export default ProfessionnelTemplate;