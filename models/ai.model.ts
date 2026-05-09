// models/ai.model.ts

import { AI } from "@/types/ai";

export const AI_DOMAINS = [
  "Education",
  "Agriculture",
  "Translation",
  "Tourism",
  "Health",
  "Business",
] as const;

export const AI_TYPES = [
  "chatbot",
  "assistant",
  "generator",
  "translator",
] as const;

export const defaultAIValues: Partial<AI> =
  {
    users: "0",

    rating: 0,

    gradient:
      "from-cyan-500/20 to-blue-500/20",
  };