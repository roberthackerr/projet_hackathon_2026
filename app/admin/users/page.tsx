// app/admin/users/page.tsx

import AdminLayout from "@/components/admin/admin-layout";

import AdminUserTable from "@/components/admin/admin-user-table";

export default function UsersPage() {
  return (
    <AdminLayout>

      <div className="space-y-8">

        {/* Header */}
        <section className="rounded-[40px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

          <div className="mb-4 inline-flex rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-sm text-violet-300">
            User Management
          </div>

          <h1 className="text-5xl font-bold text-white">
            Utilisateurs
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-slate-400">
            Gérez tous les utilisateurs de la plateforme MadaAI.
          </p>
        </section>

        {/* Table */}
        <AdminUserTable />

      </div>

    </AdminLayout>
  );
}