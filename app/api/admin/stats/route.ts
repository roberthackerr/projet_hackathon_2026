// app/api/admin/stats/route.ts

import { NextResponse } from "next/server";

import { getDatabase } from "@/lib/mongodb";

/**
 * GET ADMIN STATS
 */
export async function GET() {
  try {
    /**
     * Database
     */
    const db = await getDatabase();

    /**
     * Collections
     */
    const usersCollection =
      db.collection("users");

    const aisCollection =
      db.collection("ais");

    /**
     * Counts
     */
    const totalUsers =
      await usersCollection.countDocuments();

    const totalAIs =
      await aisCollection.countDocuments();

    /**
     * Average rating
     */
    const ratingAggregation =
      await aisCollection
        .aggregate([
          {
            $group: {
              _id: null,

              averageRating: {
                $avg: "$rating",
              },
            },
          },
        ])
        .toArray();

    /**
     * Average rating fallback
     */
    const averageRating =
      ratingAggregation[0]
        ?.averageRating || 0;

    /**
     * Total AI users
     */
    const allAIs =
      await aisCollection.find({}).toArray();

    const totalAIUsers =
      allAIs.reduce(
        (accumulator, ai) => {
          /**
           * Parse string users
           * Example:
           * "12K+" => 12000
           */
          let users = 0;

          if (
            typeof ai.users ===
            "string"
          ) {
            const cleaned =
              ai.users
                .replace("K+", "000")
                .replace("+", "");

            users =
              Number.parseInt(
                cleaned
              ) || 0;
          }

          return (
            accumulator + users
          );
        },
        0
      );

    /**
     * Fake requests
     * Replace later by real analytics
     */
    const totalRequests =
      "1.2M";

    /**
     * Success response
     */
    return NextResponse.json(
      {
        success: true,

        data: {
          totalUsers,

          totalAIs,

          totalAIUsers,

          averageRating:
            Number(
              averageRating.toFixed(
                1
              )
            ),

          totalRequests,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "ADMIN_STATS_ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Erreur chargement statistiques",
      },
      {
        status: 500,
      }
    );
  }
}