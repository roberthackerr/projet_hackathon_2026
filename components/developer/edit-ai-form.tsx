// components/developer/edit-ai-form.tsx

"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  Loader2,
  Bot,
  Sparkles,
  ImageIcon,
  Layers3,
} from "lucide-react";

const domains = [
  "Education",
  "Agriculture",
  "Translation",
  "Tourism",
  "Health",
  "Business",
];

const aiTypes = [
  "assistant",
  "chatbot",
  "translator",
  "generator",
];

export default function EditAIForm() {
  const params = useParams();

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState({
      name: "",

      description: "",

      domain: "Education",

      type: "assistant",

      image: "",
    });

  /**
   * Fetch current AI values
   */
  async function fetchAI() {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/ais/${params.id}`
      );

      const result =
        await response.json();

      if (!result.success) {
        setError(
          "Impossible de charger cette IA"
        );

        return;
      }

      /**
       * Current values
       */
      setFormData({
        name:
          result.data.name || "",

        description:
          result.data.description ||
          "",

        domain:
          result.data.domain ||
          "Education",

        type:
          result.data.type ||
          "assistant",

        image:
          result.data.image || "",
      });
    } catch (error) {
      console.error(error);

      setError("Erreur serveur");
    } finally {
      setLoading(false);
    }
  }

  /**
   * Update AI
   */
  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setSaving(true);

      setError("");

      const response = await fetch(
        `/api/ais/${params.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            formData
          ),
        }
      );

      const result =
        await response.json();

      if (!result.success) {
        setError(
          result.message ||
            "Erreur mise à jour"
        );

        return;
      }

      router.push(
        "/developer/dashboard"
      );
    } catch (error) {
      console.error(error);

      setError("Erreur serveur");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchAI();
    }
  }, [params.id]);

  /**
   * Loading state
   */
  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">

        <Loader2 className="h-12 w-12 animate-spin text-cyan-400" />

      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
    >

      {/* Glow */}
      <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10">

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">

            {error}

          </div>
        )}

        {/* Name */}
        <div className="mb-6">

          <label className="mb-3 block text-sm font-medium text-slate-300">
            Nom IA
          </label>

          <div className="relative">

            <Bot className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,

                  name:
                    e.target.value,
                })
              }
              className="h-14 w-full rounded-2xl border border-white/10 bg-[#0F172A]/80 pl-12 pr-4 text-white outline-none transition focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">

          <label className="mb-3 block text-sm font-medium text-slate-300">
            Description
          </label>

          <textarea
            required
            rows={5}
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,

                description:
                  e.target.value,
              })
            }
            className="w-full rounded-2xl border border-white/10 bg-[#0F172A]/80 p-4 text-white outline-none transition focus:border-cyan-400"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* Domain */}
          <div>

            <label className="mb-3 block text-sm font-medium text-slate-300">
              Domaine
            </label>

            <div className="relative">

              <Layers3 className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

              <select
                value={formData.domain}
                onChange={(e) =>
                  setFormData({
                    ...formData,

                    domain:
                      e.target.value,
                  })
                }
                className="h-14 w-full rounded-2xl border border-white/10 bg-[#0F172A]/80 pl-12 pr-4 text-white outline-none transition focus:border-cyan-400"
              >
                {domains.map(
                  (domain) => (
                    <option
                      key={domain}
                      value={domain}
                    >
                      {domain}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* Type */}
          <div>

            <label className="mb-3 block text-sm font-medium text-slate-300">
              Type IA
            </label>

            <div className="relative">

              <Sparkles className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,

                    type:
                      e.target.value,
                  })
                }
                className="h-14 w-full rounded-2xl border border-white/10 bg-[#0F172A]/80 pl-12 pr-4 text-white outline-none transition focus:border-cyan-400"
              >
                {aiTypes.map(
                  (type) => (
                    <option
                      key={type}
                      value={type}
                    >
                      {type}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="mt-6">

          <label className="mb-3 block text-sm font-medium text-slate-300">
            Image URL
          </label>

          <div className="relative">

            <ImageIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

            <input
              type="text"
              value={formData.image}
              onChange={(e) =>
                setFormData({
                  ...formData,

                  image:
                    e.target.value,
                })
              }
              className="h-14 w-full rounded-2xl border border-white/10 bg-[#0F172A]/80 pl-12 pr-4 text-white outline-none transition focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Preview */}
        {formData.image && (
          <div className="mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-4">

            <img
              src={formData.image}
              alt="Preview"
              className="h-[220px] w-full rounded-2xl object-cover"
            />

          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 font-semibold text-white transition-all duration-300 hover:scale-[1.01] disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />

              Sauvegarde...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />

              Sauvegarder les modifications
            </>
          )}
        </button>
      </div>
    </form>
  );
}