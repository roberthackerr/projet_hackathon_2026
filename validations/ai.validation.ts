// validations/ai.validation.ts

import * as z from "zod";

export const createAISchema = z.object({
  name: z
    .string()
    .min(3, "Nom trop court"),

  description: z
    .string()
    .min(10, "Description trop courte"),

  domain: z.string(),

  type: z.string(),

  image: z.string().optional(),
});

export type CreateAIInput = z.infer<
  typeof createAISchema
>;