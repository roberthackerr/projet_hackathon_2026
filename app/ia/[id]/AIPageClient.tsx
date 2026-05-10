"use client";

import Link from "next/link";
import { Bot, ExternalLink, Sparkles } from "lucide-react";

export default function AIPageClient({
  id,
  aiName,
}: {
  id: string;
  aiName: string;
}) {
  return (
    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
      <Link
        href={`/learn-ai?aiId=${id}&aiName=${encodeURIComponent(aiName)}`}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white transition hover:shadow-lg hover:shadow-cyan-500/25"
      >
        <Bot className="h-5 w-5" />
        Lancer le chat avec {aiName}
        <ExternalLink className="h-4 w-4" />
      </Link>

      <button
        onClick={() => {
          navigator.clipboard.writeText(id);
          alert("ID copié !");
        }}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-slate-300 transition hover:bg-white/10"
      >
        <Sparkles className="h-5 w-5" />
        Tester l'API
      </button>
    </div>
  );
}