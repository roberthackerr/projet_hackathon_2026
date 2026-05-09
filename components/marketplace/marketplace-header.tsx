// components/marketplace/marketplace-header.tsx

"use client";

import { Search } from "lucide-react";

export default function MarketplaceHeader() {
  return (
    <div className="relative mb-16 overflow-hidden rounded-[40px] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl">

      {/* Glow */}
      <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative z-10">

        {/* Badge */}
        <div className="mb-6 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
          Malagasy AI Ecosystem
        </div>

        {/* Title */}
        <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight text-white lg:text-7xl">
          Explore The Future of{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Malagasy AI
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
          Découvrez des intelligences artificielles créées
          pour l’éducation, l’agriculture, le business,
          la santé et plus encore.
        </p>

        {/* Search */}
        <div className="mt-10 flex items-center rounded-2xl border border-white/10 bg-[#0F172A]/80 px-5 backdrop-blur-xl">

          <Search className="h-5 w-5 text-slate-400" />

          <input
            type="text"
            placeholder="Rechercher une IA..."
            className="h-14 w-full bg-transparent px-4 text-white outline-none placeholder:text-slate-500"
          />
        </div>
      </div>
    </div>
  );
}