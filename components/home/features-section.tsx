// components/home/features-section.tsx

import {
    Bot,
    Brain,
    Code2,
    Sparkles,
  } from "lucide-react";
  
  const features = [
    {
      title: "Marketplace IA",
  
      description:
        "Explorez les intelligences artificielles créées par les développeurs malgaches.",
  
      icon: Bot,
    },
  
    {
      title: "Developer Studio",
  
      description:
        "Publiez, gérez et développez vos propres IA.",
  
      icon: Code2,
    },
  
    {
      title: "AI Playground",
  
      description:
        "Testez des modèles intelligents en temps réel.",
  
      icon: Brain,
    },
  
    {
      title: "Innovation Locale",
  
      description:
        "Créer des solutions adaptées à Madagascar.",
  
      icon: Sparkles,
    },
  ];
  
  export default function FeaturesSection() {
    return (
      <section className="px-6 py-24">
  
        <div className="mx-auto max-w-7xl">
  
          <div className="mb-16 text-center">
  
            <h2 className="text-5xl font-bold">
              Une plateforme IA
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                {" "}
                nouvelle génération
              </span>
            </h2>
  
            <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
              MadaAI Hub centralise les innovations IA
              développées à Madagascar.
            </p>
          </div>
  
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
  
            {features.map((feature) => {
              const Icon = feature.icon;
  
              return (
                <div
                  key={feature.title}
                  className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
                >
  
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-400">
  
                    <Icon className="h-8 w-8" />
  
                  </div>
  
                  <h3 className="text-3xl font-bold">
                    {feature.title}
                  </h3>
  
                  <p className="mt-5 leading-relaxed text-slate-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }