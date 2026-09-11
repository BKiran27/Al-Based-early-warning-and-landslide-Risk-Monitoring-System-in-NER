import React, { useState } from 'react';
import { 
  Building2, ShieldCheck, DollarSign, AlertTriangle, 
  CheckCircle, FileSpreadsheet, Users, Truck, Compass 
} from 'lucide-react';
import { 
  STATE_GOVERNANCE_INDEX, 
  INFRASTRUCTURE_DAMAGE_MODELS 
} from '../../data/governanceData';

export function GovernanceDeck({ lang }) {
  const [selectedState, setSelectedState] = useState(STATE_GOVERNANCE_INDEX[0]);

  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-[#0c1322] border border-cyan-500/30 space-y-6 shadow-2xl">
      
      {/* Deck Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Climate-Resilient Governance & Infrastructure Damage Exposure
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                8 NER States Policy Framework
              </span>
            </div>
            <p className="text-xs text-slate-400">
              State disaster preparedness rankings, economic loss mitigation calculators, and inter-agency SOP compliance
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Framework: NDMA National Disaster Management Plan (NDMP) 2026
        </div>
      </div>

      {/* Top Section: 8-State Governance Preparedness Matrix */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            1. State Disaster Preparedness & Governance Scorecard
          </h3>
          <span className="text-[11px] text-slate-400">Select state to inspect readiness metrics:</span>
        </div>

        {/* State Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {STATE_GOVERNANCE_INDEX.map((st) => (
            <button
              key={st.state}
              onClick={() => setSelectedState(st)}
              className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                selectedState.state === st.state 
                  ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-lg shadow-cyan-500/20' 
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="text-xs font-bold truncate">{st.state}</div>
              <div className="text-lg font-black font-mono mt-1 text-cyan-400">
                {st.overallScore}<span className="text-[10px] text-slate-500">/100</span>
              </div>
              <div className={`mt-1 text-[9px] font-bold uppercase px-1 py-0.5 rounded ${st.color}`}>
                {st.tier}
              </div>
            </button>
          ))}
        </div>

        {/* Detailed State Inspection Card */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">{selectedState.state} Disaster Management Readiness</h4>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${selectedState.color}`}>
                  Preparedness Score: {selectedState.overallScore}/100
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Vulnerability Profile: {selectedState.keyVulnerability}
              </p>
            </div>
            <div className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/30">
              DEOC: {selectedState.deocStatus}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            <div className="p-2.5 bg-black/40 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase">SDRF Task Forces</span>
              <span className="text-base font-bold font-mono text-emerald-400">{selectedState.sdrfBattalions} Battalions</span>
            </div>
            <div className="p-2.5 bg-black/40 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase">Relief Shelters</span>
              <span className="text-base font-bold font-mono text-cyan-400">{selectedState.emergencyShelters} ({selectedState.shelterCapacity.toLocaleString()} Pax)</span>
            </div>
            <div className="p-2.5 bg-black/40 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase">Surveillance Drones</span>
              <span className="text-base font-bold font-mono text-purple-400">{selectedState.droneFleet} UAV Units</span>
            </div>
            <div className="p-2.5 bg-black/40 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase">Food Grain Buffer</span>
              <span className="text-base font-bold font-mono text-amber-400">{selectedState.grainBufferDays} Days</span>
            </div>
            <div className="p-2.5 bg-black/40 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase">Early Warning Reach</span>
              <span className="text-base font-bold font-mono text-sky-400">{selectedState.earlyWarningReachPct}% Population</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Infrastructure Damage Risk Exposure Models */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-amber-400" />
          2. Strategic Infrastructure Economic Risk Exposure Models
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {INFRASTRUCTURE_DAMAGE_MODELS.map((asset, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-white text-xs leading-snug">{asset.assetName}</h4>
                  <p className="text-[11px] text-slate-400">Critical Breach: {asset.criticalKmMark}</p>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-red-500/20 text-red-300 border border-red-500/40 shrink-0">
                  {asset.projectedDamageScenario.totalBlockageDays} Days Blockage
                </span>
              </div>

              {/* Economic Breakdown */}
              <div className="p-2.5 bg-black/50 rounded-lg border border-slate-800/80 space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between text-slate-400">
                  <span>Physical Road Restoration:</span>
                  <span className="text-slate-200">₹{asset.projectedDamageScenario.clearingCostEstCr} Cr</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Supply Disruption (7d):</span>
                  <span className="text-slate-200">₹{asset.projectedDamageScenario.supplyChainDisruptionCr} Cr</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Detour Fuel & Transit Penalty:</span>
                  <span className="text-slate-200">₹{asset.projectedDamageScenario.detourTransitCostPenaltyCr} Cr</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-800 font-bold text-amber-400">
                  <span>Total Economic Exposure:</span>
                  <span>₹{asset.projectedDamageScenario.totalEconomicExposureCr} Cr</span>
                </div>
              </div>

              {/* Recommended Mitigation */}
              <div className="text-[11px] text-slate-300 leading-relaxed bg-cyan-950/20 p-2 rounded border border-cyan-900/30">
                <span className="font-semibold text-cyan-400">Mitigation Strategy: </span>
                {asset.mitigationAction}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default GovernanceDeck;
