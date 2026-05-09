// components/developer/developer-ai-card.tsx

import {
    Pencil,
    Trash2,
    Star,
  } from "lucide-react";
  
  interface Props {
    ai: {
      name: string;
  
      domain: string;
  
      users: string;
  
      rating: number;
    };
  }
  
  export default function DeveloperAICard({
    ai,
  }: Props) {
    return (
      <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
  
        <div className="mb-4 flex items-center justify-between">
  
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-300">
            {ai.domain}
          </div>
  
          <div className="flex items-center gap-2 text-yellow-400">
  
            <Star className="h-4 w-4 fill-yellow-400" />
  
            {ai.rating}
          </div>
        </div>
  
        <h3 className="text-2xl font-bold">
          {ai.name}
        </h3>
  
        <p className="mt-3 text-slate-400">
          {ai.users} utilisateurs
        </p>
  
        <div className="mt-6 flex gap-3">
  
          <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10">
  
            <Pencil className="h-4 w-4" />
  
            Modifier
          </button>
  
          <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-400 transition hover:bg-red-500/20">
  
            <Trash2 className="h-4 w-4" />
  
            Supprimer
          </button>
        </div>
      </div>
    );
  }