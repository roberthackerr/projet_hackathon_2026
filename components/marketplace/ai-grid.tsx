// components/marketplace/ai-grid.tsx

"use client";

import {
  useEffect,
  useState,
} from "react";

import { Loader2 } from "lucide-react";

import AICard from "./ai-card";

/**
 * AI Type
 */
interface AI {
  _id: string;

  name: string;

  description: string;

  domain: string;

  users: string;

  rating: number;

  gradient: string;
}

export default function AIGrid() {
  /**
   * States
   */
  const [ais, setAIs] = useState<
    AI[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /**
   * Fetch AIs
   */
  async function fetchAIs() {
    try {
      setLoading(true);

      setError("");

      const response = await fetch(
        "/api/ais"
      );

      const result =
        await response.json();

      /**
       * API error
       */
      if (!result.success) {
        setError(
          result.message ||
            "Erreur chargement IA"
        );

        setAIs([]);

        return;
      }

      /**
       * Safe fallback
       */
      setAIs(result.data || []);
    } catch (error) {
      console.error(error);

      setError("Erreur serveur");

      setAIs([]);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Initial fetch
   */
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
   * Error State
   */
  if (error) {
    return (
      <div className="rounded-[32px] border border-red-500/20 bg-red-500/10 p-8 text-center text-red-400">

        {error}

      </div>
    );
  }

  /**
   * Empty State
   */
  if (ais.length === 0) {
    return (
      <div className="rounded-[32px] border border-white/10 bg-white/5 p-10 text-center backdrop-blur-2xl">

        <h3 className="text-2xl font-bold text-white">
          Aucune IA trouvée
        </h3>

        <p className="mt-3 text-slate-400">
          Publiez votre première IA.
        </p>
      </div>
    );
  }

  /**
   * Success State
   */
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

      {ais.map((ai) => {
        /**
         * Prevent invalid AI
         */
        if (!ai?._id) return null;

        return (
          <AICard
            key={ai._id}
            ai={ai}
          />
        );
      })}
    </div>
  );
}