import React from 'react';
import { 
  Sliders, 
  CloudRain, 
  Sun, 
  WifiOff, 
  Wifi, 
  FileCode2, 
  AlertTriangle, 
  FileText, 
  X,
  Play
} from 'lucide-react';

export const SimulationController = ({
  isSurgeActive,
  onToggleSurge,
  isOnline,
  onToggleNetwork,
  onOpenCapModal,
  onOpenSirenModal,
  onOpenSitRepModal,
  onClose
}) => {
  return (
    <div className="p-3.5 rounded-2xl bg-[#0e1628] border-2 border-amber-500/50 shadow-2xl space-y-2.5 animate-in fade-in duration-200">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-300">
              SIH 2026 Jury Demo & Disaster Scenario Simulator
            </h4>
            <p className="text-[10px] text-slate-400 font-mono">
              Deterministic scenario execution conforming to PS SIH26001 Section 17
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          title="Close Simulator Bar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs">
        {/* Scenario 1 & 2: Baseline vs Cloudburst Surge */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 px-1.5 uppercase">Weather Injection:</span>
          <button
            onClick={() => onToggleSurge(false)}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
              !isSurgeActive
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-300" />
            <span>1. Normal Baseline (5mm/h)</span>
          </button>
          <button
            onClick={() => onToggleSurge(true)}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
              isSurgeActive
                ? 'bg-rose-600 text-white shadow-sm animate-pulse'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5 text-sky-300" />
            <span>2. Monsoon Cloudburst (&gt;260mm Surge)</span>
          </button>
        </div>

        {/* Scenario 3: Offline / Online Network Toggle */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={onToggleNetwork}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
              isOnline
                ? 'bg-slate-900 text-slate-300 border border-slate-700 hover:text-white'
                : 'bg-amber-600 text-white shadow-sm'
            }`}
          >
            {isOnline ? (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span>Simulate Offline Disconnect</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-200" />
                <span>Simulate Online Reconnect</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Modal Triggers */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenCapModal}
            className="px-3 py-1.5 rounded-xl font-bold bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-500/30 flex items-center gap-1.5 transition shadow-sm"
          >
            <FileCode2 className="w-3.5 h-3.5 text-sky-400" />
            <span>Export OASIS CAP 1.2 XML</span>
          </button>

          <button
            onClick={onOpenSirenModal}
            className="px-3 py-1.5 rounded-xl font-bold bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/35 flex items-center gap-1.5 transition shadow-sm"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>Evacuation Siren Dispatch</span>
          </button>

          <button
            onClick={onOpenSitRepModal}
            className="px-3 py-1.5 rounded-xl font-bold bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/35 flex items-center gap-1.5 transition shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Official SitRep Memo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
