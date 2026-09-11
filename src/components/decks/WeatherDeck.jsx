import React, { useState } from 'react';
import { CloudRain, Radio, Droplets, Wind, Compass } from 'lucide-react';
import { translations } from '../../data/translations';
import { weatherTimeline, dopplerData } from '../../data/weatherData';

export const WeatherDeck = ({ lang }) => {
  const t = translations[lang] || translations.en;
  const [filter, setFilter] = useState('ALL');

  const filteredItems = filter === 'NOWCAST'
    ? weatherTimeline.slice(0, 3)
    : filter === 'EXTENDED'
    ? weatherTimeline.slice(3)
    : weatherTimeline;

  const maxRain = Math.max(...weatherTimeline.map(w => w.rainfall));

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#0c1322] border border-slate-800/90 space-y-5 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-slate-800/90 gap-2.5">
        <div className="flex items-center space-x-2 text-sky-400 font-bold text-sm">
          <CloudRain className="w-5 h-5" />
          <span className="uppercase tracking-wide">{t.weatherForecastTitle}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-slate-950 border border-slate-800 p-0.5 rounded-xl text-xs">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1 rounded-lg font-bold transition text-[11px] ${
                filter === 'ALL' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              All (48h)
            </button>
            <button
              onClick={() => setFilter('NOWCAST')}
              className={`px-3 py-1 rounded-lg font-bold transition text-[11px] ${
                filter === 'NOWCAST' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.nowcast6h}
            </button>
            <button
              onClick={() => setFilter('EXTENDED')}
              className={`px-3 py-1 rounded-lg font-bold transition text-[11px] ${
                filter === 'EXTENDED' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.extendedForecast}
            </button>
          </div>
          <span className="text-xs bg-sky-500/10 border border-sky-500/25 text-sky-400 px-2.5 py-1 rounded-xl font-mono text-[11px]">
            IMD Doppler AWS • Cherrapunji Radar Sync
          </span>
        </div>
      </div>

      {/* Doppler Radar Echogram & Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center space-x-3.5">
          <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-400 shrink-0">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
              {t.dopplerEcho}
            </span>
            <p className="text-xl font-black text-rose-400 font-mono tabular-nums">
              {dopplerData.radarEchoDbz} <span className="text-xs text-rose-300">dBZ</span>
            </p>
            <span className="text-[10px] text-slate-500 block truncate">
              {dopplerData.severeCellIdentified}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center space-x-3.5">
          <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/25 text-sky-400 shrink-0">
            <Wind className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
              Storm Vector & Cloud Top
            </span>
            <p className="text-xl font-black text-sky-400 font-mono tabular-nums">
              {dopplerData.stormVelocityKmh} <span className="text-xs text-sky-300">km/h</span> • {dopplerData.cloudTopKm} km
            </p>
            <span className="text-[10px] text-slate-500 block truncate">
              Heading {dopplerData.cellDirection}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center space-x-3.5">
          <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-400 shrink-0">
            <Droplets className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
              {t.cumulativeOutlook}
            </span>
            <p className="text-xl font-black text-blue-400 font-mono tabular-nums">
              271.0 <span className="text-xs text-blue-300">mm Total</span>
            </p>
            <span className="text-[10px] text-slate-500 block truncate">
              94% Saturated Pore Pressure
            </span>
          </div>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-4">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-200">
            Hydrograph: Rainfall Intensity Rate & Cumulative Precipitation
          </span>
          <span className="text-slate-400 font-mono text-[11px]">
            Units: mm/h (Hourly Surge) vs Cumulative (mm)
          </span>
        </div>

        <div className="flex items-end justify-between gap-2.5 h-44 pt-4 px-2 border-b border-slate-800">
          {filteredItems.map((item, idx) => {
            const heightPct = Math.round((item.rainfall / maxRain) * 100);
            const isCritical = item.riskScore >= 0.75;
            const isHigh = item.riskScore >= 0.55;

            return (
              <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group">
                <span className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity tabular-nums">
                  {item.rainfall}mm
                </span>
                <div
                  className={`w-full max-w-[34px] rounded-t-md transition-all duration-300 group-hover:brightness-125 ${
                    isCritical
                      ? 'bg-gradient-to-t from-rose-600 via-rose-500 to-amber-400'
                      : isHigh
                      ? 'bg-gradient-to-t from-amber-600 via-amber-500 to-sky-400'
                      : 'bg-gradient-to-t from-sky-600 to-sky-400'
                  }`}
                  style={{ height: `${heightPct}%` }}
                  title={`${item.time} (${item.period}): ${item.rainfall} mm/h rainfall | Cum: ${item.cumulativeRain} mm | Sat: ${item.soilSaturation}%`}
                />
                <span className="text-[10px] font-mono text-slate-400 mt-2 truncate max-w-full">
                  {item.time.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Detailed Timeline Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#080d1a] font-mono text-[10px] uppercase text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-2">Time Offset</th>
                <th className="p-2">Period</th>
                <th className="p-2">Hourly Intensity</th>
                <th className="p-2">Cumulative Rain</th>
                <th className="p-2">Soil Saturation</th>
                <th className="p-2">Wind (km/h)</th>
                <th className="p-2">Trigger Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
              {filteredItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition">
                  <td className="p-2 font-bold text-white">{item.time}</td>
                  <td className="p-2 text-slate-400">{item.period}</td>
                  <td className="p-2 text-sky-400 tabular-nums">{item.rainfall} mm/h</td>
                  <td className="p-2 text-blue-300 tabular-nums">{item.cumulativeRain} mm</td>
                  <td className="p-2 text-amber-300 tabular-nums">{item.soilSaturation}%</td>
                  <td className="p-2 text-slate-400 tabular-nums">{item.windKmh}</td>
                  <td className="p-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.riskScore >= 0.75
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : item.riskScore >= 0.55
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WeatherDeck;
