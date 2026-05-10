// app/api/developer/stats/route.ts

import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { getDatabase } from "@/lib/mongodb";

/**
 * GET developer stats
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

    const creatorId =
      session.user.id;

    /**
     * Published AIs
     */
    const publishedAIs =
      await db
        .collection("ais")
        .countDocuments({
          creatorId,
        });

    /**
     * Get all developer AIs
     */
    const ais =
      await db
        .collection("ais")
        .find({
          creatorId,
        })
        .toArray();

    const aiIds = ais.map(
      (ai) =>
        String(ai._id)
    );

    /**
     * Views
     */
    const totalViews =
      await db
        .collection(
          "ai_views"
        )
        .countDocuments({
          aiId: {
            $in: aiIds,
          },
        });

    /**
     * Ratings
     */
    const ratings =
      await db
        .collection(
          "ai_ratings"
        )
        .find({
          aiId: {
            $in: aiIds,
          },
        })
        .toArray();

    /**
     * Average rating
     */
    const averageRating =
      ratings.length > 0
        ? ratings.reduce(
            (
              acc,
              rating
            ) =>
              acc +
              rating.rating,
            0
          ) /
          ratings.length
        : 0;

    /**
     * Users
     */
    const totalUsers =
      ais.reduce(
        (acc, ai) => {
          const users =
            parseInt(
              ai.users || "0"
            );

          return (
            acc + users
          );
        },
        0
      );

    /**
     * Success
     */
    return NextResponse.json({
      success: true,

      data: {
        publishedAIs,

        totalUsers,

        totalViews,

        averageRating:
          Number(
            averageRating.toFixed(
              1
            )
          ),
      },
    });
  } catch (error) {
    console.error(
      "DEVELOPER_STATS_ERROR",
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