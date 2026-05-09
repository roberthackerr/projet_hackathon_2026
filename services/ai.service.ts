// services/ai.service.ts

import { getDatabase } from "@/lib/mongodb";

import { defaultAIValues } from "@/models/ai.model";

import { CreateAIInput } from "@/validations/ai.validation";

export async function createAI(
  data: CreateAIInput
) {
  const db = await getDatabase();

  const aisCollection =
    db.collection("ais");

  /**
   * Vérifie IA existante
   */
  const existingAI =
    await aisCollection.findOne({
      name: data.name,
    });

  if (existingAI) {
    throw new Error(
      "Cette IA existe déjà"
    );
  }

  /**
   * Insert
   */
  const result =
    await aisCollection.insertOne({
      ...defaultAIValues,

      ...data,

      createdAt: new Date(),

      updatedAt: new Date(),
    });

  return result;
}

export async function getAllAIs() {
  const db = await getDatabase();

  const aisCollection =
    db.collection("ais");

  return await aisCollection
    .find({})
    .sort({
      createdAt: -1,
    })
    .toArray();
}