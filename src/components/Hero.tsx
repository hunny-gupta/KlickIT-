import React, { useState, useEffect } from 'react';
import { Search, Zap, Clock, ShieldCheck, ArrowRight, Sparkles, Bike, PackageCheck, Flame } from 'lucide-react';

interface HeroProps {
  onSearch: (query: string) => void;
  onExploreShop: () => void;
  onExploreMarketing: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  onExploreShop,
  onExploreMarketing,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(648); // ~10m 48s simulated live countdown

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 10 ? prev - 1 : 650));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    } else {
      onExploreShop();
    }
  };

  const quickSearches = [
    { label: 'Organic Avocados', query: 'Avocados' },
    { label: 'Cold Brew Coffee', query: 'Cold Brew' },
    { label: 'Sourdough Loaf', query: 'Sourdough' },
    { label: 'Peri-Peri Ramen', query: 'Ramen' },
    { label: 'Dark Chocolate', query: 'Chocolate' },
  ];

  return (
    <section className="relative overflow-hidden bg-[#101C27] text-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#1D3043]">
      {/* Dynamic Background Geometry & Atmospheric Glows */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] rounded-full bg-[#FF9200]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[500px] h-[500px] rounded-full bg-[#FF9200]/5 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Story & Interactive Search */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Brand Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#152433] border border-[#1D3043] text-xs font-medium text-slate-300">
              <span className="flex h-2 w-2 rounded-full bg-[#FF9200] animate-ping" />
              <span className="text-[#FF9200] font-bold">10-MINUTE QUICK COMMERCE</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300">Hyper-Local Fast Delivery</span>
            </div>

            {/* Headline with No Orphan Words */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
              Everyday essentials. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9200] via-[#FFA834] to-[#FFD085]">
                Delivered faster.
              </span>
            </h1>

            {/* Brand Promise Callout */}
            <div className="p-4 rounded-2xl bg-[#152433]/90 border border-[#1D3043] shadow-inner max-w-xl">
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#FF9200] font-bold mb-1">
                <span>BRAND PROMISE</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                “You need it. We <span className="text-[#FF9200] underline decoration-[#FF9200]/40 underline-offset-4">KLICKIT</span>.”
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Hyper-local dark stores stocked with 4,500+ fresh groceries, dairy, midnight munchies, and home essentials. Packed in 90 seconds, at your door in 10-15 minutes.
              </p>
            </div>

            {/* Interactive Search Bar */}
            <form onSubmit={handleSearchSubmit} className="max-w-xl">
              <div className="relative flex items-center shadow-xl shadow-black/30 rounded-2xl overflow-hidden bg-white text-[#101C27] p-1.5 border-2 border-transparent focus-within:border-[#FF9200] transition-all">
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search 4,500+ items (e.g. sourdough, milk, avocados, chips)..."
                  className="w-full px-3 py-3 text-sm text-[#101C27] placeholder:text-slate-400 focus:outline-none font-medium"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-[#101C27] hover:bg-[#1D3043] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <span>Search</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FF9200]" />
                </button>
              </div>

              {/* Quick trending search tags */}
              <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-400">
                <span className="text-slate-400 font-medium">Trending:</span>
                {quickSearches.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setSearchInput(item.query);
                      onSearch(item.query);
                    }}
                    className="hover:text-white transition-colors underline decoration-slate-600 underline-offset-2"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </form>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreShop}
                className="px-7 py-3.5 rounded-xl bg-[#FF9200] text-[#101C27] font-extrabold text-sm hover:bg-[#E88300] active:scale-95 transition-all shadow-lg shadow-[#FF9200]/25 flex items-center gap-2 whitespace-nowrap"
              >
                <span>Shop Everyday Essentials</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreMarketing}
                className="px-6 py-3.5 rounded-xl bg-[#152433] text-slate-200 hover:text-white hover:bg-[#1D3043] border border-[#1D3043] text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <span>Brand Strategy & Deck</span>
                <Sparkles className="w-4 h-4 text-[#FF9200]" />
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic Quick-Commerce Simulation Card & Visuals */}
          <div className="lg:col-span-5 relative">
            
            {/* Ambient Back Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF9200]/20 to-transparent rounded-3xl filter blur-xl transform rotate-3" />

            {/* Main Interactive Showcase Container */}
            <div className="relative bg-[#152433] border border-[#1D3043] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6">
              
              {/* Top Card Bar with Live Simulated Order ETA */}
              <div className="flex items-center justify-between pb-4 border-b border-[#1D3043]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FF9200]/15 flex items-center justify-center text-[#FF9200]">
                    <Bike className="w-5 h-5 animate-bounce" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-mono tracking-wider uppercase">Live Dispatch Simulator</div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Rider Assigned · Dark Store #04</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Arriving In</div>
                  <div className="text-lg font-mono font-bold text-[#FF9200] tabular-nums">
                    {formatTime(secondsLeft)} min
                  </div>
                </div>
              </div>

              {/* Visual Interactive Delivery Timeline Graphic */}
              <div className="bg-[#101C27] rounded-2xl p-4 border border-[#1D3043] space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-semibold text-white">Order #KL-9204</span>
                  <span className="text-[#FF9200] font-mono text-xs">Stage 3 of 4: Out for Delivery</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#1D3043] h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#FF9200] to-[#FFA834] h-full w-[78%] rounded-full transition-all duration-1000" />
                </div>

                <div className="grid grid-cols-4 text-center text-[10px] text-slate-400 pt-1">
                  <div className="text-slate-200">1. Placed</div>
                  <div className="text-slate-200">2. Picked (72s)</div>
                  <div className="text-[#FF9200] font-bold">3. On Bike (3m)</div>
                  <div>4. Doorstep</div>
                </div>
              </div>

              {/* Floating Product Sample Badges */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>In This Simulated Delivery:</span>
                  <span className="text-[11px] font-mono text-[#FF9200]">Subtotal: ₹494</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-[#101C27] p-2.5 rounded-xl border border-[#1D3043] text-left">
                    <span className="text-xs font-bold text-white block truncate">Hass Avocados</span>
                    <span className="text-[11px] text-slate-400 font-mono">2 pcs · ₹189</span>
                  </div>
                  <div className="bg-[#101C27] p-2.5 rounded-xl border border-[#1D3043] text-left">
                    <span className="text-xs font-bold text-white block truncate">Cold Brew</span>
                    <span className="text-[11px] text-slate-400 font-mono">330ml · ₹160</span>
                  </div>
                  <div className="bg-[#101C27] p-2.5 rounded-xl border border-[#1D3043] text-left">
                    <span className="text-xs font-bold text-white block truncate">Sourdough Loaf</span>
                    <span className="text-[11px] text-slate-400 font-mono">400g · ₹120</span>
                  </div>
                </div>
              </div>

              {/* Dark Store Tech Guarantee Banner */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#FF9200]/10 via-[#FF9200]/5 to-transparent border border-[#FF9200]/20 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#FF9200] shrink-0" />
                <p className="text-xs text-slate-200 leading-snug">
                  <strong className="text-white">Rider Safety Pledge:</strong> Deliveries are fast because dark stores are strictly within 2km — never because riders are hurried.
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Full-width 4-Column Proof & Metrics Strip */}
        <div className="mt-14 pt-10 border-t border-[#1D3043] grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              10-15 <span className="text-[#FF9200] text-xl">Mins</span>
            </div>
            <div className="text-xs text-slate-300 font-medium">Average Delivery Time</div>
            <div className="text-[11px] text-slate-400">Guaranteed across 12 metro clusters</div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              4,500+ <span className="text-[#FF9200] text-xl">SKUs</span>
            </div>
            <div className="text-xs text-slate-300 font-medium">Curated Daily Essentials</div>
            <div className="text-[11px] text-slate-400">Fresh farm produce to late night cravings</div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              99.2% <span className="text-[#FF9200] text-xl">Accuracy</span>
            </div>
            <div className="text-xs text-slate-300 font-medium">Zero-Error Dark Store Picking</div>
            <div className="text-[11px] text-slate-400">AI barcode scanning at warehouse racks</div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              ₹0 <span className="text-[#FF9200] text-xl">Minimum</span>
            </div>
            <div className="text-xs text-slate-300 font-medium">No Minimum Order Value</div>
            <div className="text-[11px] text-slate-400">Order a single butter pack with no penalty</div>
          </div>
        </div>

      </div>
    </section>
  );
};
