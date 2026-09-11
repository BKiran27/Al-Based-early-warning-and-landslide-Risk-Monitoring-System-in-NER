import React from 'react';
import { Route, ArrowRight, Home, Users, Clock } from 'lucide-react';
import { translations } from '../../data/translations';
import { roadCorridorsTable } from '../../data/roadCorridors';

export const RoadsDeck = ({ lang }) => {
  const t = translations[lang] || translations.en;

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#0c1322] border border-slate-800/90 space-y-4 shadow-xl">
      {/* Deck Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-slate-800/90 gap-2">
        <div className="flex items-center space-x-2 text-sky-400 font-bold text-sm">
          <Route className="w-5 h-5" />
          <span className="uppercase tracking-wide">{t.roadStatusTitle}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs bg-slate-900 text-slate-400 px-2.5 py-1 rounded-xl border border-slate-800 font-mono text-[11px]">
            {t.broTrafficFeed}
          </span>
          <span className="text-xs bg-rose-500/15 text-rose-300 px-2.5 py-0.5 rounded-lg border border-rose-500/35 font-bold">
            {t.blockedCorridorsCount}
          </span>
        </div>
      </div>

      {/* 4 Emergency Logistics Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-[#080d1a] border border-slate-800 text-xs">
        <div className="space-y-0.5">
          <span className="text-[10px] text-slate-400">{t.strandedTrucks}</span>
          <p className="text-sm font-black text-amber-400 font-mono tabular-nums">
            142 {lang === 'hi' ? 'वाहन' : 'Vehicles'}
          </p>
          <span className="text-[10px] text-slate-500">
            {lang === 'hi' ? 'सेवोक चेकपोस्ट पर रुके वाहन' : 'Staged at Sevoke Checkpost'}
          </span>
        </div>
        <div className="space-y-0.5">
          <span className="text-[10px] text-slate-400">{t.medicalOxygenConvoys}</span>
          <p className="text-sm font-black text-emerald-400 font-mono">
            {lang === 'hi' ? 'लावा होकर डायवर्ट' : 'Diverted via Lava'}
          </p>
          <span className="text-[10px] text-emerald-400/80">
            {lang === 'hi' ? 'ग्रीन कॉरिडोर सक्रिय' : 'Green Corridor Active'}
          </span>
        </div>
        <div className="space-y-0.5">
          <span className="text-[10px] text-slate-400">{t.civilianFuelReserves}</span>
          <p className="text-sm font-black text-white font-mono tabular-nums">
            94 {lang === 'hi' ? 'घंटे' : 'Hours'}
          </p>
          <span className="text-[10px] text-slate-500">
            {lang === 'hi' ? 'गंगटोक आईओसीएल बफर' : 'Gangtok IOCL Depot Buffer'}
          </span>
        </div>
        <div className="space-y-0.5">
          <span className="text-[10px] text-slate-400">{t.broEarthmovers}</span>
          <p className="text-sm font-black text-sky-400 font-mono tabular-nums">
            4 JCB {lang === 'hi' ? 'तैनात' : 'Deployed'}
          </p>
          <span className="text-[10px] text-sky-400/80">
            {lang === 'hi' ? 'किमी 29 कटाव स्थल पर' : 'At Km 29 Breach Site'}
          </span>
        </div>
      </div>

      {/* Corridor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {roadCorridorsTable.map((road) => {
          const isBlocked = road.status === 'BLOCKED';
          const isRisk = road.status === 'HIGH_RISK_ONE_WAY';

          return (
            <div
              key={road.id}
              className={`p-4 rounded-xl border space-y-3 transition-all duration-200 hover:border-slate-700 ${
                isBlocked
                  ? 'bg-[#0d1424] border-slate-800 border-l-4 border-l-rose-500 shadow-md'
                  : isRisk
                  ? 'bg-[#0d1424] border-slate-800 border-l-4 border-l-amber-500 shadow-md'
                  : 'bg-[#0d1424] border-slate-800 border-l-4 border-l-emerald-500'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide">{road.highway}</h4>
                  <p className="text-xs text-slate-400">{road.section}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider shrink-0 font-mono ${road.statusColor}`}>
                  {road.status === 'BLOCKED'
                    ? (lang === 'hi' ? 'अवरुद्ध' : 'BLOCKED')
                    : road.status === 'HIGH_RISK_ONE_WAY'
                    ? (lang === 'hi' ? 'उच्च जोखिम (एकतरफा)' : 'HIGH RISK ONE WAY')
                    : road.status === 'CAUTION'
                    ? (lang === 'hi' ? 'सावधानी' : 'CAUTION')
                    : (lang === 'hi' ? 'चालू' : 'OPERATIONAL')}
                </span>
              </div>

              {/* Corridor Milestone Chain for Blocked Route */}
              {isBlocked && (
                <div className="p-2.5 rounded-lg bg-[#080d1a] border border-slate-800/80 space-y-1.5 font-mono text-[10px]">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>{lang === 'hi' ? 'कॉरिडोर मील का पत्थर शृंखला:' : 'Corridor Milestone Chain:'}</span>
                    <span className="text-rose-400 font-bold">{lang === 'hi' ? 'किमी 29 पर मार्ग टूटा' : 'BREACH AT KM 29'}</span>
                  </div>
                  <div className="flex items-center gap-1 overflow-x-auto py-1 text-slate-300">
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 shrink-0">Sevoke (Km 0)</span>
                    <span className="text-slate-600 shrink-0">→</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 shrink-0">Kalijhora (Km 18)</span>
                    <span className="text-slate-600 shrink-0">→</span>
                    <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold animate-pulse shrink-0">
                      ⛔ Km 29 ({lang === 'hi' ? 'अवरोध' : 'BREACH'})
                    </span>
                    <span className="text-slate-600 shrink-0">→</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">Teesta (Km 34)</span>
                    <span className="text-slate-600 shrink-0">→</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">Gangtok (Km 114)</span>
                  </div>
                </div>
              )}

              <p className="text-xs text-slate-300 leading-relaxed">
                <span className="text-slate-400 font-semibold">{t.hazardLabel}</span> {road.cause}
              </p>

              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs flex items-start gap-2 text-sky-300">
                <ArrowRight className="w-3.5 h-3.5 mt-0.5 shrink-0 text-sky-400" />
                <span className="leading-relaxed">{road.detour}</span>
              </div>

              {/* Cut-off Villages & Population */}
              <div className={`p-2.5 rounded-lg border text-xs space-y-1.5 ${
                isBlocked
                  ? 'bg-rose-950/20 border-rose-500/25 text-rose-200'
                  : isRisk
                  ? 'bg-amber-950/20 border-amber-500/25 text-amber-200'
                  : 'bg-emerald-950/20 border-emerald-500/20 text-emerald-300'
              }`}>
                <div className="flex items-center justify-between font-bold text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5" />
                    <span>{t.villagesIsolated}: <b className="tabular-nums">{road.villagesIsolated}</b></span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>{t.populationAffected}: <b>{road.populationAffected}</b></span>
                  </div>
                </div>
                {road.isolatedVillages.length > 0 && (
                  <p className="text-[11px] opacity-90 leading-tight">
                    <b>Cut-Off Communities:</b> {road.isolatedVillages.join(', ')}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {t.clearanceEtaLabel} <b className="text-slate-200">{road.eta}</b>
                </span>
                <span className="font-mono text-[10px] text-slate-500">{road.id}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadsDeck;
