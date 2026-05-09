// components/developer/developer-stats.tsx

import {
    Bot,
    Eye,
    Star,
    Users,
  } from "lucide-react";
  
  const stats = [
    {
      title: "IA publiées",
  
      value: "6",
  
      icon: Bot,
    },
  
    {
      title: "Utilisateurs",
  
      value: "58K",
  
      icon: Users,
    },
  
    {
      title: "Vues",
  
      value: "120K",
  
      icon: Eye,
    },
  
    {
      title: "Rating moyen",
  
      value: "4.9",
  
      icon: Star,
    },
  ];
  
  export default function DeveloperStats() {
    return (
      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
  
        {stats.map((stat) => {
          const Icon = stat.icon;
  
          return (
            <div
              key={stat.title}
              className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl"
            >
  
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
  
                <Icon className="h-6 w-6" />
              </div>
  
              <h3 className="text-4xl font-bold">
                {stat.value}
              </h3>
  
              <p className="mt-2 text-slate-400">
                {stat.title}
              </p>
            </div>
          );
        })}
      </div>
    );
  }