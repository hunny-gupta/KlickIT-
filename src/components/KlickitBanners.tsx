import React, { useState } from 'react';
import { 
  Zap, Clock, ShieldCheck, ArrowRight, ShoppingBag, 
  Sparkles, CheckCircle2, Search, Flame, Gift 
} from 'lucide-react';
import { ProductCategory } from '../types';

interface KlickitBannersProps {
  onCategoryClick: (category: ProductCategory) => void;
  onOpenMarketing: () => void;
  onSearchSubmit?: (query: string) => void;
}

export const KlickitBanners: React.FC<KlickitBannersProps> = ({
  onCategoryClick,
  onOpenMarketing,
  onSearchSubmit,
}) => {
  const [heroSearch, setHeroSearch] = useState('');

  const quickPills = [
    { label: 'Fresh Milk & Bread', cat: 'dairy' as ProductCategory },
    { label: 'Farm Apples & Veggies', cat: 'produce' as ProductCategory },
    { label: 'Atta & Basmati Rice', cat: 'staples' as ProductCategory },
    { label: 'Diwali Diyas & Dry Fruits', cat: 'festive' as ProductCategory },
    { label: 'Chilled Colas & Juice', cat: 'drinks' as ProductCategory },
    { label: 'Cadbury Silk & Sweets', cat: 'sweet' as ProductCategory },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim() && onSearchSubmit) {
      onSearchSubmit(heroSearch.trim());
    }
  };

  return (
    <section className="pt-3 pb-6 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        
        {/* Main 4-Second Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#101C27] via-[#162738] to-[#1E3348] text-white p-6 sm:p-10 border border-slate-800 shadow-2xl">
          
          {/* Subtle warm ambient glows */}
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#FF9200]/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-[#42A66C]/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Brand Tagline Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-[#FFE3B5] text-xs font-black tracking-wide border border-white/15 backdrop-blur-xs">
                <span className="w-2 h-2 rounded-full bg-[#FF9200] animate-pulse" />
                <span>You need it. We KLICKIT.</span>
              </div>

              {/* Exact Primary Headline requested by user */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
                Everyday essentials. <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF9200] via-amber-300 to-[#FFE3B5]">
                  Delivered faster.
                </span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-xl">
                Farm-fresh milk, unpolished dals, midnight snacks, cold brews, and household staples. Picked in 90 seconds from your neighborhood dark store and delivered to your doorstep in 10 minutes.
              </p>

              {/* Prominent Hero Search Bar with Instant Submit */}
              <form onSubmit={handleSearch} className="pt-1 max-w-lg">
                <div className="relative flex items-center bg-white rounded-2xl p-1.5 shadow-xl border-2 border-transparent focus-within:border-[#FF9200] transition-all">
                  <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="Search 'milk, brown eggs, atta, potato chips, diyas'..."
                    className="w-full px-3 py-2 text-xs sm:text-sm text-[#101C27] placeholder:text-slate-400 focus:outline-none bg-transparent font-medium"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#FF9200] hover:bg-[#E88300] text-[#101C27] font-black text-xs transition-all shadow-md shrink-0 flex items-center gap-1.5"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Suggested Search Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-2.5 text-[11px]">
                  <span className="text-slate-400 font-semibold shrink-0">Popular:</span>
                  {quickPills.map((pill) => (
                    <button
                      key={pill.label}
                      type="button"
                      onClick={() => onCategoryClick(pill.cat)}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white font-medium whitespace-nowrap transition-colors border border-white/10"
                    >
                      {pill.label}
                    </button>
                  ))}
                </div>
              </form>

              {/* 4-Second Instant Trust Badges */}
              <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-3 text-xs font-bold text-slate-200">
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-xs">
                  <Zap className="w-3.5 h-3.5 text-[#FF9200]" />
                  <span>10-Min Fast Delivery</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#42A66C]" />
                  <span>₹0 Minimum Order</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                  <span>Cold-Chain Fresh Guarantee</span>
                </div>
              </div>

            </div>

            {/* Right Visual Showcase: Real Commercial Product Photography Collage */}
            <div className="lg:col-span-5 relative">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                
                {/* Photo 1: Farm Milk & Morning Sourdough */}
                <div 
                  onClick={() => onCategoryClick('dairy')}
                  className="cursor-pointer group relative rounded-2xl bg-white p-3 shadow-lg border border-slate-700/50 hover:shadow-2xl hover:scale-102 transition-all overflow-hidden"
                >
                  <div className="h-28 sm:h-32 rounded-xl overflow-hidden bg-slate-100 mb-2">
                    <img
                      src="/products/sourdough_bread_loaf_1793252438761.jpg"
                      alt="Fresh whole wheat bread and farm dairy"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#FF9200]">8 MINS</span>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#FF9200] transition-colors leading-tight">
                        Dairy &amp; Bread
                      </h4>
                    </div>
                    <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                      ₹27+
                    </span>
                  </div>
                </div>

                {/* Photo 2: Fresh Farm Avocados & Greens */}
                <div 
                  onClick={() => onCategoryClick('produce')}
                  className="cursor-pointer group relative rounded-2xl bg-white p-3 shadow-lg border border-slate-700/50 hover:shadow-2xl hover:scale-102 transition-all overflow-hidden"
                >
                  <div className="h-28 sm:h-32 rounded-xl overflow-hidden bg-slate-100 mb-2">
                    <img
                      src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80"
                      alt="Organic fresh vegetables and farm fruits"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#FF9200]">9 MINS</span>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#FF9200] transition-colors leading-tight">
                        Fruits &amp; Greens
                      </h4>
                    </div>
                    <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                      Fresh
                    </span>
                  </div>
                </div>

                {/* Photo 3: Crispy Snacks & Cold Soda */}
                <div 
                  onClick={() => onCategoryClick('munchies')}
                  className="cursor-pointer group relative rounded-2xl bg-white p-3 shadow-lg border border-slate-700/50 hover:shadow-2xl hover:scale-102 transition-all overflow-hidden"
                >
                  <div className="h-28 sm:h-32 rounded-xl overflow-hidden bg-slate-100 mb-2">
                    <img
                      src="/products/lays_chips_pack_1793252407756.jpg"
                      alt="Crispy chips and tea time snacks"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#FF9200]">8 MINS</span>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#FF9200] transition-colors leading-tight">
                        Snacks &amp; Munchies
                      </h4>
                    </div>
                    <span className="text-[10px] font-black bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">
                      ₹20+
                    </span>
                  </div>
                </div>

                {/* Photo 4: Festive Gifting & Brass Diyas */}
                <div 
                  onClick={() => onCategoryClick('festive')}
                  className="cursor-pointer group relative rounded-2xl bg-white p-3 shadow-lg border border-slate-700/50 hover:shadow-2xl hover:scale-102 transition-all overflow-hidden"
                >
                  <div className="h-28 sm:h-32 rounded-xl overflow-hidden bg-slate-100 mb-2">
                    <img
                      src="https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=400&q=80"
                      alt="Traditional handcrafted brass diyas and festive sweets"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#FF9200]">FESTIVE</span>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#FF9200] transition-colors leading-tight">
                        Pooja &amp; Gifts
                      </h4>
                    </div>
                    <span className="text-[10px] font-black bg-[#FFE3B5] text-[#101C27] px-1.5 py-0.5 rounded">
                      Diwali
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Festive Campaign Banner Card + 2 Editorial Promo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: Seasonal & Festive Diwali Corner */}
          <div 
            onClick={() => onCategoryClick('festive')}
            className="group cursor-pointer rounded-3xl p-5 bg-linear-to-r from-[#FFF7EC] via-[#FFE3B5]/60 to-[#FDF2F8] border border-[#FF9200]/30 shadow-xs flex items-center justify-between hover:shadow-md hover:-translate-y-0.5 transition-all relative overflow-hidden"
          >
            <div className="space-y-1.5 z-10 max-w-[62%]">
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-[#FF9200] text-[#101C27] px-2 py-0.5 rounded-full shadow-2xs">
                <Flame className="w-3 h-3 fill-current" />
                <span>FESTIVE ESSENTIALS</span>
              </span>
              <h3 className="text-base font-black text-[#101C27] leading-tight">
                Brass Diyas, Dry Fruits &amp; Sweets
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Upcycled temple agarbatti, ghee wicks &amp; royal gift boxes in 10 mins
              </p>
            </div>
            
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-md border-2 border-white shrink-0 group-hover:scale-105 transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=400&q=80"
                alt="Traditional brass diya with festive lights"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Card 2: Morning Breakfast & Farm Dairy */}
          <div 
            onClick={() => onCategoryClick('dairy')}
            className="group cursor-pointer rounded-3xl p-5 bg-linear-to-r from-[#EFF6FF] to-[#DBEAFE]/70 border border-blue-200/60 shadow-xs flex items-center justify-between hover:shadow-md hover:-translate-y-0.5 transition-all relative overflow-hidden"
          >
            <div className="space-y-1.5 z-10 max-w-[62%]">
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full shadow-2xs">
                <Clock className="w-3 h-3" />
                <span>⚡ 8 MINS DISPATCH</span>
              </span>
              <h3 className="text-base font-black text-[#101C27] leading-tight">
                Fresh Milk, Bread &amp; Farm Eggs
              </h3>
              <p className="text-xs text-blue-950 font-medium">
                Amul, Country Delight, Sourdough &amp; Artisanal Paneer
              </p>
            </div>

            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-md border-2 border-white shrink-0 group-hover:scale-105 transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80"
                alt="Fresh milk bottle, butter and eggs on table"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Card 3: 100% Cold-Chain Farm Vegetables */}
          <div 
            onClick={() => onCategoryClick('produce')}
            className="group cursor-pointer rounded-3xl p-5 bg-linear-to-r from-[#ECFDF5] to-[#D1FAE5]/70 border border-emerald-200 shadow-xs flex items-center justify-between hover:shadow-md hover:-translate-y-0.5 transition-all relative overflow-hidden"
          >
            <div className="space-y-1.5 z-10 max-w-[62%]">
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-[#42A66C] text-white px-2 py-0.5 rounded-full shadow-2xs">
                <ShieldCheck className="w-3 h-3" />
                <span>100% FARM FRESH</span>
              </span>
              <h3 className="text-base font-black text-[#101C27] leading-tight">
                Daily Mandi Vegetables &amp; Ripe Fruits
              </h3>
              <p className="text-xs text-emerald-950 font-medium flex items-center gap-1">
                <span>Twice-daily replenishment</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#42A66C]" />
              </p>
            </div>

            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-md border-2 border-white shrink-0 group-hover:scale-105 transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80"
                alt="Fresh crisp tomatoes and garden vegetables"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
