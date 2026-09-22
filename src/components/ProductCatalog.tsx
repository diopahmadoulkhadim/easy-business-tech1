import React, { useState, useMemo, useRef } from 'react';
import { Product, ProductCategory } from '../types';
import { PRODUCTS, buildWhatsAppUrl, formatPriceFCFA } from '../data/products';
import { ProductCard } from './ProductCard';
import { ProductDetailModal } from './ProductDetailModal';
import { 
  Search, 
  RotateCcw, 
  X, 
  SlidersHorizontal, 
  ChevronDown, 
  ChevronUp, 
  MessageCircle,
  Sparkles,
  Smartphone,
  Headphones,
  Tag,
  Zap,
  Check
} from 'lucide-react';

interface ProductCatalogProps {
  onContactProduct: (productName: string) => void;
  initialCategory?: ProductCategory;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ 
  onContactProduct, 
  initialCategory = 'tous' 
}) => {
  // Main Category: 'tous' | 'telephones' | 'accessoires'
  const [selectedMainCat, setSelectedMainCat] = useState<'tous' | 'telephones' | 'accessoires'>('tous');
  const [selectedSubCat, setSelectedSubCat] = useState<ProductCategory>(initialCategory);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'bestseller' | 'price-asc' | 'price-desc' | 'rating'>('bestseller');
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Accordion states for filter sidebar
  const [catAccordionOpen, setCatAccordionOpen] = useState(true);
  const [brandAccordionOpen, setBrandAccordionOpen] = useState(true);
  const [priceAccordionOpen, setPriceAccordionOpen] = useState(true);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);

  const allBrands: Array<Product['brand']> = ['Apple', 'Samsung', 'Tecno', 'Xiaomi', 'Anker', 'Oraimo'];

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleResetFilters = () => {
    setSelectedMainCat('tous');
    setSelectedSubCat('tous');
    setSelectedBrands([]);
    setSearchQuery('');
    setMaxPrice(1000000);
    setSortBy('bestseller');
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      // Main category filter ('telephones' or 'accessoires')
      if (selectedMainCat !== 'tous' && p.mainCategory !== selectedMainCat) {
        return false;
      }
      // Sub-category filter
      if (selectedSubCat !== 'tous' && p.category !== selectedSubCat) {
        return false;
      }
      // Brands filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesBrand = p.brand.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesDesc) return false;
      }
      // Price filter
      if (p.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // bestseller default
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    });
  }, [selectedMainCat, selectedSubCat, selectedBrands, searchQuery, maxPrice, sortBy]);

  const activeFiltersCount = 
    (selectedMainCat !== 'tous' ? 1 : 0) + 
    (selectedSubCat !== 'tous' ? 1 : 0) + 
    selectedBrands.length + 
    (maxPrice < 1000000 ? 1 : 0) + 
    (searchQuery ? 1 : 0);

  return (
    <section id="catalogue-section" className="w-full bg-[#0b0c0e] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Fast Category Selector */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#d8f537] animate-pulse"></span>
                <span className="text-xs uppercase tracking-widest text-[#d8f537] font-semibold">
                  Catalogue Interactif & Bestsellers Dakar
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-tech">
                Nos Téléphones & Accessoires
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Filtrer par marque, catégorie et budget pour trouver le modèle parfait en stock à Dakar.
              </p>
            </div>

            {/* Mobile Filter Trigger + Sort dropdown */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#15171d] border border-[#262833] text-xs font-semibold text-gray-200"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#d8f537]" />
                <span>Filtres {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
              </button>

              <div className="flex items-center gap-2 bg-[#141519] border border-[#23252d] px-3 py-2 rounded-xl">
                <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[11px] text-gray-400">Trier :</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Trier les produits"
                  className="bg-transparent text-xs text-white font-medium focus:outline-none cursor-pointer"
                >
                  <option value="bestseller" className="bg-[#141519]">Les plus demandés</option>
                  <option value="rating" className="bg-[#141519]">Mieux notés ★</option>
                  <option value="price-asc" className="bg-[#141519]">Prix : Moins cher</option>
                  <option value="price-desc" className="bg-[#141519]">Prix : Plus cher</option>
                </select>
              </div>
            </div>
          </div>

          {/* BARRE DE RECHERCHE EN TEMPS RÉEL (PROÉMINENTE & INSTANTANÉE) */}
          <div className="relative bg-gradient-to-r from-[#13151b] via-[#161822] to-[#13151b] border border-[#232736] p-4 sm:p-5 rounded-3xl shadow-xl space-y-3">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
              {/* Main Search Input */}
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none text-gray-400">
                  <Search className="w-5 h-5 text-[#d8f537]" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher en temps réel un modèle (ex: iPhone 16, Galaxy S24, Tecno, Anker, chargeur...)"
                  className="w-full bg-[#0e1014] text-white placeholder-gray-500 text-sm font-medium pl-12 pr-10 py-3.5 rounded-2xl border border-[#232633] focus:outline-none focus:border-[#d8f537] focus:ring-2 focus:ring-[#d8f537]/20 transition-all shadow-inner"
                  aria-label="Recherche de produit en temps réel"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-gray-400 hover:text-white bg-[#1b1e28] hover:bg-[#252937] transition-colors"
                    title="Effacer la recherche"
                    aria-label="Effacer la recherche"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Status pill & quick reset */}
              <div className="flex items-center justify-between md:justify-end gap-2.5">
                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#0e1014] border border-[#202330] text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#d8f537] animate-pulse"></span>
                  <span className="text-gray-300 font-semibold font-tech">
                    {filteredProducts.length} {filteredProducts.length > 1 ? 'modèles trouvés' : 'modèle trouvé'}
                  </span>
                </div>

                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#1f2330] hover:bg-[#282d3e] text-gray-300 hover:text-white text-xs font-medium transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#d8f537]" />
                    <span>Effacer</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quick Keyword / Tag Suggestions */}
            <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
              <span className="text-gray-400 text-[11px] font-medium flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#d8f537]" />
                Recherches fréquentes :
              </span>
              {[
                'iPhone 16',
                'Galaxy S24',
                'Tecno Camon',
                'Xiaomi Redmi',
                'Anker',
                'Écouteurs',
                'Powerbank'
              ].map((term) => {
                const isActive = searchQuery.toLowerCase() === term.toLowerCase();
                return (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(isActive ? '' : term)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#d8f537] text-black font-bold shadow-sm'
                        : 'bg-[#181a22] text-gray-300 hover:text-white hover:bg-[#212430] border border-[#272a38]'
                    }`}
                  >
                    {term}
                  </button>
                );
              })}
            </div>
          </div>

          {/* MAIN CATEGORIES TABS: Téléphones vs Accessoires vs Tous */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 bg-[#121317] p-1.5 rounded-2xl border border-[#21232d] max-w-xl">
            <button
              onClick={() => {
                setSelectedMainCat('tous');
                setSelectedSubCat('tous');
              }}
              className={`py-2 px-2 sm:py-2.5 sm:px-3 rounded-xl text-[11px] sm:text-xs font-bold transition-all text-center cursor-pointer ${
                selectedMainCat === 'tous'
                  ? 'bg-[#d8f537] text-black shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-[#1a1c23]'
              }`}
            >
              Tous ({PRODUCTS.length})
            </button>

            <button
              onClick={() => {
                setSelectedMainCat('telephones');
                setSelectedSubCat('tous');
              }}
              className={`flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-2 sm:py-2.5 sm:px-3 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                selectedMainCat === 'telephones'
                  ? 'bg-[#d8f537] text-black shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-[#1a1c23]'
              }`}
            >
              <Smartphone className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              <span>Smartphones ({PRODUCTS.filter(p => p.mainCategory === 'telephones').length})</span>
            </button>

            <button
              onClick={() => {
                setSelectedMainCat('accessoires');
                setSelectedSubCat('tous');
              }}
              className={`flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-2 sm:py-2.5 sm:px-3 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                selectedMainCat === 'accessoires'
                  ? 'bg-[#d8f537] text-black shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-[#1a1c23]'
              }`}
            >
              <Headphones className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              <span>Accessoires ({PRODUCTS.filter(p => p.mainCategory === 'accessoires').length})</span>
            </button>
          </div>

          {/* Sub-category pills for fine browsing */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-[#1a1c22]">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap mr-1">
              Sous-catégories :
            </span>
            {[
              { id: 'tous', label: 'Toutes' },
              { id: 'smartphones', label: 'Smartphones' },
              { id: 'ecouteurs', label: 'Écouteurs & Audio' },
              { id: 'chargeurs', label: 'Chargeurs rapides' },
              { id: 'powerbanks', label: 'Power banks' },
              { id: 'protections', label: 'Coques & Verres' },
              { id: 'supports', label: 'Supports' },
            ].map((cat) => {
              const isSelected = selectedSubCat === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedSubCat(cat.id as ProductCategory)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#252834] text-[#d8f537] font-bold border border-[#3b3f52]'
                      : 'bg-[#131519] text-gray-400 hover:text-gray-200 border border-[#1e2028]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Grid: Left Filter Sidebar + Right Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Left Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-[#121317] border border-[#20222a] rounded-3xl p-5 sticky top-24 space-y-6">
              
              {/* Active Filters Reset */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                    Filtres actifs
                  </span>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={handleResetFilters}
                      className="flex items-center gap-1 text-[11px] text-[#d8f537] hover:underline cursor-pointer font-medium"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Réinitialiser ({activeFiltersCount})</span>
                    </button>
                  )}
                </div>

                {/* Active filter badges */}
                <div className="flex flex-wrap gap-1.5 min-h-[28px]">
                  {selectedMainCat !== 'tous' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] bg-[#1a1d24] text-[#d8f537] border border-[#2b2e3a]">
                      {selectedMainCat === 'telephones' ? 'Téléphones' : 'Accessoires'}
                      <button onClick={() => setSelectedMainCat('tous')} className="hover:text-red-400">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {selectedBrands.map(brand => (
                    <span 
                      key={brand}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] bg-[#1a1d24] text-gray-200 border border-[#2b2e3a]"
                    >
                      {brand}
                      <button onClick={() => handleBrandToggle(brand)} className="hover:text-red-400">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}

                  {selectedSubCat !== 'tous' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] bg-[#1a1d24] text-[#d8f537] border border-[#2b2e3a]">
                      {selectedSubCat}
                      <button onClick={() => setSelectedSubCat('tous')} className="hover:text-red-400">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {activeFiltersCount === 0 && (
                    <span className="text-[11px] text-gray-500 italic">
                      Tous les articles affichés
                    </span>
                  )}
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher (ex: iPhone, S24, Anker)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#181a20] border border-[#262832] rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d8f537]"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* 1. FILTRE PAR CATÉGORIE (Téléphones, Accessoires) */}
              <div className="border-t border-[#1d2028] pt-4">
                <button
                  type="button"
                  onClick={() => setCatAccordionOpen(!catAccordionOpen)}
                  className="flex items-center justify-between w-full text-xs font-bold text-gray-200 uppercase tracking-wider mb-2.5 cursor-pointer"
                >
                  <span>1. Catégorie</span>
                  {catAccordionOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>

                {catAccordionOpen && (
                  <div className="space-y-1.5">
                    {[
                      { id: 'tous', label: 'Toutes les catégories', count: PRODUCTS.length },
                      { id: 'telephones', label: '📱 Téléphones & Smartphones', count: PRODUCTS.filter(p => p.mainCategory === 'telephones').length },
                      { id: 'accessoires', label: '🎧 Accessoires tech', count: PRODUCTS.filter(p => p.mainCategory === 'accessoires').length },
                    ].map((catItem) => (
                      <button
                        key={catItem.id}
                        onClick={() => setSelectedMainCat(catItem.id as any)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left ${
                          selectedMainCat === catItem.id
                            ? 'bg-[#1d2029] text-[#d8f537] font-bold border border-[#2d313e]'
                            : 'text-gray-400 hover:text-white hover:bg-[#161820]'
                        }`}
                      >
                        <span>{catItem.label}</span>
                        <span className="text-[10px] text-gray-500">({catItem.count})</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. FILTRE PAR MARQUE */}
              <div className="border-t border-[#1d2028] pt-4">
                <button
                  type="button"
                  onClick={() => setBrandAccordionOpen(!brandAccordionOpen)}
                  className="flex items-center justify-between w-full text-xs font-bold text-gray-200 uppercase tracking-wider mb-3 cursor-pointer"
                >
                  <span>2. Marques ({allBrands.length})</span>
                  {brandAccordionOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>

                {brandAccordionOpen && (
                  <div className="space-y-2">
                    {allBrands.map((brand) => {
                      const isChecked = selectedBrands.includes(brand);
                      const brandCount = PRODUCTS.filter(p => p.brand === brand).length;
                      return (
                        <label
                          key={brand}
                          className="flex items-center gap-2.5 text-xs text-gray-300 hover:text-white cursor-pointer select-none py-1 group"
                        >
                          <div 
                            className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                              isChecked
                                ? 'bg-[#d8f537] border-[#d8f537]'
                                : 'bg-[#181a20] border-[#2d303b] group-hover:border-gray-500'
                            }`}
                          >
                            {isChecked && (
                              <svg className="w-3 h-3 text-[#0c0d10]" viewBox="0 0 12 12" fill="none">
                                <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <span>{brand}</span>
                          <span className="ml-auto text-[10px] text-gray-500">
                            ({brandCount})
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 3. FILTRE PAR PRIX */}
              <div className="border-t border-[#1d2028] pt-4">
                <button
                  type="button"
                  onClick={() => setPriceAccordionOpen(!priceAccordionOpen)}
                  className="flex items-center justify-between w-full text-xs font-bold text-gray-200 uppercase tracking-wider mb-3 cursor-pointer"
                >
                  <span>3. Budget Max (Prix)</span>
                  {priceAccordionOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>

                {priceAccordionOpen && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-300">
                      <span className="text-gray-400">Jusqu'à :</span>
                      <span className="font-extrabold text-[#d8f537]">
                        {formatPriceFCFA(maxPrice)}
                      </span>
                    </div>

                    <input
                      type="range"
                      min="10000"
                      max="1000000"
                      step="10000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-[#d8f537] bg-[#222530] h-1.5 rounded-lg appearance-none cursor-pointer"
                    />

                    {/* Quick Budget Shortcuts */}
                    <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px]">
                      <button
                        onClick={() => setMaxPrice(50000)}
                        className={`p-1.5 rounded-lg border text-center transition-colors cursor-pointer ${
                          maxPrice === 50000 
                            ? 'bg-[#d8f537] text-black font-bold border-[#d8f537]' 
                            : 'bg-[#181a21] border-[#252834] text-gray-400 hover:text-white'
                        }`}
                      >
                        &lt; 50 000 F
                      </button>
                      <button
                        onClick={() => setMaxPrice(300000)}
                        className={`p-1.5 rounded-lg border text-center transition-colors cursor-pointer ${
                          maxPrice === 300000 
                            ? 'bg-[#d8f537] text-black font-bold border-[#d8f537]' 
                            : 'bg-[#181a21] border-[#252834] text-gray-400 hover:text-white'
                        }`}
                      >
                        &lt; 300 000 F
                      </button>
                      <button
                        onClick={() => setMaxPrice(800000)}
                        className={`p-1.5 rounded-lg border text-center transition-colors cursor-pointer ${
                          maxPrice === 800000 
                            ? 'bg-[#d8f537] text-black font-bold border-[#d8f537]' 
                            : 'bg-[#181a21] border-[#252834] text-gray-400 hover:text-white'
                        }`}
                      >
                        &lt; 800 000 F
                      </button>
                      <button
                        onClick={() => setMaxPrice(1000000)}
                        className={`p-1.5 rounded-lg border text-center transition-colors cursor-pointer ${
                          maxPrice === 1000000 
                            ? 'bg-[#d8f537] text-black font-bold border-[#d8f537]' 
                            : 'bg-[#181a21] border-[#252834] text-gray-400 hover:text-white'
                        }`}
                      >
                        Tous les prix
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct WhatsApp Advice Card */}
              <div className="bg-[#171a22] border border-[#232733] rounded-2xl p-4 text-xs space-y-2">
                <div className="flex items-center gap-1.5 text-[#25d366] font-bold">
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Un modèle particulier ?</span>
                </div>
                <p className="text-[11px] text-gray-300 leading-relaxed">
                  Envoyez la référence de votre choix sur WhatsApp, nous vérifions le stock en direct.
                </p>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-[#25d366] hover:bg-[#20ba5a] text-black font-bold py-2 px-3 rounded-xl text-xs transition-colors"
                >
                  Discuter sur WhatsApp
                </a>
              </div>

            </div>
          </div>

          {/* Right Column: Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <>
                <div className="mb-4 flex items-center justify-between text-xs text-gray-400 px-1">
                  <span>
                    Affichage de <strong className="text-white">{filteredProducts.length}</strong> produit(s)
                  </span>
                  <span className="text-[11px] text-[#d8f537]">
                    Cliquez sur un produit pour voir la fiche détaillée et ses photos
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOpenDetails={(p) => setSelectedProductForModal(p)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-[#141519] border border-[#23252d] rounded-3xl p-10 sm:p-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#1e2029] text-[#d8f537] mx-auto flex items-center justify-center border border-[#2c3040]">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-tech">
                    {searchQuery ? `Aucun produit correspondant à "${searchQuery}"` : 'Aucun résultat pour cette sélection'}
                  </h3>
                  <p className="text-xs text-gray-400 max-w-md mx-auto mt-1">
                    {searchQuery 
                      ? 'Essayez une autre orthographe, recherchez par marque (Apple, Samsung, Tecno, Xiaomi...) ou effacez la recherche pour voir tous les modèles disponibles à Dakar.'
                      : "Ajustez vos filtres de marque, de catégorie ou le budget maximal pour voir d'autres produits."
                    }
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#202330] hover:bg-[#2a2f42] text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5 text-[#d8f537]" />
                      <span>Effacer le texte recherché</span>
                    </button>
                  )}
                  <button
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#d8f537] text-black text-xs font-bold hover:bg-[#c9e62f] cursor-pointer shadow-md"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Réinitialiser tous les filtres</span>
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Conversion Banner under Catalog */}
            <div className="mt-10 bg-gradient-to-r from-[#14161c] via-[#161821] to-[#14161c] border border-[#222532] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#d8f537]/15 border border-[#d8f537]/30 flex items-center justify-center text-[#d8f537] shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-tech">
                    Vous souhaitez commander plusieurs appareils ou un devis d'entreprise ?
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Tarifs dégressifs pour entreprises, revendeurs et commandes groupées à Dakar.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={buildWhatsAppUrl("Bonjour Easy Business Tech, je souhaite obtenir un devis pour une commande groupée / professionnelle à Dakar.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#20ba5a] text-black font-extrabold px-5 py-3 rounded-xl text-xs whitespace-nowrap transition-colors shadow-lg shadow-[#25d366]/20"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Devis WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Mobile Filters Modal */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-sm bg-[#121317] h-full ml-auto p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#20222a]">
              <span className="text-sm font-bold text-white font-tech">Filtrer les produits</span>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search Input */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Recherche instantanée</p>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#d8f537]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Modèle, marque, mot-clé..."
                  className="w-full bg-[#181a20] border border-[#262832] rounded-xl pl-9 pr-8 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d8f537]"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    aria-label="Effacer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Mobile */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Catégorie</p>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { id: 'tous', label: 'Tous les produits' },
                  { id: 'telephones', label: '📱 Téléphones & Smartphones' },
                  { id: 'accessoires', label: '🎧 Accessoires tech' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedMainCat(c.id as any)}
                    className={`py-2 px-3 rounded-xl text-xs text-left transition-colors ${
                      selectedMainCat === c.id ? 'bg-[#d8f537] text-black font-bold' : 'bg-[#181a20] text-gray-300'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Brands Mobile */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Marques</p>
              <div className="space-y-2">
                {allBrands.map((brand) => {
                  const isChecked = selectedBrands.includes(brand);
                  return (
                    <label key={brand} className="flex items-center gap-2 text-xs text-gray-300">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleBrandToggle(brand)}
                        className="rounded accent-[#d8f537]"
                      />
                      <span>{brand}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Price Mobile */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Budget max : {formatPriceFCFA(maxPrice)}
              </p>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#d8f537]"
              />
            </div>

            <div className="pt-4 border-t border-[#20222a] flex gap-2">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-3 rounded-xl bg-[#1d1f27] text-gray-300 text-xs font-semibold"
              >
                Réinitialiser
              </button>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="flex-1 py-3 rounded-xl bg-[#d8f537] text-black text-xs font-bold"
              >
                Résultats ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal with Multi-Images */}
      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onContactProduct={onContactProduct}
      />
    </section>
  );
};
