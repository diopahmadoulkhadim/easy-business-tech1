import React, { useState } from 'react';
import { buildWhatsAppUrl, COMPANY_INFO } from '../data/products';
import { MessageCircle, X, Sparkles, Bot } from 'lucide-react';

interface FloatingWhatsAppProps {
  onOpenAiAssistant?: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenAiAssistant }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  // Exact requested WhatsApp link with default pre-filled message
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <aside aria-label="Boutons de contact et assistance rapide" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5">
      {/* AI Assistant Quick Launcher Bubble */}
      {onOpenAiAssistant && (
        <button
          onClick={onOpenAiAssistant}
          aria-label="Ouvrir l'assistant intelligent IA"
          className="group flex items-center gap-2 bg-[#151722] hover:bg-[#1e2130] text-[#d8f537] border border-[#d8f537]/40 px-3.5 py-2.5 rounded-full shadow-xl shadow-black/60 hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <div className="relative">
            <Bot className="w-4 h-4 text-[#d8f537]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#d8f537] animate-ping" />
          </div>
          <span className="text-xs font-bold text-white group-hover:text-[#d8f537] transition-colors">
            Assistant IA Awa
          </span>
          <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-[#d8f537] text-black">
            24/7
          </span>
        </button>
      )}

      {/* Tooltip bubble with status - hidden on very small screens to avoid obstructing view */}
      {showTooltip && (
        <div className="hidden sm:block mb-1 relative bg-[#13151b] border border-[#25d366]/40 text-white p-3.5 rounded-2xl shadow-2xl max-w-[280px] sm:max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label="Fermer la bulle d'aide"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          
          {/* Contact Profile in bubble */}
          <div className="flex items-center gap-2.5 mb-2 pb-2 border-b border-[#20232d]">
            <div className="relative w-9 h-9 rounded-full p-0.5 bg-gradient-to-tr from-[#d8f537] to-[#25d366] shrink-0">
              <img 
                src={COMPANY_INFO.profileImage} 
                alt={COMPANY_INFO.founderName} 
                className="w-full h-full object-cover rounded-full bg-[#181a1f]"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25d366] border-2 border-[#13151b]" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-white block leading-tight truncate">
                {COMPANY_INFO.founderName}
              </span>
              <span className="text-[10px] text-[#25d366] flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25d366] animate-pulse" />
                Service Client • En ligne
              </span>
            </div>
          </div>
          
          <p className="text-xs text-gray-200 leading-snug pr-4">
            Une question sur un smartphone ou un accessoire ? Discutez en direct avec nous.
          </p>
          
          <div className="mt-2 pt-2 border-t border-[#20232c] flex items-center justify-between text-[11px] text-gray-400">
            <span className="font-mono text-[#d8f537] font-semibold">{COMPANY_INFO.phone}</span>
            <span className="text-[10px] text-gray-500">Réponse &lt; 15 min</span>
          </div>
        </div>
      )}

      {/* Prominent floating button with label on hover/desktop */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ouvrir WhatsApp avec Easy Business Tech au ${COMPANY_INFO.phone}`}
        className="group relative flex items-center gap-2.5 bg-[#25d366] hover:bg-[#20ba5a] text-black px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-2xl shadow-[#25d366]/40 hover:scale-105 transition-all duration-300 border-2 border-white/20"
      >
        {/* Pulsing indicator badge */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d8f537] opacity-80"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#d8f537] text-[9px] font-black text-black items-center justify-center">
            1
          </span>
        </span>

        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-current shrink-0" />
        
        <div className="flex flex-col text-left leading-tight">
          <span className="text-xs sm:text-sm font-black uppercase tracking-tight">
            WhatsApp Direct
          </span>
          <span className="text-[10px] sm:text-[11px] font-bold text-black/80 font-mono hidden sm:inline">
            {COMPANY_INFO.phone}
          </span>
        </div>
      </a>
    </aside>
  );
};

