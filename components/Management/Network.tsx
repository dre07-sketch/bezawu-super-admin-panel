
import React, { useState } from 'react';
import { Radar, Activity, TrafficCone, AlertTriangle, ShieldCheck, Zap, Globe, MapPin, Search } from 'lucide-react';

const Network: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Stylized Coordinates for Addis Map (Simplified Hubs)
  const hubs = [
    { id: 'h1', name: 'Freshway Hub', x: 200, y: 150, status: 'OPTIMAL' },
    { id: 'h2', name: 'Shoa Central', x: 600, y: 350, status: 'BUSY' },
    { id: 'h3', name: 'Vivat Node', x: 350, y: 450, status: 'OPTIMAL' },
    { id: 'h4', name: 'Bole Cluster', x: 750, y: 150, status: 'KILLED' }
  ];

  const connections = [
    { from: 'h1', to: 'h2' },
    { from: 'h1', to: 'h4' },
    { from: 'h2', to: 'h3' },
    { from: 'h3', to: 'h1' },
    { from: 'h4', to: 'h2' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      <div className="flex justify-between items-end">
        <div>
          <h1 className={`text-4xl font-black font-poppins tracking-tighter uppercase ${isDark ? 'text-white' : 'text-gray-950'}`}>Network Pulse</h1>
          <p className={`text-[10px] font-bold uppercase tracking-[0.4em] mt-1 ${isDark ? 'text-white/30' : 'text-gray-500'}`}>Spatial Telemetry // Real-time Operational Flux</p>
        </div>
        <div className="flex gap-4">
           <div className={`px-6 py-3 glass-card flex items-center gap-4 border-white/5 ${isDark ? 'bg-white/5 text-emerald-400' : 'bg-emerald-50 text-emerald-700 shadow-lg'}`}>
              <Activity size={16} className="animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest">Global Sync Active</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* SVG Map Container */}
        <div className={`lg:col-span-8 glass-card aspect-[16/10] relative overflow-hidden flex flex-col ${isDark ? 'bg-black/40 border-white/5 shadow-[inset_0_0_100px_rgba(0,0,0,0.4)]' : 'bg-gray-50 border-black/5'}`}>
          
          {/* Map Header */}
          <div className="p-8 flex justify-between items-center relative z-20">
             <div className="flex items-center gap-4">
                <Radar size={18} className="text-emerald-500 animate-spin-slow" />
                <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-white/20' : 'text-gray-400'}`}>Addis Ababa Region // Cluster Node 88</span>
             </div>
             <div className="flex gap-2">
                <button className={`p-2 rounded-xl transition-all ${isDark ? 'bg-white/5 text-white/30 hover:text-white' : 'bg-white text-gray-400 shadow-md'}`}><Search size={16} /></button>
                <button className={`p-2 rounded-xl transition-all ${isDark ? 'bg-white/5 text-white/30 hover:text-white' : 'bg-white text-gray-400 shadow-md'}`}><Globe size={16} /></button>
             </div>
          </div>

          <div className="flex-1 relative">
            <svg viewBox="0 0 1000 600" className="w-full h-full">
              {/* Connection Lines (Power Lines) */}
              {connections.map((c, i) => {
                const start = hubs.find(h => h.id === c.from)!;
                const end = hubs.find(h => h.id === c.to)!;
                const isKilled = start.status === 'KILLED' || end.status === 'KILLED';
                
                return (
                  <g key={i}>
                    <path 
                      d={`M ${start.x} ${start.y} Q ${(start.x + end.x)/2} ${(start.y + end.y)/2 - 50} ${end.x} ${end.y}`} 
                      fill="none" 
                      stroke={isKilled ? "rgba(244, 63, 94, 0.1)" : "rgba(16, 185, 129, 0.15)"} 
                      strokeWidth="2" 
                      strokeDasharray={isKilled ? "5 5" : "0"}
                    />
                    {!isKilled && (
                      <circle r="3" fill="#10b981">
                        <animateMotion 
                          dur={`${2 + Math.random() * 2}s`} 
                          repeatCount="indefinite" 
                          path={`M ${start.x} ${start.y} Q ${(start.x + end.x)/2} ${(start.y + end.y)/2 - 50} ${end.x} ${end.y}`} 
                        />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* Hub Nodes */}
              {hubs.map((hub) => (
                <g 
                  key={hub.id} 
                  onMouseEnter={() => setHoveredNode(hub.id)} 
                  onMouseLeave={() => setHoveredNode(null)}
                  className="cursor-pointer"
                >
                  {/* Outer Glow */}
                  <circle 
                    cx={hub.x} cy={hub.y} r="25" 
                    fill={hub.status === 'KILLED' ? '#f43f5e' : hub.status === 'BUSY' ? '#f59e0b' : '#10b981'} 
                    fillOpacity="0.05"
                  />
                  {hub.status !== 'KILLED' && (
                    <circle cx={hub.x} cy={hub.y} r="35" fill="none" stroke={hub.status === 'BUSY' ? '#f59e0b' : '#10b981'} strokeOpacity="0.1" strokeWidth="1">
                       <animate attributeName="r" from="25" to="55" dur="3s" repeatCount="indefinite" />
                       <animate attributeName="opacity" from="1" to="0" dur="3s" repeatCount="indefinite" />
                    </circle>
                  )}
                  {/* Core Node */}
                  <circle 
                    cx={hub.x} cy={hub.y} r="10" 
                    fill={hub.status === 'KILLED' ? '#f43f5e' : hub.status === 'BUSY' ? '#f59e0b' : '#10b981'}
                    className={hub.status === 'BUSY' ? 'animate-pulse' : ''}
                  />
                  <text 
                    x={hub.x} y={hub.y + 30} 
                    textAnchor="middle" 
                    className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'fill-white/40' : 'fill-gray-950'}`}
                  >
                    {hub.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Map Footer Info */}
          <div className={`p-8 border-t flex items-center justify-between ${isDark ? 'border-white/5 bg-black/20' : 'border-black/5 bg-white/20'}`}>
             <div className="flex gap-8">
                <MapLegend label="Operational Hub" color="#10b981" isDark={isDark} />
                <MapLegend label="Throttled Node" color="#f59e0b" isDark={isDark} />
                <MapLegend label="Revoked Access" color="#f43f5e" isDark={isDark} />
             </div>
             <div className={`text-[9px] font-black uppercase tracking-widest ${isDark ? 'text-white/20' : 'text-gray-400'}`}>
                Flux Capacity: 94.2% Peak
             </div>
          </div>
        </div>

        {/* Sidebar: Node Stats */}
        <div className="lg:col-span-4 space-y-8">
           <section>
              <h4 className={`text-[10px] font-black uppercase tracking-[0.5em] mb-6 ${isDark ? 'text-white/20' : 'text-gray-400'}`}>Network Health</h4>
              <div className={`p-8 rounded-[2.5rem] border ${isDark ? 'bg-white/[0.01] border-white/5' : 'bg-white shadow-xl border-black/5'}`}>
                 <div className="space-y-6">
                    <HealthStat icon={<Activity className="text-emerald-500" />} label="Latency" value="14ms" isDark={isDark} />
                    <HealthStat icon={<TrafficCone className="text-amber-500" />} label="Congestion" value="Moderate" isDark={isDark} />
                    <HealthStat icon={<ShieldCheck className="text-blue-500" />} label="Firewall" value="Nominal" isDark={isDark} />
                 </div>
              </div>
           </section>

           <section>
              <h4 className={`text-[10px] font-black uppercase tracking-[0.5em] mb-6 ${isDark ? 'text-white/20' : 'text-gray-400'}`}>Critical Alerts</h4>
              <div className={`p-6 rounded-[2rem] border overflow-hidden relative ${isDark ? 'bg-rose-500/5 border-rose-500/10' : 'bg-rose-50 border-rose-100'}`}>
                 <div className="flex gap-4 items-start">
                    <AlertTriangle className="text-rose-500 shrink-0 mt-1" size={18} />
                    <div>
                       <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-gray-900'}`}>Access Revoked</p>
                       <p className={`text-[9px] font-medium leading-relaxed mt-1 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                          Terminal access for 'Bole Cluster' was manually terminated by the Super Admin at 14:22.
                       </p>
                    </div>
                 </div>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

const MapLegend = ({ label, color, isDark }: any) => (
  <div className="flex items-center gap-2">
     <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
     <span className={`text-[9px] font-black uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{label}</span>
  </div>
);

const HealthStat = ({ icon, label, value, isDark }: any) => (
  <div className="flex justify-between items-center">
     <div className="flex items-center gap-3">
        {icon}
        <span className={`text-[9px] font-black uppercase tracking-widest ${isDark ? 'text-white/20' : 'text-gray-400'}`}>{label}</span>
     </div>
     <span className={`text-sm font-black ${isDark ? 'text-white' : 'text-gray-950'}`}>{value}</span>
  </div>
);

export default Network;
