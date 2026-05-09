import { notFound } from "next/navigation";
import { ArrowLeft, Sparkles, Star, Users } from "lucide-react";
import Link from "next/link";

import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import AIDetailInteractions from "@/components/marketplace/ai-detail-interactions";

export default async function AIPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    notFound();
  }

  const db = await getDatabase();
  const ai = await db.collection("ais").findOne({
    _id: new ObjectId(id),
  });

  if (!ai) {
    notFound();
  }

  const ratingSummary = await db
    .collection("ai_ratings")
    .aggregate([
      { $match: { aiId: id } },
      {
        $group: {
          _id: "$aiId",
          average: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
    ])
    .toArray();

  const comments = await db
    .collection("ai_comments")
    .find({ aiId: id })
    .sort({ createdAt: -1 })
    .limit(30)
    .toArray();

  const firstRating = ratingSummary[0];
  const initialAverageRating = firstRating
    ? Number(firstRating.average.toFixed(1))
    : 0;
  const initialRatingCount = firstRating ? firstRating.count : 0;

  const rating = typeof ai.rating === "number" ? ai.rating : 0;
  const users = typeof ai.users === "string" ? ai.users : "0";

  return (
    <main className="min-h-screen bg-[#081018] px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/60"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au marketplace
        </Link>

        <section className="mt-8 overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
            <Sparkles className="h-4 w-4" />
            {String(ai.domain || "General")}
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white">
            {String(ai.name || "IA")}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
            {String(ai.description || "Description indisponible")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{rating.toFixed(1)} / 5</span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2">
              <Users className="h-4 w-4 text-slate-300" />
              <span>{users} utilisateurs</span>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-emerald-300/30 bg-emerald-400/10 px-5 py-4 text-emerald-100">
            Cette IA est prête à être intégrée au playground dans la prochaine itération.
          </div>

          <AIDetailInteractions
            aiId={id}
            initialRating={initialAverageRating}
            initialRatingCount={initialRatingCount}
            initialComments={comments.map((comment) => ({
              _id: String(comment._id),
              author:
                typeof comment.author === "string"
                  ? comment.author
                  : "Anonyme",
              message:
                typeof comment.message === "string"
                  ? comment.message
                  : "",
              createdAt: comment.createdAt
                ? new Date(comment.createdAt).toISOString()
                : new Date().toISOString(),
            }))}
          />
        </section>
      </div>
    </main>
  );
}