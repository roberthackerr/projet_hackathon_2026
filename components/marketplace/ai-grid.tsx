"use client";

import AICard from "./ai-card";

import { useAIs } from "@/hooks/use-ais";

export default function AIGrid() {
  const { ais, loading } = useAIs();

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

        {Array.from({ length: 6 }).map(
          (_, index) => (
            <div
              key={index}
              className="h-[300px] animate-pulse rounded-[32px] border border-white/10 bg-white/5"
            />
          )
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {ais.map((ai) => (
        <AICard
          key={ai._id}
          ai={ai}
        />
      ))}
    </div>
  );
}