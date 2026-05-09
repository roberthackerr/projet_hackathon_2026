// components/home/featured-ais.tsx

import Link from "next/link";

const featuredAIs = [
  {
    name: "EduBot MG",

    description:
      "Assistant éducatif intelligent.",

    domain: "Education",
  },

  {
    name: "TradukMG",

    description:
      "Traduction Malagasy ↔ Français.",

    domain: "Translation",
  },

  {
    name: "AgriConseil MG",

    description:
      "Conseils IA pour agriculteurs.",

    domain: "Agriculture",
  },
];

export default function FeaturedAIs() {
  return (
    <section className="px-6 py-24">

      <div className="mx-auto max-w-7xl">

        <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">

          <div>

            <h2 className="text-5xl font-bold">
              IA populaires
            </h2>

            <p className="mt-4 text-slate-400">
              Découvrez les projets IA les plus utilisés.
            </p>
          </div>

          <Link
            href="/marketplace"
            className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white transition hover:bg-white/10"
          >
            Voir marketplace
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

          {featuredAIs.map((ai) => (
            <div
              key={ai.name}
              className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
            >

              <div className="mb-5 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">

                {ai.domain}

              </div>

              <h3 className="text-3xl font-bold">
                {ai.name}
              </h3>

              <p className="mt-5 text-slate-400">
                {ai.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}