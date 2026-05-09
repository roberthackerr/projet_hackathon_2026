// components/developer/developer-ai-card.tsx

"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import {
  Pencil,
  Trash2,
  Star,
  Loader2,
} from "lucide-react";

import { useState } from "react";

interface Props {
  ai: {
    _id: string;

    name: string;

    domain: string;

    users: string;

    rating: number;
  };
}

export default function DeveloperAICard({
  ai,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  /**
   * Delete AI
   */
  async function handleDelete() {
    const confirmed = confirm(
      `Supprimer ${ai.name} ?`
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const response = await fetch(
        `/api/ais/${ai._id}`,
        {
          method: "DELETE",
        }
      );

      const result =
        await response.json();

      if (!result.success) {
        alert(
          "Erreur suppression"
        );

        return;
      }

      alert(
        "IA supprimée 🚀"
      );

      router.refresh();
    } catch (error) {
      console.error(error);

      alert("Erreur serveur");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="group rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl transition-all duration-300 hover:border-cyan-400/20">

      {/* Header */}
      <div className="mb-4 flex items-center justify-between">

        {/* Domain */}
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-300">
          {ai.domain}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 text-yellow-400">

          <Star className="h-4 w-4 fill-yellow-400" />

          {ai.rating}
        </div>
      </div>

      {/* Name */}
      <h3 className="text-2xl font-bold text-white">
        {ai.name}
      </h3>

      {/* Users */}
      <p className="mt-3 text-slate-400">
        {ai.users} utilisateurs
      </p>

      {/* Actions */}
      <div className="mt-6 flex gap-3">

        {/* Edit */}
        <Link
          href={`/developer/edit-ai/${ai._id}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
        >
          <Pencil className="h-4 w-4" />

          Modifier
        </Link>

        {/* Delete */}
        <button
          onClick={handleDelete}
          disabled={loading}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-400 transition hover:bg-red-500/20 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />

              Suppression...
            </>
          ) : (
            <>
              <Trash2 className="h-4 w-4" />

              Supprimer
            </>
          )}
        </button>
      </div>
    </div>
  );
}