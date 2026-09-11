/**
 * Relief Fund, Official Bulletins, Rain Limits & NER Defender Datasets
 * Sourced & Enhanced from nerdefender.vercel.app & sih-1-iota.vercel.app
 */

export const RELIEF_FUND_CONFIG = {
  fundTitle: "North Eastern Region Disaster Relief & Community Rehabilitation Fund",
  subtitle: "Direct humanitarian aid for families affected by monsoon cloudbursts and debris landslides in Sikkim, Meghalaya, Assam & Eastern Himalayas.",
  upiId: "ner.disaster.relief@sbi",
  accountName: "NER Disaster Relief & Rehabilitation Trust",
  bankName: "State Bank of India (Guwahati Main Branch)",
  accountNumber: "41920839102",
  ifscCode: "SBIN0000078",
  taxExemptionText: "Contributions qualify for 100% tax deduction under Section 80G of the Income Tax Act.",
  donationTiers: [500, 1000, 2500, 5000, 10000]
};

export const INITIAL_PLEDGED_SUPPLIES = [
  {
    id: "food",
    name: "Dry Ration & Food Kits",
    unit: "Kits (5kg Rice, Dal, Oil, Biscuits)",
    pledged: 1420,
    target: 3000,
    color: "text-amber-400 bg-amber-500/10 border-amber-500/30"
  },
  {
    id: "water",
    name: "Drinking Water & Chlorine Kits",
    unit: "Liters / Purifying Packs",
    pledged: 8900,
    target: 15000,
    color: "text-sky-400 bg-sky-500/10 border-sky-500/30"
  },
  {
    id: "medical",
    name: "First Aid & Emergency Medicine",
    unit: "Trauma Packs",
    pledged: 640,
    target: 1200,
    color: "text-rose-400 bg-rose-500/10 border-rose-500/30"
  },
  {
    id: "blankets",
    name: "Thermal Blankets & High-Relief Tents",
    unit: "Sets",
    pledged: 1150,
    target: 2500,
    color: "text-purple-400 bg-purple-500/10 border-purple-500/30"
  }
];

export const RECENT_DONATIONS = [
  { donor: "Col. R. K. Thapa (Retd.)", amount: 5000, state: "Sikkim", time: "12m ago", note: "For Teesta flood and slide victims" },
  { donor: "Dr. Ananya Baruah", amount: 2500, state: "Assam", time: "28m ago", note: "Medical supply aid" },
  { donor: "Anonymous Citizen", amount: 1000, state: "Meghalaya", time: "45m ago", note: "Relief supplies" },
  { donor: "North East Students Union", amount: 15000, state: "Delhi/NER", time: "1h ago", note: "Emergency student relief fund" },
  { donor: "Mawlai Youth Brigade", amount: 3500, state: "Meghalaya", time: "2h ago", note: "Local landslide shelter support" }
];

export const OFFICIAL_NEWS_BULLETINS = [
  {
    id: "NEWS-BRO-01",
    category: "BRO",
    title: "NH-10 Sevoke-Teesta Mile 29: Heavy Rock-Anchor Clearing in Progress",
    source: "Border Roads Organisation (BRO Project Swastik)",
    timestamp: "18 mins ago",
    status: "CRITICAL ROADWORK",
    severity: "CRITICAL",
    summary: "Excavator teams have breached 60% of the mudflow debris at 29th Mile. Convoy transit diverted via Panbu-Mungpoo route for light vehicles only.",
    actionUrl: "https://bro.gov.in"
  },
  {
    id: "NEWS-IMD-01",
    category: "IMD",
    title: "Red Alert: Severe Orographic Cloudburst Warning for East Khasi Hills",
    source: "India Meteorological Department (IMD Guwahati DWR)",
    timestamp: "35 mins ago",
    status: "WEATHER ALERT",
    severity: "CRITICAL",
    summary: "Over 260 mm rainfall recorded in past 48 hours across Cherrapunji-Mawsynram scarp. High danger of shallow rotational debris failures.",
    actionUrl: "https://mausam.imd.gov.in"
  },
  {
    id: "NEWS-RESCUE-01",
    category: "RESCUE",
    title: "NDRF 1st Bn Pre-positioned at Jatinga Valley (Haflong Link)",
    source: "National Disaster Response Force (NDRF HQ)",
    timestamp: "1 hour ago",
    status: "MISSION ACTIVE",
    severity: "HIGH",
    summary: "Two deep search teams equipped with canine units and hydraulic cutters deployed at Dima Hasao railway cutting following fresh slope subsidence.",
    actionUrl: "https://ndrf.gov.in"
  },
  {
    id: "NEWS-BRO-02",
    category: "BRO",
    title: "NH-29 Pagla Pahar: Single Lane Regulated Traffic Restored",
    source: "BRO Project Pushpak / Nagaland Police",
    timestamp: "2 hours ago",
    status: "REGULATED FLOW",
    severity: "MODERATE",
    summary: "Debris cleared between KM 12 and 16. Heavy multi-axle freight trucks barred from night travel; pilot vehicle escort in effect.",
    actionUrl: "https://bro.gov.in"
  }
];

export const NER_DEFENDER_STATES = [
  { id: "SK", name: "Sikkim", capital: "Gangtok", risk_level: "Critical", risk_score: 0.89, center: [27.533, 88.512], populationRisk: 9832 },
  { id: "ML", name: "Meghalaya", capital: "Shillong", risk_level: "Critical", risk_score: 0.86, center: [25.467, 91.366], populationRisk: 15779 },
  { id: "NL", name: "Nagaland", capital: "Kohima", risk_level: "Critical", risk_score: 0.81, center: [26.158, 94.562], populationRisk: 35913 },
  { id: "AR", name: "Arunachal Pradesh", capital: "Itanagar", risk_level: "High", risk_score: 0.74, center: [28.218, 94.727], populationRisk: 11263 },
  { id: "MZ", name: "Mizoram", capital: "Aizawl", risk_level: "High", risk_score: 0.71, center: [23.164, 92.937], populationRisk: 57011 },
  { id: "MN", name: "Manipur", capital: "Imphal", risk_level: "High", risk_score: 0.68, center: [24.663, 93.906], populationRisk: 8420 },
  { id: "AS", name: "Assam", capital: "Dispur", risk_level: "Medium", risk_score: 0.52, center: [26.200, 92.937], populationRisk: 43756 },
  { id: "TR", name: "Tripura", capital: "Agartala", risk_level: "Low", risk_score: 0.35, center: [23.940, 91.988], populationRisk: 3200 }
];

export const RAIN_VS_LIMIT_TOWNS = [
  {
    id: "TOWN-01",
    name: "Cherrapunji (Sohra)",
    district: "East Khasi Hills",
    state: "Meghalaya",
    rain24h: 184.2,
    safeLimit: 120.0,
    slope: 44.2,
    status: "DANGER",
    statusColor: "text-red-400 bg-red-500/15 border-red-500/35"
  },
  {
    id: "TOWN-02",
    name: "Haflong (Dima Hasao)",
    district: "Dima Hasao",
    state: "Assam",
    rain24h: 98.4,
    safeLimit: 90.0,
    slope: 38.5,
    status: "DANGER",
    statusColor: "text-red-400 bg-red-500/15 border-red-500/35"
  },
  {
    id: "TOWN-03",
    name: "Singtam (Teesta Flank)",
    district: "East Sikkim",
    state: "Sikkim",
    rain24h: 112.5,
    safeLimit: 85.0,
    slope: 41.0,
    status: "DANGER",
    statusColor: "text-red-400 bg-red-500/15 border-red-500/35"
  },
  {
    id: "TOWN-04",
    name: "Kohima (Pagla Pahar)",
    district: "Kohima",
    state: "Nagaland",
    rain24h: 76.0,
    safeLimit: 75.0,
    slope: 35.0,
    status: "WARNING",
    statusColor: "text-amber-400 bg-amber-500/15 border-amber-500/35"
  },
  {
    id: "TOWN-05",
    name: "Tawang (Sela Ridge)",
    district: "Tawang",
    state: "Arunachal Pradesh",
    rain24h: 52.0,
    safeLimit: 70.0,
    slope: 39.0,
    status: "WATCH",
    statusColor: "text-yellow-400 bg-yellow-500/15 border-yellow-500/35"
  },
  {
    id: "TOWN-06",
    name: "Mawsynram",
    district: "East Khasi Hills",
    state: "Meghalaya",
    rain24h: 172.0,
    safeLimit: 130.0,
    slope: 42.0,
    status: "DANGER",
    statusColor: "text-red-400 bg-red-500/15 border-red-500/35"
  },
  {
    id: "TOWN-07",
    name: "Champhai",
    district: "Champhai",
    state: "Mizoram",
    rain24h: 38.0,
    safeLimit: 65.0,
    slope: 28.0,
    status: "SAFE",
    statusColor: "text-emerald-400 bg-emerald-500/15 border-emerald-500/35"
  },
  {
    id: "TOWN-08",
    name: "Jorethang",
    district: "South Sikkim",
    state: "Sikkim",
    rain24h: 68.0,
    safeLimit: 80.0,
    slope: 32.0,
    status: "WATCH",
    statusColor: "text-yellow-400 bg-yellow-500/15 border-yellow-500/35"
  }
];
