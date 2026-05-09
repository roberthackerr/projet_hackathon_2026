"use client";

import { useMemo } from "react";

import { Activity, Loader2, Target, TrendingUp } from "lucide-react";

import { useAIs } from "@/hooks/use-ais";

function parseUsers(rawUsers: string) {
  const trimmed = rawUsers.trim().toUpperCase();

  if (!trimmed) {
    return 0;
  }

  const multiplier =
    trimmed.endsWith("K") ? 1_000 : trimmed.endsWith("M") ? 1_000_000 : 1;

  const normalized = trimmed.replace(/[^\d.]/g, "");
  const value = Number.parseFloat(normalized);

  return Number.isFinite(value) ? value * multiplier : 0;
}

function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export default function DeveloperStatsSummary() {
  const { ais, loading } = useAIs();

  const summary = useMemo(() => {
    const totalAIs = ais.length;

    const totalUsers = ais.reduce((sum, ai) => {
      return sum + parseUsers(ai.users);
    }, 0);

    const averageUsersPerAI = totalAIs ? totalUsers / totalAIs : 0;

    const bestAI = [...ais].sort((a, b) => b.rating - a.rating)[0];

    const distinctDomains = new Set(ais.map((ai) => ai.domain)).size;

    return {
      totalUsers,
      averageUsersPerAI,
      bestAIName: bestAI?.name || "-",
      bestAIRating: bestAI?.rating ?? 0,
      distinctDomains,
    };
  }, [ais]);

  if (loading) {
    return (
      <div className="flex h-44 items-center justify-center rounded-4xl border border-white/10 bg-white/5 backdrop-blur-2xl">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
          <Activity className="h-5 w-5" />
        </div>

        <h3 className="text-3xl font-bold text-white">
          {formatCompactNumber(summary.totalUsers)}
        </h3>

        <p className="mt-2 text-slate-400">
          Portee totale
        </p>
      </div>

      <div className="rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
          <TrendingUp className="h-5 w-5" />
        </div>

        <h3 className="text-3xl font-bold text-white">
          {formatCompactNumber(summary.averageUsersPerAI)}
        </h3>

        <p className="mt-2 text-slate-400">
          Utilisateurs moyens par IA
        </p>
      </div>

      <div className="rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-300">
          <Target className="h-5 w-5" />
        </div>

        <h3 className="truncate text-2xl font-bold text-white">
          {summary.bestAIName}
        </h3>

        <p className="mt-2 text-slate-400">
          Meilleure note: {summary.bestAIRating.toFixed(1)} / 5 | Domaines actifs: {summary.distinctDomains}
        </p>
      </div>
    </div>
  );
}