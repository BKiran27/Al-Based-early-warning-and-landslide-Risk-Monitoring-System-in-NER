export const weatherTimeline = [
  { time: "+2h (Now)", period: "Nowcast", rainfall: 18.5, cumulativeRain: 18.5, riskScore: 0.42, soilSaturation: 88, windKmh: 24, status: "MODERATE" },
  { time: "+4h", period: "Nowcast", rainfall: 32.0, cumulativeRain: 50.5, riskScore: 0.65, soilSaturation: 91, windKmh: 31, status: "HIGH" },
  { time: "+6h", period: "Nowcast Peak", rainfall: 54.8, cumulativeRain: 105.3, riskScore: 0.88, soilSaturation: 94, windKmh: 42, status: "SEVERE" },
  { time: "+12h", period: "Night Storm", rainfall: 62.4, cumulativeRain: 167.7, riskScore: 0.94, soilSaturation: 97, windKmh: 46, status: "CRITICAL" },
  { time: "+18h", period: "Morning", rainfall: 41.2, cumulativeRain: 208.9, riskScore: 0.82, soilSaturation: 95, windKmh: 35, status: "SEVERE" },
  { time: "+24h", period: "24h Mark", rainfall: 28.5, cumulativeRain: 237.4, riskScore: 0.73, soilSaturation: 93, windKmh: 28, status: "HIGH" },
  { time: "+36h", period: "Day 2", rainfall: 19.4, cumulativeRain: 256.8, riskScore: 0.58, soilSaturation: 89, windKmh: 22, status: "MODERATE" },
  { time: "+48h", period: "Outlook", rainfall: 14.2, cumulativeRain: 271.0, riskScore: 0.39, soilSaturation: 83, windKmh: 18, status: "WATCH" },
];

export const dopplerData = {
  radarEchoDbz: 48.5,
  stormVelocityKmh: 34,
  bearingDeg: 215,
  cloudTopKm: 12.4,
  severeCellIdentified: "CELL-MEGHALAYA-SOHRA-01",
  cellDirection: "North-East (towards Shillong Ridge)",
  probHailPercent: 20,
};
