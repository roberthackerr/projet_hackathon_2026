"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Bot,
  Loader2,
  Phone,
  PhoneOff,
  Sparkles,
  X,
  Minimize2,
  Maximize2,
} from "lucide-react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function VoiceAI() {
  // États
  const [isCallActive, setIsCallActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentResponse, setCurrentResponse] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [waveIntensity, setWaveIntensity] = useState(0);
  
  // Refs
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number>();

  // Initialiser la reconnaissance vocale
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (typeof window !== "undefined" && SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "fr-FR";

      recognition.onstart = () => {
        setIsListening(true);
        simulateWaveIntensity();
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleUserMessage(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
        setWaveIntensity(0);
      };

      recognition.onend = () => {
        setIsListening(false);
        setWaveIntensity(0);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Simuler l'intensité des vagues en fonction du volume
  const simulateWaveIntensity = () => {
    if (!isListening) return;
    
    // Simuler des variations d'intensité
    const intensity = Math.random() * 100;
    setWaveIntensity(intensity);
    
    animationFrameRef.current = requestAnimationFrame(simulateWaveIntensity);
  };

  // Gérer le message utilisateur
  const handleUserMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsThinking(true);
    
    try {
      const response = await fetch("/api/voice-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-5),
        }),
      });

      const result = await response.json();

      if (result.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: result.response,
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        speakResponse(result.response);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsThinking(false);
    }
  };

  // Réponse vocale
  const speakResponse = (text: string) => {
    setIsSpeaking(true);
    setCurrentResponse(text);
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    utterance.rate = 1;
    utterance.pitch = 1;
    
    utterance.onend = () => {
      setIsSpeaking(false);
      setTimeout(() => setCurrentResponse(""), 1000);
    };
    
    utterance.onerror = () => {
      setIsSpeaking(false);
    };
    
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  // Démarrer l'appel
  const startCall = () => {
    setIsCallActive(true);
    // Message de bienvenue
    setTimeout(() => {
      const welcomeMessage = "Bonjour ! Je suis votre assistant vocal. Comment puis-je vous aider aujourd'hui ?";
      speakResponse(welcomeMessage);
    }, 500);
  };

  // Terminer l'appel
  const endCall = () => {
    setIsCallActive(false);
    setMessages([]);
    setCurrentResponse("");
    setIsListening(false);
    setIsThinking(false);
    setIsSpeaking(false);
    setWaveIntensity(0);
    window.speechSynthesis.cancel();
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  // Basculer l'écoute
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
  };

  // Stop speaking
  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className={cn(
      "fixed transition-all duration-500 z-50",
      isMinimized 
        ? "bottom-4 right-4 w-72" 
        : "inset-0 md:inset-8 md:rounded-3xl bg-gradient-to-br from-[#0a0a2e] via-[#0d0d35] to-[#0a0a2e]"
    )}>
      {/* Container principal */}
      <div className={cn(
        "relative h-full flex flex-col overflow-hidden",
        !isMinimized && "md:rounded-3xl border border-white/10 bg-black/30 backdrop-blur-2xl"
      )}>
        
        {/* Header */}
        <div className="relative px-6 py-4 border-b border-white/10 bg-black/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full blur-xl animate-pulse" />
                <div className="relative p-2 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                {isCallActive && (
                  <div className="absolute -top-1 -right-1">
                    <div className="h-2.5 w-2.5 bg-green-500 rounded-full animate-ping" />
                    <div className="absolute h-2.5 w-2.5 bg-green-500 rounded-full" />
                  </div>
                )}
              </div>
              
              {!isMinimized && (
                <div>
                  <h2 className="font-semibold text-white">Voice AI Assistant</h2>
                  <p className="text-xs text-slate-400">
                    {isCallActive 
                      ? isListening ? "Vous parlez..." : isThinking ? "IA réfléchit..." : isSpeaking ? "IA parle..." : "En ligne"
                      : "Hors ligne"}
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 rounded-full hover:bg-white/10 transition"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4 text-slate-400" /> : <Minimize2 className="h-4 w-4 text-slate-400" />}
              </button>
              {isCallActive && (
                <button
                  onClick={endCall}
                  className="p-2 rounded-full hover:bg-white/10 transition text-red-400"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Messages (uniquement quand non minimisé) */}
        {!isMinimized && (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="max-w-2xl mx-auto w-full">
              {messages.length === 0 && !isCallActive && (
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full blur-3xl animate-pulse opacity-30" />
                    <Phone className="relative h-20 w-20 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Appel Vocal IA</h3>
                  <p className="text-slate-400 max-w-md">
                    Cliquez sur le téléphone pour démarrer un appel vocal avec votre assistant IA.
                  </p>
                </div>
              )}

              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}
                  >
                    <div className={cn(
                      "inline-block max-w-[80%] rounded-2xl px-4 py-2",
                      message.role === "user"
                        ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-white"
                        : "bg-white/10 text-slate-200"
                    )}>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">{formatTime(message.timestamp)}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isThinking && (
                <div className="text-left mb-4">
                  <div className="inline-block bg-white/10 rounded-2xl px-4 py-2">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Zone d'appel - Vagues animées */}
        <div className={cn(
          "relative transition-all duration-500",
          isMinimized ? "p-4" : "p-8 border-t border-white/10 bg-black/20"
        )}>
          <div className="max-w-2xl mx-auto text-center">
            
            {/* Vagues animées - Style Siri/Call */}
            <div className="relative flex justify-center items-center mb-6">
              <div className="relative">
                {/* Anneaux de vagues */}
                {(isListening || isSpeaking) && (
                  <>
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 2],
                        opacity: [0.6, 0.3, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                      className="absolute inset-0 rounded-full border-2 border-cyan-400"
                      style={{ width: 100, height: 100, left: -20, top: -20 }}
                    />
                    <motion.div
                      animate={{
                        scale: [1, 1.8, 2.5],
                        opacity: [0.5, 0.2, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: 0.3,
                        ease: "easeOut",
                      }}
                      className="absolute inset-0 rounded-full border-2 border-emerald-400"
                      style={{ width: 100, height: 100, left: -20, top: -20 }}
                    />
                    <motion.div
                      animate={{
                        scale: [1, 2, 3],
                        opacity: [0.4, 0.1, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: 0.6,
                        ease: "easeOut",
                      }}
                      className="absolute inset-0 rounded-full border-2 border-violet-400"
                      style={{ width: 100, height: 100, left: -20, top: -20 }}
                    />
                  </>
                )}

                {/* Visualisation des vagues (barres) */}
                <div className="flex items-center justify-center gap-1 h-20">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: (isListening || isSpeaking) 
                          ? [4, Math.max(4, (waveIntensity * (i + 1) / 100) * 40), 4]
                          : 4,
                      }}
                      transition={{
                        duration: 0.3,
                        repeat: (isListening || isSpeaking) ? Infinity : 0,
                        delay: i * 0.03,
                      }}
                      className="w-1.5 bg-gradient-to-t from-cyan-400 to-emerald-400 rounded-full"
                      style={{ height: 4 }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* État actuel */}
            <div className="mb-6">
              {isCallActive && (
                <p className="text-sm text-slate-400">
                  {isListening && "🎤 Vous parlez..."}
                  {isThinking && "🧠 IA réfléchit..."}
                  {isSpeaking && "🔊 IA parle..."}
                  {!isListening && !isThinking && !isSpeaking && "📞 En ligne - Cliquez sur le micro pour parler"}
                </p>
              )}
              
              {currentResponse && isSpeaking && (
                <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                  "{currentResponse.slice(0, 100)}..."
                </p>
              )}
            </div>

            {/* Boutons de contrôle */}
            <div className="flex items-center justify-center gap-6">
              {!isCallActive ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startCall}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition" />
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 shadow-2xl">
                    <Phone className="h-10 w-10 text-white" />
                  </div>
                </motion.button>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleListening}
                    className="relative group"
                    disabled={isThinking || isSpeaking}
                  >
                    <div className={cn(
                      "absolute inset-0 rounded-full blur-2xl transition",
                      isListening ? "bg-red-500/50" : "bg-cyan-500/30"
                    )} />
                    <div className={cn(
                      "relative flex h-20 w-20 items-center justify-center rounded-full transition-all",
                      isListening
                        ? "bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/50 animate-pulse"
                        : "bg-gradient-to-r from-cyan-500 to-emerald-500 hover:shadow-lg hover:shadow-cyan-500/50"
                    )}>
                      {isListening ? (
                        <MicOff className="h-8 w-8 text-white" />
                      ) : (
                        <Mic className="h-8 w-8 text-white" />
                      )}
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={endCall}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-red-500 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition" />
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500">
                      <PhoneOff className="h-6 w-6 text-white" />
                    </div>
                  </motion.button>

                  {isSpeaking && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={stopSpeaking}
                      className="relative group"
                    >
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/20 hover:bg-yellow-500/30 transition">
                        <VolumeX className="h-5 w-5 text-yellow-400" />
                      </div>
                    </motion.button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Indicateur de connexion */}
        {isCallActive && !isMinimized && (
          <div className="px-6 py-2 border-t border-white/10 bg-black/20">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <div className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  isCallActive ? "bg-green-500 animate-pulse" : "bg-red-500"
                )} />
                <span>Appel actif</span>
              </div>
              <span>•</span>
              <span>Chiffré</span>
              <span>•</span>
              <span>HD Voice</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}