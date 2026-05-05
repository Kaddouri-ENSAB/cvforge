// src/components/dashboard/Dashboard.tsx

import { useState } from "react";
import type { CVEntry } from "../../types/cv";
import CVCard from "./CVCard";
import EmptyState from "./EmptyState";
import SearchBar from "./SearchBar";

const mockEntries: CVEntry[] = [
  {
    id: "1",
    title: "CV Développeur Frontend",
    createdAt: "2024-11-01T10:00:00Z",
    updatedAt: "2024-11-15T14:30:00Z",
    data: {
      personal: {
        fullName: "Assia Kaddouri",
        email: "assia@example.com",
        phone: "+212 6 00 00 00 00",
        address: "Casablanca, Maroc",
        linkedin: "linkedin.com/in/assia",
        github: "github.com/assia",
        website: "",
        summary: "Développeuse frontend passionnée par React et TypeScript.",
      },
      education: [],
      experiences: [],
      skills: [
        { id: "s1", name: "React", level: 4, category: "hard" },
        { id: "s2", name: "TypeScript", level: 3, category: "hard" },
        { id: "s3", name: "Tailwind", level: 4, category: "hard" },
      ],
      languages: [{ id: "l1", name: "Français", level: "Courant" }],
      projects: [],
      certifications: [],
    },
  },
  {
    id: "2",
    title: "CV Stage PFE",
    createdAt: "2024-12-01T09:00:00Z",
    updatedAt: "2024-12-10T11:00:00Z",
    data: {
      personal: {
        fullName: "Assia Kaddouri",
        email: "assia@example.com",
        phone: "+212 6 00 00 00 00",
        address: "Casablanca, Maroc",
        linkedin: "",
        github: "",
        website: "",
        summary: "Étudiante ingénieure cherchant un stage PFE en développement web.",
      },
      education: [],
      experiences: [],
      skills: [{ id: "s1", name: "React", level: 3, category: "hard" }],
      languages: [],
      projects: [],
      certifications: [],
    },
  },
];

interface DashboardProps {
  onCreateCV?: () => void;
  onEditCV?: (id: string) => void;
  onDuplicateCV?: (id: string) => void;
  onDeleteCV?: (id: string) => void;
  entries?: CVEntry[];
}

export default function Dashboard({
  onCreateCV = () => {},
  onEditCV = () => {},
  onDuplicateCV = () => {},
  onDeleteCV = () => {},
  entries,
}: DashboardProps) {
  const [search, setSearch] = useState("");
  const [previewId, setPreviewId] = useState<string | null>(null);

 const [localEntries, setLocalEntries] = useState<CVEntry[]>(entries ?? mockEntries);
const allEntries = entries ?? localEntries;

const handleDuplicate = (id: string) => {
  const cvToDuplicate = allEntries.find((entry) => entry.id === id);
  if (!cvToDuplicate) return;

  const duplicatedCV: CVEntry = {
    ...cvToDuplicate,
    id: Date.now().toString(),
    title: `${cvToDuplicate.title} - Copie`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  setLocalEntries((prev) => [duplicatedCV, ...prev]);
  onDuplicateCV(id);
};

const handleDelete = (id: string) => {
  const confirmDelete = window.confirm("Voulez-vous vraiment supprimer ce CV ?");
  if (!confirmDelete) return;

  setLocalEntries((prev) => prev.filter((entry) => entry.id !== id));
  onDeleteCV(id);
};

  const filtered = allEntries.filter((entry) =>
    entry.title.toLowerCase().includes(search.toLowerCase())
  );

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const createdThisMonth = allEntries.filter((entry) => {
    const date = new Date(entry.createdAt);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  }).length;

  const completeCVs = allEntries.filter((entry) => {
    const personal = entry.data.personal;
    return personal?.fullName && personal?.email && entry.data.skills?.length >= 2;
  }).length;

  const selectedPreview = allEntries.find((entry) => entry.id === previewId);

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold shadow-md">
              CV
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900">CVForge</h1>
              <p className="text-sm text-slate-400">Gérez vos CVs facilement</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onCreateCV}
            className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-3 rounded-2xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
          >
            + Nouveau CV
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <section className="rounded-3xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-8 shadow-lg mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="text-sm text-teal-50 mb-2">Bienvenue sur CVForge 👋</p>
            <h2 className="text-3xl font-bold">Créez un CV professionnel en quelques minutes</h2>
            <p className="text-teal-50 mt-2 max-w-xl">
              Gérez vos CVs, modifiez-les facilement et choisissez le template qui vous correspond.
            </p>
          </div>

          <button
            type="button"
            onClick={onCreateCV}
            className="bg-white text-teal-600 px-6 py-3 rounded-2xl font-semibold shadow hover:bg-teal-50 transition"
          >
            Créer maintenant
          </button>
        </section>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Mes CVs</h2>
            <p className="text-slate-400 mt-1">
              {allEntries.length} CV{allEntries.length > 1 ? "s" : ""} enregistré
              {allEntries.length > 1 ? "s" : ""}
            </p>
          </div>

          <div className="w-full lg:w-[420px]">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <StatCard icon="📄" label="CVs créés" value={allEntries.length} color="text-teal-600" />
          <StatCard icon="📅" label="Ce mois-ci" value={createdThisMonth} color="text-blue-600" />
          <StatCard icon="✅" label="Complets" value={completeCVs} color="text-green-600" />
        </section>

        {filtered.length === 0 ? (
          <EmptyState
            isSearching={search.trim().length > 0}
            onCreateClick={onCreateCV}
          />
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((entry) => (
              <CVCard
                key={entry.id}
                entry={entry}
                onEdit={onEditCV}
                  onDuplicate={handleDuplicate}
                  onDelete={handleDelete}
                onPreview={(id) => setPreviewId(id)}
              />
            ))}
          </section>
        )}
      </main>

      {selectedPreview && (
        <PreviewModal
          entry={selectedPreview}
          onClose={() => setPreviewId(null)}
        />
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: string;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl">
          {icon}
        </div>

        <div>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
          <p className="text-sm text-slate-500">{label}</p>
        </div>
      </div>
    </div>
  );
}

function PreviewModal({
  entry,
  onClose,
}: {
  entry: CVEntry;
  onClose: () => void;
}) {
  const personal = entry.data.personal;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white rounded-t-3xl">
          <div>
            <h2 className="font-bold text-slate-900">{entry.title}</h2>
            <p className="text-sm text-slate-400">Aperçu rapide du CV</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 transition"
          >
            ✕
          </button>
        </div>

        <div className="p-8">
          <div className="border border-slate-200 rounded-2xl p-8 bg-white">
            <div className="text-center border-b border-slate-200 pb-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-2xl font-bold mb-3">
                {personal.fullName?.charAt(0).toUpperCase() || "?"}
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                {personal.fullName || "Nom complet"}
              </h3>
              <p className="text-slate-500">{personal.email}</p>
              <p className="text-slate-400 text-sm">{personal.phone}</p>
            </div>

            {personal.summary && (
              <section className="mt-6">
                <h4 className="font-bold text-slate-800 mb-2">Profil</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {personal.summary}
                </p>
              </section>
            )}

            <section className="mt-6">
              <h4 className="font-bold text-slate-800 mb-3">Compétences</h4>
              <div className="flex flex-wrap gap-2">
                {entry.data.skills.length > 0 ? (
                  entry.data.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-medium"
                    >
                      {skill.name}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">Aucune compétence ajoutée.</p>
                )}
              </div>
            </section>

            <section className="mt-6">
              <h4 className="font-bold text-slate-800 mb-3">Langues</h4>
              {entry.data.languages.length > 0 ? (
                <ul className="text-sm text-slate-600 space-y-1">
                  {entry.data.languages.map((language) => (
                    <li key={language.id}>
                      {language.name} - {language.level}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-400">Aucune langue ajoutée.</p>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}