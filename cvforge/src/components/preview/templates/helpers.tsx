// src/components/preview/templates/helpers.tsx
// Shared helpers for all CV templates (Personne 2 will expand these)

export function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <h2 className="text-sm font-bold uppercase tracking-widest text-teal-700">{title}</h2>
      <div className="flex-1 h-px bg-teal-200" />
    </div>
  );
}

export function SkillDots({ level, color = 'slate' }: { level: number; color?: 'slate' | 'teal' }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className={`w-2 h-2 rounded-full ${
          i <= level
            ? color === 'teal' ? 'bg-teal-500' : 'bg-slate-600'
            : 'bg-slate-200'
        }`} />
      ))}
    </div>
  );
}

export function formatDate(monthStr: string) {
  if (!monthStr) return '';
  const [year, month] = monthStr.split('-');
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  return `${months[parseInt(month) - 1]} ${year}`;
}
