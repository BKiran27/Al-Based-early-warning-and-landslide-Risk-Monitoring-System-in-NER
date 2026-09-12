import React, { useState } from 'react';
import { 
  Layers, Gauge, Activity, AlertTriangle, ShieldCheck, 
  Droplets, ArrowDown, Compass, Database, CheckCircle, Info 
} from 'lucide-react';
import { soilLabTests } from '../../data/geomechanicsData';

export function SubsurfaceGeomechanicsDeck({ lang }) {
  // Interactive Simulation State
  const [moistureInput, setMoistureInput] = useState(68); // Moisture %
  const [normalStress, setNormalStress] = useState(50); // kPa
  const [tiltAngle, setTiltAngle] = useState(2.8); // degrees
  const [activeTab, setActiveTab] = useState('stratigraphy'); // 'stratigraphy' | 'labtests' | 'mems'

  // Computed Values based on JETIR 2026 formulations
  const shearStrength = soilLabTests.directShear.calculateShearStrength(normalStress);
  const isMoistureWarning = moistureInput >= soilLabTests.proctorCompaction.thresholds.highRiskPreAlarm; // 65%
  const isMoistureFailure = moistureInput >= soilLabTests.proctorCompaction.thresholds.criticalFailure; // 75%
  
  const isTiltWarning = tiltAngle >= soilLabTests.tiltKinematics.thresholds.criticalWarning_deg; // 2.5 deg
  const isTiltDanger = tiltAngle >= soilLabTests.tiltKinematics.thresholds.observedDanger_deg; // 3.2 deg

  // Overall Hazard status
  const isHazardCritical = isMoistureFailure || isTiltDanger;
  const isHazardWarning = isMoistureWarning || isTiltWarning;

  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-[#0c1322] border border-amber-500/30 space-y-6 shadow-2xl">
      
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Subsurface IoT & Geotechnical Mechanics Lab
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                JETIR May 2026 Reference
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Deterministic soil mechanics, 1.5–2.0m depth slip-plane kinematics, Standard Proctor compaction & Mohr-Coulomb failure criteria
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 ${
            isHazardCritical
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
              : isHazardWarning
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              isHazardCritical ? 'bg-rose-400 animate-ping' : isHazardWarning ? 'bg-amber-400' : 'bg-emerald-400'
            }`} />
            <span>
              {isHazardCritical 
                ? 'CRITICAL HAZARD: SHEAR FAILURE BREACH' 
                : isHazardWarning 
                ? 'ALERT: PRE-ALARM THRESHOLD EXCEEDED' 
                : 'STABLE: WITHIN BEARING CAPACITY'}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('stratigraphy')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'stratigraphy'
              ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-400'
          }`}
        >
          Stratigraphy Depth Profile (0–2.0m)
        </button>
        <button
          onClick={() => setActiveTab('labtests')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'labtests'
              ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-400'
          }`}
        >
          Soil Lab Tests (Proctor & Direct Shear)
        </button>
        <button
          onClick={() => setActiveTab('mems')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'mems'
              ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-400'
          }`}
        >
          MEMS Tilt Inclinometer Kinematics
        </button>
      </div>

      {/* TAB 1: Subsurface Stratigraphy Depth Profile */}
      {activeTab === 'stratigraphy' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Vertical Soil Profile Graphic */}
          <div className="lg:col-span-6 bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <ArrowDown className="w-4 h-4 text-amber-400" />
                Cross-Sectional Subsurface Stratum (JETIR Field Design)
              </span>
              <span className="text-[11px] font-mono text-cyan-400">Borehole Depth: 2.5m</span>
            </div>

            {/* Visual Depth Layers */}
            <div className="space-y-2 relative">
              {/* Layer 1: Topsoil */}
              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40 relative overflow-hidden">
                <div className="flex justify-between text-xs font-bold text-emerald-400">
                  <span>0.0m - 0.3m: Topsoil & Organic Humus</span>
                  <span className="font-mono">k = 1.2 × 10⁻⁴ m/s</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  High permeability zone allowing direct meteoric water infiltration.
                </p>
                {/* Simulated moisture flow bar */}
                <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, moistureInput + 15)}%` }}
                  />
                </div>
              </div>

              {/* Layer 2: Weathered Silt-Clay */}
              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 relative overflow-hidden">
                <div className="flex justify-between text-xs font-bold text-amber-400">
                  <span>0.3m - 1.5m: Weathered Residual Silt-Clay Matrix</span>
                  <span className="font-mono">k = 4.5 × 10⁻⁶ m/s</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Low cohesion zone ({soilLabTests.directShear.cohesion_kPa} kPa). Water accumulation creates positive pore pressure.
                </p>
                <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="bg-amber-500 h-full transition-all duration-300"
                    style={{ width: `${moistureInput}%` }}
                  />
                </div>
              </div>

              {/* Layer 3: Critical Slip Plane (1.5 - 2.0m) */}
              <div className={`p-3.5 rounded-lg border relative transition-all ${
                isMoistureFailure 
                  ? 'bg-rose-950/50 border-rose-500/80 shadow-lg shadow-rose-500/20 animate-pulse'
                  : isMoistureWarning 
                  ? 'bg-amber-950/40 border-amber-500/60'
                  : 'bg-blue-950/30 border-blue-800/40'
              }`}>
                <div className="flex justify-between text-xs font-bold text-rose-400">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    1.5m - 2.0m: Primary Shear Slip Surface (Embedded Sensor Node)
                  </span>
                  <span className="font-mono text-white bg-rose-600/60 px-1.5 py-0.5 rounded">
                    Current: {moistureInput}% Saturation
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1.5 font-sans">
                  Target zone for the 3-axis accelerometer and dual soil moisture probes (1.5–2m deep). 
                  Critical failure threshold: <b className="text-white">75% moisture</b> (JETIR Page 4).
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-2">
                  <span>OMC: 17%</span>
                  <span className="text-amber-400">Pre-Alarm: 65%</span>
                  <span className="text-rose-400">Failure: 75%</span>
                </div>
                <div className="w-full bg-slate-900 h-2.5 rounded-full mt-1 overflow-hidden border border-slate-700">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      isMoistureFailure ? 'bg-rose-500' : isMoistureWarning ? 'bg-amber-400' : 'bg-cyan-500'
                    }`}
                    style={{ width: `${moistureInput}%` }}
                  />
                </div>
              </div>

              {/* Layer 4: Bedrock */}
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 relative">
                <div className="flex justify-between text-xs font-bold text-slate-400">
                  <span>&gt; 2.0m: Competent Sandstone/Shale Bedrock</span>
                  <span className="font-mono">k = 1.0 × 10⁻⁹ m/s</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Impermeable basement providing bedrock anchoring for displacement reference.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Telemetry & Threshold Controls */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Live Sliders */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center justify-between">
                <span>Subsurface Telemetry Simulation</span>
                <span className="text-[10px] font-mono text-cyan-400">Arduino / ESP32 Sensor Ingest</span>
              </h3>

              {/* Moisture Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                    Soil Moisture Content (1.5m Depth Probe):
                  </span>
                  <span className={`font-mono font-bold ${
                    isMoistureFailure ? 'text-rose-400' : isMoistureWarning ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {moistureInput}% (OMC: 17%)
                  </span>
                </div>
                <input 
                  type="range"
                  min="15"
                  max="95"
                  value={moistureInput}
                  onChange={(e) => setMoistureInput(+e.target.value)}
                  className="w-full accent-amber-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>15% (Dry Baseline)</span>
                  <span className="text-amber-400 font-bold">65% (Buzzer Pre-Alarm)</span>
                  <span className="text-rose-400 font-bold">75% (Slope Failure)</span>
                  <span>95% (Liquefaction)</span>
                </div>
              </div>

              {/* Tilt Angle Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-amber-400" />
                    MEMS 3-Axis Inclinometer Angular Deviation (Δθ):
                  </span>
                  <span className={`font-mono font-bold ${
                    isTiltDanger ? 'text-rose-400' : isTiltWarning ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {tiltAngle}°
                  </span>
                </div>
                <input 
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.1"
                  value={tiltAngle}
                  onChange={(e) => setTiltAngle(+e.target.value)}
                  className="w-full accent-rose-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>0.5° (Normal)</span>
                  <span className="text-amber-400 font-bold">2.5° (Critical Threshold)</span>
                  <span className="text-rose-400 font-bold">3.2° (Observed Failure Breach)</span>
                  <span>5.0° (Debris Runout)</span>
                </div>
              </div>
            </div>

            {/* Critical Findings from Paper 2 */}
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs space-y-2.5">
              <span className="font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-400" />
                Verified Empirical Findings (JETIR Experimental Bench)
              </span>
              <ul className="space-y-1.5 text-slate-300 text-[11px] list-disc list-inside">
                <li>
                  <b className="text-white">Soil Failure at 75% Moisture:</b> Proctor compaction proved soil loses shear resistance and bearing capacity at 75% volumetric water content.
                </li>
                <li>
                  <b className="text-white">Buzzer Pre-Alarm at 65%:</b> Local audible buzzer is activated at 65% moisture to provide 5–10 second response lead time before catastrophic shearing.
                </li>
                <li>
                  <b className="text-white">Tilt Threshold (2.5° → 3.2°):</b> Ground displacement exceeds elastic limits once angular tilt surpasses 2.5°, reaching failure at 3.2°.
                </li>
                <li>
                  <b className="text-white">Network Spacing (500m–1km):</b> Modules positioned 500m–1km apart in red zones effectively detect localized cloudburst events.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Soil Lab Tests */}
      {activeTab === 'labtests' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* 1. Pycnometer Test Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Pycnometer Test
              </span>
              <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">
                Gs = 2.57
              </span>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-black font-mono text-white">
                2.57 <span className="text-xs font-normal text-slate-400">g/cm³</span>
              </div>
              <p className="text-xs text-slate-400">
                {soilLabTests.pycnometer.significance}
              </p>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 space-y-1">
                <div>Soil Classification: <b className="text-amber-300">Residual Clayey Silt</b></div>
                <div>Dry Weight Ratio: <b className="text-slate-200">Standard Specimen</b></div>
              </div>
            </div>
          </div>

          {/* 2. Direct Shear Test Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                Direct Shear Test
              </span>
              <span className="text-[10px] font-mono bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded">
                c = 0.36 kPa
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">COHESION (c)</span>
                  <span className="text-xl font-bold font-mono text-white">0.36 kPa</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">FRICTION (ϕ)</span>
                  <span className="text-xl font-bold font-mono text-white">19.0°</span>
                </div>
              </div>
              <p className="text-xs text-slate-400">
                Mohr-Coulomb: <code className="text-sky-300 font-mono">τ = c + σₙ·tan(ϕ)</code>. Low cohesion confirms high susceptibility to sliding when pore pressure rises.
              </p>
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Normal Stress (σₙ):</span>
                  <span className="font-mono text-white">{normalStress} kPa</span>
                </div>
                <input 
                  type="range"
                  min="10"
                  max="150"
                  value={normalStress}
                  onChange={(e) => setNormalStress(+e.target.value)}
                  className="w-full accent-sky-400 h-1.5 bg-slate-800 rounded cursor-pointer"
                />
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Computed Shear Strength (τ):</span>
                  <span className="font-mono font-bold text-emerald-400">{shearStrength} kPa</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Standard Proctor Test Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Standard Proctor Test
              </span>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">
                OMC = 17%
              </span>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-black font-mono text-white">
                17.0% <span className="text-xs font-normal text-slate-400">Optimum Moisture Content</span>
              </div>
              <p className="text-xs text-slate-400">
                Max dry density is achieved at 17% moisture. Exceeding 65% initiates loss of inter-grain friction, while 75% triggers total shear liquefaction.
              </p>
              <div className="pt-2 border-t border-slate-800 space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Max Dry Density:</span>
                  <span className="font-mono text-white">1.88 g/cm³</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Pre-Alarm Setting:</span>
                  <span className="font-mono text-amber-400 font-bold">65.0% Moisture</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Failure Trigger:</span>
                  <span className="font-mono text-rose-400 font-bold">75.0% Moisture</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: MEMS Tilt Inclinometer */}
      {activeTab === 'mems' && (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              MEMS 3-Axis Accelerometer & Gyroscope Inclinometer Response
            </h3>
            <span className="text-[10px] font-mono bg-slate-900 border border-slate-800 px-2 py-1 rounded text-cyan-300">
              Sampling: 20 Hz • Response: 5–10s
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase">X-Axis Lateral Tilt</span>
              <div className="text-2xl font-black font-mono text-cyan-400">
                {(tiltAngle * 0.82).toFixed(2)}°
              </div>
              <p className="text-[11px] text-slate-500">Cross-slope rotational deformation</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Y-Axis Downslope Dip (Primary)</span>
              <div className={`text-2xl font-black font-mono ${
                isTiltDanger ? 'text-rose-400' : isTiltWarning ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {tiltAngle.toFixed(2)}°
              </div>
              <p className="text-[11px] text-slate-500">Gravitational slip plane deflection</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Z-Axis Vertical Vibration</span>
              <div className="text-2xl font-black font-mono text-amber-400">
                {(0.04 + tiltAngle * 0.08).toFixed(3)} g
              </div>
              <p className="text-[11px] text-slate-500">Subsurface shear acoustic tremors</p>
            </div>

          </div>

          {/* Alarm Actuation Box */}
          <div className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
            isTiltDanger 
              ? 'bg-rose-950/40 border-rose-500/60 text-rose-300' 
              : isTiltWarning 
              ? 'bg-amber-950/30 border-amber-500/50 text-amber-300'
              : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
          }`}>
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 animate-pulse shrink-0" />
              <div>
                <div className="font-bold text-xs">
                  {isTiltDanger 
                    ? 'LOCAL HIGH-DECIBEL BUZZER & GSM TRANSMITTER ACTIVE' 
                    : isTiltWarning 
                    ? 'CRITICAL DISPLACEMENT ACCELERATION DETECTED' 
                    : 'MICRO-INCLINATION WITHIN PERMISSIBLE ELASTIC THRESHOLD'}
                </div>
                <div className="text-[11px] opacity-80">
                  Threshold: 2.5° (Critical) | Observed Failure: 3.2° | Response Time: 5–10 sec
                </div>
              </div>
            </div>
            <div className="font-mono text-xs font-bold px-3 py-1 rounded bg-black/40">
              Δθ = {tiltAngle}°
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
