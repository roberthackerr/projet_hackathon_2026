import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("madaai");

    // Compter les IA publiées
    const totalAI = await db.collection("ais").countDocuments();

    // Compter les développeurs (users avec rôle developer)
    const totalDevelopers = await db.collection("users").countDocuments({ 
      role: "developer" 
    });

    // Compter les utilisateurs (users avec rôle user)
    const totalUsersCount = await db.collection("users").countDocuments({ 
      role: "user" 
    });
    
    // Formater le nombre d'utilisateurs
    const formatNumber = (num: number): string => {
      if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
      if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
      return num.toString();
    };

    // Compter les requêtes API
    let totalRequests = 0;
    try {
      totalRequests = await db.collection("api_logs").countDocuments();
    } catch {
      // Collection n'existe pas encore
      totalRequests = 0;
    }

    return NextResponse.json({
      success: true,
      stats: {
        totalAI,
        totalDevelopers,
        totalUsers: formatNumber(totalUsersCount),
        totalRequests: formatNumber(totalRequests),
        raw: {
          totalAI,
          totalDevelopers,
          totalUsers: totalUsersCount,
          totalRequests,
        }
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    
    // Retourner une erreur, pas de fake data
    return NextResponse.json(
      { 
        success: false, 
        message: "Erreur lors de la récupération des statistiques",
        stats: {
          totalAI: 0,
          totalDevelopers: 0,
          totalUsers: "0",
          totalRequests: "0",
        }
      },
      { status: 500 }
    );
  }
}