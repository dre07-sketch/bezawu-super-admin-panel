
import React, { useState } from 'react';
import { Key, Eye, Check, CheckCircle2, ShieldCheck } from 'lucide-react';

interface Props {
  onSuccess: () => void;
}

const ResetPassword: React.FC<Props> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const validation = {
    length: password.length >= 8,
    number: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  };

  const isComplete = Object.values(validation).every(Boolean);

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center mb-10 mt-2">
        <div className="w-16 h-16 glass-card flex items-center justify-center mx-auto mb-6 relative group overflow-hidden">
           <div className="absolute inset-0 bg-purple-500/10 group-hover:bg-purple-500/20 transition-all"></div>
           <Key className="w-8 h-8 text-purple-400" />
        </div>
        <h2 className="text-2xl font-bold text-white font-poppins">Key Rotation</h2>
        <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">
           Update Terminal Access Credentials
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <label className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3 ml-1">New Security Hash</label>
          <div className="relative">
            <input 
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-6 pr-14 py-4 glass-input text-sm font-medium"
              placeholder="Min 8 characters"
            />
            <button 
              type="button" 
              onClick={() => setShow(!show)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
            >
              <Eye size={18} />
            </button>
          </div>
        </div>

        <div className="space-y-3 px-2">
          <ValidationRule label="8+ Bits of Entropy" active={validation.length} />
          <ValidationRule label="Numeric Inclusion" active={validation.number} />
          <ValidationRule label="Special Symbol Logic" active={validation.symbol} />
        </div>

        <button 
          onClick={onSuccess}
          disabled={!isComplete}
          className={`
            w-full py-4 btn-primary text-xs font-bold tracking-[0.2em] uppercase transition-all
            ${!isComplete ? 'opacity-30 grayscale cursor-not-allowed' : ''}
          `}
        >
          <ShieldCheck size={20} /> Commit Credentials
        </button>
      </div>
    </div>
  );
};

const ValidationRule = ({ label, active }: { label: string; active: boolean }) => (
  <div className="flex items-center gap-3">
    <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${active ? 'bg-emerald-500/20 text-emerald-400 scale-110' : 'bg-white/5 text-white/10'}`}>
      <Check size={10} strokeWidth={4} />
    </div>
    <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${active ? 'text-white/80' : 'text-white/20'}`}>
      {label}
    </span>
  </div>
);

export default ResetPassword;
