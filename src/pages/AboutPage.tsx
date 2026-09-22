import React from 'react';
import { PageId } from '../types';
import { COMPANY_INFO, buildWhatsAppUrl } from '../data/products';
import { FaqSection } from '../components/FaqSection';
import { 
  Target, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  MapPin, 
  MessageCircle, 
  CheckCircle2, 
  ArrowRight,
  Smartphone,
  Headphones,
  BatteryCharging,
  Layers,
  HeartHandshake,
  Quote,
  BadgeCheck
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-[#0b0c0e] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161820] border border-[#2b2e3c] text-xs font-bold text-[#d8f537]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>À propos d’Easy Business Tech</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-tech">
            Rendre la technologie plus <br className="hidden sm:block" />
            <span className="text-[#d8f537]">accessible, simple & fiable</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Basée à Dakar au Sénégal, <strong className="text-white font-semibold">Easy Business Tech</strong> est votre boutique de référence pour l’acquisition de smartphones authentiques et d'accessoires mobiles haute performance.
          </p>
        </div>

        {/* Story & Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          <div className="bg-[#121318] border border-[#21232d] p-8 rounded-3xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#d8f537]/5 blur-3xl rounded-full pointer-events-none" />

            <div className="w-12 h-12 rounded-2xl bg-[#1a1d25] border border-[#2b2e3c] flex items-center justify-center text-[#d8f537]">
              <Target className="w-6 h-6" />
            </div>

            <h2 className="text-2xl font-bold text-white font-tech">
              Notre Mission
            </h2>

            <blockquote className="border-l-2 border-[#d8f537] pl-4 text-sm sm:text-base text-gray-200 italic font-medium">
              « Chez Easy Business Tech, nous souhaitons offrir à chaque client une expérience d'achat simple, transparente et professionnelle, avec des produits adaptés à ses besoins et à son budget. »
            </blockquote>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Nous sélectionnons rigoureusement des produits auprès des plus grands constructeurs mondiaux : <strong>Apple, Samsung, Tecno, Xiaomi</strong> et d’autres marques de premier plan. Notre engagement est d’offrir à nos clients à Dakar et dans tout le Sénégal un matériel fiable, garanti et conforme aux normes les plus strictes.
            </p>

            <div className="pt-2">
              <span className="inline-block px-4 py-2 rounded-xl bg-[#191c24] border border-[#262935] text-xs font-bold text-[#d8f537] font-tech">
                {COMPANY_INFO.slogan}
              </span>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="space-y-4">
            <div className="bg-[#14151a] border border-[#222530] p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#d8f537]/10 text-[#d8f537] flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-tech">Un service client attentif et humain</h3>
                  <p className="text-xs text-gray-400">Nous parlons votre langue et comprenons vos impératifs</p>
                </div>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Au-delà de la simple vente, nous vous accompagnons pas à pas : du comparatif des appareils jusqu’au transfert de vos applications, la pose de protection et le service après-vente.
              </p>
            </div>

            <div className="bg-[#14151a] border border-[#222530] p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#25d366]/10 text-[#25d366] flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-tech">Ancrage local à Dakar, Sénégal</h3>
                  <p className="text-xs text-gray-400">Disponibilité immédiate en stock, pas d’attente d’importation</p>
                </div>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Tous les produits affichés dans notre catalogue sont déjà stockés à Dakar. Nous livrons sur toute la région dakaroise en 2h et expédions en 24h à 48h dans toutes les régions sénégalaises.
              </p>
            </div>
          </div>

        </div>

        {/* Section Profil Officiel & Mot du Fondateur */}
        <div className="bg-gradient-to-b from-[#14161f] to-[#0f1016] border border-[#272a39] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d8f537]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Profile Photo Display */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative group">
                <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full p-1.5 bg-gradient-to-tr from-[#d8f537] via-[#25d366] to-[#d8f537] shadow-2xl shadow-[#d8f537]/15">
                  <img
                    src={COMPANY_INFO.profileImage}
                    alt={COMPANY_INFO.founderName}
                    className="w-full h-full object-cover rounded-full bg-[#181a1f]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute bottom-2 right-2 bg-[#121318] p-1.5 rounded-full border border-[#262833] shadow-md">
                  <div className="w-5 h-5 rounded-full bg-[#25d366] flex items-center justify-center text-black">
                    <BadgeCheck className="w-3.5 h-3.5 fill-black text-[#25d366]" />
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-1">
                <div className="flex items-center justify-center gap-1.5">
                  <h3 className="text-lg font-bold text-white font-tech">
                    {COMPANY_INFO.founderName}
                  </h3>
                  <BadgeCheck className="w-4 h-4 text-[#25d366]" />
                </div>
                <p className="text-xs text-[#d8f537] font-semibold">
                  {COMPANY_INFO.founderTitle}
                </p>
                <p className="text-[11px] text-gray-400">
                  Dakar, Sénégal
                </p>
              </div>
            </div>

            {/* Quote and Vision text */}
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e2a] border border-[#2e3347] text-xs font-bold text-[#d8f537]">
                <Quote className="w-3.5 h-3.5" />
                <span>La Vision d'Easy Business Tech</span>
              </div>

              <blockquote className="text-base sm:text-xl font-medium text-white leading-relaxed italic border-l-3 border-[#d8f537] pl-4 sm:pl-6 py-1 bg-[#161824]/40 rounded-r-2xl">
                « {COMPANY_INFO.founderQuote} »
              </blockquote>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Fondée avec la conviction que chaque personne au Sénégal mérite d'avoir accès au meilleur de la technologie moderne dans des conditions d'honnêteté, de rapidité et d'écoute, <strong className="text-white font-semibold">Easy Business Tech</strong> s'engage chaque jour à vous accompagner avec respect et professionnalisme.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={buildWhatsAppUrl("Bonjour M. Sidi Ba, je vous contacte suite à votre profil sur Easy Business Tech.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25d366] hover:bg-[#20ba59] text-black font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shadow-lg shadow-[#25d366]/20"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Échanger avec le Dirigeant sur WhatsApp</span>
                </a>

                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#191b24] hover:bg-[#222532] text-gray-200 border border-[#2b2e3e] text-xs font-semibold transition-colors cursor-pointer"
                >
                  <span>Prendre contact</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#d8f537]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Our Products Detailed Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-tech">
              Notre Gamme Complète de Produits
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Des téléphones modernes aux accessoires haute performance pour tous les usages.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            
            <div className="bg-[#131418] border border-[#20222a] p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#191b22] text-[#d8f537] flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-tech">
                Smartphones de grandes marques
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Apple iPhone (séries Pro et standard), Samsung Galaxy (Ultra, S, A), Tecno Camon & Spark, Xiaomi Redmi & Poco.
              </p>
            </div>

            <div className="bg-[#131418] border border-[#20222a] p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#191b22] text-[#d8f537] flex items-center justify-center">
                <BatteryCharging className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-tech">
                Chargeurs rapides & câbles
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Blocs de charge GaN ultra-compacts 20W à 65W, câbles tressés renforcés Type-C et Lightning certifiés MFi.
              </p>
            </div>

            <div className="bg-[#131418] border border-[#20222a] p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#191b22] text-[#d8f537] flex items-center justify-center">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-tech">
                Écouteurs & casques
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                AirPods Pro & Max, Galaxy Buds, écouteurs Bluetooth sans fil Oraimo avec réduction de bruit et son immersif.
              </p>
            </div>

            <div className="bg-[#131418] border border-[#20222a] p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#191b22] text-[#d8f537] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-tech">
                Coques & protections d'écran
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Coques silicone MagSafe, protections antichocs de qualité militaire et verres trempés 9D anti-espion (Privacy).
              </p>
            </div>

            <div className="bg-[#131418] border border-[#20222a] p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#191b22] text-[#d8f537] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-tech">
                Power banks & recharge
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Batteries nomades haute capacité 10.000 mAh à 30.000 mAh avec charge rapide pour rester toujours connecté.
              </p>
            </div>

            <div className="bg-[#131418] border border-[#20222a] p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#191b22] text-[#d8f537] flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-tech">
                Supports & accessoires mobiles
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Supports voiture magnétiques à induction, trépieds pour créateurs de contenu, adaptateurs OTG et clés USB.
              </p>
            </div>

          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="bg-[#101116] border border-[#1f222b] rounded-3xl p-8 sm:p-12">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d8f537]">Nos Engagements</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-tech">
              Pourquoi nous faire confiance au Sénégal ?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="text-2xl font-black text-[#d8f537] font-tech">01</div>
              <h4 className="text-sm font-bold text-white">Transparence Totale</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Prix nets et clairs en FCFA, sans frais cachés à la livraison. Facture nominative délivrée pour chaque achat.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-2xl font-black text-[#d8f537] font-tech">02</div>
              <h4 className="text-sm font-bold text-white">Authenticité Certifiée</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Zéro copie, zéro clone. Que des produits originaux et neufs avec vérification du numéro IMEI possible avant achat.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-2xl font-black text-[#d8f537] font-tech">03</div>
              <h4 className="text-sm font-bold text-white">Réactivité WhatsApp</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Une équipe locale toujours disponible pour répondre à vos questions et organiser votre livraison rapidement.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-2xl font-black text-[#d8f537] font-tech">04</div>
              <h4 className="text-sm font-bold text-white">Service Après-Vente</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Nous sommes à vos côtés bien après votre achat pour vous assister et garantir votre sérénité.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section on Warranty, Dakar Delivery, and Payment */}
        <FaqSection />

        {/* Conversion Action */}
        <div className="bg-gradient-to-r from-[#14161c] via-[#191c24] to-[#14161c] border border-[#252834] rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-tech">
              Une question ou une demande particulière ?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300">
              Notre équipe dakarois est à votre écoute pour vous conseiller.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={buildWhatsAppUrl("Bonjour Easy Business Tech, j'aimerais échanger avec votre équipe pour en savoir plus sur vos produits.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25d366] hover:bg-[#20ba5a] text-black font-extrabold px-5 py-3 rounded-xl text-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp : {COMPANY_INFO.phone}</span>
            </a>

            <button
              onClick={() => onNavigate('contact')}
              className="flex items-center gap-2 bg-[#1b1e27] hover:bg-[#252936] text-white px-5 py-3 rounded-xl text-xs font-semibold border border-[#2f3342] transition-colors cursor-pointer"
            >
              <span>Accéder au formulaire</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#d8f537]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
