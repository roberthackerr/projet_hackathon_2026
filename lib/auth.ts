// apps/web/lib/auth.ts

"use client";

import { signIn, signOut } from "next-auth/react";

/**
 * Login utilisateur avec NextAuth Credentials
 */
export async function login(email: string, password: string) {
  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!response) {
      return {
        ok: false as const,
        error: "Erreur réseau",
      };
    }

    if (response.error) {
      return {
        ok: false as const,
        error:
          response.error === "CredentialsSignin"
            ? "Email ou mot de passe incorrect"
            : response.error,
      };
    }

    return {
      ok: true as const,
      url: response.url,
    };
  } catch (error) {
    console.error("LOGIN_ERROR", error);

    return {
      ok: false as const,
      error: "Connexion impossible",
    };
  }
}

/**
 * Logout utilisateur
 */
export async function logout() {
  try {
    await signOut({
      callbackUrl: "/login",
    });
  } catch (error) {
    console.error("LOGOUT_ERROR", error);
  }
}

/**
 * Register utilisateur
 */
export async function register(data: {
  name: string;
  email: string;
  password: string;
  role: "user" | "developer";
}) {
  try {
    const response = await fetch(
      "/api/auth/register",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    return {
      ...result,
      ok: response.ok,
    };
  } catch (error) {
    console.error("REGISTER_ERROR", error);

    return {
      success: false,
      ok: false,
      message: "Échec de l'inscription",
    };
  }
}