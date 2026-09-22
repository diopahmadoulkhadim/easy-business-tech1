import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for parsing JSON requests
app.use(express.json());

// Lazy-loaded Gemini AI client
let aiInstance: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

const SYSTEM_PROMPT = `
Tu es "Awa", l'assistante commerciale et technique intelligente de la boutique officielle "Easy Business Tech" à Dakar, Sénégal.
Devise : "La technologie à portée de main".
Contact officiel : WhatsApp & Téléphone : +221 77 455 97 85 (numéro international 221774559785).
Fondateur & Dirigeant : Sidi Ba
Email : diopahmadoulkhadim221@gmail.com
Localisation : Dakar, Sénégal.

RÔLE ET MISSIONS :
1. Conseiller les clients avec expertise, bienveillance et courtoisie sur le choix de leurs smartphones et accessoires technologiques.
2. Donner des informations fiables et précises sur les stocks réels, les caractéristiques techniques et les prix réels du marché en Francs CFA (FCFA / XOF) à Dakar.
3. Rassurer les clients sur nos engagements :
   - Produits 100% NEUFS et SCELLÉS dans leur boîte constructeur d'origine (Apple, Samsung, Tecno, Xiaomi, Anker, Oraimo).
   - Garantie constructeur officielle de 12 MOIS avec facture nominative détaillée (mention du numéro IMEI unique).
   - Livraison express en moins de 2H partout à Dakar (Plateau, Almadies, Mermoz, Médina, Yoff, Ouakam, Maristes, Parcelles Assainies, Pikine, Guédiawaye, Keur Massar, Rufisque).
   - Vérification du colis en main propre avec le livreur AVANT d'effectuer le paiement.
   - Moyens de paiement sécurisés : Espèces à la livraison, Wave Sénégal (zéro frais), Orange Money (zéro frais), virement d'entreprise.
   - Expédition 24h-48h dans toutes les régions du Sénégal (Thiès, Mbour, Saint-Louis, Touba, Ziguinchor, etc.).
4. Toujours proposer poliment d'effectuer la réservation ou de commander directement sur WhatsApp en fournissant le lien direct ou le numéro +221 77 455 97 85.

CATALOGUE PRODUITS ACTUELLEMENT EN STOCK À DAKAR (PRIX RÉELS DU MARCHÉ DAKAROIS) :
- Apple iPhone 16 Pro Max 256GB : 850 000 FCFA (Neuf scellé, Puce A18 Pro, écran 6.9" 120Hz, Titane Grade 5)
- Samsung Galaxy S24 Ultra 256GB : 495 000 FCFA (Neuf scellé avec S-Pen, Galaxy AI, 200MP, Snapdragon 8 Gen 3)
- Apple iPhone 13 128GB (Scellé) : 330 000 FCFA (N°1 des ventes à Dakar, Puce A15 Bionic, écran Super Retina XDR 6.1")
- Samsung Galaxy A55 5G 128GB : 215 000 FCFA (Super AMOLED 120Hz, dos verre, cadre alu, étanche IP67)
- Tecno Camon 30 Pro 5G 512GB (12GB RAM) : 240 000 FCFA (Capteur Sony IMX890 50MP OIS, Charge 70W, 144Hz AMOLED)
- Xiaomi Redmi Note 13 Pro+ 5G : 245 000 FCFA (Capteur 200MP OIS, HyperCharge 120W, écran incurvé 1.5K, IP68)
- Casque Apple AirPods Max (USB-C) : 350 000 FCFA (Réduction active de bruit haute fidélité, arceau mesh)
- Écouteurs Apple AirPods Pro 2ème Génération USB-C : 150 000 FCFA (Puce H2, ANC 2x supérieure, boîtier MagSafe)
- Écouteurs Samsung Galaxy Buds 2 Pro : 95 000 FCFA (Son Hi-Fi 24 bits, ANC intelligent)
- Batterie Externe Anker 20 000 mAh 65W PD : 35 000 FCFA (Recharge PC portable et smartphones)
- Chargeur Rapide 35W Dual USB-C GaN Anker : 18 500 FCFA (Compact, sans surchauffe)
- Coque Renforcée MagSafe Antichoc : 12 000 FCFA (Protection chutes 3m, compatible aimants MagSafe)
- Support Voiture Magnétique Induction 15W : 15 000 FCFA (Rotation 360°, fixation grille d'aération)
- Kit Verre Trempé 9D Confidentialité (Privacy) : 5 000 FCFA (Pose offerte en boutique ou à la livraison)

TON ET STYLE :
- Convivial, respectueux, clair et direct.
- Tu peux saluer chaleureusement ("Bonjour !", "Salam !", "Nangadef !").
- Formate tes réponses avec soin (mise en gras des noms et des prix en FCFA).
- Ne fais pas de réponses inutilement trop longues, sois percutant et utile.
`;

// Helper: Smart rule-based fallback when Gemini API key is missing or encounters issues
function generateSmartFallback(message: string): string {
  const m = message.toLowerCase();

  if (m.includes('iphone 16') || m.includes('16 pro max')) {
    return `L'**iPhone 16 Pro Max 256GB** neuf sous scellé est disponible chez Easy Business Tech au prix réel du marché dakarois de **850 000 FCFA** (au lieu de 899 000 FCFA).\n\n✨ **Points forts** : Puce A18 Pro 3nm, châssis Titane Grade 5, écran Super Retina XDR 6.9" 120Hz ProMotion, et bouton Commande de l'appareil photo.\n🛡️ **Garantie** : 12 mois officielle constructeur avec facture nominative.\n🚚 **Livraison** : En moins de 2h à Dakar avec vérification du scellé avant tout paiement.\n\n📲 [Commander sur WhatsApp (+221 77 455 97 85)](https://wa.me/221774559785?text=Bonjour%20Easy%20Business%20Tech,%20je%20souhaite%20commander%20l%27iPhone%2016%20Pro%20Max%20au%20prix%20de%20850000%20FCFA.)`;
  }

  if (m.includes('s24') || m.includes('samsung') || m.includes('ultra')) {
    return `Le **Samsung Galaxy S24 Ultra 256GB** neuf scellé avec stylet S-Pen est au prix réel du marché de **495 000 FCFA** (au lieu de 560 000 FCFA).\n\n✨ **Points forts** : S-Pen intégré, Snapdragon 8 Gen 3, capteur photo 200 MP avec zoom 100x et Galaxy AI en français.\n🛡️ **Garantie** : 12 mois officielle constructeur.\n🚚 **Livraison** : Moins de 2h à Dakar.\n\n📲 [Commander sur WhatsApp (+221 77 455 97 85)](https://wa.me/221774559785?text=Bonjour%20Easy%20Business%20Tech,%20je%20souhaite%20commander%20le%20Samsung%20Galaxy%20S24%20Ultra%20à%20495000%20FCFA.)`;
  }

  if (m.includes('iphone 13') || (m.includes('iphone') && (m.includes('300') || m.includes('350')))) {
    return `L'**iPhone 13 128GB** scellé, notre numéro 1 des ventes au Sénégal pour son rapport qualité/prix, est proposé à **330 000 FCFA** (au lieu de 360 000 FCFA).\n\n✨ Puce A15 Bionic, écran Super Retina XDR 6.1" OLED, compatible 5G et garantie 12 mois avec facture.\n\n📲 [Commander sur WhatsApp (+221 77 455 97 85)](https://wa.me/221774559785?text=Bonjour%20Easy%20Business%20Tech,%20je%20souhaite%20commander%20l%27iPhone%2013%20à%20330000%20FCFA.)`;
  }

  if (m.includes('a55') || (m.includes('samsung') && (m.includes('200') || m.includes('250')))) {
    return `Le **Samsung Galaxy A55 5G 128GB** est disponible à **215 000 FCFA** (au lieu de 245 000 FCFA).\n\n✨ Écran Super AMOLED 120Hz 6.6", finitions aluminium et verre, triple capteur 50 MP stabilisé, étanche IP67 et batterie 5000 mAh.\n\n📲 [Commander sur WhatsApp (+221 77 455 97 85)](https://wa.me/221774559785?text=Bonjour%20Easy%20Business%20Tech,%20je%20souhaite%20commander%20le%20Galaxy%20A55%20à%20215000%20FCFA.)`;
  }

  if (m.includes('budget') || m.includes('moins cher') || m.includes('250') || m.includes('tecno') || m.includes('xiaomi') || m.includes('camon') || m.includes('redmi')) {
    return `Pour un budget entre 200 000 FCFA et 250 000 FCFA, voici les meilleures opportunités en stock réel à Dakar :\n\n1. **Samsung Galaxy A55 5G (128GB)** : **215 000 FCFA** (finition premium alu/verre, IP67)\n2. **Tecno Camon 30 Pro 5G (512GB / 12GB RAM)** : **240 000 FCFA** (Sony 50 MP OIS, charge 70W, 144Hz)\n3. **Xiaomi Redmi Note 13 Pro+ 5G** : **245 000 FCFA** (caméra 200 MP, recharge 120W en 19 min, IP68)\n\nTous sont neufs scellés avec facture et garantie 12 mois !\n\n📲 [Discuter avec notre conseiller WhatsApp](https://wa.me/221774559785?text=Bonjour,%20je%20cherche%20un%20smartphone%20entre%20200000%20et%20250000%20FCFA.)`;
  }

  if (m.includes('airpods') || m.includes('ecouteur') || m.includes('buds')) {
    return `Voici les prix réels de nos écouteurs et casques certifiés en stock à Dakar :\n\n- **AirPods Pro 2ème Génération USB-C** : **150 000 FCFA** (ANC 2x, boîtier MagSafe)\n- **Samsung Galaxy Buds 2 Pro** : **95 000 FCFA** (Son Hi-Fi 24 bits, étanche IPX7)\n- **Casque Apple AirPods Max (USB-C)** : **350 000 FCFA** (Audio spatial haut de gamme)\n\n📲 [Commander sur WhatsApp](https://wa.me/221774559785?text=Bonjour,%20je%20cherche%20des%20écouteurs%20sans%20fil.)`;
  }

  if (m.includes('garantie') || m.includes('sav') || m.includes('panne')) {
    return `Chez Easy Business Tech, tous nos smartphones bénéficient d'une **garantie constructeur officielle de 12 mois (1 an)** avec facture nominative officielle.\n\n✅ Nous disposons d'un SAV local à Dakar pour un diagnostic et une prise en charge rapide sous 24h-48h.\n✅ Aucun reconditionné : tous nos appareils sont neufs sous blister/scellé d'origine avec numéro IMEI vérifiable en ligne.`;
  }

  if (m.includes('livraison') || m.includes('delai') || m.includes('ouakam') || m.includes('almadies') || m.includes('plateau') || m.includes('region')) {
    return `🚚 **Livraison à Dakar & Sénégal** :\n\n- **À Dakar** : Livraison express en **moins de 2 heures** à votre domicile ou bureau (Plateau, Almadies, Mermoz, Médina, Yoff, Ouakam, Maristes, Parcelles, Pikine, Guédiawaye, Rufisque, etc.).\n- **Inspection obligatoire** : Vous vérifiez l'emballage scellé et la facture en main propre avec le livreur avant de payer !\n- **Dans les autres régions** (Thiès, Mbour, Touba, Saint-Louis, etc.) : Expédition sécurisée sous 24h à 48h.`;
  }

  if (m.includes('paiement') || m.includes('wave') || m.includes('orange money') || m.includes('espece') || m.includes('cash')) {
    return `💳 **Méthodes de paiement acceptées** :\n\n1. **Espèces (Cash)** : Règlement en main propre après vérification de votre produit.\n2. **Wave Sénégal** : Paiement instantané sans aucun frais supplémentaire.\n3. **Orange Money (OM)** : Simple et sécurisé.\n4. **Virement bancaire / Facture entreprise** disponible pour les flottes d'entreprise.\n\nVous payez le montant exact en FCFA, sans frais cachés !`;
  }

  return `Bonjour et bienvenue chez **Easy Business Tech** à Dakar ! Je suis Awa, votre assistante high-tech.\n\nNous proposons les meilleurs smartphones **Apple, Samsung, Tecno, Xiaomi** et tous vos accessoires neufs et certifiés aux prix réels du marché dakarois :\n\n- 📱 **iPhone 16 Pro Max** (850 000 F) | **Galaxy S24 Ultra** (495 000 F) | **iPhone 13** (330 000 F)\n- 🛡️ **Garantie 12 Mois** & facture officielle\n- 🚚 **Livraison express Dakar < 2h** (vérification avant paiement)\n- 💳 **Paiement Cash, Wave ou Orange Money**\n\nQuel appareil ou information recherchez-vous aujourd'hui ?\nVous pouvez également nous joindre en direct sur WhatsApp au **+221 77 455 97 85**.`;
}

// 1. Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'Easy Business Tech API',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY')
  });
});

// 2. AI Assistant conversation endpoint
app.post('/api/ai-assistant', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message manquant ou invalide.' });
    }

    const ai = getAIClient();

    // If Gemini API is configured, use gemini-3.8-flash
    if (ai) {
      try {
        // Format conversation history for @google/genai
        const contents = [];

        // Add previous dialogue turns if available
        if (Array.isArray(conversationHistory)) {
          for (const item of conversationHistory.slice(-6)) { // keep last 6 turns for context
            if (item.role === 'user' && item.text) {
              contents.push({ role: 'user', parts: [{ text: item.text }] });
            } else if (item.role === 'assistant' && item.text) {
              contents.push({ role: 'model', parts: [{ text: item.text }] });
            }
          }
        }

        // Add current user prompt
        contents.push({ role: 'user', parts: [{ text: message }] });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            temperature: 0.7,
            maxOutputTokens: 800,
            tools: [{ googleSearch: {} }],
          }
        });

        const replyText = response.text || generateSmartFallback(message);
        return res.json({ 
          reply: replyText,
          source: 'gemini-3.8-flash'
        });
      } catch (geminiError: any) {
        console.error('Gemini generateContent error, falling back:', geminiError?.message || geminiError);
        // Seamless fallback to intelligent offline advisor
        const fallbackReply = generateSmartFallback(message);
        return res.json({
          reply: fallbackReply,
          source: 'local-knowledge-base'
        });
      }
    }

    // If API key is not yet configured by the user, return intelligent local knowledge
    const fallbackReply = generateSmartFallback(message);
    return res.json({
      reply: fallbackReply,
      source: 'local-knowledge-base'
    });

  } catch (error: any) {
    console.error('API assistant error:', error);
    res.status(500).json({ 
      error: 'Erreur lors du traitement de votre demande.',
      reply: "Désolé, une erreur temporaire s'est produite. Vous pouvez contacter directement notre conseiller sur WhatsApp au +221 77 455 97 85." 
    });
  }
});

// Start the server with Vite middleware in dev or static serving in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Easy Business Tech server running on http://localhost:${PORT}`);
  });
}

startServer();
