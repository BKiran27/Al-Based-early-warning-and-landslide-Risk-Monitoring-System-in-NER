import React from 'react';
import { FileText } from 'lucide-react';
import { translations } from '../data/translations';

export const OpconBanner = ({ lang, onOpenSitRep, isSurgeActive }) => {
  const t = translations[lang] || translations.en;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 p-3 rounded-xl bg-[#0a101d] border border-slate-800 shadow-md">
      <div className="flex items-center space-x-2.5 overflow-x-auto max-w-full">
        <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg font-mono text-xs font-black shrink-0 ${
          isSurgeActive 
            ? 'bg-red-500/15 border border-red-500/35 text-red-300' 
            : 'bg-emerald-500/15 border border-emerald-500/35 text-emerald-300'
        }`}>
          <span className={`w-2 h-2 rounded-full ${isSurgeActive ? 'bg-red-400 animate-ping' : 'bg-emerald-400'}`} />
          <span>{isSurgeActive ? t.opconLevel : 'OPCON LEVEL-1: NORMAL MONSOON VIGILANCE'}</span>
        </div>

        {/* State Indicators */}
        <div className="hidden md:flex items-center space-x-2 text-[11px] font-mono text-slate-400 shrink-0">
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1 text-slate-300">
            <span className={`w-1.5 h-1.5 rounded-full ${isSurgeActive ? 'bg-rose-500' : 'bg-emerald-500'}`} />
            <span>SK: <b className={isSurgeActive ? 'text-rose-400' : 'text-emerald-400'}>{isSurgeActive ? 'RED' : 'GREEN'}</b></span>
          </div>
          <div className="flex items-center gap-1 text-slate-300">
            <span className={`w-1.5 h-1.5 rounded-full ${isSurgeActive ? 'bg-rose-500' : 'bg-emerald-500'}`} />
            <span>ML: <b className={isSurgeActive ? 'text-rose-400' : 'text-emerald-400'}>{isSurgeActive ? 'RED' : 'GREEN'}</b></span>
          </div>
          <div className="flex items-center gap-1 text-slate-300">
            <span className={`w-1.5 h-1.5 rounded-full ${isSurgeActive ? 'bg-amber-500' : 'bg-emerald-500'}`} />
            <span>AS: <b className={isSurgeActive ? 'text-amber-400' : 'text-emerald-400'}>{isSurgeActive ? 'ORANGE' : 'GREEN'}</b></span>
          </div>
          <div className="flex items-center gap-1 text-slate-300">
            <span className={`w-1.5 h-1.5 rounded-full ${isSurgeActive ? 'bg-amber-500' : 'bg-emerald-500'}`} />
            <span>AR: <b className={isSurgeActive ? 'text-amber-400' : 'text-emerald-400'}>{isSurgeActive ? 'YELLOW' : 'GREEN'}</b></span>
          </div>
          <div className="flex items-center gap-1 text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>MZ: <b className="text-emerald-400">GREEN</b></span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
        <span className="hidden xl:inline text-[10px] text-slate-500 font-mono">
          {t.shortcutsHint}
        </span>
        <button
          onClick={onOpenSitRep}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 hover:text-white border border-amber-500/35 rounded-xl text-xs font-bold transition shadow-sm active:scale-[0.98]"
        >
          <FileText className="w-3.5 h-3.5 text-amber-400" />
          <span>{t.generateSitRep}</span>
        </button>
      </div>
    </div>
  );
};
