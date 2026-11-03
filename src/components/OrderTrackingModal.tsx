import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, Bike, MapPin, X, ShieldAlert, Sparkles, PhoneCall } from 'lucide-react';
import { CartItem } from '../types';

interface OrderTrackingModalProps {
  orderId: string;
  items: CartItem[];
  totalAmount: number;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  orderId,
  items,
  totalAmount,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [etaSeconds, setEtaSeconds] = useState(580); // ~9m 40s

  useEffect(() => {
    const t1 = setTimeout(() => setCurrentStep(2), 2000);
    const t2 = setTimeout(() => setCurrentStep(3), 5000);
    const t3 = setTimeout(() => setCurrentStep(4), 8500);

    const timer = setInterval(() => {
      setEtaSeconds((prev) => (prev > 5 ? prev - 1 : 5));
    }, 1000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(timer);
    };
  }, []);

  const formatEta = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-[#101C27] text-white border border-[#1D3043] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 bg-[#152433] border-b border-[#1D3043] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono font-bold text-[#FF9200] uppercase tracking-wider">
                Live Dark-Store Dispatch
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Order #{orderId} Confirmed
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-[#1D3043] text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big ETA Callout */}
        <div className="p-6 bg-gradient-to-b from-[#152433]/70 to-[#101C27] text-center border-b border-[#1D3043]">
          <div className="text-xs text-slate-400 uppercase tracking-widest font-mono">
            Estimated Delivery Time
          </div>
          <div className="text-4xl sm:text-5xl font-extrabold text-[#FF9200] font-mono tabular-nums mt-1">
            {formatEta(etaSeconds)} <span className="text-xl text-white">mins</span>
          </div>
          <p className="text-xs text-slate-300 mt-2">
            Dispatched from <strong className="text-white">KLICKIT Micro-Warehouse #BLR-04</strong> (1.4 km away)
          </p>

          {/* Live simulation banner */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-3 rounded-full bg-[#FF9200]/15 border border-[#FF9200]/30 text-[11px] text-[#FFA834]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KLICKIT Express Live Order Dispatch & Tracking</span>
          </div>
        </div>

        {/* Timeline Stages */}
        <div className="p-6 space-y-4">
          <div className="space-y-4">
            
            {/* Step 1 */}
            <div className="flex items-start gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                currentStep >= 1 ? 'bg-emerald-500 text-[#101C27]' : 'bg-[#1D3043] text-slate-500'
              }`}>
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">Order Placed & Algorithm Assigned</span>
                  <span className="text-[11px] text-slate-400 font-mono">00:02</span>
                </div>
                <p className="text-xs text-slate-400">Inventory reserved in cold-chain pod</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                currentStep >= 2 ? 'bg-emerald-500 text-[#101C27]' : 'bg-[#1D3043] text-slate-500'
              }`}>
                {currentStep >= 2 ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-bold ${currentStep >= 2 ? 'text-white' : 'text-slate-500'}`}>
                    Dark Store Picker Routed (68s)
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">01:10</span>
                </div>
                <p className="text-xs text-slate-400">Barcode scanned & eco-bagged</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                currentStep >= 3 ? 'bg-emerald-500 text-[#101C27]' : 'bg-[#1D3043] text-slate-500'
              }`}>
                {currentStep >= 3 ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-bold ${currentStep >= 3 ? 'text-white' : 'text-slate-500'}`}>
                    Handed to Rider Imran K.
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">02:30</span>
                </div>
                <p className="text-xs text-slate-400">Thermal insulated carrier bag verified</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                currentStep >= 4 ? 'bg-[#FF9200] text-[#101C27]' : 'bg-[#1D3043] text-slate-500'
              }`}>
                <Bike className="w-4 h-4 animate-bounce" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-bold ${currentStep >= 4 ? 'text-[#FF9200]' : 'text-slate-500'}`}>
                    On Route to Your Doorstep
                  </span>
                  <span className="text-[11px] font-mono text-[#FF9200]">In Transit</span>
                </div>
                <p className="text-xs text-slate-400">Short 1.4km arterial path within safe 25km/h speed limits</p>
              </div>
            </div>

          </div>

          {/* Order Summary Drawer in Modal */}
          <div className="pt-4 border-t border-[#1D3043]">
            <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-between">
              <span>Items in this bag ({items.reduce((s, i) => s + i.quantity, 0)})</span>
              <span className="font-mono text-white">Paid ₹{totalAmount}</span>
            </div>
            <div className="max-h-24 overflow-y-auto space-y-1 pr-1 text-xs text-slate-300">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center">
                  <span className="truncate max-w-[240px]">
                    {item.quantity}x {item.product.name}
                  </span>
                  <span className="font-mono text-slate-400">
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#FF9200] hover:bg-[#E88300] text-[#101C27] font-bold text-sm transition-colors mt-2"
          >
            Back to KLICKIT Showcase
          </button>
        </div>

      </div>
    </div>
  );
};
