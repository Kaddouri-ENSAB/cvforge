// src/components/analysis/SkillsRadar.tsx (Personne 2 — UI Polish)

import { useCVStore } from '../../store/cvStore';

interface RadarCategory {
  label: string;
  value: number;
  color: string;
}

function useRadarData(): RadarCategory[] {
  const data = useCVStore((state) => state.data);
  const { personal, education, experiences, projects, skills } = data;

  const clamp = (v: number) => Math.min(1, Math.max(0, v));

  const profileFields = [personal.fullName, personal.email, personal.phone, personal.summary, personal.address];

  return [
    { label: 'Profil',      value: clamp(profileFields.filter(Boolean).length / profileFields.length), color: '#6366f1' },
    { label: 'Formation',   value: clamp(education.length / 2),                                        color: '#06b6d4' },
    { label: 'Expériences', value: clamp(experiences.length / 3),                                      color: '#f59e0b' },
    { label: 'Projets',     value: clamp(projects.length / 2),                                         color: '#22c55e' },
    { label: 'Compétences', value: clamp(skills.length / 5),                                           color: '#ef4444' },
  ];
}

function polarToCartesian(cx: number, cy: number, r: number, angleRad: number) {
  return {
    x: cx + r * Math.sin(angleRad),
    y: cy - r * Math.cos(angleRad),
  };
}

export default function SkillsRadar() {
  const categories = useRadarData();
  const cx = 130;
  const cy = 130;
  const maxR = 95;
  const n = categories.length;

  const axes = categories.map((_, i) => {
    const angle = (2 * Math.PI * i) / n;
    return polarToCartesian(cx, cy, maxR, angle);
  });

  const rings = [0.25, 0.5, 0.75, 1].map((factor) =>
    categories.map((_, i) => {
      const angle = (2 * Math.PI * i) / n;
      return polarToCartesian(cx, cy, factor * maxR, angle);
    })
  );

  const userPoints = categories.map((cat, i) => {
    const angle = (2 * Math.PI * i) / n;
    return polarToCartesian(cx, cy, cat.value * maxR, angle);
  });

  const toPath = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') + ' Z';

  const labelR = maxR + 22;
  const labels = categories.map((cat, i) => {
    const angle = (2 * Math.PI * i) / n;
    return { ...polarToCartesian(cx, cy, labelR, angle), label: cat.label, value: cat.value, color: cat.color };
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 pt-5 pb-4 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-800">Radar des sections</h3>
        <p className="text-xs text-slate-400 mt-0.5">Complétude par catégorie</p>
      </div>

      <div className="flex flex-col items-center px-5 py-5">
        <svg
          viewBox="0 0 260 260"
          width="260"
          height="260"
          aria-label="Radar de complétude du CV"
          role="img"
        >
          {/* Grille */}
          {rings.map((ring, ri) => (
            <polygon
              key={ri}
              points={ring.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')}
              fill={ri === 3 ? '#f8fafc' : 'none'}
              stroke="#e2e8f0"
              strokeWidth={ri === 3 ? '1.5' : '1'}
            />
          ))}

          {/* Axes */}
          {axes.map((end, i) => (
            <line key={i} x1={cx} y1={cy}
              x2={end.x.toFixed(1)} y2={end.y.toFixed(1)}
              stroke="#e2e8f0" strokeWidth="1"
              strokeDasharray="3 3"
            />
          ))}

          {/* Zone utilisateur */}
          <path
            d={toPath(userPoints)}
            fill="rgba(59,130,246,0.12)"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Points colorés par catégorie */}
          {userPoints.map((p, i) => (
            <circle
              key={i}
              cx={p.x} cy={p.y} r="5"
              fill={categories[i].color}
              stroke="white"
              strokeWidth="2"
            />
          ))}

          {/* Labels */}
          {labels.map((l, i) => (
            <text
              key={i}
              x={l.x.toFixed(1)}
              y={l.y.toFixed(1)}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="10"
              fontWeight="600"
              fill="#475569"
              fontFamily="sans-serif"
            >
              {l.label}
            </text>
          ))}
        </svg>

        {/* Légende */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 w-full mt-1">
          {categories.map((cat) => (
            <div key={cat.label} className="flex items-center gap-2">
              <span
                className="flex-shrink-0 w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-xs text-slate-600 flex-1">{cat.label}</span>
              <span className="text-xs font-mono font-semibold" style={{ color: cat.color }}>
                {Math.round(cat.value * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}