// apps/web/app/(auth)/login/page.tsx

import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#081018] px-6 py-10 text-white">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0ea5e940,transparent_40%)]" />

      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Content */}
      <div className="relative z-10 grid w-full max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300 backdrop-blur-xl">
            AI Operating System
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight lg:text-7xl">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              MadaAI Hub
            </span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-slate-400">
            Premier écosystème IA collaboratif dédié au marché malgache.
            Explorez des intelligences artificielles modernes dans une
            expérience immersive et futuriste.
          </p>

          <div className="mt-10 flex items-center gap-6">
            <div>
              <h2 className="text-3xl font-bold text-white">6+</h2>
              <p className="text-slate-400">AI Models</p>
            </div>

            <div className="h-12 w-[1px] bg-white/10" />

            <div>
              <h2 className="text-3xl font-bold text-white">24/7</h2>
              <p className="text-slate-400">Realtime Platform</p>
            </div>

            <div className="h-12 w-[1px] bg-white/10" />

            <div>
              <h2 className="text-3xl font-bold text-white">100%</h2>
              <p className="text-slate-400">Secure Access</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}