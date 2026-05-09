"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import * as z from "zod";

import { login as loginUser } from "@/lib/auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setServerError(null);

    const result = await loginUser(data.email.trim(), data.password);

    if (result.ok) {
      router.push("/");
      router.refresh();
      return;
    }

    setServerError(result.error);
  }

  return (
    <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_0_40px_rgba(6,182,212,0.15)] backdrop-blur-2xl">

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">
          Connexion
        </h2>

        <p className="mt-2 text-slate-400">
          Accedez a votre tableau de bord IA
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {serverError && (
          <p
            role="alert"
            className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            {serverError}
          </p>
        )}

        {/* EMAIL */}
        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Adresse email
          </label>

          <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 px-4">
            <Mail className="h-5 w-5 text-slate-400" />

            <input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className="h-14 w-full bg-transparent px-4 text-white outline-none placeholder:text-slate-500"
            />
          </div>

          {errors.email && (
            <p className="mt-2 text-sm text-red-400">
              Email invalide
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Mot de passe
          </label>

          <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 px-4">
            <Lock className="h-5 w-5 text-slate-400" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password")}
              className="h-14 w-full bg-transparent px-4 text-white outline-none placeholder:text-slate-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-slate-400" />
              ) : (
                <Eye className="h-5 w-5 text-slate-400" />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-2 text-sm text-red-400">
              Mot de passe requis
            </p>
          )}
        </div>

        {/* BUTTON */}
        <button
          disabled={isSubmitting}
          className="h-14 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
        >
          {isSubmitting ? "Chargement..." : "Se connecter"}
        </button>

        <div className="text-center text-sm text-slate-400">
          Vous n'avez pas de compte ?{" "}
          <Link href="/register" className="text-cyan-400 hover:text-cyan-300">
            Creer un compte
          </Link>
        </div>
      </form>
    </div>
  );
}