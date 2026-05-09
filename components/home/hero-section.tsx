// components/home/hero-section.tsx

import Link from "next/link";

import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="px-6 pb-24 pt-28">

      <div className="mx-auto max-w-7xl text-center">

        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm text-cyan-300">

          <Sparkles className="h-4 w-4" />

          Premier écosystème IA malgache
        </div>

        {/* Title */}
        <h1 className="mx-auto max-w-5xl text-6xl font-black leading-tight lg:text-8xl">

          Construisons
          <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            {" "}
            l’intelligence artificielle{" "}
          </span>
          de Madagascar
        </h1>

        {/* Description */}
        <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-slate-400">

          Une plateforme collaborative où les développeurs
          malgaches peuvent créer, publier et partager leurs
          intelligences artificielles.

        </p>

        {/* Buttons */}
        <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">

          <Link
            href="/marketplace"
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-8 py-5 font-semibold text-white transition hover:scale-[1.02]"
          >
            Explorer les IA

            <ArrowRight className="h-5 w-5" />
          </Link>

          <Link
            href="/developer/create-ai"
            className="rounded-2xl border border-white/10 bg-white/5 px-8 py-5 font-semibold text-white backdrop-blur-xl transition hover:bg-white/10"
          >
            Publier une IA
          </Link>
        </div>
      </div>
    </section>
  );
}