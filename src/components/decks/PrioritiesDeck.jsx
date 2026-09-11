import React, { useState } from 'react';
import { ShieldAlert, ArrowUpDown, AlertCircle, Home, Bus } from 'lucide-react';
import { translations } from '../../data/translations';
import { priorityQueue } from '../../data/priorityData';

export const PrioritiesDeck = ({ lang }) => {
  const t = translations[lang] || translations.en;
  const [sortBy, setSortBy] = useState('RANK');

  const sortedList = [...priorityQueue].sort((a, b) => {
    if (sortBy === 'POPULATION') return b.popAtRisk - a.popAtRisk;
    if (sortBy === 'ISOLATION') return b.villagesIsolated - a.villagesIsolated;
    if (sortBy === 'LSI') return b.lsi - a.lsi;
    return a.rank - b.rank;
  });

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#0c1322] border border-slate-800/90 space-y-4 shadow-xl">
      {/* Header & Sorters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-800/90 gap-2.5">
        <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
          <ShieldAlert className="w-5 h-5 animate-pulse" />
          <span className="uppercase tracking-wide">{t.prioritizationTitle}</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 text-[11px] mr-1 flex items-center gap-1">
            <ArrowUpDown className="w-3 h-3" /> Sort By:
          </span>
          <button
            onClick={() => setSortBy('RANK')}
            className={`px-2.5 py-1 rounded-lg border transition text-[11px] font-bold ${
              sortBy === 'RANK'
                ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Priority Rank
          </button>
          <button
            onClick={() => setSortBy('ISOLATION')}
            className={`px-2.5 py-1 rounded-lg border transition text-[11px] font-bold ${
              sortBy === 'ISOLATION'
                ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Villages Cut Off
          </button>
          <button
            onClick={() => setSortBy('POPULATION')}
            className={`px-2.5 py-1 rounded-lg border transition text-[11px] font-bold ${
              sortBy === 'POPULATION'
                ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Population at Risk
          </button>
          <button
            onClick={() => setSortBy('LSI')}
            className={`px-2.5 py-1 rounded-lg border transition text-[11px] font-bold ${
              sortBy === 'LSI'
                ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            AI LSI Score
          </button>
        </div>
      </div>

      {/* Priority Cards */}
      <div className="space-y-3">
        {sortedList.map((item) => (
          <div
            key={item.sectorId}
            className={`p-4 rounded-xl border transition-all duration-200 ${
              item.priorityLevel === 1
                ? 'bg-[#0d1424] border-slate-800 border-l-4 border-l-rose-500 shadow-md hover:border-slate-700 hover:border-l-rose-400'
                : item.priorityLevel === 2
                ? 'bg-[#0d1424] border-slate-800 border-l-4 border-l-amber-500 shadow-md hover:border-slate-700 hover:border-l-amber-400'
                : 'bg-[#0d1424] border-slate-800 border-l-4 border-l-emerald-500 hover:border-slate-700'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-800/80">
              <div className="flex items-start sm:items-center space-x-3">
                <span className={`flex items-center justify-center w-8 h-8 rounded-xl font-mono text-xs font-black shrink-0 ${
                  item.priorityLevel === 1
                    ? 'bg-rose-600 text-white shadow-sm'
                    : item.priorityLevel === 2
                    ? 'bg-amber-600 text-white'
                    : 'bg-emerald-600 text-white'
                }`}>
                  #{item.rank}
                </span>
                <div>
                  <h4 className="text-sm font-black text-white tracking-wide">
                    <span className="text-rose-400">{item.sectorId}</span>: Priority {item.priorityLevel} —{' '}
                    <span className="text-amber-300">{item.villagesIsolated} {item.villagesIsolated === 1 ? 'village' : 'villages'} isolated</span>,{' '}
                    <span className="text-sky-300">{item.popAtRisk.toLocaleString()} population affected</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {item.zone} • <b className="text-slate-300">{item.district}, {item.state}</b>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${item.urgencyColor}`}>
                  {item.urgencyLabel}
                </span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-950 border border-slate-800 text-sky-400 tabular-nums">
                  LSI: {item.lsi.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="pt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400" /> Action Directive
                </span>
                <p className="text-slate-200 leading-relaxed">{item.action}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 space-y-1">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5" /> Cut-Off Hamlets ({item.villagesIsolated})
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {item.isolatedVillageNames.length > 0
                    ? item.isolatedVillageNames.join(', ')
                    : 'None (Direct Highway Connectivity Intact)'}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 space-y-1">
                <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Bus className="w-3.5 h-3.5" /> Resource Mobilization
                </span>
                <div className="space-y-0.5 text-slate-300 leading-relaxed">
                  <p>Unit: <b className="text-white">{item.battalionAssigned}</b></p>
                  <p>Buses: <b className="text-sky-300">{item.evacuationBuses} Dispatched</b> • Route: <span className="text-slate-400">{item.routeStatus}</span></p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrioritiesDeck;
