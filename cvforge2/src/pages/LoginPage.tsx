type LoginPageProps = {
  onLogin: () => void;
};

export default function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.35),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.25),_transparent_35%)]" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-teal-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-44 h-44 bg-emerald-400/20 rounded-full blur-3xl" />

      <div className="relative min-h-screen flex flex-col">
        {/* Navbar */}
        <header className="w-full px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-400 flex items-center justify-center font-bold text-slate-950 shadow-lg">
              CV
            </div>
            <div>
              <h1 className="text-xl font-bold">CVForge</h1>
              <p className="text-xs text-slate-400">Smart CV Builder</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <span>Templates</span>
            <span>Dashboard</span>
            <span>Preview</span>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 px-8 lg:px-20 py-8">
          {/* Left content */}
          <section className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-teal-200 mb-6">
              ✨ Nouvelle génération de CVs professionnels
            </div>

            <h2 className="text-5xl lg:text-7xl font-extrabold leading-tight">
              Construisez un CV
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">
                moderne et rapide
              </span>
            </h2>

            <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-xl">
              Créez, personnalisez, prévisualisez et gérez plusieurs CVs dans une interface simple,
              élégante et prête pour la présentation.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FeatureCard number="01" title="Templates" text="Minimaliste, Pro, Tech" />
              <FeatureCard number="02" title="Preview live" text="Aperçu instantané" />
              <FeatureCard number="03" title="Dashboard" text="Gestion multi-CVs" />
            </div>
          </section>

          {/* Login card */}
          <section className="w-full max-w-md lg:ml-auto">
            <div className="bg-white text-slate-900 rounded-[32px] p-8 lg:p-10 shadow-2xl border border-white/20">
              <div className="mb-8">
                <p className="text-sm font-bold text-teal-600">Connexion</p>
                <h3 className="mt-2 text-3xl font-extrabold">Accéder à CVForge</h3>
                <p className="mt-2 text-slate-500">
                  Entrez vos informations pour ouvrir votre dashboard.
                </p>
              </div>

              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  onLogin();
                }}
              >
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    placeholder="exemple@email.com"
                    className="w-full px-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    placeholder="********"
                    className="w-full px-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition"
                >
                  Se connecter
                </button>
              </form>

              <p className="text-center text-sm text-slate-400 mt-7">
                Démonstration frontend sans backend
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function FeatureCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl bg-white/10 border border-white/10 p-5 backdrop-blur-md hover:bg-white/15 hover:-translate-y-1 transition">
      <p className="text-sm text-teal-300 font-bold">{number}</p>
      <h4 className="mt-3 font-bold text-white">{title}</h4>
      <p className="mt-1 text-sm text-slate-300">{text}</p>
    </div>
  );
}