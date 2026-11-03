import React, { useState } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Star, 
  AlertCircle,
  Building,
  Lock,
  Headphones,
  Award
} from 'lucide-react';

interface CeoSuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessToast?: (msg: string) => void;
}

export const CeoSuggestionModal: React.FC<CeoSuggestionModalProps> = ({
  isOpen,
  onClose,
  onSuccessToast,
}) => {
  const [topic, setTopic] = useState<string>('Delivery Speed & 10-Min Promise');
  const [sentiment, setSentiment] = useState<number>(5);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [orderOrDarkStore, setOrderOrDarkStore] = useState('');
  const [message, setMessage] = useState('');
  const [requestCallback, setRequestCallback] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<{ id: string; time: string } | null>(null);

  if (!isOpen) return null;

  const topics = [
    { id: 'Delivery Speed & 10-Min Promise', label: '⚡ 10-Min Delivery & Rider Experience' },
    { id: 'Missing Dark Store Item', label: '🏪 Catalog & Missing Product Request' },
    { id: 'App Experience & UI', label: '📱 App Usability & Checkout Flow' },
    { id: 'Pricing & Promotional Offers', label: '💰 Pricing, Discounts & Billing' },
    { id: 'Brand & Growth Suggestion', label: '🚀 Brand Innovation & Feature Suggestion' },
    { id: 'Customer Care Escalation', label: '🚨 Critical Issue / Escalated Complaint' },
  ];

  const sentimentLabels = [
    { stars: 5, label: '🤩 Exceptional', color: 'text-emerald-500' },
    { stars: 4, label: '😊 Very Good', color: 'text-emerald-600' },
    { stars: 3, label: '😐 Neutral / Scope for Growth', color: 'text-amber-500' },
    { stars: 2, label: '🙁 Needs Improvement', color: 'text-orange-500' },
    { stars: 1, label: '😡 Critical Escalation', color: 'text-red-500' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const ticketId = `CEO-KLCK-${Math.floor(1000 + Math.random() * 9000)}`;
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setSubmittedTicket({ id: ticketId, time: timeStr });
      setIsSubmitting(false);

      if (onSuccessToast) {
        onSuccessToast(`Escalated to Founder & CEO's desk (Ref #${ticketId})`);
      }
    }, 900);
  };

  const handleReset = () => {
    setSubmittedTicket(null);
    setMessage('');
    setName('');
    setPhone('');
    setEmail('');
    setOrderOrDarkStore('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 relative flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Executive Desk with Verified Founder Credential */}
        <div className="bg-[#101C27] text-white p-5 sm:p-6 relative overflow-hidden shrink-0 border-b-4 border-[#FF9200]">
          {/* Subtle Orange Glow Backdrop */}
          <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[#FF9200]/20 blur-3xl pointer-events-none" />
          
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF9200] via-amber-400 to-amber-200 p-0.5 shadow-lg flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                    alt="Aarav Sharma, Founder & CEO of KLICKIT"
                    className="w-full h-full object-cover rounded-[14px]"
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#101C27] rounded-full" title="Online & Direct" />
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF9200]/20 border border-[#FF9200]/50 text-[#FF9200] text-[10px] font-mono font-black uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3 text-[#FF9200]" />
                  Direct Founder Desk · Guaranteed 2-Hour SLA
                </div>
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight mt-1 flex items-center gap-2">
                  <span>Message Direct to CEO</span>
                  <span className="text-[10px] bg-white/10 text-slate-300 font-mono font-normal px-2 py-0.5 rounded">
                    ceo@klickit.in
                  </span>
                </h2>
                <p className="text-[11px] text-slate-300 leading-snug mt-0.5">
                  Office of <strong>Aarav Sharma</strong>, Founder & CEO · KLICKIT Quick Commerce
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* KLICKIT Founder's Desk Welcome Note */}
          <div className="mt-4 p-3 rounded-2xl bg-white/5 border border-white/10 text-[11px] text-slate-200 italic flex items-start gap-2.5">
            <span className="text-[#FF9200] text-base leading-none font-serif select-none">“</span>
            <p className="not-italic leading-relaxed text-slate-300">
              Your voice builds KLICKIT. This channel directly bypasses customer support layers and lands straight in my executive inbox. Every suggestion and issue receives my personal attention.
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {submittedTicket ? (
            /* Submission Success State */
            <div className="py-6 text-center space-y-4 animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-[#0c831f] flex items-center justify-center mx-auto shadow-inner text-3xl">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-bold">
                  DIRECT ESCALATION #{submittedTicket.id}
                </span>
                <h3 className="text-xl font-black text-[#101C27] mt-3">
                  Delivered Directly to the CEO's Desk!
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto leading-relaxed">
                  Your feedback has been logged in the Executive Red-Line register. A confirmation has also been dispatched to the founder's mobile dashboard.
                </p>
              </div>

              {/* Status Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2.5 max-w-sm mx-auto">
                <div className="flex justify-between text-slate-600">
                  <span className="font-medium">Subject Category:</span>
                  <span className="font-bold text-[#101C27] truncate max-w-[180px]">{topic}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="font-medium">Logged Timestamp:</span>
                  <span className="font-mono text-slate-800">{submittedTicket.time}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="font-medium">Target SLA Review:</span>
                  <span className="font-bold text-[#0c831f] bg-emerald-50 px-2 py-0.5 rounded">Within 2 Hours</span>
                </div>
                <div className="flex justify-between text-slate-600 border-t border-slate-200 pt-2">
                  <span className="font-medium">Direct Executive Email:</span>
                  <span className="font-mono font-bold text-[#101C27]">ceo@klickit.in</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors"
                >
                  Send Another Message
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-[#0c831f] text-white text-xs font-black uppercase tracking-wider hover:bg-[#096a18] shadow-md transition-all"
                >
                  Return to Shopping
                </button>
              </div>
            </div>
          ) : (
            /* Suggestion Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Experience Pulse / Star Rating */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#101C27] uppercase tracking-wider">
                    How was your experience with KLICKIT today?
                  </span>
                  <span className={`text-xs font-bold ${sentimentLabels.find(s => s.stars === sentiment)?.color}`}>
                    {sentimentLabels.find(s => s.stars === sentiment)?.label}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-1 max-w-xs">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setSentiment(star)}
                      className={`p-2 rounded-xl transition-all ${
                        sentiment >= star 
                          ? 'text-[#FF9200] scale-110' 
                          : 'text-slate-300 hover:text-slate-400'
                      }`}
                    >
                      <Star className={`w-6 h-6 ${sentiment >= star ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic Selector */}
              <div>
                <label className="block text-xs font-bold text-[#101C27] mb-2 uppercase tracking-wider">
                  Select Topic for the CEO *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {topics.map((t) => {
                    const isSelected = topic === t.id;
                    return (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => setTopic(t.id)}
                        className={`p-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between border ${
                          isSelected
                            ? 'bg-amber-50/90 border-[#FF9200] text-[#101C27] font-bold shadow-2xs ring-1 ring-[#FF9200]'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <span className="truncate">{t.label}</span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#FF9200] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message Box */}
              <div>
                <label className="block text-xs font-bold text-[#101C27] mb-1.5 uppercase tracking-wider flex justify-between">
                  <span>Your Direct Suggestion / Grievance *</span>
                  <span className="text-[11px] text-[#FF9200] font-mono font-bold">Confidential</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Dear Aarav, I would like to suggest adding organic cold-pressed oils to the Koramangala dark store. Also, delivery in 8 mins was amazing!..."
                  className="w-full text-xs p-3.5 rounded-2xl border border-slate-200 focus:border-[#FF9200] focus:ring-2 focus:ring-[#FF9200]/20 focus:outline-none placeholder:text-slate-400 resize-none leading-relaxed"
                />
              </div>

              {/* User details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#101C27] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priyanshu Mehta"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#FF9200] focus:ring-1 focus:ring-[#FF9200] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#101C27] mb-1">
                    Mobile Number * (For Direct WhatsApp / Call)
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-slate-600 text-xs font-mono font-bold">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98765 43210"
                      className="w-full text-xs px-3 py-2.5 rounded-r-xl border border-slate-200 focus:border-[#FF9200] focus:ring-1 focus:ring-[#FF9200] focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Email & Dark Store Reference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#101C27] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#FF9200] focus:ring-1 focus:ring-[#FF9200] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#101C27] mb-1">
                    Dark Store / Order ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={orderOrDarkStore}
                    onChange={(e) => setOrderOrDarkStore(e.target.value)}
                    placeholder="e.g. BLR-KORAMANGALA or #ORD-8402"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#FF9200] focus:ring-1 focus:ring-[#FF9200] focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Executive Callback Checkbox */}
              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer text-xs select-none">
                <input
                  type="checkbox"
                  checked={requestCallback}
                  onChange={(e) => setRequestCallback(e.target.checked)}
                  className="rounded text-[#0c831f] focus:ring-[#0c831f] w-4 h-4"
                />
                <span className="text-slate-700 font-medium">
                  I would like a direct response or status update from the Founder's office via WhatsApp/SMS
                </span>
              </label>

              {/* Confidentiality & Direct Line Guarantee */}
              <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#FF9200] shrink-0" />
                  <span className="text-amber-950 font-medium">
                    Strictly Confidential: Bypasses standard L1 support directly to CEO.
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded">
                  RED LINE
                </span>
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !message.trim()}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#FF9200] hover:bg-[#e08000] active:scale-98 text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting to CEO Desk...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Dispatch Direct to CEO's Desk</span>
                    </>
                  )}
                </button>
                <div className="text-center mt-2.5">
                  <span className="text-[11px] text-slate-400">
                    KLICKIT Technologies · Executive Leadership Desk (ceo@klickit.in)
                  </span>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
