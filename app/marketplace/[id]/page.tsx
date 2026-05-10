// app/marketplace/[id]/page.tsx

import { notFound } from "next/navigation";

import Link from "next/link";

import {
  ArrowLeft,
  Sparkles,
  Star,
  Users,
  Bot,
  Globe,
  ExternalLink,
  Play,
} from "lucide-react";

import { ObjectId } from "mongodb";

import { getDatabase } from "@/lib/mongodb";

import AIDetailInteractions from "@/components/marketplace/ai-detail-interactions";

export default async function AIPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  /**
   * Validate ID
   */
  if (!ObjectId.isValid(id)) {
    notFound();
  }

  /**
   * Database
   */
  const db = await getDatabase();

  /**
   * Find AI
   */
  const ai = await db.collection("ais").findOne({
    _id: new ObjectId(id),
  });

  if (!ai) {
    notFound();
  }

  /**
   * Ratings
   */
  const ratingSummary = await db
    .collection("ai_ratings")
    .aggregate([
      {
        $match: {
          aiId: id,
        },
      },

      {
        $group: {
          _id: "$aiId",

          average: {
            $avg: "$rating",
          },

          count: {
            $sum: 1,
          },
        },
      },
    ])
    .toArray();

  /**
   * Comments
   */
  const comments = await db
    .collection("ai_comments")
    .find({
      aiId: id,
    })
    .sort({
      createdAt: -1,
    })
    .limit(30)
    .toArray();

  /**
   * Rating values
   */
  const firstRating =
    ratingSummary[0];

  const initialAverageRating =
    firstRating
      ? Number(
          firstRating.average.toFixed(
            1
          )
        )
      : 0;

  const initialRatingCount =
    firstRating
      ? firstRating.count
      : 0;

  /**
   * Safe values
   */
  const rating =
    typeof ai.rating ===
    "number"
      ? ai.rating
      : 0;

  const users =
    typeof ai.users ===
    "string"
      ? ai.users
      : "0";

  const image =
    typeof ai.image ===
    "string"
      ? ai.image
      : "";

  const aiLink =
    typeof ai.link ===
    "string"
      ? ai.link
      : "";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#081018] px-6 py-10 text-white">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#06b6d420,transparent_35%)]" />

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Back */}
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/60"
        >
          <ArrowLeft className="h-4 w-4" />

          Retour au marketplace
        </Link>

        {/* Main Card */}
        <section className="mt-8 overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl">

          {/* Cover */}
          <div className="relative h-[320px] overflow-hidden border-b border-white/10">

            {image ? (
              <img
                src={image}
                alt={String(ai.name)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-r from-cyan-500/20 to-emerald-500/20">

                <Bot className="h-24 w-24 text-cyan-400" />

              </div>
            )}

            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute bottom-8 left-8">

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">

                <Sparkles className="h-4 w-4" />

                {String(
                  ai.domain ||
                    "General"
                )}

              </div>

              <h1 className="text-5xl font-black tracking-tight">

                {String(ai.name)}

              </h1>

              <p className="mt-4 max-w-2xl text-lg text-slate-200">

                {String(
                  ai.description
                )}

              </p>
            </div>
          </div>

          {/* Content */}
          <div className="grid gap-10 p-8 lg:grid-cols-[1fr_340px]">

            {/* Left */}
            <div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4">

                <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3">

                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

                  <span>
                    {rating.toFixed(1)}
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3">

                  <Users className="h-5 w-5 text-slate-300" />

                  <span>
                    {users}
                    {" "}utilisateurs
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3">

                  <Bot className="h-5 w-5 text-cyan-400" />

                  <span>
                    {String(
                      ai.type ||
                        "assistant"
                    )}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-10">

                <h2 className="text-3xl font-bold">
                  À propos
                </h2>

                <p className="mt-5 leading-relaxed text-slate-300">

                  {String(
                    ai.description
                  )}

                </p>
              </div>

              {/* Interactions */}
              <div className="mt-12">

                <AIDetailInteractions
                  aiId={id}
                  initialRating={
                    initialAverageRating
                  }
                  initialRatingCount={
                    initialRatingCount
                  }
                  initialComments={comments.map(
                    (
                      comment
                    ) => ({
                      _id: String(
                        comment._id
                      ),

                      author:
                        typeof comment.author ===
                        "string"
                          ? comment.author
                          : "Anonyme",

                      message:
                        typeof comment.message ===
                        "string"
                          ? comment.message
                          : "",

                      createdAt:
                        comment.createdAt
                          ? new Date(
                              comment.createdAt
                            ).toISOString()
                          : new Date().toISOString(),
                    })
                  )}
                />
              </div>
            </div>

            {/* Sidebar */}
            <aside>

              <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">

                <h3 className="text-2xl font-bold">
                  Tester cette IA
                </h3>

                <p className="mt-4 text-slate-400">

                  Lancez une conversation
                  avec cette intelligence artificielle.

                </p>

                {/* Playground */}
                <Link
                  href={`/ia/${id}`}
                  className="mt-8 flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-5 font-semibold text-white transition hover:scale-[1.02]"
                >

                  <Play className="h-5 w-5" />

                  Tester l'IA
                </Link>

                {/* External Link */}
                {aiLink && (
                  <Link
                    href={aiLink}
                    target="_blank"
                    className="mt-4 flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 font-semibold text-white transition hover:bg-white/10"
                  >

                    <Globe className="h-5 w-5" />

                    Voir l'IA
                  </Link>
                )}

                {/* Creator */}
                <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">

                  <p className="text-sm text-slate-400">
                    Créé par
                  </p>

                  <p className="mt-2 text-lg font-semibold">

                    {String(
                      ai.createdBy ||
                        "Unknown"
                    )}

                  </p>
                </div>

                {/* Status */}
                <div className="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">

                  <ExternalLink className="h-4 w-4" />

                  IA publiée et active

                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}