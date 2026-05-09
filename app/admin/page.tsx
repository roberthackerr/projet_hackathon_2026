// app/admin/page.tsx

import AdminLayout from "@/components/admin/admin-layout";

import AdminStats from "@/components/admin/admin-stats";

import AdminChart from "@/components/admin/admin-chart";

import AdminAITable from "@/components/admin/admin-ai-table";

export default function AdminPage() {
  return (
    <AdminLayout>

      <div className="space-y-8">

        {/* Hero */}
        <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 p-10 backdrop-blur-2xl">

          <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative z-10">

            <div className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
              MadaAI Admin Console
            </div>

            <h1 className="text-5xl font-bold text-white">
              Platform Dashboard
            </h1>

            <p className="mt-5 max-w-2xl text-lg text-slate-400">
              Gérez l’écosystème d’intelligence
              artificielle malgache en temps réel.
            </p>
          </div>
        </section>

        {/* Stats */}
        <AdminStats />

        {/* Analytics */}
        <AdminChart />

        {/* Latest AI */}
        <section>

          <div className="mb-6">

            <h2 className="text-3xl font-bold text-white">
              Dernières IA publiées
            </h2>

            <p className="mt-2 text-slate-400">
              Vue globale des intelligences artificielles.
            </p>
          </div>

          <AdminAITable />

        </section>
      </div>

    </AdminLayout>
  );
}