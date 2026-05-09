"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Bot,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";

const links = [
  {
    label: "Dashboard",

    href: "/admin",

    icon: LayoutDashboard,
  },

  {
    label: "AIs",

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

  {
    label: "Settings",

    href: "/admin/settings",

    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[280px] border-r border-white/10 bg-[#0B1120] p-6 lg:block">

      <div className="mb-10">

        <h1 className="text-3xl font-bold text-white">
          MadaAI
        </h1>

        <p className="mt-2 text-slate-400">
          Admin Console
        </p>
      </div>

      <nav className="space-y-3">

        {links.map((link) => {
          const Icon = link.icon;

          const active =
            pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-4 transition ${
                active
                  ? "bg-cyan-500 text-white"
                  : "bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
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