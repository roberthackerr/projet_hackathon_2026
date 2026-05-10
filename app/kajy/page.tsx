// app/kajy/page.tsx

"use client";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

import {
  Coins,
  Wallet,
  Send,
  Loader2,
  User,
  Bot,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Shield,
  PiggyBank,
  Landmark,
  Target,
  ShieldAlert,
  CheckCircle2,
  BadgeDollarSign,
} from "lucide-react";

import { useRouter } from "next/navigation";

interface Message {
  id: string;

  role:
    | "user"
    | "assistant";

  content: string;

  timestamp: Date;

  suggestions?: string[];
}

/**
 * Detect AI content type
 */
function detectMessageType(
  text: string
) {
  const lower =
    text.toLowerCase();

  if (
    lower.includes(
      "attention"
    ) ||
    lower.includes(
      "danger"
    ) ||
    lower.includes(
      "risque"
    ) ||
    lower.includes(
      "arnaque"
    )
  ) {
    return "warning";
  }

  if (
    lower.includes(
      "conseil"
    ) ||
    lower.includes(
      "astuce"
    ) ||
    lower.includes(
      "recommandation"
    )
  ) {
    return "success";
  }

  if (
    lower.includes(
      "%"
    ) ||
    lower.includes(
      "ariary"
    ) ||
    lower.includes(
      "ar"
    ) ||
    lower.includes(
      "budget"
    ) ||
    lower.includes(
      "épargne"
    ) ||
    lower.includes(
      "revenu"
    )
  ) {
    return "finance";
  }

  return "default";
}

/**
 * Message styles
 */
function getMessageStyles(
  type: string
) {
  switch (type) {
    case "warning":
      return {
        wrapper:
          "border-red-500/20 bg-red-500/10",

        icon: (
          <ShieldAlert className="h-5 w-5 text-red-400" />
        ),
      };

    case "success":
      return {
        wrapper:
          "border-emerald-500/20 bg-emerald-500/10",

        icon: (
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
        ),
      };

    case "finance":
      return {
        wrapper:
          "border-amber-500/20 bg-amber-500/10",

        icon: (
          <BadgeDollarSign className="h-5 w-5 text-amber-400" />
        ),
      };

    default:
      return {
        wrapper:
          "border-white/10 bg-white/[0.04]",

        icon: (
          <Sparkles className="h-5 w-5 text-cyan-400" />
        ),
      };
  }
}

export default function KajyPage() {
  const router =
    useRouter();

  /**
   * States
   */
  const [messages, setMessages] =
    useState<Message[]>([]);

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [showBudget, setShowBudget] =
    useState(false);

  const [budget, setBudget] =
    useState(0);

  const messagesEndRef =
    useRef<HTMLDivElement>(null);

  /**
   * Auto scroll
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView(
      {
        behavior:
          "smooth",
      }
    );
  }, [messages]);

  /**
   * Format MGA
   */
  function formatMoney(
    amount: number
  ) {
    return new Intl.NumberFormat(
      "fr-FR"
    ).format(amount);
  }

  /**
   * Send message
   */
  async function sendMessage() {
    if (
      !input.trim() ||
      loading
    )
      return;

    const userMessage: Message =
      {
        id:
          Date.now().toString(),

        role: "user",

        content:
          input,

        timestamp:
          new Date(),
      };

    setMessages(
      (prev) => [
        ...prev,
        userMessage,
      ]
    );

    const currentInput =
      input;

    setInput("");

    setLoading(true);

    try {
      const response =
        await fetch(
          "/api/kajy",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              {
                message:
                  currentInput,

                history:
                  messages,

                userBudget:
                  budget > 0
                    ? {
                        revenu:
                          budget,
                      }
                    : null,
              }
            ),
          }
        );

      const data =
        await response.json();

      const aiMessage: Message =
        {
          id:
            (
              Date.now() +
              1
            ).toString(),

          role:
            "assistant",

          content:
            data.response,

          timestamp:
            new Date(),

          suggestions:
            data.suggestions,
        };

      setMessages(
        (prev) => [
          ...prev,
          aiMessage,
        ]
      );
    } catch (error) {
      console.error(
        error
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-amber-500/20 blur-[140px]" />

        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-yellow-500/10 blur-[140px]" />

        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[120px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-3xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          {/* Left */}
          <div className="flex items-center gap-5">

            <button
              onClick={() =>
                router.back()
              }
              className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl transition hover:bg-white/10"
            >

              <ArrowLeft className="h-5 w-5 text-amber-400" />

            </button>

            <div className="flex items-center gap-4">

              {/* Logo */}
              <div className="relative">

                <div className="absolute inset-0 rounded-full bg-amber-500 blur-2xl opacity-60" />

                <div className="relative flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 shadow-[0_0_50px_rgba(245,158,11,0.4)]">

                  <Coins className="h-7 w-7 text-white" />

                </div>
              </div>

              {/* Text */}
              <div>

                <h1 className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-3xl font-black tracking-tight text-transparent">

                  KAJY AI

                </h1>

                <p className="text-xs uppercase tracking-[0.3em] text-amber-400/80">

                  Financial Intelligence Madagascar

                </p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-5">

            <div className="flex items-center gap-2">

              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

              <span className="text-xs text-emerald-300">

                AI ONLINE

              </span>
            </div>

            <button
              onClick={() =>
                setShowBudget(
                  !showBudget
                )
              }
              className="rounded-2xl border border-amber-400/20 bg-amber-500/10 px-5 py-3 text-sm text-amber-300 backdrop-blur-2xl transition hover:bg-amber-500/20"
            >

              Mon budget

            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-10">

        {/* Stats */}
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-4">

        

        </div>

        {/* Budget */}
        <AnimatePresence>

          {showBudget && (
            <motion.div
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              className="mb-10 overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-3xl"
            >

              <div className="mb-6 flex items-center gap-3">

                <Wallet className="h-6 w-6 text-amber-400" />

                <h2 className="text-3xl font-black">

                  Mon budget

                </h2>
              </div>

              <input
                type="number"
                value={
                  budget || ""
                }
                onChange={(
                  e
                ) =>
                  setBudget(
                    Number(
                      e.target
                        .value
                    )
                  )
                }
                placeholder="Ex: 500000"
                className="w-full rounded-[32px] border border-white/10 bg-white/[0.04] px-6 py-5 text-lg text-white shadow-[0_0_60px_rgba(245,158,11,0.08)] outline-none backdrop-blur-3xl placeholder:text-slate-500 focus:border-amber-400/40"
              />

              {budget >
                0 && (
                <div className="mt-8">

                  <div className="flex items-center justify-between">

                    <span className="text-slate-400">

                      Épargne conseillée

                    </span>

                    <span className="text-amber-300">

                      {formatMoney(
                        budget *
                          0.2
                      )}{" "}
                      Ar

                    </span>
                  </div>

                  <div className="mt-4 h-4 overflow-hidden rounded-full bg-white/10">

                    <div
                      style={{
                        width:
                          "20%",
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-500"
                    />

                  </div>
                </div>
              )}

            </motion.div>
          )}

        </AnimatePresence>

        {/* Hero */}
        {messages.length ===
          0 && (
          <div className="flex min-h-[55vh] flex-col items-center justify-center text-center">

            <motion.div
              animate={{
                y: [
                  0,
                  -10,
                  0,
                ],
              }}
              transition={{
                repeat:
                  Infinity,

                duration: 4,
              }}
              className="relative"
            >

              <div className="absolute inset-0 rounded-full bg-amber-500 blur-[120px] opacity-40" />

              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-amber-400/20 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-3xl">

                <Coins className="h-20 w-20 text-amber-300" />

              </div>

            </motion.div>

            <h2 className="mt-12 bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-7xl font-black tracking-tight text-transparent">

              KAJY AI

            </h2>

            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-slate-400">

              L’intelligence financière conçue à Madagascar
              pour aider les familles malgaches à économiser,
              investir et construire leur avenir.

            </p>
          </div>
        )}

        {/* Messages */}
        <div className="mx-auto max-w-4xl space-y-8 pb-40">

          <AnimatePresence>

            {messages.map(
              (
                message
              ) => (
                <motion.div
                  key={
                    message.id
                  }
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className={`flex ${
                    message.role ===
                    "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[85%] rounded-[32px] border px-7 py-5 shadow-[0_0_50px_rgba(245,158,11,0.15)] backdrop-blur-3xl ${
                      message.role ===
                      "user"
                        ? "border-amber-400/20 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-white"
                        : `${
                            getMessageStyles(
                              detectMessageType(
                                message.content
                              )
                            ).wrapper
                          } text-slate-200`
                    }`}
                  >

                    {/* Header */}
                    <div className="mb-5 flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">

                        {message.role ===
                        "assistant" ? (
                          getMessageStyles(
                            detectMessageType(
                              message.content
                            )
                          ).icon
                        ) : (
                          <User className="h-5 w-5" />
                        )}

                      </div>

                      <div>

                        <h4 className="font-bold">

                          {message.role ===
                          "assistant"
                            ? "KAJY AI"
                            : "Vous"}

                        </h4>

                        <p className="text-xs opacity-60">

                          {new Date(
                            message.timestamp
                          ).toLocaleTimeString()}

                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    {message.role ===
                    "assistant" ? (
                      <div className="prose prose-invert max-w-none">

                        <ReactMarkdown
                          remarkPlugins={[
                            remarkGfm,
                          ]}
                          components={{
                            h1: ({
                              children,
                            }) => (
                              <h1 className="mb-6 mt-8 bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-5xl font-black text-transparent">

                                {
                                  children
                                }

                              </h1>
                            ),

                            h2: ({
                              children,
                            }) => (
                              <h2 className="mb-5 mt-8 text-3xl font-black text-amber-300">

                                {
                                  children
                                }

                              </h2>
                            ),

                            h3: ({
                              children,
                            }) => (
                              <h3 className="mb-4 mt-7 text-2xl font-bold text-yellow-300">

                                {
                                  children
                                }

                              </h3>
                            ),

                            p: ({
                              children,
                            }) => (
                              <p className="mb-5 text-lg leading-9 text-slate-200">

                                {
                                  children
                                }

                              </p>
                            ),

                            strong:
                              ({
                                children,
                              }) => (
                                <strong className="rounded-xl border border-amber-400/10 bg-amber-500/10 px-2 py-1 font-bold text-amber-300">

                                  {
                                    children
                                  }

                                </strong>
                              ),

                            ul: ({
                              children,
                            }) => (
                              <ul className="mb-6 ml-6 list-disc space-y-3 text-lg text-slate-200">

                                {
                                  children
                                }

                              </ul>
                            ),

                            ol: ({
                              children,
                            }) => (
                              <ol className="mb-6 ml-6 list-decimal space-y-3 text-lg text-slate-200">

                                {
                                  children
                                }

                              </ol>
                            ),

                            li: ({
                              children,
                            }) => (
                              <li className="leading-8">

                                {
                                  children
                                }

                              </li>
                            ),

                            code: ({
                              children,
                            }) => (
                              <code className="rounded-xl border border-amber-500/20 bg-black/40 px-3 py-2 text-sm text-amber-300">

                                {
                                  children
                                }

                              </code>
                            ),

                            blockquote:
                              ({
                                children,
                              }) => (
                                <blockquote className="my-8 rounded-r-2xl border-l-4 border-amber-400 bg-amber-500/10 py-5 pl-6 text-lg italic text-slate-300">

                                  {
                                    children
                                  }

                                </blockquote>
                              ),

                            table: ({
                              children,
                            }) => (
                              <div className="my-8 overflow-x-auto rounded-3xl border border-white/10">

                                <table className="w-full border-collapse overflow-hidden">

                                  {
                                    children
                                  }

                                </table>
                              </div>
                            ),

                            th: ({
                              children,
                            }) => (
                              <th className="border border-white/10 bg-amber-500/10 px-5 py-4 text-left text-lg font-bold text-amber-300">

                                {
                                  children
                                }

                              </th>
                            ),

                            td: ({
                              children,
                            }) => (
                              <td className="border border-white/10 px-5 py-4 text-slate-200">

                                {
                                  children
                                }

                              </td>
                            ),

                            hr: () => (
                              <div className="my-8 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
                            ),
                          }}
                        >

                          {
                            message.content
                          }

                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap leading-relaxed">

                        {
                          message.content
                        }

                      </p>
                    )}

                  </div>
                </motion.div>
              )
            )}

          </AnimatePresence>

          {/* Loading */}
          {loading && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              className="flex justify-start"
            >

              <div className="rounded-[32px] border border-white/10 bg-white/[0.04] px-7 py-5 backdrop-blur-3xl">

                <div className="mb-3 flex items-center gap-3">

                  <Loader2 className="h-5 w-5 animate-spin text-amber-400" />

                  <span className="font-semibold text-amber-300">

                    KAJY analyse votre situation...

                  </span>
                </div>

              </div>
            </motion.div>
          )}

          <div
            ref={
              messagesEndRef
            }
          />
        </div>
      </div>

      {/* Input */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/40 backdrop-blur-3xl">

        <div className="mx-auto max-w-5xl px-6 py-5">

          <div className="relative">

            <input
              value={input}
              onChange={(
                e
              ) =>
                setInput(
                  e.target
                    .value
                )
              }
              onKeyDown={(
                e
              ) => {
                if (
                  e.key ===
                  "Enter"
                ) {
                  sendMessage();
                }
              }}
              placeholder="Mametraha fanontaniana..."
              className="w-full rounded-[32px] border border-white/10 bg-white/[0.04] px-6 py-5 pr-20 text-lg text-white shadow-[0_0_60px_rgba(245,158,11,0.08)] outline-none backdrop-blur-3xl placeholder:text-slate-500 focus:border-amber-400/40"
            />

            <button
              onClick={
                sendMessage
              }
              disabled={
                !input.trim() ||
                loading
              }
              className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 p-4 shadow-[0_0_40px_rgba(245,158,11,0.4)] transition-all hover:scale-105 disabled:opacity-50"
            >

              <Send className="h-5 w-5 text-white" />

            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">

            <Sparkles className="h-4 w-4 text-amber-400" />

            Conçu à Madagascar pour les familles malgaches 🇲🇬

          </div>
        </div>
      </div>
    </main>
  );
}