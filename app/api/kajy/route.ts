import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    "X-Title": "KAJY - Assistant Financier Madagascar",
  },
});

// Contexte financier malgache
const FINANCIAL_CONTEXT = `
🇲🇬 KAJY - "Calcul" en malgache

Tu es un assistant financier intelligent développé par des experts malgaches pour aider la communauté.

CONTEXTE ÉCONOMIQUE MALGACHE :
- Monnaie : Ariary (MGA)
- Salaire moyen : 250 000 - 500 000 MGA/mois
- Prix du riz : ~3 000 MGA/kg
- Transport (taxi-brousse) : 10 000 - 50 000 MGA
- Loyers Antananarivo : 150 000 - 400 000 MGA/mois
- Électricité JIRAMA : 25 000 - 100 000 MGA/mois
- Pain : 1 000 MGA
- Essence : ~5 000 MGA/litre

RÔLE PRINCIPAL :
Aider les Malgaches à mieux gérer leur argent au quotidien.

MISSIONS SPÉCIFIQUES :
1. Gérer le budget familial
2. Économiser pour les projets (école, maison, voyage)
3. Investir intelligemment (petits commerces, agriculture)
4. Sortir du "vola midity" (fin de mois difficile)
5. Comprendre les crédits et dettes
6. Planifier l'épargne (tontine, banky, OFINA)
7. Préparer la retraite et l'urgence

TON ET STYLE :
- Amical et bienveillant (mipi-mipi 🤝)
- Concret avec des exemples locaux
- Encourageant et positif
- Utilise des comparaisons simples
- Parle français simple ou malgache selon l'utilisateur

RÈGLES IMPORTANTES :
- Ne donne jamais de conseils financiers risqués
- Encourage toujours l'épargne responsable
- Propose des solutions adaptées aux revenus malgaches
- Rappelle que l'épargne même petite est utile
`;

export async function POST(request: NextRequest) {
  try {
    const { message, history = [], userBudget, userGoals } = await request.json();

    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Message vide. Azafady, milaza zavatra (S'il vous plaît, dites quelque chose)" },
        { status: 400 }
      );
    }

    // Construire le contexte utilisateur
    let userContext = "";
    if (userBudget && userBudget.revenu > 0) {
      userContext += `\n\n📊 BUDGET UTILISATEUR :`;
      userContext += `\n- Revenu mensuel : ${userBudget.revenu.toLocaleString()} MGA`;
      if (userBudget.depenses) {
        userContext += `\n- Dépenses : ${JSON.stringify(userBudget.depenses)}`;
      }
      const epargneRecommande = Math.floor(userBudget.revenu * 0.2);
      userContext += `\n- Épargne recommandée : ${epargneRecommande.toLocaleString()} MGA/mois`;
    }
    
    if (userGoals) {
      userContext += `\n\n🎯 OBJECTIFS : ${userGoals}`;
    }

    const systemPrompt = FINANCIAL_CONTEXT + userContext;

    // Construire l'historique des messages
    const messages = [
      { role: "system" as const, content: systemPrompt },
      ...(history || []).slice(-10).map((msg: any) => ({
        role: msg.role === "user" ? "user" as const : "assistant" as const,
        content: msg.content,
      })),
      { role: "user" as const, content: message },
    ];

    // Appel à l'API OpenRouter
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-oss-120b:free",
      messages: messages,
      max_tokens: 800,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || 
      "Tsy azoko tsara ny olanao. Azafady, avereno resaka amin'ny teny hafa. (Je n'ai pas bien compris. Pouvez-vous reformuler s'il vous plaît ?)";

    // Extraire des suggestions financières
    const suggestions = extractFinancialSuggestions(response);

    return NextResponse.json({
      success: true,
      response: response,
      suggestions: suggestions,
    });
    
  } catch (error: any) {
    console.error("KAJY API Error:", error);
    
    // Fallback response
    const fallbackResponse = "Miala tsiny fa misy olana ara-teknika. Andramo averina aty aoriana. (Désolé, un problème technique est survenu. Réessayez plus tard.)";
    
    return NextResponse.json({
      success: false,
      response: fallbackResponse,
      suggestions: ["⚠️ Problème de connexion", "🔄 Rafraîchissez la page", "📱 Vérifiez votre connexion internet"],
    });
  }
}

// Fonction pour extraire des suggestions pratiques
function extractFinancialSuggestions(response: string): string[] {
  const suggestions: string[] = [];
  
  const lowerResponse = response.toLowerCase();
  
  if (lowerResponse.includes("économiser") || lowerResponse.includes("épargner") || lowerResponse.includes("tehirizana")) {
    suggestions.push("💡 Règle 50/30/20 : 50% besoins, 30% envies, 20% épargne");
  }
  
  if (lowerResponse.includes("budget") || lowerResponse.includes("fandaniana")) {
    suggestions.push("📊 Utilisez un carnet ou une app pour suivre vos dépenses");
  }
  
  if (lowerResponse.includes("tontine")) {
    suggestions.push("👥 La tontine est une excellente façon d'épargner en groupe");
  }
  
  if (lowerResponse.includes("dette") || lowerResponse.includes("trosa")) {
    suggestions.push("⚠️ Priorisez le remboursement des dettes à taux élevé");
  }
  
  if (lowerResponse.includes("investir") || lowerResponse.includes("vola")) {
    suggestions.push("🌱 Commencez petit : commerce, agriculture, petit élevage");
  }
  
  if (lowerResponse.includes("retraite")) {
    suggestions.push("🏦 Pensez à la retraite dès maintenant - COTISFA, assurances");
  }
  
  if (lowerResponse.includes("urgence")) {
    suggestions.push("🆙 Créez un fonds d'urgence = 3-6 mois de dépenses");
  }
  
  if (suggestions.length === 0) {
    suggestions.push("📖 Notez toutes vos dépenses pendant 1 mois");
    suggestions.push("🎯 Fixez-vous un objectif d'épargne réaliste");
    suggestions.push("🤝 Parlez de vos finances avec un proche de confiance");
  }
  
  return suggestions.slice(0, 4);
}

// GET - Pour vérifier que l'API fonctionne
export async function GET() {
  return NextResponse.json({
    name: "KAJY - Assistant Financier",
    version: "1.0.0",
    status: "online",
    description: "Votre conseiller financier malgache",
    example_questions: [
      "Comment économiser 100 000 Ar par mois ?",
      "Je gagne 300 000 Ar, comment gérer mon budget ?",
      "C'est quoi une tontine ?",
      "Comment préparer ma retraite ?",
      "Ahoana no hitsitsiana vola ho an'ny fianaran'ny zanako ?"
    ]
  });
}