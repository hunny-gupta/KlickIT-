import React, { useState } from 'react';
import { KLICKIT_CATEGORIES } from '../data/mockData';
import type { ProductCategory } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface KlickitCategoryGridProps {
  onSelectCategory: (categoryId: ProductCategory) => void;
  activeCategory?: ProductCategory;
}

export const KlickitCategoryGrid: React.FC<KlickitCategoryGridProps> = ({
  onSelectCategory,
  activeCategory,
}) => {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="py-8 sm:py-10 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFE3B5]/60 text-[#101C27] text-[11px] font-bold tracking-wide mb-1.5 border border-[#FF9200]/20">
              <Sparkles className="w-3 h-3 text-[#FF9200]" />
              <span>EXPLORE ALL 18 DEPARTMENTS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#101C27] tracking-tight">
              Shop by Category
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Fresh farm produce, pantry staples, personal care, and festive essentials delivered in 10 minutes
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-[#FF9200]">
            <span>18 Fresh Aisles</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500">Pick any aisle to explore</span>
          </div>
        </div>

        {/* 18 Category Cards Grid with Real Photographs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-3 sm:gap-3.5">
          {KLICKIT_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            const hasError = imgErrors[cat.id];

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative flex flex-col items-center p-2.5 rounded-2xl text-center focus:outline-none transition-all duration-200 ${
                  isSelected
                    ? 'ring-2 ring-[#FF9200] bg-[#FFF7EC] shadow-md -translate-y-0.5'
                    : 'bg-[#F8FAFC] hover:bg-[#FFF7EC] border border-slate-200/80 hover:border-[#FF9200]/40 hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                {/* Photographic Thumbnail Container */}
                <div 
                  className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl p-1 flex items-center justify-center overflow-hidden transition-all shadow-2xs group-hover:shadow-sm"
                  style={{ backgroundColor: cat.bannerColor }}
                >
                  {!hasError ? (
                    <img
                      src={cat.image}
                      alt={`${cat.label} category thumbnail`}
                      className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                      onError={() => handleImageError(cat.id)}
                    />
                  ) : (
                    <div className="w-full h-full rounded-xl bg-white/80 flex items-center justify-center text-slate-400">
                      <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Category Label */}
                <span className="text-[11px] sm:text-xs font-bold text-[#101C27] mt-2 line-clamp-2 leading-tight group-hover:text-[#FF9200] transition-colors">
                  {cat.label}
                </span>

                {/* Micro Item Count Tag */}
                <span className="text-[10px] font-mono font-semibold text-slate-400 group-hover:text-slate-600 mt-0.5">
                  {cat.itemCount ? `${cat.itemCount}+ items` : 'Explore'}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
