// components/admin/admin-layout.tsx

import AdminSidebar from "./admin-sidebar";

import AdminHeader from "./admin-header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#081018]">

      <AdminSidebar />

      <main className="flex-1 overflow-hidden p-8">

        <AdminHeader />

        {children}

      </main>
    </div>
  );
}