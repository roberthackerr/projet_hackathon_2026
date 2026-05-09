// app/api/auth/register/route.ts

import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import { getDatabase } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    // Parse body
    const body = await req.json();

    const {
      name,
      email,
      password,
      role,
    } = body;

    /**
     * Validation
     */
    if (
      !name ||
      !email ||
      !password
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Tous les champs sont obligatoires",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * Validation email
     */
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Email invalide",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * Validation mot de passe
     */
    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Le mot de passe doit contenir au moins 6 caractères",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * Connexion MongoDB
     */
    const db = await getDatabase();

    /**
     * Vérifie si utilisateur existe
     */
    const existingUser =
      await db.collection("users").findOne({
        email: email.toLowerCase(),
      });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Cet email existe déjà",
        },
        {
          status: 409,
        }
      );
    }

    /**
     * Hash password
     */
    const hashedPassword =
      await bcrypt.hash(password, 12);

    /**
     * Create user
     */
    const newUser =
      await db.collection("users").insertOne({
        name,

        email: email.toLowerCase(),

        password: hashedPassword,

        role:
          role === "developer"
            ? "developer"
            : "user",

        createdAt: new Date(),

        updatedAt: new Date(),
      });

    /**
     * Success response
     */
    return NextResponse.json(
      {
        success: true,

        message:
          "Compte créé avec succès",

        user: {
          id: newUser.insertedId,

          name,

          email,

          role,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "REGISTER_API_ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Erreur interne du serveur",
      },
      {
        status: 500,
      }
    );
  }
}