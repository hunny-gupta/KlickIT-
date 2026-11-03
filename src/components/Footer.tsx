import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenSitemap?: () => void;
  onOpenCeoModal?: () => void;
  onOpenGeoModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSitemap, onOpenCeoModal, onOpenGeoModal }) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#101C27] text-white border-t border-[#1D3043] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1D3043]">
          
          {/* Brand Info (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/image_c3cdf8f4.png"
                alt="KLICKIT"
                className="h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              <strong className="text-white">Brand tagline:</strong> Everyday essentials. Delivered faster. <br />
              <strong className="text-[#FF9200]">Brand promise:</strong> You need it. We KLICKIT.
            </p>

            <p className="text-[11px] text-slate-400 leading-relaxed max-w-sm">
              Hyper-local dark-store architecture engineered for sub-15 minute grocery fulfillment across high-density metro corridors.
            </p>

            {/* Newsletter input */}
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-200 block mb-1.5">
                Subscribe to KLICKIT Weekly Deals & Product Drops
              </span>
              {subscribed ? (
                <div className="p-2.5 rounded-xl bg-[#152433] border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Subscribed! Welcome voucher sent.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 px-3 py-2 rounded-xl bg-[#152433] border border-[#1D3043] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF9200]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#FF9200] hover:bg-[#E88300] text-[#101C27] font-bold text-xs transition-colors shrink-0"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Nav Column 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#FF9200] uppercase tracking-wider">
              Quick Commerce
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">
                  Fresh Farm Produce
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">
                  Artisanal Bakery & Dairy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">
                  Cold Beverages & Brews
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">
                  Late Night Munchies
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">
                  Household Essentials
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Column 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#FF9200] uppercase tracking-wider">
              Marketing Strategy
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => onNavigate('marketing')} className="hover:text-white transition-colors">
                  ATL Television & OOH
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('marketing')} className="hover:text-white transition-colors">
                  BTL Dorm & Society Drops
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('marketing')} className="hover:text-white transition-colors">
                  Viral Meme Marketing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('marketing')} className="hover:text-white transition-colors">
                  4Ps & STP Framework
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('personas')} className="hover:text-white transition-colors">
                  Consumer Personas Matrix
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Column 3 */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#FF9200] uppercase tracking-wider">
              Site & Architecture
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  The Dark Store Model
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Rider Safety Commitment
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Customer Support & Help
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenSitemap} 
                  className="text-[#FF9200] font-bold hover:underline flex items-center gap-1"
                >
                  <span>Interactive Sitemap</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenCeoModal} 
                  className="text-amber-300 font-bold hover:underline flex items-center gap-1.5"
                >
                  <span>💬 Direct to CEO Desk</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenGeoModal} 
                  className="text-sky-300 font-bold hover:underline flex items-center gap-1.5"
                >
                  <span>⚡ GEO & LLM Engine Hub</span>
                </button>
              </li>
              <li>
                <a 
                  href="/llms.txt" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#FF9200] hover:text-white font-mono text-[11px] flex items-center gap-1"
                >
                  <span>LLM Context (/llms.txt)</span>
                </a>
              </li>
              <li>
                <a 
                  href="/sitemap.xml" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-400 hover:text-slate-200 font-mono text-[11px]"
                >
                  XML Sitemap (sitemap.xml)
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Corporate Details & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF9200]" />
            <p className="leading-normal">
              <strong>KLICKIT Technologies:</strong> Delivering everyday grocery and household essentials in 10 minutes across Bengaluru, Mumbai, Gurugram, and New Delhi corridors. Zero minimum orders, honest MRP pricing, and guaranteed rider safety.
            </p>
          </div>

          <div className="flex items-center gap-4 whitespace-nowrap shrink-0 text-slate-400 font-mono text-[11px]">
            <button 
              onClick={onOpenGeoModal}
              className="text-sky-400 hover:text-sky-300 transition-colors font-bold"
            >
              ⚡ GEO & LLMs
            </button>
            <a 
              href="/llms.txt" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#FF9200] transition-colors"
            >
              llms.txt
            </a>
            <button 
              onClick={onOpenSitemap}
              className="hover:text-[#FF9200] transition-colors underline decoration-slate-600"
            >
              Sitemap
            </button>
            <a 
              href="/robots.txt" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#FF9200] transition-colors"
            >
              robots.txt
            </a>
            <span>&copy; 2026 KLICKIT Project.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
