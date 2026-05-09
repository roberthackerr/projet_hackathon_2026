// app/admin/analytics/page.tsx

import AdminLayout from "@/components/admin/admin-layout";

import AdminStats from "@/components/admin/admin-stats";

import AdminChart from "@/components/admin/admin-chart";

import AdminAITable from "@/components/admin/admin-ai-table";

export default function AnalyticsPage() {
  return (
    <AdminLayout>

      <div className="space-y-8">

        {/* Header */}
        <section className="rounded-[40px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

          <div className="mb-4 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
            Analytics System
          </div>

          <h1 className="text-5xl font-bold text-white">
            Analytics
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-slate-400">
            Analyse complète des performances de la plateforme.
          </p>
        </section>

        {/* Stats */}
        <AdminStats />

        {/* Charts */}
        <AdminChart />

        {/* Top AI */}
        <section>

          <div className="mb-6">

            <h2 className="text-3xl font-bold text-white">
              IA les plus performantes
            </h2>

            <p className="mt-2 text-slate-400">
              Classement des IA les plus populaires.
            </p>
          </div>

          <AdminAITable />

        </section>
      </div>

    </AdminLayout>
  );
}