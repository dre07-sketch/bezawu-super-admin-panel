
import React from 'react';
import { Mail, Lock, ArrowRight, Zap } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  onForgot: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onForgot }) => {
  return (
    <form className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white font-poppins tracking-tight">Access Terminal</h2>
        <p className="text-white/40 text-xs font-medium mt-1">Initialize administrative session</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-2.5 ml-1">Terminal ID (Email)</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input 
              type="email" 
              required
              className="w-full pl-12 pr-6 py-4 glass-input placeholder:text-white/10 text-sm font-medium"
              placeholder="admin@bezaw.tech"
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2.5">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Security Key</label>
            <button 
              type="button" 
              onClick={onForgot}
              className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-widest"
            >
              Recover
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input 
              type="password" 
              required
              className="w-full pl-12 pr-6 py-4 glass-input placeholder:text-white/10 text-sm font-medium"
              placeholder="••••••••••••"
            />
          </div>
        </div>
      </div>

      <button 
        type="submit"
        className="w-full btn-primary py-4 text-sm tracking-[0.1em] uppercase group"
      >
        Authorize Entry <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>

      <div className="flex items-center justify-center gap-2 text-white/10">
         <Zap size={12} fill="currentColor" />
         <p className="text-[10px] font-bold uppercase tracking-widest">Quantum Encrypted</p>
      </div>
    </form>
  );
};

export default Login;
