import React, { useState } from 'react';
import { 
  Mail, MessageSquare, ChevronDown, ChevronUp, 
  Send, CheckCircle2, HelpCircle, Phone, MapPin 
} from 'lucide-react';
import { FAQS } from '../data/mockData';

export const ContactSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'partnerships',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="contact" className="py-20 bg-[#F8FAFC] text-[#101C27] border-b border-slate-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Interactive Contact Form */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF4E5] border border-[#FF9200]/30 text-xs font-bold text-[#FF9200] mb-3">
                <Mail className="w-3.5 h-3.5" />
                <span>CONNECT WITH KLICKIT</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101C27] tracking-tight">
                Get In Touch With Our Team
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                Whether you are exploring brand placement, interested in dark-store supplier onboarding, or want to share feedback on our 10-minute delivery service.
              </p>
            </div>

            {formSubmitted ? (
              <div className="bg-white rounded-3xl p-8 border border-emerald-200 text-center shadow-xs space-y-4 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out regarding <strong className="text-slate-900">{formData.inquiryType}</strong>. Our operations team will respond to <strong className="text-slate-900">{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', email: '', inquiryType: 'partnerships', message: '' });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#101C27] text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma or Rahul Verma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#FF9200]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#FF9200]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Inquiry Purpose</label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:border-[#FF9200]"
                    >
                      <option value="partnerships">FMCG Brand Placement &amp; BTL</option>
                      <option value="vendor">Dark Store Supplier Onboarding</option>
                      <option value="feedback">Product &amp; Storefront Feedback</option>
                      <option value="general">Customer Service &amp; General Query</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Message or Feedback</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us how we can serve you better with KLICKIT..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#FF9200]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#FF9200] hover:bg-[#E88300] text-[#101C27] font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to KLICKIT Team</span>
                </button>
              </form>
            )}

            {/* Quick Contact Info Badges */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-mono">Brand &amp; Vendor Relations</span>
                <span className="font-bold text-slate-800">partnerships@klickit.in</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-mono">Headquarters</span>
                <span className="font-bold text-slate-800">Koramangala 4th Block, Bengaluru</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive FAQ Accordion */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-xs font-bold text-slate-800 mb-3">
                <HelpCircle className="w-3.5 h-3.5 text-[#FF9200]" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101C27] tracking-tight">
                Quick-Commerce Explained
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                Everything you need to know about our sub-10 minute dark store network, cold-chain freshness, and zero minimum order policy.
              </p>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-150"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-bold text-xs sm:text-sm text-[#101C27] flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#FF9200]" />
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
