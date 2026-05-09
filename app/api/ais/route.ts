// app/api/ais/route.ts

import { NextResponse } from "next/server";

import { getDatabase } from "@/lib/mongodb";

/**
 * GET /api/ais
 * Retourne toutes les IA
 */
export async function GET() {
  try {
    /**
     * Connexion MongoDB
     */
    const db = await getDatabase();

    /**
     * Collection ais
     */
    const aisCollection =
      db.collection("ais");

    /**
     * Récupération des IA
     */
    const ais = await aisCollection
      .find({})
      .sort({
        createdAt: -1,
      })
      .toArray();

    /**
     * Success response
     */
    return NextResponse.json(
      {
        success: true,

        data: ais,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "GET_AIS_ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Erreur lors du chargement des IA",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * POST /api/ais
 * Ajouter une nouvelle IA
 */
export async function POST(req: Request) {
  try {
    /**
     * Parse body
     */
    const body = await req.json();

    const {
      name,
      description,
      domain,
      users,
      rating,
      gradient,
    } = body;

    /**
     * Validation
     */
    if (
      !name ||
      !description ||
      !domain
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
     * Connexion MongoDB
     */
    const db = await getDatabase();

    /**
     * Collection ais
     */
    const aisCollection =
      db.collection("ais");

    /**
     * Vérifie si IA existe déjà
     */
    const existingAI =
      await aisCollection.findOne({
        name,
      });

    if (existingAI) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Cette IA existe déjà",
        },
        {
          status: 409,
        }
      );
    }

    /**
     * Insert IA
     */
    const result =
      await aisCollection.insertOne({
        name,

        description,

        domain,

        users: users || "0",

        rating: rating || 0,

        gradient:
          gradient ||
          "from-cyan-500/20 to-blue-500/20",

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
          "IA ajoutée avec succès",

        insertedId:
          result.insertedId,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "CREATE_AI_ERROR",
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