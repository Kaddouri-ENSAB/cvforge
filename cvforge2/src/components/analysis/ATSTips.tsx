// src/components/analysis/ATSTips.tsx (Personne 2 — UI Polish)

import { useCVStore } from '../../store/cvStore';

interface Tip {
  id: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
}

function useTips(): Tip[] {
  const data = useCVStore((state) => state.data);
  const { personal, education, experiences, projects, skills, languages } = data;
  const tips: Tip[] = [];

  if (!personal.fullName.trim())
    tips.push({ id: 'name',    message: 'Ajoutez votre nom complet',                              priority: 'high' });
  if (!personal.email.trim())
    tips.push({ id: 'email',   message: 'Ajoutez votre adresse email',                            priority: 'high' });
  if (!personal.phone.trim())
    tips.push({ id: 'phone',   message: 'Ajoutez votre numéro de téléphone',                      priority: 'high' });
  if (!personal.summary.trim())
    tips.push({ id: 'summary', message: 'Ajoutez un résumé professionnel (valorisé par les ATS)', priority: 'high' });
  if (education.length === 0)
    tips.push({ id: 'edu',     message: 'Ajoutez au moins une formation',                         priority: 'medium' });
  if (experiences.length === 0 && projects.length === 0)
    tips.push({ id: 'exp',     message: 'Ajoutez une expérience ou un projet concret',            priority: 'medium' });
  if (skills.length < 3)
    tips.push({ id: 'skills',  message: `Ajoutez au moins 3 compétences (actuellement : ${skills.length})`, priority: 'medium' });
  if (languages.length === 0)
    tips.push({ id: 'lang',    message: 'Indiquez votre niveau en langues',                       priority: 'low' });
  if (!personal.linkedin.trim())
    tips.push({ id: 'linkedin',message: 'Ajoutez votre profil LinkedIn',                          priority: 'low' });

  return tips;
}

const priorityConfig = {
  high: {
    label: 'Urgent',
    icon: '⚠',
    bg: 'bg-red-50', border: 'border-red-100',
    text: 'text-red-700', badge: 'bg-red-100 text-red-600',
    dot: 'bg-red-400',
  },
  medium: {
    label: 'Important',
    icon: '●',
    bg: 'bg-amber-50', border: 'border-amber-100',
    text: 'text-amber-700', badge: 'bg-amber-100 text-amber-600',
    dot: 'bg-amber-400',
  },
  low: {
    label: 'Conseil',
    icon: 'ℹ',
    bg: 'bg-blue-50', border: 'border-blue-100',
    text: 'text-blue-700', badge: 'bg-blue-100 text-blue-600',
    dot: 'bg-blue-300',
  },
};

export default function ATSTips() {
  const tips = useTips();

  if (tips.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-xl">
            🎉
          </div>
          <div>
            <p className="text-sm font-bold text-green-800">CV optimisé ATS !</p>
            <p className="text-xs text-green-600 mt-1 leading-relaxed">
              Toutes les sections importantes sont complètes. Votre CV est prêt à être soumis.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const highCount   = tips.filter((t) => t.priority === 'high').length;
  const mediumCount = tips.filter((t) => t.priority === 'medium').length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-800">Conseils ATS</h3>
        <div className="flex items-center gap-2 mt-1.5">
          {highCount > 0 && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-600">
              {highCount} urgent{highCount > 1 ? 's' : ''}
            </span>
          )}
          {mediumCount > 0 && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-600">
              {mediumCount} important{mediumCount > 1 ? 's' : ''}
            </span>
          )}
          <span className="text-[10px] text-slate-400 ml-auto">
            {tips.length} point{tips.length > 1 ? 's' : ''} à corriger
          </span>
        </div>
      </div>

      {/* Liste */}
      <ul className="divide-y divide-slate-50" aria-label="Conseils ATS">
        {tips.map((tip) => {
          const cfg = priorityConfig[tip.priority];
          return (
            <li
              key={tip.id}
              className={`flex items-start gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors ${cfg.bg}`}
            >
              <span className={`mt-0.5 flex-shrink-0 w-2 h-2 rounded-full ${cfg.dot} mt-1.5`} aria-hidden="true" />
              <span className={`flex-1 text-xs leading-relaxed ${cfg.text} font-medium`}>
                {tip.message}
              </span>
              <span className={`text-[9px] font-bold uppercase tracking-wide flex-shrink-0 px-1.5 py-0.5 rounded ${cfg.badge}`}>
                {cfg.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}