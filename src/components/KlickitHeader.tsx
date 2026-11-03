import React, { useState, useEffect } from 'react';
import { 
  Search, ShoppingCart, MapPin, ChevronDown, 
  User, Sparkles, X, Menu, Zap 
} from 'lucide-react';
import { CartItem } from '../types';

interface KlickitHeaderProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenLogin: () => void;
  user: { name: string; phone: string } | null;
  onLogout: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  onOpenLocation: () => void;
  selectedLocation: string;
  onOpenCeoModal: () => void;
  onOpenGeoModal: () => void;
}

export const KlickitHeader: React.FC<KlickitHeaderProps> = ({
  cartItems,
  onOpenCart,
  onOpenLogin,
  user,
  onLogout,
  searchQuery,
  onSearchChange,
  activeTab,
  onSelectTab,
  onOpenLocation,
  selectedLocation,
  onOpenCeoModal,
  onOpenGeoModal,
}) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const placeholderQueries = [
    'Search "Amul fresh milk, brown eggs, bread"',
    'Search "Royal Gala apples, tomatoes, spinach"',
    'Search "Aashirvaad atta, India Gate basmati, dal"',
    'Search "Lay\'s chips, Haldiram\'s bhujia, makhana"',
    'Search "Diwali brass diyas, dry fruit gift boxes"',
    'Search "Cadbury Dairy Milk Silk, Ferrero Rocher"',
    'Search "Chilled Coke cans, Real orange juice"',
    'Search "Maggi noodles, Shin Ramyun spicy ramen"',
    'Search "Himalaya neem face wash, Dettol handwash"',
    'Search "Surf Excel liquid detergent, Vim dish gel"',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderQueries.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [placeholderQueries.length]);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const navTabs = [
    { id: 'store', label: 'Express Store' },
    { id: 'categories', label: 'All Categories' },
    { id: 'marketing', label: 'Brand Campaigns' },
    { id: 'personas', label: 'Customer Stories' },
    { id: 'about', label: 'Dark Stores (10-Min SLA)' },
    { id: 'contact', label: 'Help & FAQs' },
    { id: 'ceo', label: '💬 Direct to CEO' },
    { id: 'geo', label: '⚡ GEO & LLMs' },
    { id: 'sitemap', label: 'Sitemap' },
  ];


  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 transition-all shadow-xs">
      
      {/* Top KLICKIT Nav Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 lg:gap-8">
        
        {/* Left: Brand Logo & Delivery in 10 minutes widget */}
        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          <button
            onClick={() => onSelectTab('store')}
            className="flex items-center text-left focus:outline-none group"
            title="KLICKIT Home"
          >
            <img
              src="/assets/aistudio/image_c3cdf8f4.png"
              alt="KLICKIT"
              className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
          </button>

          {/* Divider */}
          <div className="hidden sm:block h-8 w-px bg-slate-200" />

          {/* KLICKIT Express Location Widget */}
          <button
            onClick={onOpenLocation}
            className="text-left group focus:outline-none max-w-[150px] sm:max-w-[200px]"
          >
            <div className="text-xs sm:text-sm font-extrabold text-[#101C27] flex items-center gap-1 leading-none tracking-tight">
              <span>Delivery in 10 minutes</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] sm:text-xs text-slate-500 font-medium truncate mt-0.5 group-hover:text-[#101C27] transition-colors">
              <span className="truncate">{selectedLocation}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 group-hover:text-[#FF9200]" />
            </div>
          </button>
        </div>

        {/* Center: Express Search Bar */}
        <div className="flex-1 max-w-2xl hidden md:block">
          <div className="relative flex items-center bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200 focus-within:border-[#FF9200] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#FF9200]/15 transition-all p-1">
            <Search className="w-5 h-5 text-slate-400 ml-3.5 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={placeholderQueries[placeholderIndex]}
              className="w-full px-3 py-2 text-sm text-[#101C27] placeholder:text-slate-400 focus:outline-none bg-transparent font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="p-1.5 mr-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Login & Express Cart Button */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Direct to CEO Quick Pill */}
          <button
            onClick={onOpenCeoModal}
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-amber-300 bg-amber-50/80 hover:bg-amber-100/90 text-[#101C27] text-xs font-bold transition-all shadow-2xs active:scale-95"
            title="Send suggestion directly to Founder & CEO"
          >
            <span>💬</span>
            <span className="text-[#101C27]">Direct to CEO</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9200] animate-pulse" />
          </button>

          {/* GEO & LLM Engine Quick Pill */}
          <button
            onClick={onOpenGeoModal}
            className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-sky-300 bg-sky-50/80 hover:bg-sky-100/90 text-[#101C27] text-xs font-bold transition-all shadow-2xs active:scale-95"
            title="Inspect Generative Engine Optimization (GEO) & LLM Code"
          >
            <span>⚡</span>
            <span className="text-[#101C27]">GEO / LLM</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </button>

          {/* Login or User Profile */}
          {user ? (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-800 border border-slate-200">
              <div className="w-6 h-6 rounded-full bg-[#101C27] text-white flex items-center justify-center font-bold text-xs">
                {user.name.charAt(0)}
              </div>
              <span className="truncate max-w-[90px]">{user.name}</span>
              <button
                onClick={onLogout}
                className="text-[10px] text-slate-400 hover:text-red-500 underline ml-1"
                title="Log out"
              >
                Exit
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="px-3.5 py-2 text-sm font-bold text-[#101C27] hover:text-[#FF9200] transition-colors whitespace-nowrap"
            >
              Login
            </button>
          )}

          {/* KLICKIT Express My Cart Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl bg-[#0c831f] hover:bg-[#096a18] text-white font-extrabold text-xs sm:text-sm active:scale-95 transition-all shadow-md shadow-emerald-900/10 whitespace-nowrap"
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            <span>
              {totalQuantity > 0 ? (
                <>
                  <span className="font-mono">{totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}</span>
                  <span className="mx-1.5 opacity-60">|</span>
                  <span className="font-mono">₹{totalAmount}</span>
                </>
              ) : (
                'My Cart'
              )}
            </span>
          </button>
        </div>

      </div>

      {/* Mobile Search Bar Row */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative flex items-center bg-slate-50 rounded-xl border border-slate-200 p-1">
          <Search className="w-4 h-4 text-slate-400 ml-2.5 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={placeholderQueries[placeholderIndex]}
            className="w-full px-2.5 py-1.5 text-xs text-[#101C27] placeholder:text-slate-400 focus:outline-none bg-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="p-1 mr-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Sub-Navigation Bar with Express Modules */}
      <div className="bg-slate-50 border-t border-slate-200 px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-2 py-2">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#101C27] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#101C27] hover:bg-slate-200/60'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

    </header>
  );
};
