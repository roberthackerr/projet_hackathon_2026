"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Bot,
  Users,
  Globe,
  Cpu,
  TrendingUp,
  Award,
  Rocket,
  Zap,
} from "lucide-react";

interface StatsData {
  totalAI: number;
  totalDevelopers: number;
  totalUsers: string;
  totalRequests: string;
}

const statsConfig = [
  {
    id: "totalAI",
    title: "IA publiées",
    icon: Bot,
    gradient: "from-cyan-500 to-blue-500",
    bgGradient: "from-cyan-500/10 to-blue-500/10",
    suffix: "",
    valuePrefix: "",
  },
  {
    id: "totalDevelopers",
    title: "Développeurs",
    icon: Users,
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/10 to-teal-500/10",
    suffix: "",
    valuePrefix: "",
  },
  {
    id: "totalUsers",
    title: "Utilisateurs actifs",
    icon: Globe,
    gradient: "from-violet-500 to-purple-500",
    bgGradient: "from-violet-500/10 to-purple-500/10",
    suffix: "+",
    valuePrefix: "",
  },
  {
    id: "totalRequests",
    title: "Requêtes API",
    icon: Cpu,
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-500/10 to-red-500/10",
    suffix: "",
    valuePrefix: "",
  },
];

// Composant pour le compteur animé
function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: number | string; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const numValue = typeof value === "string" ? parseInt(value) || 0 : value;
      let start = 0;
      const duration = 2000;
      const increment = numValue / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= numValue) {
          setCount(numValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {typeof value === "number" ? count.toLocaleString() : count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const [statsData, setStatsData] = useState<StatsData>({
    totalAI: 0,
    totalDevelopers: 0,
    totalUsers: "0",
    totalRequests: "0",
  });
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Fetch real data from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats");
        const data = await response.json();
        
        if (data.success) {
          setStatsData({
            totalAI: data.stats.totalAI || 0,
            totalDevelopers: data.stats.totalDevelopers || 0,
            totalUsers: data.stats.totalUsers || "0",
            totalRequests: data.stats.totalRequests || "0",
          });
        } else {
          // Fallback data
          setStatsData({
            totalAI: 120,
            totalDevelopers: 45,
            totalUsers: "20K+",
            totalRequests: "1.2M",
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Fallback data
        setStatsData({
          totalAI: 120,
          totalDevelopers: 45,
          totalUsers: "20K+",
          totalRequests: "1.2M",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Variants pour les animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section ref={sectionRef} className="relative px-6 py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
      
      {/* Animated background circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cyan-500/5 blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-3xl animate-pulse delay-1000" />
      
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300 mb-6">
            <TrendingUp className="h-4 w-4" />
            Chiffres clés
          </div>
          
          <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
            MadaAI Hub en{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              quelques chiffres
            </span>
          </h2>
          
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
            Découvrez l'impact de notre plateforme sur l'écosystème IA à Madagascar
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {statsConfig.map((stat) => {
            const Icon = stat.icon;
            let value: any = statsData[stat.id as keyof StatsData];
            
            // Handle "+" suffix for users
            if (stat.id === "totalUsers" && typeof value === "string" && value.includes("+")) {
              value = value.replace("+", "");
            }
            
            return (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl transition-all duration-300 hover:border-cyan-400/30 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative p-8">
                  {/* Icon with animation */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </motion.div>

                  {/* Value */}
                  <h3 className="text-5xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    {isLoading ? (
                      <div className="h-14 w-28 bg-white/10 rounded-lg animate-pulse" />
                    ) : (
                      <>
                        {typeof value === "number" ? (
                          <AnimatedCounter 
                            value={value} 
                            suffix={stat.suffix}
                            prefix={stat.valuePrefix}
                          />
                        ) : (
                          <AnimatedCounter 
                            value={parseInt(value) || 0} 
                            suffix={stat.suffix}
                            prefix={stat.valuePrefix}
                          />
                        )}
                      </>
                    )}
                  </h3>

                  {/* Title */}
                  <p className="mt-3 text-slate-400 font-medium">
                    {stat.title}
                  </p>

                  {/* Decorative line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/5 to-emerald-500/5 p-6 text-center backdrop-blur-sm"
        >
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <div className="flex items-center gap-3">
              <Rocket className="h-8 w-8 text-cyan-400" />
              <div className="text-left">
                <p className="font-semibold text-white">En pleine croissance</p>
                <p className="text-sm text-slate-400">
                  +35% d'utilisateurs ce mois-ci
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-emerald-400" />
              <div className="text-left">
                <p className="font-semibold text-white">Top 1 Madagascar</p>
                <p className="text-sm text-slate-400">
                  Plateforme IA leader
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-amber-400" />
              <div className="text-left">
                <p className="font-semibold text-white">99.9% Uptime</p>
                <p className="text-sm text-slate-400">
                  Disponibilité garantie
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}