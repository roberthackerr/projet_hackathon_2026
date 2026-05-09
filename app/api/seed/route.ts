import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("madaai");

    // Clear existing data
    await db.collection("ais").deleteMany({});

    // Insert new data
    const result = await db.collection("ais").insertMany([
      {
        name: "EduBot MG",
        description: "Assistant IA éducatif pour les étudiants malgaches.",
        domain: "Education",
        users: "12K+",
        rating: 4.9,
        gradient: "from-cyan-500/20 to-blue-500/20",
        createdAt: new Date(),
      },
      {
        name: "AgriConseil MG",
        description: "Conseils intelligents pour les agriculteurs.",
        domain: "Agriculture",
        users: "8K+",
        rating: 4.8,
        gradient: "from-emerald-500/20 to-green-500/20",
        createdAt: new Date(),
      },
      {
        name: "TradukMG",
        description: "Traduction Malagasy ↔ Français ↔ Anglais.",
        domain: "Translation",
        users: "20K+",
        rating: 5.0,
        gradient: "from-violet-500/20 to-fuchsia-500/20",
        createdAt: new Date(),
      },
    ]);

    console.log(`✅ Seeded ${result.insertedCount} AIs`);
    
    return NextResponse.json({ 
      success: true, 
      message: "AIs seeded successfully",
      count: result.insertedCount 
    });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Failed to seed database" 
    }, { status: 500 });
  }
}