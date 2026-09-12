import React, { useState, useMemo } from 'react';
import { 
  BarChart2, Cpu, CheckCircle2, AlertTriangle, TrendingUp, 
  HelpCircle, Sliders, ExternalLink, Sparkles, Filter 
} from 'lucide-react';
import { mlBenchmarkData } from '../../data/mlBenchmarkData';

export function MlBenchmarkDeck({ lang }) {
  // Simulator Input Parameters (Table 2 in E3S paper)
  const [c, setC] = useState(25); // Soil Cohesion: 0 - 150 kPa
  const [R, setR] = useState(72); // Rainfall: 50 - 100 mm/hr
  const [phi, setPhi] = useState(24); // Internal friction angle: 0 - 45 deg
  const [beta, setBeta] = useState(38); // Slope angle: 16 - 53 deg
  const [H, setH] = useState(180); // Slope height: 100 - 350 m

  const [selectedModel, setSelectedModel] = useState('rf'); // 'mlr' | 'dt' | 'rf'

  // Live comparative prediction computation
  const livePredictions = useMemo(() => {
    return mlBenchmarkData.predictComparativeFos({ c, R, phi, beta, H });
  }, [c, R, phi, beta, H]);

  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-[#0c1322] border border-emerald-500/30 space-y-6 shadow-2xl">
      
      {/* Deck Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Academic ML Benchmark & Comparative Model Studio
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                E3S Web of Conferences 2026
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Direct implementation of Multilinear Regression vs. Decision Tree vs. Random Forest for IoT-based FOS prediction
            </p>
          </div>
        </div>

        {/* Paper Citation Link */}
        <a 
          href="https://doi.org/10.1051/e3sconf/202669203011"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-cyan-400 transition"
        >
          <span>DOI: 10.1051/e3sconf/202669203011</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Model Benchmark Comparison Cards (Table 3 from paper) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mlBenchmarkData.modelsTable.map((m) => (
          <div 
            key={m.id}
            onClick={() => setSelectedModel(m.id)}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              selectedModel === m.id
                ? 'bg-slate-900/90 border-cyan-400 shadow-lg shadow-cyan-500/10 scale-[1.01]'
                : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${m.badgeColor}`}>
                {m.shortName}
              </span>
              <span className="text-[10px] font-mono text-slate-500">{m.type}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/80 my-2 text-center">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono block">R² SCORE</span>
                <span className="text-lg font-bold font-mono text-white">{m.r2}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono block">RMSE</span>
                <span className="text-lg font-bold font-mono text-amber-300">{m.rmse}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono block">MAE</span>
                <span className="text-lg font-bold font-mono text-emerald-300">{m.mae}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              {m.summary}
            </p>

            <div className="mt-3 pt-2 border-t border-slate-900 flex justify-between items-center text-[10px] font-mono text-slate-500">
              <span>Residual: <b className="text-slate-300">{m.residualSpread}</b></span>
              <span>Noise: <b className="text-slate-300">{m.noiseTolerance}</b></span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Geotechnical Parameter Predictor Bench */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Real-Time Geotechnical Input Bench (Paper Table 2 Bounds)
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            Slope Stability Tier: <b className={`${
              livePredictions.rf < 1.0 ? 'text-rose-400 font-bold' : (livePredictions.rf < 1.3 ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold')
            }`}>{livePredictions.stabilityTier}</b>
          </span>
        </div>

        {/* 5 Input Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-2">
          
          {/* Cohesion */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Soil Cohesion (c):</span>
              <span className="font-mono text-white font-bold">{c} kPa</span>
            </div>
            <input 
              type="range" min="0" max="150" value={c}
              onChange={(e) => setC(+e.target.value)}
              className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-slate-500 font-mono">
              <span>0 kPa</span><span>150 kPa</span>
            </div>
          </div>

          {/* Rainfall */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Rainfall (R):</span>
              <span className="font-mono text-cyan-400 font-bold">{R} mm</span>
            </div>
            <input 
              type="range" min="50" max="100" value={R}
              onChange={(e) => setR(+e.target.value)}
              className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-slate-500 font-mono">
              <span>50 mm</span><span>100 mm</span>
            </div>
          </div>

          {/* Friction Angle */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Friction Angle (ϕ):</span>
              <span className="font-mono text-purple-400 font-bold">{phi}°</span>
            </div>
            <input 
              type="range" min="0" max="45" value={phi}
              onChange={(e) => setPhi(+e.target.value)}
              className="w-full accent-purple-400 h-1.5 bg-slate-800 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-slate-500 font-mono">
              <span>0°</span><span>45°</span>
            </div>
          </div>

          {/* Slope Angle */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Slope Angle (β):</span>
              <span className="font-mono text-amber-400 font-bold">{beta}°</span>
            </div>
            <input 
              type="range" min="16" max="53" value={beta}
              onChange={(e) => setBeta(+e.target.value)}
              className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-slate-500 font-mono">
              <span>16°</span><span>53°</span>
            </div>
          </div>

          {/* Height */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Slope Height (H):</span>
              <span className="font-mono text-pink-400 font-bold">{H} m</span>
            </div>
            <input 
              type="range" min="100" max="350" value={H}
              onChange={(e) => setH(+e.target.value)}
              className="w-full accent-pink-400 h-1.5 bg-slate-800 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-slate-500 font-mono">
              <span>100 m</span><span>350 m</span>
            </div>
          </div>

        </div>

        {/* Live Multi-Model Predictions Banner */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-2 rounded-lg bg-black/40 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Theoretical Fs</span>
            <span className="text-xl font-black font-mono text-white">{livePredictions.theoreticalFos}</span>
          </div>

          <div className="p-2 rounded-lg bg-amber-950/20 border border-amber-800/40">
            <span className="text-[10px] font-mono text-amber-400 uppercase block">MLR Pred (R²=0.82)</span>
            <span className="text-xl font-black font-mono text-amber-300">{livePredictions.mlr}</span>
          </div>

          <div className="p-2 rounded-lg bg-sky-950/20 border border-sky-800/40">
            <span className="text-[10px] font-mono text-sky-400 uppercase block">Decision Tree (R²=0.89)</span>
            <span className="text-xl font-black font-mono text-sky-300">{livePredictions.dt}</span>
          </div>

          <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/50 shadow-inner">
            <span className="text-[10px] font-mono text-emerald-400 uppercase block font-bold">Random Forest (R²=0.94)</span>
            <span className="text-xl font-black font-mono text-emerald-300">{livePredictions.rf}</span>
          </div>
        </div>
      </div>

      {/* Feature Importance & Residuals Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Feature Importance (Random Forest Attribution) */}
        <div className="lg:col-span-6 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Random Forest Feature Importance (%)
            </span>
            <span className="text-[10px] font-mono text-emerald-400">Ensemble Gini Importance</span>
          </div>

          <div className="space-y-2.5 pt-2">
            {mlBenchmarkData.featureImportance.map((feat) => (
              <div key={feat.feature} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">{feat.feature}</span>
                  <span className="font-mono font-bold text-white">{feat.importancePct}%</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${feat.importancePct}%`, 
                      backgroundColor: feat.color 
                    }}
                  />
                </div>
                <p className="text-[10px] text-slate-500">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Residual Distributions Comparison (Figure 6 from Paper) */}
        <div className="lg:col-span-6 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-amber-400" />
              Comparative Residual Distributions (Figure 6)
            </span>
            <span className="text-[10px] font-mono text-cyan-400">Zero-Centered Symmetry</span>
          </div>

          <p className="text-[11px] text-slate-400 leading-normal">
            Figure 6 shows Multilinear Regression residuals spread widely from -0.10 to +0.20, Decision Tree residuals exhibit moderate skewness, while <b className="text-emerald-400">Random Forest exhibits a near-symmetrical zero-centered Gaussian distribution</b> with the lowest variance.
          </p>

          <div className="grid grid-cols-3 gap-2 pt-2">
            
            {/* MLR Residuals */}
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-center space-y-1.5">
              <span className="text-[10px] font-mono text-amber-400 font-bold block">MLR Residuals</span>
              <div className="h-20 flex items-end justify-center gap-1">
                {mlBenchmarkData.residualHistograms.mlr.map((b, idx) => (
                  <div 
                    key={idx} 
                    className="w-2.5 bg-amber-500/70 rounded-t"
                    style={{ height: `${b.freq * 18}%` }}
                    title={`${b.range}: freq ${b.freq}`}
                  />
                ))}
              </div>
              <span className="text-[9px] font-mono text-slate-500 block">Wide Spread (-0.15 to +0.20)</span>
            </div>

            {/* DT Residuals */}
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-center space-y-1.5">
              <span className="text-[10px] font-mono text-sky-400 font-bold block">Decision Tree</span>
              <div className="h-20 flex items-end justify-center gap-1">
                {mlBenchmarkData.residualHistograms.dt.map((b, idx) => (
                  <div 
                    key={idx} 
                    className="w-3 bg-sky-500/70 rounded-t"
                    style={{ height: `${b.freq * 14}%` }}
                    title={`${b.range}: freq ${b.freq}`}
                  />
                ))}
              </div>
              <span className="text-[9px] font-mono text-slate-500 block">Skewed Non-Normal</span>
            </div>

            {/* RF Residuals */}
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-emerald-500/30 text-center space-y-1.5">
              <span className="text-[10px] font-mono text-emerald-400 font-bold block">Random Forest</span>
              <div className="h-20 flex items-end justify-center gap-1">
                {mlBenchmarkData.residualHistograms.rf.map((b, idx) => (
                  <div 
                    key={idx} 
                    className="w-3 bg-emerald-400 rounded-t"
                    style={{ height: `${b.freq * 10}%` }}
                    title={`${b.range}: freq ${b.freq}`}
                  />
                ))}
              </div>
              <span className="text-[9px] font-mono text-emerald-400 font-bold block">Zero Centered (Ideal)</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
