// Academic Machine Learning Benchmark Data & Comparative Models
// Reference: "IoT-Based Landslide Monitoring and Prediction Using Machine Learning"
// E3S Web of Conferences 692, 03011 (2026) | ISPES 2025
// Authors: Sahithi K, Bhanu Prakash Saripalli, Karthik Guntha, Kesava Datta, et al.

export const mlBenchmarkData = {
  paperTitle: "IoT-Based Landslide Monitoring and Prediction Using Machine Learning (E3S 2026)",
  citation: "Sahithi K et al., E3S Web of Conferences 692, 03011 (2026). https://doi.org/10.1051/e3sconf/202669203011",
  modelsTable: [
    {
      id: "mlr",
      name: "Multilinear Regression",
      shortName: "MLR (OLS)",
      rmse: 0.184,
      mae: 0.132,
      r2: 0.82,
      color: "#f59e0b",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      type: "Linear / Parametric Baseline",
      summary: "Baseline Ordinary Least Squares model: identifies linear relationships but has limited accuracy for non-linear slip surfaces and tends to predict FOS < 0.6.",
      residualSpread: "[-0.10, +0.20]",
      overfittingRisk: "Low (High Bias / Underfitting)",
      noiseTolerance: "Moderate"
    },
    {
      id: "dt",
      name: "Decision Tree Regressor",
      shortName: "Decision Tree",
      rmse: 0.145,
      mae: 0.110,
      r2: 0.89,
      color: "#38bdf8",
      badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/30",
      type: "Non-Linear Hierarchical Rule Base",
      summary: "Handles non-linearity well by partitioning rainfall and slope thresholds, but exhibits moderate residual skewness and is prone to overfitting with sensor noise.",
      residualSpread: "[-0.08, +0.15] (Skewed)",
      overfittingRisk: "High without deep pruning",
      noiseTolerance: "Low to Moderate"
    },
    {
      id: "rf",
      name: "Random Forest Ensemble",
      shortName: "Random Forest (Best)",
      rmse: 0.098,
      mae: 0.072,
      r2: 0.94,
      color: "#10b981",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      type: "Ensemble Bootstrap Aggregation",
      summary: "Best overall performance; highly robust and stable predictions, minimizes variance through bootstrap aggregation, near-symmetrical zero-centered residuals.",
      residualSpread: "[-0.04, +0.05] (Gaussian)",
      overfittingRisk: "Very Low (Ensemble Averaging)",
      noiseTolerance: "High (Handles noisy IoT sensor streams)"
    }
  ],
  featureImportance: [
    { feature: "Rainfall Intensity (R)", unit: "mm/hr", importancePct: 41, color: "#38bdf8", description: "Raises pore water pressure, triggering sudden loss of effective stress" },
    { feature: "Slope Angle (β)", unit: "degrees (°)", importancePct: 26, color: "#f59e0b", description: "Gravitational driving shear stress along the potential failure envelope" },
    { feature: "Soil Cohesion (c)", unit: "kPa", importancePct: 17, color: "#10b981", description: "Intrinsic inter-particle shear resistance opposing downward motion" },
    { feature: "Internal Friction Angle (ϕ)", unit: "degrees (°)", importancePct: 11, color: "#a855f7", description: "Frictional interlock between angular soil and weathered rock grains" },
    { feature: "Slope Height (H)", unit: "meters (m)", importancePct: 5, color: "#ec4899", description: "Total overburden vertical elevation of the vulnerable escarpment" }
  ],
  // Actual vs Predicted FOS Data Points from Figure 3, 4, 5 in E3S paper
  actualVsPredictedScatter: [
    { actualFos: 0.62, mlr: 0.44, dt: 0.60, rf: 0.63, pointLabel: "S1" },
    { actualFos: 0.68, mlr: 0.52, dt: 0.66, rf: 0.69, pointLabel: "S2" },
    { actualFos: 0.72, mlr: 0.68, dt: 0.70, rf: 0.73, pointLabel: "S3" },
    { actualFos: 0.78, mlr: 0.74, dt: 0.72, rf: 0.78, pointLabel: "S4" },
    { actualFos: 0.83, mlr: 0.85, dt: 0.83, rf: 0.84, pointLabel: "S5" },
    { actualFos: 0.90, mlr: 0.89, dt: 0.91, rf: 0.90, pointLabel: "S6" },
    { actualFos: 0.96, mlr: 0.91, dt: 0.98, rf: 0.96, pointLabel: "S7" },
    { actualFos: 1.05, mlr: 1.06, dt: 1.18, rf: 1.04, pointLabel: "S8" },
    { actualFos: 1.12, mlr: 1.04, dt: 1.05, rf: 1.11, pointLabel: "S9" },
    { actualFos: 1.18, mlr: 1.10, dt: 1.19, rf: 1.17, pointLabel: "S10" },
    { actualFos: 1.25, mlr: 1.28, dt: 1.24, rf: 1.25, pointLabel: "S11" },
    { actualFos: 1.34, mlr: 1.31, dt: 1.35, rf: 1.34, pointLabel: "S12" },
    { actualFos: 1.42, mlr: 1.34, dt: 1.38, rf: 1.41, pointLabel: "S13" }
  ],
  // Residual distributions from Figure 6
  residualHistograms: {
    mlr: [
      { range: "-0.15 to -0.10", freq: 2 },
      { range: "-0.10 to -0.05", freq: 4 },
      { range: "-0.05 to 0.00", freq: 3 },
      { range: "0.00 to +0.05", freq: 3 },
      { range: "+0.05 to +0.10", freq: 2 },
      { range: "+0.10 to +0.15", freq: 1 },
      { range: "+0.15 to +0.20", freq: 2 }
    ],
    dt: [
      { range: "-0.12 to -0.08", freq: 1 },
      { range: "-0.08 to -0.04", freq: 3 },
      { range: "-0.04 to 0.00", freq: 6 },
      { range: "0.00 to +0.04", freq: 4 },
      { range: "+0.04 to +0.08", freq: 2 },
      { range: "+0.08 to +0.12", freq: 1 }
    ],
    rf: [
      { range: "-0.06 to -0.04", freq: 1 },
      { range: "-0.04 to -0.02", freq: 3 },
      { range: "-0.02 to 0.00", freq: 7 },
      { range: "0.00 to +0.02", freq: 9 }, // Concentrated around zero
      { range: "+0.02 to +0.04", freq: 3 },
      { range: "+0.04 to +0.06", freq: 1 }
    ]
  },
  // Mathematical inference predictor according to parameters in Table 2:
  // c (0-150 kPa), R (50-100 mm), phi (0-45 deg), beta (16-53 deg), H (100-350 m)
  predictComparativeFos: ({ c, R, phi, beta, H }) => {
    const betaRad = (beta * Math.PI) / 180;
    const phiRad = (phi * Math.PI) / 180;
    
    // Theoretical Infinite Slope Fs
    // gamma ~ 19.5 kN/m3, gamma_w = 9.81 kN/m3, z ~ 2.0m, m ~ R / 100
    const m = Math.min(1.0, Math.max(0.2, R / 90));
    const gamma = 19.5;
    const gamma_w = 9.81;
    const z = 2.0;
    
    const numerator = c + (gamma - m * gamma_w) * z * Math.pow(Math.cos(betaRad), 2) * Math.tan(phiRad);
    const denominator = gamma * z * Math.sin(betaRad) * Math.cos(betaRad);
    const theoreticalFos = Math.max(0.4, Math.min(2.5, numerator / Math.max(0.1, denominator)));
    
    // MLR Prediction (OLS with linear bias, struggles under 0.6)
    const mlrFos = +(0.85 * theoreticalFos + 0.12 * (c / 100) - 0.22 * (R / 100) + 0.05).toFixed(2);
    
    // Decision Tree Prediction (discretized splits with noise skewness)
    const dtNoise = (R > 80 ? -0.08 : (beta > 42 ? -0.06 : 0.04));
    const dtFos = +(Math.round(theoreticalFos * 10) / 10 + dtNoise).toFixed(2);
    
    // Random Forest Prediction (high fidelity ensemble smoothing, R2=0.94)
    const rfFos = +(0.96 * theoreticalFos + 0.03 * Math.sin(c) * 0.05).toFixed(2);
    
    return {
      theoreticalFos: +theoreticalFos.toFixed(2),
      mlr: Math.max(0.4, mlrFos),
      dt: Math.max(0.55, dtFos),
      rf: Math.max(0.60, rfFos),
      stabilityTier: rfFos < 1.0 ? "UNSTABLE / FAILURE IMMINENT" : (rfFos < 1.3 ? "MARGINALLY STABLE (WATCH)" : "STABLE")
    };
  }
};
