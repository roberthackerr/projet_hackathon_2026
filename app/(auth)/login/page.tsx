import LoginForm from "@/components/auth/login-form";
import MadagascarMapCard from "@/components/madagascar-map-card";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#081018] px-6 py-10 text-white">
      {/* Arrière-plan */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0ea5e940,transparent_40%)]" />

      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 grid w-full max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Colonne gauche */}
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300 backdrop-blur-xl">
            Plateforme IA
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight lg:text-7xl">
            Bienvenue sur{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              MadaAI Hub
            </span>
          </h1>
          <MadagascarMapCard />

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <div>
              <h2 className="text-3xl font-bold text-white">6+</h2>
              <p className="text-slate-400">Modèles IA</p>
            </div>

            <div className="hidden h-12 w-px bg-white/10 sm:block" />

            <div>
              <h2 className="text-3xl font-bold text-white">24/7</h2>
              <p className="text-slate-400">Temps réel</p>
            </div>

            <div className="hidden h-12 w-px bg-white/10 sm:block" />

            <div>
              <h2 className="text-3xl font-bold text-white">100%</h2>
              <p className="text-slate-400">Accès sécurisé</p>
            </div>
          </div>
        </div>

        {/* Colonne droite */}
        <div className="flex items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}