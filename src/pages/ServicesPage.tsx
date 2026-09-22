import React from 'react';
import { PageId } from '../types';
import { SERVICES_DATA } from '../data/services';
import { COMPANY_INFO, buildWhatsAppUrl } from '../data/products';
import { 
  Smartphone, 
  Headphones, 
  ShoppingBag, 
  Truck, 
  MessageCircleHeart, 
  Wrench, 
  CheckCircle2, 
  MessageCircle, 
  ArrowRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  onSelectServiceForContact: (serviceTitle: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ 
  onNavigate, 
  onSelectServiceForContact 
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-[#d8f537]" />;
      case 'Headphones':
        return <Headphones className="w-6 h-6 text-[#d8f537]" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-6 h-6 text-[#d8f537]" />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-[#d8f537]" />;
      case 'MessageCircleHeart':
        return <MessageCircleHeart className="w-6 h-6 text-[#d8f537]" />;
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-[#d8f537]" />;
      default:
        return <Smartphone className="w-6 h-6 text-[#d8f537]" />;
    }
  };

  return (
    <div className="w-full bg-[#0b0c0e] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161820] border border-[#2b2e3c] text-xs font-bold text-[#d8f537]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nos Prestations & Expertises</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-tech">
            Des services sur-mesure pour tous vos besoins mobiles
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            De la sélection de votre nouveau smartphone jusqu’à sa livraison à votre porte et son paramétrage complet à Dakar.
          </p>

          <div className="pt-2">
            <span className="text-xs font-black tracking-wider uppercase px-4 py-1.5 rounded-full bg-[#171920] border border-[#262833] text-[#d8f537] font-tech">
              {COMPANY_INFO.serviceSlogan}
            </span>
          </div>
        </div>

        {/* 6 Services Detailed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES_DATA.map((service, index) => {
            const serviceWhatsAppUrl = buildWhatsAppUrl(
              `Bonjour Easy Business Tech, je suis intéressé(e) par votre service : "${service.title}". Pouvez-vous m'en dire plus ?`
            );

            return (
              <div
                key={service.id}
                className="bg-[#121317] border border-[#20222a] hover:border-[#333745] p-7 rounded-3xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  {/* Top highlight and icon */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#1a1c24] border border-[#292c38] flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getIcon(service.icon)}
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#1a1d25] text-gray-300 border border-[#272a35]">
                      {service.highlight}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 font-tech">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-5">
                    {service.fullDesc}
                  </p>

                  {/* Feature Checkpoints */}
                  <div className="space-y-2 mb-6 bg-[#161820] p-4 rounded-2xl border border-[#20232d]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                      Inclus dans cette prestation :
                    </span>
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#d8f537] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions row */}
                <div className="pt-4 border-t border-[#1c1e26] flex items-center gap-2">
                  <a
                    href={serviceWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#25d366]/20 hover:bg-[#25d366] text-[#25d366] hover:text-black font-bold py-2.5 px-4 rounded-xl text-xs transition-colors border border-[#25d366]/30"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>Demander sur WhatsApp</span>
                  </a>

                  <button
                    onClick={() => onSelectServiceForContact(service.title)}
                    className="px-4 py-2.5 rounded-xl bg-[#1b1d25] hover:bg-[#252834] text-white text-xs font-semibold border border-[#282b37] transition-colors cursor-pointer"
                  >
                    Formulaire
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Flow */}
        <div className="bg-[#101115] border border-[#1e2028] rounded-3xl p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-tech">
              Comment se déroule votre commande ?
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Un processus ultra-rapide et sécurisé sans démarche fastidieuse.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#14161d] p-5 rounded-2xl border border-[#222530] space-y-2">
              <span className="w-8 h-8 rounded-full bg-[#d8f537] text-black font-black flex items-center justify-center text-xs font-tech">
                1
              </span>
              <h4 className="text-sm font-bold text-white">Sélection ou Conseil</h4>
              <p className="text-xs text-gray-400">
                Vous parcourez notre catalogue ou demandez conseil à nos experts selon votre budget.
              </p>
            </div>

            <div className="bg-[#14161d] p-5 rounded-2xl border border-[#222530] space-y-2">
              <span className="w-8 h-8 rounded-full bg-[#d8f537] text-black font-black flex items-center justify-center text-xs font-tech">
                2
              </span>
              <h4 className="text-sm font-bold text-white">Validation WhatsApp</h4>
              <p className="text-xs text-gray-400">
                Confirmation instantanée de la disponibilité, de la couleur et de l'adresse de livraison.
              </p>
            </div>

            <div className="bg-[#14161d] p-5 rounded-2xl border border-[#222530] space-y-2">
              <span className="w-8 h-8 rounded-full bg-[#d8f537] text-black font-black flex items-center justify-center text-xs font-tech">
                3
              </span>
              <h4 className="text-sm font-bold text-white">Livraison Express</h4>
              <p className="text-xs text-gray-400">
                Notre coursier vous livre en mains propres à Dakar en 2 heures avec emballage scellé.
              </p>
            </div>

            <div className="bg-[#14161d] p-5 rounded-2xl border border-[#222530] space-y-2">
              <span className="w-8 h-8 rounded-full bg-[#d8f537] text-black font-black flex items-center justify-center text-xs font-tech">
                4
              </span>
              <h4 className="text-sm font-bold text-white">Vérification & Paiement</h4>
              <p className="text-xs text-gray-400">
                Vous vérifiez le produit et réglez en toute sécurité (Espèces, Wave ou Orange Money).
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-gradient-to-r from-[#13151b] via-[#1a1d25] to-[#13151b] border border-[#262a36] rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-tech">
              Vous avez un besoin particulier ou une réparation ?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              Contactez-nous directement par téléphone ou WhatsApp pour une prise en charge rapide.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="flex items-center gap-2 bg-[#1b1d25] hover:bg-[#252834] text-white px-5 py-3 rounded-xl text-xs font-semibold border border-[#292c38] transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-[#d8f537]" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            <a
              href={buildWhatsAppUrl("Bonjour Easy Business Tech, je souhaite solliciter vos services à Dakar.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25d366] hover:bg-[#20ba5a] text-black font-extrabold px-5 py-3 rounded-xl text-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
