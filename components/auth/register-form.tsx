"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Shield,
} from "lucide-react";

import { register as registerUser } from "@/lib/auth";

const schema = z
  .object({
    name: z.string().min(3, "Nom requis"),
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Minimum 6 caractères"),
    confirmPassword: z.string(),
    role: z.enum(["user", "developer"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: "user",
    },
  });

  async function onSubmit(data: FormData) {
    setServerError(null);

    const result = await registerUser({
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password,
      role: data.role,
    });

    if (result.ok && result.success) {
      router.push("/login");
      return;
    }

    setServerError(
      typeof result.message === "string"
        ? result.message
        : "Une erreur est survenue"
    );
  }

  return (
    <div className="w-full max-w-lg rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_0_40px_rgba(16,185,129,0.15)] backdrop-blur-2xl">

      <div className="mb-8">
        <h2 className="text-3xl font-bold">
          Creer un compte
        </h2>

        <p className="mt-2 text-slate-400">
          Accedez a l'ecosysteme MadaAI
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >

        {serverError && (
          <p
            role="alert"
            className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            {serverError}
          </p>
        )}

        {/* NAME */}
        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Nom complet
          </label>

          <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 px-4">
            <User className="h-5 w-5 text-slate-400" />

            <input
              type="text"
              placeholder="John Doe"
              {...register("name")}
              className="h-14 w-full bg-transparent px-4 text-white outline-none placeholder:text-slate-500"
            />
          </div>

          {errors.name && (
            <p className="mt-2 text-sm text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>

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
              {errors.email.message}
            </p>
          )}
        </div>

        {/* ROLE */}
        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Type de compte
          </label>

          <div className="grid grid-cols-2 gap-4">

            <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-cyan-400/40">
              <input
                type="radio"
                value="user"
                {...register("role")}
                className="accent-cyan-500"
              />

              <div>
                <h3 className="font-medium">Utilisateur</h3>
                <p className="text-sm text-slate-400">
                  Explorer les outils IA
                </p>
              </div>
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-emerald-400/40">
              <input
                type="radio"
                value="developer"
                {...register("role")}
                className="accent-emerald-500"
              />

              <div>
                <h3 className="font-medium">
                  Developpeur
                </h3>

                <p className="text-sm text-slate-400">
                  Publier des modeles IA
                </p>
              </div>
            </label>
          </div>
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
              onClick={() =>
                setShowPassword(!showPassword)
              }
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
              {errors.password.message}
            </p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Confirmer le mot de passe
          </label>

          <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 px-4">
            <Shield className="h-5 w-5 text-slate-400" />

            <input
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
              className="h-14 w-full bg-transparent px-4 text-white outline-none placeholder:text-slate-500"
            />
          </div>

          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-400">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* BUTTON */}
        <button
          disabled={isSubmitting}
          className="h-14 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
        >
          {isSubmitting
            ? "Creation..."
            : "Creer un compte"}
        </button>

        <div className="text-center text-sm text-slate-400">
          Vous avez deja un compte ?{" "}
          <Link href="/login" className="text-cyan-400 hover:text-cyan-300">
            Connexion
          </Link>
        </div>
      </form>
    </div>
  );
}