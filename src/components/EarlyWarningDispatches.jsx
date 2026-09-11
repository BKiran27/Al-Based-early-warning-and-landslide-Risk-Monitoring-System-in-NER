import React, { useState } from 'react';
import { 
  Bell, 
  Radio, 
  ShieldAlert, 
  TriangleAlert, 
  Volume2, 
  VolumeX 
} from 'lucide-react';
import { translations } from '../data/translations';
import { activeAlertsData } from '../data/hotspots';
import { playVoiceAlert, stopVoiceAlert } from '../services/audio';

export const EarlyWarningDispatches = ({ lang }) => {
  const t = translations[lang] || translations.en;
  const [playingAlertId, setPlayingAlertId] = useState(null);

  const handleToggleVoice = (alert) => {
    if (playingAlertId === alert.id) {
      stopVoiceAlert();
      setPlayingAlertId(null);
    } else {
      stopVoiceAlert();
      setPlayingAlertId(alert.id);
      
      const speechText = lang === 'hi' 
        ? `${alert.title_hi || alert.title}। ${alert.desc_hi || alert.description}` 
        : `${alert.title}. ${alert.description}`;

      playVoiceAlert(speechText, lang, () => {
        setPlayingAlertId(null);
      });
    }
  };

  const getAlertLocalization = (alert) => {
    if (lang === 'hi') {
      return {
        title: alert.title_hi || alert.title,
        desc: alert.desc_hi || alert.description,
        leadTime: alert.leadTime_hi || alert.leadTime,
        timestamp: alert.timestamp_hi || alert.timestamp,
        location: `${alert.district_hi || alert.district}, ${alert.state_hi || alert.state}`
      };
    }
    if (lang === 'as') {
      return {
        title: alert.title_as || alert.title,
        desc: alert.desc_as || alert.description,
        leadTime: alert.leadTime_as || alert.leadTime,
        timestamp: alert.timestamp_as || alert.timestamp,
        location: `${alert.district_as || alert.district}, ${alert.state_as || alert.state}`
      };
    }
    if (lang === 'brx') {
      return {
        title: alert.title_brx || alert.title,
        desc: alert.desc_brx || alert.description,
        leadTime: alert.leadTime_brx || alert.leadTime,
        timestamp: alert.timestamp_brx || alert.timestamp,
        location: `${alert.district_brx || alert.district}, ${alert.state_brx || alert.state}`
      };
    }
    if (lang === 'kha') {
      return {
        title: alert.title_kha || alert.title,
        desc: alert.desc_kha || alert.description,
        leadTime: alert.leadTime_kha || alert.leadTime,
        timestamp: alert.timestamp_kha || alert.timestamp,
        location: `${alert.district_kha || alert.district}, ${alert.state_kha || alert.state}`
      };
    }
    return {
      title: alert.title,
      desc: alert.description,
      leadTime: alert.leadTime,
      timestamp: alert.timestamp,
      location: `${alert.district}, ${alert.state}`
    };
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-1">
        <div className="flex items-center space-x-2">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
          </div>
          <h2 className="text-xs font-black uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
            <Bell className="w-3.5 h-3.5" />
            <span>{t.activeAlerts}</span>
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-gray-400 bg-slate-900/80 px-2.5 py-0.5 rounded-full border border-gray-800">
            CAP v1.2 Protocol • NDMA Sachet Sync
          </span>
          <div className="text-[10px] uppercase font-bold tracking-wider bg-rose-500/20 text-rose-300 px-2.5 py-0.5 rounded-full border border-rose-500/40 inline-flex items-center gap-1 shadow-sm shadow-rose-500/20 animate-pulse">
            <Radio className="w-3 h-3 text-rose-400" />
            <span>{t.broadcastLive}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {activeAlertsData.map((alert) => {
          const loc = getAlertLocalization(alert);
          const isSevere = alert.risk_level === 'SEVERE';
          const isPlaying = playingAlertId === alert.id;

          return (
            <div
              key={alert.id}
              className={`relative overflow-hidden p-4 rounded-2xl border transition-all duration-200 group hover:-translate-y-0.5 bg-[#0d1424] border-slate-800 border-l-4 shadow-lg shadow-black/40 ${
                isSevere 
                  ? 'border-l-rose-500 hover:border-slate-700 hover:border-l-rose-400' 
                  : 'border-l-amber-500 hover:border-slate-700 hover:border-l-amber-400'
              }`}
            >
              <div
                className={`absolute -right-8 -top-8 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-20 ${
                  isSevere ? 'bg-rose-500' : 'bg-amber-500'
                }`}
              />
              <div className="flex items-start space-x-3.5 relative z-10">
                <div
                  className={`p-2.5 rounded-xl shrink-0 border ${
                    isSevere
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  }`}
                >
                  {isSevere ? (
                    <ShieldAlert className="w-5 h-5" />
                  ) : (
                    <TriangleAlert className="w-5 h-5" />
                  )}
                </div>

                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-bold tracking-tight text-white group-hover:text-rose-200 transition duration-150 truncate">
                      {loc.title}
                    </h4>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shrink-0 font-mono border ${
                        isSevere
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/35'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/35'
                      }`}
                    >
                      {alert.risk_level}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {loc.desc}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[11px] text-slate-400 border-t border-slate-800/80">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-slate-300">{loc.location}</span>
                      <span className="text-slate-600">•</span>
                      <span className="font-mono text-sky-400 font-semibold bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded text-[10px]">
                        {loc.leadTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggleVoice(alert)}
                        className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition border ${
                          isPlaying
                            ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                            : 'bg-slate-900/90 text-sky-300 border-sky-500/30 hover:bg-sky-600/20 hover:text-white hover:border-sky-500/50'
                        }`}
                        title="Text-to-Speech Voice Broadcast for Low-Literacy Users"
                      >
                        {isPlaying ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-white" />
                            <span>{t.stopVoiceAlert}</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-sky-400" />
                            <span>{t.listenVoiceAlert}</span>
                          </>
                        )}
                      </button>
                      <span className="font-mono text-slate-500 text-[10px] tabular-nums">
                        {loc.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
