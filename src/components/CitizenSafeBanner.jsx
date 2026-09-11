import React from 'react';
import { Camera, PhoneCall } from 'lucide-react';
import { translations } from '../data/translations';

export const CitizenSafeBanner = ({ lang, onOpenReportModal }) => {
  const t = translations[lang] || translations.en;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-emerald-950/40 border border-emerald-500/30 shadow-md">
      <div className="flex items-center space-x-3">
        <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        <div>
          <div className="text-xs font-bold text-white flex items-center gap-2">
            <span>{t.safetyAdvisoryTitle}</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-mono font-bold">
              {t.officialSdrfAdvisory}
            </span>
          </div>
          <p className="text-[11px] text-slate-300 mt-0.5">
            {t.safetyAdvisoryDesc}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
        <a
          href="tel:1070"
          className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-sm shadow-emerald-600/25"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>{t.helplineTollFree}</span>
        </a>
        <button
          onClick={onOpenReportModal}
          className="flex items-center space-x-1 px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition shadow-sm"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>{t.reportHazard}</span>
        </button>
      </div>
    </div>
  );
};
