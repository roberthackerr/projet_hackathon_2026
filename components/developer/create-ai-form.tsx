// components/developer/create-ai-form.tsx

"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  Bot,
  Loader2,
  Sparkles,
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

export default function CreateAIForm() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",

      description: "",

      domain: "Education",

      type: "assistant",

      image: "",

      createdBy: "",
    });

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        "/api/ais",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            ...formData,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        alert(result.message);

        return;
      }

      alert(
        "IA publiée avec succès 🚀"
      );

      router.push("/marketplace");
    } catch (error) {
      console.error(error);

      alert("Erreur serveur");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[40px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
    >

      {/* AI Name */}
      <div className="mb-6">

        <label className="mb-3 block text-sm font-medium text-slate-300">
          Nom de l’IA
        </label>

        <div className="relative">

          <Bot className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

          <input
            type="text"
            required
            placeholder="Ex: MadaTranslate AI"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,

                name: e.target.value,
              })
            }
            className="h-14 w-full rounded-2xl border border-white/10 bg-[#0F172A]/80 pl-12 pr-4 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
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
          placeholder="Décrivez votre intelligence artificielle..."
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,

              description:
                e.target.value,
            })
          }
          className="w-full rounded-2xl border border-white/10 bg-[#0F172A]/80 p-4 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Domain */}
        <div>

          <label className="mb-3 block text-sm font-medium text-slate-300">
            Domaine
          </label>

          <select
            value={formData.domain}
            onChange={(e) =>
              setFormData({
                ...formData,

                domain:
                  e.target.value,
              })
            }
            className="h-14 w-full rounded-2xl border border-white/10 bg-[#0F172A]/80 px-4 text-white outline-none focus:border-cyan-400"
          >
            {domains.map((domain) => (
              <option
                key={domain}
                value={domain}
              >
                {domain}
              </option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div>

          <label className="mb-3 block text-sm font-medium text-slate-300">
            Type IA
          </label>

          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({
                ...formData,

                type: e.target.value,
              })
            }
            className="h-14 w-full rounded-2xl border border-white/10 bg-[#0F172A]/80 px-4 text-white outline-none focus:border-cyan-400"
          >
            {aiTypes.map((type) => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Author */}
      <div className="mt-6">

        <label className="mb-3 block text-sm font-medium text-slate-300">
          Développeur
        </label>

        <input
          type="text"
          required
          placeholder="Votre nom"
          value={formData.createdBy}
          onChange={(e) =>
            setFormData({
              ...formData,

              createdBy:
                e.target.value,
            })
          }
          className="h-14 w-full rounded-2xl border border-white/10 bg-[#0F172A]/80 px-4 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
        />
      </div>

      {/* Image */}
      <div className="mt-6">

        <label className="mb-3 block text-sm font-medium text-slate-300">
          Logo / Image URL
        </label>

        <input
          type="text"
          placeholder="https://..."
          value={formData.image}
          onChange={(e) =>
            setFormData({
              ...formData,

              image: e.target.value,
            })
          }
          className="h-14 w-full rounded-2xl border border-white/10 bg-[#0F172A]/80 px-4 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 font-semibold text-white transition-all duration-300 hover:scale-[1.01] disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />

            Publication...
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />

            Publier IA
          </>
        )}
      </button>
    </form>
  );
}