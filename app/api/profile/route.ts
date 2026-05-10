// app/api/profile/route.ts

import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { getDatabase } from "@/lib/mongodb";

/**
 * GET PROFILE
 */
export async function GET() {
  try {
    /**
     * Session
     */
    const session =
      await getServerSession(
        authOptions
      );

    /**
     * Unauthorized
     */
    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Non autorisé",
        },
        {
          status: 401,
        }
      );
    }

    /**
     * Database
     */
    const db =
      await getDatabase();

    /**
     * User
     */
    const user =
      await db
        .collection("users")
        .findOne({
          email:
            session.user.email,
        });

    /**
     * Published AIs
     */
    const publishedAIs =
      await db
        .collection("ais")
        .countDocuments({
          creatorId:
            session.user.id,
        });

    /**
     * User AIs
     */
    const ais =
      await db
        .collection("ais")
        .find({
          creatorId:
            session.user.id,
        })
        .sort({
          createdAt: -1,
        })
        .limit(6)
        .toArray();

    /**
     * Success
     */
    return NextResponse.json({
      success: true,

      data: {
        user: {
          id:
            String(
              user?._id
            ) ||
            session.user.id,

          name:
            user?.name ||
            session.user.name,

          email:
            user?.email ||
            session.user.email,

          role:
            user?.role ||
            session.user.role,

          image:
            user?.image ||
            null,
        },

        stats: {
          publishedAIs,
        },

        ais,
      },
    });
  } catch (error) {
    console.error(
      "PROFILE_ERROR",
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