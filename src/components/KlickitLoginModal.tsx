import React, { useState } from 'react';
import { X, Smartphone, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface KlickitLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (phone: string, name: string) => void;
}

export const KlickitLoginModal: React.FC<KlickitLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otp, setOtp] = useState(['1', '2', '3', '4']);
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setStep('otp');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onLoginSuccess(phoneNumber, 'Hunny Gupta');
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Header graphic */}
        <div className="p-6 bg-gradient-to-b from-[#FFF4E5] to-white border-b border-slate-100 relative text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <img 
            src="/assets/aistudio/image_c3cdf8f4.png" 
            alt="KLICKIT" 
            className="h-9 mx-auto object-contain mb-3"
            referrerPolicy="no-referrer"
          />

          <h3 className="text-xl font-black text-[#101C27] tracking-tight">
            India's last minute app
          </h3>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Log in or sign up to track your 10-minute order
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Enter Mobile Number
                </label>
                <div className="flex items-center rounded-xl border border-slate-300 focus-within:border-[#FF9200] overflow-hidden p-1 shadow-2xs">
                  <span className="px-3 text-xs font-bold text-slate-500 border-r border-slate-200">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="Enter 10 digit mobile"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 px-3 py-2 text-sm font-mono text-[#101C27] focus:outline-none"
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={phoneNumber.length < 10}
                className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                  phoneNumber.length === 10
                    ? 'bg-[#FF9200] hover:bg-[#E88300] text-[#101C27] active:scale-95'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>By continuing, you agree to KLICKIT Terms</span>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center">
                <span className="text-xs text-slate-500">
                  Verification code sent to <strong className="text-slate-800">+91 {phoneNumber}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="block mx-auto text-[11px] text-[#FF9200] font-bold mt-0.5 hover:underline"
                >
                  Change number
                </button>
              </div>

              {/* Demo OTP fields */}
              <div className="flex justify-center gap-2 pt-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    readOnly
                    value={digit}
                    className="w-11 h-12 text-center text-lg font-mono font-bold border-2 border-[#FF9200] rounded-xl bg-orange-50/50 text-[#101C27]"
                  />
                ))}
              </div>
              <p className="text-[10px] text-center text-slate-400">
                (Demo Auto-Filled Code: 1234)
              </p>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-3 rounded-xl bg-[#FF9200] hover:bg-[#E88300] text-[#101C27] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
              >
                {isVerifying ? (
                  <span>Verifying...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Submit & Login</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
