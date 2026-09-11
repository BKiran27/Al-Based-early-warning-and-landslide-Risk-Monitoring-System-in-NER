import React, { useState, useEffect } from 'react';
import { 
  Volume2, VolumeX, AlertOctagon, Radio, ShieldAlert, 
  CheckCircle2, X, RefreshCw, Smartphone, TowerControl 
} from 'lucide-react';
import { startSirenSound, stopSirenSound } from '../../services/audio';

export default function SirenModal({ isOpen, onClose, hotspots, isSurgeActive }) {
  const [isSirenPlaying, setIsSirenPlaying] = useState(false);
  const [selectedHotspotId, setSelectedHotspotId] = useState(hotspots?.[0]?.id || 'sikkim_nh10');
  const [broadcastStatus, setBroadcastStatus] = useState('idle'); // 'idle' | 'broadcasting' | 'dispatched'
  const [broadcastProgress, setBroadcastProgress] = useState(0);
  const [activatedTowers, setActivatedTowers] = useState(0);

  useEffect(() => {
    return () => {
      // Ensure siren stops on unmount
      stopSirenSound();
    };
  }, []);

  const handleToggleSiren = () => {
    if (isSirenPlaying) {
      stopSirenSound();
      setIsSirenPlaying(false);
    } else {
      startSirenSound();
      setIsSirenPlaying(true);
    }
  };

  const handleClose = () => {
    if (isSirenPlaying) {
      stopSirenSound();
      setIsSirenPlaying(false);
    }
    onClose();
  };

  const handleTriggerBroadcast = () => {
    setBroadcastStatus('broadcasting');
    setBroadcastProgress(0);
    setActivatedTowers(0);

    // Auto play siren if not playing
    if (!isSirenPlaying) {
      startSirenSound();
      setIsSirenPlaying(true);
    }

    const interval = setInterval(() => {
      setBroadcastProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setBroadcastStatus('dispatched');
          return 100;
        }
        const next = prev + 10;
        setActivatedTowers(Math.floor((next / 100) * 142));
        return next;
      });
    }, 200);
  };

  if (!isOpen) return null;

  const targetHotspot = hotspots.find(h => h.id === selectedHotspotId) || hotspots[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0c121e] border-2 border-red-500/40 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header Bar with Alert Red Accents */}
        <div className="p-5 border-b border-red-500/30 bg-gradient-to-r from-red-950/70 via-slate-900 to-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-500/20 border border-red-500/40 rounded-xl text-red-400 animate-pulse">
              <AlertOctagon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  Emergency Siren & Cell Broadcast
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/30 text-red-300 border border-red-500/40">
                  CB-4370
                </span>
              </div>
              <p className="text-xs text-red-300/80">
                NDMA SACHET Mass Public Warning & Synthesized Acoustic Siren
              </p>
            </div>
          </div>
          
          <button
            onClick={handleClose}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Target Zone Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <TowerControl className="w-4 h-4 text-cyan-400" />
              Target Vulnerable Sector:
            </label>
            <select
              value={selectedHotspotId}
              onChange={(e) => setSelectedHotspotId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2.5 text-xs font-medium focus:outline-none focus:border-red-500"
            >
              {hotspots.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} ({h.state}) - LSI: {isSurgeActive && h.surgeData ? h.surgeData.lsi : h.lsi} - {h.status}
                </option>
              ))}
            </select>
          </div>

          {/* Audio Siren Control Panel */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl border ${isSirenPlaying ? 'bg-red-500/20 border-red-500/50 text-red-400 animate-pulse' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                {isSirenPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Synthesized Dual-Tone Siren
                </h4>
                <p className="text-[11px] text-slate-400">
                  Web Audio API: 750 Hz ⟷ 1150 Hz undulating frequency
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`inline-block w-2 h-2 rounded-full ${isSirenPlaying ? 'bg-red-500 animate-ping' : 'bg-slate-600'}`}></span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Status: {isSirenPlaying ? 'ACOUSTIC SOUNDING ACTIVE' : 'MUTED / READY'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleToggleSiren}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isSirenPlaying 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600' 
                  : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30'
              }`}
            >
              {isSirenPlaying ? 'Stop Siren' : 'Test Siren Sound'}
            </button>
          </div>

          {/* Cell Broadcast Simulator Panel */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  NDMA SACHET Cell Broadcast Protocol (CB-4370)
                </h4>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                Geo-Fenced GSM/LTE
              </span>
            </div>

            {/* Broadcast Terminal Preview */}
            <div className="p-3 bg-black/60 rounded-lg border border-slate-800 font-mono text-xs space-y-1">
              <div className="text-red-400 font-bold flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" />
                [EMERGENCY EVACUATION ALERT - NDMA / SDRF]
              </div>
              <div className="text-slate-300 text-[11px] leading-relaxed">
                "URGENT: High probability of rapid debris landslide in {targetHotspot.name} within next 2 hours. 
                Move immediately to designated relief shelters on ridge lines. Do NOT attempt to cross riverbeds or steep road cuts."
              </div>
              <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800 flex justify-between">
                <span>Relay: C-DOT Gateway</span>
                <span>Language: EN / Regional Broadcast</span>
              </div>
            </div>

            {/* Progress Bar when broadcasting */}
            {broadcastStatus !== 'idle' && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-400">
                    {broadcastStatus === 'broadcasting' ? 'Injecting packets to Telecom BTS towers...' : 'Cell Broadcast Deployed to All Towers'}
                  </span>
                  <span className="text-cyan-400 font-bold">{broadcastProgress}% ({activatedTowers} Towers)</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 to-amber-400 transition-all duration-200"
                    style={{ width: `${broadcastProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Security & Regulatory Warning */}
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-300/90">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-snug text-[11px]">
              <strong>Standard Operating Procedure:</strong> Activating this protocol will ping cellular towers 
              in the chosen spatial polygon with highest priority audio override and push notifications to all connected handsets.
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Cancel / Close
          </button>

          <button
            onClick={handleTriggerBroadcast}
            disabled={broadcastStatus === 'broadcasting'}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              broadcastStatus === 'dispatched'
                ? 'bg-emerald-600 text-white'
                : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30'
            }`}
          >
            {broadcastStatus === 'broadcasting' ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Broadcasting (CB-4370)...
              </>
            ) : broadcastStatus === 'dispatched' ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Broadcast Dispatched!
              </>
            ) : (
              <>
                <Radio className="w-4 h-4" />
                Dispatch Evacuation Alert
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
