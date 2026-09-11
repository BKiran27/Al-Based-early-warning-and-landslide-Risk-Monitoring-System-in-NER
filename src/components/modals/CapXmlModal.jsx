import React, { useState } from 'react';
import { 
  Code, Copy, Check, Download, X, FileCode, 
  ShieldCheck, Radio, Layers, Terminal 
} from 'lucide-react';
import { generateCapXml } from '../../services/capGenerator';

export default function CapXmlModal({ isOpen, onClose, hotspots, isSurgeActive }) {
  const [selectedHotspotId, setSelectedHotspotId] = useState(hotspots?.[0]?.id || 'sikkim_nh10');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const targetHotspot = hotspots.find(h => h.id === selectedHotspotId) || hotspots[0];
  const capXmlString = generateCapXml(targetHotspot, isSurgeActive);

  const handleCopy = () => {
    navigator.clipboard.writeText(capXmlString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([capXmlString], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CAP_1.2_${targetHotspot.id.toUpperCase()}_${new Date().toISOString().split('T')[0]}.xml`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0b1322] border border-cyan-500/30 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  OASIS CAP v1.2 XML Protocol Viewer
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  NDMA SACHET / C-DOT CMS
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Machine-readable standardized disaster alert schema (ITU-T X.1303 / OASIS)
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Controls Bar */}
        <div className="p-4 bg-slate-900/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Select Target Node:</span>
            <select
              value={selectedHotspotId}
              onChange={(e) => setSelectedHotspotId(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-3 py-1.5 font-medium focus:outline-none focus:border-cyan-500"
            >
              {hotspots.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} ({h.state}) - {h.status}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  Copy XML
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download .XML
            </button>
          </div>
        </div>

        {/* Schema Specification Summary Bar */}
        <div className="px-5 py-2.5 bg-cyan-950/20 border-b border-cyan-900/40 flex items-center justify-between text-[11px] text-cyan-300">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Root Element: &lt;alert xmlns="urn:oasis:names:tc:emergency:cap:1.2"&gt;
            </span>
            <span className="hidden sm:inline-block text-slate-600">|</span>
            <span className="hidden sm:flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 text-amber-400" />
              Urgency: Immediate | Severity: Extreme
            </span>
          </div>
          <span className="font-mono text-[10px] text-slate-400">
            Char Count: {capXmlString.length}
          </span>
        </div>

        {/* XML Code Viewer Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 font-mono text-xs bg-[#070b14]">
          <pre className="text-emerald-400/90 whitespace-pre leading-relaxed overflow-x-auto selection:bg-cyan-900 selection:text-white">
            {capXmlString}
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span>Auto-synced with SIH 2026 NDMA Common Alerting Protocol standard</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
}
