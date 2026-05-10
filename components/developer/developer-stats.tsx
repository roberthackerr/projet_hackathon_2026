// components/developer/developer-stats.tsx

"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Bot,
  Eye,
  Loader2,
  Star,
  Users,
} from "lucide-react";

/**
 * Stats Type
 */
interface Stats {
  publishedAIs: number;

  totalUsers: number;

  totalViews: number;

  averageRating: number;
}

export default function DeveloperStats() {
  /**
   * State
   */
  const [stats, setStats] =
    useState<Stats | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /**
   * Fetch stats
   */
  async function fetchStats() {
    try {
      setLoading(true);

      setError("");

      const response =
        await fetch(
          "/api/developer/stats"
        );

      const result =
        await response.json();

      /**
       * API Error
       */
      if (!result.success) {
        setError(
          result.message ||
            "Erreur chargement statistiques"
        );

        return;
      }

      /**
       * Success
       */
      setStats(
        result.data
      );
    } catch (error) {
      console.error(error);

      setError(
        "Erreur serveur"
      );
    } finally {
      setLoading(false);
    }
  }

  /**
   * Initial fetch
   */
  useEffect(() => {
    fetchStats();
  }, []);

  /**
   * Loading
   */
  if (loading) {
    return (
      <div className="flex h-[220px] items-center justify-center">

        <Loader2 className="h-10 w-10 animate-spin text-cyan-400" />

      </div>
    );
  }

  /**
   * Error
   */
  if (error) {
    return (
      <div className="mb-10 rounded-[32px] border border-red-500/20 bg-red-500/10 p-6 text-center text-red-400">

        {error}

      </div>
    );
  }

  /**
   * Stats array
   */
  const data = [
    {
      title:
        "IA publiées",

      value:
        stats?.publishedAIs ||
        0,

      icon: Bot,
    },

    {
      title:
        "Utilisateurs",

      value:
        stats?.totalUsers ||
        0,

      icon: Users,
    },

    {
      title:
        "Vues",

      value:
        stats?.totalViews ||
        0,

      icon: Eye,
    },

    {
      title:
        "Rating moyen",

      value:
        stats?.averageRating ||
        0,

      icon: Star,
    },
  ];

  return (
    <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

      {data.map((stat) => {
        const Icon =
          stat.icon;

        return (
          <div
            key={
              stat.title
            }
            className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/20"
          >

            {/* Glow */}
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">

              <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

            </div>

            {/* Icon */}
            <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">

              <Icon className="h-6 w-6" />

            </div>

            {/* Value */}
            <h3 className="relative z-10 text-4xl font-black text-white">

              {stat.value}

            </h3>

            {/* Label */}
            <p className="relative z-10 mt-2 text-slate-400">

              {stat.title}

            </p>

            {/* Border Glow */}
            <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-cyan-400/0 transition-all duration-500 group-hover:border-cyan-400/20" />
          </div>
        );
      })}
    </div>
  );
}