"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Bot,
  Users,
  Star,
  Activity,
} from "lucide-react";

const icons = [
  Bot,
  Users,
  Star,
  Activity,
];

export default function AdminStats() {
  const [stats, setStats] =
    useState<any>(null);

  async function fetchStats() {
    const response = await fetch(
      "/api/admin/stats"
    );

    const result =
      await response.json();

    setStats(result.data);
  }

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) return null;

  const cards = [
    {
      title: "Total IA",

      value: stats.totalAIs,
    },

    {
      title: "Users",

      value: stats.totalUsers,
    },

    {
      title: "Rating",

      value:
        stats.averageRating.toFixed(
          1
        ),
    },

    {
      title: "Requests",

      value: stats.requests,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card, index) => {
        const Icon = icons[index];

        return (
          <div
            key={card.title}
            className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl"
          >

            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">

              <Icon className="h-6 w-6" />

            </div>

            <h3 className="text-5xl font-bold text-white">
              {card.value}
            </h3>

            <p className="mt-3 text-slate-400">
              {card.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}