// src/components/forms/CVForm.tsx (Personne 1)

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { cvFormSchema, type CVFormValues } from '../../types/schemas';
import { useCVStore } from '../../store/cvStore';
import { PersonalSection } from './PersonalSection';
import { EducationSection } from './EducationSection';
import { SkillsSection } from './SkillsSection';
import { ExperiencesSection } from '../../types/ExperiencesSection';
import { ProjectsSection } from '../../types/ProjectsSection';
import { ShareableURL } from './../actions/ShareableURL';

const TABS = [
  { id: 'personal',     label: '👤 Infos perso' },
  { id: 'education',    label: '🎓 Formation' },
  { id: 'experiences',  label: '💼 Expériences' },
  { id: 'projects',     label: '🚀 Projets' },
  { id: 'skills',       label: '⚡ Compétences' },
  { id: 'share',        label: '🔗 Partage' },
] as const;

type TabId = (typeof TABS)[number]['id'];

interface CVFormProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function CVForm({ activeTab, onTabChange }: CVFormProps) {
  const { data, updateData } = useCVStore();

  const methods = useForm<CVFormValues>({
    resolver: zodResolver(cvFormSchema),
    defaultValues: {
      personal:    data.personal,
      education:   data.education,
      skills:      data.skills,
      experiences: data.experiences,
      projects:    data.projects,
    },
    mode: 'onChange',
  });

  const { watch } = methods;

  useEffect(() => {
    const subscription = watch((values) => {
      if (values.personal)    updateData({ personal:    values.personal    as CVFormValues['personal'] });
      if (values.education)   updateData({ education:   values.education   as CVFormValues['education'] });
      if (values.skills)      updateData({ skills:      values.skills      as CVFormValues['skills'] });
      if (values.experiences) updateData({ experiences: values.experiences as CVFormValues['experiences'] });
      if (values.projects)    updateData({ projects:    values.projects    as CVFormValues['projects'] });
    });
    return () => subscription.unsubscribe();
  }, [watch, updateData]);

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col h-full">
        {/* Tab bar — scrollable on small screens */}
        <div className="flex border-b border-slate-200 bg-white px-4 pt-3 gap-1 flex-shrink-0 overflow-x-auto">
          {TABS.map((tab) => (
            <button key={tab.id} type="button" onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-teal-500 text-white' : 'text-slate-500 hover:bg-slate-100'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        <form className="flex-1 overflow-y-auto p-5">
          {activeTab === 'personal'    && <PersonalSection />}
          {activeTab === 'education'   && <EducationSection />}
          {activeTab === 'experiences' && <ExperiencesSection />}
          {activeTab === 'projects'    && <ProjectsSection />}
          {activeTab === 'skills'      && <SkillsSection />}
          {activeTab === 'share'       && <ShareableURL />}
        </form>
      </div>
    </FormProvider>
  );
}
