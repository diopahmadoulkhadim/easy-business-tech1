import React, { useState } from 'react';
import { Product } from '../types';
import { formatPriceFCFA, buildWhatsAppUrl } from '../data/products';
import { Star, Heart, MessageCircle, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const [isLiked, setIsLiked] = useState(false);

  const whatsappLink = buildWhatsAppUrl(product);

  return (
    <div className="group relative bg-[#141519] border border-[#21232b] hover:border-[#383c4a] rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-black/50">
      <div>
        {/* Top Badges & Wishlist */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {product.badge ? (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-[#d8f537] text-[#0c0d10] tracking-wide">
              {product.badge}
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#1d1f27] text-gray-400 border border-[#292c36]">
              {product.brand}
            </span>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            aria-label="Ajouter aux favoris"
            className="w-8 h-8 rounded-full bg-[#1b1d24] hover:bg-[#252833] border border-[#272935] flex items-center justify-center text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
          >
            <Heart 
              className={`w-4 h-4 transition-colors ${
                isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'
              }`} 
            />
          </button>
        </div>

        {/* Product Image Stage */}
        <div 
          onClick={() => onOpenDetails(product)}
          className="relative w-full aspect-square rounded-xl bg-[#0e0f13] border border-[#1b1c22] p-4 mb-4 flex items-center justify-center overflow-hidden cursor-pointer group-hover:border-[#2d303b] transition-all"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain object-center transform group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="px-3 py-1.5 rounded-lg bg-[#0c0d10]/90 text-xs font-semibold text-white border border-[#292c36] flex items-center gap-1.5 shadow-lg">
              <Eye className="w-3.5 h-3.5 text-[#d8f537]" />
              Aperçu rapide
            </span>
          </div>
        </div>

        {/* Brand & Star Rating Row */}
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="font-bold tracking-wider uppercase text-gray-400 text-[11px]">
            {product.brand}
          </span>
          <div className="flex items-center gap-1 text-[11px] text-gray-300">
            <Star className="w-3.5 h-3.5 text-[#d8f537] fill-[#d8f537]" />
            <span className="font-bold">{product.rating.toFixed(1)}</span>
            <span className="text-gray-500 text-[10px]">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 mb-1.5">
          <span className="text-lg font-extrabold text-white tracking-tight">
            {formatPriceFCFA(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-500 line-through">
              {formatPriceFCFA(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Product Name */}
        <h3 
          onClick={() => onOpenDetails(product)}
          className="text-sm font-semibold text-gray-200 line-clamp-1 hover:text-[#d8f537] cursor-pointer transition-colors"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Short Specs Snippet */}
        <p className="mt-1 text-[11px] text-gray-400 line-clamp-1">
          {product.specs[0]} • {product.specs[1] || 'Neuf scellé'}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-3 border-t border-[#1d1f27] flex items-center gap-2">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#25d366]/15 hover:bg-[#25d366] text-[#25d366] hover:text-black border border-[#25d366]/30 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200"
          title="Commander directement sur WhatsApp"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
          <span>Commander WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={() => onOpenDetails(product)}
          className="p-2 rounded-xl bg-[#1b1d24] hover:bg-[#272a36] text-gray-300 hover:text-white border border-[#272935] transition-colors cursor-pointer"
          title="Voir la fiche détaillée"
          aria-label="Voir la fiche détaillée"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
