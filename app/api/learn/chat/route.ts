// app/api/ai-chat/route.ts
import {
    NextRequest,
    NextResponse,
  } from "next/server";
  
  import { ObjectId } from "mongodb";
  
  import OpenAI from "openai";
  
  import { getDatabase } from "@/lib/mongodb";
  
  /**
   * OpenRouter / OpenAI
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
  Tu es une intelligence artificielle publiée sur MadaAI Hub.
  
  Tu aides les utilisateurs de manière claire, intelligente et bienveillante.
  
  Tu dois :
  - répondre précisément,
  - expliquer simplement,
  - être moderne,
  - être utile,
  - encourager l’apprentissage.
  `,
  
    translator: `
  Tu es une IA spécialisée en traduction.
  
  Tu traduis entre :
  - Malagasy
  - Français
  - Anglais
  `,
  
    educational: `
  Tu es une IA éducative.
  
  Tu aides les étudiants à comprendre leurs cours étape par étape.
  `,
  };
  
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
    const db = await getDatabase();
  
    return await db
      .collection("ai_messages")
      .insertOne({
        conversationId,
  
        content,
  
        type,
  
        createdAt: new Date(),
      });
  }
  
  /**
   * Get history
   */
  async function getConversationHistory(
    conversationId: string,
    limit = 10
  ) {
    const db = await getDatabase();
  
    const messages = await db
      .collection("ai_messages")
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
        aiId,
        message,
        conversationId,
        type = "assistant",
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
      const ai =
        await db
          .collection("ais")
          .findOne({
            _id: new ObjectId(aiId),
          });
  
      if (!ai) {
        return NextResponse.json(
          {
            success: false,
  
            message:
              "IA introuvable",
          },
          {
            status: 404,
          }
        );
      }
  
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
          6
        );
  
      /**
       * System prompt
       */
      const systemPrompt =
        SYSTEM_PROMPTS[type] ||
        SYSTEM_PROMPTS.assistant;
  
      /**
       * Build messages
       */
      const messages = [
        {
          role: "system" as const,
  
          content: systemPrompt,
        },
  
        ...history.map((msg) => ({
          role:
            msg.type === "user"
              ? ("user" as const)
              : ("assistant" as const),
  
          content: msg.content,
        })),
  
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
       * Save assistant response
       */
      await saveMessage({
        conversationId,
  
        content: aiResponse,
  
        type: "assistant",
      });
  
      /**
       * Success
       */
      return NextResponse.json({
        success: true,
  
        response: aiResponse,
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
   * GET conversation history
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
  
            message:
              "Conversation ID manquant",
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
  export async function PUT() {
    try {
      /**
       * Database
       */
      const db = await getDatabase();
  
      /**
       * Create conversation
       */
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
  
      /**
       * Success
       */
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
      console.error(
        "CREATE_CONVERSATION_ERROR",
        error
      );
  
      return NextResponse.json(
        {
          success: false,
  
          message:
            "Erreur création conversation",
        },
        {
          status: 500,
        }
      );
    }
  }