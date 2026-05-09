// app/api/admin/users/route.ts

import { NextResponse } from "next/server";

import { getDatabase } from "@/lib/mongodb";

/**
 * GET ALL USERS
 */
export async function GET() {
  try {
    /**
     * Database
     */
    const db = await getDatabase();

    /**
     * Fetch users
     */
    const users = await db
      .collection("users")
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

        data: users,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "ADMIN_USERS_ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Erreur chargement utilisateurs",
      },
      {
        status: 500,
      }
    );
  }
}