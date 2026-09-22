import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { formatPriceFCFA, buildWhatsAppUrl, COMPANY_INFO } from '../data/products';
import { 
  X, 
  Star, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  PhoneCall, 
  Mail,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onContactProduct: (productName: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ 
  product, 
  onClose,
  onContactProduct 
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Reset selected image when product changes
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [product]);

  if (!product) return null;

  const imagesList = product.images && product.images.length > 0 ? product.images : [product.image];
  const activeImage = imagesList[selectedImageIndex] || product.image;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
  };

  const whatsappUrl = buildWhatsAppUrl(product);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-[#121317] border border-[#262835] rounded-3xl p-5 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-[#1a1c24] hover:bg-[#252834] text-gray-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Fermer la fiche détaillée"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Multi-Image Interactive Gallery (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-center">
            
            {/* Main Active Image Display with Prev/Next Controls */}
            <div className="relative w-full aspect-square rounded-2xl bg-[#0a0b0e] border border-[#20222c] p-4 flex items-center justify-center overflow-hidden group">
              <img
                src={activeImage}
                alt={`${product.name} - vue ${selectedImageIndex + 1}`}
                className="w-full h-full object-contain transition-all duration-300 transform group-hover:scale-105"
              />

              {/* Prev/Next arrows if multiple images */}
              {imagesList.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[#15171e]/80 hover:bg-[#1f222b] text-white border border-[#2a2d39] transition-all cursor-pointer shadow-md"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[#15171e]/80 hover:bg-[#1f222b] text-white border border-[#2a2d39] transition-all cursor-pointer shadow-md"
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Image counter indicator */}
              {imagesList.length > 1 && (
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-[10px] font-mono text-gray-300 border border-white/10">
                  {selectedImageIndex + 1} / {imagesList.length}
                </div>
              )}
            </div>

            {/* Interactive Thumbnails Gallery */}
            {imagesList.length > 1 && (
              <div className="flex items-center gap-2 mt-3 overflow-x-auto w-full pb-1 scrollbar-none justify-center">
                {imagesList.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-14 h-14 rounded-xl bg-[#0a0b0e] p-1 border overflow-hidden transition-all cursor-pointer shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-[#d8f537] ring-2 ring-[#d8f537]/30 scale-105'
                        : 'border-[#22242e] opacity-60 hover:opacity-100 hover:border-gray-500'
                    }`}
                  >
                    <img 
                      src={imgUrl} 
                      alt={`Miniature ${idx + 1}`} 
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Stock & Guarantee status badge */}
            <div className="mt-4 w-full flex items-center justify-between text-xs px-3 py-2 rounded-xl bg-[#161820] border border-[#232530]">
              <span className="flex items-center gap-1.5 text-[#25d366] font-semibold text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[#25d366] animate-pulse"></span>
                En stock à Dakar
              </span>
              <span className="text-[11px] text-gray-400 font-medium">
                Garantie 12 Mois
              </span>
            </div>
          </div>

          {/* Right Column: Full Details, Pricing & Conversion (7 cols) */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              {/* Brand, Category & Rating */}
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span className="uppercase font-bold tracking-wider text-[#d8f537] px-2 py-0.5 rounded bg-[#d8f537]/10 border border-[#d8f537]/20">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1 text-xs text-gray-200">
                  <Star className="w-4 h-4 text-[#d8f537] fill-[#d8f537]" />
                  <span className="font-bold">{product.rating.toFixed(1)}</span>
                  <span className="text-gray-500">({product.reviewsCount} avis clients)</span>
                </div>
              </div>

              {/* Product Name */}
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-tech leading-snug">
                {product.name}
              </h2>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 my-2.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {formatPriceFCFA(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPriceFCFA(product.originalPrice)}
                  </span>
                )}
                {product.discountPercentage && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#d8f537] text-black">
                    -{product.discountPercentage}%
                  </span>
                )}
              </div>

              {/* Full Description */}
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {product.description}
              </p>

              {/* Technical Specifications */}
              <div className="mt-4 space-y-1.5 bg-[#171920] p-3.5 rounded-2xl border border-[#242733]">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Points forts et caractéristiques :
                </p>
                {product.specs.map((spec, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d8f537] shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              {/* Dakar Delivery & Authenticity Badges */}
              <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] text-gray-300">
                <div className="flex items-center gap-2 bg-[#14161d] p-2.5 rounded-xl border border-[#21232d]">
                  <ShieldCheck className="w-4 h-4 text-[#d8f537] shrink-0" />
                  <span>100% Produit Authentique</span>
                </div>
                <div className="flex items-center gap-2 bg-[#14161d] p-2.5 rounded-xl border border-[#21232d]">
                  <Truck className="w-4 h-4 text-[#d8f537] shrink-0" />
                  <span>Livraison Dakar &lt; 2h</span>
                </div>
              </div>
            </div>

            {/* CTAs : Prominent WhatsApp button + Contact form option */}
            <div className="space-y-2 pt-3 border-t border-[#1e2028]">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 bg-[#25d366] hover:bg-[#20ba5a] text-black font-extrabold py-3.5 px-4 rounded-xl text-sm transition-all shadow-xl shadow-[#25d366]/25 hover:scale-[1.01]"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Commander sur WhatsApp (+221 77 455 97 85)</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onContactProduct(product.name);
                    onClose();
                  }}
                  className="flex items-center justify-center gap-1.5 bg-[#1a1c24] hover:bg-[#252834] text-white py-2.5 px-3 rounded-xl text-xs font-semibold border border-[#2c2f3c] transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-[#d8f537]" />
                  <span>Demande via formulaire</span>
                </button>

                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="flex items-center justify-center gap-1.5 bg-[#1a1c24] hover:bg-[#252834] text-white py-2.5 px-3 rounded-xl text-xs font-semibold border border-[#2c2f3c] transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#d8f537]" />
                  <span>Appeler la boutique</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
