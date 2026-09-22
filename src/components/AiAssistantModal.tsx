import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Sparkles, 
  X, 
  Send, 
  MessageCircle, 
  RotateCcw, 
  Maximize2, 
  Minimize2,
  ChevronRight,
  ShieldCheck,
  Truck,
  CheckCircle,
  HelpCircle,
  Smartphone
} from 'lucide-react';
import { COMPANY_INFO, buildWhatsAppUrl } from '../data/products';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: string;
}

const STARTER_PROMPTS = [
  "📱 iPhone 16 Pro Max en stock à Dakar ?",
  "💡 Meilleur smartphone à moins de 250 000 FCFA ?",
  "🚚 Comment se passe la livraison en < 2h ?",
  "🛡️ Que couvre la garantie 12 mois ?"
];

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Bonjour ! Je suis **Awa**, votre assistante high-tech chez **Easy Business Tech** à Dakar.\n\nJe peux vous orienter sur nos smartphones neufs garantis (**Apple, Samsung, Tecno, Xiaomi**), vous donner les prix nets en FCFA et vous expliquer la **livraison express en moins de 2h à Dakar** avec vérification du scellé avant paiement.\n\nComment puis-je vous aider aujourd'hui ?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build conversation history for API
      const conversationHistory = messages.slice(-5).map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationHistory
        }),
      });

      if (!res.ok) {
        throw new Error('Erreur de réponse serveur');
      }

      const data = await res.json();
      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: data.reply || "Je suis à votre disposition. Vous pouvez également nous contacter directement sur WhatsApp au +221 77 455 97 85.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMessage: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        role: 'assistant',
        text: "Nos conseillers sont également disponibles en direct sur WhatsApp pour répondre à toutes vos demandes de devis et disponibilité.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        text: "Conversation réinitialisée. En quoi puis-je vous renseigner sur nos smartphones, nos accessoires ou la livraison à Dakar ?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  };

  // Helper to render bold text and linebreaks nicely without external heavy parser
  const renderFormattedText = (content: string) => {
    // Process markdown links [text](url)
    const linkRegex = /\[(.*?)\]\((https?:\/\/.*?)\)/g;
    
    // Split lines
    const lines = content.split('\n');

    return (
      <div className="space-y-1.5 text-xs sm:text-[13px] leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) {
            return <div key={idx} className="h-1" />;
          }

          // Check if bullet point
          const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('• ') || line.trim().startsWith('* ');
          const cleanLine = isBullet ? line.trim().replace(/^[-•*]\s*/, '') : line;

          // Render line with bold replacement
          const parts = cleanLine.split(/(\*\*.*?\*\*)/g);

          return (
            <div key={idx} className={isBullet ? 'flex items-start gap-1.5 pl-2' : ''}>
              {isBullet && <span className="text-[#d8f537] mt-0.5">•</span>}
              <div className="flex-1">
                {parts.map((part, pIdx) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                      <strong key={pIdx} className="font-bold text-white">
                        {part.slice(2, -2)}
                      </strong>
                    );
                  }
                  
                  // Check if there are markdown links inside
                  if (part.includes('[') && part.includes('](')) {
                    const subElements: React.ReactNode[] = [];
                    let lastIndex = 0;
                    let match;
                    const r = /\[(.*?)\]\((https?:\/\/.*?)\)/g;
                    while ((match = r.exec(part)) !== null) {
                      if (match.index > lastIndex) {
                        subElements.push(part.substring(lastIndex, match.index));
                      }
                      subElements.push(
                        <a
                          key={match.index}
                          href={match[2]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#25d366] hover:text-[#d8f537] underline font-bold"
                        >
                          <MessageCircle className="w-3 h-3 inline fill-current" />
                          <span>{match[1]}</span>
                        </a>
                      );
                      lastIndex = r.lastIndex;
                    }
                    if (lastIndex < part.length) {
                      subElements.push(part.substring(lastIndex));
                    }
                    return <span key={pIdx}>{subElements}</span>;
                  }

                  return <span key={pIdx}>{part}</span>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-label="Assistant Commercial Intelligent Easy Business Tech"
      className="fixed inset-0 z-50 flex items-end sm:items-end justify-center sm:justify-end p-0 sm:p-6 pointer-events-none"
    >
      {/* Backdrop for mobile */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs sm:hidden pointer-events-auto"
      />

      {/* Main chat window */}
      <div 
        className={`pointer-events-auto w-full sm:w-[420px] ${
          isExpanded ? 'sm:w-[560px] h-[92vh] sm:h-[85vh]' : 'h-[85vh] sm:h-[580px] max-h-[92vh]'
        } flex flex-col bg-[#111319] border-t sm:border border-[#262936] rounded-t-3xl sm:rounded-3xl shadow-2xl shadow-black/90 overflow-hidden transition-all duration-300 relative z-10 animate-in fade-in slide-in-from-bottom-5`}
      >
        {/* Mobile handle indicator */}
        <div className="w-12 h-1 bg-gray-600/60 rounded-full mx-auto mt-2 sm:hidden shrink-0" />

        {/* Chat Header */}
        <div className="bg-[#161822] border-b border-[#242735] px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="relative">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[#d8f537]/20 to-[#25d366]/20 border border-[#d8f537]/40 flex items-center justify-center text-[#d8f537]">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#25d366] border-2 border-[#161822] animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-white font-tech">
                  Awa • Conseillère IA
                </h3>
                <span className="text-[9px] sm:text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-[#d8f537] text-black">
                  Easy Tech
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-gray-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25d366]" />
                En ligne • Réponses instantanées
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleReset}
              title="Réinitialiser la conversation"
              className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-[#202330] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? "Réduire la largeur" : "Agrandir la largeur"}
              className="hidden sm:block p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-[#202330] transition-colors cursor-pointer"
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={onClose}
              title="Fermer"
              className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-[#202330] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Reassurance strip */}
        <div className="bg-[#0f1015] px-3 py-1.5 border-b border-[#1c1e28] flex items-center justify-between text-[9px] sm:text-[10px] text-gray-400 shrink-0">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#d8f537]" />
            Garantie 12 Mois
          </span>
          <span className="flex items-center gap-1">
            <Truck className="w-3 h-3 text-[#25d366]" />
            Livraison Dakar &lt; 2h
          </span>
          <span className="text-[#d8f537] font-semibold">
            Prix en FCFA
          </span>
        </div>

        {/* Messages Body with smooth scrolling and high contrast */}
        <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 space-y-3 bg-[#0d0e13] overscroll-contain">
          {messages.map((message) => {
            const isUser = message.role === 'user';
            return (
              <div
                key={message.id}
                className={`flex gap-2 sm:gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#181b24] border border-[#272b38] flex items-center justify-center text-[#d8f537] shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                )}

                <div className={`max-w-[88%] sm:max-w-[85%] rounded-2xl px-3 py-2 sm:px-3.5 sm:py-2.5 ${
                  isUser
                    ? 'bg-[#d8f537] text-black rounded-tr-xs font-semibold'
                    : 'bg-[#151720] border border-[#242735] text-gray-100 rounded-tl-xs shadow-md'
                }`}>
                  {isUser ? (
                    <p className="text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap font-medium text-black">
                      {message.text}
                    </p>
                  ) : (
                    renderFormattedText(message.text)
                  )}

                  <div className={`mt-1 text-[9px] sm:text-[10px] text-right flex items-center justify-end gap-1 ${
                    isUser ? 'text-black/70' : 'text-gray-400'
                  }`}>
                    <span>{message.timestamp}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 text-gray-300 text-xs py-2 px-3 bg-[#151720] border border-[#242735] rounded-2xl w-fit">
              <span className="w-2 h-2 rounded-full bg-[#d8f537] animate-ping" />
              <span className="text-[11px]">Awa est en train d'écrire...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Questions */}
        <div className="bg-[#12141c] border-t border-[#1e212d] p-1.5 sm:p-2 overflow-x-auto scrollbar-none flex items-center gap-1.5 shrink-0">
          {STARTER_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-[10px] sm:text-[11px] whitespace-nowrap bg-[#181a24] hover:bg-[#222533] text-gray-200 hover:text-white px-2 sm:px-2.5 py-1.5 rounded-lg border border-[#292c3a] transition-colors cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-2.5 sm:p-3 bg-[#161822] border-t border-[#222533] shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Posez votre question à Awa..."
              disabled={isLoading}
              className="flex-1 bg-[#0e1016] border border-[#262a38] text-xs text-white placeholder-gray-400 px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#d8f537] transition-colors disabled:opacity-60"
            />

            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-2.5 bg-[#d8f537] hover:bg-[#cbe62e] disabled:bg-gray-800 text-black disabled:text-gray-500 rounded-xl transition-colors cursor-pointer disabled:cursor-not-allowed shrink-0"
              aria-label="Envoyer le message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Quick WhatsApp Escalate Link */}
          <div className="mt-2 flex items-center justify-between text-[10px] sm:text-[11px] text-gray-400">
            <span>Besoin d'un humain ?</span>
            <a
              href={buildWhatsAppUrl("Bonjour Easy Business Tech, je discutais avec l'assistante Awa et je souhaite commander.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25d366] hover:underline font-bold flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp direct</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
