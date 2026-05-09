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
     * MongoDB connection
     */
    const db = await getDatabase();

    /**
     * Collection
     */
    const aisCollection =
      db.collection("ais");

    /**
     * Fetch AIs
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
 * Publier une IA
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
      type,
      image,
      users,
      rating,
      gradient,
      createdBy,
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
     * MongoDB connection
     */
    const db = await getDatabase();

    /**
     * Collection
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
     * Create AI document
     */
    const newAI = {
      name,

      description,

      domain,

      type:
        type || "assistant",

      image:
        image || null,

      users:
        users || "0",

      rating:
        rating || 0,

      gradient:
        gradient ||
        "from-cyan-500/20 to-blue-500/20",

      createdBy:
        createdBy || "Anonymous",

      isPublished: true,

      createdAt: new Date(),

      updatedAt: new Date(),
    };

    /**
     * Insert AI
     */
    const result =
      await aisCollection.insertOne(
        newAI
      );

    /**
     * Success response
     */
    return NextResponse.json(
      {
        success: true,

        message:
          "IA publiée avec succès",

        insertedId:
          result.insertedId,

        data: newAI,
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