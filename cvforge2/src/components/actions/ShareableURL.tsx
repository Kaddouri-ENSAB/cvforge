// src/components/actions/ShareableURL.tsx (Personne 1 — Sprint 3)
// Données dans URL hash (base64) + Import/Export JSON UI

import { useState, useEffect } from 'react';
import { useCVStore } from '../../store/cvStore';

export function ShareableURL() {
  const { exportJSON, importJSON } = useCVStore();
  const [copied, setCopied] = useState(false);
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);

  // ── On mount: read hash from URL and load CV if present ──────────────────
  useEffect(() => {
    const hash = window.location.hash.slice(1); // remove the #
    if (!hash) return;
    try {
      const json = atob(hash);
      const ok = importJSON(json);
      if (!ok) console.warn('CVForge: invalid hash data');
    } catch {
      console.warn('CVForge: could not parse URL hash');
    }
  }, []);

  // ── Generate shareable URL ────────────────────────────────────────────────
  const getShareURL = () => {
    const base64 = btoa(exportJSON());
    return `${window.location.origin}${window.location.pathname}#${base64}`;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getShareURL());
    // Update hash in current URL too
    window.location.hash = btoa(exportJSON());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Export JSON file ──────────────────────────────────────────────────────
  const handleExportJSON = () => {
    const blob = new Blob([exportJSON()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mon-cv.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Import JSON file ──────────────────────────────────────────────────────
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportError('');
    setImportSuccess(false);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const ok = importJSON(text);
      if (ok) {
        setImportSuccess(true);
        setTimeout(() => setImportSuccess(false), 2500);
      } else {
        setImportError('Fichier invalide — assurez-vous d\'importer un JSON CVForge.');
      }
    };
    reader.readAsText(file);
    // reset input so same file can be re-imported
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2">
        Partage & Import/Export
      </h2>

      {/* ── Shareable URL ── */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-600">🔗 Partager mon CV</p>
        <p className="text-xs text-slate-400">
          Génère un lien contenant toutes vos données encodées dans l'URL. Envoyez-le à quelqu'un — il verra votre CV directement.
        </p>
        <div className="flex gap-2">
          <input
            readOnly
            value={getShareURL()}
            className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 text-slate-500 truncate"
          />
          <button
            onClick={handleCopy}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-teal-500 text-white hover:bg-teal-600'
            }`}
          >
            {copied ? '✓ Copié !' : 'Copier'}
          </button>
        </div>
      </div>

      {/* ── Export JSON ── */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-600">📥 Exporter en JSON</p>
        <p className="text-xs text-slate-400">
          Sauvegarde toutes vos données dans un fichier. Vous pourrez le réimporter plus tard.
        </p>
        <button
          onClick={handleExportJSON}
          className="px-4 py-2 bg-slate-700 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition"
        >
          Télécharger mon-cv.json
        </button>
      </div>

      {/* ── Import JSON ── */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-600">📤 Importer un JSON</p>
        <p className="text-xs text-slate-400">
          Chargez un fichier JSON exporté précédemment. Cela remplacera les données actuelles.
        </p>
        <label className="inline-block cursor-pointer px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
          Choisir un fichier
          <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
        </label>

        {importSuccess && (
          <p className="text-xs text-green-600 font-medium">✓ CV importé avec succès !</p>
        )}
        {importError && (
          <p className="text-xs text-rose-500">{importError}</p>
        )}
      </div>
    </div>
  );
}
