// components/marketplace/ai-card.tsx

"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import {
  ArrowUpRight,
  Star,
  Users,
  Sparkles,
  Bot,
  Globe,
  ExternalLink,
} from "lucide-react";

interface Props {
  ai: {
    _id: string;
    link:string;
    name: string;

    description: string;

    domain: string;

    users: string;

    rating: number;

    gradient: string;

    image?: string;

    aiLink?: string;

    type?: string;

    createdBy?: string;
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
      className={`group relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br ${ai.gradient} backdrop-blur-2xl`}
    >

      {/* Image */}
      <div className="relative h-[220px] overflow-hidden border-b border-white/10">

        {ai.image ? (
          <img
            src={ai.image}
            alt={ai.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-black/20">

            <Bot className="h-20 w-20 text-cyan-400" />

          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Badge */}
        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-cyan-300 backdrop-blur-xl">

          <Sparkles className="h-4 w-4" />

          {ai.domain}

        </div>

        {/* Live */}
        <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">

          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

          LIVE
        </div>
      </div>

      {/* Content */}
      <div className="p-6">

        {/* Type */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">

          <Bot className="h-3 w-3" />

          {ai.type || "assistant"}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white">

          {ai.name}

        </h2>

        {/* Description */}
        <p className="mt-4 line-clamp-3 leading-relaxed text-slate-400">

          {ai.description}

        </p>

        {/* Stats */}
        <div className="mt-8 flex items-center justify-between">

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2">

            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

            <span className="text-sm text-white">
              {ai.rating}
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2">

            <Users className="h-4 w-4 text-slate-300" />

            <span className="text-sm text-white">
              {ai.users}
            </span>
          </div>
        </div>

        {/* Creator */}
        {ai.createdBy && (
          <div className="mt-5 text-sm text-slate-500">

            Créé par{" "}
            <span className="text-cyan-300">
              {ai.createdBy}
            </span>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-8 flex gap-3">

          {/* Playground */}
          <Link
            href={`/ia/${ai._id}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-4 font-semibold text-white transition hover:scale-[1.02]"
          >

            Tester

            <ArrowUpRight className="h-5 w-5" />
          </Link>

          {/* Details */}
          <Link
            href={`/marketplace/${ai._id}`}
            className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition hover:bg-white/10"
          >

            <Globe className="h-5 w-5" />
          </Link>
        </div>

        {/* External Link */}
        {ai.link && (
          <Link
            href={ai.link}
            target="_blank"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-4 text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/20"
          >

            Voir le site IA

            <ArrowUpRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-cyan-400/0 transition-all duration-500 group-hover:border-cyan-400/20" />
    </motion.div>
  );
}