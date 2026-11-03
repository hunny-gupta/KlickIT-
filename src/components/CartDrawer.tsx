import React, { useState } from 'react';
import { 
  X, Plus, Minus, ShoppingCart, ArrowRight, 
  Tag, ShieldCheck, Bike, Sparkles, MapPin, Check, ChevronRight, ShoppingBag 
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onClearCart: () => void;
  onOrderPlaced: (orderId: string, items: CartItem[], total: number) => void;
  selectedLocation: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onClearCart,
  onOrderPlaced,
  selectedLocation,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [riderTip, setRiderTip] = useState(20);
  const [isPlacing, setIsPlacing] = useState(false);

  if (!isOpen) return null;

  const itemsTotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Free delivery threshold: ₹199
  const freeDeliveryThreshold = 199;
  const isFreeDelivery = itemsTotal >= freeDeliveryThreshold || appliedCoupon?.code === 'FIRSTKLICK';
  const deliveryFee = isFreeDelivery ? 0 : 25;
  const handlingFee = 2;
  
  // Coupon calculation
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.code === 'KLICK100') {
      discountAmount = Math.min(100, itemsTotal);
    } else if (appliedCoupon.code === 'KLICK20') {
      discountAmount = Math.round(itemsTotal * 0.20);
    } else if (appliedCoupon.code === 'FIRSTKLICK') {
      discountAmount = 25;
    }
  }

  const finalTotal = Math.max(0, itemsTotal + deliveryFee + handlingFee + riderTip - discountAmount);
  const amountToFreeDelivery = Math.max(0, freeDeliveryThreshold - itemsTotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'KLICK100') {
      if (itemsTotal < 250) {
        setCouponError('KLICK100 requires minimum cart of ₹250');
        return;
      }
      setAppliedCoupon({ code: 'KLICK100', discount: 100 });
      setCouponCode('');
    } else if (code === 'KLICK20') {
      setAppliedCoupon({ code: 'KLICK20', discount: Math.round(itemsTotal * 0.20) });
      setCouponCode('');
    } else if (code === 'FIRSTKLICK') {
      setAppliedCoupon({ code: 'FIRSTKLICK', discount: 25 });
      setCouponCode('');
    } else {
      setCouponError('Try KLICK20, KLICK100, or FIRSTKLICK');
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    setIsPlacing(true);
    setTimeout(() => {
      setIsPlacing(false);
      const generatedId = `KL-${Math.floor(1000 + Math.random() * 9000)}`;
      onOrderPlaced(generatedId, [...items], finalTotal);
      onClearCart();
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#F4F6FB] text-[#101C27] shadow-2xl flex flex-col">
          
          {/* Top Express Cart Header */}
          <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-[#101C27]">My Cart</h2>
              {totalItemsCount > 0 && (
                <span className="text-xs text-slate-500 font-mono font-medium">
                  ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery In 10 Minutes Bar */}
          <div className="p-3 bg-white border-b border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#0c831f] flex items-center justify-center font-bold">
                ⚡
              </div>
              <div>
                <div className="font-extrabold text-[#101C27] leading-none">
                  Delivery in 10 minutes
                </div>
                <div className="text-[11px] text-slate-500 truncate max-w-[200px] mt-0.5">
                  Shipment of {totalItemsCount} items to <strong className="text-slate-800">{selectedLocation}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Free Delivery Meter */}
          {items.length > 0 && (
            <div className="px-4 py-2.5 bg-[#ECFDF5] border-b border-emerald-100 text-xs text-emerald-900">
              {amountToFreeDelivery > 0 ? (
                <div>
                  <div className="flex justify-between font-medium mb-1">
                    <span>Add <strong>₹{amountToFreeDelivery}</strong> more for <strong>FREE Delivery</strong></span>
                    <span className="font-mono font-bold text-[#0c831f]">₹{itemsTotal}/₹{freeDeliveryThreshold}</span>
                  </div>
                  <div className="w-full bg-emerald-200 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#0c831f] h-full rounded-full transition-all"
                      style={{ width: `${Math.min(100, (itemsTotal / freeDeliveryThreshold) * 100)}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 font-bold text-[#0c831f]">
                  <Check className="w-4 h-4" />
                  <span>You unlocked <strong>FREE 10-Minute Delivery</strong></span>
                </div>
              )}
            </div>
          )}

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 space-y-3 my-6">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 stroke-current" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">You don't have any items in your cart</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Your favourite milk, bread, chips, and groceries are waiting in our 10-minute dark store!
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-6 py-2.5 rounded-xl bg-[#0c831f] text-white text-xs font-extrabold uppercase tracking-wider hover:bg-[#096a18] transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Product List Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-3 divide-y divide-slate-100 shadow-2xs">
                  {items.map((item) => (
                    <div 
                      key={item.product.id}
                      className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-xl p-1 flex items-center justify-center bg-[#F8FAFC] border border-slate-200 overflow-hidden shrink-0 shadow-2xs">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `
                                  <svg class="w-6 h-6 text-slate-400 stroke-current" fill="none" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                                  </svg>
                                `;
                              }
                            }}
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-[#101C27] truncate max-w-[170px]">
                            {item.product.name}
                          </h4>
                          <div className="text-[11px] text-slate-500 font-medium">
                            {item.product.weight}
                          </div>
                          <div className="text-xs font-mono font-extrabold text-[#101C27] mt-0.5">
                            ₹{item.product.price}
                          </div>
                        </div>
                      </div>

                      {/* Quantity Modifier */}
                      <div className="flex items-center bg-[#0c831f] text-white rounded-xl overflow-hidden shadow-2xs">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="px-2 py-1 hover:bg-[#096a18] transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-mono font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="px-2 py-1 hover:bg-[#096a18] transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#0c831f]" />
                      Coupons & Offers
                    </span>
                    <span className="text-[10px] text-[#0c831f] font-mono font-bold">Use: KLICK20</span>
                  </div>

                  {appliedCoupon ? (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800 font-bold">
                      <span>Applied: {appliedCoupon.code} (-₹{discountAmount})</span>
                      <button 
                        onClick={() => setAppliedCoupon(null)}
                        className="text-emerald-700 hover:underline text-[11px]"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code (e.g. KLICK20)..."
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs uppercase font-mono tracking-wider focus:outline-none focus:border-[#0c831f]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#101C27] hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {couponError && (
                    <p className="text-[11px] text-red-500 mt-1 font-medium">{couponError}</p>
                  )}
                </div>

                {/* Tip The Rider */}
                <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Bike className="w-3.5 h-3.5 text-[#FF9200]" />
                      Tip your delivery partner
                    </span>
                    <span className="text-[10px] text-slate-400">100% to partner</span>
                  </div>
                  <div className="flex gap-2">
                    {[0, 10, 20, 30].map((tip) => (
                      <button
                        key={tip}
                        onClick={() => setRiderTip(tip)}
                        className={`flex-1 py-1.5 rounded-xl border text-xs font-mono font-bold transition-colors ${
                          riderTip === tip
                            ? 'bg-[#0c831f] text-white border-[#0c831f]'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {tip === 0 ? 'No tip' : `₹${tip}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Itemized Bill Details */}
                <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-2 text-xs">
                  <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">
                    Bill details
                  </h3>
                  <div className="flex justify-between text-slate-600">
                    <span>Items total</span>
                    <span className="font-mono text-slate-900">₹{itemsTotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Delivery charge</span>
                    <span className="font-mono">
                      {deliveryFee === 0 ? (
                        <span className="text-[#0c831f] font-bold">FREE</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Handling charge</span>
                    <span className="font-mono text-slate-900">₹{handlingFee}</span>
                  </div>
                  {riderTip > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>Delivery partner tip</span>
                      <span className="font-mono text-slate-900">₹{riderTip}</span>
                    </div>
                  )}
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#0c831f] font-bold">
                      <span>Coupon discount</span>
                      <span className="font-mono">-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-sm text-[#101C27]">
                    <span>Grand total</span>
                    <span className="font-mono text-base">₹{finalTotal}</span>
                  </div>
                </div>

                {/* Cancellation Policy Note */}
                <div className="bg-white rounded-2xl border border-slate-200 p-3 text-[11px] text-slate-500 leading-snug">
                  <strong className="text-slate-800 block mb-0.5">Cancellation Policy</strong>
                  Orders cannot be cancelled once packed by dark-store pickers to maintain sub-10 minute transit times.
                </div>
              </>
            )}
          </div>

          {/* Sticky Bottom Action Bar */}
          {items.length > 0 && (
            <div className="p-4 bg-white border-t border-slate-200 shadow-lg">
              <button
                disabled={isPlacing}
                onClick={handleCheckout}
                className="w-full p-3.5 rounded-2xl bg-[#0c831f] hover:bg-[#096a18] active:scale-98 text-white font-extrabold text-sm flex items-center justify-between transition-all shadow-md"
              >
                <div className="text-left font-mono">
                  <div className="text-base font-extrabold leading-none">₹{finalTotal}</div>
                  <div className="text-[10px] text-emerald-100 font-sans uppercase tracking-wider mt-0.5">
                    TOTAL BILL
                  </div>
                </div>

                <div className="flex items-center gap-1.5 font-sans uppercase tracking-wider text-xs">
                  <span>{isPlacing ? 'Placing Order...' : 'Proceed to Pay'}</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </div>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
