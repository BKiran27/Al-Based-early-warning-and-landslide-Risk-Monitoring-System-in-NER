import React, { useState } from 'react';
import { WifiOff, RefreshCw, CheckCircle2, Database, AlertCircle } from 'lucide-react';

export default function OfflineSyncBar({ isOnline, queuedCount, onSyncNow }) {
  const [syncing, setSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  if (isOnline && queuedCount === 0 && !syncSuccess) {
    return null;
  }

  const handleSync = async () => {
    setSyncing(true);
    if (onSyncNow) {
      await onSyncNow();
    }
    setSyncing(false);
    setSyncSuccess(true);
    setTimeout(() => {
      setSyncSuccess(false);
    }, 4000);
  };

  return (
    <div className={`w-full px-4 py-2 border-b text-xs flex flex-wrap items-center justify-between gap-3 transition-colors ${
      !isOnline 
        ? 'bg-amber-950/80 border-amber-500/40 text-amber-200' 
        : syncSuccess
          ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200'
          : 'bg-cyan-950/80 border-cyan-500/40 text-cyan-200'
    }`}>
      <div className="flex items-center gap-2">
        {!isOnline ? (
          <>
            <WifiOff className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="font-semibold">OFFLINE MODE (IndexedDB Active):</span>
            <span className="text-slate-300">
              Network disconnected. All incident submissions, coordinates, and photo telemetry are safely buffered locally.
            </span>
          </>
        ) : syncSuccess ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold">SYNC COMPLETE:</span>
            <span className="text-slate-300">
              All queued offline reports have been safely transmitted to the central DEOC server.
            </span>
          </>
        ) : (
          <>
            <Database className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold">CONNECTION RESTORED:</span>
            <span className="text-slate-300">
              Found <strong>{queuedCount}</strong> offline report(s) in local IndexedDB storage.
            </span>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        {isOnline && queuedCount > 0 && !syncSuccess && (
          <button
            onClick={handleSync}
            disabled={syncing}
            className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Sync to DEOC'}
          </button>
        )}
        <span className="text-[10px] font-mono opacity-70">
          Storage: IndexedDB (ner_early_warning_offline_db)
        </span>
      </div>
    </div>
  );
}
