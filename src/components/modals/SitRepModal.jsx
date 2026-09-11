import React, { useRef } from 'react';
import { 
  FileText, Printer, Download, X, AlertTriangle, ShieldCheck, 
  MapPin, Clock, Calendar, CheckCircle2, Building, Radio 
} from 'lucide-react';

export default function SitRepModal({ onClose, isSurgeActive, currentOfficer }) {
  const printRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const reportText = `
================================================================================
GOVERNMENT OF INDIA - MINISTRY OF DEVELOPMENT OF NORTH EASTERN REGION (MDoNER)
NATIONAL DISASTER MANAGEMENT AUTHORITY (NDMA) - SITUATION REPORT (SITREP)
================================================================================
REPORT ID: NER-SITREP-2026-09-001
DATE/TIME: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
CLASSIFICATION: RESTRICTED / OPERATIONAL - EMERGENCY RELAY
AUTHORIZING OFFICER: ${currentOfficer ? `${currentOfficer.name} (${currentOfficer.role})` : 'Major Arvind Sharma (NDRF HQ)'}
STATUS: ${isSurgeActive ? 'OPCON-3 CRITICAL (SURGE SIMULATION ACTIVE)' : 'OPCON-1 WATCH'}

1. EXECUTIVE SUMMARY:
Hydro-geological conditions across the North Eastern Region have escalated following 
sustained orographic precipitation. Deep saturation of colluvial overburden on steep slopes 
along NH-10 (Teesta Axis) and Haflong-Silchar corridor has driven Factor of Safety (Fs) below 1.05.

2. METRICS AT A GLANCE:
- Peak Landslide Susceptibility Index (LSI): ${isSurgeActive ? '0.94 (CRITICAL)' : '0.78 (ELEVATED)'}
- Active Breach Zones: ${isSurgeActive ? '14 Identified (4 Total Closures)' : '3 Monitored'}
- Cut-off Settlements: ${isSurgeActive ? '9 Hamlets in Upper Teesta & Dima Hasao' : '0 (Normal Flow)'}
- NDRF / SDRF Dispatches: 12 Task Forces Deployed with heavy earthmoving machinery (BRO Project Swastik)

3. STRATEGIC HIGHWAY CORRIDORS:
- NH-10 (Sevoke-Rongpo): ${isSurgeActive ? 'BLOCKED at Mile 29 & Birik Dara. Panbu Detour ACTIVE.' : 'One-way regulated convoy.'}
- NH-6 (Meghalaya-Barak Valley): Moderate debris risk at Sonapur tunnel portal.
- NH-29 (Dimapur-Kohima): Sinking zone active at Pagla Pahar.
- Haflong-Silchar (SH-5): Slump at Mahur chainage 42.

4. DEOC DIRECTIVES:
- Immediate activation of NDMA SACHET Cell Broadcast across identified red polygons.
- BRO to initiate rapid rock-anchor clearance and pontoon logistics along Teesta low reaches.
- District Magistrates to enforce night vehicle movement suspension on vulnerable corridors.

Verified & Dispatched via AI-Based Landslide Risk Monitoring Platform (SIH26001).
================================================================================
`;
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SITREP_NER_LANDSLIDE_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-[#0b1322] border border-cyan-500/30 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:border-none print:bg-white print:text-black">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  Official Situation Report (SITREP)
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
                  MDoNER / NDMA
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Operational memorandum generated for inter-agency emergency task forces
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              Print / Save PDF
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Export .TXT
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Content Document */}
        <div ref={printRef} className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-300 print:text-black font-sans">
          
          {/* Memorandum Header Banner */}
          <div className="border-b-2 border-slate-700 pb-5 text-center space-y-2">
            <div className="flex justify-center items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded bg-red-500/20 text-red-400 border border-red-500/40 text-xs font-bold uppercase tracking-wider print:border-black print:text-black">
                {isSurgeActive ? 'CRITICAL DISASTER BRIEFING - OPCON-3' : 'ROUTINE SURVEILLANCE - OPCON-1'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white print:text-black tracking-tight uppercase">
              Ministry of Development of North Eastern Region (MDoNER)
            </h1>
            <p className="text-sm font-semibold text-cyan-400 print:text-black">
              National Disaster Management Authority (NDMA) & State Disaster Management Authorities (SDMA)
            </p>
            <p className="text-xs text-slate-400 print:text-slate-600">
              Joint Hydro-Meteorological & Landslide Warning Center - North East Multi-State Corridor
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs print:bg-slate-100 print:border-slate-300">
            <div>
              <span className="text-slate-500 block uppercase font-medium">SitRep Ref</span>
              <span className="font-mono font-bold text-slate-200 print:text-black">NER-SITREP-2026-09-001</span>
            </div>
            <div>
              <span className="text-slate-500 block uppercase font-medium">Issue Time</span>
              <span className="font-mono font-bold text-slate-200 print:text-black">
                {new Date().toLocaleDateString('en-IN')} {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} IST
              </span>
            </div>
            <div>
              <span className="text-slate-500 block uppercase font-medium">Security Tier</span>
              <span className="font-bold text-amber-400 print:text-black">OPERATIONAL RESTRICTED</span>
            </div>
            <div>
              <span className="text-slate-500 block uppercase font-medium">Dispatch Auth</span>
              <span className="font-bold text-cyan-400 print:text-black">
                {currentOfficer ? currentOfficer.name : 'Major Arvind Sharma (NDRF)'}
              </span>
            </div>
          </div>

          {/* Section 1: Situation Synopsis */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100 print:text-black flex items-center gap-2 border-b border-slate-800 pb-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              1. Executive Hydro-Geological Appraisal
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300 print:text-slate-800">
              Sustained orographic rainfall triggered by deep bay depression has saturated steep phyllite/schist colluvium 
              across key high-relief corridors. Sub-surface pore pressure sensors record critical thresholds along the Teesta 
              gorge (NH-10) and Jatinga valley (Haflong). The deterministic infinite slope geotechnical model yields 
              <strong className="text-red-400 print:text-black"> Factor of Safety Fs = {isSurgeActive ? '0.98 (Failure Imminent)' : '1.24 (Pre-failure Saturation)'}</strong>, 
              corroborating TreeSHAP spatial vulnerability estimates.
            </p>
          </div>

          {/* Section 2: Key Operational Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800 print:border-slate-300">
              <div className="text-[11px] text-slate-400">Peak LSI Score</div>
              <div className={`text-xl font-bold font-mono ${isSurgeActive ? 'text-red-400' : 'text-amber-400'} print:text-black`}>
                {isSurgeActive ? '0.94' : '0.78'}
              </div>
              <div className="text-[10px] text-slate-500">Scale: 0.0 - 1.0 (Critical &gt; 0.75)</div>
            </div>
            <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800 print:border-slate-300">
              <div className="text-[11px] text-slate-400">Road Breaches</div>
              <div className="text-xl font-bold font-mono text-cyan-400 print:text-black">
                {isSurgeActive ? '14 Sectors' : '3 Monitored'}
              </div>
              <div className="text-[10px] text-slate-500">4 Total Flow Closures</div>
            </div>
            <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800 print:border-slate-300">
              <div className="text-[11px] text-slate-400">Cut-off Settlements</div>
              <div className="text-xl font-bold font-mono text-purple-400 print:text-black">
                {isSurgeActive ? '9 Hamlets' : 'None Isolated'}
              </div>
              <div className="text-[10px] text-slate-500">Teesta & Dima Hasao</div>
            </div>
            <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800 print:border-slate-300">
              <div className="text-[11px] text-slate-400">Pre-positioned Assets</div>
              <div className="text-xl font-bold font-mono text-emerald-400 print:text-black">
                12 Task Forces
              </div>
              <div className="text-[10px] text-slate-500">BRO Project Swastik & NDRF</div>
            </div>
          </div>

          {/* Section 3: Vital Corridor Status Table */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100 print:text-black flex items-center gap-2 border-b border-slate-800 pb-1.5">
              <MapPin className="w-4 h-4 text-cyan-400" />
              2. Priority Strategic Corridor Status
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-slate-800 print:border-slate-300">
                <thead className="bg-slate-900 print:bg-slate-200 text-slate-400 print:text-black font-mono uppercase text-[10px]">
                  <tr>
                    <th className="p-2 border border-slate-800">Route / Axis</th>
                    <th className="p-2 border border-slate-800">Milestone</th>
                    <th className="p-2 border border-slate-800">Clearance Status</th>
                    <th className="p-2 border border-slate-800">Alternative Bypass</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 print:divide-slate-300">
                  <tr>
                    <td className="p-2 font-semibold text-slate-200 print:text-black">NH-10 (Sevoke - Rongpo)</td>
                    <td className="p-2 font-mono">KM 29 + Birik Dara</td>
                    <td className="p-2">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/40">
                        CLOSED (Mudflow)
                      </span>
                    </td>
                    <td className="p-2 text-cyan-400 print:text-black">Panbu - Mungpoo - Lava Detour (Light Vehicles Only)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-slate-200 print:text-black">SH-5 (Haflong - Silchar)</td>
                    <td className="p-2 font-mono">Mahur Ghat (KM 42)</td>
                    <td className="p-2">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
                        SINGLE LANE
                      </span>
                    </td>
                    <td className="p-2 text-slate-400 print:text-black">Umrangso alternate feeder road</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-slate-200 print:text-black">NH-29 (Dimapur - Kohima)</td>
                    <td className="p-2 font-mono">Pagla Pahar (KM 14)</td>
                    <td className="p-2">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
                        CONVOY PILOT
                      </span>
                    </td>
                    <td className="p-2 text-slate-400 print:text-black">Niuland - Kohima bypass route</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-slate-200 print:text-black">NH-6 (Meghalaya - Barak)</td>
                    <td className="p-2 font-mono">Sonapur Tunnel Portal</td>
                    <td className="p-2">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        OPERATIONAL
                      </span>
                    </td>
                    <td className="p-2 text-slate-400 print:text-black">Normal flow under continuous drone patrol</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Operational Tasking & Directives */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100 print:text-black flex items-center gap-2 border-b border-slate-800 pb-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              3. DEOC Tactical Directives & Agency Tasking
            </h3>
            <ul className="text-xs sm:text-sm space-y-1.5 list-disc list-inside text-slate-300 print:text-slate-800">
              <li>
                <strong>Border Roads Organisation (BRO Project Swastik / Pushpak):</strong> Keep crawler excavators and heavy bulldozers on hot standby at 29th Mile and Teesta Bazaar.
              </li>
              <li>
                <strong>State Disaster Response Forces (SDRF Sikkim & Assam):</strong> Conduct preemptive downstream evacuations for low-lying settlements adjoining river-damming risk points.
              </li>
              <li>
                <strong>Cell Broadcast Emergency Alerts (NDMA SACHET):</strong> OASIS CAP 1.2 XML protocol dispatched to all GSM towers covering Teesta, Haflong, and Kohima districts.
              </li>
              <li>
                <strong>Civil Supplies & Essential Logistics:</strong> Airlift prep for medical kits and fuel rations to isolated hamlets if heavy rainfall exceeds 72 continuous hours.
              </li>
            </ul>
          </div>

          {/* Signature & Authentication Stamp */}
          <div className="pt-6 border-t-2 border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 print:border-black print:text-black">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center font-mono font-bold text-cyan-400 text-xs text-center leading-tight">
                NDMA<br/>SEAL
              </div>
              <div>
                <p className="font-bold text-slate-200 print:text-black">ELECTRONICALLY DISPATCHED</p>
                <p className="text-[11px]">C-DOT Common Alerting Protocol Relay Gateway</p>
                <p className="text-[10px] font-mono text-slate-500">Hash: 8F2A-49C1-7E0B-991D</p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-slate-200 print:text-black">
                {currentOfficer ? currentOfficer.name : 'Major Arvind Sharma'}
              </p>
              <p className="text-[11px] text-cyan-400 print:text-black">
                {currentOfficer ? currentOfficer.designation : 'Senior Operations Officer, NDRF 1st Bn'}
              </p>
              <p className="text-[10px] text-slate-500">DEOC Joint Command Post, Guwahati / Gangtok</p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex justify-end gap-3 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Dismiss SitRep
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-lg shadow-cyan-500/20"
          >
            <Printer className="w-4 h-4" />
            Print Official PDF
          </button>
        </div>

      </div>
    </div>
  );
}
