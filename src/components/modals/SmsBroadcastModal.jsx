import React, { useState } from 'react';
import { 
  MessageSquare, Send, CheckCircle2, Smartphone, 
  X, RefreshCw, Copy, Check, Radio, TowerControl, ShieldAlert 
} from 'lucide-react';
import { 
  DLT_TEMPLATES, 
  generateWhatsAppPayload, 
  simulateSmsBlast 
} from '../../services/smsService';

export default function SmsBroadcastModal({ isOpen, onClose, hotspots, isSurgeActive }) {
  const [selectedHotspotId, setSelectedHotspotId] = useState(hotspots?.[0]?.id || 'sikkim_nh10');
  const [msgLang, setMsgLang] = useState('en');
  const [activeTab, setActiveTab] = useState('sms'); // 'sms' | 'whatsapp'
  const [isBlasting, setIsBlasting] = useState(false);
  const [blastProgress, setBlastProgress] = useState(0);
  const [blastReport, setBlastReport] = useState(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const targetHotspot = hotspots.find(h => h.id === selectedHotspotId) || hotspots[0];
  const dltConfig = DLT_TEMPLATES[msgLang] || DLT_TEMPLATES.en;
  const leadTime = "2.5 Hours";
  const action = "Move to designated ridge shelters immediately";
  const smsText = dltConfig.template(targetHotspot.name, leadTime, action);
  const whatsappPayload = generateWhatsAppPayload(targetHotspot, msgLang);

  const handleStartBlast = async () => {
    setIsBlasting(true);
    setBlastProgress(0);
    setBlastReport(null);

    const report = await simulateSmsBlast({
      hotspot: targetHotspot,
      lang: msgLang,
      onProgress: (p) => setBlastProgress(p.progressPct)
    });

    setBlastReport(report);
    setIsBlasting(false);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0b1322] border border-cyan-500/30 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-500/10 border border-sky-500/30 rounded-lg text-sky-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-wide">
                  Automated SMS & WhatsApp Early Warning Gateway
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
                  DLT-TRAI / C-DOT
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Multi-operator cell tower SMS broadcast and WhatsApp Business API evacuation notices
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Controls Bar */}
        <div className="p-4 bg-slate-900/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Target Zone Selector */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Target Sector:</span>
            <select
              value={selectedHotspotId}
              onChange={(e) => setSelectedHotspotId(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 font-medium focus:outline-none focus:border-cyan-500"
            >
              {hotspots.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} ({h.state}) - {h.status}
                </option>
              ))}
            </select>
          </div>

          {/* Regional Language Selector */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Language:</span>
            <select
              value={msgLang}
              onChange={(e) => setMsgLang(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 font-medium focus:outline-none focus:border-cyan-500"
            >
              <option value="en">English (EN)</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="as">অসমীয়া (Assamese)</option>
              <option value="brx">बर' (Bodo)</option>
              <option value="kha">Khasi</option>
            </select>
          </div>

          {/* Tab Switcher: SMS vs WhatsApp */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('sms')}
              className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                activeTab === 'sms' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              DLT SMS Blast
            </button>
            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                activeTab === 'whatsapp' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              WhatsApp API
            </button>
          </div>

        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          
          {activeTab === 'sms' ? (
            /* SMS Tab */
            <div className="space-y-4">
              
              {/* Message Preview */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800 pb-1.5">
                  <span>Sender ID: <b className="text-sky-400">{dltConfig.senderId}</b></span>
                  <span>DLT Template ID: <b className="text-amber-400">{dltConfig.dltId}</b></span>
                  <span>Length: <b className="text-slate-200">{smsText.length}/160 chars</b></span>
                </div>
                <div className="text-xs sm:text-sm text-slate-100 font-sans p-2 bg-slate-900/80 rounded-lg border border-slate-800 leading-relaxed">
                  "{smsText}"
                </div>
              </div>

              {/* Progress Bar if Blasting */}
              {isBlasting && (
                <div className="space-y-2 p-3 bg-sky-950/20 border border-sky-500/30 rounded-xl">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-sky-300">Transmitting to BTS Towers (Airtel, Jio, BSNL)...</span>
                    <span className="text-white font-bold">{blastProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 transition-all duration-200"
                      style={{ width: `${blastProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Delivery Report Card */}
              {blastReport && (
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      CELL BROADCAST DISPATCH COMPLETED
                    </span>
                    <span className="font-mono text-[11px]">{blastReport.dispatchId}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs font-mono pt-1">
                    <div className="p-2 bg-black/40 rounded border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Subscribers</span>
                      <b className="text-white">{blastReport.subscribersReached.toLocaleString()}</b>
                    </div>
                    <div className="p-2 bg-black/40 rounded border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Delivery Rate</span>
                      <b className="text-emerald-400">{blastReport.deliveryRatePct}%</b>
                    </div>
                    <div className="p-2 bg-black/40 rounded border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Airtel / Jio / BSNL</span>
                      <b className="text-sky-300">3 Operators</b>
                    </div>
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* WhatsApp Tab */
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300">WhatsApp Business Cloud API Payload</span>
                <button
                  onClick={() => handleCopy(JSON.stringify(whatsappPayload, null, 2))}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy JSON'}
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto max-h-60 leading-relaxed">
                {JSON.stringify(whatsappPayload, null, 2)}
              </pre>

              <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-lg text-xs text-emerald-300 leading-relaxed">
                Includes rich quick-action buttons directing citizens to the nearest safe shelter with live turn-by-turn routing coordinates.
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition cursor-pointer"
          >
            Cancel / Close
          </button>

          <button
            onClick={handleStartBlast}
            disabled={isBlasting}
            className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg text-xs flex items-center gap-2 transition cursor-pointer shadow-lg shadow-sky-600/30"
          >
            {isBlasting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Broadcasting to Towers...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Trigger Cell Broadcast SMS Blast
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
