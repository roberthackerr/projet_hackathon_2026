// components/developer/developer-ai-list.tsx

"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Loader2,
  Bot,
} from "lucide-react";

import DeveloperAICard from "./developer-ai-card";

interface AI {
  _id: string;

  name: string;

  domain: string;

  users: string;

  rating: number;
}

export default function DeveloperAIList() {
  const [ais, setAIs] = useState<AI[]>(
    []
  );

  const [loading, setLoading] =
    useState(true);

  /**
   * Fetch developer AIs
   */
  async function fetchAIs() {
    try {
      const response = await fetch(
        "/api/ais"
      );

      const result =
        await response.json();

      if (result.success) {
        setAIs(result.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAIs();
  }, []);

  /**
   * Loading State
   */
  if (loading) {
    return (
      <div className="flex h-[300px] items-center justify-center">

        <Loader2 className="h-10 w-10 animate-spin text-cyan-400" />

      </div>
    );
  }

  /**
   * Empty State
   */
  if (ais.length === 0) {
    return (
      <div className="rounded-[32px] border border-white/10 bg-white/5 p-10 text-center backdrop-blur-2xl">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-400">

          <Bot className="h-10 w-10" />

        </div>

        <h3 className="mt-6 text-3xl font-bold">
          Aucune IA publiée
        </h3>

        <p className="mt-4 text-slate-400">
          Commencez par publier votre
          première intelligence artificielle.
        </p>
      </div>
    );
  }

  return (
    <div>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-3xl font-bold">
          Mes IA
        </h2>

        <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">

          {ais.length} IA

        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

        {ais.map((ai) => (
          <DeveloperAICard
            key={ai._id}
            ai={ai}
          />
        ))}
      </div>
    </div>
  );
}