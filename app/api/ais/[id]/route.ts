// app/api/ais/[id]/route.ts

import { NextResponse } from "next/server";

import { ObjectId } from "mongodb";

import { getDatabase } from "@/lib/mongodb";

/**
 * Validate Mongo ObjectId
 */
function isValidObjectId(id: string) {
  return ObjectId.isValid(id);
}

/**
 * GET ONE AI
 */
export async function GET(
  _: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    /**
     * Next.js 16
     */
    const { id } =
      await context.params;

    /**
     * Validate ID
     */
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,

          message:
            "ID invalide",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * Database
     */
    const db = await getDatabase();

    /**
     * Find AI
     */
    const ai =
      await db.collection("ais").findOne({
        _id: new ObjectId(id),
      });

    /**
     * Not found
     */
    if (!ai) {
      return NextResponse.json(
        {
          success: false,

          message:
            "IA introuvable",
        },
        {
          status: 404,
        }
      );
    }

    /**
     * Success
     */
    return NextResponse.json(
      {
        success: true,

        data: ai,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "GET_AI_ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Erreur serveur",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * UPDATE AI
 */
export async function PUT(
  req: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    /**
     * Next.js 16
     */
    const { id } =
      await context.params;

    /**
     * Validate ID
     */
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,

          message:
            "ID invalide",
        },
        {
          status: 400,
        }
      );
    }

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
            "Champs obligatoires manquants",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * Database
     */
    const db = await getDatabase();

    /**
     * Existing AI
     */
    const existingAI =
      await db.collection("ais").findOne({
        _id: new ObjectId(id),
      });

    if (!existingAI) {
      return NextResponse.json(
        {
          success: false,

          message:
            "IA introuvable",
        },
        {
          status: 404,
        }
      );
    }

    /**
     * Update AI
     */
    const result =
      await db.collection("ais").updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            name,

            description,

            domain,

            type:
              type ||
              "assistant",

            image:
              image || "",

            updatedAt:
              new Date(),
          },
        }
      );

    /**
     * Fetch updated AI
     */
    const updatedAI =
      await db.collection("ais").findOne({
        _id: new ObjectId(id),
      });

    /**
     * Success
     */
    return NextResponse.json(
      {
        success: true,

        message:
          "IA mise à jour avec succès",

        modified:
          result.modifiedCount,

        data: updatedAI,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "UPDATE_AI_ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Erreur mise à jour IA",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * DELETE AI
 */
export async function DELETE(
  _: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    /**
     * Next.js 16
     */
    const { id } =
      await context.params;

    /**
     * Validate ID
     */
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,

          message:
            "ID invalide",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * Database
     */
    const db = await getDatabase();

    /**
     * Existing AI
     */
    const existingAI =
      await db.collection("ais").findOne({
        _id: new ObjectId(id),
      });

    if (!existingAI) {
      return NextResponse.json(
        {
          success: false,

          message:
            "IA introuvable",
        },
        {
          status: 404,
        }
      );
    }

    /**
     * Delete AI
     */
    const result =
      await db.collection("ais").deleteOne({
        _id: new ObjectId(id),
      });

    /**
     * Success
     */
    return NextResponse.json(
      {
        success: true,

        message:
          "IA supprimée avec succès",

        deleted:
          result.deletedCount,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "DELETE_AI_ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Erreur suppression IA",
      },
      {
        status: 500,
      }
    );
  }
}