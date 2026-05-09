// components/home/cta-section.tsx

import Link from "next/link";

import {
  ArrowRight,
} from "lucide-react";

export default function CTASection() {
  return (
    <section className="px-6 pb-32 pt-10">

      <div className="mx-auto max-w-6xl overflow-hidden rounded-[48px] border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 p-12 backdrop-blur-2xl">

        <div className="text-center">

          <h2 className="text-5xl font-bold leading-tight">

            Rejoignez la révolution
            IA malgache

          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-slate-300">

            Publiez vos projets, collaborez avec
            des développeurs et participez à la
            création de l’écosystème IA de Madagascar.

          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">

            <Link
              href="/developer/create-ai"
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-8 py-5 font-semibold text-white transition hover:scale-[1.02]"
            >
              Commencer maintenant

              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/marketplace"
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-5 font-semibold text-white transition hover:bg-white/10"
            >
              Explorer les IA
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}