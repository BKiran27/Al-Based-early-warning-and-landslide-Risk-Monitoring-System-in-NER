import React, { useState, useEffect } from 'react';
import { 
  Smartphone, Camera, Navigation, Radio, Wifi, WifiOff, 
  X, CheckCircle, AlertTriangle, Send, Mic, MapPin 
} from 'lucide-react';
import { queueOfflineReport } from '../../services/db';

export default function MobileSimulatorModal({ isOpen, onClose, onNewReport }) {
  const [gpsCoords, setGpsCoords] = useState({ lat: 27.234, lon: 88.502, acc: 4.2 });
  const [hazardType, setHazardType] = useState('New Tension Crack');
  const [severity, setSeverity] = useState('HIGH');
  const [notes, setNotes] = useState('Noticed fresh 3-inch slope fissure widening next to roadside culvert.');
  const [isOfflineSim, setIsOfflineSim] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReport = {
      id: Date.now(),
      reporter: "Field Volunteer (Mobile PWA)",
      phone: "+91-98765-43210",
      location: `Singtam Flank (${gpsCoords.lat.toFixed(3)}, ${gpsCoords.lon.toFixed(3)})`,
      district: "East Sikkim",
      state: "Sikkim",
      lat: gpsCoords.lat,
      lon: gpsCoords.lon,
      hazard: hazardType,
      severity,
      desc: notes,
      photoUrl: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80",
      mediaType: "image",
      status: isOfflineSim ? "Pending Verification (Offline Queued)" : "Pending Verification",
      time: "Just now",
      aiCorrelationScore: 0.91,
      yoloDetections: [
        { label: "slope_tension_crack", conf: 0.942, box: [18, 22, 65, 42] }
      ]
    };

    if (isOfflineSim) {
      await queueOfflineReport(newReport);
    }

    if (onNewReport) {
      onNewReport(newReport);
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative bg-[#070b14] border-4 border-slate-700 rounded-[38px] w-full max-w-sm shadow-2xl overflow-hidden flex flex-col my-auto ring-1 ring-cyan-500/40">
        
        {/* Smartphone Speaker & Camera Notch */}
        <div className="h-6 bg-slate-900 flex justify-center items-center relative">
          <div className="w-16 h-3 bg-black rounded-full"></div>
          <button
            onClick={onClose}
            className="absolute right-3 top-1.5 p-0.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Header Bar */}
        <div className="px-4 py-2.5 bg-gradient-to-r from-sky-950 to-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-white">NER Landslide PWA</span>
          </div>
          <button
            onClick={() => setIsOfflineSim(prev => !prev)}
            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer border ${
              isOfflineSim 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            }`}
          >
            {isOfflineSim ? <WifiOff className="w-3 h-3 text-amber-400" /> : <Wifi className="w-3 h-3 text-emerald-400" />}
            {isOfflineSim ? 'OFFLINE' : 'ONLINE'}
          </button>
        </div>

        {/* Mobile Viewport Form */}
        <div className="p-4 space-y-4 text-xs overflow-y-auto max-h-[70vh] text-slate-200">
          
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <h4 className="text-sm font-bold text-white">
                {isOfflineSim ? 'Saved to Local IndexedDB!' : 'Report Dispatched to DEOC!'}
              </h4>
              <p className="text-[11px] text-slate-400">
                {isOfflineSim 
                  ? 'Telemetry safely buffered on device storage. Will auto-sync when network returns.'
                  : 'Emergency operations center notified with YOLOv8 inference preview.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {/* GPS Live Telemetry Pill */}
              <div className="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span className="flex items-center gap-1 text-cyan-400 font-bold">
                    <Navigation className="w-3 h-3" /> GPS Satellite Locked
                  </span>
                  <span>Acc: ±{gpsCoords.acc}m</span>
                </div>
                <div className="font-mono text-[11px] text-slate-200">
                  {gpsCoords.lat.toFixed(5)}°N, {gpsCoords.lon.toFixed(5)}°E
                </div>
              </div>

              {/* Photo Intake Preview */}
              <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-700 bg-slate-900 group">
                <img 
                  src="https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80" 
                  alt="Hazard Snapshot"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 text-[11px] font-bold text-white">
                  <Camera className="w-4 h-4 text-cyan-400" />
                  <span>Snapshot Captured (YOLOv8 Ready)</span>
                </div>
              </div>

              {/* Hazard Selection */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300">Hazard Observation:</label>
                <select
                  value={hazardType}
                  onChange={(e) => setHazardType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option>New Tension Crack</option>
                  <option>Active Mudflow / Debris</option>
                  <option>Retaining Wall Bulging</option>
                  <option>Water Seepage from Hill</option>
                  <option>Rockfall on Highway</option>
                </select>
              </div>

              {/* Severity Selector */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300">Field Urgency:</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['MODERATE', 'HIGH', 'SEVERE'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSeverity(s)}
                      className={`py-1.5 rounded text-[10px] font-bold border transition cursor-pointer ${
                        severity === s
                          ? s === 'SEVERE'
                            ? 'bg-red-500 text-white border-red-400'
                            : s === 'HIGH'
                            ? 'bg-amber-500 text-black border-amber-400'
                            : 'bg-emerald-500 text-black border-emerald-400'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300">Field Description:</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-[11px] text-slate-200 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-black rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                <Send className="w-3.5 h-3.5" />
                {isOfflineSim ? 'Queue Report in IndexedDB' : 'Transmit Live to DEOC'}
              </button>

            </form>
          )}

        </div>

        {/* Smartphone Home Indicator Bar */}
        <div className="h-4 bg-slate-950 flex justify-center items-center">
          <div className="w-24 h-1 bg-slate-600 rounded-full"></div>
        </div>

      </div>
    </div>
  );
}
