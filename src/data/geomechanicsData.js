// Geotechnical Lab Data and Subsurface Soil Mechanics Models
// Reference: "IoT and AI-Based Landslide Monitoring and Early Warning System for Real-Time Risk Prediction" (JETIR May 2026)
// Soil Mechanics: Pycnometer (Gs=2.57), Direct Shear (c=0.36 kPa, phi=19 deg), Standard Proctor (OMC=17%, failure at 75%)

export const soilLabTests = {
  pycnometer: {
    testName: "Specific Gravity by Pycnometer Test",
    specificGravity: 2.57,
    soilType: "Residual Weathered Himalayan Silty Clay",
    significance: "Standard specific gravity for fine-grained alluvial/colluvial mountain soils in the North Eastern Region."
  },
  directShear: {
    testName: "Direct Shear Box Test",
    cohesion_kPa: 0.36,
    frictionAngle_deg: 19.0,
    soilClassification: "Low shear strength colluvium, highly vulnerable to sliding under pore water pressure",
    stressPoints: [
      { normalStress_psi: 24.5, shearStress_psi: 4.2 },
      { normalStress_psi: 49.0, shearStress_psi: 8.8 },
      { normalStress_psi: 100.0, shearStress_psi: 15.6 }
    ],
    calculateShearStrength: (normalStress_kPa) => {
      const phiRad = (19.0 * Math.PI) / 180;
      return +(0.36 + normalStress_kPa * Math.tan(phiRad)).toFixed(2);
    }
  },
  proctorCompaction: {
    testName: "Standard Proctor Compaction Test",
    optimumMoistureContent_pct: 17.0,
    maximumDryDensity_gcm3: 1.88,
    thresholds: {
      dryBaseline: 15.0,
      optimumMoisture: 17.0,
      highRiskPreAlarm: 65.0, // Buzzer trigger in experimental model
      criticalFailure: 75.0   // Soil bearing capacity collapses, mudflow initiates
    },
    curvePoints: [
      { moisture_pct: 10, dryDensity_gcm3: 1.62 },
      { moisture_pct: 13, dryDensity_gcm3: 1.76 },
      { moisture_pct: 15, dryDensity_gcm3: 1.84 },
      { moisture_pct: 17, dryDensity_gcm3: 1.88 }, // OMC Peak
      { moisture_pct: 19, dryDensity_gcm3: 1.85 },
      { moisture_pct: 22, dryDensity_gcm3: 1.74 },
      { moisture_pct: 26, dryDensity_gcm3: 1.58 }
    ]
  },
  tiltKinematics: {
    sensorType: "3-Axis MEMS Inclinometer & Accelerometer",
    samplingFrequency_Hz: 20,
    thresholds: {
      normalStable_deg: 0.8,
      preWarning_deg: 2.0,
      criticalWarning_deg: 2.5, // JETIR 2026 Warning Threshold
      observedDanger_deg: 3.2   // JETIR 2026 Danger Breached Threshold
    },
    responseTimeSec: "5-10 seconds to activate local acoustic alarm"
  },
  subsurfaceProfile: [
    { depthRange_m: "0.0 - 0.3m", layerName: "Topsoil & Organic Humus", k_permeability: "1.2 x 10^-4 m/s", bulkDensity: 16.5 },
    { depthRange_m: "0.3 - 1.5m", layerName: "Unsaturated Silt-Clay Matrix", k_permeability: "4.5 x 10^-6 m/s", bulkDensity: 18.2 },
    { depthRange_m: "1.5 - 2.0m", layerName: "Subsurface Shear Slip Plane (Sensor Node Probe)", k_permeability: "8.1 x 10^-7 m/s", bulkDensity: 19.8 },
    { depthRange_m: "> 2.0m", layerName: "Competent Sandstone / Shale Bedrock", k_permeability: "1.0 x 10^-9 m/s", bulkDensity: 23.5 }
  ]
};
