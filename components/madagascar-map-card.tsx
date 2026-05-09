"use client";

import { useState } from "react";

const MAP_SRC = "/carte-drapeaux-madagascar.jpg";

function StylizedFallbackMap() {
  return (
    <div className="relative mx-auto aspect-[2/5] max-h-[240px] w-full max-w-[120px]">
      <svg
        viewBox="0 0 100 220"
        className="size-full drop-shadow-[0_0_24px_rgba(34,211,238,0.35)]"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Carte stylisée de Madagascar"
      >
        <title>Carte stylisée de Madagascar</title>
        <defs>
          <linearGradient
            id="mg-map-fill"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#34d399" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path
          fill="url(#mg-map-fill)"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1"
          d="M48 8c14 2 24 22 26 42 2 18-4 30-2 48 2 22 12 40 10 62-2 22-12 38-10 58 2 18 10 22 6 36-4 12-18 18-28 16-10-2-16-12-18-24-2-18 6-34 4-52-2-24-16-44-18-70-2-30 8-58 22-72 4-4 8-6 10-6z"
        />
      </svg>
    </div>
  );
}

export default function MadagascarMapCard() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="mt-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/90">
        Madagascar
      </p>

      {failed ? (
        <StylizedFallbackMap />
      ) : (
        <div className="relative mx-auto flex min-h-[180px] w-full max-w-[220px] items-center justify-center rounded-xl border border-white/5 bg-white/5 p-3">
          <img
            src={MAP_SRC}
            alt="Carte de Madagascar aux couleurs du drapeau malgache"
            className="max-h-[280px] w-full object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
            width={400}
            height={600}
            decoding="async"
            onError={() => setFailed(true)}
          />
        </div>
      )}

      <p className="mt-4 text-center text-sm text-slate-400">
        Une plateforme pensée pour le marché malgache et la communauté locale.
      </p>
    </div>
  );
}
