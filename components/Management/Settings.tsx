
import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, ShieldAlert, Power, Lock, Key, 
  Percent, Clock, Database, RefreshCcw, BellRing, 
  ShieldCheck, AlertTriangle, Fingerprint, Save, Info,
  Palette, Layout, Check, Sparkles, Zap, Leaf, Monitor,
  Sun, Moon
} from 'lucide-react';

interface ThemeOption {
  id: string;
  name: string;
  vibe: string;
  description: string;
  accents: string[];
  icon: React.ReactNode;
}

const THEMES: ThemeOption[] = [
  {
    id: 'bezaw-terminal',
    name: 'Bezaw Terminal',
    vibe: 'Futuristic Glassmorphism',
    description: 'The standard high-performance holographic interface with emerald accents.',
    accents: ['bg-emerald-500', 'bg-cyan-500'],
    icon: <Sparkles className="w-5 h-5" />
  },
  {
    id: 'neo-retail',
    name: 'Neo-Retail Minimal',
    vibe: 'Clean, Sharp, Apple-like',
    description: 'Minimalist backgrounds with lime highlights and precise rounded geometry.',
    accents: ['bg-slate-800', 'bg-lime-400'],
    icon: <Layout className="w-5 h-5" />
  },
  {
    id: 'fresh-market',
    name: 'Fresh Market Modern',
    vibe: 'Organic & Friendly 🌱',
    description: 'Natural tones with mint highlights. Optimized for supermarket chain management.',
    accents: ['bg-green-800', 'bg-emerald-300'],
    icon: <Leaf className="w-5 h-5" />
  },
  {
    id: 'smart-pos',
    name: 'Smart POS Pro',
    vibe: 'High-Tech & Fast',
    description: 'High-contrast interface with neon cyan accents. Optimized for cashier performance.',
    accents: ['bg-black', 'bg-cyan-400'],
    icon: <Zap className="w-5 h-5" />
  },
  {
    id: 'retail-intel',
    name: 'Retail Intelligence',
    vibe: 'Data-Heavy & Glowing 📊',
    description: 'Deep sophisticated gradients with purple glowing highlights and data layers.',
    accents: ['bg-indigo-900', 'bg-purple-500'],
    icon: <Monitor className="w-5 h-5" />
  }
];

interface SettingsProps {
  theme?: string;
  mode?: 'light' | 'dark';
  onThemeChange?: (themeId: string) => void;
  onModeChange?: (mode: 'light' | 'dark') => void;
}

const Settings: React.FC<SettingsProps> = ({ theme = 'bezaw-terminal', mode = 'dark', onThemeChange, onModeChange }) => {
  const isDark = mode === 'dark';
  const [commission, setCommission] = useState(5.0);
  const [isAppOffline, setIsAppOffline] = useState(false);
  const [isBranchesOffline, setIsBranchesOffline] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState(theme);

  useEffect(() => {
    setSelectedThemeId(theme);
  }, [theme]);

  const handleThemeSelect = (id: string) => {
    setSelectedThemeId(id);
    if (onThemeChange) onThemeChange(id);
  };

  const handleModeSelect = (newMode: 'light' | 'dark') => {
    if (onModeChange) onModeChange(newMode);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black font-poppins tracking-tighter uppercase text-[var(--text-primary)]">System Configuration</h1>
          <p className="text-xs font-bold uppercase tracking-[0.4em] mt-1 text-[var(--accent)] opacity-60">Kernel v9.4 // Global Protocol Hub</p>
        </div>
        <div className="flex gap-4">
           <div className="px-6 py-3 glass-card flex items-center gap-4 text-[var(--accent)]">
              <Database size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Mainframe Link Active</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ROW 1 LEFT: Identity Rotation (Priority 1) */}
        <div className="lg:col-span-7 space-y-8">
          <section className="glass-card p-10 relative overflow-hidden transition-all bg-[var(--bg-card)] border-[var(--border-color)]">
             <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-[var(--accent)] bg-opacity-10 text-[var(--accent)]">
                   <Key size={20} />
                </div>
                <div>
                   <h3 className="text-xl font-black uppercase tracking-tighter text-[var(--text-primary)]">Identity Rotation</h3>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">Cycle Administrative Credentials</p>
                </div>
             </div>

             <div className="space-y-6">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest mb-3 text-[var(--text-secondary)]">Current Security Hash</label>
                   <input type="password" placeholder="••••••••••••" className="w-full px-6 py-4 glass-input text-sm font-mono" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest mb-3 text-[var(--text-secondary)]">New Credential</label>
                      <input type="password" placeholder="Min 12 characters" className="w-full px-6 py-4 glass-input text-sm font-mono" />
                   </div>
                   <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest mb-3 text-[var(--text-secondary)]">Verify Credential</label>
                      <input type="password" placeholder="Confirm" className="w-full px-6 py-4 glass-input text-sm font-mono" />
                   </div>
                </div>
                <button className="w-full btn-primary py-4 text-xs font-black uppercase tracking-[0.2em] rounded-2xl">
                   Commit Credential Rotation
                </button>
             </div>
          </section>
        </div>

        {/* ROW 1 RIGHT: Emergency Protocols (Priority 2) */}
        <div className="lg:col-span-5 space-y-8">
          <section className="glass-card p-10 relative overflow-hidden transition-all bg-rose-500 bg-opacity-5 border-rose-500 border-opacity-20">
             <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-rose-500 bg-opacity-10 text-rose-500">
                   <ShieldAlert size={20} />
                </div>
                <div>
                   <h3 className="text-xl font-black uppercase tracking-tighter text-[var(--text-primary)]">Emergency Protocols</h3>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-rose-500 opacity-60">Global Hard Shutdown Switches</p>
                </div>
             </div>

             <div className="space-y-6">
                <ProtocolToggle 
                  label="App Killswitch" 
                  description="Terminate all mobile application sessions immediately." 
                  active={isAppOffline}
                  onToggle={() => setIsAppOffline(!isAppOffline)}
                />
                <ProtocolToggle 
                  label="Branch Killswitch" 
                  description="Revoke access to all branch management panels." 
                  active={isBranchesOffline}
                  onToggle={() => setIsBranchesOffline(!isBranchesOffline)}
                />

                <div className="p-6 rounded-3xl border-2 border-dashed border-rose-500 border-opacity-30 bg-black bg-opacity-20 flex flex-col items-center text-center">
                   <Power size={32} className="text-rose-500 mb-4 animate-pulse" />
                   <p className="text-xs font-black uppercase tracking-widest mb-2 text-white">Full Platform Blackout</p>
                   <p className="text-[10px] font-medium leading-relaxed mb-6 text-white opacity-40">Requires master-key bypass to execute.</p>
                   <button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-xl shadow-rose-600/30">
                      Initiate Blackout
                   </button>
                </div>
             </div>
          </section>
        </div>

        {/* ROW 2 LEFT: Theme Skin Selector */}
        <div className="lg:col-span-7 space-y-8">
          <section className="glass-card p-10 relative overflow-hidden transition-all bg-[var(--bg-card)] border-[var(--border-color)]">
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-indigo-500 bg-opacity-10 text-indigo-400">
                    <Palette size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tighter text-[var(--text-primary)]">System Visuals</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">Manage System Skins and Environment</p>
                  </div>
                </div>
                
                {/* Unified Mode Toggle */}
                <div className="flex bg-[var(--bg-input)] rounded-2xl p-1.5 border border-[var(--border-color)]">
                   <button 
                     onClick={() => handleModeSelect('light')}
                     className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${!isDark ? 'bg-white text-slate-950 shadow-lg' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                   >
                     <Sun size={14} /> Light
                   </button>
                   <button 
                     onClick={() => handleModeSelect('dark')}
                     className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isDark ? 'bg-slate-800 text-white shadow-lg' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                   >
                     <Moon size={14} /> Dark
                   </button>
                </div>
             </div>

             <div className="grid grid-cols-1 gap-4">
                {THEMES.map((t) => (
                  <button 
                    key={t.id}
                    onClick={() => handleThemeSelect(t.id)}
                    className={`group relative p-6 rounded-[2.5rem] border transition-all flex items-center justify-between text-left ${
                      selectedThemeId === t.id 
                        ? 'bg-[var(--accent)] bg-opacity-5 border-[var(--accent)] border-opacity-40 shadow-lg' 
                        : 'bg-[var(--bg-input)] border-transparent hover:border-[var(--border-color)]'
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                        selectedThemeId === t.id 
                          ? 'bg-[var(--accent)] text-white shadow-lg' 
                          : 'bg-[var(--bg-primary)] text-[var(--text-secondary)]'
                      }`}>
                        {t.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-black uppercase tracking-tight ${selectedThemeId === t.id ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>{t.name}</p>
                          {selectedThemeId === t.id && <Check size={14} className="text-[var(--accent)]" />}
                        </div>
                        <p className={`text-[9px] font-black uppercase tracking-widest mb-1 text-[var(--accent)] opacity-80`}>{t.vibe}</p>
                        <p className={`text-[10px] font-medium leading-relaxed max-w-md text-[var(--text-secondary)] opacity-60`}>{t.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 p-2.5 rounded-2xl bg-black bg-opacity-10">
                      {t.accents.map((acc, i) => (
                        <div key={i} className={`w-3.5 h-3.5 rounded-full ${acc} shadow-sm`}></div>
                      ))}
                    </div>
                  </button>
                ))}
             </div>
          </section>
        </div>

        {/* ROW 2 RIGHT: Yield Logic (Commission) */}
        <div className="lg:col-span-5 space-y-8">
          <section className="glass-card p-10 relative overflow-hidden transition-all bg-[var(--bg-card)] border-[var(--border-color)]">
             <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-blue-500 bg-opacity-10 text-blue-400">
                   <Percent size={20} />
                </div>
                <div>
                   <h3 className="text-xl font-black uppercase tracking-tighter text-[var(--text-primary)]">Yield Logic</h3>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">Institutional Fee Throttling</p>
                </div>
             </div>

             <div className="space-y-8">
                <div className="flex justify-between items-center">
                   <span className="text-sm font-bold text-[var(--text-secondary)]">Platform Capture</span>
                   <span className="text-2xl font-black text-[var(--accent)]">{commission.toFixed(1)}%</span>
                </div>
                <input 
                  type="range" min="1" max="15" step="0.5" 
                  value={commission} onChange={(e) => setCommission(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-[var(--accent)] bg-opacity-20 rounded-full appearance-none cursor-pointer accent-[var(--accent)]" 
                />
                <div className="p-6 rounded-[2rem] border border-blue-500 border-opacity-10 bg-blue-500 bg-opacity-5 flex items-start gap-4">
                   <Info className="text-blue-400 shrink-0 mt-0.5" size={18} />
                   <p className="text-[10px] font-medium leading-relaxed text-blue-400 opacity-80">
                      Adjustment to the global capture rate triggers a 256-bit hash update across all 48 branch nodes. Changes are mirrored to the immutable ledger.
                   </p>
                </div>
             </div>
          </section>

          <section className="glass-card p-8 bg-[var(--bg-card)] border-[var(--border-color)]">
              <div className="flex items-center gap-4 mb-4">
                  <ShieldCheck className="text-[var(--accent)]" size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]">System Health Matrix</span>
              </div>
              <div className="space-y-4">
                  <HealthItem label="Core Latency" value="12ms" isDark={isDark} />
                  <HealthItem label="Sync Interval" value="2.4s" isDark={isDark} />
                  <HealthItem label="API Uptime" value="99.98%" isDark={isDark} />
              </div>
          </section>
        </div>

      </div>
    </div>
  );
};

const ProtocolToggle = ({ label, description, active, onToggle }: any) => (
  <div className={`p-6 rounded-[1.5rem] border transition-all ${active ? 'bg-rose-500 bg-opacity-10 border-rose-500 border-opacity-30' : 'bg-[var(--bg-input)] border-[var(--border-color)]'}`}>
     <div className="flex justify-between items-center mb-2">
        <p className={`text-sm font-black uppercase tracking-tight ${active ? 'text-rose-500' : 'text-[var(--text-primary)]'}`}>{label}</p>
        <button 
          onClick={onToggle}
          className={`w-12 h-6 rounded-full relative transition-all ${active ? 'bg-rose-600' : 'bg-slate-700'}`}
        >
           <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${active ? 'left-7' : 'left-1'}`}></div>
        </button>
     </div>
     <p className="text-[9px] font-medium leading-relaxed text-[var(--text-secondary)]">{description}</p>
  </div>
);

const HealthItem = ({ label, value, isDark }: any) => (
  <div className="flex justify-between items-center text-[10px] font-bold">
    <span className="text-[var(--text-secondary)] uppercase tracking-widest">{label}</span>
    <span className="text-[var(--text-primary)]">{value}</span>
  </div>
);

export default Settings;
