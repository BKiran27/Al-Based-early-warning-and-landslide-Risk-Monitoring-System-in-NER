import React, { useState, useEffect } from 'react';
import { 
  ClipboardCheck, 
  Camera, 
  MapPin, 
  Check, 
  X, 
  Lock, 
  GraduationCap, 
  Send, 
  Clock, 
  Shield, 
  Video, 
  Eye, 
  Sparkles,
  History
} from 'lucide-react';
import { translations } from '../../data/translations';
import { offlineDB } from '../../services/db';
import { activeAlertsData } from '../../data/hotspots';

export const CitizenReviewDeck = ({
  lang,
  reports = [],
  onVerifyReport,
  onLocateOnMap,
  onOpenReportModal,
  currentOfficer,
  onOpenLoginModal,
  onLogoutOfficer
}) => {
  const t = translations[lang] || translations.en;

  // Retraining Form State
  const [selectedAlertId, setSelectedAlertId] = useState(101);
  const [feedbackType, setFeedbackType] = useState('CONFIRMED');
  const [observedRain, setObservedRain] = useState('265');
  const [officerNotes, setOfficerNotes] = useState('');
  const [feedbackLogs, setFeedbackLogs] = useState([
    {
      id: "FB-01",
      alertId: 101,
      alertTitle: "RED ALERT: Imminent Slope Failure Threat in East Khasi Hills",
      feedbackType: "CONFIRMED",
      officerName: "Major Arvind Sharma",
      officerBadge: "NDRF-NER-884",
      notes: "Confirmed 6m toe blowout along NH-206. Evacuation order validated.",
      observedRainfall: 285.5,
      timestamp: Date.now() - 3600000,
    },
    {
      id: "FB-02",
      alertId: 102,
      alertTitle: "ORANGE ALERT: Highway Toe Erosion & InSAR Creep",
      feedbackType: "CONFIRMED",
      officerName: "Inspector T. Lepcha",
      officerBadge: "SDRF-SK-102",
      notes: "Active riverbank scouring observed at 29th Mile. One-way transit enforced.",
      observedRainfall: 142.0,
      timestamp: Date.now() - 7200000,
    }
  ]);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedbackSuccessMsg, setFeedbackSuccessMsg] = useState(null);

  // Supreme Feature: YOLOv8 Computer Vision Inspector Overlay Toggle
  const [showYoloVision, setShowYoloVision] = useState(true);

  // Load feedback logs from IndexedDB
  useEffect(() => {
    (async () => {
      try {
        const stored = await offlineDB.getFeedbackLogs();
        if (stored && stored.length > 0) {
          setFeedbackLogs(prev => {
            const seen = new Set(stored.map(s => s.id));
            const filteredPrev = prev.filter(p => !seen.has(p.id));
            return [...stored, ...filteredPrev];
          });
        }
      } catch (err) {
        console.warn("Could not load feedback logs from IndexedDB:", err);
      }
    })();
  }, []);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingFeedback(true);

    const alertItem = activeAlertsData.find(a => a.id === selectedAlertId);
    const alertTitle = alertItem ? alertItem.title : "Unflagged Missed Event Incident";
    const officerName = currentOfficer?.name || "Field Disaster Commander";
    const officerBadge = currentOfficer?.badge || "NDRF-NER-884";

    const newFeedback = {
      id: `FB-${Date.now().toString().slice(-4)}`,
      alertId: selectedAlertId,
      alertTitle,
      feedbackType,
      officerName,
      officerBadge,
      notes: officerNotes.trim() || `Officer verified ground condition as ${feedbackType}.`,
      observedRainfall: parseFloat(observedRain) || undefined,
      timestamp: Date.now(),
    };

    try {
      await offlineDB.saveFeedback(newFeedback);
    } catch (err) {
      console.warn("IndexedDB feedback save failed:", err);
    }

    setFeedbackLogs(prev => [newFeedback, ...prev]);
    setIsSubmittingFeedback(false);
    setOfficerNotes('');
    setFeedbackSuccessMsg(`Logged: Alert marked as ${feedbackType}. XGBoost/PyTorch pipeline queue updated.`);
    setTimeout(() => setFeedbackSuccessMsg(null), 4000);
  };

  return (
    <div className="space-y-5">
      {/* 1. Citizen Incident Queue */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0c1322] border border-slate-800/90 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-slate-800/90 gap-2">
          <div className="flex items-center space-x-2 text-sky-400 font-bold text-sm">
            <ClipboardCheck className="w-5 h-5" />
            <span className="uppercase tracking-wide">{t.citizenReviewTitle}</span>
            <span className="text-xs bg-sky-500/15 text-sky-300 font-mono px-2 py-0.5 rounded-full border border-sky-500/35 font-bold tabular-nums">
              {reports.length} Total
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* YOLOv8 Vision Scanner Toggle */}
            <button
              onClick={() => setShowYoloVision(prev => !prev)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition shadow-sm ${
                showYoloVision
                  ? 'bg-purple-600/20 text-purple-300 border-purple-500/50'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
              title="Toggle AI YOLOv8 Computer Vision Bounding Boxes on field media"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>YOLOv8 Vision Inspector: {showYoloVision ? 'ON' : 'OFF'}</span>
            </button>

            {onOpenReportModal && (
              <button
                onClick={onOpenReportModal}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{t.reportHazard}</span>
              </button>
            )}

            {currentOfficer ? (
              <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-xl">
                <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-xs text-emerald-300 font-bold truncate max-w-[120px]">
                  {currentOfficer.name}
                </span>
                <span className="text-[10px] text-emerald-400/80 font-mono hidden sm:inline">
                  ({currentOfficer.badge || 'Verified'})
                </span>
              </div>
            ) : (
              onOpenLoginModal && (
                <button
                  onClick={onOpenLoginModal}
                  className="px-3 py-1.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                  title="Authenticate with official badge to verify citizen reports"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.officerLoginToVerify}</span>
                </button>
              )
            )}
          </div>
        </div>

        {/* Incident List */}
        <div className="space-y-3">
          {reports.length === 0 ? (
            <div className="text-center py-8 text-slate-400 space-y-2">
              <Camera className="w-8 h-8 mx-auto text-slate-600" />
              <p className="text-xs">No citizen reports recorded yet.</p>
            </div>
          ) : (
            reports.map((report) => (
              <div
                key={report.id}
                className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-slate-700 transition"
              >
                {/* Media Container with YOLOv8 Bounding Box Overlay */}
                <div className="relative w-full md:w-44 h-32 rounded-lg overflow-hidden shrink-0 border border-gray-700 bg-slate-950 group">
                  {report.mediaType === 'video' ? (
                    <video
                      src={report.photoUrl}
                      controls
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={report.photoUrl}
                      alt={report.hazard}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  )}

                  {/* YOLOv8 AI Detection Bounding Boxes Overlay */}
                  {showYoloVision && report.yoloDetections && report.yoloDetections.map((det, dIdx) => (
                    <div
                      key={dIdx}
                      className="absolute border-2 border-purple-500 bg-purple-500/15 rounded pointer-events-none transition-all"
                      style={{
                        left: `${det.box[0]}%`,
                        top: `${det.box[1]}%`,
                        width: `${det.box[2]}%`,
                        height: `${det.box[3]}%`,
                      }}
                    >
                      <span className="absolute -top-4 left-0 bg-purple-600 text-white font-mono text-[9px] px-1 py-0.2 rounded shadow font-bold">
                        {det.label} ({(det.conf * 100).toFixed(0)}%)
                      </span>
                    </div>
                  ))}

                  <div className="absolute top-1.5 left-1.5 bg-black/80 backdrop-blur px-1.5 py-0.5 rounded text-[9px] text-rose-300 font-mono flex items-center gap-1 pointer-events-none">
                    {report.mediaType === 'video' ? (
                      <>
                        <Video className="w-3 h-3 text-amber-400" />
                        <span>VIDEO ({report.durationSeconds || 12}s)</span>
                      </>
                    ) : (
                      <>
                        <Camera className="w-3 h-3 text-sky-400" />
                        <span>PHOTO</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-sky-400 font-semibold">
                      #{report.id}
                    </span>
                    <h4 className="text-sm font-bold text-white truncate">
                      {report.hazard}
                    </h4>
                    <span className="text-xs text-gray-400">
                      • {report.location}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        report.status === 'VERIFIED_TRUE_ALARM'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : report.status === 'DISMISSED_FALSE_ALARM'
                          ? 'bg-gray-700/40 text-gray-400 border border-gray-600'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                      }`}
                    >
                      {report.status === 'PENDING_REVIEW'
                        ? t.pendingReview
                        : report.status === 'VERIFIED_TRUE_ALARM'
                        ? t.verifiedAlarm
                        : 'Dismissed'}
                    </span>
                    {report.isOfflineQueued && (
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded">
                        Offline Queued
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {report.desc}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-400 pt-1">
                    <span>Reporter: <b>{report.reporter}</b> ({report.phone})</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-400" /> {report.time}
                    </span>
                    <span>•</span>
                    <span className="font-mono text-sky-400">
                      {report.lat.toFixed(4)}°N, {report.lon.toFixed(4)}°E
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 shrink-0 self-end md:self-center">
                  {onLocateOnMap && (
                    <button
                      onClick={() => onLocateOnMap(report)}
                      className="px-3 py-1.5 bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 rounded-lg text-xs font-bold flex items-center gap-1 border border-sky-500/30 transition"
                      title="Focus map on this location"
                    >
                      <MapPin className="w-3.5 h-3.5 text-sky-400" />
                      <span>{t.locateOnMap}</span>
                    </button>
                  )}

                  {report.status === 'PENDING_REVIEW' && (
                    currentOfficer && onVerifyReport ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onVerifyReport(report.id, 'VERIFIED_TRUE_ALARM')}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition shadow-md shadow-emerald-600/20"
                          title={`Authorized as ${currentOfficer.name}`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{t.verifyAction}</span>
                        </button>
                        <button
                          onClick={() => onVerifyReport(report.id, 'DISMISSED_FALSE_ALARM')}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-gray-300 rounded-lg text-xs font-medium flex items-center gap-1 border border-gray-700 transition"
                          title="Dismiss as False Alarm"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>{t.dismissAction}</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={onOpenLoginModal}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-amber-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-amber-500/40 transition shadow-sm group"
                        title="Only authorized disaster management officers can verify reports"
                      >
                        <Lock className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition" />
                        <span>{t.officerLoginToVerify}</span>
                      </button>
                    )
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 2. Continuous Learning & Retraining Pipeline Hook */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0c1322] border border-slate-800/90 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-slate-800/90 gap-2">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
            <GraduationCap className="w-5 h-5" />
            <span className="uppercase tracking-wide">{t.continuousLearningTitle}</span>
          </div>
          <span className="text-xs bg-amber-500/15 text-amber-300 px-2.5 py-1 rounded-lg border border-amber-500/30 font-mono text-[11px]">
            {t.retrainingPipelineHook}
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Disaster management officers provide ground-truth validation labels for active early warning alerts. Every logged feedback entry is tagged with officer credentials and saved to the feedback_log table to retrain XGBoost/PyTorch susceptibility models.
        </p>

        <form onSubmit={handleFeedbackSubmit} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                {t.selectActiveAlert}
              </label>
              <select
                value={selectedAlertId}
                onChange={(e) => setSelectedAlertId(parseInt(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-medium"
              >
                {activeAlertsData.map((alert) => (
                  <option key={alert.id} value={alert.id}>
                    #{alert.id} - {alert.district} ({alert.risk_level})
                  </option>
                ))}
                <option value={999}>#999 - Missed Event (Unflagged Landslide in Field)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                {t.officerAnnotation}
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'CONFIRMED', label: t.confirmedTP, color: 'bg-emerald-600 text-white border-emerald-400' },
                  { id: 'FALSE_ALARM', label: t.falseAlarmFP, color: 'bg-rose-600 text-white border-rose-400' },
                  { id: 'MISSED_EVENT', label: t.missedEventFN, color: 'bg-amber-600 text-white border-amber-400' },
                ].map((btn) => (
                  <button
                    key={btn.id}
                    type="button"
                    onClick={() => setFeedbackType(btn.id)}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-bold border transition ${
                      feedbackType === btn.id
                        ? `${btn.color} shadow-sm`
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                {t.observedRainfall}
              </label>
              <input
                type="number"
                value={observedRain}
                onChange={(e) => setObservedRain(e.target.value)}
                placeholder="e.g. 265"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono tabular-nums focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                {t.fieldVerificationNotes}
              </label>
              <input
                type="text"
                value={officerNotes}
                onChange={(e) => setOfficerNotes(e.target.value)}
                placeholder="e.g. Tension cracks validated along road shoulder..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            {feedbackSuccessMsg ? (
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> {feedbackSuccessMsg}
              </span>
            ) : (
              <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                {currentOfficer ? (
                  <>
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Signing as: <b className="text-emerald-300">{currentOfficer.name}</b> ({currentOfficer.badge || 'Officer'})</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t.publicViewLoginPrompt}</span>
                  </>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmittingFeedback}
              className="px-4 py-2 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition bg-amber-500 hover:bg-amber-400 text-slate-950"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmittingFeedback ? 'Saving to Pipeline...' : t.submitFeedback}</span>
            </button>
          </div>
        </form>

        {/* Retraining Feedback Audit Trail */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-300">
            <History className="w-3.5 h-3.5 text-sky-400" />
            <span className="uppercase tracking-wide">Recent Retraining Feedback Log (Audit Trail)</span>
          </div>

          <div className="space-y-2">
            {feedbackLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-500 font-bold">{log.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.feedbackType === 'CONFIRMED'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : log.feedbackType === 'FALSE_ALARM'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    }`}>
                      {log.feedbackType}
                    </span>
                    <b className="text-white truncate">{log.alertTitle}</b>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    {log.notes} • Observed Rain: <b className="text-sky-300 tabular-nums">{log.observedRainfall ? `${log.observedRainfall} mm` : 'N/A'}</b>
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 shrink-0">
                  <span className="font-semibold text-slate-300">{log.officerName} ({log.officerBadge})</span>
                  <span>•</span>
                  <span className="font-mono tabular-nums">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenReviewDeck;
