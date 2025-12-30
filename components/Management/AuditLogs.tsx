
import React, { useState } from 'react';
import { Shield, Search, Filter, Hash, User, Clock, Terminal, Activity, AlertTriangle, ShieldCheck, ShieldAlert, ChevronRight, Fingerprint } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  admin: string;
  action: string;
  category: 'SECURITY' | 'NODE_MGMT' | 'FINANCE' | 'SYSTEM';
  severity: 'INFO' | 'CAUTION' | 'CRITICAL';
  actionHash: string;
  details: string;
}

const MOCK_LOGS: LogEntry[] = [
  {
    id: 'l-1',
    timestamp: '2023-12-08 14:22:10',
    admin: 'Admin 001',
    action: 'EMERGENCY_NODE_KILLSWITCH',
    category: 'SECURITY',
    severity: 'CRITICAL',
    actionHash: '8f2a-99bc-11e5-7821',
    details: 'Node [CMC Distribution X] manually shutdown via Super Admin terminal. Protocol 88-X active.'
  },
  {
    id: 'l-2',
    timestamp: '2023-12-08 13:45:05',
    admin: 'Admin 001',
    action: 'THROTTLE_CONTROL_ENABLE',
    category: 'NODE_MGMT',
    severity: 'CAUTION',
    actionHash: '3d11-12ea-90cc-1120',
    details: 'Busy Mode toggled for [Bole Terminal 01]. Reason: High Traffic Anomaly detected.'
  },
  {
    id: 'l-3',
    timestamp: '2023-12-08 12:10:44',
    admin: 'System_Kernel',
    action: 'INSTITUTIONAL_SETTLEMENT',
    category: 'FINANCE',
    severity: 'INFO',
    actionHash: '1a92-77bb-00aa-5521',
    details: 'Payout initiated for [Freshway Mart]. ETB 450,221.00 transferred to CBE-0021.'
  },
  {
    id: 'l-4',
    timestamp: '2023-12-08 10:05:00',
    admin: 'Admin 002',
    action: 'CREDENTIAL_ROTATION',
    category: 'SYSTEM',
    severity: 'CAUTION',
    actionHash: '9e21-0012-77ff-9922',
    details: 'Security key rotation protocol executed for regional manager Helen Tadesse.'
  }
];

const AuditLogs: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';
  const [filter, setFilter] = useState<'ALL' | 'CRITICAL' | 'CAUTION' | 'INFO'>('ALL');

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-rose-500 shadow-[0_0_15px_#f43f5e]';
      case 'CAUTION': return 'bg-amber-500 shadow-[0_0_15px_#f59e0b]';
      default: return 'bg-emerald-500 shadow-[0_0_15px_#10b981]';
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className={`text-4xl font-black font-poppins tracking-tighter uppercase ${isDark ? 'text-white' : 'text-gray-950'}`}>Chronos Ledger</h1>
          <p className={`text-xs font-bold uppercase tracking-[0.4em] mt-1 ${isDark ? 'text-white/30' : 'text-gray-500'}`}>Forensic Administrative Stream // Secure Immutable Audit</p>
        </div>
        <div className="flex gap-4">
           <div className={`px-6 py-3 glass-card flex items-center gap-4 border-white/5 ${isDark ? 'bg-white/5' : 'bg-white shadow-xl'}`}>
              <Fingerprint size={18} className="text-emerald-500" />
              <span className={`text-xs font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-gray-950'}`}>Ledger Authenticated</span>
           </div>
        </div>
      </div>

      <div className={`glass-card overflow-hidden ${isDark ? 'bg-white/[0.005]' : 'bg-white border-black/5 shadow-none'}`}>
        <div className={`p-8 border-b flex flex-col md:flex-row md:items-center justify-between gap-6 ${isDark ? 'border-white/5' : 'border-black/5'}`}>
          <div className="flex items-center space-x-6">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className={`text-xs font-black uppercase tracking-[0.4em] ${isDark ? 'text-white/20' : 'text-gray-400'}`}>Real-time Forensic Monitoring</span>
             </div>
             <div className="flex bg-black/10 rounded-xl p-1">
                {(['ALL', 'CRITICAL', 'CAUTION', 'INFO'] as const).map(f => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-white/10 text-white' : 'text-white/20 hover:text-white'}`}
                  >
                    {f}
                  </button>
                ))}
             </div>
          </div>
          <div className="flex items-center space-x-4">
             <div className="relative">
                <Search size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-white/10' : 'text-gray-400'}`} />
                <input 
                  type="text" 
                  placeholder="Query hash or admin ID..." 
                  className={`pl-12 pr-6 py-4 glass-input text-sm font-bold w-80 ${isDark ? '' : 'bg-white/10'}`}
                />
             </div>
             <button className={`p-4 glass-card border-white/5 transition-colors ${isDark ? 'bg-white/[0.01] text-white/10 hover:text-white' : 'bg-white text-gray-400 border-black/10 hover:text-black'}`}>
               <Filter size={20} />
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono">
            <thead className={`text-[11px] uppercase font-black tracking-[0.3em] ${isDark ? 'bg-white/[0.01] text-white/10' : 'bg-gray-100/20 text-gray-400'}`}>
              <tr>
                <th className="px-10 py-6">Timestamp / Beam</th>
                <th className="px-10 py-6">Action Identifier</th>
                <th className="px-10 py-6">Authority</th>
                <th className="px-10 py-6">Action Hash</th>
                <th className="px-10 py-6 text-right">Protocol</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-black/5'}`}>
              {MOCK_LOGS.filter(l => filter === 'ALL' || l.severity === filter).map((log) => (
                <tr key={log.id} className={`transition-all group ${isDark ? 'hover:bg-white/[0.01]' : 'hover:bg-white/30'}`}>
                   <td className="px-10 py-8">
                      <div className="flex items-center gap-6">
                         <div className={`w-1.5 h-12 rounded-full ${getSeverityStyles(log.severity)}`}></div>
                         <div>
                            <p className={`text-sm font-black tracking-widest ${isDark ? 'text-white' : 'text-gray-950'}`}>{log.timestamp}</p>
                            <p className={`text-[10px] font-black uppercase tracking-[0.2em] mt-1 ${isDark ? 'text-white/20' : 'text-gray-400'}`}>{log.severity}</p>
                         </div>
                      </div>
                   </td>
                   <td className="px-10 py-8">
                      <p className={`text-sm font-black tracking-tighter uppercase ${isDark ? 'text-white/90' : 'text-gray-950'}`}>{log.action}</p>
                      <p className={`text-xs font-medium leading-relaxed mt-1.5 max-w-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{log.details}</p>
                   </td>
                   <td className="px-10 py-8 uppercase font-black tracking-widest">
                      <div className="flex items-center gap-3">
                         <User size={16} className="text-emerald-500" />
                         <span className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-600'}`}>{log.admin}</span>
                      </div>
                   </td>
                   <td className="px-10 py-8">
                      <span className={`px-4 py-2 rounded-xl border text-xs font-black tracking-[0.2em] ${isDark ? 'bg-black/40 border-white/5 text-emerald-400' : 'bg-white border-black/5 text-gray-900 shadow-sm'}`}>
                         {log.actionHash}
                      </span>
                   </td>
                   <td className="px-10 py-8 text-right">
                      <button className={`p-4 rounded-2xl glass-card transition-all ${isDark ? 'bg-white/[0.01] text-white/10 hover:text-emerald-400' : 'bg-white text-gray-400 hover:text-emerald-600'}`}>
                        <ChevronRight size={22} />
                      </button>
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
