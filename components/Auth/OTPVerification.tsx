
import React, { useState, useRef, useEffect } from 'react';
import { Fingerprint, RefreshCcw, ArrowLeft } from 'lucide-react';

interface OTPProps {
  email: string;
  onVerified: () => void;
  onBack: () => void;
}

const OTPVerification: React.FC<OTPProps> = ({ email, onVerified, onBack }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.value !== "" && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (otp.every(v => v !== '')) {
        setTimeout(onVerified, 600);
    }
  }, [otp]);

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <button onClick={onBack} className="absolute top-0 left-0 p-2 text-white/30 hover:text-white transition-all">
        <ArrowLeft size={20} />
      </button>

      <div className="text-center mb-10 mt-2">
        <div className="w-16 h-16 glass-card flex items-center justify-center mx-auto mb-6 relative group overflow-hidden">
           <div className="absolute inset-0 bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-all"></div>
           <Fingerprint className="w-8 h-8 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-white font-poppins">Validation</h2>
        <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">
           Enter Cryptographic Sequence
        </p>
      </div>
      
      <div className="flex justify-center gap-3 mb-10">
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            className="w-12 h-16 glass-input text-center text-xl font-bold text-emerald-400"
            value={data}
            onChange={e => handleChange(e.target, index)}
            onKeyDown={e => handleKeyDown(e, index)}
            onFocus={e => e.target.select()}
            // Fix: ref callback must return void or a cleanup function. 
            // The assignment expression returns the value being assigned, so we wrap it in braces.
            ref={el => { inputs.current[index] = el; }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center gap-6">
        <button 
          onClick={() => setTimeLeft(60)}
          className="flex items-center gap-2 text-[10px] font-bold text-white/20 hover:text-white transition-colors uppercase tracking-[0.2em]"
        >
          <RefreshCcw size={14} className={timeLeft === 0 ? 'animate-spin' : ''} />
          Resync Sequence ({timeLeft}s)
        </button>

        <div className="w-full p-4 glass-card bg-white/5 border-white/10 flex items-center gap-4">
            <p className="text-[10px] font-bold text-white/20 text-center w-full uppercase tracking-widest">
                Terminal Auth Pending...
            </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
