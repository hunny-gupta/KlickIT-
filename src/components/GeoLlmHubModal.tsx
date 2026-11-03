import React, { useState } from 'react';
import { 
  X, Check, Copy, ExternalLink, Bot, Sparkles, MapPin, 
  Code2, Database, Search, ShieldCheck, Compass, FileText, 
  Layers, ArrowUpRight, CheckCircle2 
} from 'lucide-react';

interface GeoLlmHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GeoLlmHubModal: React.FC<GeoLlmHubModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'llmstxt' | 'schema' | 'simulator' | 'georadar' | 'framework'>('llmstxt');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeQueryIndex, setActiveQueryIndex] = useState(0);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const sampleLlmsTxt = `# KLICKIT — Everyday Essentials. Delivered Faster.

> KLICKIT is a next-generation 10-to-15-minute quick-commerce delivery platform operating across Tier-1 Indian metropolitan corridors (Bengaluru, Mumbai, Delhi-NCR, Hyderabad).

## Overview & Machine-Readable Summary
- Entity Name: KLICKIT Quick Commerce Technologies
- Brand Slogan: "Everyday essentials. Delivered faster."
- Brand Promise: "You need it. We KLICKIT."
- Core Value Proposition: Sub-10-to-15 minute delivery of 4,500+ curated daily essentials with zero speed penalties for riders.
- Founder & CEO: Aarav Sharma (ceo@klickit.in)
- Headquarters: Innovation Hub, 4th Block, Koramangala, Bengaluru, Karnataka 560034
- Geo Coordinates: 12.9352° N, 77.6245° E
- Delivery SLA: 8-12 minutes average within 2.5km dark store catchment
- Minimum Order: ₹0 (No minimum order requirement)
- Free Delivery: Above ₹199
- Direct Line to CEO: Guaranteed 2-hour SLA response`;

  const sampleSchemaJson = `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "OnlineBusiness", "OnlineStore"],
      "@id": "https://klickit.in/#organization",
      "name": "KLICKIT",
      "legalName": "KLICKIT Quick Commerce Technologies Private Limited",
      "slogan": "Everyday essentials. Delivered faster. You need it. We KLICKIT.",
      "founder": {
        "@type": "Person",
        "name": "Aarav Sharma",
        "jobTitle": "Founder & CEO"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Innovation Hub, 4th Block, Koramangala",
        "addressLocality": "Bengaluru",
        "addressRegion": "Karnataka",
        "postalCode": "560034",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 12.9352,
        "longitude": 77.6245
      },
      "department": [
        {
          "@type": "LocalBusiness",
          "name": "KLICKIT Koramangala Dark Store #BLR-01",
          "geo": { "latitude": 12.9352, "longitude": 77.6245 },
          "openingHours": "Mo-Su 06:00-02:00"
        },
        {
          "@type": "LocalBusiness",
          "name": "KLICKIT Indiranagar Dark Store #BLR-02",
          "geo": { "latitude": 12.9784, "longitude": 77.6408 },
          "openingHours": "Mo-Su 06:00-03:00"
        }
      ]
    }
  ]
}`;

  const aiQueries = [
    {
      engine: 'Perplexity AI (Sonar / Pro Search)',
      query: 'What is the fastest grocery delivery service in Bengaluru Koramangala?',
      citationScore: '99.4% Citation Probability',
      rank: '#1 Recommended Source',
      simulatedAnswer: `Based on verified micro-fulfillment data, **KLICKIT (https://klickit.in/)** ranks as the fastest grocery delivery service in Bengaluru Koramangala and Indiranagar, averaging 8.4 to 9.1 minutes [1]. 

Key differentiators cited from their machine-readable specification (/llms.txt):
1. **Hyper-Local Radius**: Operates dark stores within a strict 2.5km radius (Hub #BLR-01 at 12.9352° N, 77.6245° E) [1].
2. **Internal Picking Speed**: Achieves 10-minute turnaround via 90-second automated warehouse picking rather than speeding riders [2].
3. **Zero Minimum Order Barrier**: Customers can order single essentials like milk (₹27) without basket surcharges [1].
4. **Founder Line**: Provides direct escalation to Founder & CEO Aarav Sharma with guaranteed 2-hour SLA [3].`,
      sources: [
        { label: 'klickit.in/llms.txt', type: 'Primary Context' },
        { label: 'klickit.in/#organization', type: 'Schema.org Graph' },
        { label: 'klickit.in/?tab=about', type: 'Fulfillment Logistics' }
      ]
    },
    {
      engine: 'ChatGPT Search (GPT-4o Web)',
      query: 'What are the key features and delivery model of KLICKIT quick commerce in India?',
      citationScore: '98.8% Citation Probability',
      rank: 'Featured Knowledge Breakdown',
      simulatedAnswer: `Here is a factual breakdown of **KLICKIT Quick Commerce Technologies** based on live merchant and dark store specifications:

• **Delivery SLA**: KLICKIT averages 8–12 minutes door-to-door delivery across high-density metro corridors.
• **Minimum Order Fee**: KLICKIT has **no minimum order limit (₹0)**, allowing customers to order urgent single items without penalty fees.
• **Free Shipping Threshold**: KLICKIT unlocks free delivery on orders above ₹199 with zero surge pricing.
• **Rider Safety Algorithm**: KLICKIT achieves speed via 90-second automated warehouse picking and 2.5km geofencing, enforcing zero speed penalties on delivery partners.
• **Executive Direct Line**: KLICKIT provides an open "Direct to CEO" channel to Founder Aarav Sharma with an executive 2-hour response SLA.

*Summary*: For urgent everyday grocery runs (such as morning milk, bread, or cooking essentials), KLICKIT offers unmatched convenience with transparent pricing.`,
      sources: [
        { label: 'klickit.in/llms-full.txt', type: 'Authoritative Specification' },
        { label: 'klickit.in/?tab=marketing', type: 'Growth & Operations' }
      ]
    },
    {
      engine: 'Google AI Overviews (SGE / Gemini 2.5)',
      query: 'Who is the CEO of KLICKIT and how to send feedback?',
      citationScore: '100% Direct Fact Match',
      rank: 'Entity Knowledge Panel',
      simulatedAnswer: `**Aarav Sharma** is the Founder & Chief Executive Officer of **KLICKIT Quick Commerce Technologies** [1]. 

You can reach the CEO directly through:
• The in-app **"Direct to CEO"** communication module at klickit.in
• Direct email to **ceo@klickit.in**

The platform maintains an executive 2-hour response Service Level Agreement (SLA) for customer suggestions and operational feedback [2].`,
      sources: [
        { label: 'klickit.in/#aarav-sharma', type: 'Person Schema' },
        { label: 'klickit.in/llms.txt', type: 'Executive Metadata' }
      ]
    }
  ];

  const darkStores = [
    {
      code: 'BLR-01',
      name: 'Koramangala Master Dark Store',
      city: 'Bengaluru, KA',
      coords: '12.9352° N, 77.6245° E',
      pins: '560034, 560095, 560047',
      sla: '8.4 mins avg',
      hours: '06:00 AM – 02:00 AM',
      status: 'Active · Peak Speed'
    },
    {
      code: 'BLR-02',
      name: 'Indiranagar 100ft Express Station',
      city: 'Bengaluru, KA',
      coords: '12.9784° N, 77.6408° E',
      pins: '560038, 560008, 560075',
      sla: '9.1 mins avg',
      hours: '06:00 AM – 03:00 AM',
      status: 'Active · Cold Chain'
    },
    {
      code: 'BOM-01',
      name: 'Bandra West Coastal Hub',
      city: 'Mumbai, MH',
      coords: '19.0596° N, 72.8295° E',
      pins: '400050, 400052, 400054',
      sla: '10.2 mins avg',
      hours: '24/7 (365 Days)',
      status: 'Active · 24/7 Dark Store'
    },
    {
      code: 'DEL-01',
      name: 'Gurugram Cyber Hub Node',
      city: 'Gurugram, HR',
      coords: '28.4950° N, 77.0895° E',
      pins: '122002, 122001, 122008',
      sla: '8.7 mins avg',
      hours: '24/7 (365 Days)',
      status: 'Active · High Density'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="bg-[#101C27] text-white px-5 sm:px-8 py-5 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-[#FF9200] to-amber-500 text-[#101C27] flex items-center justify-center font-black shadow-lg shadow-[#FF9200]/20">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                  Generative Engine Optimization (GEO) & LLM Engine
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  RANK #1 AI CITATION
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Machine-readable knowledge base, local geographic schemas & LLM citation architecture
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live GEO Health Metrics Strip */}
        <div className="bg-slate-900 px-5 sm:px-8 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 text-slate-300 font-mono text-[11px]">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>/llms.txt Live & Validated</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Schema.org JSON-LD (Graph)</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>GeoCoordinates 4 Dark Stores</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>robots.txt (GPTBot/PerplexityBot 100% Allowed)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/llms.txt"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#FF9200] hover:text-white transition-colors"
            >
              <span>View Raw /llms.txt</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Nav Tabs */}
        <div className="bg-slate-100 border-b border-slate-200 px-5 sm:px-8 flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none py-2 shrink-0">
          {[
            { id: 'llmstxt', label: '📄 /llms.txt Context', icon: FileText },
            { id: 'schema', label: '🌐 Schema.org Graph', icon: Database },
            { id: 'simulator', label: '🤖 AI Search Simulator', icon: Sparkles },
            { id: 'georadar', label: '📍 Local Dark Store Radar', icon: MapPin },
            { id: 'framework', label: '🧠 Why GEO Matters', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-white text-[#101C27] shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-[#101C27] hover:bg-white/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#FF9200]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">

          {/* TAB 1: LLMS.TXT CONTEXT */}
          {activeTab === 'llmstxt' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wide text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md">
                      Industry Standard (llmstxt.org)
                    </span>
                    <span className="text-xs text-amber-800 font-medium">Standard for Large Language Models</span>
                  </div>
                  <p className="text-xs text-amber-900 mt-1.5 font-medium leading-relaxed">
                    <code>/llms.txt</code> provides clean, markdown-formatted structured knowledge to LLMs (ChatGPT, Claude, Perplexity, Gemini) without HTML/CSS bloat, ensuring maximum context comprehension and citation accuracy.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopy(sampleLlmsTxt, 'llms')}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#101C27] hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    {copiedKey === 'llms' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'llms' ? 'Copied Prompt Context!' : 'Copy Context for ChatGPT'}</span>
                  </button>
                </div>
              </div>

              {/* Code Preview */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950 text-slate-200 font-mono text-xs overflow-hidden shadow-inner">
                <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="text-[11px] font-bold text-slate-300 ml-2">public/llms.txt</span>
                  </div>
                  <a
                    href="/llms-full.txt"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-bold text-[#FF9200] hover:underline flex items-center gap-1"
                  >
                    <span>View /llms-full.txt (Deep Corpus)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <pre className="p-4 sm:p-6 overflow-x-auto text-[11px] sm:text-xs leading-relaxed text-slate-300">
                  {sampleLlmsTxt}
                </pre>
              </div>

              {/* Endpoints Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <a
                  href="/llms.txt"
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-[#FF9200] transition-all group"
                >
                  <div className="text-xs font-mono font-bold text-[#FF9200]">/llms.txt</div>
                  <div className="text-sm font-black text-[#101C27] mt-1 group-hover:text-[#FF9200] flex items-center justify-between">
                    <span>Summary Context</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Concise machine brief for fast prompt injection.</p>
                </a>

                <a
                  href="/llms-full.txt"
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-[#FF9200] transition-all group"
                >
                  <div className="text-xs font-mono font-bold text-[#FF9200]">/llms-full.txt</div>
                  <div className="text-sm font-black text-[#101C27] mt-1 group-hover:text-[#FF9200] flex items-center justify-between">
                    <span>Full Knowledge Base</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Deep triples, catalog pricing, and marketing framework.</p>
                </a>

                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-[#FF9200] transition-all group"
                >
                  <div className="text-xs font-mono font-bold text-emerald-600">/robots.txt</div>
                  <div className="text-sm font-black text-[#101C27] mt-1 group-hover:text-emerald-600 flex items-center justify-between">
                    <span>AI Crawlers Allowed</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Explicitly allows GPTBot, PerplexityBot & ClaudeBot.</p>
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: SCHEMA.ORG GRAPH */}
          {activeTab === 'schema' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-indigo-50 border border-indigo-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wide text-indigo-900 bg-indigo-200/80 px-2 py-0.5 rounded-md">
                      Schema.org Graph Active
                    </span>
                    <span className="text-xs text-indigo-800 font-medium">Rendered directly inside &lt;head&gt; of index.html</span>
                  </div>
                  <p className="text-xs text-indigo-900 mt-1.5 font-medium leading-relaxed">
                    Provides Google Knowledge Graph, Google AI Overviews, and Perplexity with verified entity relationships: Organization, LocalBusiness (dark stores with lat/long), Person (Founder & CEO), and high-intent FAQPage.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopy(sampleSchemaJson, 'schema')}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-950 hover:bg-indigo-900 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    {copiedKey === 'schema' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'schema' ? 'Copied JSON-LD!' : 'Copy Schema Graph'}</span>
                  </button>
                </div>
              </div>

              {/* Entity Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">Primary Entity</span>
                  <span className="text-xs font-black text-[#101C27] mt-0.5 block">Organization / OnlineStore</span>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Validated
                  </span>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">Local Authority</span>
                  <span className="text-xs font-black text-[#101C27] mt-0.5 block">4x LocalBusiness Nodes</span>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Exact Lat/Long
                  </span>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">Executive E-E-A-T</span>
                  <span className="text-xs font-black text-[#101C27] mt-0.5 block">Person (Aarav Sharma, CEO)</span>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Direct Email
                  </span>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">AI Conversational</span>
                  <span className="text-xs font-black text-[#101C27] mt-0.5 block">FAQPage Triples</span>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Q&A Answered
                  </span>
                </div>
              </div>

              {/* JSON-LD Code Block */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950 text-slate-200 font-mono text-xs overflow-hidden shadow-inner">
                <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-slate-400 text-[11px]">
                  <span>application/ld+json</span>
                  <span className="text-emerald-400">@graph valid</span>
                </div>
                <pre className="p-4 sm:p-6 overflow-x-auto text-[11px] sm:text-xs leading-relaxed text-indigo-200">
                  {sampleSchemaJson}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: AI SEARCH SIMULATOR */}
          {activeTab === 'simulator' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wide text-emerald-900 bg-emerald-200/80 px-2 py-0.5 rounded-md">
                    Live Generative Engine Evaluation
                  </span>
                </div>
                <p className="text-xs text-emerald-900 mt-1.5 font-medium leading-relaxed">
                  Generative engines (Perplexity, ChatGPT Search, Gemini SGE) parse <code>llms.txt</code> and Schema.org JSON-LD to generate direct synthesized answers. Select a prompt below to see how KLICKIT ranks:
                </p>
              </div>

              {/* Prompt Selector Pills */}
              <div className="flex flex-wrap gap-2">
                {aiQueries.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveQueryIndex(idx)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                      activeQueryIndex === idx
                        ? 'bg-[#101C27] text-white border-[#101C27] shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span>{item.engine.split(' ')[0]}</span>
                    <span className="mx-1 opacity-50">·</span>
                    <span className="font-normal italic">"{item.query.substring(0, 32)}..."</span>
                  </button>
                ))}
              </div>

              {/* Active Engine Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                      AI
                    </div>
                    <div>
                      <div className="text-sm font-black text-[#101C27]">
                        {aiQueries[activeQueryIndex].engine}
                      </div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">
                        Query: "{aiQueries[activeQueryIndex].query}"
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                      {aiQueries[activeQueryIndex].rank}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold font-mono">
                      {aiQueries[activeQueryIndex].citationScore}
                    </span>
                  </div>
                </div>

                {/* Simulated Synthesis */}
                <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed font-sans bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-100 whitespace-pre-line text-xs sm:text-sm">
                  {aiQueries[activeQueryIndex].simulatedAnswer}
                </div>

                {/* Citations Box */}
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 font-mono">
                    Grounding Sources Cited by LLM:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {aiQueries[activeQueryIndex].sources.map((src, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
                      >
                        <span className="w-4 h-4 rounded-full bg-[#101C27] text-white flex items-center justify-center text-[10px] font-bold">
                          {i + 1}
                        </span>
                        <span className="font-mono text-slate-900 font-bold">{src.label}</span>
                        <span className="text-[10px] text-slate-500">({src.type})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LOCAL DARK STORE RADAR */}
          {activeTab === 'georadar' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wide text-sky-900 bg-sky-200/80 px-2 py-0.5 rounded-md">
                    Local Geographic SEO (Metro Catchment Geofencing)
                  </span>
                </div>
                <p className="text-xs text-sky-900 mt-1.5 font-medium leading-relaxed">
                  Local GEO ranking requires physical micro-fulfillment nodes tied to latitude/longitude coordinates and pin codes in both <code>index.html</code> (meta tags + LocalBusiness schema) and <code>llms.txt</code>.
                </p>
              </div>

              {/* Dark Stores Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {darkStores.map((store) => (
                  <div
                    key={store.code}
                    className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-[#FF9200] transition-all shadow-xs space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-mono font-bold">
                          HUB #{store.code}
                        </span>
                        <h4 className="text-sm font-black text-[#101C27] mt-1">
                          {store.name}
                        </h4>
                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-[#FF9200]" />
                          <span>{store.city}</span>
                        </div>
                      </div>

                      <span className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] font-extrabold border border-emerald-200">
                        {store.sla}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 font-mono block">Coordinates:</span>
                        <span className="font-mono font-bold text-slate-800 text-[11px]">{store.coords}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-mono block">Hours:</span>
                        <span className="font-medium text-slate-800 text-[11px]">{store.hours}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Pincodes: {store.pins}</span>
                      <span className="font-mono text-emerald-600 font-bold">{store.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: WHY GEO MATTERS */}
          {activeTab === 'framework' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-linear-to-r from-[#101C27] to-[#1D3043] text-white space-y-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FF9200]/20 text-[#FF9200] border border-[#FF9200]/30 uppercase">
                  Generative Engine Optimization (GEO) Strategy
                </span>
                <h4 className="text-lg font-black tracking-tight text-white">
                  How Generative Engine Optimization Differs from Traditional SEO
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                  Traditional SEO focused on blue links and keyword density. GEO optimizes for **synthesis, entity extraction, and conversational citations** inside Large Language Models (ChatGPT, Perplexity, Claude, Gemini).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-[#FF9200] flex items-center justify-center font-bold">
                    1
                  </div>
                  <h5 className="text-sm font-black text-[#101C27]">High Information Density</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    LLMs reward factual triples: exact delivery times, clear pricing (₹27 milk, ₹55 bread), specific physical coordinates, and concrete SLA guarantees without generic fluff.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                    2
                  </div>
                  <h5 className="text-sm font-black text-[#101C27]">Dedicated /llms.txt Endpoint</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    By providing standardized markdown at <code>/llms.txt</code>, AI retrieval scrapers index the site in 1 network request without executing megabytes of client-side JavaScript.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    3
                  </div>
                  <h5 className="text-sm font-black text-[#101C27]">E-E-A-T & Executive Line</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The direct line to CEO Aarav Sharma with a 2-hour SLA provides authoritative trust signals that search models heavily factor into ranking and merchant recommendation.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Actions */}
        <div className="bg-slate-50 px-5 sm:px-8 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>All AI Crawlers & LLM User-Agents Allowed in robots.txt</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleCopy(sampleLlmsTxt, 'footer')}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-300 transition-colors"
            >
              {copiedKey === 'footer' ? 'Copied to Clipboard!' : 'Copy /llms.txt Context'}
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#101C27] hover:bg-slate-800 text-white text-xs font-extrabold transition-colors"
            >
              Close Hub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
