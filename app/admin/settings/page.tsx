// app/admin/settings/page.tsx

import AdminLayout from "@/components/admin/admin-layout";

export default function SettingsPage() {
  return (
    <AdminLayout>

      <div className="space-y-8">

        {/* Header */}
        <section className="rounded-[40px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

          <div className="mb-4 inline-flex rounded-full border border-orange-400/20 bg-orange-400/10 px-4 py-2 text-sm text-orange-300">
            Platform Settings
          </div>

          <h1 className="text-5xl font-bold text-white">
            Paramètres
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-slate-400">
            Configurez la plateforme MadaAI Hub.
          </p>
        </section>

        {/* Settings Cards */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          {/* General */}
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

            <h2 className="text-2xl font-bold text-white">
              Général
            </h2>

            <p className="mt-3 text-slate-400">
              Paramètres globaux de la plateforme.
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">

                <span className="text-white">
                  Maintenance Mode
                </span>

                <div className="h-6 w-12 rounded-full bg-slate-700 p-1">

                  <div className="h-4 w-4 rounded-full bg-white" />

                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">

                <span className="text-white">
                  Public Registrations
                </span>

                <div className="h-6 w-12 rounded-full bg-cyan-500 p-1">

                  <div className="ml-auto h-4 w-4 rounded-full bg-white" />

                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

            <h2 className="text-2xl font-bold text-white">
              Sécurité
            </h2>

            <p className="mt-3 text-slate-400">
              Paramètres de sécurité plateforme.
            </p>

            <div className="mt-8 space-y-4">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                <p className="text-sm text-slate-400">
                  JWT Secret
                </p>

                <p className="mt-2 font-mono text-cyan-300">
                  ••••••••••••••••••
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                <p className="text-sm text-slate-400">
                  Database Status
                </p>

                <p className="mt-2 text-emerald-400">
                  Connected
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </AdminLayout>
  );
}