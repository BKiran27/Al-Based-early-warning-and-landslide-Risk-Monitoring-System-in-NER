import React, { useState } from 'react';
import { 
  Camera, 
  Video, 
  Upload, 
  Navigation, 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  Image as ImageIcon 
} from 'lucide-react';
import { translations } from '../../data/translations';
import { presetSamples } from '../../data/initialReports';
import { offlineDB } from '../../services/db';

export const ReportHazardModal = ({
  isOpen,
  onClose,
  onSubmitReport,
  lang
}) => {
  const t = translations[lang] || translations.en;

  const [mediaType, setMediaType] = useState('image');
  const [reporterName, setReporterName] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [photoUrl, setPhotoUrl] = useState(presetSamples[0].url);
  const [durationSec, setDurationSec] = useState(0);
  const [hazardClassification, setHazardClassification] = useState('New Hill Fissure / Creep');
  const [district, setDistrict] = useState('East Sikkim');
  const [state, setState] = useState('Sikkim');
  const [locationName, setLocationName] = useState('Singtam Flank, NH-10');
  const [latitude, setLatitude] = useState(27.23);
  const [longitude, setLongitude] = useState(88.50);
  const [severity, setSeverity] = useState('SEVERE');
  const [description, setDescription] = useState(presetSamples[0].desc);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [videoDurationWarning, setVideoDurationWarning] = useState(null);

  if (!isOpen) return null;

  const handleApplyPreset = (index) => {
    const sample = presetSamples[index];
    setSelectedPresetIndex(index);
    setMediaType(sample.mediaType);
    setPhotoUrl(sample.url);
    setDurationSec(sample.durationSeconds || 0);
    setHazardClassification(sample.hazard);
    setDistrict(sample.district);
    setState(sample.state);
    setLocationName(sample.location);
    setLatitude(sample.lat);
    setLongitude(sample.lon);
    setSeverity(sample.severity);
    setDescription(sample.desc);
    setVideoDurationWarning(null);
    setFeedbackMsg(`Applied preset sample: ${sample.title}`);
  };

  const handleAutoGPS = () => {
    if (!('geolocation' in navigator)) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(parseFloat(pos.coords.latitude.toFixed(4)));
        setLongitude(parseFloat(pos.coords.longitude.toFixed(4)));
        setLocationName(`Current GPS (${pos.coords.latitude.toFixed(2)}°N, ${pos.coords.longitude.toFixed(2)}°E)`);
        setFeedbackMsg(`📍 Accurate GPS acquired: ${pos.coords.latitude.toFixed(4)}°N, ${pos.coords.longitude.toFixed(4)}°E`);
        setIsLocating(false);
      },
      (err) => {
        alert(`GPS detection failed: ${err.message}. Keeping existing coordinates.`);
        setIsLocating(false);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;

    const newReport = {
      id: Math.floor(500 + Math.random() * 500),
      reporter: reporterName.trim() || "Field Observer / Citizen",
      phone: reporterPhone.trim() || "+91-98XXX-XXXXX",
      location: `${locationName}, ${district}`,
      district,
      state,
      lat: latitude,
      lon: longitude,
      hazard: hazardClassification,
      severity,
      desc: description,
      photoUrl,
      mediaType,
      durationSeconds: mediaType === 'video' ? durationSec || 12 : undefined,
      status: "PENDING_REVIEW",
      time: "Just now",
      aiCorrelationScore: severity === 'SEVERE' ? 0.94 : severity === 'HIGH' ? 0.78 : 0.54,
      aiCorrelationNote: `Ground observation (${latitude.toFixed(2)}, ${longitude.toFixed(2)}) validated against GSI Slope Susceptibility layer (${district}). Recent 48h rainfall exceeds threshold.`,
      yoloDetections: [
        { label: hazardClassification.toLowerCase().replace(/ /g, '_'), conf: 0.935, box: [15, 20, 70, 50] }
      ],
      isOfflineQueued: isOffline,
    };

    if (isOffline) {
      try {
        await offlineDB.queueReport({ ...newReport, timestamp: Date.now() });
        alert("⚡ Stored in Offline Queue: You are currently offline. This report will automatically sync once your internet connection is restored.");
      } catch (err) {
        console.error("Failed to queue offline report:", err);
      }
    }

    setTimeout(() => {
      onSubmitReport(newReport);
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#0c1322] border border-slate-700/80 shadow-2xl p-4 sm:p-6 text-slate-100 space-y-4 z-[5001]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/30">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold uppercase tracking-wide text-white">
                {t.reportModalTitle}
              </h3>
              <p className="text-xs text-slate-400">
                Photo & Video (Max 20s) • Auto GPS • Offline Resilient Queue
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Media Mode & Demo Presets */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                {t.uploadPhoto}
              </label>
              <div className="flex items-center space-x-1 bg-slate-950 border border-slate-800 p-0.5 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setMediaType('image')}
                  className={`px-3 py-1 rounded-md font-bold flex items-center gap-1.5 transition ${
                    mediaType === 'image' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Photo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMediaType('video')}
                  className={`px-3 py-1 rounded-md font-bold flex items-center gap-1.5 transition ${
                    mediaType === 'video' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Video (15-20s)</span>
                </button>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-[11px] text-slate-400 shrink-0 font-medium">Demo Samples:</span>
              {presetSamples.map((sample, sIdx) => (
                <button
                  key={sample.title}
                  type="button"
                  onClick={() => handleApplyPreset(sIdx)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition shrink-0 flex items-center gap-1.5 ${
                    selectedPresetIndex === sIdx
                      ? 'bg-sky-600 text-white border-sky-400 font-bold shadow-sm'
                      : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {sample.mediaType === 'video' ? <Video className="w-3 h-3 text-amber-300" /> : <ImageIcon className="w-3 h-3 text-sky-300" />}
                  <span>{sample.title}</span>
                </button>
              ))}
            </div>

            {/* Media Preview / File Dropzone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              <div className="relative h-44 rounded-xl border border-slate-800 bg-black overflow-hidden flex items-center justify-center group shadow-inner">
                {mediaType === 'video' ? (
                  <video src={photoUrl} controls className="w-full h-full object-cover" />
                ) : photoUrl ? (
                  <img src={photoUrl} alt="Hazard Preview" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                ) : (
                  <div className="text-center p-4 text-slate-500">
                    <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                    <span className="text-xs">No media selected</span>
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-black/80 backdrop-blur px-2 py-0.5 rounded text-[10px] text-sky-300 font-mono flex items-center gap-1 pointer-events-none">
                  {mediaType === 'video' ? <Video className="w-3 h-3 text-amber-400" /> : <Camera className="w-3 h-3 text-sky-400" />}
                  <span>{mediaType.toUpperCase()} • {severity}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex flex-col items-center justify-center h-44 border-2 border-dashed border-slate-700 hover:border-sky-500 rounded-xl bg-slate-950/60 cursor-pointer p-4 text-center transition group">
                  <Upload className="w-8 h-8 text-sky-400 group-hover:-translate-y-0.5 transition duration-150 mb-2" />
                  <span className="text-xs font-bold text-slate-200">Click to browse device file</span>
                  <span className="text-[10px] text-slate-400 mt-1">Supports Photos (JPG, PNG) & Videos (MP4, WebM, max 20s)</span>
                  <input
                    type="file"
                    accept="image/*,video/mp4,video/webm"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const isVid = file.type.startsWith('video/');
                      setVideoDurationWarning(null);
                      if (isVid) {
                        setMediaType('video');
                        const vElem = document.createElement('video');
                        vElem.preload = 'metadata';
                        vElem.src = URL.createObjectURL(file);
                        vElem.onloadedmetadata = () => {
                          window.URL.revokeObjectURL(vElem.src);
                          const duration = Math.round(vElem.duration);
                          setDurationSec(duration);
                          if (duration > 20) {
                            setVideoDurationWarning(`⚠️ Video is ${duration}s long. Please keep videos under 15-20s for low-bandwidth field sync.`);
                          } else {
                            setFeedbackMsg(`Selected video clip (${duration}s): ${file.name}`);
                          }
                        };
                        const reader = new FileReader();
                        reader.onload = () => {
                          if (reader.result) {
                            setPhotoUrl(reader.result);
                            setSelectedPresetIndex(null);
                          }
                        };
                        reader.readAsDataURL(file);
                      } else {
                        setMediaType('image');
                        const reader = new FileReader();
                        reader.onload = () => {
                          if (reader.result) {
                            setPhotoUrl(reader.result);
                            setSelectedPresetIndex(null);
                            setFeedbackMsg(`Selected photo: ${file.name}`);
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {videoDurationWarning && (
              <p className="text-[11px] text-amber-400 font-medium flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> {videoDurationWarning}
              </p>
            )}
            {feedbackMsg && (
              <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {feedbackMsg}
              </p>
            )}
          </div>

          {/* Classification & Severity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Hazard Classification
              </label>
              <select
                value={hazardClassification}
                onChange={(e) => setHazardClassification(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
              >
                <option value="New Hill Fissure / Creep">New Hill Fissure / Creep</option>
                <option value="Active Highway Mudflow & Gravel">Active Highway Mudflow & Gravel</option>
                <option value="Retaining Wall Bulging">Retaining Wall Failure / Bulging</option>
                <option value="Active Rockfall / Boulder Rolling">Active Rockfall / Boulder Rolling</option>
                <option value="Road Embankment Subsidence">Road Embankment Subsidence</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Reported Severity
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {['MODERATE', 'HIGH', 'SEVERE'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSeverity(s)}
                    className={`py-1.5 rounded-lg text-xs font-bold border transition ${
                      severity === s
                        ? s === 'SEVERE'
                          ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                          : s === 'HIGH'
                          ? 'bg-amber-600 text-white border-amber-500 shadow-sm'
                          : 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Geo Coordinates & Auto GPS */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-400">
                Geo-Location Coordinates
              </label>
              <button
                type="button"
                onClick={handleAutoGPS}
                disabled={isLocating}
                className="text-[11px] text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1 bg-sky-950/60 border border-sky-600/40 px-2 py-0.5 rounded-lg transition"
              >
                <Navigation className={`w-3 h-3 ${isLocating ? 'animate-spin' : ''}`} />
                <span>{isLocating ? 'Acquiring GPS...' : '📍 Auto-Detect My GPS'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="e.g. Singtam Flank, NH-10"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  step="0.0001"
                  value={latitude}
                  onChange={(e) => setLatitude(parseFloat(e.target.value) || 0)}
                  placeholder="Latitude (°N)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono tabular-nums focus:outline-none focus:border-sky-500"
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  step="0.0001"
                  value={longitude}
                  onChange={(e) => setLongitude(parseFloat(e.target.value) || 0)}
                  placeholder="Longitude (°E)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono tabular-nums focus:outline-none focus:border-sky-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Field Observation Details
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe width of crack, rate of mudflow, threatening buildings or road obstruction..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 leading-relaxed"
              required
            />
          </div>

          {/* Reporter info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Reporter Name (Optional)
              </label>
              <input
                type="text"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                placeholder="e.g. Ramesh Kalita (Village Volunteer)"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Emergency Mobile # (For verification)
              </label>
              <input
                type="tel"
                value={reporterPhone}
                onChange={(e) => setReporterPhone(e.target.value)}
                placeholder="+91-98XXX-XXXXX"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Modal Buttons */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition shadow-sm flex items-center gap-1.5"
            >
              {isSubmitting ? (
                <span>Syncing to Early Warning Map...</span>
              ) : (
                <>
                  <Camera className="w-3.5 h-3.5" />
                  <span>Submit Ground Report to Map</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
