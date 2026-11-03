import React, { useState } from 'react';
import { ShoppingBag, MapPin, Zap, Menu, X, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Koramangala, Bengaluru');
  const [locationModalOpen, setLocationModalOpen] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const navLinks = [
    { id: 'shop', label: 'Shop Essentials' },
    { id: 'about', label: 'Brand Story' },
    { id: 'marketing', label: 'Marketing & Campaigns' },
    { id: 'personas', label: 'Consumer Personas' },
    { id: 'contact', label: 'Contact & FAQ' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const locations = [
    { name: 'Koramangala, Bengaluru', eta: '10 mins', darkStore: 'Store #BLR-04' },
    { name: 'Indiranagar 100ft Rd, Bengaluru', eta: '12 mins', darkStore: 'Store #BLR-02' },
    { name: 'Cyber City, Gurugram', eta: '11 mins', darkStore: 'Store #DEL-09' },
    { name: 'Bandra West, Mumbai', eta: '13 mins', darkStore: 'Store #BOM-06' },
    { name: 'Vasant Vihar, New Delhi', eta: '11 mins', darkStore: 'Store #DEL-03' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#101C27] text-white border-b border-[#1D3043] transition-all">
        {/* Top utility alert bar */}
        <div className="bg-[#FF9200] text-[#101C27] px-4 py-1.5 text-xs font-semibold flex items-center justify-between overflow-x-auto">
          <div className="flex items-center gap-2 mx-auto whitespace-nowrap">
            <span className="flex items-center gap-1 font-bold">
              <Zap className="w-3.5 h-3.5 fill-current" />
              KLICKIT EXPRESS BRAND
            </span>
            <span aria-hidden="true">·</span>
            <span>You need it. We KLICKIT. Instant 10-15 min delivery across metro pin codes</span>
            <span aria-hidden="true">·</span>
            <span className="underline cursor-pointer" onClick={() => onNavigate('marketing')}>
              View Brand Strategy & Growth Plan &rarr;
            </span>
          </div>
        </div>

        {/* Strict 3-zone Top Bar Contract */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Single Brand element */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => onNavigate('hero')}
              className="flex items-center gap-3 text-left focus:outline-none group"
            >
              <img
                src="/assets/aistudio/image_c3cdf8f4.png"
                alt="KLICKIT Logo"
                className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </button>

            {/* Quick Delivery Location Picker */}
            <button
              onClick={() => setLocationModalOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#152433] hover:bg-[#1D3043] border border-[#1D3043] text-xs transition-colors"
              title="Change Delivery Location"
            >
              <MapPin className="w-3.5 h-3.5 text-[#FF9200]" />
              <div className="text-left">
                <span className="text-slate-400 block text-[10px] leading-tight">Delivering to</span>
                <span className="font-semibold text-white truncate max-w-[140px] block">{selectedLocation}</span>
              </div>
              <span className="text-[#FF9200] font-bold text-[11px] bg-[#FF9200]/15 px-1.5 py-0.5 rounded">
                10-12m
              </span>
            </button>
          </div>

          {/* Zone 2: 4-5 Nav links, single line */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`whitespace-nowrap transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#FF9200] font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF9200] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action (Interactive Cart Bag) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#FF9200] text-[#101C27] font-bold text-sm hover:bg-[#E88300] active:scale-95 transition-all shadow-lg shadow-[#FF9200]/20 whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                {totalQuantity > 0 ? (
                  <>
                    <span>Cart</span>
                    <span className="ml-1 text-xs bg-[#101C27] text-white px-2 py-0.5 rounded-full font-mono">
                      {totalQuantity}
                    </span>
                    <span className="hidden sm:inline ml-1 font-mono text-xs">
                      · ₹{totalAmount}
                    </span>
                  </>
                ) : (
                  'My Cart'
                )}
              </span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-[#152433] text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#152433] border-b border-[#1D3043] px-4 pt-3 pb-6 space-y-3">
            <div className="pb-3 border-b border-[#1D3043]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLocationModalOpen(true);
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[#101C27] text-xs text-left"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FF9200]" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">Delivering to</span>
                    <span className="font-semibold text-white">{selectedLocation}</span>
                  </div>
                </div>
                <span className="text-[#FF9200] font-bold text-xs bg-[#FF9200]/15 px-2 py-0.5 rounded">
                  Change
                </span>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? 'bg-[#FF9200] text-[#101C27] font-bold'
                      : 'text-slate-200 hover:bg-[#1D3043]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Location Selector Modal */}
      {locationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-[#152433] text-white border border-[#1D3043] rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#FF9200]" />
                <h3 className="font-bold text-lg text-white">Select Delivery Metro</h3>
              </div>
              <button
                onClick={() => setLocationModalOpen(false)}
                className="p-1 rounded-lg hover:bg-[#1D3043] text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              KLICKIT delivers everyday essentials within 10-15 minutes using hyper-local dark stores in these live metro zones.
            </p>
            <div className="space-y-2 mb-6">
              {locations.map((loc) => (
                <button
                  key={loc.name}
                  onClick={() => {
                    setSelectedLocation(loc.name);
                    setLocationModalOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                    selectedLocation === loc.name
                      ? 'border-[#FF9200] bg-[#FF9200]/10 text-white'
                      : 'border-[#1D3043] bg-[#101C27] hover:border-slate-500 text-slate-300'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-sm">{loc.name}</div>
                    <div className="text-xs text-slate-400">{loc.darkStore}</div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#FF9200] bg-[#FF9200]/15 px-2 py-1 rounded">
                    ⚡ {loc.eta}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setLocationModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#FF9200] text-[#101C27] font-bold text-sm hover:bg-[#E88300] transition-colors"
            >
              Confirm Location
            </button>
          </div>
        </div>
      )}
    </>
  );
};
