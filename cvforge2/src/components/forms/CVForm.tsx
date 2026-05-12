// src/components/forms/CVForm.tsx (Personne 1)

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { cvFormSchema, type CVFormValues } from '../../types/schemas';
import { useCVStore } from '../../store/cvStore';
import { PersonalSection } from './PersonalSection';
import { EducationSection } from './EducationSection';
import { SkillsSection } from './SkillsSection';
import { ExperiencesSection } from '../../types/ExperiencesSection';
import { ProjectsSection } from '../../types/ProjectsSection';
import { LanguagesSection } from './LanguagesSection';
import { CertificationsSection } from './CertificationsSection';
import { ShareableURL } from '../actions/ShareableURL';

const TABS = [
  { id: 'personal',        label: '👤 Infos perso' },
  { id: 'education',       label: '🎓 Formation' },
  { id: 'experiences',     label: '💼 Expériences' },
  { id: 'projects',        label: '🚀 Projets' },
  { id: 'skills',          label: '⚡ Compétences' },
  { id: 'languages',       label: '🌍 Langues' },
  { id: 'certifications',  label: '🏅 Certifications' },
  { id: 'share',           label: '🔗 Partage' },
] as const;

type TabId = (typeof TABS)[number]['id'];

interface CVFormProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function CVForm({ activeTab, onTabChange }: CVFormProps) {
  const { data, updateData } = useCVStore();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isFirstRender = useRef(true);

  const methods = useForm<CVFormValues>({
    resolver: zodResolver(cvFormSchema),
    defaultValues: {
      personal:       data.personal,
      education:      data.education,
      skills:         data.skills,
      experiences:    data.experiences,
      projects:       data.projects,
      languages:      data.languages,
      certifications: data.certifications,
    },
    mode: 'onChange',
  });

  const { watch, reset } = methods;

  // When the store data changes externally (e.g. loading a different CV),
  // reset the form to show the new data
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    reset({
      personal:       data.personal,
      education:      data.education,
      skills:         data.skills,
      experiences:    data.experiences,
      projects:       data.projects,
      languages:      data.languages,
      certifications: data.certifications,
    });
  }, [data.personal.fullName, data.education.length, data.experiences.length]);
  // ↑ We watch a few key fields instead of the whole object to avoid infinite loops

  // Sync form changes → store
  useEffect(() => {
    const subscription = watch((values) => {
      if (values.personal)       updateData({ personal:       values.personal       as CVFormValues['personal'] });
      if (values.education)      updateData({ education:      values.education      as CVFormValues['education'] });
      if (values.skills)         updateData({ skills:         values.skills         as CVFormValues['skills'] });
      if (values.experiences)    updateData({ experiences:    values.experiences    as CVFormValues['experiences'] });
      if (values.projects)       updateData({ projects:       values.projects       as CVFormValues['projects'] });
      if (values.languages)      updateData({ languages:      values.languages      as CVFormValues['languages'] });
      if (values.certifications) updateData({ certifications: values.certifications as CVFormValues['certifications'] });
    });
    return () => subscription.unsubscribe();
  }, [watch, updateData]);

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight') nextIndex = (index + 1) % TABS.length;
    else if (e.key === 'ArrowLeft') nextIndex = (index - 1 + TABS.length) % TABS.length;
    else if (e.key === 'Home') nextIndex = 0;
    else if (e.key === 'End') nextIndex = TABS.length - 1;
    if (nextIndex !== null) {
      e.preventDefault();
      onTabChange(TABS[nextIndex].id);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col h-full">
        <div role="tablist" aria-label="Sections du CV"
          className="flex border-b border-slate-200 bg-white px-4 pt-3 gap-1 flex-shrink-0 overflow-x-auto">
          {TABS.map((tab, index) => (
            <button key={tab.id}
              ref={(el) => { tabRefs.current[index] = el; }}
              type="button" role="tab"
              aria-selected={activeTab === tab.id}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => onTabChange(tab.id)}
              onKeyDown={(e) => handleTabKeyDown(e, index)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${
                activeTab === tab.id ? 'bg-teal-500 text-white' : 'text-slate-500 hover:bg-slate-100'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        <form className="flex-1 overflow-y-auto p-5"
          role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
          {activeTab === 'personal'       && <PersonalSection />}
          {activeTab === 'education'      && <EducationSection />}
          {activeTab === 'experiences'    && <ExperiencesSection />}
          {activeTab === 'projects'       && <ProjectsSection />}
          {activeTab === 'skills'         && <SkillsSection />}
          {activeTab === 'languages'      && <LanguagesSection />}
          {activeTab === 'certifications' && <CertificationsSection />}
          {activeTab === 'share'          && <ShareableURL />}
        </form>
      </div>
    </FormProvider>
  );
}
