// components/admin/admin-sidebar.tsx

"use client";

import Link from "next/link";

import {
  Bot,
  LayoutDashboard,
  Users,
  BarChart3,
  Shield,
} from "lucide-react";

const links = [
  {
    label: "Dashboard",

    href: "/admin",

    icon: LayoutDashboard,
  },

  {
    label: "IA Management",

    href: "/admin/ais",

    icon: Bot,
  },

  {
    label: "Users",

    href: "/admin/users",

    icon: Users,
  },

  {
    label: "Analytics",

    href: "/admin/analytics",

    icon: BarChart3,
  },
];

export default function AdminSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[280px] border-r border-white/10 bg-white/5 p-6 backdrop-blur-2xl lg:block">

      {/* Logo */}
      <div className="mb-10 flex items-center gap-3">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500">

          <Shield className="h-6 w-6 text-white" />

        </div>

        <div>

          <h2 className="text-xl font-bold">
            MadaAI Admin
          </h2>

          <p className="text-sm text-slate-400">
            Control Center
          </p>
        </div>
      </div>

      {/* Links */}
      <nav className="space-y-3">

        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 px-5 py-4 text-slate-300 transition-all duration-300 hover:border-cyan-400/20 hover:bg-cyan-400/10 hover:text-cyan-300"
            >
              <Icon className="h-5 w-5" />

              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}