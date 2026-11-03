/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { KlickitHeader } from './components/KlickitHeader';
import { KlickitBanners } from './components/KlickitBanners';
import { KlickitCategoryGrid } from './components/KlickitCategoryGrid';
import { KlickitProductRow } from './components/KlickitProductRow';
import { KlickitCategoryExplorer } from './components/KlickitCategoryExplorer';
import { KlickitLoginModal } from './components/KlickitLoginModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AboutSection } from './components/AboutSection';
import { MarketingSection } from './components/MarketingSection';
import { PersonasSection } from './components/PersonasSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SitemapModal } from './components/SitemapModal';
import { CeoSuggestionModal } from './components/CeoSuggestionModal';
import { GeoLlmHubModal } from './components/GeoLlmHubModal';
import { Product, CartItem, ProductCategory } from './types';
import { PRODUCTS, KLICKIT_CATEGORIES } from './data/mockData';
import { ShoppingCart, Check, MapPin, X, MessageSquare } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('klickit_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeTab, setActiveTab] = useState<'store' | 'categories' | 'marketing' | 'personas' | 'about' | 'contact' | 'sitemap'>('store');
  const [explorerCategory, setExplorerCategory] = useState<ProductCategory>('dairy');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);
  const [isCeoModalOpen, setIsCeoModalOpen] = useState(false);
  const [isGeoModalOpen, setIsGeoModalOpen] = useState(false);
  const [showCeoToastPrompt, setShowCeoToastPrompt] = useState(false);
  const [user, setUser] = useState<{ name: string; phone: string } | null>(() => {
    try {
      const savedUser = localStorage.getItem('klickit_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [selectedLocation, setSelectedLocation] = useState('Bengaluru, Karnataka 560034');
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  // Active placed order for live simulation tracking
  const [activeOrder, setActiveOrder] = useState<{
    orderId: string;
    items: CartItem[];
    totalAmount: number;
  } | null>(null);

  // Timely CEO suggestion prompt after 12 seconds of browsing
  useEffect(() => {
    const hasSeenPrompt = sessionStorage.getItem('klickit_ceo_prompt_seen');
    if (!hasSeenPrompt) {
      const timer = setTimeout(() => {
        setShowCeoToastPrompt(true);
      }, 12000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('klickit_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Parse URL query parameters for sitemap, geo hub, or deep linking (e.g. ?tab=sitemap, ?tab=geo or ?category=dairy)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      const cat = params.get('category');
      if (cat && ['dairy', 'munchies', 'drinks', 'produce', 'instant', 'sweet', 'bakery', 'household', 'personal', 'paan'].includes(cat)) {
        setExplorerCategory(cat as ProductCategory);
        setActiveTab('categories');
      } else if (tab === 'sitemap') {
        setIsSitemapOpen(true);
      } else if (tab === 'geo') {
        setIsGeoModalOpen(true);
      } else if (tab && ['store', 'categories', 'marketing', 'personas', 'about', 'contact'].includes(tab)) {
        setActiveTab(tab as any);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    setToastMessage(`Added ${product.name} to cart`);
    setTimeout(() => setToastMessage(''), 2200);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenCategory = (category: ProductCategory) => {
    setExplorerCategory(category);
    setActiveTab('categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (phone: string, name: string) => {
    const newUser = { phone, name };
    setUser(newUser);
    localStorage.setItem('klickit_user', JSON.stringify(newUser));
    setToastMessage(`Welcome back, ${name}!`);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('klickit_user');
    setToastMessage('Logged out');
    setTimeout(() => setToastMessage(''), 2000);
  };

  // Quick metro locations
  const locations = [
    { name: 'Bengaluru, Karnataka 560034', darkStore: 'Store #BLR-04 (Koramangala)', eta: '10 mins' },
    { name: 'Indiranagar, Bengaluru 560038', darkStore: 'Store #BLR-02 (100ft Rd)', eta: '8 mins' },
    { name: 'Cyber City, Gurugram 122002', darkStore: 'Store #DEL-09 (DLF Phase 2)', eta: '11 mins' },
    { name: 'Bandra West, Mumbai 400050', darkStore: 'Store #BOM-06 (Pali Hill)', eta: '12 mins' },
    { name: 'Vasant Vihar, New Delhi 110057', darkStore: 'Store #DEL-03 (Priya PVR)', eta: '10 mins' },
  ];

  // Search filtered products if searching
  const searchedProducts = searchQuery
    ? PRODUCTS.filter((p) => {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      })
    : [];

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-[#101C27] flex flex-col font-sans selection:bg-[#0c831f]/20 selection:text-[#101C27]">
      
      {/* KLICKIT Header */}
      <KlickitHeader
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        user={user}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        onSelectTab={(tabId) => {
          if (tabId === 'sitemap') {
            setIsSitemapOpen(true);
          } else if (tabId === 'ceo') {
            setIsCeoModalOpen(true);
          } else if (tabId === 'geo') {
            setIsGeoModalOpen(true);
          } else {
            setActiveTab(tabId as any);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenLocation={() => setIsLocationOpen(true)}
        selectedLocation={selectedLocation}
        onOpenCeoModal={() => setIsCeoModalOpen(true)}
        onOpenGeoModal={() => setIsGeoModalOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-1">
        
        {/* If user is searching from header search bar */}
        {searchQuery ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <h2 className="text-xl font-black text-[#101C27]">
                Search results for <span className="text-[#0c831f]">"{searchQuery}"</span>
              </h2>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 underline"
              >
                Clear Search
              </button>
            </div>

            {searchedProducts.length === 0 ? (
              <div className="py-16 text-center max-w-sm mx-auto">
                <div className="text-4xl mb-3">🔍</div>
                <h3 className="text-base font-bold text-slate-800">No items match your search</h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Try searching for milk, bread, chips, curd, or cold brew coffee.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-xl bg-[#0c831f] text-white text-xs font-bold"
                >
                  Show All Items
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                {searchedProducts.map((product) => {
                  const qty = cartItems.find((i) => i.product.id === product.id)?.quantity || 0;
                  const discount = product.originalPrice > product.price
                    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                    : 0;

                  return (
                    <div
                      key={product.id}
                      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-[#FF9200]/40 p-3 flex flex-col justify-between hover:shadow-lg transition-all"
                    >
                      <div>
                        {/* Top badges */}
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded-md">
                            ⚡ {product.deliveryTime}
                          </div>
                          {discount > 0 && (
                            <span className="text-[10px] font-bold bg-[#0c831f] text-white px-1.5 py-0.5 rounded-md">
                              {discount}% OFF
                            </span>
                          )}
                        </div>

                        {/* Photographic Product Image */}
                        <div
                          onClick={() => setModalProduct(product)}
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
                                  <div class="flex flex-col items-center justify-center text-slate-400 text-center">
                                    <svg class="w-7 h-7 stroke-current mb-0.5" fill="none" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                                    </svg>
                                    <span class="text-[9px] font-bold uppercase">KLICKIT</span>
                                  </div>
                                `;
                              }
                            }}
                          />
                        </div>

                        {/* Veg / Non-Veg mark & Weight */}
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
                          <span className="text-[11px] text-slate-500 font-medium truncate">
                            {product.weight}
                          </span>
                        </div>

                        {/* Product Title */}
                        <h3 
                          onClick={() => setModalProduct(product)}
                          className="text-xs sm:text-[13px] font-bold text-[#101C27] line-clamp-2 hover:text-[#FF9200] cursor-pointer mb-2 leading-snug"
                        >
                          {product.name}
                        </h3>
                      </div>

                      {/* Pricing and Cart Stepper */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
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
                            onClick={() => handleAddToCart(product)}
                            className="px-3 py-1 rounded-xl border-2 border-[#0c831f] text-[#0c831f] hover:bg-[#0c831f] hover:text-white font-extrabold text-xs transition-all shadow-2xs active:scale-95"
                          >
                            + ADD
                          </button>
                        ) : (
                          <div className="flex items-center bg-[#0c831f] text-white rounded-xl overflow-hidden font-bold text-xs shadow-2xs">
                            <button
                              onClick={() => handleUpdateQuantity(product.id, -1)}
                              className="px-2 py-1 hover:bg-[#096a18]"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-mono">{qty}</span>
                            <button
                              onClick={() => handleUpdateQuantity(product.id, 1)}
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
            )}
          </div>
        ) : (
          <>
            {/* Tab 1: KLICKIT Express Store Experience */}
            {activeTab === 'store' && (
              <>
                <KlickitBanners
                  onCategoryClick={handleOpenCategory}
                  onOpenMarketing={() => {
                    setActiveTab('marketing');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onSearchSubmit={(q) => {
                    setSearchQuery(q);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />

                {/* 18 Departments Category Grid with Real Photographs */}
                <KlickitCategoryGrid 
                  onSelectCategory={handleOpenCategory} 
                  activeCategory={explorerCategory}
                />

                {/* Section 6: Popular Products & Best Sellers */}
                <KlickitProductRow
                  title="Best Sellers & Trending Now"
                  subtitle="Most frequently ordered everyday essentials in your neighborhood"
                  badge="🔥 HOTTEST PICKS"
                  category="dairy"
                  products={PRODUCTS.filter((p) => p.badgeType === 'bestseller')}
                  cartItems={cartItems}
                  onAddToCart={handleAddToCart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onSeeAll={handleOpenCategory}
                  onProductClick={setModalProduct}
                />

                {/* Section 10: Seasonal & Festive Diwali Shopping Section */}
                <KlickitProductRow
                  title="Pooja & Festive Essentials"
                  subtitle="Handcrafted brass diyas, temple flower agarbatti, marigold garlands & royal dry fruit boxes"
                  badge="✨ DIWALI SPECIAL"
                  category="festive"
                  products={PRODUCTS.filter((p) => p.category === 'festive')}
                  cartItems={cartItems}
                  onAddToCart={handleAddToCart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onSeeAll={handleOpenCategory}
                  onProductClick={setModalProduct}
                />

                {/* Section 8: Fresh Groceries - Fruits & Daily Vegetables */}
                <KlickitProductRow
                  title="Fresh Fruits & Farm Vegetables"
                  subtitle="Mandi-fresh Royal Gala apples, farm bananas, hydroponic spinach & ripe tomatoes"
                  badge="🌱 TWICE DAILY HARVEST"
                  category="produce"
                  products={PRODUCTS.filter((p) => p.category === 'produce')}
                  cartItems={cartItems}
                  onAddToCart={handleAddToCart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onSeeAll={handleOpenCategory}
                  onProductClick={setModalProduct}
                />

                {/* Section 8 continued: Dairy, Morning Bread & Eggs */}
                <KlickitProductRow
                  title="Dairy, Morning Bread & Eggs"
                  subtitle="Amul fresh milk, whole wheat zero-maida bread, brown eggs & malai paneer"
                  badge="🥛 BREAKFAST STAPLES"
                  category="dairy"
                  products={PRODUCTS.filter((p) => p.category === 'dairy')}
                  cartItems={cartItems}
                  onAddToCart={handleAddToCart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onSeeAll={handleOpenCategory}
                  onProductClick={setModalProduct}
                />

                {/* Kitchen Staples: Atta, Rice & Pulses */}
                <KlickitProductRow
                  title="Atta, Rice & Unpolished Pulses"
                  subtitle="Aashirvaad chakki wheat, India Gate basmati, Tata Sampann toor dal & Fortune oil"
                  badge="🌾 KITCHEN RESTOCK"
                  category="staples"
                  products={PRODUCTS.filter((p) => p.category === 'staples')}
                  cartItems={cartItems}
                  onAddToCart={handleAddToCart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onSeeAll={handleOpenCategory}
                  onProductClick={setModalProduct}
                />

                {/* Section 9: Snacks & Crispy Namkeen */}
                <KlickitProductRow
                  title="Snacks & Crispy Namkeen"
                  subtitle="Lay's magic masala, Haldiram's bhujia, Doritos nachos & roasted makhana"
                  badge="🍿 EVENING CRUNCH"
                  category="munchies"
                  products={PRODUCTS.filter((p) => p.category === 'munchies')}
                  cartItems={cartItems}
                  onAddToCart={handleAddToCart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onSeeAll={handleOpenCategory}
                  onProductClick={setModalProduct}
                />

                {/* Section 9: Cold Drinks, Juices & Cold Brews */}
                <KlickitProductRow
                  title="Cold Drinks, Juices & Cold Brews"
                  subtitle="Chilled Coca-Cola cans, Real orange juice, Paper Boat aamras & cold brew coffee"
                  badge="🧊 CHILLED AT 4°C"
                  category="drinks"
                  products={PRODUCTS.filter((p) => p.category === 'drinks')}
                  cartItems={cartItems}
                  onAddToCart={handleAddToCart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onSeeAll={handleOpenCategory}
                  onProductClick={setModalProduct}
                />

                {/* Tea, Coffee & Breakfast */}
                <KlickitProductRow
                  title="Tea, Coffee & Morning Breakfast"
                  subtitle="Tata Tea Gold, Nescafé classic, almond muesli, rolled oats & pure honey"
                  badge="☕ MORNING FUEL"
                  category="breakfast"
                  products={PRODUCTS.filter((p) => p.category === 'breakfast')}
                  cartItems={cartItems}
                  onAddToCart={handleAddToCart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onSeeAll={handleOpenCategory}
                  onProductClick={setModalProduct}
                />

                {/* Chocolates & Gourmet Sweets */}
                <KlickitProductRow
                  title="Chocolates, Mithai & Desserts"
                  subtitle="Cadbury Dairy Milk Silk, Ferrero Rocher, royal kaju katli & Nutella spread"
                  badge="🍫 SWEET TOOTH"
                  category="sweet"
                  products={PRODUCTS.filter((p) => p.category === 'sweet')}
                  cartItems={cartItems}
                  onAddToCart={handleAddToCart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onSeeAll={handleOpenCategory}
                  onProductClick={setModalProduct}
                />

                {/* Instant Food & Comfort Meals */}
                <KlickitProductRow
                  title="Instant Food, Noodles & Soups"
                  subtitle="Maggi 2-Minute masala, Shin Ramyun spicy ramen, MTR dal makhani & cup noodles"
                  badge="🍜 2-MINUTE READY"
                  category="instant"
                  products={PRODUCTS.filter((p) => p.category === 'instant')}
                  cartItems={cartItems}
                  onAddToCart={handleAddToCart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onSeeAll={handleOpenCategory}
                  onProductClick={setModalProduct}
                />

                {/* Frozen Food & Ice Cream */}
                <KlickitProductRow
                  title="Frozen Food & Ice Cream Party Tubs"
                  subtitle="McCain crispy French fries, Kwality Wall's vanilla tub, Belgian chocolate & kulfi"
                  badge="🍨 FREEZER DISPATCH"
                  category="frozen"
                  products={PRODUCTS.filter((p) => p.category === 'frozen')}
                  cartItems={cartItems}
                  onAddToCart={handleAddToCart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onSeeAll={handleOpenCategory}
                  onProductClick={setModalProduct}
                />

                {/* Personal Care, Beauty & Grooming */}
                <KlickitProductRow
                  title="Personal Care & Beauty"
                  subtitle="Himalaya neem face wash, Nivea light cream, Cetaphil cleanser & body lotion"
                  badge="✨ SKIN & HAIR"
                  category="personal"
                  products={PRODUCTS.filter((p) => p.category === 'personal')}
                  cartItems={cartItems}
                  onAddToCart={handleAddToCart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onSeeAll={handleOpenCategory}
                  onProductClick={setModalProduct}
                />

                {/* Home Cleaning & Laundry Essentials */}
                <KlickitProductRow
                  title="Home Cleaning & Laundry Essentials"
                  subtitle="Surf Excel liquid detergent, Vim lemon gel, Lizol floor cleaner & soft tissues"
                  badge="🧼 CLEAN HOME"
                  category="household"
                  products={PRODUCTS.filter((p) => p.category === 'household')}
                  cartItems={cartItems}
                  onAddToCart={handleAddToCart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onSeeAll={handleOpenCategory}
                  onProductClick={setModalProduct}
                />

                {/* Section 11: Short About KLICKIT Section on Homepage */}
                <section className="py-12 bg-linear-to-b from-white to-[#F8FAFC] border-t border-slate-100">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="bg-[#101C27] text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
                      {/* Ambient background accent */}
                      <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF9200]/10 rounded-full blur-3xl pointer-events-none" />
                      
                      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-8 space-y-3">
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF9200] bg-white/10 px-3 py-1 rounded-full border border-white/10">
                            ABOUT KLICKIT QUICK COMMERCE
                          </span>
                          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                            Everyday convenience. Reimagined for modern urban life.
                          </h2>
                          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-2xl">
                            KLICKIT operates hyper-local, technology-driven dark stores within 2.5km of high-density residential clusters. By pairing automated algorithmic picking with 100% cold-chain preservation, we eliminate daily supermarket runs and deliver your everyday grocery essentials in 10 minutes—with zero minimum order thresholds and zero surge fees.
                          </p>

                          <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-slate-300">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-[#42A66C]" />
                              <span>2.5km Micro-Catchment</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-[#FF9200]" />
                              <span>90-Second Pick Time</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-sky-400" />
                              <span>Rider Safety First (&lt;30 km/h)</span>
                            </div>
                          </div>
                        </div>

                        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                          <button
                            onClick={() => {
                              setActiveTab('about');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="px-6 py-3 rounded-2xl bg-[#FF9200] hover:bg-[#E88300] text-[#101C27] font-black text-xs transition-all shadow-md text-center"
                          >
                            Read Full Dark Store Architecture &rarr;
                          </button>
                          <button
                            onClick={() => {
                              setActiveTab('marketing');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all border border-white/15 text-center"
                          >
                            Explore Brand &amp; Growth Strategy
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Demo Catalog Notice */}
                    <div className="mt-6 text-center">
                      <p className="text-[11px] text-slate-400 font-medium">
                        ℹ️ <strong>Demo Notice:</strong> KLICKIT is a quick-commerce brand experience showcase. Product items, pricing in ₹, and photography represent authentic Indian consumer benchmarks for demonstration.
                      </p>
                    </div>

                  </div>
                </section>
              </>
            )}

            {/* Tab 2: Category Explorer */}
            {activeTab === 'categories' && (
              <KlickitCategoryExplorer
                initialCategory={explorerCategory}
                cartItems={cartItems}
                onAddToCart={handleAddToCart}
                onUpdateQuantity={handleUpdateQuantity}
                onBackToHome={() => {
                  setActiveTab('store');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onProductClick={setModalProduct}
              />
            )}

            {/* Tab 3: Omnichannel Marketing Campaigns */}
            {activeTab === 'marketing' && <MarketingSection />}

            {/* Tab 4: Consumer Personas Matrix */}
            {activeTab === 'personas' && <PersonasSection />}

            {/* Tab 5: About Us & Dark Stores Anatomy */}
            {activeTab === 'about' && <AboutSection />}

            {/* Tab 6: FAQs & Contact */}
            {activeTab === 'contact' && <ContactSection />}
          </>
        )}

      </main>

      {/* Footer */}
      <Footer 
        onNavigate={(id) => {
          if (id === 'shop') setActiveTab('store');
          else if (id === 'marketing') setActiveTab('marketing');
          else if (id === 'personas') setActiveTab('personas');
          else if (id === 'about') setActiveTab('about');
          else if (id === 'contact') setActiveTab('contact');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSitemap={() => setIsSitemapOpen(true)}
        onOpenCeoModal={() => setIsCeoModalOpen(true)}
        onOpenGeoModal={() => setIsGeoModalOpen(true)}
      />

      {/* Interactive Architectural Sitemap Modal */}
      <SitemapModal
        isOpen={isSitemapOpen}
        onClose={() => setIsSitemapOpen(false)}
        onNavigateTab={(tab, cat) => {
          if (cat) {
            setExplorerCategory(cat);
            setActiveTab('categories');
          } else if (tab === 'sitemap') {
            setIsSitemapOpen(true);
          } else {
            setActiveTab(tab as any);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        selectedLocation={selectedLocation}
        onOrderPlaced={(orderId, items, total) => {
          setActiveOrder({ orderId, items, totalAmount: total });
        }}
      />

      {/* KLICKIT Account Login Modal */}
      <KlickitLoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Live Order Dispatch Simulation Modal */}
      {activeOrder && (
        <OrderTrackingModal
          orderId={activeOrder.orderId}
          items={activeOrder.items}
          totalAmount={activeOrder.totalAmount}
          onClose={() => setActiveOrder(null)}
        />
      )}

      {/* Location Picker Modal */}
      {isLocationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#0c831f]" />
                <h3 className="font-extrabold text-base text-[#101C27]">Change Delivery Location</h3>
              </div>
              <button
                onClick={() => setIsLocationOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2 mb-4">
              {locations.map((loc) => (
                <button
                  key={loc.name}
                  onClick={() => {
                    setSelectedLocation(loc.name);
                    setIsLocationOpen(false);
                    setToastMessage(`Delivering to ${loc.name}`);
                    setTimeout(() => setToastMessage(''), 2000);
                  }}
                  className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between ${
                    selectedLocation === loc.name
                      ? 'border-[#0c831f] bg-emerald-50/60 font-bold text-[#101C27]'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900">{loc.name}</div>
                    <div className="text-[11px] text-slate-500 font-normal">{loc.darkStore}</div>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#0c831f] bg-emerald-100/70 px-2 py-0.5 rounded-md">
                    ⚡ {loc.eta}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Cart Bar for Mobile View */}
      {totalQuantity > 0 && !isCartOpen && !activeOrder && (
        <div className="fixed bottom-4 left-4 right-4 z-30 sm:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full p-3.5 rounded-2xl bg-[#0c831f] text-white font-extrabold shadow-xl flex items-center justify-between active:scale-98 transition-transform"
          >
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 fill-current" />
              <span className="text-xs font-mono font-bold">
                {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono">
              <span className="text-sm font-black">₹{totalAmount}</span>
              <span className="text-xs bg-white text-[#0c831f] px-2.5 py-1 rounded-xl uppercase font-sans font-black">
                View Cart &rarr;
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Quick Product Detail Modal */}
      {modalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-mono font-bold bg-[#101C27] text-white px-2 py-0.5 rounded">
                ⚡ {modalProduct.deliveryTime} Delivery
              </span>
              <button
                onClick={() => setModalProduct(null)}
                className="p-1 rounded-lg hover:bg-slate-200 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 rounded-2xl p-1.5 flex items-center justify-center bg-[#F8FAFC] border border-slate-200 overflow-hidden shrink-0 shadow-2xs">
                  <img
                    src={modalProduct.imageUrl}
                    alt={modalProduct.altText || modalProduct.name}
                    className="w-full h-full object-contain rounded-xl"
                    onError={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="flex flex-col items-center justify-center text-slate-400 text-center">
                            <svg class="w-8 h-8 stroke-current" fill="none" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                            </svg>
                            <span class="text-[9px] font-bold uppercase mt-1">KLICKIT Fresh</span>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    {modalProduct.isVeg !== false ? (
                      <div className="w-3.5 h-3.5 rounded-xs border border-emerald-600 flex items-center justify-center p-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      </div>
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-xs border border-amber-800 flex items-center justify-center p-0.5">
                        <div className="w-1.5 h-1.5 bg-amber-800 rounded-xs" />
                      </div>
                    )}
                    <span className="text-xs font-bold text-slate-600">
                      {modalProduct.categoryLabel}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs font-mono font-medium text-slate-500">
                      {modalProduct.weight}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-[#101C27] leading-snug">
                    {modalProduct.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md border border-amber-200/60">
                      ★ {modalProduct.rating} ({modalProduct.reviewCount} ratings)
                    </span>
                    {modalProduct.tag && (
                      <span className="text-xs font-bold bg-[#FFE3B5] text-[#101C27] px-2 py-0.5 rounded-md">
                        {modalProduct.tag}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                {modalProduct.description}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Price</span>
                  <span className="text-2xl font-black font-mono text-[#101C27]">₹{modalProduct.price}</span>
                </div>

                <button
                  onClick={() => {
                    handleAddToCart(modalProduct);
                    setModalProduct(null);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#0c831f] hover:bg-[#096a18] text-white font-extrabold text-xs uppercase tracking-wider shadow-sm transition-all active:scale-95"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Timely Pop-Up: Message from Founder & CEO */}
      {showCeoToastPrompt && !isCeoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div 
            className="bg-[#101C27] text-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-[#FF9200] relative overflow-hidden animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient gold glow */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#FF9200]/20 rounded-full blur-3xl pointer-events-none" />

            <button
              onClick={() => {
                setShowCeoToastPrompt(false);
                sessionStorage.setItem('klickit_ceo_prompt_seen', 'true');
              }}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Founder Avatar & Badge */}
            <div className="flex items-center gap-3.5 mb-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF9200] via-amber-400 to-amber-200 p-0.5 shadow-lg flex items-center justify-center">
                  <div className="w-full h-full bg-[#101C27] rounded-[14px] flex flex-col items-center justify-center">
                    <span className="text-2xl leading-none">👨‍💼</span>
                    <span className="text-[9px] font-mono text-[#FF9200] font-black uppercase mt-0.5">CEO</span>
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#101C27] rounded-full" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#FF9200] uppercase tracking-wider bg-[#FF9200]/20 px-2 py-0.5 rounded-md border border-[#FF9200]/40">
                  <span>★</span> Direct Line · Executive Founder Desk
                </span>
                <h3 className="text-base font-black text-white mt-0.5">
                  A Message from our Founder & CEO
                </h3>
                <div className="text-xs text-slate-400">
                  Aarav Sharma · <span className="text-[#FF9200] font-mono">ceo@klickit.in</span>
                </div>
              </div>
            </div>

            {/* Direct Letter / Quote */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5 text-xs text-slate-200 leading-relaxed italic relative">
              <span className="text-2xl text-[#FF9200] font-serif not-italic absolute top-2 left-2.5 opacity-60">“</span>
              <p className="pl-4 not-italic">
                Dear Shopper, is your experience on KLICKIT meeting our 10-minute promise today? If there is any item missing from your local dark store or any suggestion to serve you better, please write straight to my personal desk. I read and act on every message personally.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  setIsCeoModalOpen(true);
                  setShowCeoToastPrompt(false);
                  sessionStorage.setItem('klickit_ceo_prompt_seen', 'true');
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#FF9200] hover:bg-[#e08000] text-white font-black text-xs uppercase tracking-wider shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Write Direct to CEO Desk</span>
              </button>

              <button
                onClick={() => {
                  setShowCeoToastPrompt(false);
                  sessionStorage.setItem('klickit_ceo_prompt_seen', 'true');
                }}
                className="w-full py-2.5 px-4 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 text-xs font-semibold transition-colors"
              >
                I'm Good, Continue Shopping &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Side Tab for Direct to CEO (Always Available) */}
      {!isCeoModalOpen && (
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-30 hidden md:block">
          <button
            onClick={() => setIsCeoModalOpen(true)}
            className="flex items-center gap-2 bg-[#101C27] hover:bg-[#1a2d3e] text-white border-l-2 border-y-2 border-[#FF9200] py-3 px-3.5 rounded-l-2xl shadow-2xl transition-all hover:pl-4 group active:scale-95"
            title="Direct Line to Founder & CEO"
          >
            <div className="relative">
              <span className="text-lg">👨‍💼</span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
            </div>
            <div className="text-left font-sans">
              <div className="text-[10px] font-mono font-bold text-[#FF9200] uppercase leading-none">
                Direct Line
              </div>
              <div className="text-xs font-black text-white group-hover:text-amber-200">
                Write to CEO
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Floating Bottom CEO Button for Mobile */}
      {!showCeoToastPrompt && !isCeoModalOpen && !isCartOpen && (
        <div className="fixed bottom-20 right-4 z-30 md:hidden">
          <button
            onClick={() => setIsCeoModalOpen(true)}
            className="p-3 rounded-2xl bg-[#101C27] text-white border-2 border-[#FF9200] shadow-2xl flex items-center gap-2 active:scale-95"
            aria-label="Direct to CEO"
          >
            <span className="text-xl">👨‍💼</span>
            <span className="text-xs font-black text-white">CEO Desk</span>
          </button>
        </div>
      )}

      {/* Executive Direct to CEO Suggestion Modal */}
      <CeoSuggestionModal
        isOpen={isCeoModalOpen}
        onClose={() => setIsCeoModalOpen(false)}
        onSuccessToast={(msg) => {
          setToastMessage(msg);
          setTimeout(() => setToastMessage(''), 3500);
        }}
      />

      {/* Generative Engine Optimization (GEO) & LLM Knowledge Hub Modal */}
      <GeoLlmHubModal
        isOpen={isGeoModalOpen}
        onClose={() => setIsGeoModalOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-3 rounded-2xl bg-[#101C27] text-white border border-slate-800 shadow-2xl flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-bottom-2">
          <div className="w-4 h-4 rounded-full bg-emerald-500 text-[#101C27] flex items-center justify-center shrink-0">
            <Check className="w-2.5 h-2.5 stroke-[3]" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
