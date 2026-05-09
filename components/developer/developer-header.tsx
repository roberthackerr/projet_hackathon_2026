// components/developer/developer-header.tsx

import Link from "next/link";

import {
  Plus,
  Sparkles,
} from "lucide-react";

export default function DeveloperHeader() {
  return (
    <div className="mb-10 flex flex-col justify-between gap-6 rounded-[40px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl lg:flex-row lg:items-center">

      <div>

        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">

          <Sparkles className="h-4 w-4" />

          Developer Studio
        </div>

        <h1 className="text-4xl font-bold lg:text-5xl">
          Developer Dashboard
        </h1>

        <p className="mt-4 text-slate-400">
          Gérez vos intelligences artificielles.
        </p>
      </div>

      <Link
        href="/developer/create-ai"
        className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
      >
        <Plus className="h-5 w-5" />

        Nouvelle IA
      </Link>
    </div>
  );
}