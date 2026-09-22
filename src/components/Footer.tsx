import React from 'react';
import { PageId } from '../types';
import { COMPANY_INFO, buildWhatsAppUrl } from '../data/products';
import { ThemeToggle } from './ThemeToggle';
import { 
  Smartphone, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  CreditCard,
  ChevronRight
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#08090b] border-t border-[#1b1c21] text-gray-400 text-xs">
      {/* Upper features strip */}
      <div className="border-b border-[#18191f] bg-[#0c0d10] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#14161b] border border-[#23252d] flex items-center justify-center text-[#d8f537]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">Produits 100% Authentiques</h5>
              <p className="text-[11px] text-gray-400">Smartphones certifiés avec garantie</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#14161b] border border-[#23252d] flex items-center justify-center text-[#d8f537]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">Livraison Express Dakar</h5>
              <p className="text-[11px] text-gray-400">À domicile ou au bureau sous 2h</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#14161b] border border-[#23252d] flex items-center justify-center text-[#d8f537]">
              <MessageCircle className="w-5 h-5 text-[#25d366]" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">Assistance WhatsApp 7j/7</h5>
              <p className="text-[11px] text-gray-400">Conseillers réactifs et bienveillants</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#14161b] border border-[#23252d] flex items-center justify-center text-[#d8f537]">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">Paiement Flexible</h5>
              <p className="text-[11px] text-gray-400">À la livraison, Wave ou Orange Money</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info with Profile Picture */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#d8f537] via-[#25d366] to-[#d8f537] shadow-md shrink-0">
                <img 
                  src={COMPANY_INFO.profileImage} 
                  alt="Profil Easy Business Tech" 
                  className="w-full h-full object-cover rounded-full bg-[#181a1f]"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25d366] border-2 border-[#08090b]" />
              </div>
              <div>
                <span className="text-base font-extrabold text-white tracking-tight font-tech">
                  EASY BUSINESS <span className="text-[#d8f537]">TECH</span>
                </span>
                <p className="text-[10px] text-gray-400">Profil Officiel • Dakar, Sénégal</p>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed pr-4">
              Boutique spécialisée dans la vente de smartphones neufs et accessoires technologiques à Dakar, Sénégal. Nous rendons la technologie plus accessible, simple et fiable avec un service client d'exception.
            </p>

            <div className="pt-2">
              <span className="text-[11px] font-bold text-[#d8f537] italic">
                {COMPANY_INFO.slogan}
              </span>
            </div>

            <div className="pt-2">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25d366]/20 hover:bg-[#25d366] text-[#25d366] hover:text-black font-bold px-4 py-2.5 rounded-xl border border-[#25d366]/40 text-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Nous écrire sur WhatsApp (+221 77 455 97 85)</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('accueil')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#d8f537]" />
                  <span>Accueil</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('produits')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#d8f537]" />
                  <span>Bestsellers & Produits</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#d8f537]" />
                  <span>Nos Services</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('apropos')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#d8f537]" />
                  <span>À propos de nous</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#d8f537]" />
                  <span>Contactez-nous</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Marques Phares */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Marques & Univers
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d8f537]"></span>
                <span>Smartphones Apple (iPhone)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d8f537]"></span>
                <span>Samsung Galaxy & Ultra</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d8f537]"></span>
                <span>Tecno Camon & Spark</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d8f537]"></span>
                <span>Xiaomi Redmi & Note</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d8f537]"></span>
                <span>Accessoires Anker & Oraimo</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Coordonnées Dakar
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d8f537] shrink-0 mt-0.5" />
                <span className="text-gray-300">{COMPANY_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#d8f537] shrink-0" />
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="text-gray-300 hover:text-white font-semibold">
                  {COMPANY_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d8f537] shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-gray-300 hover:text-white truncate">
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#d8f537] shrink-0 mt-0.5" />
                <span className="text-gray-400 text-[11px] leading-tight">
                  {COMPANY_INFO.workingHours}
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & Theme selector */}
        <div className="mt-12 pt-6 border-t border-[#181920] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p>© {currentYear} Easy Business Tech. Tous droits réservés. Dakar, Sénégal.</p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-gray-400">Thème :</span>
              <ThemeToggle variant="pill" />
            </div>
            <span className="hidden sm:inline">•</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-gray-300 cursor-pointer">
              Formulaire de contact
            </button>
            <span>•</span>
            <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-[#25d366]">
              WhatsApp : {COMPANY_INFO.phone}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
