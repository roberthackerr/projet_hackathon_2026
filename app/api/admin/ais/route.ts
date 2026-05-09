// app/api/admin/ais/route.ts

import { NextResponse } from "next/server";

import { getDatabase } from "@/lib/mongodb";

/**
 * GET ALL AIs
 */
export async function GET() {
  try {
    /**
     * Database
     */
    const db = await getDatabase();

    /**
     * Fetch AIs
     */
    const ais = await db
      .collection("ais")
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
      "ADMIN_AIS_ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Erreur chargement IA",
      },
      {
        status: 500,
      }
    );
  }
}