// components/marketplace/ai-card.tsx

"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import {
  ArrowUpRight,
  Star,
  Users,
  Sparkles,
} from "lucide-react";

interface Props {
  ai: {
    _id: string;

    name: string;

    description: string;

    domain: string;

    users: string;

    rating: number;

    gradient: string;
  };
}

export default function AICard({
  ai,
}: Props) {
  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.3,
      }}
      className={`group relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br ${ai.gradient} p-6 backdrop-blur-2xl`}
    >

      {/* Glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">

        <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

      </div>

      {/* Live Badge */}
      <div className="relative z-10 mb-5 flex items-center justify-between">

        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-300">

          <Sparkles className="h-4 w-4" />

          <span>{ai.domain}</span>
        </div>

        <div className="flex items-center gap-2">

          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

          <span className="text-xs text-slate-400">
            LIVE
          </span>
        </div>
      </div>

      {/* Title */}
      <h2 className="relative z-10 text-2xl font-bold text-white">

        {ai.name}

      </h2>

      {/* Description */}
      <p className="relative z-10 mt-4 leading-relaxed text-slate-400">

        {ai.description}

      </p>

      {/* Stats */}
      <div className="relative z-10 mt-8 flex items-center justify-between">

        {/* Rating */}
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2">

          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

          <span className="text-sm text-white">
            {ai.rating}
          </span>
        </div>

        {/* Users */}
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2">

          <Users className="h-4 w-4 text-slate-300" />

          <span className="text-sm text-white">
            {ai.users}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-8">

        <Link
          href={`/ia/${ai._id}`}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
        >
          Tester IA

          <ArrowUpRight className="h-5 w-5" />
        </Link>
      </div>

      {/* Border Glow */}
      <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-cyan-400/0 transition-all duration-500 group-hover:border-cyan-400/20" />
    </motion.div>
  );
}