import React, { useState } from 'react';
import { PageId } from '../types';
import { COMPANY_INFO, buildWhatsAppUrl } from '../data/products';
import { ThemeToggle } from './ThemeToggle';
import { 
  Smartphone, 
  MessageCircle, 
  Phone, 
  Menu, 
  X, 
  Sparkles, 
  MapPin, 
  ShieldCheck,
  ChevronRight,
  Bot,
  Search
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenProductSearch?: () => void;
  onOpenAiAssistant?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onNavigate, 
  onOpenProductSearch,
  onOpenAiAssistant 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'produits', label: 'Bestsellers & Produits' },
    { id: 'services', label: 'Services' },
    { id: 'apropos', label: 'À propos' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1f2127] bg-[#0c0d10]/95 backdrop-blur-md">
      {/* Top micro announcement bar */}
      <div className="bg-[#121317] border-b border-[#1b1d22] px-4 py-1.5 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#d8f537] font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              Boutique Officielle à Dakar
            </span>
            <span className="hidden md:inline text-gray-600">•</span>
            <span className="hidden md:flex items-center gap-1 text-gray-300">
              <MapPin className="w-3 h-3 text-gray-400" />
              {COMPANY_INFO.address}
            </span>
            <span className="hidden lg:inline text-gray-600">•</span>
            <span className="hidden lg:flex items-center gap-1 text-gray-400">
              <ShieldCheck className="w-3 h-3 text-[#d8f537]" />
              Appareils neufs & 100% garantis
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="flex items-center gap-1.5 text-gray-300 hover:text-[#d8f537] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#d8f537]" />
              <span className="font-semibold">{COMPANY_INFO.phone}</span>
            </a>
            <span className="text-gray-600">|</span>
            <a 
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d8f537] hover:underline flex items-center gap-1 font-medium"
            >
              <span className="w-2 h-2 rounded-full bg-[#d8f537] animate-pulse"></span>
              WhatsApp direct
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo with Profile Picture */}
        <button 
          onClick={() => handleNavClick('accueil')}
          className="flex items-center gap-2.5 sm:gap-3 text-left group cursor-pointer focus:outline-none"
        >
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full p-0.5 bg-gradient-to-tr from-[#d8f537] via-[#25d366] to-[#d8f537] shadow-lg shadow-[#d8f537]/10 group-hover:scale-105 transition-transform shrink-0">
            <img 
              src={COMPANY_INFO.profileImage} 
              alt="Profil Easy Business Tech" 
              className="w-full h-full object-cover rounded-full bg-[#181a1f]"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25d366] border-2 border-[#0c0d10]" title="Profil vérifié" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-white font-tech">
                EASY BUSINESS
              </span>
              <span className="text-[10px] sm:text-xs font-black px-1.5 py-0.5 rounded bg-[#d8f537] text-[#0c0d10] font-tech uppercase tracking-wider">
                TECH
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-gray-400 tracking-wide">
              Smartphones & Accessoires • Dakar
            </p>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 bg-[#141519] border border-[#20222a] p-1.5 rounded-full">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#d8f537] text-[#0c0d10] shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-[#1f2129]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-2.5">
          <ThemeToggle variant="icon" />

          <button
            onClick={() => {
              if (onOpenProductSearch) {
                onOpenProductSearch();
              } else {
                handleNavClick('produits');
              }
            }}
            className="flex items-center gap-2 bg-[#14161c] hover:bg-[#1d2029] border border-[#272a38] text-gray-200 hover:text-[#d8f537] px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-sm cursor-pointer"
            title="Rechercher un modèle en temps réel"
          >
            <Search className="w-3.5 h-3.5 text-[#d8f537]" />
            <span>Rechercher</span>
          </button>

          {onOpenAiAssistant && (
            <button
              onClick={onOpenAiAssistant}
              className="flex items-center gap-2 bg-[#171922] hover:bg-[#202330] border border-[#d8f537]/50 text-[#d8f537] px-3 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all shadow-sm hover:scale-105 cursor-pointer"
            >
              <Bot className="w-4 h-4 text-[#d8f537]" />
              <span>Assistant IA</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#d8f537] animate-ping" />
            </button>
          )}

          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25d366]/15 hover:bg-[#25d366]/25 border border-[#25d366]/40 text-[#25d366] px-3.5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all shadow-sm"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={() => handleNavClick('contact')}
            className="flex items-center gap-2 bg-[#d8f537] hover:bg-[#c9e62f] text-[#0c0d10] px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer"
          >
            <span>Demander un devis</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle variant="icon" className="p-2" />

          <button
            onClick={() => {
              if (onOpenProductSearch) {
                onOpenProductSearch();
              } else {
                handleNavClick('produits');
              }
            }}
            aria-label="Rechercher des produits"
            className="p-2 rounded-lg bg-[#15171e] text-[#d8f537] border border-[#262835]"
          >
            <Search className="w-5 h-5" />
          </button>
          {onOpenAiAssistant && (
            <button
              onClick={onOpenAiAssistant}
              aria-label="Assistant IA"
              className="p-2 rounded-lg bg-[#181a24] text-[#d8f537] border border-[#d8f537]/40"
            >
              <Bot className="w-5 h-5" />
            </button>
          )}
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contacter sur WhatsApp"
            className="p-2 rounded-lg bg-[#25d366]/20 text-[#25d366] border border-[#25d366]/40"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#181a20] text-gray-300 border border-[#262831] hover:text-white"
            aria-label="Ouvrir le menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#1f2127] bg-[#101115] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid gap-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#d8f537] text-[#0c0d10]'
                      : 'text-gray-200 hover:bg-[#1a1b22]'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>
              );
            })}
          </div>

          {/* Theme Switcher in mobile drawer */}
          <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#141519] border border-[#20222a]">
            <span className="text-xs font-semibold text-gray-300">Apparence du site</span>
            <ThemeToggle variant="pill" />
          </div>

          <div className="pt-2 border-t border-[#1f2127] space-y-2">
            {onOpenAiAssistant && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiAssistant();
                }}
                className="flex items-center justify-center gap-2 w-full bg-[#181a24] hover:bg-[#202330] border border-[#d8f537]/50 text-[#d8f537] font-bold py-3 rounded-xl text-sm"
              >
                <Bot className="w-4 h-4 text-[#d8f537]" />
                <span>Poser une question à l'Assistant IA</span>
              </button>
            )}

            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25d366] text-black font-bold py-3 rounded-xl text-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Commander sur WhatsApp (+221 77 455 97 85)</span>
            </a>

            <button
              onClick={() => handleNavClick('contact')}
              className="flex items-center justify-center gap-2 w-full bg-[#1b1d24] text-white hover:bg-[#252832] font-semibold py-3 rounded-xl text-sm border border-[#2d303b]"
            >
              <span>Accéder au formulaire de contact</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
