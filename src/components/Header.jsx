import React from 'react';
import { 
  Shield, 
  Users, 
  Camera, 
  Clock, 
  Globe, 
  RefreshCw, 
  LogOut, 
  Radio, 
  Sliders,
  MessageSquare,
  Smartphone,
  HeartHandshake,
  Share2
} from 'lucide-react';
import { translations } from '../data/translations';

export const Header = ({
  lang,
  setLang,
  mode,
  setMode,
  liveTime,
  isOnline,
  currentOfficer,
  onOpenLoginModal,
  onLogoutOfficer,
  onOpenReportModal,
  onOpenSmsModal,
  onOpenMobileModal,
  onOpenRelief,
  onQuickShare,
  onToggleSimController,
  showSimController
}) => {
  const t = translations[lang] || translations.en;

  return (
    <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-3.5 sm:p-4.5 rounded-2xl bg-[#0c1322] border border-slate-800/90 shadow-xl">
      {/* Brand & Identity */}
      <div className="flex items-center space-x-3">
        <div className="p-2.5 sm:p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 shrink-0 shadow-inner">
          <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <h1 className="text-sm sm:text-base md:text-lg font-black tracking-tight text-white uppercase truncate">
              {mode === 'citizen' ? t.citizenPortalTitle : t.title}
            </h1>
            <span className={`text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full border font-bold shrink-0 ${
              mode === 'citizen'
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/35'
                : 'bg-sky-500/15 text-sky-300 border-sky-500/35'
            }`}>
              {mode === 'citizen' ? t.publicSafetyView : 'SIH26001 • MDoNER • NDMA'}
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 truncate">
            {mode === 'citizen' ? t.citizenPortalSubtitle : t.subtitle}
          </p>
        </div>
      </div>

      {/* Action Controls & Navigation */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {/* Tactical vs Citizen Switch */}
        <div className="flex items-center bg-slate-950 p-0.5 rounded-xl border border-slate-800 shadow-sm text-xs">
          <button
            onClick={() => setMode('command')}
            className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
              mode === 'command'
                ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Full Tactical Command: InSAR telemetry, raw sensor streams & SitRep memorandum"
          >
            <Shield className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">{t.tacticalCommand}</span>
            <span className="sm:hidden">{lang === 'hi' ? 'कमांड' : 'Command'}</span>
          </button>
          <button
            onClick={() => setMode('citizen')}
            className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
              mode === 'citizen'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Citizen Safe View: Jargon-free road status, helplines & 1-click hazard reporting"
          >
            <Users className="w-3.5 h-3.5 text-emerald-300" />
            <span className="hidden sm:inline">{t.citizenSafeView}</span>
            <span className="sm:hidden">{lang === 'hi' ? 'नागरिक' : 'Citizen'}</span>
          </button>
        </div>

        {/* Report Hazard Button */}
        <button
          onClick={onOpenReportModal}
          className="flex items-center space-x-1.5 text-xs bg-rose-600 hover:bg-rose-500 text-white font-bold uppercase tracking-wide px-3 py-2 rounded-xl shadow-sm hover:shadow-rose-600/30 active:scale-[0.98] transition-all duration-150"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>{t.reportHazard}</span>
        </button>

        {/* Live IST Clock */}
        <div className="flex items-center space-x-1.5 text-xs bg-slate-950 border border-slate-800 px-2.5 py-2 rounded-xl text-slate-300 font-mono tabular-nums shadow-sm">
          <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-[11px] font-semibold">
            {liveTime instanceof Date 
              ? `${liveTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })} IST`
              : (typeof liveTime === 'string' ? liveTime : 'LIVE IST')}
          </span>
        </div>

        {/* AI Engine Status Badge */}
        {isOnline ? (
          <div className="flex items-center space-x-1.5 text-xs bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 px-2.5 py-2 rounded-xl font-medium shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="hidden sm:inline font-semibold">{t.aiOnline}</span>
            <span className="sm:hidden font-mono font-bold text-[10px]">AI OK</span>
          </div>
        ) : (
          <div className="flex items-center space-x-1.5 text-xs bg-amber-500/15 border border-amber-500/35 text-amber-300 px-2.5 py-2 rounded-xl font-medium shadow-sm animate-pulse">
            <Radio className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="hidden sm:inline font-semibold font-mono">AI Engine: LOCAL (Edge Cache)</span>
            <span className="sm:hidden font-mono font-bold text-[10px]">AI LOCAL</span>
          </div>
        )}

        {/* Multilingual Selector */}
        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-0.5 text-xs shadow-sm overflow-x-auto max-w-full">
          <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-1 shrink-0" />
          <button
            onClick={() => setLang('en')}
            className={`px-2 py-1 rounded-lg transition text-[11px] font-bold shrink-0 ${
              lang === 'en' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang('hi')}
            className={`px-2 py-1 rounded-lg transition text-[11px] font-bold shrink-0 ${
              lang === 'hi' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            हिन्दी
          </button>
          <button
            onClick={() => setLang('as')}
            className={`px-2 py-1 rounded-lg transition text-[11px] font-bold shrink-0 ${
              lang === 'as' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            অসমীয়া
          </button>
          <button
            onClick={() => setLang('brx')}
            className={`px-2 py-1 rounded-lg transition text-[11px] font-bold shrink-0 ${
              lang === 'brx' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
            title="Bodo Language (बर' राव)"
          >
            बर'
          </button>
          <button
            onClick={() => setLang('kha')}
            className={`px-2 py-1 rounded-lg transition text-[11px] font-bold shrink-0 ${
              lang === 'kha' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
            title="Khasi Language (Ka Ktien Khasi)"
          >
            Khasi
          </button>
        </div>

        {/* Officer Login State */}
        {currentOfficer ? (
          <div className="flex items-center space-x-1.5">
            <div className="flex items-center space-x-1.5 text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-2.5 py-1.5 rounded-xl font-medium shadow-sm">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-bold text-[11px] truncate max-w-[120px]">{currentOfficer.name}</span>
            </div>
            <button
              onClick={onLogoutOfficer}
              className="flex items-center space-x-1 text-xs bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 hover:text-white font-bold px-2 py-1.5 rounded-xl border border-rose-500/30 transition shadow-sm"
              title="Logout of Officer Mode"
            >
              <LogOut className="w-3 h-3 text-rose-400" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenLoginModal}
            className="flex items-center space-x-1.5 text-xs bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-bold px-3 py-2 rounded-xl border border-slate-700 hover:border-slate-600 transition shadow-sm"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.officerLogin}</span>
          </button>
        )}

        {/* SMS / WhatsApp Early Warning Gateway */}
        <button
          onClick={onOpenSmsModal}
          className="flex items-center space-x-1.5 text-xs bg-sky-950/60 hover:bg-sky-900/80 text-sky-300 font-bold px-2.5 py-2 rounded-xl border border-sky-500/40 transition shadow-sm shrink-0 cursor-pointer"
          title="Automated SMS & WhatsApp Evacuation Gateway [W]"
        >
          <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden xl:inline">SMS / WhatsApp</span>
        </button>

        {/* Mobile PWA Field Simulator */}
        <button
          onClick={onOpenMobileModal}
          className="flex items-center space-x-1.5 text-xs bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 font-bold px-2.5 py-2 rounded-xl border border-purple-500/40 transition shadow-sm shrink-0 cursor-pointer"
          title="Field Mobile Responder & PWA Simulator [M]"
        >
          <Smartphone className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden xl:inline">Field PWA</span>
        </button>

        {/* Disaster Relief Fund (SIH-1-IOTA) */}
        <button
          onClick={onOpenRelief}
          className="flex items-center space-x-1.5 text-xs bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 font-bold px-2.5 py-2 rounded-xl border border-rose-500/40 transition shadow-sm shrink-0 cursor-pointer"
          title="Disaster Relief Fund & Community Aid [U]"
        >
          <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />
          <span className="hidden xl:inline">Relief Fund</span>
        </button>

        {/* 1-Click Share Advisory */}
        <button
          onClick={onQuickShare}
          className="flex items-center space-x-1.5 text-xs bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 font-bold px-2.5 py-2 rounded-xl border border-emerald-500/40 transition shadow-sm shrink-0 cursor-pointer"
          title="Share Emergency Warning Bulletin"
        >
          <Share2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden xl:inline">Share Warning</span>
        </button>

        {/* Jury Simulation Controller Toggle */}
        <button
          onClick={onToggleSimController}
          className={`flex items-center space-x-1 text-xs p-2 rounded-xl border transition shadow-sm shrink-0 ${
            showSimController
              ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
              : 'bg-slate-900 hover:bg-slate-800 text-amber-400 border-slate-700'
          }`}
          title="SIH 2026 Jury Disaster Scenario Simulator"
        >
          <Sliders className="w-3.5 h-3.5" />
        </button>

        {/* Refresh Streams */}
        <button
          onClick={() => window.location.reload()}
          className="flex items-center space-x-1 text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 p-2 rounded-xl border border-slate-700 hover:border-slate-600 transition shadow-sm shrink-0"
          title="Refresh All Real-time Streams"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
