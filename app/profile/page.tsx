// app/profile/page.tsx

"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  Bot,
  Loader2,
  Mail,
  Shield,
  Sparkles,
  User,
  ArrowRight,
} from "lucide-react";

/**
 * Types
 */
interface AI {
  _id: string;

  name: string;

  description: string;

  domain: string;
}

interface ProfileData {
  user: {
    id: string;

    name: string;

    email: string;

    role: string;

    image?: string;
  };

  stats: {
    publishedAIs: number;
  };

  ais: AI[];
}

export default function ProfilePage() {
  /**
   * State
   */
  const [profile, setProfile] =
    useState<ProfileData | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /**
   * Fetch profile
   */
  async function fetchProfile() {
    try {
      setLoading(true);

      setError("");

      const response =
        await fetch(
          "/api/profile"
        );

      const result =
        await response.json();

      if (!result.success) {
        setError(
          result.message ||
            "Erreur profil"
        );

        return;
      }

      setProfile(
        result.data
      );
    } catch (error) {
      console.error(error);

      setError(
        "Erreur serveur"
      );
    } finally {
      setLoading(false);
    }
  }

  /**
   * Init
   */
  useEffect(() => {
    fetchProfile();
  }, []);

  /**
   * Loading
   */
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#081018]">

        <Loader2 className="h-12 w-12 animate-spin text-cyan-400" />

      </main>
    );
  }

  /**
   * Error
   */
  if (error || !profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#081018] px-6">

        <div className="rounded-[32px] border border-red-500/20 bg-red-500/10 p-8 text-center text-red-400">

          {error}

        </div>

      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#081018] px-6 py-10 text-white">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#06b6d420,transparent_35%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">

            <Sparkles className="h-4 w-4" />

            Mon Profil
          </div>

          <h1 className="text-5xl font-black">

            {profile.user.name}

          </h1>

          <p className="mt-4 text-lg text-slate-400">

            Gérez votre compte et vos IA.

          </p>
        </div>

        {/* Profile Card */}
        <section className="overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl">

          {/* Cover */}
          <div className="h-[220px] bg-gradient-to-r from-cyan-500/20 to-emerald-500/20" />

          {/* Content */}
          <div className="relative px-8 pb-8">

            {/* Avatar */}
            <div className="-mt-16 flex h-32 w-32 items-center justify-center rounded-[32px] border-4 border-[#081018] bg-gradient-to-r from-cyan-500 to-emerald-500">

              <User className="h-14 w-14" />

            </div>

            {/* User Info */}
            <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">

              {/* Left */}
              <div>

                <h2 className="text-4xl font-bold">

                  {profile.user.name}

                </h2>

                <div className="mt-6 flex flex-wrap gap-4">

                  {/* Email */}
                  <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3">

                    <Mail className="h-5 w-5 text-cyan-400" />

                    <span className="text-slate-300">

                      {profile.user.email}

                    </span>
                  </div>

                  {/* Role */}
                  <div className="inline-flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-3 text-emerald-300">

                    <Shield className="h-5 w-5" />

                    <span className="capitalize">

                      {profile.user.role}

                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-10 rounded-[32px] border border-white/10 bg-black/20 p-6">

                  <h3 className="text-2xl font-bold">

                    À propos

                  </h3>

                  <p className="mt-4 leading-relaxed text-slate-400">

                    Développeur IA sur MadaAI Hub.
                    Construisez et partagez vos intelligences artificielles.

                  </p>
                </div>
              </div>

              {/* Right */}
              <aside>

                <div className="rounded-[32px] border border-white/10 bg-black/20 p-6">

                  <h3 className="text-2xl font-bold">

                    Statistiques

                  </h3>

                  <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4">

                    <div className="flex items-center gap-3">

                      <Bot className="h-5 w-5 text-cyan-400" />

                      <span>
                        IA publiées
                      </span>
                    </div>

                    <span className="text-2xl font-bold">

                      {
                        profile.stats
                          .publishedAIs
                      }

                    </span>
                  </div>

                  <Link
                    href="/developer/dashboard"
                    className="mt-5 flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-4 font-semibold text-white transition hover:scale-[1.02]"
                  >

                    Dashboard

                    <ArrowRight className="h-5 w-5" />

                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* My AIs */}
        <section className="mt-12">

          <div className="mb-8 flex items-center justify-between">

            <h2 className="text-4xl font-bold">

              Mes IA

            </h2>

            <Link
              href="/developer/create-ai"
              className="rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-4 font-semibold text-white"
            >
              Publier une IA
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

            {profile.ais.map(
              (ai) => (
                <Link
                  key={ai._id}
                  href={`/marketplace/${ai._id}`}
                  className="group rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl transition hover:-translate-y-1"
                >

                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">

                    <Bot className="h-6 w-6" />

                  </div>

                  <h3 className="text-2xl font-bold">

                    {ai.name}

                  </h3>

                  <p className="mt-3 line-clamp-3 text-slate-400">

                    {ai.description}

                  </p>

                  <div className="mt-6 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">

                    {ai.domain}

                  </div>
                </Link>
              )
            )}
          </div>
        </section>
      </div>
    </main>
  );
}