"use client";

import { FormEvent, useMemo, useState } from "react";
import { Star } from "lucide-react";

type CommentItem = {
  _id: string;
  author: string;
  message: string;
  createdAt: string;
};

export default function AIDetailInteractions({
  aiId,
  initialRating,
  initialRatingCount,
  initialComments,
}: {
  aiId: string;
  initialRating: number;
  initialRatingCount: number;
  initialComments: CommentItem[];
}) {
  const [rating, setRating] = useState(initialRating);
  const [ratingCount, setRatingCount] = useState(initialRatingCount);
  const [loadingRating, setLoadingRating] = useState(false);

  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formattedRating = useMemo(() => rating.toFixed(1), [rating]);

  async function loadRating() {
    try {
      setLoadingRating(true);
      const response = await fetch(`/api/ais/${aiId}/rating`, {
        cache: "no-store",
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Erreur note");
      }

      setRating(result.data.average ?? 0);
      setRatingCount(result.data.count ?? 0);
    } catch (requestError) {
      console.error(requestError);
    } finally {
      setLoadingRating(false);
    }
  }

  async function loadComments() {
    try {
      const response = await fetch(`/api/ais/${aiId}/comments?limit=30`, {
        cache: "no-store",
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Erreur commentaires");
      }

      setComments(Array.isArray(result.data) ? result.data : []);
    } catch (requestError) {
      console.error(requestError);
    }
  }

  async function submitRating(value: number) {
    try {
      setError(null);
      const response = await fetch(`/api/ais/${aiId}/rating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating: value }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Impossible d'enregistrer la note");
      }

      await loadRating();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Erreur de notation"
      );
    }
  }

  async function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setError(null);
      setIsSubmittingComment(true);

      const response = await fetch(`/api/ais/${aiId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ author, message }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Impossible d'ajouter le commentaire");
      }

      setMessage("");
      await loadComments();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Erreur de commentaire"
      );
    } finally {
      setIsSubmittingComment(false);
    }
  }

  return (
    <section className="mt-10 grid gap-6 lg:grid-cols-5">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 lg:col-span-2">
        <h2 className="text-xl font-semibold text-white">Noter cette IA</h2>

        <p className="mt-2 text-sm text-slate-300">
          Note moyenne: {loadingRating ? "..." : `${formattedRating} / 5`} ({ratingCount} vote
          {ratingCount > 1 ? "s" : ""})
        </p>

        <div className="mt-5 flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => submitRating(value)}
              className="rounded-xl border border-white/15 bg-white/5 p-2 transition hover:border-yellow-300/60"
              aria-label={`Noter ${value} sur 5`}
            >
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 lg:col-span-3">
        <h2 className="text-xl font-semibold text-white">Commentaires</h2>

        <form className="mt-4 space-y-3" onSubmit={submitComment}>
          <input
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            required
            minLength={2}
            maxLength={40}
            placeholder="Votre nom"
            className="h-11 w-full rounded-xl border border-white/10 bg-[#0B1620] px-3 text-sm text-white outline-none focus:border-emerald-400/60"
          />

          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
            minLength={3}
            maxLength={600}
            placeholder="Votre commentaire"
            className="min-h-28 w-full rounded-xl border border-white/10 bg-[#0B1620] px-3 py-2 text-sm text-white outline-none focus:border-emerald-400/60"
          />

          <button
            type="submit"
            disabled={isSubmittingComment}
            className="inline-flex h-11 items-center justify-center rounded-full bg-linear-to-r from-cyan-500 to-emerald-500 px-5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmittingComment ? "Envoi..." : "Ajouter un commentaire"}
          </button>
        </form>

        {error && (
          <p className="mt-3 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {error}
          </p>
        )}

        <div className="mt-6 space-y-3">
          {comments.length === 0 ? (
            <p className="text-sm text-slate-400">Aucun commentaire pour le moment.</p>
          ) : (
            comments.map((comment) => (
              <article
                key={comment._id}
                className="rounded-xl border border-white/10 bg-[#0B1620] px-4 py-3"
              >
                <p className="text-sm font-medium text-white">{comment.author}</p>
                <p className="mt-1 text-sm text-slate-300">{comment.message}</p>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}