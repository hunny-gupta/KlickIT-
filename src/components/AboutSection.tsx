import React, { useState } from 'react';
import { 
  Zap, ShieldCheck, HeartHandshake, Leaf, 
  Layers, Warehouse, Award, CheckCircle2, ChevronRight 
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'story' | 'darkstore' | 'positioning'>('story');

  const coreValues = [
    {
      icon: Zap,
      title: 'Speed with Human Safety',
      desc: 'Our 10-minute speed is engineered inside the warehouse (picked in 90 seconds within a 2km radius), never by pressuring riders on traffic roads.',
      color: '#FF9200'
    },
    {
      icon: ShieldCheck,
      title: 'Zero-Compromise Freshness',
      desc: 'Twice-daily replenishments from farm collectives and dairy co-ops with 3°C cold-chain pods ensuring uncompromised nutrition.',
      color: '#0284C7'
    },
    {
      icon: Leaf,
      title: 'Eco-Forward Operations',
      desc: '100% recyclable paper packaging, reusable delivery totes, and an accelerating transition to electric fleet scooters.',
      color: '#15803D'
    },
    {
      icon: HeartHandshake,
      title: 'Micro-Convenience First',
      desc: 'No arbitrary minimum cart barriers. If you need a single bunch of fresh coriander or emergency AA batteries, we bring it cheerfully.',
      color: '#9333EA'
    }
  ];

  const positioningComparison = [
    {
      feature: 'Delivery Speed',
      klickit: '⚡ 10 – 15 Minutes',
      supermarket: '60 – 120 Mins (Traffic + Queues)',
      scheduledEcom: 'Next Day (12 – 24 Hours)',
      highlight: true
    },
    {
      feature: 'Minimum Order Value',
      klickit: '₹0 (No Minimum Penalty)',
      supermarket: 'Self-transport effort',
      scheduledEcom: '₹500 – ₹1,000 threshold',
      highlight: true
    },
    {
      feature: 'Dark Store Proximity',
      klickit: 'Within 2.0 km of your door',
      supermarket: '3 – 8 km distant in commercial hubs',
      scheduledEcom: 'Centralized mega-warehouse (30 km+)',
      highlight: false
    },
    {
      feature: 'Cart Behavior Focus',
      klickit: 'Immediate distress / instant needs',
      supermarket: 'Weekly planned bulk cart',
      scheduledEcom: 'Monthly bulk dry staples',
      highlight: false
    },
    {
      feature: 'SKU Velocity & Curation',
      klickit: '4,500+ high-turnover essentials',
      supermarket: '20,000+ cluttered aisle items',
      scheduledEcom: '35,000+ deep catalog',
      highlight: false
    }
  ];

  return (
    <section id="about" className="py-20 bg-white text-[#101C27] border-b border-slate-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF4E5] border border-[#FF9200]/30 text-xs font-bold text-[#FF9200]">
            <span>THE KLICKIT BLUEPRINT</span>
            <span aria-hidden="true">·</span>
            <span>Hyper-Local Dark Store Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#101C27]">
            Reimagining Daily Living Through <br className="hidden sm:inline" />
            <span className="text-[#FF9200]">Instant Micro-Fulfillment</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-balance">
            KLICKIT was conceived to solve the fundamental friction of modern city living: the loss of personal time to routine errand runs and delayed grocery supply chains.
          </p>

          {/* Interactive Mode Tabs */}
          <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200 mt-4">
            <button
              onClick={() => setActiveTab('story')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'story'
                  ? 'bg-white text-[#101C27] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Brand Story & Purpose
            </button>
            <button
              onClick={() => setActiveTab('darkstore')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'darkstore'
                  ? 'bg-white text-[#101C27] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              The 10-Minute Tech Engine
            </button>
            <button
              onClick={() => setActiveTab('positioning')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'positioning'
                  ? 'bg-white text-[#101C27] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Competitive Positioning
            </button>
          </div>
        </div>

        {/* Tab 1: Story, Mission & Values */}
        {activeTab === 'story' && (
          <div className="space-y-14 animate-in fade-in duration-200">
            {/* Story Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#101C27] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
              <div className="lg:col-span-7 space-y-4">
                <div className="text-xs font-mono font-bold text-[#FF9200] tracking-wider uppercase">
                  Our Genesis
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
                  Why wait 24 hours for breakfast that you need in 20 minutes?
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Traditional e-commerce was built for 3-day delivery. First-generation grocery apps stretched that to next-day delivery slots. But human life is spontaneous: recipes run out of salt midway, baby formula finishes at 11 PM, and work deadlines demand cold brew right now.
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  KLICKIT bridges this emotional and logistical chasm. By building hyper-local inventory nodes just minutes from residential clusters, we turn what used to be a 45-minute errand into a 10-minute doorbell ring.
                </p>

                {/* Brand Tagline & Promise Box */}
                <div className="p-4 rounded-2xl bg-[#152433] border border-[#1D3043] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase">Brand Tagline</span>
                    <div className="text-base font-bold text-white">Everyday essentials. Delivered faster.</div>
                  </div>
                  <div className="sm:border-l sm:border-[#1D3043] sm:pl-4">
                    <span className="text-[11px] font-mono text-[#FF9200] uppercase">Brand Promise</span>
                    <div className="text-base font-bold text-[#FF9200]">You need it. We KLICKIT.</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Mission & Vision Cards */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 rounded-2xl bg-[#152433] border border-[#1D3043]">
                  <span className="text-xs font-mono text-[#FF9200] font-bold block mb-1">OUR MISSION</span>
                  <h4 className="text-base font-bold text-white mb-2">Eliminate the Chore of Routine Errand Shopping</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    To liberate 10 million urban households from grocery queues and missing ingredients through intelligent micro-fulfillment networks that respect consumer time.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#152433] border border-[#1D3043]">
                  <span className="text-xs font-mono text-[#FF9200] font-bold block mb-1">OUR VISION</span>
                  <h4 className="text-base font-bold text-white mb-2">The Invisible Pantry in Every Neighborhood</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    To make planning household inventory completely obsolete. Anything a modern household requires arrives before their stove is hot.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Values Cards */}
            <div>
              <div className="text-center mb-8">
                <span className="text-xs font-bold text-[#FF9200] uppercase tracking-wider">Foundational Pillars</span>
                <h3 className="text-2xl font-bold text-[#101C27] mt-1">Our Operating Principles</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {coreValues.map((val) => {
                  const Icon = val.icon;
                  return (
                    <div
                      key={val.title}
                      className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors space-y-3"
                    >
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${val.color}15`, color: val.color }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-bold text-[#101C27]">{val.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Dark Store Technology */}
        {activeTab === 'darkstore' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            <div className="bg-[#101C27] text-white rounded-3xl p-8 sm:p-12 border border-[#1D3043]">
              <div className="max-w-2xl mb-8">
                <span className="text-xs font-mono text-[#FF9200] font-bold tracking-wider uppercase">Unit Economics & Tech</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                  How 10-Minute Delivery Actually Works Behind the Curtains
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-2">
                  Many assume riders are forced to speed. In reality, the entire magic happens inside the dark store layout and hyper-dense geospatial clustering.
                </p>
              </div>

              {/* 3 Step Pipeline */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#152433] border border-[#1D3043] space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FF9200]/20 text-[#FF9200] flex items-center justify-center font-mono font-bold text-sm">
                    01
                  </div>
                  <h4 className="text-base font-bold text-white">Algorithm-Guided Shelf Layout</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    High-velocity items (milk, bread, chips) are positioned directly at the staging counter. Warehouse pickers follow an optimized single-pass route on handheld scanners.
                  </p>
                  <div className="text-[11px] font-mono text-[#FF9200]">Target: Picked in 60-80s</div>
                </div>

                <div className="p-6 rounded-2xl bg-[#152433] border border-[#1D3043] space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FF9200]/20 text-[#FF9200] flex items-center justify-center font-mono font-bold text-sm">
                    02
                  </div>
                  <h4 className="text-base font-bold text-white">Instant QR Hand-off & Bagging</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Paper totes are sealed with a tamper-evident QR strip. Cold-chain items are transferred from 3°C pods into thermal sleeves within 20 seconds.
                  </p>
                  <div className="text-[11px] font-mono text-[#FF9200]">Target: Quality check in 30s</div>
                </div>

                <div className="p-6 rounded-2xl bg-[#152433] border border-[#1D3043] space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FF9200]/20 text-[#FF9200] flex items-center justify-center font-mono font-bold text-sm">
                    03
                  </div>
                  <h4 className="text-base font-bold text-white">Strict 2.0 km Catchment Radius</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Deliveries never exceed a 2km arterial perimeter. At an average speed of just 20 km/h, a rider reaches any address within 6 to 8 minutes safely.
                  </p>
                  <div className="text-[11px] font-mono text-[#FF9200]">Transit: 6-8 mins max</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Competitive Positioning */}
        {activeTab === 'positioning' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-6 bg-slate-50 border-b border-slate-200">
                <span className="text-xs font-mono font-bold text-[#FF9200] uppercase">Strategic Market Framework</span>
                <h3 className="text-xl font-bold text-[#101C27] mt-0.5">
                  Strategic Matrix: KLICKIT vs Traditional Grocery Formats
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 uppercase font-mono tracking-wider border-b border-slate-200">
                      <th className="p-4">Key Dimension</th>
                      <th className="p-4 text-[#FF9200] font-bold bg-[#FFF4E5]/50">KLICKIT (Quick-Commerce)</th>
                      <th className="p-4">Traditional Supermarket</th>
                      <th className="p-4">Scheduled E-Commerce</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {positioningComparison.map((row, idx) => (
                      <tr key={idx} className={row.highlight ? 'bg-orange-50/20' : ''}>
                        <td className="p-4 font-bold text-slate-900 whitespace-nowrap">
                          {row.feature}
                        </td>
                        <td className="p-4 font-semibold text-[#101C27] bg-[#FFF4E5]/30">
                          {row.klickit}
                        </td>
                        <td className="p-4 text-slate-600">
                          {row.supermarket}
                        </td>
                        <td className="p-4 text-slate-600">
                          {row.scheduledEcom}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
