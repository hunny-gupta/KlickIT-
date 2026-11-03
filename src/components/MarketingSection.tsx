import React, { useState } from 'react';
import { 
  Tv, MapPin, Smartphone, Megaphone, Target, 
  BarChart3, Sparkles, Bell, CheckCircle2, Share2, 
  Layers, ArrowUpRight, Award, MessageSquare 
} from 'lucide-react';
import { CAMPAIGNS, MARKETING_FRAMEWORK } from '../data/mockData';

export const MarketingSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'ATL' | 'BTL' | 'Digital' | '4Ps'>('all');
  const [activeNotificationPreset, setActiveNotificationPreset] = useState<'rain' | 'midnight' | 'breakfast' | 'cricket'>('rain');
  const [selectedBillboard, setSelectedBillboard] = useState(0);

  const billboards = [
    {
      city: 'Bengaluru (Silk Board Flyover)',
      headline: 'Stuck in 45-minute traffic? Your milk & butter already reached your home.',
      cta: 'KLICKIT · 10 Min Delivery',
      visual: 'City highway gridlock vs smiling customer opening door'
    },
    {
      city: 'Gurugram (Cyber City Metro)',
      headline: 'Client pushed the meeting to 9 PM? Your midnight coffee is 9 minutes away.',
      cta: 'You need it. We KLICKIT.',
      visual: 'Laptop glow with chilled cold brew bottle'
    },
    {
      city: 'Mumbai (Western Express Highway)',
      headline: 'Forgot the coriander? Do not risk your mother’s wrath. KLICKIT it.',
      cta: 'Fresh farm coriander in 11 mins',
      visual: 'Bunch of fresh coriander flying in speed cart'
    }
  ];

  const pushNotifications = {
    rain: {
      time: '5:45 PM · Rainy Weather Trigger',
      title: '🌧️ Monsoon Alert in Koramangala!',
      body: 'Hot chai + crispy peri-peri noodles? Delivered to your balcony in 11 minutes flat.',
      ctr: '32.4% Open Rate',
      conversion: '21.8% Cart Conversion'
    },
    midnight: {
      time: '1:15 AM · Dorm & Late-Night Trigger',
      title: '🍫 Cramming for that tomorrow submission?',
      body: 'Dark chocolate, cold brew, and kettle chips ready at your hostel gate in 8 mins.',
      ctr: '29.1% Open Rate',
      conversion: '24.5% Cart Conversion'
    },
    breakfast: {
      time: '7:00 AM · Morning Routine Trigger',
      title: '🍞 Fresh Sourdough & A2 Milk are here!',
      body: 'Skip the morning grocery dash. Breakfast essentials at your door before you brew coffee.',
      ctr: '26.8% Open Rate',
      conversion: '18.2% Cart Conversion'
    },
    cricket: {
      time: '9:30 PM · Match Day Surge Trigger',
      title: '🏏 Final Over Thriller!',
      body: 'Ran out of ice & cold drinks? Don’t miss a single ball. KLICKIT in 9 minutes.',
      ctr: '34.7% Open Rate',
      conversion: '28.0% Cart Conversion'
    }
  };

  const filteredCampaigns = activeCategory === 'all' 
    ? CAMPAIGNS 
    : CAMPAIGNS.filter(c => c.type === activeCategory);

  return (
    <section id="marketing" className="py-20 bg-[#101C27] text-white border-b border-[#1D3043] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#152433] border border-[#1D3043] text-xs font-bold text-[#FF9200] mb-3">
              <Megaphone className="w-3.5 h-3.5" />
              <span>KLICKIT BRAND & GROWTH</span>
              <span aria-hidden="true">·</span>
              <span>Omnichannel Strategic Deck</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Marketing & Campaign Architecture
            </h2>
            <p className="text-slate-300 text-sm mt-2 max-w-2xl leading-relaxed">
              Strategic Above-The-Line (ATL), Below-The-Line (BTL), hyper-local digital growth loops, and 4Ps positioning model engineered to achieve dominant brand recall and sustainable unit economics.
            </p>
          </div>

          {/* Interactive Navigation Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-[#152433] rounded-2xl border border-[#1D3043] self-start md:self-auto overflow-x-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                activeCategory === 'all'
                  ? 'bg-[#FF9200] text-[#101C27]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              All Strategies
            </button>
            <button
              onClick={() => setActiveCategory('ATL')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                activeCategory === 'ATL'
                  ? 'bg-[#FF9200] text-[#101C27]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              ATL (TV & OOH)
            </button>
            <button
              onClick={() => setActiveCategory('BTL')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                activeCategory === 'BTL'
                  ? 'bg-[#FF9200] text-[#101C27]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              BTL (Societies & Dorms)
            </button>
            <button
              onClick={() => setActiveCategory('Digital')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                activeCategory === 'Digital'
                  ? 'bg-[#FF9200] text-[#101C27]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Digital Growth
            </button>
            <button
              onClick={() => setActiveCategory('4Ps')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                activeCategory === '4Ps'
                  ? 'bg-[#FF9200] text-[#101C27]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              4Ps & STP Model
            </button>
          </div>
        </div>

        {/* 4Ps & STP Model Display */}
        {activeCategory === '4Ps' ? (
          <div className="space-y-10 animate-in fade-in duration-200">
            {/* STP Matrix */}
            <div className="bg-[#152433] rounded-3xl p-8 border border-[#1D3043] space-y-6">
              <div>
                <span className="text-xs font-mono text-[#FF9200] font-bold tracking-wider uppercase">Strategic Framework</span>
                <h3 className="text-2xl font-bold text-white mt-1">Segmentation, Targeting & Positioning (STP)</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {MARKETING_FRAMEWORK.stp.segmentation.map((seg) => (
                  <div key={seg.title} className="p-5 rounded-2xl bg-[#101C27] border border-[#1D3043] space-y-2">
                    <span className="text-xs font-bold text-[#FF9200]">{seg.title} Segmentation</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{seg.desc}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#1D3043]">
                <div className="p-5 rounded-2xl bg-[#101C27] border border-[#1D3043]">
                  <span className="text-xs font-bold text-slate-400 block mb-1">Target Market Rationale</span>
                  <p className="text-xs text-slate-200 leading-relaxed">{MARKETING_FRAMEWORK.stp.targeting}</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#101C27] border border-[#1D3043]">
                  <span className="text-xs font-bold text-[#FF9200] block mb-1">Positioning Statement</span>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">{MARKETING_FRAMEWORK.stp.positioning}</p>
                </div>
              </div>
            </div>

            {/* 4Ps Matrix */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">The 4Ps of Quick Commerce</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {MARKETING_FRAMEWORK.fourPs.map((item) => (
                  <div key={item.p} className="p-6 rounded-2xl bg-[#152433] border border-[#1D3043] space-y-3">
                    <div className="w-9 h-9 rounded-xl bg-[#FF9200]/20 text-[#FF9200] flex items-center justify-center font-bold text-sm">
                      {item.p.charAt(0)}
                    </div>
                    <h4 className="text-base font-bold text-white">{item.p}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-14">
            
            {/* Interactive Campaign Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns.map((camp) => (
                <div
                  key={camp.id}
                  className="bg-[#152433] rounded-3xl border border-[#1D3043] hover:border-slate-500 transition-all duration-200 p-6 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    {/* Header badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-[#FF9200] bg-[#FF9200]/15 px-2.5 py-1 rounded-lg">
                        {camp.type} STRATEGY
                      </span>
                      <span className="text-xs text-slate-400 font-mono">Campaign #{camp.id}</span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white leading-tight">
                        {camp.title}
                      </h3>
                      <p className="text-xs text-[#FFA834] font-medium mt-1">
                        {camp.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {camp.concept}
                    </p>

                    {/* Target Audience */}
                    <div className="p-3 rounded-xl bg-[#101C27] border border-[#1D3043] space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                        Target Demographic
                      </span>
                      <p className="text-xs text-slate-200">
                        {camp.targetAudience}
                      </p>
                    </div>

                    {/* Channels List */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                        Distribution Channels
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {camp.channels.map((ch, i) => (
                          <span
                            key={i}
                            className="text-[11px] bg-[#101C27] text-slate-300 px-2 py-0.5 rounded-md border border-[#1D3043]"
                          >
                            {ch}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Campaign Metrics & Punchline */}
                  <div className="pt-4 border-t border-[#1D3043] space-y-3">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {camp.metrics.map((m, idx) => (
                        <div key={idx} className="bg-[#101C27] p-2 rounded-xl border border-[#1D3043]">
                          <span className="text-[10px] text-slate-400 block truncate">{m.label}</span>
                          <span className="text-xs font-mono font-bold text-white tabular-nums">{m.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl bg-[#FF9200]/10 border border-[#FF9200]/20 text-xs text-[#FFA834] italic">
                      "{camp.tagline}"
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Creative Lab (Interactive Billboard & Push Simulators) */}
            <div className="bg-[#152433] rounded-3xl p-8 sm:p-10 border border-[#1D3043] space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-mono font-bold text-[#FF9200] uppercase tracking-wider">
                  Interactive Creative Sandbox
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Live Marketing Execution Prototypes
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Preview how KLICKIT's creative copy performs in real life across high-traffic OOH hoardings and time-sensitive mobile push notifications.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                
                {/* Prototype 1: OOH Billboard Simulator */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Megaphone className="w-4 h-4 text-[#FF9200]" />
                      ATL Metro & Flyover Billboard Mockup
                    </span>
                    <div className="flex gap-1">
                      {billboards.map((b, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedBillboard(idx)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                            selectedBillboard === idx
                              ? 'bg-[#FF9200] text-[#101C27]'
                              : 'bg-[#101C27] text-slate-400 hover:text-white'
                          }`}
                        >
                          City #{idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Billboard Graphic Frame */}
                  <div className="relative bg-[#101C27] border-4 border-[#1D3043] rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden min-h-[220px] flex flex-col justify-between">
                    <div className="absolute top-2 right-3 text-[10px] font-mono text-slate-500 uppercase">
                      Location: {billboards[selectedBillboard].city}
                    </div>

                    <div className="mt-4">
                      <div className="text-xl sm:text-2xl font-black text-white leading-tight">
                        “{billboards[selectedBillboard].headline}”
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#1D3043] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img 
                          src="/assets/aistudio/image_c3cdf8f4.png" 
                          alt="KLICKIT" 
                          className="h-7 w-auto object-contain"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-xs font-bold text-[#FF9200]">
                          {billboards[selectedBillboard].cta}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">1440x480 Flyover Hoarding</span>
                    </div>
                  </div>
                </div>

                {/* Prototype 2: Push Notification Simulator */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-[#FF9200]" />
                      Contextual Mobile Push Engine
                    </span>
                    <div className="flex gap-1">
                      {(['rain', 'midnight', 'breakfast', 'cricket'] as const).map((key) => (
                        <button
                          key={key}
                          onClick={() => setActiveNotificationPreset(key)}
                          className={`px-2 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${
                            activeNotificationPreset === key
                              ? 'bg-[#FF9200] text-[#101C27]'
                              : 'bg-[#101C27] text-slate-400 hover:text-white'
                          }`}
                        >
                          {key}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Simulated Mobile Lock-Screen Card */}
                  <div className="bg-[#101C27] border border-[#1D3043] rounded-2xl p-5 shadow-2xl space-y-3">
                    <div className="p-4 rounded-xl bg-[#152433] border border-[#1D3043] shadow-md space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-md bg-[#FF9200] flex items-center justify-center text-[#101C27] text-xs font-extrabold">
                            K
                          </div>
                          <span className="font-bold text-white text-xs">KLICKIT Express</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {pushNotifications[activeNotificationPreset].time}
                        </span>
                      </div>

                      <div className="font-bold text-sm text-white">
                        {pushNotifications[activeNotificationPreset].title}
                      </div>

                      <p className="text-xs text-slate-300 leading-snug">
                        {pushNotifications[activeNotificationPreset].body}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-[#152433] border border-[#1D3043] text-center">
                        <span className="text-[10px] text-slate-400 block">Observed CTR</span>
                        <span className="font-mono font-bold text-emerald-400">
                          {pushNotifications[activeNotificationPreset].ctr}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#152433] border border-[#1D3043] text-center">
                        <span className="text-[10px] text-slate-400 block">Direct Order Conversion</span>
                        <span className="font-mono font-bold text-[#FF9200]">
                          {pushNotifications[activeNotificationPreset].conversion}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
