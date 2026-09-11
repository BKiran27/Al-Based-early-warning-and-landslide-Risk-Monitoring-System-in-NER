import React, { useState, useMemo } from 'react';
import { 
  Cpu, Sliders, Activity, Mountain, CloudRain, Droplets, 
  Compass, ShieldAlert, Sparkles, HelpCircle, CheckCircle2, RotateCcw 
} from 'lucide-react';
import { 
  calculateFactorOfSafety, 
  calculateLsiScore, 
  generateDynamicShapValues 
} from '../../services/mlInference';

export function AiEngineDeck({ lang }) {
  // Simulator Input Parameters
  const [rainfall48, setRainfall48] = useState(185);
  const [slopeDeg, setSlopeDeg] = useState(42);
  const [soilSaturation, setSoilSaturation] = useState(88);
  const [insarCreepMm, setInsarCreepMm] = useState(-28);
  const [cohesion, setCohesion] = useState(12.5);
  const [frictionAngleDeg, setFrictionAngleDeg] = useState(27);
  const [ndviVegetation, setNdviVegetation] = useState(0.38);

  // Compute live inference values
  const fsResult = useMemo(() => calculateFactorOfSafety({
    slopeDeg,
    rainfall48,
    soilSaturation,
    cohesion,
    frictionAngleDeg
  }), [slopeDeg, rainfall48, soilSaturation, cohesion, frictionAngleDeg]);

  const lsiResult = useMemo(() => calculateLsiScore({
    rainfall48,
    slopeDeg,
    soilSaturation,
    insarCreepMm,
    ndviVegetation
  }), [rainfall48, slopeDeg, soilSaturation, insarCreepMm, ndviVegetation]);

  const shapResult = useMemo(() => generateDynamicShapValues({
    rainfall48,
    slopeDeg,
    soilSaturation,
    insarCreepMm,
    ndviVegetation
  }), [rainfall48, slopeDeg, soilSaturation, insarCreepMm, ndviVegetation]);

  // Preset scenarios for instant jury demonstration
  const applyPreset = (preset) => {
    if (preset === 'cloudburst') {
      setRainfall48(295);
      setSlopeDeg(46);
      setSoilSaturation(96);
      setInsarCreepMm(-38);
      setCohesion(9.0);
      setFrictionAngleDeg(24);
      setNdviVegetation(0.25);
    } else if (preset === 'dry') {
      setRainfall48(12);
      setSlopeDeg(30);
      setSoilSaturation(42);
      setInsarCreepMm(-3);
      setCohesion(18.0);
      setFrictionAngleDeg(32);
      setNdviVegetation(0.72);
    } else if (preset === 'haflong') {
      setRainfall48(175);
      setSlopeDeg(38);
      setSoilSaturation(92);
      setInsarCreepMm(-22);
      setCohesion(11.0);
      setFrictionAngleDeg(26);
      setNdviVegetation(0.40);
    }
  };

  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-[#0c1322] border border-cyan-500/30 space-y-6 shadow-2xl">
      
      {/* Deck Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                AI/ML Predictive Analytics Engine & Geotechnical Studio
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                XGBoost + Infinite Slope (Fs)
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive What-If simulation studio computing instantaneous Factor of Safety and TreeSHAP attribution
            </p>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium hidden md:inline">Presets:</span>
          <button
            onClick={() => applyPreset('cloudburst')}
            className="px-2.5 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 rounded-lg text-xs font-semibold transition cursor-pointer"
          >
            Cloudburst Collapse
          </button>
          <button
            onClick={() => applyPreset('haflong')}
            className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-semibold transition cursor-pointer"
          >
            Haflong Saturated
          </button>
          <button
            onClick={() => applyPreset('dry')}
            className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs font-semibold transition cursor-pointer"
          >
            Dry Baseline
          </button>
        </div>
      </div>

      {/* Main Dual-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Simulation Sliders (5 Cols) */}
        <div className="lg:col-span-5 space-y-4 p-5 bg-slate-900/60 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Dynamic Variable Controls
            </span>
            <span className="text-[10px] font-mono text-slate-500">Live Client-Side Inference</span>
          </div>

          {/* Slider 1: Rainfall 48h */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-300 flex items-center gap-1.5">
                <CloudRain className="w-3.5 h-3.5 text-sky-400" /> 48h Precipitation:
              </span>
              <span className="font-mono font-bold text-sky-400">{rainfall48} mm</span>
            </div>
            <input
              type="range"
              min="10"
              max="350"
              value={rainfall48}
              onChange={(e) => setRainfall48(Number(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>10 mm (Dry)</span>
              <span>180 mm (High)</span>
              <span>350 mm (Extr. Cloudburst)</span>
            </div>
          </div>

          {/* Slider 2: Slope Gradient */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Mountain className="w-3.5 h-3.5 text-amber-400" /> Slope Gradient (β):
              </span>
              <span className="font-mono font-bold text-amber-400">{slopeDeg}°</span>
            </div>
            <input
              type="range"
              min="15"
              max="65"
              value={slopeDeg}
              onChange={(e) => setSlopeDeg(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>15° (Gentle)</span>
              <span>35° (Critical)</span>
              <span>65° (Cliff Wall)</span>
            </div>
          </div>

          {/* Slider 3: Soil Moisture Saturation */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-blue-400" /> Soil Saturation:
              </span>
              <span className="font-mono font-bold text-blue-400">{soilSaturation}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              value={soilSaturation}
              onChange={(e) => setSoilSaturation(Number(e.target.value))}
              className="w-full accent-blue-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>30% (Permeable)</span>
              <span>75% (Field Cap)</span>
              <span>100% (Liquefaction)</span>
            </div>
          </div>

          {/* Slider 4: InSAR Surface Creep */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-rose-400" /> InSAR Creep Velocity:
              </span>
              <span className="font-mono font-bold text-rose-400">{insarCreepMm} mm/yr</span>
            </div>
            <input
              type="range"
              min="-45"
              max="0"
              value={insarCreepMm}
              onChange={(e) => setInsarCreepMm(Number(e.target.value))}
              className="w-full accent-rose-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>-45 mm (High Subsidence)</span>
              <span>-20 mm</span>
              <span>0 mm (Static)</span>
            </div>
          </div>

          {/* Slider 5: Geotechnical Cohesion c' */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-emerald-400" /> Effective Cohesion (c'):
              </span>
              <span className="font-mono font-bold text-emerald-400">{cohesion} kPa</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="0.5"
              value={cohesion}
              onChange={(e) => setCohesion(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>

          {/* Slider 6: Internal Friction Angle phi' */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-purple-400" /> Friction Angle (φ'):
              </span>
              <span className="font-mono font-bold text-purple-400">{frictionAngleDeg}°</span>
            </div>
            <input
              type="range"
              min="20"
              max="42"
              value={frictionAngleDeg}
              onChange={(e) => setFrictionAngleDeg(Number(e.target.value))}
              className="w-full accent-purple-400 cursor-pointer"
            />
          </div>

          {/* Reset Button */}
          <button
            onClick={() => {
              setRainfall48(185);
              setSlopeDeg(42);
              setSoilSaturation(88);
              setInsarCreepMm(-28);
              setCohesion(12.5);
              setFrictionAngleDeg(27);
              setNdviVegetation(0.38);
            }}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Variables to Defaults
          </button>
        </div>

        {/* Right Column: Live Model Inference Outputs (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Top Gauges: Factor of Safety & LSI Score */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Geotechnical Factor of Safety Card */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-bold uppercase tracking-wider">
                  Geotechnical Factor of Safety (Fs)
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${fsResult.badgeColor}`}>
                  {fsResult.state}
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <div className={`text-3xl font-black font-mono ${fsResult.color}`}>
                  {fsResult.fs}
                </div>
                <div className="text-xs text-slate-400">
                  Threshold: Fs &lt; 1.00 = Slope Shear Failure
                </div>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    fsResult.fs < 1.0 ? 'bg-red-500' : fsResult.fs < 1.25 ? 'bg-rose-500' : fsResult.fs < 1.5 ? 'bg-amber-400' : 'bg-emerald-400'
                  }`}
                  style={{ width: `${Math.min(100, (fsResult.fs / 2.5) * 100)}%` }}
                />
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400">
                <div>Pore Press: <b className="text-slate-200">{fsResult.porePressureKPa} kPa</b></div>
                <div>Shear Res: <b className="text-slate-200">{fsResult.shearStrengthKPa} kPa</b></div>
                <div>Driving: <b className="text-slate-200">{fsResult.shearStressKPa} kPa</b></div>
              </div>
            </div>

            {/* AI Susceptibility Index (LSI) Card */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-bold uppercase tracking-wider">
                  Predictive LSI Score
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  lsiResult.tier === 'SEVERE' ? 'bg-red-500/20 text-red-300 border border-red-500/40' :
                  lsiResult.tier === 'HIGH' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                  lsiResult.tier === 'MODERATE' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                  'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}>
                  {lsiResult.tier} RISK
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <div className={`text-3xl font-black font-mono ${lsiResult.tierColor}`}>
                  {lsiResult.lsi}
                </div>
                <div className="text-xs text-slate-400">
                  Calibrated Probability: {(lsiResult.lsi * 100).toFixed(0)}%
                </div>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    lsiResult.lsi >= 0.85 ? 'bg-red-500' : lsiResult.lsi >= 0.7 ? 'bg-rose-500' : lsiResult.lsi >= 0.45 ? 'bg-amber-400' : 'bg-emerald-400'
                  }`}
                  style={{ width: `${lsiResult.lsi * 100}%` }}
                />
              </div>
              <div className="pt-2 border-t border-slate-800 text-[11px] font-semibold text-slate-300">
                Action: <span className={lsiResult.tierColor}>{lsiResult.urgency}</span>
              </div>
            </div>

          </div>

          {/* Dynamic TreeSHAP Explainability Waterfall */}
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Real-time TreeSHAP Feature Attribution Waterfall
                </h4>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Base E[f(x)] = {shapResult.baseValue} ➔ Model f(x) = {shapResult.predictedValue}
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              TreeSHAP calculates the exact marginal game-theoretic payoff contribution of each environmental parameter toward the predicted landslide vulnerability.
            </p>

            {/* Feature Bars */}
            <div className="space-y-3">
              {shapResult.features.map((f, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-slate-200">
                      {f.name} <span className="text-[10px] font-mono text-slate-400">({f.value})</span>
                    </span>
                    <span className={`font-mono text-xs font-bold ${f.direction === 'positive' ? 'text-red-400' : 'text-emerald-400'}`}>
                      {f.direction === 'positive' ? `+${f.shap}` : `${f.shap}`} ({f.pctOfTotal}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden flex">
                    <div 
                      className={`h-full transition-all duration-300 ${f.direction === 'positive' ? 'bg-red-500' : 'bg-emerald-500'}`}
                      style={{ width: `${Math.min(100, f.pctOfTotal)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Explanatory summary text */}
            <div className="p-3 bg-black/40 rounded-lg border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed text-[11px]">
                Under current simulated conditions, <strong>{shapResult.features[0].name} ({rainfall48} mm)</strong> and <strong>{shapResult.features[1].name} ({slopeDeg}°)</strong> are the primary drivers driving the safety factor down to <strong>Fs = {fsResult.fs}</strong>.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AiEngineDeck;
