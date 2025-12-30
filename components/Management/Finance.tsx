
import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, CreditCard, ChevronRight, Zap, Target, ArrowDownRight, ShieldCheck, Landmark, Activity, UserCheck, Rocket } from 'lucide-react';

const Finance: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const startSettlement = () => {
    setIsProcessing(true);
    setProgress(0);
  };

  useEffect(() => {
    if (isProcessing && progress < 100) {
      const timer = setTimeout(() => setProgress(p => p + 1), 50);
      return () => clearTimeout(timer);
    } else if (progress === 100) {
      setTimeout(() => setIsProcessing(false), 1500);
    }
  }, [isProcessing, progress]);

  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      <div className="flex justify-between items-end">
        <div>
          <h1 className={`text-4xl font-black font-poppins tracking-tighter uppercase ${isDark ? 'text-white' : 'text-gray-950'}`}>Clearing House</h1>
          <p className={`text-[10px] font-bold uppercase tracking-[0.4em] mt-1 ${isDark ? 'text-white/30' : 'text-gray-500'}`}>Settlement Engine // Platform Capture (5.0%)</p>
        </div>
        <div className="flex gap-4">
           <div className={`px-6 py-3 glass-card flex items-center gap-4 border-white/5 ${isDark ? 'bg-white/5 text-emerald-400' : 'bg-emerald-50 text-emerald-700 shadow-lg'}`}>
              <Landmark size={16} />
              <span className="text-[9px] font-black uppercase tracking-widest">Reserve Verified</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* The Siphon Visual */}
        <div className="lg:col-span-7 space-y-8">
           <div className={`glass-card p-10 relative overflow-hidden flex flex-col items-center justify-center min-h-[500px] ${isDark ? 'bg-white/[0.01] border-white/5 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]' : 'bg-white border-black/5 shadow-xl'}`}>
              <div className="absolute top-10 left-10">
                 <h3 className={`text-xl font-black uppercase tracking-tighter ${isDark ? 'text-white' : 'text-gray-950'}`}>The Bezaw Siphon</h3>
                 <p className={`text-[8px] font-black uppercase tracking-widest mt-1 ${isDark ? 'text-white/20' : 'text-gray-400'}`}>Live Institutional Yield Distribution</p>
              </div>

              {/* Siphon Metaphor */}
              <div className="relative w-full max-w-sm flex flex-col items-center gap-12">
                 {/* Gross Bucket */}
                 <div className={`w-64 h-32 rounded-[3rem] border-4 flex flex-col items-center justify-center relative ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-black/5'}`}>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-white/20' : 'text-gray-400'}`}>Gross Intake</span>
                    <span className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-950'}`}>ETB 12.4M</span>
                    <div className="absolute -bottom-8 w-1 h-8 bg-gradient-to-b from-white/20 to-emerald-500"></div>
                 </div>

                 {/* The Split Valve */}
                 <div className="relative w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)] animate-pulse">
                    <Activity className="text-white" size={24} />
                 </div>

                 {/* Diverging Paths */}
                 <div className="flex gap-20 w-full justify-center relative">
                    {/* Merchant Flow */}
                    <div className="flex flex-col items-center gap-6">
                       <div className="h-20 w-1 bg-gradient-to-b from-emerald-500 to-blue-500/20"></div>
                       <div className={`p-8 rounded-[2.5rem] border flex flex-col items-center ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-black/5 shadow-lg'}`}>
                          <span className="text-[8px] font-black uppercase tracking-widest text-blue-400">Merchant Yield (95%)</span>
                          <span className={`text-lg font-black mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>ETB 11.78M</span>
                       </div>
                    </div>
                    {/* Platform Flow */}
                    <div className="flex flex-col items-center gap-6">
                       <div className="h-20 w-1 bg-gradient-to-b from-emerald-500 to-emerald-500/20"></div>
                       <div className={`p-8 rounded-[2.5rem] border flex flex-col items-center ${isDark ? 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.1)]' : 'bg-emerald-50 border-emerald-100'}`}>
                          <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500">Bezaw Fee (5%)</span>
                          <span className={`text-lg font-black mt-2 ${isDark ? 'text-emerald-500' : 'text-emerald-700'}`}>ETB 620.0K</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Settlement Panel */}
        <div className="lg:col-span-5 space-y-10">
           <section>
              <h4 className={`text-[10px] font-black uppercase tracking-[0.5em] mb-6 ${isDark ? 'text-white/20' : 'text-gray-400'}`}>Batch Protocol</h4>
              <div className={`p-10 rounded-[2.5rem] border flex flex-col items-center text-center ${isDark ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-white shadow-xl border-black/5'}`}>
                 <div className={`w-20 h-20 rounded-[2.5rem] flex items-center justify-center mb-8 ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}>
                    <Rocket size={32} className={isProcessing ? 'animate-bounce' : ''} />
                 </div>
                 <h2 className={`text-2xl font-black font-poppins tracking-tighter uppercase mb-4 ${isDark ? 'text-white' : 'text-gray-950'}`}>Commit All Payouts</h2>
                 <p className={`text-[10px] font-medium leading-relaxed mb-10 max-w-xs ${isDark ? 'text-white/30' : 'text-gray-500'}`}>
                    Execute institutional settlement for all 48 operational nodes. This will finalize the ledger and initiate banking API calls.
                 </p>

                 {isProcessing ? (
                   <div className="w-full space-y-4">
                      <div className={`h-2 w-full rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                         <div className="h-full bg-emerald-500 transition-all duration-100" style={{ width: `${progress}%` }}></div>
                      </div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-emerald-500">
                         {progress < 100 ? `Synchronizing Vaults: ${progress}%` : 'Settlement Finalized'}
                      </p>
                   </div>
                 ) : (
                   <button 
                     onClick={startSettlement}
                     className="w-full btn-primary py-5 text-[11px] font-black uppercase tracking-[0.3em] rounded-[1.5rem] shadow-[0_20px_40px_rgba(16,185,129,0.3)] hover:scale-[1.02] transition-all"
                   >
                     Authorize Global Payout
                   </button>
                 )}
              </div>
           </section>

           <section>
              <h4 className={`text-[10px] font-black uppercase tracking-[0.5em] mb-6 ${isDark ? 'text-white/20' : 'text-gray-400'}`}>Pending Transactions</h4>
              <div className="space-y-4">
                 {[
                   { name: 'Freshway Mart', amount: '450,221', bank: 'CBE' },
                   { name: 'Shoa Shopping', amount: '291,000', bank: 'Awash' },
                   { name: 'Vivat Node', amount: '124,500', bank: 'Dashen' }
                 ].map((t, i) => (
                   <div key={i} className={`p-6 rounded-3xl border flex justify-between items-center transition-all hover:translate-x-2 ${isDark ? 'bg-white/[0.01] border-white/5' : 'bg-white border-black/5 shadow-sm'}`}>
                      <div className="flex items-center gap-4">
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-white/5 text-emerald-400' : 'bg-gray-100 text-gray-700'}`}>
                            <Landmark size={18} />
                         </div>
                         <div>
                            <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.name}</p>
                            <p className={`text-[8px] font-bold uppercase tracking-widest text-emerald-500`}>{t.bank} Bank</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className={`text-sm font-black ${isDark ? 'text-white' : 'text-gray-950'}`}>ETB {t.amount}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default Finance;
