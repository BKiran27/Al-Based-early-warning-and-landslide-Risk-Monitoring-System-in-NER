import React, { useState, useEffect } from 'react';

// Data imports
import { initialHotspots } from './data/hotspots';
import { initialCitizenReports } from './data/initialReports';
import { translations } from './data/translations';

// Service imports
import { initDB, getOfflineReports, syncOfflineReports } from './services/db';

// Component imports (named exports)
import { Header } from './components/Header';
import { SimulationController } from './components/SimulationController';
import { OpconBanner } from './components/OpconBanner';
import { CitizenSafeBanner } from './components/CitizenSafeBanner';
import { EarlyWarningDispatches } from './components/EarlyWarningDispatches';
import { KpiMetrics } from './components/KpiMetrics';
import { GisMapViewer } from './components/GisMapViewer';

// Operational Deck imports
import { RoadsDeck } from './components/decks/RoadsDeck';
import { WeatherDeck } from './components/decks/WeatherDeck';
import { PrioritiesDeck } from './components/decks/PrioritiesDeck';
import { HistoryDeck } from './components/decks/HistoryDeck';
import { CitizenReviewDeck } from './components/decks/CitizenReviewDeck';
import { AiEngineDeck } from './components/decks/AiEngineDeck';
import { IntegrationsDeck } from './components/decks/IntegrationsDeck';
import { GovernanceDeck } from './components/decks/GovernanceDeck';
import { ReliefDeck } from './components/decks/ReliefDeck';
import { BulletinsDeck } from './components/decks/BulletinsDeck';
import { PublicSafetyDeck } from './components/decks/PublicSafetyDeck';
import { RainLimitsDeck } from './components/decks/RainLimitsDeck';

// Modal & Aux imports
import { OfficerLoginModal } from './components/modals/OfficerLoginModal';
import { ReportHazardModal } from './components/modals/ReportHazardModal';
import SitRepModal from './components/modals/SitRepModal';
import SirenModal from './components/modals/SirenModal';
import CapXmlModal from './components/modals/CapXmlModal';
import SmsBroadcastModal from './components/modals/SmsBroadcastModal';
import MobileSimulatorModal from './components/modals/MobileSimulatorModal';
import OfflineSyncBar from './components/OfflineSyncBar';

// Icons for navigation controls
import { 
  Route, CloudRain, ShieldAlert, BarChart3, ClipboardCheck, 
  FileText, Volume2, Code, Cpu, Radio, Building2, MessageSquare, 
  Smartphone, HeartHandshake, Newspaper, LifeBuoy, Share2 
} from 'lucide-react';

export default function App() {
  // App Core State
  const [lang, setLang] = useState('en');
  const [mode, setMode] = useState('tactical'); // 'tactical' | 'citizen'
  const [isSurgeActive, setIsSurgeActive] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [activeDeck, setActiveDeck] = useState('roads'); // 'roads' | 'weather' | 'priorities' | 'history' | 'review' | 'aiEngine' | 'integrations' | 'governance' | 'rainLimits' | 'bulletins' | 'relief' | 'publicSafety'
  const [liveTime, setLiveTime] = useState(new Date());

  // Officer Authentication State
  const [currentOfficer, setCurrentOfficer] = useState(null);
  const [isOfficerModalOpen, setIsOfficerModalOpen] = useState(false);

  // Modals
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSitRepModalOpen, setIsSitRepModalOpen] = useState(false);
  const [isSirenModalOpen, setIsSirenModalOpen] = useState(false);
  const [isCapXmlModalOpen, setIsCapXmlModalOpen] = useState(false);
  const [isSmsModalOpen, setIsSmsModalOpen] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  // Reports & Sync
  const [reports, setReports] = useState(initialCitizenReports);
  const [queuedCount, setQueuedCount] = useState(0);

  // Translation helper
  const t = translations[lang] || translations.en;

  // Live IST Clock
  useEffect(() => {
    const timer = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize offline DB and sync status
  useEffect(() => {
    const setupDB = async () => {
      try {
        await initDB();
        const offlineQueue = await getOfflineReports();
        setQueuedCount(offlineQueue.length);
      } catch (err) {
        console.warn('IndexedDB initial check:', err);
      }
    };
    setupDB();

    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  // Refresh queued count
  const refreshQueueCount = async () => {
    try {
      const offlineQueue = await getOfflineReports();
      setQueuedCount(offlineQueue.length);
    } catch (err) {
      console.warn('Queue refresh error:', err);
    }
  };

  // Sync offline reports
  const handleSyncNow = async () => {
    try {
      const synced = await syncOfflineReports();
      if (synced && synced.length > 0) {
        setReports(prev => [...synced, ...prev]);
        setQueuedCount(0);
      }
    } catch (err) {
      console.error('Failed to sync reports:', err);
    }
  };

  // Add new report handler
  const handleNewReport = (newReport) => {
    setReports(prev => [newReport, ...prev]);
    refreshQueueCount();
  };

  // Verify report in CitizenReviewDeck
  const handleVerifyReport = (id) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'VERIFIED_TRUE_ALARM' } : r));
  };

  // Quick Share Emergency Warning
  const handleQuickShare = () => {
    const shareText = `🚨 URGENT NER LANDSLIDE WARNING: High landslide vulnerability active along steep hill sectors in Sikkim, Meghalaya & Assam. Call 24x7 Emergency Helpline 1070 / 1078. Live GIS Dashboard: https://ner-early-warning-system.vercel.app`;
    if (navigator.share) {
      navigator.share({ title: "NER Landslide Advisory", text: shareText, url: window.location.href });
    } else {
      navigator.clipboard.writeText(shareText);
      alert("Emergency advisory bulletin copied to clipboard!");
    }
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts if typing inside input / textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }

      if (e.key === 'Escape') {
        setIsReportModalOpen(false);
        setIsOfficerModalOpen(false);
        setIsSitRepModalOpen(false);
        setIsSirenModalOpen(false);
        setIsCapXmlModalOpen(false);
        setIsSmsModalOpen(false);
        setIsMobileModalOpen(false);
      } else if (e.key === '1') {
        setActiveDeck('roads');
      } else if (e.key === '2') {
        setActiveDeck('weather');
      } else if (e.key === '3') {
        setActiveDeck('priorities');
      } else if (e.key === '4') {
        setActiveDeck('history');
      } else if (e.key === '5') {
        setActiveDeck('review');
      } else if (e.key === '6') {
        setActiveDeck('aiEngine');
      } else if (e.key === '7') {
        setActiveDeck('integrations');
      } else if (e.key === '8') {
        setActiveDeck('governance');
      } else if (e.key === '9') {
        setActiveDeck('rainLimits');
      } else if (e.key === '0') {
        setActiveDeck('bulletins');
      } else if (e.key === 'u' || e.key === 'U') {
        setActiveDeck('relief');
      } else if (e.key === 'p' || e.key === 'P') {
        setActiveDeck('publicSafety');
      } else if (e.key === 's' || e.key === 'S') {
        setIsSitRepModalOpen(prev => !prev);
      } else if (e.key === 'r' || e.key === 'R') {
        setIsReportModalOpen(prev => !prev);
      } else if (e.key === 'c' || e.key === 'C') {
        setIsSirenModalOpen(prev => !prev);
      } else if (e.key === 'x' || e.key === 'X') {
        setIsCapXmlModalOpen(prev => !prev);
      } else if (e.key === 'w' || e.key === 'W') {
        setIsSmsModalOpen(prev => !prev);
      } else if (e.key === 'm' || e.key === 'M') {
        setIsMobileModalOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen tactical-grid-bg text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black relative">
      
      {/* 1. Header Bar */}
      <Header
        lang={lang}
        setLang={setLang}
        mode={mode}
        setMode={setMode}
        liveTime={liveTime}
        isOnline={isOnline}
        currentOfficer={currentOfficer}
        onOpenLoginModal={() => setIsOfficerModalOpen(true)}
        onLogoutOfficer={() => setCurrentOfficer(null)}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenSitRep={() => setIsSitRepModalOpen(true)}
        onOpenSmsModal={() => setIsSmsModalOpen(true)}
        onOpenMobileModal={() => setIsMobileModalOpen(true)}
        onOpenRelief={() => setActiveDeck('relief')}
        onQuickShare={handleQuickShare}
        isSurgeActive={isSurgeActive}
      />

      {/* 2. Offline Sync Banner (shown if network disconnected or items in queue) */}
      <OfflineSyncBar
        isOnline={isOnline}
        queuedCount={queuedCount}
        onSyncNow={handleSyncNow}
      />

      {/* 3. SIH 2026 Jury Simulation Controller Bar */}
      <SimulationController
        isSurgeActive={isSurgeActive}
        onToggleSurge={(active) => setIsSurgeActive(active)}
        isOnline={isOnline}
        onToggleNetwork={() => setIsOnline(prev => !prev)}
        onOpenCapModal={() => setIsCapXmlModalOpen(true)}
        onOpenSirenModal={() => setIsSirenModalOpen(true)}
        onOpenSitRepModal={() => setIsSitRepModalOpen(true)}
      />

      {/* 4. Threat Status or Citizen Safety Banner */}
      {mode === 'tactical' ? (
        <OpconBanner
          lang={lang}
          onOpenSitRep={() => setIsSitRepModalOpen(true)}
          isSurgeActive={isSurgeActive}
        />
      ) : (
        <CitizenSafeBanner
          lang={lang}
          onOpenReportModal={() => setIsReportModalOpen(true)}
        />
      )}

      {/* 5. Main Operational Dashboard Body */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto p-3 sm:p-5 space-y-5">
        
        {/* Top KPI Telemetry Cards */}
        <KpiMetrics
          lang={lang}
          isSurgeActive={isSurgeActive}
          isOnline={isOnline}
        />

        {/* Live Early Warning Audio Dispatches */}
        <EarlyWarningDispatches lang={lang} />

        {/* Interactive GIS Map & Explainable AI Inspector */}
        <GisMapViewer
          lang={lang}
          hotspots={initialHotspots}
          citizenReports={reports}
          onVerifyReport={handleVerifyReport}
          onOpenSirenModal={() => setIsSirenModalOpen(true)}
          isSurgeActive={isSurgeActive}
          onOpenReportModal={() => setIsReportModalOpen(true)}
          onOpenCapModal={() => setIsCapXmlModalOpen(true)}
        />

        {/* Operational Decks Navigation Tabs */}
        <div className="space-y-4 pt-2">
          
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex flex-wrap items-center gap-2">
              
              <button
                onClick={() => setActiveDeck('roads')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeDeck === 'roads'
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <Route className="w-3.5 h-3.5" />
                <span>Road Corridors</span>
                <span className="ml-1 px-1.5 py-0.2 rounded text-[10px] font-mono bg-black/30">1</span>
              </button>

              <button
                onClick={() => setActiveDeck('weather')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeDeck === 'weather'
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <CloudRain className="w-3.5 h-3.5" />
                <span>Weather & Radar</span>
                <span className="ml-1 px-1.5 py-0.2 rounded text-[10px] font-mono bg-black/30">2</span>
              </button>

              <button
                onClick={() => setActiveDeck('priorities')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeDeck === 'priorities'
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Priorities Matrix</span>
                <span className="ml-1 px-1.5 py-0.2 rounded text-[10px] font-mono bg-black/30">3</span>
              </button>

              <button
                onClick={() => setActiveDeck('history')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeDeck === 'history'
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Decadal Trends</span>
                <span className="ml-1 px-1.5 py-0.2 rounded text-[10px] font-mono bg-black/30">4</span>
              </button>

              <button
                onClick={() => setActiveDeck('review')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeDeck === 'review'
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <ClipboardCheck className="w-3.5 h-3.5" />
                <span>Citizen Review (YOLOv8)</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-500/20 text-red-400 font-bold">
                  {reports.filter(r => r.status !== 'VERIFIED_TRUE_ALARM').length}
                </span>
                <span className="ml-1 px-1.5 py-0.2 rounded text-[10px] font-mono bg-black/30">5</span>
              </button>

              <button
                onClick={() => setActiveDeck('aiEngine')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeDeck === 'aiEngine'
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>AI Predictive Studio</span>
                <span className="ml-1 px-1.5 py-0.2 rounded text-[10px] font-mono bg-black/30">6</span>
              </button>

              <button
                onClick={() => setActiveDeck('integrations')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeDeck === 'integrations'
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>IMD & Satellite Feeds</span>
                <span className="ml-1 px-1.5 py-0.2 rounded text-[10px] font-mono bg-black/30">7</span>
              </button>

              <button
                onClick={() => setActiveDeck('governance')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeDeck === 'governance'
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Climate Governance</span>
                <span className="ml-1 px-1.5 py-0.2 rounded text-[10px] font-mono bg-black/30">8</span>
              </button>

              {/* NEW DECKS from nerdefender.vercel.app & sih-1-iota.vercel.app */}
              <button
                onClick={() => setActiveDeck('rainLimits')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeDeck === 'rainLimits'
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Rain vs Limits (NER Defender)</span>
                <span className="ml-1 px-1.5 py-0.2 rounded text-[10px] font-mono bg-black/30">9</span>
              </button>

              <button
                onClick={() => setActiveDeck('bulletins')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeDeck === 'bulletins'
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <Newspaper className="w-3.5 h-3.5" />
                <span>News & BRO Bulletins</span>
                <span className="ml-1 px-1.5 py-0.2 rounded text-[10px] font-mono bg-black/30">0</span>
              </button>

              <button
                onClick={() => setActiveDeck('relief')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeDeck === 'relief'
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                    : 'bg-slate-900 hover:bg-slate-800 text-rose-300 border border-slate-800'
                }`}
              >
                <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />
                <span>Relief Fund & Aid</span>
                <span className="ml-1 px-1.5 py-0.2 rounded text-[10px] font-mono bg-black/30">U</span>
              </button>

              <button
                onClick={() => setActiveDeck('publicSafety')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeDeck === 'publicSafety'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                    : 'bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-slate-800'
                }`}
              >
                <LifeBuoy className="w-3.5 h-3.5 text-emerald-400" />
                <span>Public Safety & Helplines</span>
                <span className="ml-1 px-1.5 py-0.2 rounded text-[10px] font-mono bg-black/30">P</span>
              </button>

            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsSmsModalOpen(true)}
                className="px-2.5 py-1.5 bg-sky-950/60 hover:bg-sky-900/80 text-sky-300 border border-sky-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Automated SMS & WhatsApp Dispatch [W]"
              >
                <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
                SMS [W]
              </button>
              <button
                onClick={() => setIsMobileModalOpen(true)}
                className="px-2.5 py-1.5 bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 border border-purple-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Field Mobile Responder Simulator [M]"
              >
                <Smartphone className="w-3.5 h-3.5 text-purple-400" />
                Field PWA [M]
              </button>
              <button
                onClick={() => setIsSitRepModalOpen(true)}
                className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Open Official Situation Report [S]"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                SitRep [S]
              </button>
              <button
                onClick={() => setIsSirenModalOpen(true)}
                className="px-2.5 py-1.5 bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Sound Evacuation Siren & Cell Broadcast [C]"
              >
                <Volume2 className="w-3.5 h-3.5 text-red-400" />
                Siren [C]
              </button>
              <button
                onClick={() => setIsCapXmlModalOpen(true)}
                className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="View OASIS CAP 1.2 XML Protocol [X]"
              >
                <Code className="w-3.5 h-3.5 text-emerald-400" />
                CAP [X]
              </button>
            </div>
          </div>

          {/* Active Deck Content */}
          <div>
            {activeDeck === 'roads' && <RoadsDeck lang={lang} />}
            {activeDeck === 'weather' && <WeatherDeck lang={lang} />}
            {activeDeck === 'priorities' && <PrioritiesDeck lang={lang} />}
            {activeDeck === 'history' && <HistoryDeck lang={lang} />}
            {activeDeck === 'review' && (
              <CitizenReviewDeck
                lang={lang}
                reports={reports}
                onVerifyReport={handleVerifyReport}
                onOpenReportModal={() => setIsReportModalOpen(true)}
                currentOfficer={currentOfficer}
                onOpenLoginModal={() => setIsOfficerModalOpen(true)}
                onLogoutOfficer={() => setCurrentOfficer(null)}
              />
            )}
            {activeDeck === 'aiEngine' && <AiEngineDeck lang={lang} />}
            {activeDeck === 'integrations' && <IntegrationsDeck lang={lang} />}
            {activeDeck === 'governance' && <GovernanceDeck lang={lang} />}
            {activeDeck === 'rainLimits' && <RainLimitsDeck lang={lang} />}
            {activeDeck === 'bulletins' && <BulletinsDeck lang={lang} />}
            {activeDeck === 'relief' && <ReliefDeck lang={lang} />}
            {activeDeck === 'publicSafety' && <PublicSafetyDeck lang={lang} />}
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-800 bg-[#060911] px-5 py-6 text-xs text-slate-400">
        <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xs">
              NER
            </div>
            <div>
              <p className="font-bold text-slate-200">
                AI-Based Early Warning and Landslide Risk Monitoring System in NER
              </p>
              <p className="text-[11px] text-slate-500">
                Smart India Hackathon 2026 (SIH26001) | Ministry of Development of North Eastern Region (MDoNER) & NDMA
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px] text-slate-400">
            <span>Protocol: OASIS CAP v1.2</span>
            <span>Vision Engine: YOLOv8 Crack/Debris v1.4</span>
            <span>Geotech: Deterministic Infinite Slope (Fs)</span>
            <span>Explainability: TreeSHAP Kernel Explainer</span>
            <span className="text-cyan-400">Status: All 8 NER States Monitored</span>
          </div>
        </div>
      </footer>

      {/* --- ALL SYSTEM MODALS --- */}
      
      {/* 1. Officer Authentication Modal */}
      <OfficerLoginModal
        isOpen={isOfficerModalOpen}
        onClose={() => setIsOfficerModalOpen(false)}
        onLoginSuccess={(officer) => {
          setCurrentOfficer(officer);
          setIsOfficerModalOpen(false);
        }}
        lang={lang}
      />

      {/* 2. Field Hazard Reporting Modal */}
      <ReportHazardModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmitReport={handleNewReport}
        lang={lang}
      />

      {/* 3. Official Situation Report (SitRep) Modal */}
      {isSitRepModalOpen && (
        <SitRepModal
          onClose={() => setIsSitRepModalOpen(false)}
          isSurgeActive={isSurgeActive}
          currentOfficer={currentOfficer}
        />
      )}

      {/* 4. Synthesized Siren & Cell Broadcast Modal */}
      <SirenModal
        isOpen={isSirenModalOpen}
        onClose={() => setIsSirenModalOpen(false)}
        hotspots={initialHotspots}
        isSurgeActive={isSurgeActive}
      />

      {/* 5. OASIS CAP 1.2 XML Protocol Modal */}
      <CapXmlModal
        isOpen={isCapXmlModalOpen}
        onClose={() => setIsCapXmlModalOpen(false)}
        hotspots={initialHotspots}
        isSurgeActive={isSurgeActive}
      />

      {/* 6. Automated SMS & WhatsApp Early Warning Gateway Modal */}
      <SmsBroadcastModal
        isOpen={isSmsModalOpen}
        onClose={() => setIsSmsModalOpen(false)}
        hotspots={initialHotspots}
        isSurgeActive={isSurgeActive}
      />

      {/* 7. Field Mobile Responder & PWA Simulator Modal */}
      <MobileSimulatorModal
        isOpen={isMobileModalOpen}
        onClose={() => setIsMobileModalOpen(false)}
        onNewReport={handleNewReport}
      />

    </div>
  );
}
