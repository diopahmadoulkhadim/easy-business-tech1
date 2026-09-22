import React, { useState } from 'react';
import { COMPANY_INFO, buildWhatsAppUrl } from '../data/products';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';

interface ContactPageProps {
  initialSubject?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ initialSubject = '' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    productInterest: initialSubject || 'Smartphone Apple (iPhone)',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const productOptions = [
    'Smartphone Apple (iPhone)',
    'Smartphone Samsung (Galaxy / Ultra)',
    'Smartphone Tecno (Camon / Spark)',
    'Smartphone Xiaomi (Redmi / Note)',
    'Écouteurs & Casques audio (AirPods, Buds...)',
    'Chargeurs & Câbles rapides GaN',
    'Power banks & Batteries externes',
    'Coques & Protections d’écran (9D)',
    'Commande groupée / Devis professionnel',
    'Autre question ou assistance technique'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMessage('Veuillez remplir votre nom, téléphone et message.');
      return;
    }
    setErrorMessage('');
    setIsSubmitted(true);
  };

  const generateWhatsAppMessageFromForm = () => {
    const text = 
      `*Nouvelle demande via formulaire Easy Business Tech*\n\n` +
      `👤 *Nom :* ${formData.fullName}\n` +
      `📞 *Téléphone :* ${formData.phone}\n` +
      `✉️ *Email :* ${formData.email || 'Non renseigné'}\n` +
      `🏷️ *Intérêt :* ${formData.productInterest}\n\n` +
      `📝 *Message :*\n${formData.message}`;
    return buildWhatsAppUrl(text);
  };

  return (
    <div className="w-full bg-[#0b0c0e] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161820] border border-[#2b2e3c] text-xs font-bold text-[#d8f537]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Contact & Devis Rapide</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-tech">
            Contactez Easy Business Tech à Dakar
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Vous souhaitez commander un smartphone, un accessoire, ou obtenir un conseil personnalisé ? Envoyez-nous un message ci-dessous ou écrivez-nous directement sur WhatsApp.
          </p>
        </div>

        {/* Main Grid: Contact Form + Direct Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Priority Card */}
            <div className="bg-gradient-to-br from-[#121b14] to-[#121418] border border-[#25d366]/40 p-6 rounded-3xl space-y-4 relative overflow-hidden shadow-xl">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-[#25d366]/20 text-[#25d366] text-[11px] font-black uppercase tracking-wider">
                  Le plus rapide
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-[#25d366] animate-pulse"></span>
                  Réponse en &lt; 15 min
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white font-tech">
                  WhatsApp Direct
                </h3>
                <p className="text-xs text-gray-300">
                  Échangez en direct avec nos conseillers techniques à Dakar pour valider votre commande instantanément.
                </p>
              </div>

              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#20ba5a] text-black font-extrabold py-3.5 px-4 rounded-xl text-xs transition-colors shadow-lg shadow-[#25d366]/20"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Ouvrir WhatsApp ({COMPANY_INFO.phone})</span>
              </a>
            </div>

            {/* Contact Details List */}
            <div className="bg-[#121317] border border-[#20222a] p-6 rounded-3xl space-y-5">
              <h3 className="text-base font-bold text-white font-tech">
                Nos Coordonnées Officielles
              </h3>

              <div className="space-y-4 text-xs">
                {/* Phone */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#161820] border border-[#22242e]">
                  <div className="w-9 h-9 rounded-xl bg-[#1f222b] text-[#d8f537] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Téléphone / WhatsApp</span>
                    <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="text-sm font-bold text-white hover:text-[#d8f537] transition-colors">
                      {COMPANY_INFO.phone}
                    </a>
                    <span className="block text-[11px] text-gray-400 mt-0.5">Appels directs & WhatsApp</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#161820] border border-[#22242e]">
                  <div className="w-9 h-9 rounded-xl bg-[#1f222b] text-[#d8f537] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Adresse Email</span>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-xs font-bold text-white hover:text-[#d8f537] transition-colors break-all">
                      {COMPANY_INFO.email}
                    </a>
                    <span className="block text-[11px] text-gray-400 mt-0.5">Réponse dans la journée</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#161820] border border-[#22242e]">
                  <div className="w-9 h-9 rounded-xl bg-[#1f222b] text-[#d8f537] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Localisation</span>
                    <p className="text-xs font-bold text-white">
                      {COMPANY_INFO.address}
                    </p>
                    <span className="block text-[11px] text-gray-400 mt-0.5">Livraison express dans tout Dakar et ses environs</span>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#161820] border border-[#22242e]">
                  <div className="w-9 h-9 rounded-xl bg-[#1f222b] text-[#d8f537] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Horaires de service</span>
                    <p className="text-xs font-semibold text-white">
                      {COMPANY_INFO.workingHours}
                    </p>
                    <span className="block text-[11px] text-[#25d366] mt-0.5">Assistance WhatsApp 7j/7</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Dakar Delivery Zone Box */}
            <div className="bg-[#121317] border border-[#20222a] p-5 rounded-3xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <MapPin className="w-4 h-4 text-[#d8f537]" />
                <span>Zones de livraison express à Dakar :</span>
              </div>
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                {['Plateau', 'Almadies', 'Mermoz', 'Sacré-Cœur', 'Fann', 'Point E', 'Médina', 'Ouakam', 'Yoff', 'Liberté', 'Maristes', 'Parcelles Assainies', 'Guédiawaye', 'Pikine', 'Rufisque'].map((zone) => (
                  <span key={zone} className="px-2 py-0.5 rounded-lg bg-[#181a22] border border-[#252834] text-gray-300">
                    {zone}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-gray-400">
                + Expédition sécurisée sous 24h à Thiès, Saint-Louis, Mbour, Touba et toutes les autres régions du Sénégal.
              </p>
            </div>

          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#121317] border border-[#20222a] p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#d8f537]"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#d8f537]">
                    Formulaire de contact
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold text-white font-tech">
                  Envoyez-nous votre demande
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Remplissez ce formulaire pour commander un produit ou demander des informations détaillées.
                </p>
              </div>

              {/* Form Success State */}
              {isSubmitted ? (
                <div className="bg-[#151c16] border border-[#25d366]/40 p-6 rounded-2xl text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#25d366]/20 text-[#25d366] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-white font-tech">
                    Message transmis avec succès !
                  </h3>

                  <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
                    Merci <strong>{formData.fullName}</strong>. Notre équipe Easy Business Tech à Dakar a bien reçu votre demande concernant « {formData.productInterest} » et vous recontactera très rapidement au <strong>{formData.phone}</strong>.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={generateWhatsAppMessageFromForm()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#20ba5a] text-black font-extrabold py-3 px-5 rounded-xl text-xs transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Transmettre aussi sur WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          fullName: '',
                          phone: '',
                          email: '',
                          productInterest: 'Smartphone Apple (iPhone)',
                          message: ''
                        });
                      }}
                      className="w-full sm:w-auto px-4 py-3 rounded-xl bg-[#1e2028] text-gray-300 hover:text-white text-xs font-semibold"
                    >
                      Nouveau message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {errorMessage && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="fullName" className="text-xs font-bold text-gray-300">
                        Nom complet <span className="text-[#d8f537]">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        placeholder="Ex: Moussa Diop"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-[#181a21] border border-[#272a36] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d8f537] transition-colors"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-xs font-bold text-gray-300">
                        Numéro WhatsApp / Téléphone <span className="text-[#d8f537]">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        placeholder="Ex: +221 77 123 45 67"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#181a21] border border-[#272a36] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d8f537] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-gray-300">
                        Adresse email <span className="text-gray-500 font-normal">(facultatif)</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Ex: exemple@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#181a21] border border-[#272a36] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d8f537] transition-colors"
                      />
                    </div>

                    {/* Product of Interest */}
                    <div className="space-y-1.5">
                      <label htmlFor="productInterest" className="text-xs font-bold text-gray-300">
                        Objet ou produit recherché
                      </label>
                      <select
                        id="productInterest"
                        value={formData.productInterest}
                        onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                        className="w-full bg-[#181a21] border border-[#272a36] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d8f537] transition-colors cursor-pointer"
                      >
                        {productOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#181a21]">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-bold text-gray-300">
                      Votre message ou détails de votre commande <span className="text-[#d8f537]">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      placeholder="Indiquez le modèle, la couleur désirée, votre adresse de livraison à Dakar ou votre budget..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#181a21] border border-[#272a36] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d8f537] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-[#d8f537] hover:bg-[#c9e62f] text-black font-extrabold py-3.5 px-6 rounded-xl text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Envoyer ma demande de contact</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-gray-500 text-center">
                    En soumettant ce formulaire, vos données sont directement transmises à l'équipe Easy Business Tech à Dakar pour traiter votre demande en toute confidentialité.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

        {/* FAQ Section to reinforce conversion */}
        <div className="bg-[#101115] border border-[#1e2028] rounded-3xl p-8 sm:p-12 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d8f537]">
              <HelpCircle className="w-4 h-4" />
              <span>Questions fréquentes</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white font-tech">
              Tout ce que vous devez savoir avant de commander
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="bg-[#14161d] p-5 rounded-2xl border border-[#222530] space-y-2">
              <h4 className="text-xs font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d8f537] shrink-0" />
                <span>Puis-je vérifier le téléphone avant de payer ?</span>
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Absolument ! Lors de la livraison à Dakar, vous avez la possibilité de vérifier la boîte, le numéro de série IMEI et l'état impeccable du produit avant de régler au livreur.
              </p>
            </div>

            <div className="bg-[#14161d] p-5 rounded-2xl border border-[#222530] space-y-2">
              <h4 className="text-xs font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d8f537] shrink-0" />
                <span>Quels sont les modes de règlement acceptés ?</span>
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Nous acceptons le paiement en espèces à la livraison, ainsi que les transferts instantanés Wave et Orange Money sans frais additionnels.
              </p>
            </div>

            <div className="bg-[#14161d] p-5 rounded-2xl border border-[#222530] space-y-2">
              <h4 className="text-xs font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d8f537] shrink-0" />
                <span>Quelle est la durée de la garantie ?</span>
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Nos smartphones neufs bénéficient de la garantie constructeur officielle de 12 mois. Nous vous délivrons une facture légale lors de l'achat.
              </p>
            </div>

            <div className="bg-[#14161d] p-5 rounded-2xl border border-[#222530] space-y-2">
              <h4 className="text-xs font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d8f537] shrink-0" />
                <span>Comment se passe la livraison hors de Dakar ?</span>
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Nous expédions vos colis via des transporteurs partenaires sécurisés (La Poste, transporteurs interurbains agréés) avec suivi du colis et réception sous 24h à 48h.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
