export const roadCorridors = [
  {
    name: "NH-10 (Sikkim Lifeline - Blocked Section)",
    status: "BLOCKED",
    color: "#ef4444",
    weight: 5,
    dashArray: undefined,
    detour: "Divert via Panbu - Mungpoo - Jorethang link road (ETA 6h)",
    path: [
      [26.72, 88.43],
      [26.88, 88.47],
      [27.05, 88.49]
    ]
  },
  {
    name: "NH-10 Active Emergency Detour (Panbu Route)",
    status: "OPERATIONAL_DETOUR",
    color: "#06b6d4",
    weight: 3.5,
    dashArray: "6, 6",
    detour: "Designated one-way emergency corridor for essential supplies & light vehicles",
    path: [
      [26.88, 88.47],
      [26.98, 88.62],
      [27.10, 88.58],
      [27.23, 88.50]
    ]
  },
  {
    name: "SH-5 (Shillong - Cherrapunji Tourist & Mining Corridor)",
    status: "HIGH_RISK_RESTRICTED",
    color: "#f59e0b",
    weight: 4,
    dashArray: undefined,
    detour: "Heavy commercial vehicles restricted past 18:00 hrs. Speed limit 30 km/h.",
    path: [
      [25.57, 91.88],
      [25.40, 91.80],
      [25.28, 91.73]
    ]
  },
  {
    name: "NH-6 (Shillong - Silchar Lifeline)",
    status: "OPEN_MONITORED",
    color: "#10b981",
    weight: 3.5,
    dashArray: undefined,
    detour: "Normal flow with NDRF spotters at Sonapur tunnel portal",
    path: [
      [25.57, 91.88],
      [25.32, 92.20],
      [25.10, 92.50],
      [24.83, 92.79]
    ]
  },
  {
    name: "NH-29 (Dimapur - Kohima Highway)",
    status: "RESTRICTED",
    color: "#f97316",
    weight: 3.5,
    dashArray: undefined,
    detour: "One-way pilot car system active at Dzüza bridge landslide slide area",
    path: [
      [25.90, 93.73],
      [25.75, 93.92],
      [25.67, 94.10]
    ]
  }
];

export const roadCorridorsTable = [
  {
    id: "ROAD-SK-01",
    highway: "NH-10 (Sikkim Lifeline)",
    section: "Sevoke to Teesta Bazaar (Km 29)",
    status: "BLOCKED",
    cause: "Debris Avalanche & Severe Embankment Undermining",
    detour: "Divert via Panbu - Mungpoo - Jorethang link road (Light Vehicles Only).",
    eta: "6 Hours",
    villagesIsolated: 5,
    isolatedVillages: ["Melli Flank", "Teesta Bazaar", "29th Mile", "Kalijhora", "Singtam Lower Pocket"],
    populationAffected: "18,400 Residents",
    statusColor: "text-red-400 bg-red-500/10 border-red-500/30"
  },
  {
    id: "ROAD-SK-02",
    highway: "NH-10 (Singtam Sector)",
    section: "Singtam to Gangtok Corridor",
    status: "HIGH_RISK_ONE_WAY",
    cause: "Active Slope Creep & Intermittent Rockfall",
    detour: "Police convoy escort in effect. Heavy commercial vehicles prohibited.",
    eta: "2 Hours",
    villagesIsolated: 2,
    isolatedVillages: ["Ranipool Outskirts", "Tumin Valley Hamlets"],
    populationAffected: "6,200 Residents",
    statusColor: "text-orange-400 bg-orange-500/10 border-orange-500/30"
  },
  {
    id: "ROAD-ML-03",
    highway: "SH-5 (Shillong-Cherrapunji)",
    section: "Mawkdok Dympep Bridge Section",
    status: "CAUTION",
    cause: "Severe Waterlogging & Mud Accumulation",
    detour: "Speed limit 30 km/h enforced. Watch for sudden rock washouts.",
    eta: "Clear",
    villagesIsolated: 1,
    isolatedVillages: ["Dympep Village Cluster"],
    populationAffected: "1,850 Residents",
    statusColor: "text-amber-400 bg-amber-500/10 border-amber-500/30"
  },
  {
    id: "ROAD-AS-04",
    highway: "NH-6 (Assam-Meghalaya Arterial)",
    section: "Nongpoh to Umiam Lake Sector",
    status: "OPERATIONAL",
    cause: "Normal flow under continuous automated telemetry monitoring",
    detour: "No detour required. Green corridor open for relief supply convoys.",
    eta: "Clear",
    villagesIsolated: 0,
    isolatedVillages: [],
    populationAffected: "0 (Direct Access)",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
  }
];

export const ROAD_CORRIDORS = roadCorridors;
