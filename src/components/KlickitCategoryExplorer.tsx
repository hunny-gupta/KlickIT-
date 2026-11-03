import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, Search, Plus, Minus, Clock, 
  Filter, ChevronDown, Check, Star, Sparkles, Eye 
} from 'lucide-react';
import { Product, CartItem, ProductCategory } from '../types';
import { KLICKIT_CATEGORIES, PRODUCTS } from '../data/mockData';

interface KlickitCategoryExplorerProps {
  initialCategory?: ProductCategory;
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onBackToHome: () => void;
  onProductClick: (product: Product) => void;
}

export const KlickitCategoryExplorer: React.FC<KlickitCategoryExplorerProps> = ({
  initialCategory = 'dairy',
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  onBackToHome,
  onProductClick,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(initialCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount'>('featured');
  const [inCategorySearch, setInCategorySearch] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const cartQtyMap = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      acc[item.product.id] = item.quantity;
      return acc;
    }, {} as Record<string, number>);
  }, [cartItems]);

  const subcategories = useMemo(() => {
    const prods = PRODUCTS.filter((p) => p.category === selectedCategory);
    const subs = Array.from(new Set(prods.map((p) => p.subcategory)));
    return ['All', ...subs];
  }, [selectedCategory]);

  const categoryProducts = useMemo(() => {
    let prods = PRODUCTS.filter((p) => p.category === selectedCategory);

    if (selectedSubcategory !== 'All') {
      prods = prods.filter((p) => p.subcategory === selectedSubcategory);
    }

    if (vegOnly) {
      prods = prods.filter((p) => p.isVeg !== false);
    }

    if (inCategorySearch.trim()) {
      const q = inCategorySearch.toLowerCase();
      prods = prods.filter((p) => 
        p.name.toLowerCase().includes(q) || 
        p.subcategory.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-asc') {
      prods = [...prods].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      prods = [...prods].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      prods = [...prods].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'discount') {
      prods = [...prods].sort((a, b) => {
        const discA = a.originalPrice > a.price ? (a.originalPrice - a.price) / a.originalPrice : 0;
        const discB = b.originalPrice > b.price ? (b.originalPrice - b.price) / b.originalPrice : 0;
        return discB - discA;
      });
    }

    return prods;
  }, [selectedCategory, selectedSubcategory, sortBy, inCategorySearch, vegOnly]);

  const activeCategoryInfo = KLICKIT_CATEGORIES.find((c) => c.id === selectedCategory) || KLICKIT_CATEGORIES[0];

  const handleImgError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-6 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top return & breadcrumbs bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#0c831f] hover:border-[#0c831f]/40 transition-all shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Store Home</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-bold text-slate-500">Aisles</span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-black text-[#101C27]">{activeCategoryInfo.label}</span>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-900 font-mono font-bold">{categoryProducts.length}</strong> items in <span className="text-[#0c831f] font-bold">{activeCategoryInfo.label}</span>
          </div>
        </div>

        {/* 2-Column Express Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Vertical Category List with Real Photographs */}
          <div className="md:col-span-4 lg:col-span-3 bg-white rounded-3xl border border-slate-200/90 p-2.5 space-y-1 shadow-xs sticky top-32 max-h-[80vh] overflow-y-auto">
            <div className="p-3 text-[11px] font-black uppercase tracking-wider text-slate-400 font-mono border-b border-slate-100 mb-1 flex items-center justify-between">
              <span>All 18 Departments</span>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold">10-Min</span>
            </div>

            {KLICKIT_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const hasError = imgErrors[`cat-${cat.id}`];

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedSubcategory('All');
                    setInCategorySearch('');
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-2xl text-left transition-all ${
                    isSelected
                      ? 'bg-[#FFF7EC] text-[#101C27] font-black border border-[#FF9200]/30 shadow-2xs'
                      : 'hover:bg-slate-50 text-slate-700 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <div 
                      className="w-9 h-9 rounded-xl p-0.5 shrink-0 flex items-center justify-center overflow-hidden border border-slate-200/60"
                      style={{ backgroundColor: cat.bannerColor }}
                    >
                      {!hasError ? (
                        <img
                          src={cat.image}
                          alt={cat.label}
                          className="w-full h-full object-cover rounded-lg"
                          onError={() => handleImgError(`cat-${cat.id}`)}
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-200 rounded-lg flex items-center justify-center text-slate-500 text-[10px]">
                          ✓
                        </div>
                      )}
                    </div>
                    <span className="text-xs truncate">{cat.label}</span>
                  </div>

                  {isSelected ? (
                    <div className="w-1.5 h-4 rounded-full bg-[#FF9200] shrink-0" />
                  ) : (
                    <span className="text-[10px] text-slate-400 font-mono">{cat.itemCount}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Sub-categories, Filter Controls & Product Grid */}
          <div className="md:col-span-8 lg:col-span-9 space-y-5">
            
            {/* Category Hero Banner */}
            <div 
              className="rounded-3xl p-5 sm:p-6 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
              style={{ backgroundColor: activeCategoryInfo.bannerColor }}
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0c831f] bg-white/80 px-2.5 py-0.5 rounded-full border border-emerald-200/50">
                  ⚡ 10-MINUTE DISPATCH
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-[#101C27] tracking-tight">
                  {activeCategoryInfo.label}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  {activeCategoryInfo.tagline || 'Fresh stock replenished twice daily from verified dark-store partners'}
                </p>
              </div>

              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl p-1 bg-white shadow-sm border border-slate-200 shrink-0 overflow-hidden">
                <img
                  src={activeCategoryInfo.image}
                  alt={activeCategoryInfo.label}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>

            {/* Filter and Controls Bar */}
            <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-xs space-y-3">
              
              {/* Search & Sort row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                
                {/* Search in Category */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={inCategorySearch}
                    onChange={(e) => setInCategorySearch(e.target.value)}
                    placeholder={`Search within ${activeCategoryInfo.label}...`}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-[#FF9200] font-medium"
                  />
                  {inCategorySearch && (
                    <button
                      onClick={() => setInCategorySearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-600 font-bold"
                    >
                      CLEAR
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Veg Only Toggle */}
                  <button
                    onClick={() => setVegOnly(!vegOnly)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                      vegOnly
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-3 h-3 rounded-xs border border-emerald-600 flex items-center justify-center p-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    </div>
                    <span>Veg Only</span>
                  </button>

                  {/* Sort Select */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#FF9200]"
                  >
                    <option value="featured">Featured Picks</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="discount">Biggest Discounts</option>
                  </select>
                </div>

              </div>

              {/* Sub-category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1 border-t border-slate-100">
                {subcategories.map((sub) => {
                  const isActive = selectedSubcategory === sub;
                  return (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubcategory(sub)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
                        isActive
                          ? 'bg-[#101C27] text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600'
                      }`}
                    >
                      {sub}
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Product Cards Grid */}
            {categoryProducts.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">No products match your filter</h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Try clearing your search query or unchecking the vegetarian-only filter.
                </p>
                <button
                  onClick={() => {
                    setInCategorySearch('');
                    setSelectedSubcategory('All');
                    setVegOnly(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0c831f] text-white text-xs font-bold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {categoryProducts.map((product) => {
                  const qty = cartQtyMap[product.id] || 0;
                  const discount = product.originalPrice > product.price
                    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                    : 0;
                  const hasError = imgErrors[product.id];

                  return (
                    <div
                      key={product.id}
                      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-[#FF9200]/40 hover:shadow-lg transition-all duration-200 p-3 flex flex-col justify-between"
                    >
                      <div>
                        {/* Top badges */}
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-slate-700 bg-slate-100/90 px-1.5 py-0.5 rounded-md">
                            <Clock className="w-2.5 h-2.5 text-[#FF9200]" />
                            <span>{product.deliveryTime}</span>
                          </div>

                          {discount > 0 ? (
                            <span className="text-[10px] font-bold bg-[#0c831f] text-white px-1.5 py-0.5 rounded-md">
                              {discount}% OFF
                            </span>
                          ) : product.tag ? (
                            <span className="text-[10px] font-bold bg-[#FFE3B5] text-[#101C27] px-1.5 py-0.5 rounded-md truncate max-w-[80px]">
                              {product.tag}
                            </span>
                          ) : null}
                        </div>

                        {/* Photographic Image Container */}
                        <div
                          onClick={() => onProductClick(product)}
                          className="cursor-pointer relative h-28 sm:h-32 rounded-xl bg-[#F8FAFC] border border-slate-100 p-2 flex items-center justify-center overflow-hidden mb-2.5 group-hover:bg-[#FFF7EC]/50 transition-colors"
                          title={product.name}
                        >
                          {!hasError ? (
                            <img
                              src={product.imageUrl}
                              alt={product.altText || product.name}
                              className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-108"
                              loading="lazy"
                              onError={() => handleImgError(product.id)}
                            />
                          ) : (
                            <div className="w-full h-full rounded-lg bg-slate-100 flex flex-col items-center justify-center text-slate-400 p-2 text-center">
                              <svg className="w-8 h-8 stroke-current mb-1" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="text-[9px] font-bold uppercase tracking-wider">KLICKIT Fresh</span>
                            </div>
                          )}

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onProductClick(product);
                            }}
                            className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full bg-white/90 shadow-xs border border-slate-200 flex items-center justify-center text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity hover:text-[#FF9200]"
                            title="Quick View"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Veg indicator & weight */}
                        <div className="flex items-center gap-1.5 mb-1">
                          {product.isVeg !== false ? (
                            <div className="w-3 h-3 rounded-xs border border-emerald-600 flex items-center justify-center p-0.5" title="Vegetarian">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            </div>
                          ) : (
                            <div className="w-3 h-3 rounded-xs border border-amber-800 flex items-center justify-center p-0.5" title="Non-Vegetarian">
                              <div className="w-1.5 h-1.5 bg-amber-800 rounded-xs" />
                            </div>
                          )}
                          <span className="text-[11px] text-slate-500 font-medium truncate">
                            {product.weight}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 
                          onClick={() => onProductClick(product)}
                          className="text-xs sm:text-[13px] font-bold text-[#101C27] line-clamp-2 leading-snug cursor-pointer hover:text-[#FF9200] transition-colors"
                          title={product.name}
                        >
                          {product.name}
                        </h3>
                      </div>

                      {/* Pricing & Add Stepper */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                        <div className="flex flex-col">
                          <span className="text-sm sm:text-base font-black text-[#101C27] font-mono leading-none">
                            ₹{product.price}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-[10px] text-slate-400 line-through font-mono mt-0.5">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>

                        {qty === 0 ? (
                          <button
                            onClick={() => onAddToCart(product)}
                            className="px-3 py-1.5 rounded-xl border-2 border-[#0c831f] text-[#0c831f] hover:bg-[#0c831f] hover:text-white font-extrabold text-xs transition-all shadow-2xs active:scale-95 flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            <span>ADD</span>
                          </button>
                        ) : (
                          <div className="flex items-center rounded-xl bg-[#0c831f] text-white font-bold text-xs shadow-xs overflow-hidden">
                            <button
                              onClick={() => onUpdateQuantity(product.id, -1)}
                              className="px-2 py-1.5 hover:bg-[#096a18] active:scale-90 transition-all"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 font-mono font-bold text-xs">
                              {qty}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(product.id, 1)}
                              className="px-2 py-1.5 hover:bg-[#096a18] active:scale-90 transition-all"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
