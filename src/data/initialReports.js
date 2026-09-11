export const presetSamples = [
  {
    title: "Hill Slope Crack (Singtam)",
    mediaType: "image",
    hazard: "New Hill Fissure / Creep",
    district: "East Sikkim",
    state: "Sikkim",
    location: "Singtam Flank, NH-10 (Km 32)",
    lat: 27.23,
    lon: 88.50,
    severity: "SEVERE",
    url: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80",
    desc: "Active 4-inch tension fissure spreading across the upper slope cut above primary highway.",
    yoloDetections: [
      { label: "slope_tension_crack", conf: 0.948, box: [15, 25, 70, 45] },
      { label: "unstable_regolith", conf: 0.884, box: [30, 60, 55, 30] }
    ]
  },
  {
    title: "Active Debris Clip (Video)",
    mediaType: "video",
    hazard: "Active Highway Mudflow & Gravel",
    district: "Dima Hasao",
    state: "Assam",
    location: "Haflong Hill Cutting (Km 42)",
    lat: 25.17,
    lon: 93.02,
    severity: "SEVERE",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    durationSeconds: 12,
    desc: "Continuous slope collapse and saturated soil sliding down onto road shoulder captured live.",
    yoloDetections: [
      { label: "active_debris_flow", conf: 0.962, box: [10, 20, 80, 65] }
    ]
  },
  {
    title: "Retaining Wall Bulge (Cherrapunji)",
    mediaType: "image",
    hazard: "Retaining Wall Bulging",
    district: "East Khasi Hills",
    state: "Meghalaya",
    location: "Sohra Escarpment Road",
    lat: 25.28,
    lon: 91.73,
    severity: "HIGH",
    url: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80",
    desc: "Concrete road culvert retaining wall tilting outward with muddy spring water seepage.",
    yoloDetections: [
      { label: "structural_wall_shear", conf: 0.912, box: [22, 18, 56, 68] },
      { label: "water_seepage_pocket", conf: 0.865, box: [45, 55, 35, 35] }
    ]
  }
];

export const initialCitizenReports = [
  {
    id: 501,
    reporter: "Tashi Bhutia",
    phone: "+91-98765-43210",
    location: "Singtam Flank, East Sikkim",
    district: "East Sikkim",
    state: "Sikkim",
    lat: 27.23,
    lon: 88.50,
    hazard: "New Hill Fissure / Creep",
    severity: "SEVERE",
    desc: "5-inch wide lateral ground crack opening across terrace slope behind community school.",
    photoUrl: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80",
    mediaType: "image",
    status: "PENDING_REVIEW",
    time: "25 mins ago",
    aiCorrelationScore: 0.92,
    aiCorrelationNote: "Ground crack coordinates align with 89% slope susceptibility index & 195mm rainfall. InSAR creep detected within 500m.",
    yoloDetections: [
      { label: "slope_crack", conf: 0.948, box: [15, 25, 70, 45] }
    ]
  },
  {
    id: 502,
    reporter: "Babulal Boro",
    phone: "+91-94351-99882",
    location: "Haflong Hill Cutting, Dima Hasao",
    district: "Dima Hasao",
    state: "Assam",
    lat: 25.17,
    lon: 93.02,
    hazard: "Active Highway Mudflow & Gravel",
    severity: "SEVERE",
    desc: "12s clip of saturated gravel sliding down cut slope directly obstructing transit lane.",
    photoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    mediaType: "video",
    durationSeconds: 12,
    status: "PENDING_REVIEW",
    time: "15 mins ago",
    aiCorrelationScore: 0.95,
    aiCorrelationNote: "Cloudburst zone radar echo 48.5 dBZ. Severe dynamic instability verified on SH-19.",
    yoloDetections: [
      { label: "active_debris_flow", conf: 0.962, box: [10, 20, 80, 65] }
    ]
  },
  {
    id: 503,
    reporter: "Donboklang Lyngdoh",
    phone: "+91-94361-11223",
    location: "Cherrapunji Escarpment, Meghalaya",
    district: "East Khasi Hills",
    state: "Meghalaya",
    lat: 25.28,
    lon: 91.73,
    hazard: "Retaining Wall Bulging",
    severity: "HIGH",
    desc: "Concrete retaining wall tilting outward with muddy spring seepage emerging from hillside.",
    photoUrl: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80",
    mediaType: "image",
    status: "VERIFIED_TRUE_ALARM",
    time: "2 hours ago",
    aiCorrelationScore: 0.94,
    aiCorrelationNote: "Sohra escarpment high rainfall zone (260.4mm/48h). Saturated shear failure confirmed by geological survey.",
    yoloDetections: [
      { label: "structural_wall_shear", conf: 0.912, box: [22, 18, 56, 68] }
    ]
  }
];

export const SEED_REPORTS = initialCitizenReports;
