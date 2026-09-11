/**
 * Climate-Resilient Governance & Infrastructure Risk Exposure Data
 * State-by-State Disaster Preparedness, Economic Exposure & SOP Compliance
 */

export const STATE_GOVERNANCE_INDEX = [
  {
    state: "Sikkim",
    overallScore: 88,
    tier: "ADVANCED",
    color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
    sdrfBattalions: 4,
    emergencyShelters: 42,
    shelterCapacity: 18500,
    droneFleet: 12,
    grainBufferDays: 45,
    earlyWarningReachPct: 94.2,
    deocStatus: "24x7 ACTIVE (Gangtok & Mangan)",
    keyVulnerability: "Teesta hydro-power corridor & glacial outburst risks"
  },
  {
    state: "Meghalaya",
    overallScore: 84,
    tier: "ADVANCED",
    color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
    sdrfBattalions: 5,
    emergencyShelters: 65,
    shelterCapacity: 24000,
    droneFleet: 8,
    grainBufferDays: 60,
    earlyWarningReachPct: 91.5,
    deocStatus: "24x7 ACTIVE (Shillong & Sohra)",
    keyVulnerability: "Steep sandstone escarpments & heavy orographic monsoons"
  },
  {
    state: "Assam",
    overallScore: 86,
    tier: "ADVANCED",
    color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
    sdrfBattalions: 12,
    emergencyShelters: 180,
    shelterCapacity: 92000,
    droneFleet: 22,
    grainBufferDays: 50,
    earlyWarningReachPct: 96.0,
    deocStatus: "24x7 ACTIVE (Guwahati & Dima Hasao)",
    keyVulnerability: "Barak Valley hill link cutoffs & Dima Hasao railway"
  },
  {
    state: "Nagaland",
    overallScore: 74,
    tier: "INTERMEDIATE",
    color: "text-amber-400 border-amber-500/40 bg-amber-500/10",
    sdrfBattalions: 3,
    emergencyShelters: 32,
    shelterCapacity: 12000,
    droneFleet: 6,
    grainBufferDays: 30,
    earlyWarningReachPct: 82.4,
    deocStatus: "ACTIVE (Kohima)",
    keyVulnerability: "NH-29 Pagla Pahar sinking zone & urban slope creep"
  },
  {
    state: "Arunachal Pradesh",
    overallScore: 78,
    tier: "INTERMEDIATE",
    color: "text-amber-400 border-amber-500/40 bg-amber-500/10",
    sdrfBattalions: 4,
    emergencyShelters: 38,
    shelterCapacity: 14500,
    droneFleet: 10,
    grainBufferDays: 60,
    earlyWarningReachPct: 79.8,
    deocStatus: "ACTIVE (Itanagar & Tawang)",
    keyVulnerability: "High-altitude Sela pass debris & trans-Arunachal highway cuts"
  },
  {
    state: "Mizoram",
    overallScore: 80,
    tier: "ADVANCED",
    color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
    sdrfBattalions: 3,
    emergencyShelters: 40,
    shelterCapacity: 16000,
    droneFleet: 6,
    grainBufferDays: 45,
    earlyWarningReachPct: 88.6,
    deocStatus: "ACTIVE (Aizawl)",
    keyVulnerability: "Aizawl city ridge colluvium slump & NH-54 arterial cuts"
  },
  {
    state: "Manipur",
    overallScore: 72,
    tier: "INTERMEDIATE",
    color: "text-amber-400 border-amber-500/40 bg-amber-500/10",
    sdrfBattalions: 3,
    emergencyShelters: 30,
    shelterCapacity: 11000,
    droneFleet: 4,
    grainBufferDays: 35,
    earlyWarningReachPct: 76.2,
    deocStatus: "ACTIVE (Imphal & Noney)",
    keyVulnerability: "Tupul-Jiribam railway cut slopes & NH-37 landslide choke points"
  },
  {
    state: "Tripura",
    overallScore: 82,
    tier: "ADVANCED",
    color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
    sdrfBattalions: 3,
    emergencyShelters: 48,
    shelterCapacity: 19000,
    droneFleet: 6,
    grainBufferDays: 40,
    earlyWarningReachPct: 93.0,
    deocStatus: "ACTIVE (Agartala)",
    keyVulnerability: "Jampui Hills erosion & riverine bank slump"
  }
];

export const INFRASTRUCTURE_DAMAGE_MODELS = [
  {
    assetName: "NH-10 Sevoke - Gangtok Arterial Lifeline",
    lengthKm: 120,
    criticalKmMark: "KM 29 - KM 32",
    dailyFreightTons: 14500,
    dailyEconomicThroughputCr: 28.5,
    projectedDamageScenario: {
      totalBlockageDays: 7,
      clearingCostEstCr: 4.8,
      supplyChainDisruptionCr: 199.5,
      detourTransitCostPenaltyCr: 16.2,
      totalEconomicExposureCr: 220.5
    },
    mitigationAction: "Pre-positioned BRO crawler excavators at Teesta Bridge; real-time piezometer tripwire alert."
  },
  {
    assetName: "Haflong - Silchar Railway & Highway Corridor (SH-5)",
    lengthKm: 98,
    criticalKmMark: "KM 42 Mahur Cutting",
    dailyFreightTons: 8200,
    dailyEconomicThroughputCr: 14.2,
    projectedDamageScenario: {
      totalBlockageDays: 12,
      clearingCostEstCr: 8.4,
      supplyChainDisruptionCr: 170.4,
      detourTransitCostPenaltyCr: 24.0,
      totalEconomicExposureCr: 202.8
    },
    mitigationAction: "Subsurface drainage siphon boreholes and gabion gravity wall re-anchoring."
  },
  {
    assetName: "NH-29 Dimapur - Kohima Corridor (Pagla Pahar)",
    lengthKm: 74,
    criticalKmMark: "KM 12 - KM 16",
    dailyFreightTons: 9800,
    dailyEconomicThroughputCr: 18.0,
    projectedDamageScenario: {
      totalBlockageDays: 5,
      clearingCostEstCr: 3.2,
      supplyChainDisruptionCr: 90.0,
      detourTransitCostPenaltyCr: 11.5,
      totalEconomicExposureCr: 104.7
    },
    mitigationAction: "Active rockfall barrier netting and Niuland alternate bypass bypass routing."
  }
];
