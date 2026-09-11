/**
 * External Data Feeds & Sensor Mesh Integration Schema
 * IMD APIs, Sentinel-1 InSAR, INSAT-3DR, and IoT Mesh Telemetry
 */

export const IMD_STATIONS = [
  {
    stationId: "IMD-NER-01",
    name: "Cherrapunji AWS (East Khasi Hills)",
    type: "Automatic Weather Station (AWS)",
    lat: 25.275,
    lon: 91.731,
    rainfall1h: 38.4,
    rainfall24h: 184.2,
    rainfall48h: 260.4,
    tempC: 18.2,
    humidityPct: 98,
    pressureHPa: 864.2,
    windSpeedKmh: 42.5,
    windDirection: "SSW (210°)",
    radarEchoDbz: 51.2,
    apiStatus: "HEALTHY (200 OK)",
    lastSync: "32s ago",
    endpoint: "https://mausam.imd.gov.in/api/v2/aws/data/NER-01"
  },
  {
    stationId: "IMD-NER-02",
    name: "Gangtok IMD Observatory (Sikkim)",
    type: "Synoptic & Doppler Radar (DWR)",
    lat: 27.331,
    lon: 88.613,
    rainfall1h: 24.6,
    rainfall24h: 112.5,
    rainfall48h: 188.0,
    tempC: 16.5,
    humidityPct: 94,
    pressureHPa: 832.0,
    windSpeedKmh: 28.0,
    windDirection: "NW (315°)",
    radarEchoDbz: 48.5,
    apiStatus: "HEALTHY (200 OK)",
    lastSync: "45s ago",
    endpoint: "https://mausam.imd.gov.in/api/v2/dwr/data/GNTK-01"
  },
  {
    stationId: "IMD-NER-03",
    name: "Haflong Hill Station (Dima Hasao)",
    type: "AWS & Agro-Met Sensor",
    lat: 25.178,
    lon: 93.023,
    rainfall1h: 19.8,
    rainfall24h: 98.4,
    rainfall48h: 154.6,
    tempC: 21.0,
    humidityPct: 91,
    pressureHPa: 912.4,
    windSpeedKmh: 22.4,
    windDirection: "NE (45°)",
    radarEchoDbz: 43.8,
    apiStatus: "HEALTHY (200 OK)",
    lastSync: "1m ago",
    endpoint: "https://mausam.imd.gov.in/api/v2/aws/data/HFL-03"
  },
  {
    stationId: "IMD-NER-04",
    name: "Kohima Science College AWS (Nagaland)",
    type: "Automatic Weather Station",
    lat: 25.670,
    lon: 94.108,
    rainfall1h: 14.2,
    rainfall24h: 76.0,
    rainfall48h: 122.4,
    tempC: 17.8,
    humidityPct: 88,
    pressureHPa: 855.0,
    windSpeedKmh: 18.2,
    windDirection: "W (270°)",
    radarEchoDbz: 39.5,
    apiStatus: "HEALTHY (200 OK)",
    lastSync: "1m ago",
    endpoint: "https://mausam.imd.gov.in/api/v2/aws/data/KHM-04"
  }
];

export const SATELLITE_FEEDS = {
  sentinel1: {
    satellite: "Sentinel-1A / 1B C-Band SAR (Copernicus / ISRO Bhuvan)",
    mode: "Interferometric Wide Swath (IW) Single Look Complex (SLC)",
    revisitCycleDays: 6,
    lastPass: "2026-09-10 18:24 UTC (Descending Track 121)",
    pixelResolutionM: 10,
    deformationPoints: [
      { location: "29th Mile NH-10 Teesta", velocityMmYr: -38.5, status: "CRITICAL SUBSIDENCE" },
      { location: "Cherrapunji Escarpment", velocityMmYr: -32.5, status: "ACCELERATING CREEP" },
      { location: "Haflong Mahur Railway", velocityMmYr: -24.2, status: "MODERATE DEFORMATION" },
      { location: "Kohima Pagla Pahar", velocityMmYr: -19.8, status: "STEADY CREEP" }
    ],
    timeseriesSample: [
      { month: "Apr 2026", dispMm: -2.4 },
      { month: "May 2026", dispMm: -5.8 },
      { month: "Jun 2026", dispMm: -12.1 },
      { month: "Jul 2026", dispMm: -21.4 },
      { month: "Aug 2026", dispMm: -29.8 },
      { month: "Sep 2026", dispMm: -38.5 }
    ]
  },
  insat3dr: {
    satellite: "INSAT-3DR Geostationary (ISRO)",
    sensor: "Thermal Infrared (TIR-1 & TIR-2) + Water Vapor (WV)",
    scanFrequencyMins: 15,
    cloudTopTempC: -62.4,
    cloudTopHeightKm: 12.8,
    convectiveRainPotentialMmH: 64.2,
    severeMesoscaleSystemDetected: true,
    footprintSector: "Eastern Himalayan Orographic Wedge"
  }
};

export const IOT_SENSOR_NODES = [
  {
    nodeId: "NODE-TK-01",
    location: "NH-10 Km 29 Flank",
    type: "Vibrating Wire Piezometer",
    reading: "42.8 kPa (Pore Pressure)",
    normal: "< 25.0 kPa",
    status: "CRITICAL",
    batteryPct: 94,
    rssiDb: -72,
    protocol: "LoRaWAN 865 MHz"
  },
  {
    nodeId: "NODE-TK-02",
    location: "Singtam Colluvium Slope",
    type: "Biaxial MEMS Tiltmeter",
    reading: "Δθ = +4.82° (X-Axis Shear)",
    normal: "< 1.50°",
    status: "CRITICAL",
    batteryPct: 88,
    rssiDb: -78,
    protocol: "LoRaWAN 865 MHz"
  },
  {
    nodeId: "NODE-ML-01",
    location: "Cherrapunji Sandstone Scarp",
    type: "Acoustic Geophone & Inclinometer",
    reading: "142 Acoustic Micro-Tremors / hr",
    normal: "< 20 / hr",
    status: "CRITICAL",
    batteryPct: 91,
    rssiDb: -69,
    protocol: "4G LTE-M / Satellite Uplink"
  },
  {
    nodeId: "NODE-AS-01",
    location: "Haflong Railway Cutting Km 42",
    type: "TDT Soil Moisture Profile",
    reading: "94.2% Volumetric Water Content",
    normal: "< 70.0%",
    status: "SEVERE",
    batteryPct: 96,
    rssiDb: -74,
    protocol: "LoRaWAN 865 MHz"
  }
];
