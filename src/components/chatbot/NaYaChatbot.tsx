import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2, ExternalLink } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const NaYaChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Bonjour ! 👋 Je suis NaYa, votre assistante Flash Trade. Comment puis-je vous aider aujourd'hui ? Êtes-vous intéressé par l'importation de produits depuis la Chine ?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/naya-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: [...messages, userMessage].map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur de connexion");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const jsonStr = line.slice(6).trim();
              if (jsonStr === "[DONE]") continue;

              try {
                const parsed = JSON.parse(jsonStr);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  assistantContent += content;
                  setMessages((prev) => {
                    const last = prev[prev.length - 1];
                    if (last?.role === "assistant" && prev.length > 1) {
                      return prev.map((m, i) =>
                        i === prev.length - 1 ? { ...m, content: assistantContent } : m
                      );
                    }
                    return [...prev, { role: "assistant", content: assistantContent }];
                  });
                }
              } catch {
                // Skip malformed JSON
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Désolé, je rencontre un problème technique. Contactez-nous directement sur WhatsApp au +237 653 207 472.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const generateWhatsAppMessage = () => {
    const conversationSummary = messages
      .slice(1)
      .map((m) => `${m.role === "user" ? "Client" : "NaYa"}: ${m.content}`)
      .join("\n");
    
    const message = `Bonjour Flash Trade,\n\nVoici ma conversation avec NaYa:\n\n${conversationSummary}\n\nMerci de me recontacter.`;
    return `https://wa.me/237653207472?text=${encodeURIComponent(message)}`;
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-6 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full bg-navy 
                     flex items-center justify-center shadow-xl hover:bg-navy-light transition-colors
                     ring-4 ring-gold/30"
            aria-label="Ouvrir le chat NaYa"
          >
            <Bot className="w-7 h-7 md:w-8 md:h-8 text-gold" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-md h-[500px] md:h-[600px]
                     bg-card rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-navy p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                  <Bot className="w-6 h-6 text-navy" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-cream">NaYa</h3>
                  <p className="text-xs text-cream/70">Assistante Flash Trade</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5 text-cream" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      message.role === "user" ? "bg-gold" : "bg-navy"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="w-4 h-4 text-navy" />
                    ) : (
                      <Bot className="w-4 h-4 text-gold" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-navy text-cream rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center">
                    <Bot className="w-4 h-4 text-gold" />
                  </div>
                  <div className="bg-muted p-3 rounded-2xl rounded-bl-md">
                    <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* WhatsApp CTA */}
            {messages.length > 3 && (
              <div className="px-4 py-2 bg-gold/10 border-t border-gold/20">
                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-navy 
                           hover:text-gold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Continuer sur WhatsApp
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Écrivez votre message..."
                  className="flex-1 px-4 py-2.5 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground 
                           focus:outline-none focus:ring-2 focus:ring-gold"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 bg-navy text-cream rounded-xl hover:bg-gold hover:text-navy 
                           transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                ⚠️ Les estimations sont indicatives et non contractuelles
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NaYaChatbot;
