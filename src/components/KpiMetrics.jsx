import React from 'react';
import { Mountain, CloudRain, Radio, Cpu } from 'lucide-react';
import { translations } from '../data/translations';

export const KpiMetrics = ({ lang, isSurgeActive, isOnline }) => {
  const t = translations[lang] || translations.en;

  const currentRain = isSurgeActive ? '260.4' : '18.5';
  const rainSubtext = isSurgeActive 
    ? t.statRainSub 
    : (lang === 'hi' ? 'सामान्य वर्षा स्तर (सीमा के भीतर)' : 'Normal Ambient Rainfall (Within Safe Limit)');
  
  const hotspotsCount = isSurgeActive ? '14' : '4';
  const hotspotsSub = isSurgeActive 
    ? t.statHotspotsSub 
    : (lang === 'hi' ? '0 अति गंभीर (सभी सामान्य)' : '0 Critical Sectors');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
      {/* 1. Critical Hotspots */}
      <div className="relative overflow-hidden p-4 sm:p-4.5 rounded-2xl bg-[#0c1322] border border-slate-800/80 shadow-lg shadow-black/40 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:shadow-xl hover:shadow-black/60 group">
        <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br from-rose-500/20 to-orange-500/20 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="space-y-1.5 flex-1 min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block truncate">
              {t.statCriticalHotspots}
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl lg:text-[32px] font-black font-mono tracking-tight text-white tabular-nums">
                {hotspotsCount}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-300 font-mono tracking-wide">
                {t.statSectorsUnit}
              </span>
            </div>
            <div className="pt-1">
              <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-md border shadow-sm ${
                isSurgeActive 
                  ? 'bg-rose-500/15 text-rose-400 border-rose-500/30' 
                  : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
              }`}>
                {hotspotsSub}
              </span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl border shrink-0 shadow-sm text-rose-400 border-rose-500/30 bg-rose-500/10 group-hover:scale-105 transition-transform duration-200">
            <Mountain className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 2. Peak 48h Precipitation */}
      <div className="relative overflow-hidden p-4 sm:p-4.5 rounded-2xl bg-[#0c1322] border border-slate-800/80 shadow-lg shadow-black/40 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:shadow-xl hover:shadow-black/60 group">
        <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/20 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="space-y-1.5 flex-1 min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block truncate">
              {t.statPrecipitation}
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl lg:text-[32px] font-black font-mono tracking-tight text-white tabular-nums">
                {currentRain}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-300 font-mono tracking-wide">
                mm
              </span>
            </div>
            <div className="pt-1">
              <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-md border shadow-sm ${
                isSurgeActive 
                  ? 'bg-amber-500/15 text-amber-400 border-amber-500/30 animate-pulse' 
                  : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
              }`}>
                {rainSubtext}
              </span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl border shrink-0 shadow-sm text-amber-400 border-amber-500/30 bg-amber-500/10 group-hover:scale-105 transition-transform duration-200">
            <CloudRain className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Active IoT Hill Nodes */}
      <div className="relative overflow-hidden p-4 sm:p-4.5 rounded-2xl bg-[#0c1322] border border-slate-800/80 shadow-lg shadow-black/40 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:shadow-xl hover:shadow-black/60 group">
        <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="space-y-1.5 flex-1 min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block truncate">
              {t.statIoTHillNodes}
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl lg:text-[32px] font-black font-mono tracking-tight text-white tabular-nums">
                48 / 48
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-300 font-mono tracking-wide">
                Online
              </span>
            </div>
            <div className="pt-1">
              <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-md border bg-emerald-500/15 text-emerald-400 border-emerald-500/30 shadow-sm">
                {t.statIoTUptime}
              </span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl border shrink-0 shadow-sm text-emerald-400 border-emerald-500/30 bg-emerald-500/10 group-hover:scale-105 transition-transform duration-200">
            <Radio className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 4. Hybrid AI Inference Engine */}
      <div className="relative overflow-hidden p-4 sm:p-4.5 rounded-2xl bg-[#0c1322] border border-slate-800/80 shadow-lg shadow-black/40 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:shadow-xl hover:shadow-black/60 group">
        <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br from-sky-500/20 to-indigo-500/20 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="space-y-1.5 flex-1 min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block truncate">
              {t.statHybridAiEngine}
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl lg:text-[32px] font-black font-mono tracking-tight text-white tabular-nums">
                {isOnline ? 'ONLINE' : 'EDGE'}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-300 font-mono tracking-wide">
                v2.0
              </span>
            </div>
            <div className="pt-1">
              <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-md border bg-sky-500/15 text-sky-400 border-sky-500/30 shadow-sm">
                {isOnline ? t.statAiSubOnline : t.statAiSubOffline}
              </span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl border shrink-0 shadow-sm text-sky-400 border-sky-500/30 bg-sky-500/10 group-hover:scale-105 transition-transform duration-200">
            <Cpu className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};
