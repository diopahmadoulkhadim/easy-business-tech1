import { Product, Review } from '../types';

export const COMPANY_INFO = {
  name: 'Easy Business Tech',
  slogan: 'La technologie à portée de main',
  serviceSlogan: 'Votre technologie, notre expertise',
  phone: '+221 77 455 97 85',
  phoneRaw: '221774559785',
  email: 'diopahmadoulkhadim221@gmail.com',
  address: 'Dakar, Sénégal',
  workingHours: 'Lundi - Samedi : 08h30 - 20h00 | Dimanche : 10h00 - 18h00',
  deliveryZone: 'Livraison express à Dakar en moins de 2h & expédition sous 24/48h dans toutes les régions du Sénégal',
  profileImage: '/profile.jpg',
  founderName: 'Sidi Ba',
  founderTitle: 'Fondateur & Dirigeant Easy Business Tech',
  founderQuote: "Ne jugez jamais l'avenir d'une personne sur la base de ses conditions actuelles, car le temps a le pouvoir de transformer le charbon noir en un diamant brillant.",
};

export const DEFAULT_WHATSAPP_MESSAGE = 'Bonjour, je souhaite des informations sur vos produits.';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'iPhone 16 Pro Max 256GB',
    brand: 'Apple',
    category: 'smartphones',
    mainCategory: 'telephones',
    price: 850000,
    originalPrice: 899000,
    discountPercentage: 5,
    badge: 'Nouveau Scellé',
    rating: 5.0,
    reviewsCount: 38,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1695048133021-95c52c2865ba?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1695048065050-8b4b241ce5ef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    isBestseller: true,
    isNew: true,
    specs: ['Puce A18 Pro 3nm', 'Écran Super Retina XDR 6.9" 120Hz ProMotion', 'Triple capteur Fusion 48 Mpx & Téléobjectif 5x', 'Châssis Titane Grade 5 & Bouton Commande'],
    description: 'Le summum de la technologie Apple. Finition en titane poli, autonomie record et performances graphiques inégalées pour les professionnels à Dakar. Livré neuf sous blister scellé avec facture et garantie 12 mois constructeur.'
  },
  {
    id: 'prod-2',
    name: 'Samsung Galaxy S24 Ultra 256GB',
    brand: 'Samsung',
    category: 'smartphones',
    mainCategory: 'telephones',
    price: 495000,
    originalPrice: 560000,
    discountPercentage: 12,
    badge: 'Top Promo Dakar',
    rating: 4.9,
    reviewsCount: 52,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584006682522-dc17d6c0d963?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    isBestseller: true,
    specs: ['Galaxy AI avec traduction temps réel', 'Capteur photo 200 MP ultra-détaillé & Zoom x100', 'Stylet S Pen haute précision inclus', 'Écran plat Dynamic AMOLED 2X 120Hz 2600 nits'],
    description: 'Le flagship ultime de Samsung à prix négocié sur le marché dakarois. Châssis titane, S-Pen intégré, intelligence artificielle avancée et autonomie de 2 jours.'
  },
  {
    id: 'prod-3',
    name: 'iPhone 13 128GB (Scellé)',
    brand: 'Apple',
    category: 'smartphones',
    mainCategory: 'telephones',
    price: 330000,
    originalPrice: 360000,
    discountPercentage: 8,
    badge: 'N°1 Ventes Dakar',
    rating: 4.9,
    reviewsCount: 118,
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    isBestseller: true,
    specs: ['Puce A15 Bionic ultra-fluide', 'Écran Super Retina XDR 6.1" OLED', 'Double capteur 12 Mpx avec Mode Cinématique', 'Autonomie remarquable & compatible 5G'],
    description: 'Le smartphone Apple le plus demandé à Dakar pour son rapport qualité/prix imbattable. Neuf sous scellé avec facture et garantie 12 mois.'
  },
  {
    id: 'prod-4',
    name: 'Samsung Galaxy A55 5G 128GB',
    brand: 'Samsung',
    category: 'smartphones',
    mainCategory: 'telephones',
    price: 215000,
    originalPrice: 245000,
    discountPercentage: 12,
    badge: 'Très Demandé',
    rating: 4.8,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    isBestseller: true,
    specs: ['Écran Super AMOLED 120Hz 6.6"', 'Triple capteur 50 MP avec stabilisation OIS', 'Châssis métal premium & dos en verre Gorilla Glass', 'Étanchéité IP67 & batterie 5000 mAh'],
    description: 'Le milieu de gamme premium le plus populaire de Samsung au Sénégal. Finitions aluminium et verre, compatibilité 5G et sécurité Knox Vault.'
  },
  {
    id: 'prod-5',
    name: 'Tecno Camon 30 Pro 5G 512GB',
    brand: 'Tecno',
    category: 'smartphones',
    mainCategory: 'telephones',
    price: 240000,
    originalPrice: 265000,
    discountPercentage: 9,
    badge: 'Top Vente Dakar',
    rating: 4.8,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    isBestseller: true,
    specs: ['Processeur Dimensity 8200 Ultra 5G', 'Capteur Sony IMX890 50MP avec OIS', 'Charge ultra-rapide 70W', 'Écran AMOLED 144Hz 6.78"'],
    description: 'Le champion du rapport qualité-prix à Dakar. Performances photo de nuit de haut vol, stockage géant de 512 Go et recharge de 0 à 100% en 35 minutes.'
  },
  {
    id: 'prod-6',
    name: 'Xiaomi Redmi Note 13 Pro+ 5G',
    brand: 'Xiaomi',
    category: 'smartphones',
    mainCategory: 'telephones',
    price: 245000,
    originalPrice: 275000,
    discountPercentage: 11,
    badge: 'Bestseller',
    rating: 4.7,
    reviewsCount: 41,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    isBestseller: true,
    specs: ['Écran incurvé 1.5K AMOLED 120Hz', 'Caméra 200 Mpx avec OIS & Zoom x4 sans perte', 'HyperCharge 120W (0 à 100% en 19 min)', 'Résistance à l’eau et poussière IP68'],
    description: 'Design premium avec écran incurvé ultra-lumineux, capteur photo 200 MP et recharge éclair 120W, parfaitement adaptée au quotidien dynamique dakarois.'
  },
  {
    id: 'prod-7',
    name: 'Casque Audio Sans Fil Apple AirPods Max',
    brand: 'Apple',
    category: 'ecouteurs',
    mainCategory: 'accessoires',
    price: 350000,
    originalPrice: 390000,
    discountPercentage: 10,
    badge: 'Audio Pro',
    rating: 4.8,
    reviewsCount: 29,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    specs: ['Réduction active du bruit de pointe', 'Audio Spatial avec suivi dynamique de la tête', 'Autonomie 20h avec recharge rapide USB-C', 'Arceau en tissu mesh respirant'],
    description: 'Une acoustique haute fidélité pour vos appels professionnels et vos moments de détente musicale sans aucune distraction sonore à Dakar.'
  },
  {
    id: 'prod-8',
    name: 'AirPods Pro 2ème Génération USB-C',
    brand: 'Apple',
    category: 'ecouteurs',
    mainCategory: 'accessoires',
    price: 150000,
    originalPrice: 170000,
    discountPercentage: 12,
    badge: 'En Stock',
    rating: 4.9,
    reviewsCount: 78,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    isBestseller: true,
    specs: ['Puce audio Apple H2 haute fidélité', 'Réduction active du bruit 2x supérieure', 'Boîtier de charge MagSafe USB-C avec haut-parleur', 'Mode Transparence adaptative'],
    description: 'Écouteurs sans fil référence avec audio adaptatif et jusqu’à 30h d’autonomie avec le boîtier. Neuf et garanti constructeur Apple.'
  },
  {
    id: 'prod-9',
    name: 'Samsung Galaxy Buds 2 Pro',
    brand: 'Samsung',
    category: 'ecouteurs',
    mainCategory: 'accessoires',
    price: 95000,
    originalPrice: 115000,
    discountPercentage: 17,
    badge: 'En Stock',
    rating: 4.8,
    reviewsCount: 37,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    specs: ['Son Hi-Fi sans perte 24 bits', 'Réduction active du bruit intelligente avec détection vocale', 'Design ergonomique compact', 'Résistance à l’eau certifiée IPX7'],
    description: 'Son studio immersif avec réduction de bruit active intelligente et confort absolu pour une utilisation continue tout au long de la journée.'
  },
  {
    id: 'prod-10',
    name: 'Batterie Externe Power Bank 20 000 mAh Anker 65W',
    brand: 'Anker',
    category: 'powerbanks',
    mainCategory: 'accessoires',
    price: 35000,
    originalPrice: 42000,
    discountPercentage: 17,
    badge: 'Certifié Anker',
    rating: 4.9,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1609592426868-b0a649397637?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1609592426868-b0a649397637?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    isBestseller: true,
    specs: ['Capacité réelle certifiée 20 000 mAh', 'Sortie USB-C Power Delivery 65W ultra-rapide', 'Recharge simultanée de 3 appareils', 'Écran LED digital de pourcentage restant'],
    description: 'Indispensable pour vos déplacements au Sénégal. Recharge un smartphone 4 à 5 fois et permet même d’alimenter un MacBook ou PC portable en urgence.'
  },
  {
    id: 'prod-11',
    name: 'Chargeur Rapide 35W Dual USB-C GaN Anker',
    brand: 'Anker',
    category: 'chargeurs',
    mainCategory: 'accessoires',
    price: 18500,
    originalPrice: 24000,
    discountPercentage: 23,
    badge: 'Promo Dakar',
    rating: 4.9,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1609592426868-b0a649397637?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    specs: ['Technologie GaN III compacte sans surchauffe', '2 ports USB-C Power Delivery simultanés', 'Compatible iPhone 16/15, Samsung S24/A, Tecno', 'Contrôle thermique dynamique PowerIQ 3.0'],
    description: 'Bloc de charge compact haute performance qui préserve la santé de vos batteries grâce au contrôle intelligent de la température.'
  },
  {
    id: 'prod-12',
    name: 'Coque Renforcée MagSafe Antichoc',
    brand: 'Apple',
    category: 'protections',
    mainCategory: 'accessoires',
    price: 12000,
    originalPrice: 15000,
    discountPercentage: 20,
    badge: 'Bestseller',
    rating: 4.9,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    specs: ['Coins à coussins d’air (chutes jusqu’à 3 mètres)', 'Anneau magnétique ultra-puissant compatible MagSafe', 'Bordures biseautées protégeant écran et objectifs', 'Matériau polymère anti-jaunissement longue durée'],
    description: 'Protection maximale contre les chutes accidentelles tout en préservant la finesse, l’esthétique et les capacités de recharge sans fil de votre smartphone.'
  },
  {
    id: 'prod-13',
    name: 'Support Voiture Magnétique Induction 15W',
    brand: 'Oraimo',
    category: 'supports',
    mainCategory: 'accessoires',
    price: 15000,
    originalPrice: 18500,
    discountPercentage: 19,
    badge: 'Nouveau',
    rating: 4.7,
    reviewsCount: 46,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    specs: ['Recharge sans fil Qi rapide 15W', 'Pince de fixation grille d’aération avec verrou mécanique', 'Rotation 360° pour navigation GPS fluide', 'Aimants néodyme N52 ultra-stables'],
    description: 'Conduisez en toute sérénité à Dakar avec votre téléphone fermement maintenu en face de vous pendant qu’il recharge rapidement et reste accessible.'
  },
  {
    id: 'prod-14',
    name: 'Kit Verre Trempé 9D Confidentialité (Privacy)',
    brand: 'Apple',
    category: 'protections',
    mainCategory: 'accessoires',
    price: 5000,
    originalPrice: 7500,
    discountPercentage: 33,
    badge: 'Pose Offerte',
    rating: 4.8,
    reviewsCount: 140,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    specs: ['Filtre anti-regards indiscrets à 28° d’angle', 'Verre trempé thermique dureté 9H anti-rayures', 'Pose gratuite sans bulles d’air', 'Revêtement oléophobe anti-traces de doigts'],
    description: 'Protégez votre écran des chocs et préservez la confidentialité de vos messages, relevés bancaires et transactions Wave / Orange Money dans les transports à Dakar. Pose offerte en boutique ou à la livraison.'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Moussa Ndiaye',
    location: 'Dakar, Almadies',
    comment: 'Service impeccable ! J’ai commandé mon iPhone 16 Pro via WhatsApp à 11h, et je l’ai reçu scellé chez moi à 13h avec facture et garantie. Équipe très professionnelle.',
    rating: 5,
    date: 'Il y a 3 jours',
    productBought: 'iPhone 16 Pro Max'
  },
  {
    id: 'rev-2',
    author: 'Fatou Binetou Seck',
    location: 'Dakar, Plateau',
    comment: 'J’hésitais entre le Samsung S24 et le Tecno Camon pour mon travail. Le conseiller sur WhatsApp a pris le temps de tout m’expliquer selon mon budget. Je recommande Easy Business Tech à 100% !',
    rating: 5,
    date: 'Il y a 1 semaine',
    productBought: 'Samsung Galaxy S24'
  },
  {
    id: 'rev-3',
    author: 'Ibrahima Fall',
    location: 'Dakar, Médina',
    comment: 'Chargeur Anker et Power Bank de qualité authentique. Pas de contrefaçon comme on en voit souvent ailleurs. Prix très honnêtes et livraison rapide.',
    rating: 5,
    date: 'Il y a 2 semaines',
    productBought: 'Batterie Externe Anker 20.000 mAh'
  },
  {
    id: 'rev-4',
    author: 'Aïssatou Diallo',
    location: 'Dakar, Mermoz',
    comment: 'Très réactifs sur WhatsApp ! Ils m’ont répondu en 5 minutes avec photos des modèles disponibles en boutique. Téléphone reçu sous scellé avec le film privacy posé proprement.',
    rating: 5,
    date: 'Il y a 2 semaines',
    productBought: 'Xiaomi Redmi Note 13 Pro+'
  }
];

export function formatPriceFCFA(amount: number): string {
  return new Intl.NumberFormat('fr-SN', {
    style: 'currency',
    currency: 'XOF',
    maximumFractionDigits: 0
  }).format(amount).replace('XOF', 'FCFA');
}

export function buildWhatsAppUrl(productOrMessage?: Product | string): string {
  const base = `https://wa.me/${COMPANY_INFO.phoneRaw}`;
  if (!productOrMessage) {
    const text = encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE);
    return `${base}?text=${text}`;
  }
  if (typeof productOrMessage === 'string') {
    return `${base}?text=${encodeURIComponent(productOrMessage)}`;
  }
  const text = encodeURIComponent(
    `Bonjour, je souhaite des informations sur ce produit :\n\n` +
    `📱 Produit : ${productOrMessage.name}\n` +
    `🏷️ Marque : ${productOrMessage.brand}\n` +
    `💰 Prix : ${formatPriceFCFA(productOrMessage.price)}\n\n` +
    `Est-il toujours disponible en stock à Dakar ? Merci de m'indiquer les modalités de commande et de livraison.`
  );
  return `${base}?text=${text}`;
}
