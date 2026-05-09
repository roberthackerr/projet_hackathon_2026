// app/developer/create-ai/page.tsx

import CreateAIForm from "@/components/developer/create-ai-form";

export default function CreateAIPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#081018] px-6 py-10 text-white">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#06b6d420,transparent_35%)]" />

      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-12">

          <div className="mb-5 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
            Developer Studio
          </div>

          <h1 className="text-5xl font-bold tracking-tight lg:text-6xl">
            Publier une{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Intelligence Artificielle
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
            Partagez votre IA avec l’écosystème
            technologique malgache.
          </p>
        </div>

        {/* Form */}
        <CreateAIForm />
      </div>
    </main>
  );
}