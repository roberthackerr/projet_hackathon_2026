// app/api/ai-chat/route.ts

import {
    NextRequest,
    NextResponse,
  } from "next/server";
  
  import { ObjectId } from "mongodb";
  
  import OpenAI from "openai";
  
  import { getDatabase } from "@/lib/mongodb";
  
  /**
   * OpenRouter
   */
  const openai = new OpenAI({
    baseURL:
      "https://openrouter.ai/api/v1",
  
    apiKey:
      process.env.OPENROUTER_API_KEY,
  
    defaultHeaders: {
      "HTTP-Referer":
        process.env
          .NEXT_PUBLIC_APP_URL ||
        "http://localhost:3000",
  
      "X-Title":
        "MadaAI Hub",
    },
  });
  
  /**
   * System prompts
   */
  const SYSTEM_PROMPTS: Record<
    string,
    string
  > = {
    assistant: `
  Tu es une intelligence artificielle moderne publiée sur MadaAI Hub.
  
  Tu aides les utilisateurs de manière claire, intelligente et professionnelle.
  
  Tu dois :
  - expliquer simplement,
  - être utile,
  - être moderne,
  - encourager l'apprentissage,
  - répondre précisément.
  `,
  
    programming: `
  Tu es une IA spécialisée en programmation.
  
  Tu aides avec :
  - JavaScript
  - TypeScript
  - React
  - Node.js
  - Python
  - HTML/CSS
  
  Tu expliques étape par étape.
  `,
  
    translation: `
  Tu es une IA de traduction.
  
  Tu traduis :
  - Malagasy
  - Français
  - Anglais
  `,
  
    education: `
  Tu es une IA éducative.
  
  Tu aides les étudiants à comprendre leurs cours.
  `,
  
    business: `
  Tu es une IA business.
  
  Tu aides les entrepreneurs et startups.
  `,
  };
  
  /**
   * Detect AI type
   */
  function detectSubject(
    message: string
  ) {
    const lower =
      message.toLowerCase();
  
    if (
      lower.includes(
        "react"
      ) ||
      lower.includes(
        "javascript"
      ) ||
      lower.includes(
        "python"
      ) ||
      lower.includes("code")
    ) {
      return "programming";
    }
  
    if (
      lower.includes(
        "translate"
      ) ||
      lower.includes(
        "traduction"
      )
    ) {
      return "translation";
    }
  
    if (
      lower.includes(
        "business"
      ) ||
      lower.includes(
        "startup"
      )
    ) {
      return "business";
    }
  
    return "assistant";
  }
  
  /**
   * Save message
   */
  async function saveMessage({
    conversationId,
    content,
    type,
  }: {
    conversationId: string;
  
    content: string;
  
    type: "user" | "assistant";
  }) {
    const db =
      await getDatabase();
  
    await db
      .collection(
        "ai_messages"
      )
      .insertOne({
        conversationId,
  
        content,
  
        type,
  
        createdAt:
          new Date(),
      });
  }
  
  /**
   * Get history
   */
  async function getConversationHistory(
    conversationId: string,
    limit = 10
  ) {
    const db =
      await getDatabase();
  
    const messages = await db
      .collection(
        "ai_messages"
      )
      .find({
        conversationId,
      })
      .sort({
        createdAt: -1,
      })
      .limit(limit)
      .toArray();
  
    return messages.reverse();
  }
  
  /**
   * POST
   * Send message to AI
   */
  export async function POST(
    request: NextRequest
  ) {
    try {
      const body =
        await request.json();
  
      const {
        message,
        conversationId,
        aiId,
        subject = "auto",
      } = body;
  
      /**
       * Validation
       */
      if (!message?.trim()) {
        return NextResponse.json(
          {
            success: false,
  
            message:
              "Message vide",
          },
          {
            status: 400,
          }
        );
      }
  
      const db =
        await getDatabase();
  
      /**
       * Find AI
       */
      let ai = null;
  
      if (aiId) {
        ai =
          await db
            .collection("ais")
            .findOne({
              _id:
                new ObjectId(
                  aiId
                ),
            });
      }
  
      /**
       * Detect subject
       */
      const detectedSubject =
        subject === "auto"
          ? detectSubject(
              message
            )
          : subject;
  
      /**
       * System prompt
       */
      const systemPrompt =
        SYSTEM_PROMPTS[
          detectedSubject
        ] ||
        SYSTEM_PROMPTS
          .assistant;
  
      /**
       * Save user message
       */
      await saveMessage({
        conversationId,
  
        content: message,
  
        type: "user",
      });
  
      /**
       * History
       */
      const history =
        await getConversationHistory(
          conversationId,
          5
        );
  
      /**
       * Build messages
       */
      const messages = [
        {
          role: "system" as const,
  
          content:
            systemPrompt,
        },
  
        ...history.map(
          (msg) => ({
            role:
              msg.type ===
              "user"
                ? ("user" as const)
                : ("assistant" as const),
  
            content:
              msg.content,
          })
        ),
  
        {
          role: "user" as const,
  
          content: message,
        },
      ];
  
      /**
       * OpenRouter request
       */
      const completion =
        await openai.chat.completions.create(
          {
            model:
              "openai/gpt-oss-120b:free",
  
            messages,
  
            max_tokens: 500,
  
            temperature: 0.7,
          }
        );
  
      /**
       * AI response
       */
      const aiResponse =
        completion.choices[0]
          ?.message?.content ||
        "Je réfléchis...";
  
      /**
       * Save assistant message
       */
      await saveMessage({
        conversationId,
  
        content:
          aiResponse,
  
        type:
          "assistant",
      });
  
      /**
       * Success
       */
      return NextResponse.json({
        success: true,
  
        response: {
          content:
            aiResponse,
  
          subject:
            detectedSubject,
  
          ai: ai
            ? {
                _id: ai._id,
  
                name:
                  ai.name,
              }
            : null,
        },
      });
    } catch (error: any) {
      console.error(
        "AI_CHAT_ERROR",
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
  
  /**
   * GET history
   */
  export async function GET(
    request: NextRequest
  ) {
    try {
      const { searchParams } =
        new URL(request.url);
  
      const conversationId =
        searchParams.get(
          "conversationId"
        );
  
      if (!conversationId) {
        return NextResponse.json(
          {
            success: false,
          },
          {
            status: 400,
          }
        );
      }
  
      const history =
        await getConversationHistory(
          conversationId,
          20
        );
  
      return NextResponse.json({
        success: true,
  
        history,
      });
    } catch (error) {
      console.error(error);
  
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 500,
        }
      );
    }
  }
  
  /**
   * PUT
   * Create conversation
   */
  export async function PUT() {
    try {
      const db =
        await getDatabase();
  
      const result =
        await db
          .collection(
            "ai_conversations"
          )
          .insertOne({
            createdAt:
              new Date(),
  
            updatedAt:
              new Date(),
          });
  
      return NextResponse.json(
        {
          success: true,
  
          conversation: {
            _id:
              result.insertedId,
          },
        },
        {
          status: 201,
        }
      );
    } catch (error) {
      console.error(error);
  
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 500,
        }
      );
    }
  }