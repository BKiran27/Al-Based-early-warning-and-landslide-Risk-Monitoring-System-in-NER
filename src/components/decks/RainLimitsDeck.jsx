import React, { useState } from 'react';
import { 
  BarChart3, CloudRain, AlertTriangle, ShieldCheck, 
  Users, Sliders, ArrowUpRight, CheckCircle2 
} from 'lucide-react';
import { 
  RAIN_VS_LIMIT_TOWNS, 
  NER_DEFENDER_STATES 
} from '../../data/reliefNewsData';

export function RainLimitsDeck({ lang }) {
  const [rainSurgeMm, setRainSurgeMm] = useState(0);
  const [selectedStateDef, setSelectedStateDef] = useState(NER_DEFENDER_STATES[0]);

  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-[#0c1322] border border-cyan-500/30 space-y-6 shadow-2xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-sky-500/10 border border-sky-500/30 rounded-xl text-sky-400">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Rainfall vs. Safe Danger Limits & NER Defender Matrix
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
                GEOTECHNICAL THRESHOLDS
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Comparative town precipitation against empirical slope failure saturation limits with interactive rain surge testing
            </p>
          </div>
        </div>

        {/* Rain Surge Slider Widget */}
        <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <div className="text-xs">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" /> Test Rain Surge:
            </span>
            <span className="text-sky-400 font-mono font-bold">+{rainSurgeMm} mm</span>
          </div>
          <input
            type="range"
            min="0"
            max="150"
            step="10"
            value={rainSurgeMm}
            onChange={(e) => setRainSurgeMm(Number(e.target.value))}
            className="w-28 sm:w-36 accent-sky-400 cursor-pointer"
          />
        </div>
      </div>

      {/* Top Grid: NER Defender 8-State Risk Overview */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            NER Defender: 8-State Strategic Risk Index (nerdefender.vercel.app)
          </span>
          <span className="text-[10px] font-mono text-slate-500">Live AI Vulnerability Tiers</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {NER_DEFENDER_STATES.map((st) => (
            <div
              key={st.id}
              onClick={() => setSelectedStateDef(st)}
              className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                selectedStateDef.id === st.id
                  ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="text-xs font-bold">{st.name}</div>
              <div className="text-[10px] text-slate-400">{st.capital}</div>
              <div className="text-lg font-mono font-black mt-1 text-cyan-400">{st.risk_score}</div>
              <div className={`mt-1 text-[9px] font-bold uppercase px-1 py-0.5 rounded ${
                st.risk_level === 'Critical' ? 'bg-red-500/20 text-red-300 border border-red-500/40' :
                st.risk_level === 'High' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                st.risk_level === 'Medium' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' :
                'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}>
                {st.risk_level}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Section: Town-by-Town Rain vs Limit Bars */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <CloudRain className="w-4 h-4 text-sky-400" />
            Town 24h Rainfall vs. Safe Danger Limit (in mm):
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            Status shifts in real-time as rain surge slider moves
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RAIN_VS_LIMIT_TOWNS.map((town) => {
            const currentTotalRain = Number((town.rain24h + rainSurgeMm).toFixed(1));
            const isBreached = currentTotalRain >= town.safeLimit;
            const ratio = (currentTotalRain / town.safeLimit);
            
            let dynamicStatus = 'SAFE';
            let dynamicColor = 'text-emerald-400 bg-emerald-500/15 border-emerald-500/35';
            
            if (ratio >= 1.25) {
              dynamicStatus = 'DANGER (COLLAPSE IMMINENT)';
              dynamicColor = 'text-red-400 bg-red-500/20 border-red-500/40 animate-pulse';
            } else if (ratio >= 1.0) {
              dynamicStatus = 'WARNING (LIMIT EXCEEDED)';
              dynamicColor = 'text-orange-400 bg-orange-500/20 border-orange-500/40';
            } else if (ratio >= 0.75) {
              dynamicStatus = 'WATCH (APPROACHING LIMIT)';
              dynamicColor = 'text-amber-400 bg-amber-500/15 border-amber-500/35';
            }

            return (
              <div 
                key={town.id}
                className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 text-xs"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-white text-xs">{town.name}</h4>
                    <p className="text-[11px] text-slate-400">{town.district}, {town.state} • Slope: {town.slope}°</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${dynamicColor}`}>
                    {dynamicStatus}
                  </span>
                </div>

                {/* Metric Bars */}
                <div className="space-y-1 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Current 24h Rain:</span>
                    <span className={`font-bold ${isBreached ? 'text-red-400' : 'text-sky-400'}`}>
                      {currentTotalRain} mm {rainSurgeMm > 0 && `(+${rainSurgeMm} surge)`}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${isBreached ? 'bg-red-500' : 'bg-sky-400'}`}
                      style={{ width: `${Math.min(100, (currentTotalRain / (town.safeLimit * 1.5)) * 100)}%` }}
                    />
                  </div>

                  <div className="flex justify-between pt-1 text-[10px] text-slate-500">
                    <span>Safe Failure Limit: <b>{town.safeLimit} mm</b></span>
                    <span>Saturation Ratio: <b>{(ratio * 100).toFixed(0)}%</b></span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default RainLimitsDeck;
