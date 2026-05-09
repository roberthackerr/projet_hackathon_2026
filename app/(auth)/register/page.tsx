// apps/web/app/(auth)/register/page.tsx

import RegisterForm from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#081018] px-6 py-10 text-white">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#06b6d440,transparent_35%)]" />

      <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-emerald-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 grid w-full max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2">

        {/* LEFT */}
        <div className="flex flex-col justify-center">

          <div className="mb-6 inline-flex w-fit items-center rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300 backdrop-blur-xl">
            Join The AI Revolution
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight lg:text-7xl">
            Create your{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              AI Account
            </span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-slate-400">
            Rejoignez l’écosystème IA collaboratif malgache et accédez à
            une plateforme immersive dédiée à l’intelligence artificielle.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
              <h2 className="text-2xl font-bold">6+</h2>
              <p className="text-sm text-slate-400">
                AI disponibles
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
              <h2 className="text-2xl font-bold">Realtime</h2>
              <p className="text-sm text-slate-400">
                Community Chat
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
              <h2 className="text-2xl font-bold">Secure</h2>
              <p className="text-sm text-slate-400">
                JWT Authentication
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-center">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}