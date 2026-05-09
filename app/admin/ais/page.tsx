// app/admin/ais/page.tsx

import AdminLayout from "@/components/admin/admin-layout";

import AdminAITable from "@/components/admin/admin-ai-table";

export default function AIsPage() {
  return (
    <AdminLayout>

      <div className="space-y-8">

        {/* Header */}
        <section className="rounded-[40px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

          <div className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
            AI Marketplace
          </div>

          <h1 className="text-5xl font-bold text-white">
            Gestion des IA
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-slate-400">
            Visualisez et modérez toutes les IA publiées.
          </p>
        </section>

        {/* AI Table */}
        <AdminAITable />

      </div>

    </AdminLayout>
  );
}