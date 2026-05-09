import Link from "next/link";

import { ArrowLeft, ChartLine } from "lucide-react";

import DeveloperAnalyticsGrid from "@/components/developer/developer-analytics-grid";

export default function DeveloperAnalyticsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#081018] px-6 py-10 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#06b6d420,transparent_35%)]" />

      <div className="absolute left-0 top-0 h-125 w-125 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-125 w-125 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 rounded-[40px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl lg:flex-row lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
              <ChartLine className="h-4 w-4" />
              Analytics
            </div>

            <h1 className="text-4xl font-bold lg:text-5xl">
              Developer Analytics
            </h1>

            <p className="mt-4 text-slate-400">
              Analyse détaillée de vos IA et de leur adoption.
            </p>
          </div>

          <Link
            href="/developer/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white transition-all duration-300 hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
            Retour dashboard
          </Link>
        </div>

        <DeveloperAnalyticsGrid />
      </div>
    </main>
  );
}