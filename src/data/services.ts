import { ServiceItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'smartphones',
    icon: 'Smartphone',
    title: 'Vente de smartphones',
    shortDesc: 'Large sélection de smartphones neufs certifiés : Apple, Samsung, Tecno, Xiaomi et autres marques.',
    fullDesc: 'Découvrez une sélection rigoureuse de smartphones de grandes marques mondiales adaptées à tous les profils et tous les budgets. Que vous recherchiez le dernier iPhone en titane, la puissance photographique d’un Samsung Galaxy Ultra, ou le rapport qualité-prix imbattable d’un Tecno ou Xiaomi, nos appareils sont garantis neufs et authentiques.',
    features: [
      'Garantie officielle constructeur',
      'Modèles scellés avec facture légale',
      'Large éventail de prix (d’entrée de gamme aux flagships)',
      'Smartphones débloqués tout opérateur (Orange, Free, Expresso, etc.)'
    ],
    highlight: 'Apple, Samsung, Tecno, Xiaomi & plus'
  },
  {
    id: 'accessoires',
    icon: 'Headphones',
    title: 'Vente d’accessoires',
    shortDesc: 'Chargeurs rapides, câbles renforcés, écouteurs, casques, coques de protection et batteries externes.',
    fullDesc: 'Pour prolonger la durée de vie et décupler le potentiel de vos téléphones, nous proposons des accessoires certifiés de marques fiables (Apple, Samsung, Anker, Oraimo). Fini les câbles qui se dégradent en quelques semaines ou les chargeurs qui endommagent votre batterie.',
    features: [
      'Chargeurs rapides GaN et câbles tressés renforcés',
      'Écouteurs sans fil & casques avec réduction de bruit',
      'Coques antichocs et verres trempés 9D anti-regards indiscrets',
      'Power banks haute capacité pour vos déplacements'
    ],
    highlight: 'Accessoires 100% testés et certifiés'
  },
  {
    id: 'commande-en-ligne',
    icon: 'ShoppingBag',
    title: 'Commande en ligne simplifiée',
    shortDesc: 'Commandez en quelques secondes via notre catalogue interactif et finalisez directement sur WhatsApp.',
    fullDesc: 'Nous avons conçu une expérience d’achat moderne sans friction. Parcourez notre sélection, filtrez selon vos critères, et échangez directement avec notre équipe via WhatsApp ou notre formulaire pour valider votre commande en temps réel.',
    features: [
      'Validation instantanée sur WhatsApp en 1 clic',
      'Suivi personnalisé de votre commande en direct',
      'Paiement sécurisé à la livraison ou via Wave / Orange Money',
      'Réponse garantie en moins de 15 minutes'
    ],
    highlight: 'Zéro démarche compliquée, 100% rapide'
  },
  {
    id: 'livraison',
    icon: 'Truck',
    title: 'Service de livraison rapide',
    shortDesc: 'Livraison express à domicile ou au bureau sur Dakar et expédition rapide dans toutes les régions.',
    fullDesc: 'Recevez vos appareils dans les meilleures conditions de rapidité et de sécurité. Nos livreurs partenaires couvrent l’ensemble de la presqu’île de Dakar en express, et nous expédions également en toute confiance dans les grandes villes du Sénégal (Thiès, Saint-Louis, Mbour, Touba, Ziguinchor...).',
    features: [
      'Livraison express à Dakar en 2h à 4h',
      'Remise en mains propres sécurisée avec vérification sur place',
      'Expédition fiable dans les régions du Sénégal',
      'Emballage renforcé et discret'
    ],
    highlight: 'Dakar & toutes les régions du Sénégal'
  },
  {
    id: 'conseil',
    icon: 'MessageCircleHeart',
    title: 'Conseil et accompagnement',
    shortDesc: 'Notre équipe vous oriente pour trouver le modèle idéal adapté à votre budget et votre usage.',
    fullDesc: 'Vous hésitez entre deux modèles ? Vous ne savez pas quelle capacité de stockage choisir ou quel accessoire convient à votre smartphone ? Notre équipe d’experts passionnés vous écoute et vous conseille objectivement, sans forcer la vente, pour que votre investissement soit le plus judicieux.',
    features: [
      'Écoute attentive de vos besoins réels',
      'Comparatif objectif des fonctionnalités et autonomie',
      'Optimisation selon votre budget sans surprise',
      'Disponibilité directe par téléphone ou WhatsApp'
    ],
    highlight: 'Orientation 100% bienveillante'
  },
  {
    id: 'assistance',
    icon: 'Wrench',
    title: 'Assistance & service après-vente',
    shortDesc: 'Accompagnement pour la mise en route, le transfert de données et les conseils d’entretien.',
    fullDesc: 'Notre relation avec nos clients ne s’arrête pas au moment de la vente. Nous restons disponibles pour vous accompagner dans la configuration initiale de votre appareil, le transfert de vos données en toute sécurité, la pose de vos verres trempés et toute question technique ultérieure.',
    features: [
      'Aide au transfert de données (iOS vers Android ou Android vers iOS)',
      'Pose professionnelle sans bulles de vos protections d’écran',
      'Conseils pour préserver la santé de la batterie',
      'Support après-vente disponible 7j/7'
    ],
    highlight: 'Support technique réactif'
  }
];
