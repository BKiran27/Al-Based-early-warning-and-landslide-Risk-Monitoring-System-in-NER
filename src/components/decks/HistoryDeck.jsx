import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';
import { translations } from '../../data/translations';
import { historicalIncidences, vulnerableStatesBreakdown } from '../../data/historicalData';

export const HistoryDeck = ({ lang }) => {
  const t = translations[lang] || translations.en;

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#0c1322] border border-slate-800/90 space-y-4 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/90">
        <div className="flex items-center space-x-2 text-sky-400 font-bold text-sm">
          <BarChart3 className="w-5 h-5" />
          <span className="uppercase tracking-wide">{t.historicalTrendsTitle}</span>
        </div>
        <span className="text-xs bg-slate-950 text-slate-400 px-2.5 py-0.5 rounded-full border border-slate-800 font-mono text-[11px]">
          GSI & MDoNER Archive (1998-2025)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Annual Incidences Histogram */}
        <div className="md:col-span-2 bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 flex flex-col justify-between space-y-3">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Annual Landslide Incidences in NER</span>
            <span className="text-rose-400 flex items-center gap-1 font-bold">
              <TrendingUp className="w-3.5 h-3.5" /> +138% Surge Since 2018
            </span>
          </div>

          <div className="flex items-end justify-between gap-2 h-44 pt-4 px-2 border-b border-slate-800/80">
            {historicalIncidences.map((item) => (
              <div key={item.year} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <span className="text-[10px] text-slate-400 font-mono tabular-nums opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.events}
                </span>
                <div
                  className="w-full max-w-[28px] rounded-t-md bg-gradient-to-t from-sky-600 via-sky-500 to-rose-500 transition-all hover:opacity-85"
                  style={{ height: item.height }}
                  title={`${item.year}: ${item.events} events (${item.severe} severe)`}
                />
                <span className="text-[10px] text-slate-400 font-mono mt-1 tabular-nums">
                  {item.year}
                </span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
            Source: ISRO NRSC Landslide Atlas of India (~80,000 spatial records) & Geological Survey of India Bhusanket.
          </p>
        </div>

        {/* Top Vulnerable States Breakdown */}
        <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Top Vulnerable States (NER)
          </h4>
          <div className="space-y-3 text-xs">
            {vulnerableStatesBreakdown.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>{item.state}</span>
                  <b className="font-mono tabular-nums">{item.pct}</b>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: item.pct }} />
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryDeck;
