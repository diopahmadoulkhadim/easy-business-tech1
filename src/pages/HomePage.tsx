import React from 'react';
import { PageId } from '../types';
import { COMPANY_INFO, PRODUCTS, buildWhatsAppUrl, REVIEWS, formatPriceFCFA } from '../data/products';
import { ProductCatalog } from '../components/ProductCatalog';
import { 
  MessageCircle, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Smartphone, 
  Headphones, 
  BatteryCharging, 
  Star, 
  CheckCircle, 
  ChevronRight,
  Zap,
  PhoneCall,
  Clock,
  Eye,
  Award,
  Bot,
  BadgeCheck,
  Quote
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onContactProduct: (productName: string) => void;
  onOpenAiAssistant?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onContactProduct, onOpenAiAssistant }) => {
  // Top 4 flagship products for the rapid highlight section
  const flagshipProducts = PRODUCTS.filter(p => p.isBestseller).slice(0, 4);

  return (
    <div className="w-full bg-[#0b0c0e]">
      
      {/* 1. HERO SECTION - ACCROCHE FORTE & CONVERSION IMMÉDIATE */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#1b1d24]">
        {/* Ambient glowing radial effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#d8f537]/10 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-[#25d366]/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Trust Badge & Founder Profile */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161820] border border-[#2b2e3a] text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#d8f537] animate-pulse"></span>
                  <span className="text-[#d8f537] font-bold">Boutique Officielle à Dakar</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-300 font-medium">Smartphones & Accessoires Neufs</span>
                </div>

                <button
                  onClick={() => onNavigate('apropos')}
                  className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#161820] hover:bg-[#20232e] border border-[#2b2e3a] text-xs transition-colors cursor-pointer group"
                  title="Voir le profil du fondateur"
                >
                  <div className="w-5 h-5 rounded-full p-0.5 bg-gradient-to-tr from-[#d8f537] to-[#25d366] shrink-0">
                    <img 
                      src={COMPANY_INFO.profileImage} 
                      alt={COMPANY_INFO.founderName} 
                      className="w-full h-full object-cover rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-gray-200 group-hover:text-white">{COMPANY_INFO.founderName}</span>
                  <BadgeCheck className="w-3.5 h-3.5 text-[#25d366]" />
                </button>
              </div>

              {/* Accroche Forte */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-tech">
                La technologie <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f0f3fa] to-gray-400">
                  à portée de main
                </span>{' '}
                <span className="inline-block px-3 py-1 rounded-xl bg-[#d8f537] text-[#0c0d10] text-2xl sm:text-4xl align-middle font-tech">
                  à Dakar
                </span>
              </h1>

              {/* Proposition de valeur claire */}
              <p className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
                Trouvez le smartphone idéal parmi les plus grandes marques (<strong className="text-white">Apple, Samsung, Tecno, Xiaomi</strong>) et tous vos accessoires haute qualité. Vérifiez votre boîte sous scellé à la livraison et payez en toute sécurité à Dakar.
              </p>

              {/* Call to Actions Clairs et Proéminents */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 bg-[#25d366] hover:bg-[#20ba5a] text-black font-extrabold px-6 py-4 rounded-xl text-sm transition-all shadow-xl shadow-[#25d366]/25 hover:scale-[1.02] cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Commander sur WhatsApp ({COMPANY_INFO.phone})</span>
                </a>

                <button
                  onClick={() => {
                    const el = document.getElementById('catalogue-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center justify-center gap-2 bg-[#171920] hover:bg-[#20232d] text-white font-semibold px-5 py-4 rounded-xl text-sm border border-[#2b2e3b] transition-all cursor-pointer"
                >
                  <span>Explorer le Catalogue</span>
                  <ArrowRight className="w-4 h-4 text-[#d8f537]" />
                </button>

                <button
                  onClick={() => onNavigate('contact')}
                  className="flex items-center justify-center gap-1.5 px-4 py-4 rounded-xl text-xs font-semibold text-gray-300 hover:text-white transition-colors"
                >
                  <span>Demander un devis</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Reassurance Checklist */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-[#1d2028]">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#d8f537] shrink-0" />
                  <span className="text-xs text-gray-300 font-medium">100% Neufs Scellés</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#d8f537] shrink-0" />
                  <span className="text-xs text-gray-300 font-medium">Livraison Dakar &lt; 2h</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <CheckCircle className="w-4 h-4 text-[#d8f537] shrink-0" />
                  <span className="text-xs text-gray-300 font-medium">Garantie 12 Mois & Facture</span>
                </div>
              </div>

            </div>

            {/* Right Hero Visual Card - High-tech Preview */}
            <div className="lg:col-span-5 w-full">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#181a22] to-[#101116] border border-[#262835] p-4 sm:p-6 shadow-2xl overflow-hidden">
                  
                  {/* Top Badge in Card */}
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-[#d8f537] text-black">
                      Modèle Tendance 2026
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-mono text-gray-400">
                      En stock à Dakar
                    </span>
                  </div>

                  {/* Hero Showcase Photo */}
                  <div className="relative aspect-4/3 rounded-xl sm:rounded-2xl bg-[#090a0d] border border-[#1d1f27] p-3 sm:p-4 flex items-center justify-center overflow-hidden group">
                    <img
                      src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80"
                      alt="iPhone 16 Pro Max Easy Business Tech"
                      className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-[#111318]/90 border border-[#262934] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs backdrop-blur-md">
                      <span className="text-gray-400 block text-[9px] sm:text-[10px]">Flagship vedette</span>
                      <span className="font-bold text-white text-xs sm:text-sm">Apple iPhone 16 Pro Max</span>
                    </div>
                  </div>

                  {/* Micro stats strip - responsive flex/grid */}
                  <div className="mt-3 sm:mt-4 grid grid-cols-3 gap-1.5 sm:gap-2 text-center">
                    <div className="bg-[#14161d] p-2 sm:p-2.5 rounded-xl border border-[#21232d]">
                      <span className="block text-xs sm:text-base font-extrabold text-[#d8f537]">12 Mois</span>
                      <span className="text-[9px] sm:text-[10px] text-gray-400">Garantie</span>
                    </div>
                    <div className="bg-[#14161d] p-2 sm:p-2.5 rounded-xl border border-[#21232d]">
                      <span className="block text-xs sm:text-base font-extrabold text-white">&lt; 2h</span>
                      <span className="text-[9px] sm:text-[10px] text-gray-400">Livraison Dakar</span>
                    </div>
                    <div className="bg-[#14161d] p-2 sm:p-2.5 rounded-xl border border-[#21232d]">
                      <span className="block text-xs sm:text-base font-extrabold text-[#25d366]">7j / 7</span>
                      <span className="text-[9px] sm:text-[10px] text-gray-400">WhatsApp SAV</span>
                    </div>
                  </div>

                  {/* Direct WhatsApp Action in Card */}
                  <div className="mt-3 sm:mt-4 pt-3 border-t border-[#20222c]">
                    <a
                      href={buildWhatsAppUrl("Bonjour Easy Business Tech, je souhaite commander l'iPhone 16 Pro Max ou le Samsung S24 Ultra en stock à Dakar.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-[#25d366]/20 hover:bg-[#25d366] text-[#25d366] hover:text-black font-bold py-2.5 rounded-xl text-xs transition-colors border border-[#25d366]/40"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Commander sur WhatsApp en 1 clic</span>
                    </a>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. BRAND LOGOS TICKER */}
      <section className="py-6 border-b border-[#181a20] bg-[#0d0e12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">
            Marques officielles partenaires disponibles chez Easy Business Tech
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-gray-400 font-tech font-bold text-sm sm:text-base">
            <span className="hover:text-white transition-colors">APPLE</span>
            <span className="text-gray-700">•</span>
            <span className="hover:text-white transition-colors">SAMSUNG</span>
            <span className="text-gray-700">•</span>
            <span className="hover:text-white transition-colors">TECNO MOBILE</span>
            <span className="text-gray-700">•</span>
            <span className="hover:text-white transition-colors">XIAOMI</span>
            <span className="text-gray-700">•</span>
            <span className="hover:text-white transition-colors">ANKER</span>
            <span className="text-gray-700">•</span>
            <span className="hover:text-white transition-colors">ORAIMO</span>
          </div>
        </div>
      </section>

      {/* 3. PRÉSENTATION RAPIDE DES PRODUITS PHARES (TOP FLAGSHIPS DAKAR) */}
      <section className="py-12 sm:py-16 bg-[#0e0f13] border-b border-[#1c1e26]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181a22] border border-[#262934] text-xs font-bold text-[#d8f537] mb-2">
                <Zap className="w-3.5 h-3.5" />
                <span>Sélection Express Bestsellers</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-tech">
                Nos Produits Phares du Moment
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Les téléphones les plus demandés à Dakar avec garantie officielle et livraison immédiate.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const el = document.getElementById('catalogue-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d8f537] hover:underline cursor-pointer"
              >
                <span>Voir tous les articles du catalogue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Flagships Grid (4 cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {flagshipProducts.map((product) => {
              const waUrl = buildWhatsAppUrl(product);
              return (
                <div
                  key={product.id}
                  className="bg-[#131419] border border-[#21232d] hover:border-[#383d4f] rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 group relative"
                >
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#d8f537] bg-[#d8f537]/10 px-2 py-0.5 rounded">
                      {product.brand}
                    </span>
                    {product.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#d8f537] text-black">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Image with subtle hover zoom */}
                  <div className="relative aspect-square w-full rounded-xl bg-[#090a0d] border border-[#1b1c24] p-3 flex items-center justify-center overflow-hidden mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 px-1.5 py-0.5 rounded text-[10px] text-gray-300">
                      <Star className="w-3 h-3 text-[#d8f537] fill-[#d8f537]" />
                      <span>{product.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Title & Price */}
                  <div className="space-y-1 mb-3">
                    <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#d8f537] transition-colors line-clamp-1 font-tech">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm sm:text-base font-extrabold text-white">
                        {formatPriceFCFA(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[11px] text-gray-500 line-through">
                          {formatPriceFCFA(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="pt-2 border-t border-[#1e2029] space-y-1.5">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-1.5 bg-[#25d366] hover:bg-[#20ba5a] text-black font-bold py-2 rounded-xl text-xs transition-colors shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Commander WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick CTA strip to Contact Page or Full Catalog */}
          <div className="mt-8 p-4 rounded-2xl bg-[#14161e] border border-[#242735] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#25d366] animate-pulse"></span>
              <p className="text-xs text-gray-200">
                Vous hésitez entre plusieurs modèles ? Nos experts sont à votre disposition pour vous conseiller selon votre budget.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {onOpenAiAssistant && (
                <button
                  onClick={onOpenAiAssistant}
                  className="px-3.5 py-2 rounded-xl bg-[#1b1e2a] hover:bg-[#25293a] text-[#d8f537] border border-[#d8f537]/40 text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shadow-sm hover:scale-105"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Demander à Awa (IA)</span>
                </button>
              )}
              <button
                onClick={() => onNavigate('contact')}
                className="px-4 py-2 rounded-xl bg-[#d8f537] text-black text-xs font-bold hover:bg-[#c9e62f] transition-colors cursor-pointer whitespace-nowrap"
              >
                Formulaire / Contact
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. FULL INTERACTIVE CATALOG WITH MULTI-IMAGE DETAILED SHEETS & FILTERS */}
      <ProductCatalog onContactProduct={onContactProduct} />

      {/* 5. TÉMOIGNAGES CLIENTS & RASSURANCE DAKAR (OPTIMISÉ POUR CONVERTIR) */}
      <section className="py-16 sm:py-20 border-t border-[#181a20] bg-[#0c0d10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Why Easy Business Tech */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181a22] border border-[#282b37] text-xs font-bold text-[#d8f537]">
                <Award className="w-3.5 h-3.5" />
                <span>Pourquoi Choisir Easy Business Tech ?</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-tech">
                Votre boutique de confiance à Dakar
              </h2>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Acheter un smartphone ou un accessoire high-tech doit être une expérience transparente et sans risque. Chez Easy Business Tech, chaque appareil est rigoureusement certifié neuf, d’origine et garanti.
              </p>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#13151b] border border-[#21232d]">
                  <div className="w-8 h-8 rounded-xl bg-[#d8f537]/15 border border-[#d8f537]/30 flex items-center justify-center text-[#d8f537] shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Appareils Neufs Scellés d'Origine</h4>
                    <p className="text-gray-400 mt-0.5">
                      Aucun reconditionné caché. Vous vérifiez le scellé officiel avant de procéder au règlement.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#13151b] border border-[#21232d]">
                  <div className="w-8 h-8 rounded-xl bg-[#d8f537]/15 border border-[#d8f537]/30 flex items-center justify-center text-[#d8f537] shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Livraison Express Dakar &lt; 2h</h4>
                    <p className="text-gray-400 mt-0.5">
                      Livré en main propre à votre domicile ou bureau (Almadies, Plateau, Mermoz, Médina, etc.).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#13151b] border border-[#21232d]">
                  <div className="w-8 h-8 rounded-xl bg-[#d8f537]/15 border border-[#d8f537]/30 flex items-center justify-center text-[#d8f537] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Garantie 12 Mois & Facture</h4>
                    <p className="text-gray-400 mt-0.5">
                      Tous nos smartphones bénéficient d'un service après-vente réactif à Dakar.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('apropos')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#171920] hover:bg-[#20232c] text-white border border-[#2b2e3b] text-xs font-bold transition-colors cursor-pointer"
                >
                  <span>En savoir plus sur notre entreprise</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#d8f537]" />
                </button>
              </div>
            </div>

            {/* Right Column: Customer Reviews / Témoignages */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="flex items-center justify-between pb-2 border-b border-[#1c1e26]">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-tech">
                    Témoignages de nos clients à Dakar
                  </h3>
                  <p className="text-xs text-gray-400">
                    Retours d'expérience authentiques vérifiés.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#d8f537] bg-[#161820] px-3 py-1.5 rounded-full border border-[#262834]">
                  <Star className="w-3.5 h-3.5 fill-[#d8f537]" />
                  <span className="font-bold">4.9 / 5</span>
                  <span className="text-gray-400">(150+ commandes)</span>
                </div>
              </div>

              {/* Grid of Reviews */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {REVIEWS.map((rev) => (
                  <div 
                    key={rev.id}
                    className="bg-[#121317] border border-[#20222a] p-5 rounded-2xl flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#1e2029] border border-[#2d303d] flex items-center justify-center text-xs font-bold text-white font-tech">
                            {rev.author.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white">{rev.author}</h4>
                            <p className="text-[10px] text-gray-500">{rev.location}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-0.5">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-[#d8f537] text-[#d8f537]" />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-gray-300 italic leading-relaxed">
                        « {rev.comment} »
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-gray-500 pt-2 border-t border-[#1b1d24]">
                      <span className="text-[#d8f537] font-medium truncate max-w-[170px]">
                        {rev.productBought}
                      </span>
                      <span>{rev.date}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5.5. MOT & PROFIL DU FONDATEUR */}
      <section className="py-12 bg-[#0d0e12] border-t border-[#1c1e28]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#14161f] via-[#101217] to-[#14161f] border border-[#232635] rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-[#d8f537] via-[#25d366] to-[#d8f537] shadow-xl shadow-[#d8f537]/10">
                <img
                  src={COMPANY_INFO.profileImage}
                  alt={COMPANY_INFO.founderName}
                  className="w-full h-full object-cover rounded-full bg-[#181a1f]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#25d366] border-2 border-[#101217] flex items-center justify-center text-black" title="Profil vérifié">
                <BadgeCheck className="w-3.5 h-3.5 fill-black text-[#25d366]" />
              </span>
            </div>

            <div className="space-y-2.5 text-center md:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="text-sm sm:text-base font-bold text-white font-tech">
                  {COMPANY_INFO.founderName}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#d8f537]/15 text-[#d8f537] border border-[#d8f537]/30">
                  {COMPANY_INFO.founderTitle}
                </span>
              </div>

              <blockquote className="text-xs sm:text-sm text-gray-200 italic font-medium leading-relaxed max-w-2xl">
                « {COMPANY_INFO.founderQuote} »
              </blockquote>

              <p className="text-[11px] text-gray-400">
                Easy Business Tech • Boutique certifiée à Dakar, Sénégal • Accompagnement et garantie sur chaque achat
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <button
                onClick={() => onNavigate('apropos')}
                className="px-4 py-2.5 rounded-xl bg-[#191c25] hover:bg-[#232635] text-xs font-semibold text-white border border-[#2b2e3e] transition-colors cursor-pointer"
              >
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BIG CALL TO ACTION FINALE (OPTIMISÉE POUR CONVERTIR DIRECTEMENT SUR WHATSAPP OU CONTACT) */}
      <section className="py-16 bg-gradient-to-b from-[#0c0d10] to-[#07080a] border-t border-[#1c1d24]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#181b22] border border-[#2a2d39] text-xs font-bold text-[#d8f537]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Réponse instantanée par nos conseillers techniques à Dakar</span>
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-tech">
            Prêt à commander votre smartphone ou accessoire ?
          </h2>

          <p className="text-xs sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            Contactez notre boutique dès maintenant. Dites-nous ce que vous recherchez, et recevez votre devis ou votre confirmation de livraison express sous quelques minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-[#25d366] hover:bg-[#20ba5a] text-black font-extrabold px-8 py-4 rounded-xl text-sm transition-all shadow-xl shadow-[#25d366]/25 hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Ouvrir WhatsApp ({COMPANY_INFO.phone})</span>
            </a>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#171920] hover:bg-[#20232c] text-white font-semibold px-6 py-4 rounded-xl text-sm border border-[#2d303b] transition-colors cursor-pointer"
            >
              <span>Accéder au formulaire de contact</span>
              <ArrowRight className="w-4 h-4 text-[#d8f537]" />
            </button>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-gray-500">
            <span>📍 Dakar, Sénégal</span>
            <span>•</span>
            <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="hover:text-gray-300">
              📞 {COMPANY_INFO.phone}
            </a>
            <span>•</span>
            <span className="text-[#25d366]">En ligne 7j/7</span>
          </div>

        </div>
      </section>

    </div>
  );
};
