import React from 'react';
import { 
  X, ExternalLink, MapPin, ShoppingBag, 
  Megaphone, Users, Warehouse, HelpCircle, 
  FileCode, Check, ArrowRight, Compass 
} from 'lucide-react';
import { ProductCategory } from '../types';
import { KLICKIT_CATEGORIES } from '../data/mockData';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tabId: string, category?: ProductCategory) => void;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
}) => {
  if (!isOpen) return null;

  const handleJump = (tabId: string, category?: ProductCategory) => {
    onNavigateTab(tabId, category);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 to-[#101C27] text-white border-b border-slate-800 sticky top-0 z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF9200]/20 text-[#FF9200] flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white tracking-tight">
                  KLICKIT Architectural Sitemap
                </h2>
                <span className="text-[10px] font-mono font-bold bg-[#FF9200] text-[#101C27] px-2 py-0.5 rounded-full">
                  XML &amp; HTML
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Complete site hierarchy, quick-commerce aisles, and brand logistics directory.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-white transition-colors"
              title="Open raw XML sitemap"
            >
              <FileCode className="w-3.5 h-3.5 text-[#FF9200]" />
              <span>sitemap.xml</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content Directory */}
        <div className="p-6 sm:p-8 space-y-8 flex-1">
          
          {/* Quick Jump Callout */}
          <div className="p-4 rounded-2xl bg-[#FFF4E5] border border-[#FF9200]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-[#101C27]">XML Sitemap &amp; AI Chatbot Crawler Access Active:</span>
              <p className="text-slate-600">
                Indexable by search crawlers and AI chatbots (ChatGPT, Gemini, Perplexity, Claude) at <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-orange-200 text-[#101C27]">/robots.txt</code> with complete site coverage.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#FF9200] hover:bg-[#E88300] text-[#101C27] font-bold rounded-xl transition-colors flex items-center gap-1"
              >
                <span>View XML</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="/robots.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl border border-orange-200 transition-colors flex items-center gap-1"
              >
                <span>robots.txt</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Section 1: Quick Commerce Catalog & Department Aisles */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <ShoppingBag className="w-4 h-4 text-[#0c831f]" />
              <h3 className="text-sm font-extrabold text-[#101C27] uppercase tracking-wider font-mono">
                01. 10-Minute Quick Commerce Catalog
              </h3>
              <span className="text-[11px] text-slate-400 ml-auto">10 Primary Aisles</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div 
                onClick={() => handleJump('store')}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 hover:border-slate-300 cursor-pointer transition-all space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Main Storefront</span>
                  <span className="text-[10px] font-mono text-[#0c831f] font-bold">/?tab=store</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Carousel banners, fast delivery widgets, and category rails.
                </p>
              </div>

              {KLICKIT_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => handleJump('categories', cat.id)}
                  className="p-3 rounded-2xl bg-white hover:bg-[#ECFDF5] border border-slate-200 hover:border-[#0c831f]/40 cursor-pointer transition-all space-y-1 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#101C27] flex items-center gap-2">
                      <img
                        src={cat.image}
                        alt={cat.label}
                        className="w-5 h-5 rounded-md object-cover border border-slate-200 shrink-0"
                      />
                      <span className="group-hover:text-[#0c831f] transition-colors">{cat.label}</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#0c831f] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    /?tab=categories&amp;category={cat.id}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Omnichannel Marketing & Campaigns */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Megaphone className="w-4 h-4 text-[#FF9200]" />
              <h3 className="text-sm font-extrabold text-[#101C27] uppercase tracking-wider font-mono">
                02. Omnichannel Marketing &amp; Brand Campaigns
              </h3>
              <span className="text-[11px] text-slate-400 ml-auto">Strategy Modules</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div 
                onClick={() => handleJump('marketing')}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-orange-50/50 border border-slate-200 hover:border-[#FF9200]/40 cursor-pointer transition-all space-y-1"
              >
                <div className="text-xs font-bold text-slate-900">ATL Television &amp; OOH</div>
                <div className="text-[10px] font-mono text-[#FF9200] font-bold">TVC &amp; Billboards</div>
                <p className="text-[11px] text-slate-500">
                  Flyover hoardings simulator, metro pillar takeovers, and prime-time OTT spots.
                </p>
              </div>

              <div 
                onClick={() => handleJump('marketing')}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-orange-50/50 border border-slate-200 hover:border-[#FF9200]/40 cursor-pointer transition-all space-y-1"
              >
                <div className="text-xs font-bold text-slate-900">BTL Society &amp; Campus Drops</div>
                <div className="text-[10px] font-mono text-[#FF9200] font-bold">Activations</div>
                <p className="text-[11px] text-slate-500">
                  RWA breakfast pods, B-School midnight exam cramming stations, and sampling.
                </p>
              </div>

              <div 
                onClick={() => handleJump('marketing')}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-orange-50/50 border border-slate-200 hover:border-[#FF9200]/40 cursor-pointer transition-all space-y-1"
              >
                <div className="text-xs font-bold text-slate-900">Digital &amp; Push Simulator</div>
                <div className="text-[10px] font-mono text-[#FF9200] font-bold">Growth Loops</div>
                <p className="text-[11px] text-slate-500">
                  Contextual monsoon and midnight push triggers with real CTR calculations.
                </p>
              </div>

              <div 
                onClick={() => handleJump('marketing')}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-orange-50/50 border border-slate-200 hover:border-[#FF9200]/40 cursor-pointer transition-all space-y-1"
              >
                <div className="text-xs font-bold text-slate-900">4Ps &amp; STP Framework</div>
                <div className="text-[10px] font-mono text-[#FF9200] font-bold">Academic Model</div>
                <p className="text-[11px] text-slate-500">
                  Formal segmentation, targeting, and quick-commerce 4Ps positioning matrix.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Consumer Research & Personas */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Users className="w-4 h-4 text-[#0284C7]" />
              <h3 className="text-sm font-extrabold text-[#101C27] uppercase tracking-wider font-mono">
                03. Consumer Personas &amp; Research Matrix
              </h3>
              <span className="text-[11px] text-slate-400 ml-auto">Demographic Profiles</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div 
                onClick={() => handleJump('personas')}
                className="p-3 rounded-2xl bg-white hover:bg-sky-50/50 border border-slate-200 hover:border-sky-300 cursor-pointer transition-all space-y-1"
              >
                <div className="text-xs font-bold text-slate-900">Aarav Mehta (23)</div>
                <div className="text-[10px] text-sky-700 font-semibold">The Midnight Crammer</div>
                <p className="text-[11px] text-slate-500">Koramangala · Student &amp; Developer</p>
              </div>

              <div 
                onClick={() => handleJump('personas')}
                className="p-3 rounded-2xl bg-white hover:bg-sky-50/50 border border-slate-200 hover:border-sky-300 cursor-pointer transition-all space-y-1"
              >
                <div className="text-xs font-bold text-slate-900">Pooja Nair (28)</div>
                <div className="text-[10px] text-sky-700 font-semibold">Corporate Associate</div>
                <p className="text-[11px] text-slate-500">Cyber City, Gurugram · Management Consultant</p>
              </div>

              <div 
                onClick={() => handleJump('personas')}
                className="p-3 rounded-2xl bg-white hover:bg-sky-50/50 border border-slate-200 hover:border-sky-300 cursor-pointer transition-all space-y-1"
              >
                <div className="text-xs font-bold text-slate-900">Mrs. Sunita Sharma (39)</div>
                <div className="text-[10px] text-sky-700 font-semibold">Smart Homemaker</div>
                <p className="text-[11px] text-slate-500">Vasant Vihar, New Delhi · Home Baker</p>
              </div>

              <div 
                onClick={() => handleJump('personas')}
                className="p-3 rounded-2xl bg-white hover:bg-sky-50/50 border border-slate-200 hover:border-sky-300 cursor-pointer transition-all space-y-1"
              >
                <div className="text-xs font-bold text-slate-900">Custom Persona Slot</div>
                <div className="text-[10px] text-sky-700 font-semibold">Interactive Editor</div>
                <p className="text-[11px] text-slate-500">Input and export group study data directly</p>
              </div>
            </div>
          </div>

          {/* Section 4: Brand Logistics, Operations & Support */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Warehouse className="w-4 h-4 text-purple-600" />
              <h3 className="text-sm font-extrabold text-[#101C27] uppercase tracking-wider font-mono">
                04. Dark Store Logistics, FAQs &amp; Inquiries
              </h3>
              <span className="text-[11px] text-slate-400 ml-auto">Operations</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div 
                onClick={() => handleJump('about')}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-purple-50/50 border border-slate-200 hover:border-purple-300 cursor-pointer transition-all space-y-1"
              >
                <div className="text-xs font-bold text-slate-900">Brand Story &amp; Dark Stores</div>
                <div className="text-[10px] font-mono text-purple-600 font-bold">/?tab=about</div>
                <p className="text-[11px] text-slate-500">
                  90-second picking mechanics, 2km radius safety policy, and competitive positioning matrix.
                </p>
              </div>

              <div 
                onClick={() => handleJump('contact')}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-purple-50/50 border border-slate-200 hover:border-purple-300 cursor-pointer transition-all space-y-1"
              >
                <div className="text-xs font-bold text-slate-900">Frequently Asked Questions</div>
                <div className="text-[10px] font-mono text-purple-600 font-bold">Quick Commerce FAQs</div>
                <p className="text-[11px] text-slate-500">
                  Dark store unit economics, farm-fresh cold chain, and zero minimum order policy.
                </p>
              </div>

              <div 
                onClick={() => handleJump('contact')}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-purple-50/50 border border-slate-200 hover:border-purple-300 cursor-pointer transition-all space-y-1"
              >
                <div className="text-xs font-bold text-slate-900">Contact &amp; Partnerships</div>
                <div className="text-[10px] font-mono text-purple-600 font-bold">Inquiries</div>
                <p className="text-[11px] text-slate-500">
                  Academic capstone feedback, brand placement, and vendor onboarding form.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Generative Engine Optimization (GEO) & LLM Endpoints */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="text-sm">⚡</span>
              <h3 className="text-sm font-extrabold text-[#101C27] uppercase tracking-wider font-mono">
                04. Generative Engine Optimization (GEO) &amp; LLM Endpoints
              </h3>
              <span className="text-[11px] text-emerald-600 font-mono font-bold ml-auto">100% AI Crawl Ready</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div 
                onClick={() => handleJump('geo')}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 cursor-pointer transition-all space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">GEO &amp; LLM Engine Hub</span>
                  <span className="text-[10px] font-mono text-sky-600 font-bold">/?tab=geo</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Live Schema.org visualizer, prompt context injector, and Perplexity / ChatGPT simulator.
                </p>
              </div>

              <a
                href="/llms.txt"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 transition-all space-y-1 block"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">LLMs Summary Context</span>
                  <span className="text-[10px] font-mono text-amber-600 font-bold">/llms.txt</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  llmstxt.org standard format for LLM ingestion without HTML/CSS bloat.
                </p>
              </a>

              <a
                href="/llms-full.txt"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition-all space-y-1 block"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Full Knowledge Base</span>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold">/llms-full.txt</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Deep entity triples, item catalog prices, and local dark store geo-coordinates.
                </p>
              </a>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Sitemap dynamically synced with application state &amp; search endpoints</span>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-[#101C27] hover:bg-slate-800 text-white font-bold transition-colors w-full sm:w-auto"
          >
            Close Sitemap
          </button>
        </div>

      </div>
    </div>
  );
};
