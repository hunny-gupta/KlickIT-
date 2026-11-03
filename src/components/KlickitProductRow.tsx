import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Minus, Clock, Eye, Sparkles } from 'lucide-react';
import { Product, CartItem, ProductCategory } from '../types';

interface KlickitProductRowProps {
  title: string;
  category: ProductCategory;
  products: Product[];
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onSeeAll: (category: ProductCategory) => void;
  onProductClick: (product: Product) => void;
  subtitle?: string;
  badge?: string;
}

export const KlickitProductRow: React.FC<KlickitProductRowProps> = ({
  title,
  category,
  products,
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  onSeeAll,
  onProductClick,
  subtitle,
  badge,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const scrollLeft = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const cartQtyMap = cartItems.reduce((acc, item) => {
    acc[item.product.id] = item.quantity;
    return acc;
  }, {} as Record<string, number>);

  const handleImgError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="py-7 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Row Header */}
        <div className="flex items-end justify-between mb-4">
          <div>
            {badge && (
              <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF9200] bg-[#FFF7EC] px-2 py-0.5 rounded-md border border-[#FF9200]/20 mb-1">
                {badge}
              </span>
            )}
            <h2 className="text-lg sm:text-xl font-black text-[#101C27] tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          <button
            onClick={() => onSeeAll(category)}
            className="text-xs font-bold text-[#0c831f] hover:text-[#096a18] flex items-center gap-1 group py-1 px-2.5 rounded-xl hover:bg-emerald-50 transition-colors"
          >
            <span>See All ({products.length})</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Product Carousel Container with Left/Right arrows */}
        <div className="relative group/row">
          
          {/* Scroll Buttons */}
          <button
            onClick={scrollLeft}
            className="hidden md:flex absolute -left-3.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-slate-200 items-center justify-center text-slate-700 hover:bg-slate-50 hover:scale-105 transition-all opacity-0 group-hover/row:opacity-100 focus:outline-none"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={scrollRight}
            className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-slate-200 items-center justify-center text-slate-700 hover:bg-slate-50 hover:scale-105 transition-all opacity-0 group-hover/row:opacity-100 focus:outline-none"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Scrolling items track */}
          <div
            ref={rowRef}
            className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto pb-3 scrollbar-none snap-x"
          >
            {products.map((product) => {
              const qty = cartQtyMap[product.id] || 0;
              const discount = product.originalPrice > product.price
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;
              const hasError = imgErrors[product.id];

              return (
                <div
                  key={product.id}
                  className="group snap-start shrink-0 w-[170px] sm:w-[205px] bg-white rounded-2xl border border-slate-200/90 hover:border-[#FF9200]/40 hover:shadow-lg transition-all duration-200 p-3 flex flex-col justify-between"
                >
                  {/* Top Canvas with ETA pill, Badges & Image */}
                  <div>
                    {/* Top Badges Row */}
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-slate-700 bg-slate-100/90 px-1.5 py-0.5 rounded-md">
                        <Clock className="w-2.5 h-2.5 text-[#FF9200]" />
                        <span>{product.deliveryTime}</span>
                      </div>

                      {discount > 0 ? (
                        <span className="text-[10px] font-bold bg-[#0c831f] text-white px-1.5 py-0.5 rounded-md shadow-2xs">
                          {discount}% OFF
                        </span>
                      ) : product.tag ? (
                        <span className="text-[10px] font-bold bg-[#FFE3B5] text-[#101C27] px-1.5 py-0.5 rounded-md truncate max-w-[80px]">
                          {product.tag}
                        </span>
                      ) : null}
                    </div>

                    {/* Centered Product Photograph Container */}
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
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">KLICKIT Fresh</span>
                        </div>
                      )}

                      {/* Quick view hover icon */}
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

                    {/* Food Mark: Veg / Non-Veg Indicator */}
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

                    {/* Product Name */}
                    <h3 
                      onClick={() => onProductClick(product)}
                      className="text-xs sm:text-[13px] font-bold text-[#101C27] line-clamp-2 leading-snug cursor-pointer hover:text-[#FF9200] transition-colors"
                      title={product.name}
                    >
                      {product.name}
                    </h3>
                  </div>

                  {/* Bottom: Pricing & Functional Cart Stepper */}
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

        </div>

      </div>
    </section>
  );
};
