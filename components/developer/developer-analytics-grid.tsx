"use client";

import { useMemo } from "react";

import {
  BarChart3,
  Loader2,
  Sparkles,
  Star,
  Trophy,
  Users,
} from "lucide-react";

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

export default function DeveloperAnalyticsGrid() {
  const { ais, loading } = useAIs();

  const analytics = useMemo(() => {
    const totalAIs = ais.length;

    const totalUsers = ais.reduce((sum, ai) => {
      return sum + parseUsers(ai.users);
    }, 0);

    const averageRating = totalAIs
      ? ais.reduce((sum, ai) => sum + ai.rating, 0) / totalAIs
      : 0;

    const domainCounter = ais.reduce<Record<string, number>>((acc, ai) => {
      acc[ai.domain] = (acc[ai.domain] || 0) + 1;
      return acc;
    }, {});

    const domainEntries = Object.entries(domainCounter).sort((a, b) => {
      return b[1] - a[1];
    });

    const topDomain = domainEntries[0]?.[0] || "-";
    const topDomainCount = domainEntries[0]?.[1] || 0;

    const rankedAIs = [...ais]
      .sort((a, b) => parseUsers(b.users) - parseUsers(a.users))
      .slice(0, 5)
      .map((ai) => ({
        name: ai.name,
        domain: ai.domain,
        users: parseUsers(ai.users),
        rating: ai.rating,
      }));

    const highRatedCount = ais.filter((ai) => ai.rating >= 4.5).length;
    const lowerRatedCount = ais.filter((ai) => ai.rating < 4).length;

    const topAI = rankedAIs[0]?.name || "-";

    return {
      totalAIs,
      totalUsers,
      averageRating,
      topDomain,
      topDomainCount,
      topAI,
      domainEntries,
      rankedAIs,
      highRatedCount,
      lowerRatedCount,
    };
  }, [ais]);

  if (loading) {
    return (
      <div className="flex h-55 items-center justify-center rounded-4xl border border-white/10 bg-white/5 backdrop-blur-2xl">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
            <Users className="h-5 w-5" />
          </div>

          <h3 className="text-3xl font-bold text-white">
            {formatCompactNumber(analytics.totalUsers)}
          </h3>

          <p className="mt-2 text-slate-400">
            Utilisateurs cumulés
          </p>
        </div>

        <div className="rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
            <BarChart3 className="h-5 w-5" />
          </div>

          <h3 className="text-3xl font-bold text-white">
            {analytics.topDomain}
          </h3>

          <p className="mt-2 text-slate-400">
            Domaine leader ({analytics.topDomainCount} IA)
          </p>
        </div>

        <div className="rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-300">
            <Sparkles className="h-5 w-5" />
          </div>

          <h3 className="text-3xl font-bold text-white">
            {analytics.averageRating.toFixed(1)}
          </h3>

          <p className="mt-2 text-slate-400">
            Rating moyen ({analytics.totalAIs} IA)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl xl:col-span-3">
          <div className="mb-6 flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
              <BarChart3 className="h-5 w-5" />
            </div>

            <h4 className="text-xl font-semibold text-white">
              Distribution par domaine
            </h4>
          </div>

          <div className="space-y-4">
            {analytics.domainEntries.map(([domain, count]) => {
              const width = analytics.totalAIs
                ? Math.max(10, Math.round((count / analytics.totalAIs) * 100))
                : 0;

              return (
                <div key={domain}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-300">
                      {domain}
                    </span>

                    <span className="text-cyan-300">
                      {count} IA
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      style={{ width: `${width}%` }}
                      className="h-full rounded-full bg-linear-to-r from-cyan-500 to-emerald-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl xl:col-span-2">
          <div className="mb-6 flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-300">
              <Trophy className="h-5 w-5" />
            </div>

            <h4 className="text-xl font-semibold text-white">
              Top IA
            </h4>
          </div>

          <div className="space-y-3">
            {analytics.rankedAIs.map((ai, index) => (
              <div
                key={ai.name}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-white">
                      {index + 1}. {ai.name}
                    </p>

                    <p className="text-sm text-slate-400">
                      {ai.domain}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-cyan-300">
                      {formatCompactNumber(ai.users)}
                    </p>

                    <p className="text-sm text-yellow-400">
                      {ai.rating.toFixed(1)} / 5
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
          <Star className="h-5 w-5" />
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h4 className="text-xl font-semibold text-white">
              Qualité et couverture
            </h4>

            <p className="mt-2 text-slate-400">
              IA la plus consultée: {analytics.topAI}
            </p>
          </div>

          <div className="flex gap-3">
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
              Excellentes: {analytics.highRatedCount}
            </div>

            <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
              A améliorer: {analytics.lowerRatedCount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}