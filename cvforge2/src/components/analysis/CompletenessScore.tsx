// src/components/analysis/CompletenessScore.tsx (Personne 2 — fix langues + certifs)

import { useCVStore } from '../../store/cvStore';

interface ScoreItem {
  label: string;
  done: boolean;
  weight: number;
}

function useScoreItems(): ScoreItem[] {
  const data = useCVStore((state) => state.data);
  const { personal, education, experiences, projects, skills, languages, certifications } = data;

  return [
    { label: 'Nom complet',           done: !!personal.fullName.trim(),                        weight: 12 },
    { label: 'Email',                  done: !!personal.email.trim(),                           weight: 8  },
    { label: 'Téléphone',             done: !!personal.phone.trim(),                           weight: 8  },
    { label: 'Résumé professionnel',  done: !!personal.summary.trim(),                         weight: 12 },
    { label: 'Formation',             done: education.length > 0,                              weight: 12 },
    { label: 'Expérience / Projet',   done: experiences.length > 0 || projects.length > 0,    weight: 18 },
    { label: 'Compétences (min. 3)',  done: skills.length >= 3,                               weight: 12 },
    { label: 'Langues',               done: languages.length > 0,                              weight: 10 },
    { label: 'Certifications',        done: certifications.length > 0,                         weight: 8  },
  ];
}

function getScoreTheme(score: number) {
  if (score >= 80) return {
    color: '#22c55e', label: 'Excellent', labelColor: 'text-green-600', bg: 'bg-green-50',
  };
  if (score >= 50) return {
    color: '#f59e0b', label: 'À améliorer', labelColor: 'text-amber-600', bg: 'bg-amber-50',
  };
  return {
    color: '#ef4444', label: 'Incomplet', labelColor: 'text-red-600', bg: 'bg-red-50',
  };
}

export default function CompletenessScore() {
  const items = useScoreItems();
  const score = items.filter((i) => i.done).reduce((acc, i) => acc + i.weight, 0);
  const theme = getScoreTheme(score);

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const dash = (score / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 pt-5 pb-4 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-800">Score de complétude</h3>
        <p className="text-xs text-slate-400 mt-0.5">Basé sur les sections remplies</p>
      </div>

      {/* Jauge */}
      <div className={`flex items-center gap-6 px-5 py-5 ${theme.bg}`}>
        <div className="flex-shrink-0">
          <svg width="130" height="130" viewBox="0 0 130 130"
            aria-label={`Score : ${score} sur 100`} role="img">
            <circle cx="65" cy="65" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="10" />
            <circle
              cx="65" cy="65" r={radius}
              fill="none" stroke={theme.color} strokeWidth="10"
              strokeDasharray={`${dash} ${circumference}`}
              strokeLinecap="round"
              transform="rotate(-90 65 65)"
              style={{ transition: 'stroke-dasharray 0.6s cubic-bezier(0.4,0,0.2,1)' }}
            />
            <text x="65" y="60" textAnchor="middle" fontSize="24" fontWeight="800"
              fill={theme.color} fontFamily="sans-serif">{score}%</text>
            <text x="65" y="78" textAnchor="middle" fontSize="10"
              fill="#94a3b8" fontFamily="sans-serif">{theme.label}</text>
          </svg>
        </div>

        <div className="space-y-2 text-xs">
          {[
            { color: '#22c55e', label: '≥ 80 %', desc: 'Excellent'  },
            { color: '#f59e0b', label: '≥ 50 %', desc: 'Moyen'      },
            { color: '#ef4444', label: '< 50 %',  desc: 'Incomplet' },
          ].map((item) => (
            <div key={item.desc} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }} />
              <span className="text-slate-500">
                <span className="font-semibold text-slate-700">{item.label}</span>
                {' '}— {item.desc}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Checklist */}
      <ul className="divide-y divide-slate-50 px-5 py-2">
        {items.map((item) => (
          <li key={item.label}
            className="flex items-center gap-3 py-2.5 hover:bg-slate-50 -mx-5 px-5 rounded transition-colors">
            <span className={`
              flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center
              ${item.done ? 'bg-green-400' : 'bg-slate-200'}
            `} aria-hidden="true">
              {item.done && (
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none"
                  stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M2 6l3 3 5-5" />
                </svg>
              )}
            </span>
            <span className={`flex-1 text-xs ${item.done ? 'text-slate-700' : 'text-slate-400'}`}>
              {item.label}
            </span>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
              item.done ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'
            }`}>
              +{item.weight}pt
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}