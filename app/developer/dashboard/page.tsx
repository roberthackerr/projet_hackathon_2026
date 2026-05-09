// app/developer/dashboard/page.tsx

import DeveloperHeader from "@/components/developer/developer-header";

import DeveloperStats from "@/components/developer/developer-stats";

import DeveloperAIList from "@/components/developer/developer-ai-list";

export default function DeveloperDashboardPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#081018] px-6 py-10 text-white">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#06b6d420,transparent_35%)]" />

      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Header */}
        <DeveloperHeader />

        {/* Stats */}
        <DeveloperStats />

        {/* AI List */}
        <DeveloperAIList />
      </div>
    </main>
  );
}