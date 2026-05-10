// app/api/voice-ai/route.ts

import { NextResponse } from "next/server";

import OpenAI from "openai";

/**
 * OpenRouter
 */
const openai =
  new OpenAI({
    apiKey:
      process.env.OPENROUTER_API_KEY,

    baseURL:
      "https://openrouter.ai/api/v1",
  });

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json();

    const { message } =
      body;

    /**
     * Validation
     */
    if (!message) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Message requis",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * AI Completion
     */
    const completion =
      await openai.chat.completions.create(
        {
          model:
            "openai/gpt-oss-120b:free",

          messages: [
            {
              role: "system",

              content:
                "Tu es une IA vocale intelligente créée pour MadaAI Hub.",
            },

            {
              role: "user",

              content:
                message,
            },
          ],
        }
      );

    const response =
      completion.choices[0]
        .message.content;

    return NextResponse.json({
      success: true,

      response,
    });
  } catch (error) {
    console.error(
      "VOICE_AI_ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Erreur IA",
      },
      {
        status: 500,
      }
    );
  }
}