import React, { useState, useMemo } from 'react';
import { 
  ChevronDown, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  HelpCircle, 
  Search, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { COMPANY_INFO, buildWhatsAppUrl } from '../data/products';

export interface FaqItem {
  id: string;
  category: 'garantie' | 'livraison' | 'paiement';
  question: string;
  answer: string;
  highlights?: string[];
}

export const FAQ_DATA: FaqItem[] = [
  // 1. GARANTIE & AUTHENTICITÉ
  {
    id: 'garantie-duree',
    category: 'garantie',
    question: 'Quelle est la durée de la garantie offerte sur vos smartphones ?',
    answer: 'Tous nos smartphones neufs (Apple iPhone, Samsung Galaxy, Tecno Mobile, Xiaomi) bénéficient d’une garantie constructeur officielle de 12 mois (1 an) à compter de la date de livraison, attestée par une facture nominative délivrée par Easy Business Tech. Les accessoires officiels (chargeurs rapides GaN, écouteurs sans fil, batteries externes) bénéficient quant à eux d’une garantie de 3 à 6 mois selon les constructeurs.',
    highlights: ['12 mois de garantie constructeur sur les smartphones', 'Facture avec mention du numéro IMEI', 'Prise en charge locale à Dakar']
  },
  {
    id: 'garantie-authenticite',
    category: 'garantie',
    question: 'Vos appareils sont-ils 100% neufs, d\'origine et sous scellé ?',
    answer: 'Absolument. Chez Easy Business Tech, nous appliquons une politique stricte d\'authenticité : zéro contrefaçon, zéro copie et zéro reconditionné caché. Tous les smartphones sont neufs, dans leur boîte d\'origine sous blister ou languettes de scellé officielles constructeur intactes. Vous avez la possibilité de vérifier le numéro IMEI en direct sur les plateformes officielles (checkcoverage.apple.com pour Apple ou imei.info pour Samsung/Tecno/Xiaomi) avant tout règlement.',
    highlights: ['Boîte sous scellé d’origine intacte', 'Contrôle IMEI en ligne possible', '100% Neufs certifiés constructeurs']
  },
  {
    id: 'garantie-couverture',
    category: 'garantie',
    question: 'Que couvre précisément la garantie de 12 mois ?',
    answer: 'La garantie prend en charge tous les défauts matériels d\'origine non causés par l\'utilisateur : pannes de carte mère, dysfonctionnements du micro, des haut-parleurs, du système de charge, de la puce réseau/Wi-Fi, ou défaillances spontanées de l’écran tactile. Elle ne couvre pas les dommages accidentels (chutes, bris de glace, écran brisé par choc, immersion liquide ou modification logicielle non autorisée).',
    highlights: ['Défauts électroniques & pannes internes', 'Remplacement ou réparation rapide', 'Accompagnement transparent']
  },
  {
    id: 'garantie-sav',
    category: 'garantie',
    question: 'Comment contacter le Service Après-Vente (SAV) en cas de besoin ?',
    answer: 'Notre service après-vente est basé directement à Dakar pour une réactivité maximale. En cas de dysfonctionnement, contactez immédiatement notre équipe par WhatsApp ou téléphone au +221 77 455 97 85 en précisant votre numéro de facture. Nous réalisons un diagnostic immédiat et organisons la prise en charge sans délai d’attente international.',
    highlights: ['Équipe SAV locale basée à Dakar', 'Contact direct par WhatsApp', 'Diagnostic et solution sous 24-48h']
  },

  // 2. LIVRAISON À DAKAR & RÉGIONS DU SÉNÉGAL
  {
    id: 'livraison-delais-dakar',
    category: 'livraison',
    question: 'Quels sont les délais et zones de livraison à Dakar ?',
    answer: 'Nous assurons une livraison express en moins de 2 heures partout dans la région de Dakar ! Nos coursiers dédiés desservent tous les quartiers : Plateau, Almadies, Ngor, Mermoz, Ouakam, Point E, Fann, Médina, Yoff, Sacré-Cœur, Maristes, Parcelles Assainies, Grand Yoff, Pikine, Guédiawaye, Keur Massar, et Rufisque. Dès confirmation de votre commande sur WhatsApp, le coursier est expédié vers votre adresse.',
    highlights: ['Livraison express en moins de 2 heures', 'Tous les quartiers de Dakar desservis', 'Livraison à domicile ou au bureau']
  },
  {
    id: 'livraison-verification',
    category: 'livraison',
    question: 'Puis-je ouvrir et inspecter mon colis avant de payer ?',
    answer: 'Oui, sans aucune hésitation ! C’est notre engagement « Transparence & Sérénité ». Le coursier vous remet votre colis en main propre : vous avez tout le temps d’examiner la boîte scellée, de vérifier que le modèle, la couleur et le stockage correspondent parfaitement à votre commande, et de consulter la facture avant de remettre les fonds au livreur.',
    highlights: ['Vérification en main propre', 'Contrôle des scellés avant paiement', 'Paiement uniquement si vous êtes satisfait']
  },
  {
    id: 'livraison-regions',
    category: 'livraison',
    question: 'Livrez-vous dans les autres régions du Sénégal (Thiès, Mbour, Saint-Louis...) ?',
    answer: 'Oui ! Nous expédions régulièrement dans toutes les régions du Sénégal : Thiès, Mbour, Touba, Saint-Louis, Kaolack, Ziguinchor, Louga, Kolda, Tambacounda, etc. Les expéditions sont confiées à des transporteurs de confiance ou services GP express réputés avec numéro de suivi. Les délais d’acheminement sont de 24h à 48h maximum.',
    highlights: ['Expéditions régionales 24h/48h', 'Colis sécurisé et tracé', 'Partenaires de transport fiables']
  },
  {
    id: 'livraison-tarifs',
    category: 'livraison',
    question: 'Combien coûte la livraison à Dakar ?',
    answer: 'Pour récompenser la fidélité de nos clients, la livraison express est offerte pour l\'achat de smartphones neufs à Dakar intramuros. Pour les petits accessoires seuls, un tarif forfaitaire symbolique de coursier (généralement 1 500 à 2 500 FCFA selon la distance) est appliqué en toute transparence.',
    highlights: ['Livraison offerte sur les smartphones', 'Tarif coursier clair et sans surprise', 'Confirmation préalable du coût total']
  },

  // 3. MÉTHODES DE PAIEMENT & SÉCURITÉ
  {
    id: 'paiement-moyens',
    category: 'paiement',
    question: 'Quels sont les modes de paiement acceptés chez Easy Business Tech ?',
    answer: 'Nous proposons les méthodes de paiement les plus populaires, simples et sécurisées au Sénégal :\n1. Espèces (Cash) : en main propre au coursier après inspection du produit.\n2. Wave Sénégal : transfert direct ou scan de QR code sans le moindre frais.\n3. Orange Money (OM) : paiement mobile rapide et sécurisé.\n4. Virement bancaire / Chèque de société : disponible pour les entreprises et commandes groupées sur devis.',
    highlights: ['Espèces à la livraison', 'Wave & Orange Money sans frais', 'Facturation pour entreprises']
  },
  {
    id: 'paiement-frais',
    category: 'paiement',
    question: 'Y a-t-il des frais supplémentaires si je règle avec Wave ou Orange Money ?',
    answer: 'Aucun frais supplémentaire. Chez Easy Business Tech, le prix affiché en FCFA sur notre site et convenu lors de la commande est le montant net et définitif que vous réglez. Aucun pourcentage n’est ajouté lors d’un paiement Wave ou Orange Money.',
    highlights: ['Zéro frais caché', 'Prix net en Franc CFA (XOF)', 'Montant exact sans surtaxe']
  },
  {
    id: 'paiement-facture',
    category: 'paiement',
    question: 'Délivrez-vous une facture officielle d\'achat ?',
    answer: 'Oui, systématiquement. Chaque appareil vendu fait l’objet d’une facture commerciale officielle émise par Easy Business Tech comportant nos coordonnées légales, votre nom, la date, la désignation exacte du produit avec ses numéros de série et IMEI uniques, ainsi que la mention de la garantie 12 mois. Ce document est indispensable pour faire valoir vos droits de garantie.',
    highlights: ['Facture avec cachet officiel', 'Mentions IMEI et garantie', 'Valable pour les particuliers et entreprises']
  },
  {
    id: 'paiement-acompte',
    category: 'paiement',
    question: 'Dois-je verser un acompte avant d\'être livré à Dakar ?',
    answer: 'Non, pour toute livraison standard de produits en stock à Dakar, aucun acompte n’est exigé ! Vous payez la totalité de votre commande au moment précis où le coursier vous remet le colis en main propre. Seules les commandes spéciales d\'appareils sur commande spécifique peuvent faire l\'objet d\'une réservation.',
    highlights: ['Aucun acompte pour les livraisons à Dakar', 'Paiement à la réception intégrale', 'Tranquillité d’esprit garantie']
  }
];

type CategoryFilter = 'all' | 'garantie' | 'livraison' | 'paiement';

export const FaqSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [openIds, setOpenIds] = useState<string[]>(['garantie-duree', 'livraison-delais-dakar', 'paiement-moyens']);
  const [searchQuery, setSearchQuery] = useState('');

  // Toggle open state for accordion
  const toggleItem = (id: string) => {
    setOpenIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Open all or collapse all
  const handleToggleAll = () => {
    if (openIds.length > 0) {
      setOpenIds([]);
    } else {
      setOpenIds(FAQ_DATA.map((item) => item.id));
    }
  };

  // Filtered items based on category and search query
  const filteredFaq = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchCategory = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = 
        !q || 
        item.question.toLowerCase().includes(q) || 
        item.answer.toLowerCase().includes(q) ||
        (item.highlights && item.highlights.some(h => h.toLowerCase().includes(q)));
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="faq-section" className="w-full bg-[#101116] border border-[#212430] rounded-3xl p-6 sm:p-10 lg:p-12 space-y-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#d8f537]/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#25d366]/5 blur-3xl rounded-full pointer-events-none" />

      {/* Header of FAQ */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#1f222d] relative z-10">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#191b24] border border-[#2b2e3c] text-xs font-bold text-[#d8f537]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Foire Aux Questions</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-tech">
            Questions Fréquentes sur Easy Business Tech
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Tout ce que vous devez savoir sur notre <strong className="text-white">garantie officielle 12 mois</strong>, la <strong className="text-white">livraison express en moins de 2h à Dakar</strong> et nos <strong className="text-white">moyens de paiement sécurisés</strong> (Cash, Wave, OM).
          </p>
        </div>

        {/* Global Action: expand all */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleAll}
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-[#171922] hover:bg-[#20232e] text-gray-300 hover:text-white border border-[#272b38] transition-colors cursor-pointer"
          >
            {openIds.length > 0 ? 'Tout fermer' : 'Tout déplier'}
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 relative z-10">
        
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === 'all'
                ? 'bg-[#d8f537] text-black shadow-md shadow-[#d8f537]/20'
                : 'bg-[#151720] text-gray-300 hover:text-white border border-[#252836]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Toutes ({FAQ_DATA.length})</span>
          </button>

          <button
            onClick={() => setActiveCategory('garantie')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === 'garantie'
                ? 'bg-[#d8f537] text-black shadow-md shadow-[#d8f537]/20'
                : 'bg-[#151720] text-gray-300 hover:text-white border border-[#252836]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Garantie 12 Mois & SAV</span>
          </button>

          <button
            onClick={() => setActiveCategory('livraison')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === 'livraison'
                ? 'bg-[#d8f537] text-black shadow-md shadow-[#d8f537]/20'
                : 'bg-[#151720] text-gray-300 hover:text-white border border-[#252836]'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Livraison Dakar &lt; 2h</span>
          </button>

          <button
            onClick={() => setActiveCategory('paiement')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === 'paiement'
                ? 'bg-[#d8f537] text-black shadow-md shadow-[#d8f537]/20'
                : 'bg-[#151720] text-gray-300 hover:text-white border border-[#252836]'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Paiement & Facturation</span>
          </button>
        </div>

        {/* Live Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une réponse (ex: Wave, scellé, Almadies)..."
            className="w-full bg-[#151720] border border-[#262a38] text-xs text-white placeholder-gray-500 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-[#d8f537] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 hover:text-white"
            >
              Effacer
            </button>
          )}
        </div>

      </div>

      {/* Accordion Items List */}
      <div className="space-y-3 relative z-10">
        {filteredFaq.length === 0 ? (
          <div className="text-center py-12 bg-[#14161f] border border-[#222532] rounded-2xl p-6">
            <HelpCircle className="w-8 h-8 text-gray-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-white">Aucune question ne correspond à votre recherche « {searchQuery} »</p>
            <p className="text-xs text-gray-400 mt-1">
              Contactez directement nos conseillers sur WhatsApp pour une réponse immédiate.
            </p>
            <a
              href={buildWhatsAppUrl(`Bonjour Easy Business Tech, j'ai une question : ${searchQuery}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#25d366] text-black font-bold text-xs rounded-xl"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Poser ma question sur WhatsApp</span>
            </a>
          </div>
        ) : (
          filteredFaq.map((item) => {
            const isOpen = openIds.includes(item.id);

            // Category badge helper
            const categoryIcon = 
              item.category === 'garantie' ? <ShieldCheck className="w-3.5 h-3.5 text-[#d8f537]" /> :
              item.category === 'livraison' ? <Truck className="w-3.5 h-3.5 text-[#25d366]" /> :
              <CreditCard className="w-3.5 h-3.5 text-[#d8f537]" />;

            const categoryLabel = 
              item.category === 'garantie' ? 'Garantie & SAV' :
              item.category === 'livraison' ? 'Livraison Dakar' :
              'Paiement & Facture';

            return (
              <div
                key={item.id}
                className={`transition-all duration-200 border rounded-2xl overflow-hidden ${
                  isOpen 
                    ? 'bg-[#151720] border-[#34384a] shadow-lg shadow-black/40' 
                    : 'bg-[#121319] border-[#20232c] hover:border-[#2b2f3d]'
                }`}
              >
                {/* Header / Button to toggle */}
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-5 sm:px-6 py-4.5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-1.5 rounded-lg bg-[#1a1d26] border border-[#2a2e3d] shrink-0">
                      {categoryIcon}
                    </span>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                        {categoryLabel}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#d8f537] transition-colors leading-snug font-tech">
                        {item.question}
                      </h3>
                    </div>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-[#191b24] border border-[#292d3b] text-gray-300 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#d8f537] text-black border-[#d8f537]' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Collapsible Content */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-[#1e212b] animate-in fade-in duration-200">
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed whitespace-pre-line mt-2">
                      {item.answer}
                    </p>

                    {/* Key Highlights Tags */}
                    {item.highlights && item.highlights.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-[#1c1f29] flex flex-wrap items-center gap-2">
                        {item.highlights.map((highlight, idx) => (
                          <div 
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1a1d26] border border-[#292d3b] text-[11px] font-medium text-gray-200"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#d8f537]" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer reassurance banner in FAQ */}
      <div className="pt-4 border-t border-[#1e212a] flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-2xl bg-[#25d366]/15 border border-[#25d366]/30 flex items-center justify-center text-[#25d366] shrink-0">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white font-tech">
              Vous avez une autre question spécifique ?
            </h4>
            <p className="text-[11px] text-gray-400">
              Nos conseillers sont disponibles 7j/7 au <strong>{COMPANY_INFO.phone}</strong> pour vous renseigner.
            </p>
          </div>
        </div>

        <a
          href={buildWhatsAppUrl("Bonjour Easy Business Tech, j'ai une question concernant vos produits et services.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25d366] hover:bg-[#20ba5a] text-black font-extrabold text-xs transition-transform hover:scale-105 shadow-md shadow-[#25d366]/20 cursor-pointer whitespace-nowrap"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Poser ma question sur WhatsApp</span>
        </a>
      </div>

    </section>
  );
};
