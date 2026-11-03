import React, { useState, useMemo } from 'react';
import { 
  Search, Plus, Minus, Star, Clock, 
  X, Eye, ShoppingBag 
} from 'lucide-react';
import { Product, CartItem, ProductCategory } from '../types';
import { KLICKIT_CATEGORIES, PRODUCTS } from '../data/mockData';

interface ShopSectionProps {
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  searchQuery: string;
  onClearSearch: () => void;
  onProductClick?: (product: Product) => void;
}

export const ShopSection: React.FC<ShopSectionProps> = ({
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  searchQuery,
  onClearSearch,
  onProductClick,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quickFilter, setQuickFilter] = useState<'all' | 'under100' | 'bestsellers'>('all');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const cartQuantityMap = useMemo(() => {
    const map: Record<string, number> = {};
    cartItems.forEach((item) => {
      map[item.product.id] = item.quantity;
    });
    return map;
  }, [cartItems]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCat = product.categoryLabel.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesDesc) return false;
      }
      if (quickFilter === 'under100' && product.price > 100) return false;
      if (quickFilter === 'bestsellers' && product.rating < 4.8) return false;

      return true;
    });
  }, [selectedCategory, searchQuery, quickFilter]);

  const handleCardClick = (product: Product) => {
    if (onProductClick) {
      onProductClick(product);
    } else {
      setActiveModalProduct(product);
    }
  };

  return (
    <section id="shop" className="py-12 bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs font-bold text-[#0c831f] uppercase tracking-wider mb-1 font-mono">
              KLICKIT 10-Minute Dark Store Catalog
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#101C27] tracking-tight">
              Everyday Essentials in 10 Minutes
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuickFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                quickFilter === 'all'
                  ? 'bg-[#101C27] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setQuickFilter('bestsellers')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                quickFilter === 'bestsellers'
                  ? 'bg-[#FF9200] text-[#101C27] shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Best Sellers
            </button>
            <button
              onClick={() => setQuickFilter('under100')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                quickFilter === 'under100'
                  ? 'bg-[#0c831f] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Under ₹100
            </button>
          </div>
        </div>

        {/* Category Tabs with Real Photographs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#101C27] text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All 18 Aisles
          </button>
          {KLICKIT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-[#0c831f] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="w-4 h-4 rounded-md object-cover"
              />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {filteredProducts.map((product) => {
            const qty = cartQuantityMap[product.id] || 0;
            const discount = product.originalPrice > product.price
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-slate-200/90 hover:border-[#FF9200]/40 p-3 flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <div className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded-md inline-block">
                      ⚡ {product.deliveryTime}
                    </div>
                    {discount > 0 && (
                      <span className="text-[10px] font-bold bg-[#0c831f] text-white px-1.5 py-0.5 rounded-md">
                        {discount}% OFF
                      </span>
                    )}
                  </div>

                  <div
                    onClick={() => handleCardClick(product)}
                    className="cursor-pointer h-28 sm:h-32 rounded-xl bg-[#F8FAFC] border border-slate-100 p-2 flex items-center justify-center overflow-hidden mb-2 group-hover:bg-[#FFF7EC]/50 transition-colors"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.altText || product.name}
                      className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-108"
                      onError={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <svg class="w-7 h-7 text-slate-400 stroke-current" fill="none" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                            </svg>
                          `;
                        }
                      }}
                    />
                  </div>

                  <div className="flex items-center gap-1.5 mb-1">
                    {product.isVeg !== false ? (
                      <div className="w-3 h-3 rounded-xs border border-emerald-600 flex items-center justify-center p-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      </div>
                    ) : (
                      <div className="w-3 h-3 rounded-xs border border-amber-800 flex items-center justify-center p-0.5">
                        <div className="w-1.5 h-1.5 bg-amber-800 rounded-xs" />
                      </div>
                    )}
                    <span className="text-[11px] text-slate-500 font-medium">
                      {product.weight}
                    </span>
                  </div>

                  <h3 
                    onClick={() => handleCardClick(product)}
                    className="text-xs sm:text-[13px] font-bold text-[#101C27] line-clamp-2 hover:text-[#0c831f] cursor-pointer mb-2 leading-snug"
                  >
                    {product.name}
                  </h3>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-black font-mono text-[#101C27]">₹{product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-[10px] text-slate-400 line-through font-mono ml-1">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>

                  {qty === 0 ? (
                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-3 py-1 rounded-xl border-2 border-[#0c831f] text-[#0c831f] hover:bg-[#0c831f] hover:text-white font-extrabold text-xs transition-all shadow-2xs active:scale-95"
                    >
                      + ADD
                    </button>
                  ) : (
                    <div className="flex items-center bg-[#0c831f] text-white rounded-xl overflow-hidden font-bold text-xs shadow-2xs">
                      <button
                        onClick={() => onUpdateQuantity(product.id, -1)}
                        className="px-2 py-1 hover:bg-[#096a18]"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-mono font-bold">{qty}</span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, 1)}
                        className="px-2 py-1 hover:bg-[#096a18]"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
