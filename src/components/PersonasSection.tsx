import React, { useState, useEffect } from 'react';
import { 
  Users, Plus, Edit3, Trash2, Check, RotateCcw, 
  MapPin, Briefcase, ShoppingBag, Heart, Sparkles, 
  X, ChevronRight, Copy, Download 
} from 'lucide-react';
import { Persona } from '../types';
import { INITIAL_PERSONAS } from '../data/mockData';

export const PersonasSection: React.FC = () => {
  const [personas, setPersonas] = useState<Persona[]>(() => {
    try {
      const saved = localStorage.getItem('klickit_personas');
      return saved ? JSON.parse(saved) : INITIAL_PERSONAS;
    } catch {
      return INITIAL_PERSONAS;
    }
  });

  const [activePersona, setActivePersona] = useState<Persona>(personas[0] || INITIAL_PERSONAS[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Persona>>({});
  const [saveToast, setSaveToast] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('klickit_personas', JSON.stringify(personas));
    } catch (e) {
      console.error(e);
    }
  }, [personas]);

  const handleSelectPersona = (p: Persona) => {
    setActivePersona(p);
  };

  const handleStartCreate = () => {
    setEditForm({
      id: `custom-${Date.now()}`,
      name: 'New Consumer Persona',
      title: 'Archetype Label (e.g. The Healthy Meal Prepper)',
      age: 25,
      occupation: 'Professional / Student',
      location: 'Metro City, India',
      avatarSeed: 'User',
      avatarColor: '#FF9200',
      quote: '"Quick quote capturing this user’s convenience needs and daily routine."',
      orderTrigger: 'What unexpected event or daily habit triggers their order?',
      painPoints: ['Slow delivery by other apps', 'High minimum cart value'],
      preferredCategories: ['Fresh Produce', 'Dairy & Bakery'],
      avgBasketSize: '₹350 – ₹600',
      frequency: '3 to 5 times/week',
      digitalHabits: ['Mobile-first user', 'UPI payments']
    });
    setIsEditing(true);
  };

  const handleStartEdit = (p: Persona) => {
    setEditForm({ ...p });
    setIsEditing(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm.name || !editForm.title) return;

    const updated: Persona = {
      id: editForm.id || `custom-${Date.now()}`,
      name: editForm.name || 'Anonymous User',
      title: editForm.title || 'Target Consumer',
      age: Number(editForm.age) || 25,
      occupation: editForm.occupation || 'Professional',
      location: editForm.location || 'Metro City',
      avatarSeed: editForm.name || 'User',
      avatarColor: editForm.avatarColor || '#FF9200',
      quote: editForm.quote || 'Ready for delivery.',
      orderTrigger: editForm.orderTrigger || 'Instant grocery replenishment',
      painPoints: editForm.painPoints || [],
      preferredCategories: editForm.preferredCategories || ['Fresh Produce'],
      avgBasketSize: editForm.avgBasketSize || '₹300 – ₹500',
      frequency: editForm.frequency || '3 times/week',
      digitalHabits: editForm.digitalHabits || ['UPI Payments']
    };

    setPersonas((prev) => {
      const exists = prev.findIndex((p) => p.id === updated.id);
      if (exists >= 0) {
        const next = [...prev];
        next[exists] = updated;
        return next;
      }
      return [...prev, updated];
    });

    setActivePersona(updated);
    setIsEditing(false);
    setSaveToast('Customer persona updated successfully!');
    setTimeout(() => setSaveToast(''), 3000);
  };

  const handleResetDefaults = () => {
    if (confirm('Reset to initial capstone consumer personas?')) {
      setPersonas(INITIAL_PERSONAS);
      setActivePersona(INITIAL_PERSONAS[0]);
      localStorage.removeItem('klickit_personas');
      setSaveToast('Personas reset to baseline');
      setTimeout(() => setSaveToast(''), 3000);
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(personas, null, 2));
    setSaveToast('Persona JSON copied to clipboard!');
    setTimeout(() => setSaveToast(''), 3000);
  };

  return (
    <section id="personas" className="py-20 bg-white text-[#101C27] border-b border-slate-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF4E5] border border-[#FF9200]/30 text-xs font-bold text-[#FF9200] mb-3">
              <Users className="w-3.5 h-3.5" />
              <span>CONSUMER RESEARCH MATRIX</span>
              <span aria-hidden="true">·</span>
              <span>Ready for Project Customization</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#101C27]">
              Consumer Personas & Behavioral Profiles
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-2xl leading-relaxed">
              Mapped to distinct urban quick-commerce segments. You can customize, edit, or add your group’s actual personas directly into this live interactive matrix for your project presentation.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <button
              onClick={handleStartCreate}
              className="px-4 py-2 rounded-xl bg-[#FF9200] hover:bg-[#E88300] text-[#101C27] font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom Persona</span>
            </button>
            <button
              onClick={handleCopyJson}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5"
              title="Copy Persona Data for Report"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={handleResetDefaults}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Reset to default personas"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Save toast */}
        {saveToast && (
          <div className="mb-6 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{saveToast}</span>
          </div>
        )}

        {/* Persona Selector Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {personas.map((p) => {
            const isCurrent = activePersona?.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPersona(p)}
                className={`flex items-center gap-3 p-3 rounded-2xl border transition-all text-left whitespace-nowrap shrink-0 ${
                  isCurrent
                    ? 'border-[#FF9200] bg-[#FFF4E5] shadow-md ring-2 ring-[#FF9200]/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm shrink-0"
                  style={{ backgroundColor: p.avatarColor }}
                >
                  {p.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#101C27] truncate max-w-[140px]">
                    {p.name}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate max-w-[140px]">
                    {p.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Active Persona Spotlight Card */}
        {activePersona && (
          <div className="bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
              
              {/* Left Column: Profile Card */}
              <div className="lg:col-span-4 p-8 bg-white space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-extrabold text-white shadow-md"
                      style={{ backgroundColor: activePersona.avatarColor }}
                    >
                      {activePersona.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#101C27]">
                        {activePersona.name}
                      </h3>
                      <p className="text-xs font-bold text-[#FF9200]">
                        {activePersona.title}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartEdit(activePersona)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                    title="Edit Persona"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>

                {/* Demographics list */}
                <div className="space-y-2 text-xs text-slate-600 border-y border-slate-100 py-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Briefcase className="w-3.5 h-3.5" /> Age & Profession
                    </span>
                    <span className="font-semibold text-slate-800">
                      {activePersona.age} yrs · {activePersona.occupation}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <MapPin className="w-3.5 h-3.5" /> Catchment Zone
                    </span>
                    <span className="font-semibold text-slate-800">
                      {activePersona.location}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <ShoppingBag className="w-3.5 h-3.5" /> Basket Size
                    </span>
                    <span className="font-semibold text-slate-800 font-mono">
                      {activePersona.avgBasketSize}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Sparkles className="w-3.5 h-3.5" /> Order Frequency
                    </span>
                    <span className="font-semibold text-slate-800">
                      {activePersona.frequency}
                    </span>
                  </div>
                </div>

                {/* Verbatim Quote */}
                <div className="p-4 rounded-2xl bg-[#FFF4E5] border border-[#FF9200]/20">
                  <span className="text-[10px] font-mono font-bold text-[#FF9200] uppercase tracking-wider block mb-1">
                    Consumer Voice
                  </span>
                  <p className="text-xs text-[#101C27] italic font-medium leading-relaxed">
                    {activePersona.quote}
                  </p>
                </div>

                {/* Preferred Categories */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Preferred Quick-Commerce Categories
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activePersona.preferredCategories.map((c, i) => (
                      <span
                        key={i}
                        className="text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Deep Behavioral Analysis */}
              <div className="lg:col-span-8 p-8 space-y-6">
                
                {/* Trigger */}
                <div className="space-y-2">
                  <div className="text-xs font-mono font-bold text-[#FF9200] uppercase tracking-wider">
                    Core Consumption Trigger
                  </div>
                  <h4 className="text-base font-bold text-[#101C27]">
                    Why they reach for the KLICKIT app:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-white p-4 rounded-2xl border border-slate-200">
                    {activePersona.orderTrigger}
                  </p>
                </div>

                {/* Friction & Pain Points */}
                <div className="space-y-3">
                  <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Pre-KLICKIT Frictions (Pain Points Solved)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activePersona.painPoints.map((pt, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start gap-2 text-xs text-slate-700"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Digital Habits */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Digital Media & Payment Habits
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activePersona.digitalHabits.map((habit, i) => (
                      <div
                        key={i}
                        className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 font-medium flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{habit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Academic Note */}
                <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>
                    💡 <strong>Customizable Persona Module:</strong> Hit "Add Custom Persona" or click the edit icon to input your group's specific demographic data.
                  </span>
                  <button
                    onClick={() => handleStartEdit(activePersona)}
                    className="text-xs font-bold text-[#FF9200] hover:underline whitespace-nowrap ml-2"
                  >
                    Edit This Persona &rarr;
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>

      {/* Edit / Create Persona Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div>
                <h3 className="text-xl font-bold text-[#101C27]">
                  {editForm.id?.startsWith('custom-') ? 'Add Custom Consumer Persona' : 'Edit Consumer Persona'}
                </h3>
                <p className="text-xs text-slate-500">
                  Refine customer profile insights and shopping behavior patterns.
                </p>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#FF9200]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Archetype Title</label>
                  <input
                    type="text"
                    required
                    value={editForm.title || ''}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#FF9200]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={editForm.age || 25}
                    onChange={(e) => setEditForm({ ...editForm, age: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#FF9200]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Occupation</label>
                  <input
                    type="text"
                    value={editForm.occupation || ''}
                    onChange={(e) => setEditForm({ ...editForm, occupation: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#FF9200]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Catchment / City</label>
                  <input
                    type="text"
                    value={editForm.location || ''}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#FF9200]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Consumer Voice Quote</label>
                <input
                  type="text"
                  value={editForm.quote || ''}
                  onChange={(e) => setEditForm({ ...editForm, quote: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#FF9200]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Order Trigger (The 'Aha' Need)</label>
                <textarea
                  rows={2}
                  value={editForm.orderTrigger || ''}
                  onChange={(e) => setEditForm({ ...editForm, orderTrigger: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#FF9200]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Avg Basket Size (e.g. ₹350 - ₹600)</label>
                  <input
                    type="text"
                    value={editForm.avgBasketSize || ''}
                    onChange={(e) => setEditForm({ ...editForm, avgBasketSize: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#FF9200]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Order Frequency</label>
                  <input
                    type="text"
                    value={editForm.frequency || ''}
                    onChange={(e) => setEditForm({ ...editForm, frequency: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#FF9200]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#FF9200] hover:bg-[#E88300] text-[#101C27] font-bold transition-colors shadow-sm"
                >
                  Save Persona to App
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
