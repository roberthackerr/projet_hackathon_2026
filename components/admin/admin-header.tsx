// components/admin/admin-header.tsx

export default function AdminHeader() {
  return (
    <div className="mb-8 flex items-center justify-between rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">

      <div>

        <h2 className="text-3xl font-bold text-white">
          Admin Dashboard
        </h2>

        <p className="mt-2 text-slate-400">
          Manage MadaAI ecosystem
        </p>
      </div>

      <div className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">

        System Online

      </div>
    </div>
  );
}