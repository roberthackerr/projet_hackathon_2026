"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { LogOut, Menu, UserRound, X } from "lucide-react";
import { useState } from "react";

import { logout } from "@/lib/auth";

const ROLE_LABELS: Record<
  "user" | "developer" | "admin",
  string
> = {
  user: "Utilisateur",
  developer: "Développeur",
  admin: "Administrateur",
};

type SessionRole = "user" | "developer" | "admin" | undefined;

function NavLinks({
  role,
  onNavigate,
  className,
}: {
  role: SessionRole;
  onNavigate?: () => void;
  className?: string;
}) {
  const showDeveloper = role === "developer" || role === "admin";
  const showAdmin = role === "admin";

  return (
    <nav className={className}>
      <Link
        href="/"
        onClick={onNavigate}
        className="rounded-lg px-3 py-2 text-slate-300 transition hover:bg-white/5 hover:text-white"
      >
        Accueil
      </Link>
      <Link
        href="/marketplace"
        onClick={onNavigate}
        className="rounded-lg px-3 py-2 text-slate-300 transition hover:bg-white/5 hover:text-white"
      >
        Marketplace
      </Link>
      {showDeveloper && (
        <Link
          href="/developer/dashboard"
          onClick={onNavigate}
          className="rounded-lg px-3 py-2 text-slate-300 transition hover:bg-white/5 hover:text-emerald-300"
        >
          Espace développeur
        </Link>
      )}
      {showAdmin && (
        <Link
          href="/admin"
          onClick={onNavigate}
          className="rounded-lg px-3 py-2 text-slate-300 transition hover:bg-white/5 hover:text-cyan-300"
        >
          Administration
        </Link>
      )}
    </nav>
  );
}

function AuthActionsDesktop({
  status,
  role,
  userName,
  userEmail,
}: {
  status: "loading" | "authenticated" | "unauthenticated";
  role: SessionRole;
  userName?: string | null;
  userEmail?: string | null;
}) {
  if (status === "loading") {
    return (
      <div className="hidden h-10 w-40 animate-pulse rounded-xl bg-white/5 lg:block" />
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="hidden items-center gap-3 lg:flex">
        <Link
          href="/login"
          className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          Connexion
        </Link>
        <Link
          href="/register"
          className="rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium text-white transition hover:border-cyan-400/40 hover:bg-white/5"
        >
          Inscription
        </Link>
        <Link
          href="/marketplace"
          className="rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
        >
          Explorer
        </Link>
      </div>
    );
  }

  const display = userName?.trim() || userEmail || "Compte";
  const roleKey = role ?? "user";
  const roleLabel =
    ROLE_LABELS[roleKey as keyof typeof ROLE_LABELS] ?? "Utilisateur";

  const exploreHref =
    role === "admin"
      ? "/admin"
      : role === "developer"
        ? "/developer/dashboard"
        : "/marketplace";

  return (
    <div className="hidden items-center gap-4 lg:flex">
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">
        <UserRound className="size-5 shrink-0 text-cyan-400/90" aria-hidden />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">{display}</p>
          <p className="text-xs text-slate-500">{roleLabel}</p>
        </div>
      </div>
      <Link
        href={exploreHref}
        className="rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
      >
        Mon espace
      </Link>
      <button
        type="button"
        onClick={() => void logout()}
        className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-200"
      >
        <LogOut className="size-4" aria-hidden />
        Déconnexion
      </button>
    </div>
  );
}

export default function Navbar() {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const role = session?.user?.role;

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#081018]/85 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
        <Link
          href="/"
          className="shrink-0 text-xl font-bold sm:text-2xl"
          onClick={closeMobile}
        >
          <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            MadaAI
          </span>{" "}
          Hub
        </Link>

        <NavLinks
          role={role}
          className="hidden items-center gap-1 lg:flex"
        />

        <AuthActionsDesktop
          status={status}
          role={role}
          userName={session?.user?.name}
          userEmail={session?.user?.email}
        />

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            className="rounded-xl border border-white/15 p-2.5 text-white hover:bg-white/5"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#081018]/95 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            <NavLinks
              role={role}
              onNavigate={closeMobile}
              className="flex flex-col gap-1"
            />

            <div className="my-3 border-t border-white/10" />

            {status === "loading" ? (
              <div className="h-12 animate-pulse rounded-xl bg-white/5" />
            ) : status === "unauthenticated" ? (
              <>
                <Link
                  href="/login"
                  onClick={closeMobile}
                  className="rounded-xl px-3 py-3 text-slate-300 hover:bg-white/5 hover:text-white"
                >
                  Connexion
                </Link>
                <Link
                  href="/register"
                  onClick={closeMobile}
                  className="rounded-xl px-3 py-3 text-slate-300 hover:bg-white/5 hover:text-white"
                >
                  Inscription
                </Link>
                <Link
                  href="/marketplace"
                  onClick={closeMobile}
                  className="mt-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 py-3 text-center font-semibold text-white"
                >
                  Explorer le marketplace
                </Link>
              </>
            ) : (
              <>
                <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                  <p className="font-medium text-white">
                    {session?.user?.name?.trim() ||
                      session?.user?.email ||
                      "Compte"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {ROLE_LABELS[
                      (role ?? "user") as keyof typeof ROLE_LABELS
                    ] ?? "Utilisateur"}
                  </p>
                </div>
                <Link
                  href={
                    role === "admin"
                      ? "/admin"
                      : role === "developer"
                        ? "/developer/dashboard"
                        : "/marketplace"
                  }
                  onClick={closeMobile}
                  className="rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 py-3 text-center font-semibold text-white"
                >
                  Mon espace
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    closeMobile();
                    void logout();
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/15 py-3 text-slate-300 hover:bg-red-500/10 hover:text-red-200"
                >
                  <LogOut className="size-4" />
                  Déconnexion
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
