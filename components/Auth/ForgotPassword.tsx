
import React, { useState } from 'react';
import { ArrowLeft, Send, Cpu } from 'lucide-react';

interface Props {
  onNext: (email: string) => void;
  onBack: () => void;
}

const ForgotPassword: React.FC<Props> = ({ onNext, onBack }) => {
  const [email, setEmail] = useState('');

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <button onClick={onBack} className="absolute top-0 left-0 p-2 text-white/30 hover:text-white transition-all">
        <ArrowLeft size={20} />
      </button>

      <div className="text-center mb-10 mt-2">
        <div className="w-16 h-16 glass-card flex items-center justify-center mx-auto mb-6 relative overflow-hidden group">
           <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/20 transition-all"></div>
           <Cpu className="w-8 h-8 text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-white font-poppins">Identity Check</h2>
        <p className="text-white/40 text-xs font-medium mt-2 px-4 leading-relaxed">
           Specify terminal identifier to initiate cryptographic recovery sequence.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <label className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3 ml-1">Terminal Identifier</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-6 py-4 glass-input text-sm font-medium"
            placeholder="admin@bezaw.tech"
          />
        </div>

        <button 
          onClick={() => onNext(email)}
          className="w-full btn-primary py-4 text-sm tracking-widest uppercase"
        >
          Request Sequence <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
