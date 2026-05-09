// components/home/stats-section.tsx

import {
    Bot,
    Users,
    Globe,
    Cpu,
  } from "lucide-react";
  
  const stats = [
    {
      title: "IA publiées",
  
      value: "120+",
  
      icon: Bot,
    },
  
    {
      title: "Développeurs",
  
      value: "45+",
  
      icon: Users,
    },
  
    {
      title: "Utilisateurs",
  
      value: "20K+",
  
      icon: Globe,
    },
  
    {
      title: "Requêtes API",
  
      value: "1.2M",
  
      icon: Cpu,
    },
  ];
  
  export default function StatsSection() {
    return (
      <section className="px-6 py-20">
  
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
  
          {stats.map((stat) => {
            const Icon = stat.icon;
  
            return (
              <div
                key={stat.title}
                className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
              >
  
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
  
                  <Icon className="h-7 w-7" />
  
                </div>
  
                <h3 className="text-5xl font-bold">
                  {stat.value}
                </h3>
  
                <p className="mt-3 text-slate-400">
                  {stat.title}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    );
  }