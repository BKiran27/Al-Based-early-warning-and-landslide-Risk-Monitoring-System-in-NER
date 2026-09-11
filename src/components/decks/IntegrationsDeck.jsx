import React, { useState } from 'react';
import { 
  Radio, Satellite, CloudRain, Activity, Layers, 
  ExternalLink, CheckCircle2, RefreshCw, Server, Wifi, Cpu 
} from 'lucide-react';
import { 
  IMD_STATIONS, 
  SATELLITE_FEEDS, 
  IOT_SENSOR_NODES 
} from '../../data/integrationsData';

export function IntegrationsDeck({ lang }) {
  const [isLiveStream, setIsLiveStream] = useState(true);
  const [selectedStation, setSelectedStation] = useState(IMD_STATIONS[0]);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-[#0c1322] border border-cyan-500/30 space-y-6 shadow-2xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
            <Radio className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                IMD Weather APIs, Satellite Feeds & Sensor Mesh Integration Hub
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                ALL SYSTEMS OPERATIONAL
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Live ingest pipelines from IMD DWR Radar, Copernicus Sentinel-1 InSAR, INSAT-3DR TIR, and LoRaWAN field sensors
            </p>
          </div>
        </div>

        {/* Live/Mock Polling Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLiveStream(prev => !prev)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer border ${
              isLiveStream
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isLiveStream ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
            {isLiveStream ? 'Live Telemetry Polling (Active)' : 'Simulated Offline Cache'}
          </button>

          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-lg transition cursor-pointer"
            title="Refresh Ingest Streams"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-cyan-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Grid: 3 Integration Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 1. IMD Automatic Weather Stations & Doppler Radar */}
        <div className="space-y-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-sky-400" />
              1. IMD AWS & Doppler Radar
            </span>
            <span className="text-[10px] font-mono text-emerald-400">REST v2 / GeoJSON</span>
          </div>

          <div className="space-y-2">
            {IMD_STATIONS.map((station) => (
              <div 
                key={station.stationId}
                onClick={() => setSelectedStation(station)}
                className={`p-3 rounded-lg border text-xs cursor-pointer transition ${
                  selectedStation.stationId === station.stationId 
                    ? 'bg-sky-950/40 border-sky-500/50 text-white' 
                    : 'bg-slate-900/80 border-slate-800/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold">{station.name}</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-400">
                    {station.apiStatus}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1 text-[11px] font-mono text-slate-400 pt-1">
                  <div>1h: <b className="text-sky-300">{station.rainfall1h} mm</b></div>
                  <div>48h: <b className="text-sky-300">{station.rainfall48h} mm</b></div>
                  <div>Radar: <b className="text-amber-400">{station.radarEchoDbz} dBZ</b></div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-2.5 bg-black/40 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-400 space-y-1">
            <div className="text-sky-400 font-bold">ACTIVE ENDPOINT:</div>
            <div className="truncate text-slate-300">{selectedStation.endpoint}</div>
            <div className="text-slate-500">Last Synced: {selectedStation.lastSync} • IMD Mausam API Token: Active</div>
          </div>
        </div>

        {/* 2. Satellite Feeds (Sentinel-1 InSAR & INSAT-3DR) */}
        <div className="space-y-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Satellite className="w-4 h-4 text-purple-400" />
              2. Satellite Feeds (SAR & TIR)
            </span>
            <span className="text-[10px] font-mono text-purple-400">ISRO / Copernicus</span>
          </div>

          {/* Sentinel-1 InSAR Card */}
          <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-200">Sentinel-1 InSAR Surface Creep</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-purple-500/20 text-purple-300">
                10m Pixel SLC
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Pass: {SATELLITE_FEEDS.sentinel1.lastPass}
            </p>

            <div className="space-y-1.5 pt-1">
              {SATELLITE_FEEDS.sentinel1.deformationPoints.map((pt, i) => (
                <div key={i} className="flex justify-between items-center text-[11px] font-mono bg-black/30 px-2 py-1 rounded">
                  <span className="text-slate-300">{pt.location}</span>
                  <span className="text-red-400 font-bold">{pt.velocityMmYr} mm/yr</span>
                </div>
              ))}
            </div>
          </div>

          {/* INSAT-3DR Cloud Top Card */}
          <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-200">INSAT-3DR Geostationary (TIR)</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-sky-500/20 text-sky-300">
                15-Min Cadence
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300">
              <div className="bg-black/30 p-1.5 rounded">
                Cloud Top: <b className="text-sky-400">{SATELLITE_FEEDS.insat3dr.cloudTopHeightKm} km</b>
              </div>
              <div className="bg-black/30 p-1.5 rounded">
                TIR Temp: <b className="text-cyan-400">{SATELLITE_FEEDS.insat3dr.cloudTopTempC}°C</b>
              </div>
            </div>
            <div className="text-[10px] text-amber-300 bg-amber-500/10 p-1.5 rounded border border-amber-500/30">
              Severe Mesoscale Convective System detected over Teesta-Brahmaputra wedge.
            </div>
          </div>
        </div>

        {/* 3. LoRaWAN Hill Sensor Mesh Telemetry */}
        <div className="space-y-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              3. IoT Hill Sensor Mesh
            </span>
            <span className="text-[10px] font-mono text-emerald-400">865 MHz LoRaWAN</span>
          </div>

          <div className="space-y-2.5">
            {IOT_SENSOR_NODES.map((node) => (
              <div key={node.nodeId} className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 text-xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="font-bold text-slate-200">{node.location}</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-red-500/20 text-red-300 border border-red-500/40">
                    {node.status}
                  </span>
                </div>

                <div className="text-[11px] text-slate-400">
                  Sensor Type: <span className="text-slate-200">{node.type}</span>
                </div>

                <div className="flex justify-between text-[11px] font-mono bg-black/40 p-1.5 rounded">
                  <span className="text-cyan-400 font-bold">{node.reading}</span>
                  <span className="text-slate-500">Norm: {node.normal}</span>
                </div>

                <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-0.5">
                  <span>Battery: {node.batteryPct}%</span>
                  <span>RSSI: {node.rssiDb} dBm</span>
                  <span>{node.protocol}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}

export default IntegrationsDeck;
