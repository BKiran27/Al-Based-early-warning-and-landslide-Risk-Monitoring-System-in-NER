import React, { useState, useEffect } from 'react';
import { 
  Radio, Shield, AlertTriangle, BatteryCharging, Wifi, 
  MapPin, Clock, Volume2, Sparkles, Filter, CheckCircle2, 
  Bell, ExternalLink, Activity 
} from 'lucide-react';
import { indigenousSensorNodes, nitiTechMetadata } from '../../data/nitiSensorNodes';

export function NitiSensorMeshDeck({ lang, onOpenSirenModal }) {
  const [selectedState, setSelectedState] = useState('ALL');
  const [activeStrobeId, setActiveStrobeId] = useState(null);
  const [isStrobeFlashing, setIsStrobeFlashing] = useState(false);

  // Filter nodes
  const filteredNodes = selectedState === 'ALL'
    ? indigenousSensorNodes
    : indigenousSensorNodes.filter(n => n.state.toUpperCase() === selectedState.toUpperCase());

  // Strobe simulation effect
  useEffect(() => {
    let interval;
    if (activeStrobeId) {
      setIsStrobeFlashing(true);
      interval = setInterval(() => {
        setIsStrobeFlashing(prev => !prev);
      }, 300);
    } else {
      setIsStrobeFlashing(false);
    }
    return () => clearInterval(interval);
  }, [activeStrobeId]);

  const triggerNodeStrobe = (nodeId) => {
    if (activeStrobeId === nodeId) {
      setActiveStrobeId(null);
    } else {
      setActiveStrobeId(nodeId);
      // Auto cancel after 8 seconds
      setTimeout(() => setActiveStrobeId(null), 8000);
    }
  };

  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-[#0c1322] border border-sky-500/30 space-y-6 shadow-2xl">
      
      {/* Deck Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-sky-500/10 border border-sky-500/30 rounded-xl text-sky-400">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                NITI Aayog & IIT Mandi Indigenous Sensor Mesh Fleet
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
                WCDM-DRR 2024 Award
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {nitiTechMetadata.principalInvestigators} • Low-cost MEMS sensor network predicting landslides up to 3 hours in advance
            </p>
          </div>
        </div>

        {/* NITI Story Link */}
        <a 
          href="https://frontiertech.niti.gov.in/story/low-cost-indigenous-sensors-ai-deliver-real-time-landslide-alerts-across-himalayan-slopes/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-cyan-400 transition"
        >
          <span>NITI Aayog Frontier Tech Story</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Breakthrough Impact Metrics Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
          <span className="text-[10px] text-slate-400 font-mono uppercase block">Advance Warning Lead Time</span>
          <span className="text-xl font-black font-mono text-cyan-400">Up to 3.0 Hours</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">&gt; 90% Predictive Accuracy</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
          <span className="text-[10px] text-slate-400 font-mono uppercase block">Unit Manufacturing Cost</span>
          <span className="text-xl font-black font-mono text-emerald-400">₹1.20 Lakhs</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">vs ₹1.10 Cr Imported Radar (90x Cheaper)</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
          <span className="text-[10px] text-slate-400 font-mono uppercase block">Deployment Grid Density</span>
          <span className="text-xl font-black font-mono text-amber-400">500m – 1km</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Localized Cloudburst Detection</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
          <span className="text-[10px] text-slate-400 font-mono uppercase block">Multi-Channel Actuation</span>
          <span className="text-xl font-black font-mono text-purple-400">Dual Strobe + SMS</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">105 dB Local Buzzer + DEOC Uplink</span>
        </div>
      </div>

      {/* State Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 text-[11px] font-mono mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> State Filter:
          </span>
          {['ALL', 'Sikkim', 'Meghalaya', 'Assam', 'Nagaland', 'Arunachal Pradesh', 'Manipur', 'Mizoram', 'Tripura'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedState(st)}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition ${
                selectedState.toUpperCase() === st.toUpperCase()
                  ? 'bg-sky-500 text-black font-bold shadow-md shadow-sky-500/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <span className="text-xs font-mono text-slate-400">
          Active Fleet: <b className="text-white">{filteredNodes.length} Nodes</b>
        </span>
      </div>

      {/* Node Cards Fleet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNodes.map((node) => {
          const isDanger = node.status === 'COLLAPSE_IMMINTENT';
          const isWarning = node.status === 'WARNING';
          const isThisStrobeActive = activeStrobeId === node.id;

          return (
            <div 
              key={node.id}
              className={`p-4 rounded-xl border transition-all space-y-3 relative overflow-hidden ${
                isDanger 
                  ? 'bg-rose-950/30 border-rose-500/60 shadow-lg shadow-rose-500/10'
                  : isWarning 
                  ? 'bg-amber-950/20 border-amber-500/50'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Flashing Strobe Overlay if active */}
              {isThisStrobeActive && isStrobeFlashing && (
                <div className="absolute inset-0 bg-amber-400/20 pointer-events-none z-10 border-2 border-amber-400 animate-pulse" />
              )}

              {/* Card Top: ID and Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-sky-400 bg-sky-500/10 border border-sky-500/30 px-2 py-0.5 rounded">
                    {node.id}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {node.state}
                  </span>
                </div>
                
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                  isDanger 
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                    : isWarning 
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}>
                  {node.status}
                </span>
              </div>

              {/* Corridor Name */}
              <div>
                <h4 className="text-xs font-bold text-white tracking-wide">
                  {node.name}
                </h4>
                <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  {node.corridor} ({node.district})
                </p>
              </div>

              {/* Real-Time Telemetry Matrix */}
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-900 text-center bg-black/30 rounded-lg">
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-mono block">1.5m Moisture</span>
                  <span className={`text-xs font-bold font-mono ${
                    node.moisture1_5m_pct >= 75 ? 'text-rose-400' : (node.moisture1_5m_pct >= 65 ? 'text-amber-400' : 'text-emerald-400')
                  }`}>
                    {node.moisture1_5m_pct}%
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-mono block">Tilt Angle (Δθ)</span>
                  <span className={`text-xs font-bold font-mono ${
                    node.tiltAngle_deg >= 3.2 ? 'text-rose-400' : (node.tiltAngle_deg >= 2.5 ? 'text-amber-400' : 'text-emerald-400')
                  }`}>
                    {node.tiltAngle_deg}°
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-mono block">Advance Lead</span>
                  <span className="text-xs font-bold font-mono text-cyan-400">
                    {node.leadTimeHours}
                  </span>
                </div>
              </div>

              {/* Advisory Message */}
              <p className="text-[11px] text-slate-300 italic leading-snug">
                "{node.advisory}"
              </p>

              {/* Bottom Actions: Hardware telemetry & Strobe trigger */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-800/80 text-[10px] font-mono text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-0.5 text-slate-400">
                    <BatteryCharging className="w-3 h-3 text-emerald-400" />
                    {node.battery_v}V
                  </span>
                  <span className="flex items-center gap-0.5 text-slate-400">
                    <Wifi className="w-3 h-3 text-sky-400" />
                    {node.rssi_dbm}dBm
                  </span>
                </div>

                {/* Hyperlocal Strobe Actuator Button */}
                <button
                  onClick={() => triggerNodeStrobe(node.id)}
                  className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-wider flex items-center gap-1 transition ${
                    isThisStrobeActive
                      ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/30 animate-pulse'
                      : 'bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  <Bell className="w-3 h-3" />
                  <span>{isThisStrobeActive ? 'BLASTING STROBE' : 'TEST STROBE'}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
