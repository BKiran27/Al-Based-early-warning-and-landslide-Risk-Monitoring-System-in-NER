import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Layers, 
  Camera, 
  Maximize2, 
  Minimize2, 
  Activity, 
  Mountain, 
  CloudRain, 
  Droplets, 
  TriangleAlert, 
  Check, 
  X, 
  Cpu,
  Radio
} from 'lucide-react';
import { translations } from '../data/translations';
import { hazardZones } from '../data/hazardZones';
import { roadCorridors } from '../data/roadCorridors';
import { indigenousSensorNodes } from '../data/nitiSensorNodes';
import { playEmergencySiren } from '../services/audio';

export const GisMapViewer = ({
  lang,
  hotspots,
  onSelectFeature,
  citizenReports = [],
  onVerifyReport,
  focusTarget,
  onOpenSirenModal,
  isSurgeActive
}) => {
  const t = translations[lang] || translations.en;

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupsRef = useRef({});
  const spotlightGroupRef = useRef(null);
  const isFocusFlyRef = useRef(false);
  const baseTileGroupRef = useRef(null);

  const [activeLayer, setActiveLayer] = useState('heatmap');
  const [baseMapType, setBaseMapType] = useState('dark'); // 'dark' | 'satellite'
  const [selectedItem, setSelectedItem] = useState(hotspots[0] || null);
  const [isSirenActive, setIsSirenActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sync selectedItem if hotspots change
  useEffect(() => {
    if (selectedItem && !selectedItem.isCitizenReport) {
      const match = hotspots.find(h => h.id === selectedItem.id);
      if (match) setSelectedItem(match);
    }
  }, [hotspots]);

  // Color helper based on risk intensity
  const getRiskColor = (intensity) => {
    if (intensity >= 0.75) return '#ef4444';
    if (intensity >= 0.55) return '#f97316';
    if (intensity >= 0.35) return '#f59e0b';
    return '#10b981';
  };

  // Popup HTML template
  const createHotspotPopupHtml = (item) => {
    const color = getRiskColor(item.intensity);
    const bgAlpha = `${color}25`;
    const borderAlpha = `${color}50`;

    return `
      <div style="font-family: 'Plus Jakarta Sans', sans-serif; min-width: 280px; max-width: 320px; background: #0e1424; color: #f8fafc; border-radius: 14px; overflow: hidden; padding: 14px; box-shadow: 0 16px 36px rgba(0, 0, 0, 0.8); border: 1px solid #1e293b;">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; border-bottom: 1px solid #1f293d; padding-bottom: 10px; margin-bottom: 10px;">
          <div style="min-width: 0;">
            <div style="font-size: 10px; font-weight: 700; color: #38bdf8; font-family: monospace;">${item.id}</div>
            <div style="font-size: 14px; font-weight: 800; color: #ffffff; line-height: 1.25; margin-top: 2px;">${item.name}</div>
            <div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">📍 ${item.district}, ${item.state}</div>
          </div>
          <span style="display: inline-block; padding: 3px 8px; border-radius: 6px; font-size: 10px; font-weight: 800; text-transform: uppercase; background: ${bgAlpha}; color: ${color}; border: 1px solid ${borderAlpha}; white-space: nowrap;">
            ${item.tier}
          </span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px;">
          <div style="background: #131b2e; border: 1px solid #1f293d; border-radius: 8px; padding: 8px 10px;">
            <div style="font-size: 10px; font-weight: 600; color: #94a3b8;">LSI Index</div>
            <div style="font-size: 16px; font-weight: 900; color: ${color}; font-family: monospace; margin-top: 2px;">
              ${(item.intensity * 100).toFixed(1)}%
            </div>
          </div>
          <div style="background: #131b2e; border: 1px solid #1f293d; border-radius: 8px; padding: 8px 10px;">
            <div style="font-size: 10px; font-weight: 600; color: #94a3b8;">48h Rainfall</div>
            <div style="font-size: 16px; font-weight: 900; color: #38bdf8; font-family: monospace; margin-top: 2px;">
              ${item.rain48} <span style="font-size: 11px; font-weight: 700; color: #7dd3fc;">mm</span>
            </div>
          </div>
          <div style="background: #131b2e; border: 1px solid #1f293d; border-radius: 8px; padding: 8px 10px;">
            <div style="font-size: 10px; font-weight: 600; color: #94a3b8;">Slope Angle</div>
            <div style="font-size: 15px; font-weight: 900; color: #fbbf24; font-family: monospace; margin-top: 2px;">
              ${item.slope}°
            </div>
          </div>
          <div style="background: #131b2e; border: 1px solid #1f293d; border-radius: 8px; padding: 8px 10px;">
            <div style="font-size: 10px; font-weight: 600; color: #94a3b8;">Soil Saturation</div>
            <div style="font-size: 15px; font-weight: 900; color: #60a5fa; font-family: monospace; margin-top: 2px;">
              ${item.soil}%
            </div>
          </div>
        </div>

        <div style="background: ${bgAlpha}; border: 1px solid ${borderAlpha}; border-radius: 8px; padding: 8px 10px; margin-bottom: 8px;">
          <div style="font-size: 10px; font-weight: 800; color: ${color}; text-transform: uppercase;">
            ⚡ Suggested Action
          </div>
          <div style="font-size: 11px; color: #f1f5f9; margin-top: 3px; line-height: 1.35;">
            ${item.suggestedAction}
          </div>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 10px; color: #64748b; padding-top: 6px; border-top: 1px solid #1f293d;">
          <span>🕒 Updated: <b style="color: #cbd5e1;">${item.lastUpdated}</b></span>
          <span style="color: #38bdf8; font-family: monospace;">Telemetry Live</span>
        </div>
      </div>
    `;
  };

  // Initialize Map safely
  useEffect(() => {
    if (!mapContainerRef.current) return;

    try {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      if (mapContainerRef.current._leaflet_id) {
        delete mapContainerRef.current._leaflet_id;
      }

      const map = L.map(mapContainerRef.current, {
        center: [25.8, 92.4],
        zoom: 7,
        minZoom: 5,
        maxZoom: 15,
        zoomControl: false,
        attributionControl: false,
      });

    // Base tile layer group for Dark / Satellite switcher
    const baseTileGroup = L.layerGroup().addTo(map);
    baseTileGroupRef.current = baseTileGroup;

    L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 16,
      subdomains: ['services'],
    }).addTo(baseTileGroup);

    L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 16,
      opacity: 0.85,
    }).addTo(baseTileGroup);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Create Layer Groups
    const heatmapGroup = L.layerGroup();
    const polygonsGroup = L.layerGroup();
    const roadsGroup = L.layerGroup();
    const citizensGroup = L.layerGroup();
    const spotlightGroup = L.layerGroup().addTo(map);
    spotlightGroupRef.current = spotlightGroup;

    // 1. Populate Hotspots
    hotspots.forEach((item) => {
      const color = getRiskColor(item.intensity);
      const isSevere = item.intensity >= 0.75;

      const outerCircle = L.circleMarker([item.lat, item.lon], {
        radius: isSevere ? 24 : item.intensity >= 0.55 ? 18 : 12,
        color: color,
        weight: 1.5,
        opacity: 0.85,
        fillColor: color,
        fillOpacity: isSevere ? 0.28 : 0.2,
      });

      const innerCircle = L.circleMarker([item.lat, item.lon], {
        radius: isSevere ? 7 : 5.5,
        color: '#ffffff',
        weight: 2,
        fillColor: color,
        fillOpacity: 1,
      });

      const popupHtml = createHotspotPopupHtml(item);
      const popupOptions = { maxWidth: 340, minWidth: 280, className: 'ner-risk-popup', autoPan: true, offset: [0, -8] };

      innerCircle.bindPopup(popupHtml, popupOptions);
      outerCircle.bindPopup(popupHtml, popupOptions);

      const onClick = () => {
        setSelectedItem({ ...item, isCitizenReport: false });
        if (onSelectFeature) onSelectFeature(item);
        innerCircle.openPopup();
      };

      outerCircle.on('click', onClick);
      innerCircle.on('click', onClick);

      const tooltipHtml = `
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 2px 4px;">
          <b style="font-size: 12px; color: #fff;">${item.name}</b>
          <div style="font-size: 10px; color: #94a3b8; margin-top: 2px;">${item.district}, ${item.state}</div>
          <div style="margin-top: 4px; display: flex; align-items: center; gap: 4px;">
            <span style="font-weight: bold; color: ${color}; font-size: 11px;">LSI: ${(item.intensity * 100).toFixed(0)}%</span>
            <span style="background: ${color}25; color: ${color}; border: 1px solid ${color}40; padding: 1px 4px; border-radius: 3px; font-size: 9px; font-weight: bold;">${item.tier}</span>
          </div>
        </div>
      `;
      outerCircle.bindTooltip(tooltipHtml, { direction: 'top', className: 'leaflet-dark-custom-tooltip' });

      heatmapGroup.addLayer(outerCircle);
      heatmapGroup.addLayer(innerCircle);
    });

    // 2. Populate Polygons
    hazardZones.forEach((zone) => {
      const polygon = L.polygon(zone.coords, {
        color: zone.color,
        weight: 2.5,
        opacity: 0.9,
        fillColor: zone.fillColor,
        fillOpacity: 0.25,
        dashArray: zone.tier === 'SEVERE' ? '5, 5' : undefined,
      });

      polygon.on('click', () => {
        const item = {
          id: zone.code,
          name: zone.name,
          district: zone.district,
          state: 'NER Sector',
          slope: 42,
          rain48: 245,
          soil: 91,
          intensity: zone.lsi,
          tier: zone.tier,
          insar: -26,
          isCitizenReport: false,
          exp_hi: `${zone.name} में उच्च ढलान व भारी वर्षा के कारण ${zone.tier} घोषित।`,
          exp_en: `${zone.name} classified as ${zone.tier} hazard based on steep slope topography and rainfall accumulation.`,
          aiContributions: [
            { name: "Slope Gradient (SRTM DEM)", pct: 38, color: "#f59e0b", gradient: "from-amber-500 to-orange-500" },
            { name: "Rainfall (Antecedent 48h)", pct: 32, color: "#38bdf8", gradient: "from-sky-500 to-blue-500" },
            { name: "Soil Moisture Saturation", pct: 18, color: "#60a5fa", gradient: "from-blue-500 to-indigo-500" },
            { name: "InSAR Surface Creep", pct: 12, color: "#f43f5e", gradient: "from-rose-500 to-pink-500" }
          ]
        };
        setSelectedItem(item);
        if (onSelectFeature) onSelectFeature(item);
      });

      polygon.bindTooltip(`<b>${zone.name}</b><br/>Tier: <b>${zone.tier} Hazard Zone</b>`, { direction: 'center' });
      polygonsGroup.addLayer(polygon);
    });

    // 3. Populate Road Corridors
    roadCorridors.forEach((road) => {
      const isBlocked = road.status === 'BLOCKED';
      const polyline = L.polyline(road.path, {
        color: road.color,
        weight: road.weight,
        opacity: 0.95,
        dashArray: road.dashArray,
      });

      polyline.on('click', () => {
        const item = {
          id: isBlocked ? 'ROAD-BLOCKED-01' : 'ROAD-OPERATIONAL-02',
          name: road.name,
          district: 'Arterial Highway Corridor',
          state: 'NER Lifeline',
          slope: 38,
          rain48: 180,
          soil: 88,
          intensity: isBlocked ? 0.92 : 0.45,
          tier: isBlocked ? 'SEVERE' : 'MODERATE',
          insar: -24,
          isCitizenReport: false,
          exp_hi: `Corridor: ${road.name}. Status: ${road.status}. Detour: ${road.detour}`,
          exp_en: `Corridor: ${road.name}. Status: ${road.status}. Detour: ${road.detour}`,
          aiContributions: [
            { name: "Road Embankment Undermining", pct: 40, color: "#f43f5e", gradient: "from-rose-500 to-pink-500" },
            { name: "Rainfall (Antecedent 48h)", pct: 35, color: "#38bdf8", gradient: "from-sky-500 to-blue-500" },
            { name: "Slope Gradient (SRTM DEM)", pct: 15, color: "#f59e0b", gradient: "from-amber-500 to-orange-500" },
            { name: "Riverbank Scour", pct: 10, color: "#60a5fa", gradient: "from-blue-500 to-indigo-500" }
          ]
        };
        setSelectedItem(item);
        if (onSelectFeature) onSelectFeature(item);
      });

      polyline.bindTooltip(`<b>${road.name}</b><br/>Status: <b>${road.status.replace(/_/g, ' ')}</b>`, { direction: 'top' });
      roadsGroup.addLayer(polyline);

      if (isBlocked) {
        const blockageMarker = L.circleMarker([27.05, 88.49], {
          radius: 9,
          color: '#ffffff',
          weight: 2,
          fillColor: '#ef4444',
          fillOpacity: 1,
        });
        blockageMarker.bindPopup(`<b>CRITICAL ROAD BLOCKAGE</b><br/>NH-10 at Km 29 (Teesta).<br/>Debris Avalanche.<br/><b>Detour:</b> ${road.detour}`);
        roadsGroup.addLayer(blockageMarker);
      }
    });

    // 4. Populate NITI Aayog & IIT Mandi Indigenous Sensor Nodes (64 Nodes)
    const nitiSensorsGroup = L.layerGroup();
    indigenousSensorNodes.forEach((node) => {
      const isDanger = node.status === 'COLLAPSE_IMMINTENT';
      const isWarning = node.status === 'WARNING';
      const nodeColor = isDanger ? '#f43f5e' : isWarning ? '#f59e0b' : '#38bdf8';

      const customIcon = L.divIcon({
        className: 'niti-sensor-node-icon',
        html: `
          <div style="position:relative;width:28px;height:28px;border-radius:50%;background:#060b14;border:2px solid ${nodeColor};display:flex;align-items:center;justify-content:center;box-shadow:0 0 12px ${nodeColor}80;cursor:pointer;">
            <span style="font-size:12px;">📡</span>
            ${isDanger ? `<div style="position:absolute;inset:-4px;border-radius:50%;border:2px solid #f43f5e;animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></div>` : ''}
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker([node.lat, node.lon], { icon: customIcon });

      const popupHtml = `
        <div style="min-width: 250px; font-family: 'Plus Jakarta Sans', sans-serif; color: #f8fafc; background: #0c1322; padding: 12px; border-radius: 12px; border: 1px solid ${nodeColor}60;">
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #1e293b; padding-bottom: 6px; margin-bottom: 6px;">
            <span style="font-family: monospace; font-size: 11px; font-weight: bold; color: ${nodeColor};">${node.id}</span>
            <span style="font-size: 9px; font-weight: bold; background: ${nodeColor}25; color: ${nodeColor}; border: 1px solid ${nodeColor}50; padding: 2px 6px; border-radius: 4px;">
              ${node.status}
            </span>
          </div>
          <b style="font-size: 12px; color: #ffffff; display: block;">${node.name}</b>
          <div style="font-size: 10px; color: #94a3b8; margin-top: 2px;">📍 ${node.corridor} (${node.district}, ${node.state})</div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin: 8px 0; background: #00000050; padding: 6px; border-radius: 6px; font-family: monospace; font-size: 10px;">
            <div>1.5m Moisture: <b style="color: ${node.moisture1_5m_pct >= 75 ? '#f43f5e' : '#38bdf8'};">${node.moisture1_5m_pct}%</b></div>
            <div>Tilt (Δθ): <b style="color: ${node.tiltAngle_deg >= 3.2 ? '#f43f5e' : '#f59e0b'};">${node.tiltAngle_deg}°</b></div>
            <div>Advance Lead: <b style="color: #34d399;">${node.leadTimeHours}</b></div>
            <div>Solar Battery: <b style="color: #cbd5e1;">${node.battery_v}V</b></div>
          </div>
          
          <div style="font-size: 10px; color: #cbd5e1; font-style: italic; border-top: 1px solid #1e293b; padding-top: 6px;">
            "${node.advisory}"
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, { maxWidth: 300, className: 'ner-risk-popup' });

      marker.on('click', () => {
        const item = {
          id: node.id,
          name: node.name,
          district: `${node.corridor} (${node.district})`,
          state: node.state,
          slope: +(node.tiltAngle_deg * 12.2).toFixed(1),
          rain48: +(node.moisture1_5m_pct * 3.1).toFixed(1),
          soil: node.moisture1_5m_pct,
          intensity: isDanger ? 0.96 : (isWarning ? 0.74 : 0.32),
          tier: isDanger ? 'SEVERE' : (isWarning ? 'HIGH' : 'LOW'),
          insar: -(node.tiltAngle_deg * 9.2).toFixed(1),
          isCitizenReport: false,
          isNitiNode: true,
          rawNitiNode: node,
          suggestedAction: node.advisory,
          exp_hi: `IIT Mandi / NITI Aayog नोड ${node.id}: 1.5m गहराई पर नमी ${node.moisture1_5m_pct}% व टिल्ट कोण ${node.tiltAngle_deg}°। अग्रिम चेतावनी अवधि: ${node.leadTimeHours}।`,
          exp_en: `IIT Mandi / NITI Aayog Sensor Node ${node.id}: 1.5m Subsurface moisture ${node.moisture1_5m_pct}% & tilt ${node.tiltAngle_deg}°. Advance Warning Window: ${node.leadTimeHours} lead time with >90% accuracy.`,
          aiContributions: [
            { name: "Subsurface Moisture (1.5m)", pct: 45, color: "#38bdf8", gradient: "from-sky-500 to-blue-500" },
            { name: "MEMS Inclinometer Tilt", pct: 30, color: "#f59e0b", gradient: "from-amber-500 to-orange-500" },
            { name: "Surface Infiltration", pct: 15, color: "#60a5fa", gradient: "from-blue-500 to-indigo-500" },
            { name: "Solar Battery & Telemetry", pct: 10, color: "#10b981", gradient: "from-emerald-500 to-teal-500" }
          ]
        };
        setSelectedItem(item);
        if (onSelectFeature) onSelectFeature(item);
      });

      nitiSensorsGroup.addLayer(marker);
    });

    layerGroupsRef.current = {
      heatmap: heatmapGroup,
      polygons: polygonsGroup,
      roads: roadsGroup,
      citizens: citizensGroup,
      nitiSensors: nitiSensorsGroup,
    };

    // Default layer: heatmap
    heatmapGroup.addTo(map);
    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      if (mapContainerRef.current && mapContainerRef.current._leaflet_id) {
        delete mapContainerRef.current._leaflet_id;
      }
    };
    } catch (err) {
      console.warn('Leaflet map initialization warning:', err);
    }
  }, [hotspots]);

  // Update Citizen Reports Layer
  useEffect(() => {
    if (!mapInstanceRef.current || !layerGroupsRef.current.citizens) return;

    const citizensGroup = layerGroupsRef.current.citizens;
    citizensGroup.clearLayers();

    citizenReports.forEach((rep) => {
      const isVerified = rep.status === 'VERIFIED_TRUE_ALARM';
      const isDismissed = rep.status === 'DISMISSED_FALSE_ALARM';
      const markerColor = isVerified ? '#10b981' : isDismissed ? '#6b7280' : '#f43f5e';

      const customIcon = L.divIcon({
        className: 'custom-camera-marker',
        html: `
          <div style="position:relative;width:38px;height:38px;display:flex;align-items:center;justify-content:center;">
            <div style="position:absolute;width:100%;height:100%;border-radius:50%;background:${markerColor};opacity:0.35;animation:ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="position:relative;width:30px;height:30px;border-radius:50%;background:#090d16;border:2px solid ${markerColor};display:flex;align-items:center;justify-content:center;box-shadow:0 0 12px ${markerColor};cursor:pointer;">
              <span style="font-size:14px;">${rep.mediaType === 'video' ? '🎥' : '📷'}</span>
            </div>
            <div style="position:absolute;bottom:-2px;right:-2px;width:10px;height:10px;border-radius:50%;background:${markerColor};border:1.5px solid white;"></div>
          </div>
        `,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
      });

      const marker = L.marker([rep.lat, rep.lon], { icon: customIcon });

      const popupHtml = `
        <div style="min-width: 220px; font-family: 'Plus Jakarta Sans', sans-serif; color: #1e293b; background: #ffffff; padding: 12px; border-radius: 12px;">
          <div style="width: 100%; height: 110px; border-radius: 6px; overflow: hidden; margin-bottom: 6px; background: #000;">
            ${rep.mediaType === 'video'
              ? `<video src="${rep.photoUrl}" controls style="width:100%;height:100%;object-fit:cover;"></video>`
              : `<img src="${rep.photoUrl}" style="width:100%;height:100%;object-fit:cover;" />`
            }
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <b style="font-size: 12px; color: #0f172a;">${rep.hazard}</b>
            <span style="font-size: 10px; font-weight: bold; color: ${markerColor}; background: ${markerColor}15; padding: 1px 5px; border-radius: 4px;">${rep.severity}</span>
          </div>
          <div style="font-size: 11px; color: #64748b; margin-top: 2px;">📍 ${rep.location}</div>
          <p style="font-size: 11px; color: #334155; margin: 4px 0; line-height: 1.3;">${rep.desc}</p>
          <div style="font-size: 10px; color: #94a3b8;">Reported by: <b>${rep.reporter}</b> • ${rep.time}</div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        const item = {
          id: `REPORT-#${rep.id}`,
          name: rep.hazard,
          district: rep.location,
          state: rep.state,
          slope: 41.5,
          rain48: 195,
          soil: 89,
          intensity: rep.aiCorrelationScore || (rep.severity === 'SEVERE' ? 0.92 : 0.75),
          tier: rep.severity,
          insar: -22,
          isCitizenReport: true,
          rawReport: rep,
          exp_hi: rep.aiCorrelationNote || `नागरिक ग्राउंड रिपोर्ट: ${rep.desc}`,
          exp_en: rep.aiCorrelationNote || `Ground observation: ${rep.desc}`,
          aiContributions: [
            { name: "Ground Crack Tension", pct: 45, color: "#f43f5e", gradient: "from-rose-500 to-pink-500" },
            { name: "Local Saturated Soil", pct: 30, color: "#38bdf8", gradient: "from-sky-500 to-blue-500" },
            { name: "Slope Steepness", pct: 15, color: "#f59e0b", gradient: "from-amber-500 to-orange-500" },
            { name: "Fault Proximity", pct: 10, color: "#60a5fa", gradient: "from-blue-500 to-indigo-500" }
          ]
        };
        setSelectedItem(item);
        if (onSelectFeature) onSelectFeature(item);
      });

      citizensGroup.addLayer(marker);
    });
  }, [citizenReports, onSelectFeature]);

  // Handle Layer Switch
  useEffect(() => {
    if (!mapInstanceRef.current || !layerGroupsRef.current.heatmap) return;
    if (isFocusFlyRef.current) {
      isFocusFlyRef.current = false;
      return;
    }

    const map = mapInstanceRef.current;
    const { heatmap, polygons, roads, citizens, nitiSensors } = layerGroupsRef.current;

    if (heatmap) map.removeLayer(heatmap);
    if (polygons) map.removeLayer(polygons);
    if (roads) map.removeLayer(roads);
    if (citizens) map.removeLayer(citizens);
    if (nitiSensors) map.removeLayer(nitiSensors);

    if (activeLayer === 'heatmap' && heatmap) {
      heatmap.addTo(map);
      map.flyTo([25.8, 92.4], 7, { duration: 1 });
    } else if (activeLayer === 'polygons' && polygons) {
      polygons.addTo(map);
      map.flyTo([25.8, 92.2], 7.2, { duration: 1 });
    } else if (activeLayer === 'roads' && roads) {
      roads.addTo(map);
      map.flyTo([26.8, 90.5], 7.5, { duration: 1 });
    } else if (activeLayer === 'citizens' && citizens) {
      citizens.addTo(map);
      map.flyTo([26.2, 91.5], 7.2, { duration: 1 });
    } else if (activeLayer === 'nitiSensors' && nitiSensors) {
      nitiSensors.addTo(map);
      map.flyTo([25.8, 92.4], 7, { duration: 1 });
    }
  }, [activeLayer]);

  // Handle Base Map Switcher (Dark vs Satellite)
  useEffect(() => {
    if (!mapInstanceRef.current || !baseTileGroupRef.current) return;
    const group = baseTileGroupRef.current;
    group.clearLayers();

    if (baseMapType === 'satellite') {
      L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 17,
        subdomains: ['services'],
      }).addTo(group);
      L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 17,
        opacity: 0.85,
      }).addTo(group);
    } else {
      L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 16,
        subdomains: ['services'],
      }).addTo(group);
      L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 16,
        opacity: 0.85,
      }).addTo(group);
    }
  }, [baseMapType]);

  // Handle Focus Target from Citizen Queue "Locate on Map"
  useEffect(() => {
    if (!focusTarget || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    isFocusFlyRef.current = true;
    setActiveLayer('citizens');

    if (layerGroupsRef.current.citizens && !map.hasLayer(layerGroupsRef.current.citizens)) {
      layerGroupsRef.current.citizens.addTo(map);
    }

    const report = citizenReports.find(r => r.id === focusTarget.id);

    if (spotlightGroupRef.current) {
      spotlightGroupRef.current.clearLayers();

      const pulseCircle = L.circle([focusTarget.lat, focusTarget.lon], {
        radius: 3500,
        color: '#f43f5e',
        weight: 2.5,
        opacity: 0.9,
        fillColor: '#f43f5e',
        fillOpacity: 0.25,
      });

      const pinMarker = L.circleMarker([focusTarget.lat, focusTarget.lon], {
        radius: 12,
        color: '#ffffff',
        weight: 3.5,
        fillColor: '#f43f5e',
        fillOpacity: 1,
      });

      spotlightGroupRef.current.addLayer(pulseCircle);
      spotlightGroupRef.current.addLayer(pinMarker);

      map.flyTo([focusTarget.lat, focusTarget.lon], 11, { duration: 1.2 });
    }

    if (report) {
      setSelectedItem({
        id: `REPORT-#${report.id}`,
        name: report.hazard,
        district: report.location,
        state: report.state,
        slope: 41.5,
        rain48: 195,
        soil: 89,
        intensity: report.aiCorrelationScore || (report.severity === 'SEVERE' ? 0.92 : 0.75),
        tier: report.severity,
        insar: -22,
        isCitizenReport: true,
        rawReport: report,
        exp_hi: report.aiCorrelationNote || `नागरिक ग्राउंड रिपोर्ट: ${report.desc}`,
        exp_en: report.aiCorrelationNote || `Ground observation: ${report.desc}`,
      });
    }
  }, [focusTarget, citizenReports]);

  // Trigger Evacuation Siren Broadcast
  const handleTriggerSiren = () => {
    setIsSirenActive(true);
    playEmergencySiren(3.5);
    if (onOpenSirenModal) {
      onOpenSirenModal();
    }
    setTimeout(() => setIsSirenActive(false), 4000);
  };

  const currentItem = selectedItem || hotspots?.[0] || {
    id: 'NER-ML-01',
    name: 'Cherrapunji Escarpment',
    district: 'East Khasi Hills',
    state: 'Meghalaya',
    slope: 44.2,
    rain48: 260.4,
    soil: 94,
    intensity: 0.94,
    tier: 'SEVERE',
    insar: -32.5,
    suggestedAction: 'Pre-emptive evacuation along NH-206 corridor'
  };
  const itemColor = getRiskColor(currentItem.intensity || 0.7);

  // Physical Factor of Safety calculation formula
  // Fs = (c' + (gamma - m*gamma_w)*z*cos^2(beta)*tan(phi')) / (gamma*z*sin(beta)*cos(beta))
  const slopeVal = currentItem.slope || 42;
  const soilVal = currentItem.soil || 85;
  const slopeRad = (slopeVal * Math.PI) / 180;
  const Fs = Math.max(0.68, Math.min(2.4, parseFloat((1.85 / (Math.tan(slopeRad) * (1 + soilVal / 120))).toFixed(2))));

  return (
    <div
      className={`transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-[5500] p-3 sm:p-5 bg-black/90 backdrop-blur-xl flex flex-col lg:flex-row gap-3'
          : 'relative w-full h-[640px] bg-[#080d1a] rounded-2xl border border-slate-800/90 overflow-hidden flex flex-col lg:flex-row shadow-2xl'
      }`}
    >
      {/* Map Canvas */}
      <div className="flex-1 relative h-full flex flex-col justify-between">
        {/* Layer Controls & Telemetry Status */}
        <div className="absolute top-3.5 left-3.5 z-[1000] flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-1.5 bg-slate-900/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-slate-700/80 shadow-xl text-xs">
            <Layers className="w-3.5 h-3.5 text-sky-400 mr-1" />
            <span className="text-slate-400 font-semibold mr-1">Layer:</span>
            <button
              onClick={() => setActiveLayer('heatmap')}
              className={`px-3 py-1 rounded-lg transition-all text-xs font-bold ${
                activeLayer === 'heatmap'
                  ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              {t.layerHeatmap}
            </button>
            <button
              onClick={() => setActiveLayer('polygons')}
              className={`px-3 py-1 rounded-lg transition-all text-xs font-bold ${
                activeLayer === 'polygons'
                  ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              {t.layerSusceptibility}
            </button>
            <button
              onClick={() => setActiveLayer('roads')}
              className={`px-3 py-1 rounded-lg transition-all text-xs font-bold ${
                activeLayer === 'roads'
                  ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              {t.layerRoadStatus}
            </button>
            <button
              onClick={() => setActiveLayer('citizens')}
              className={`px-3 py-1 rounded-lg transition-all text-xs font-bold flex items-center gap-1.5 ${
                activeLayer === 'citizens'
                  ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/40'
                  : 'text-rose-400 hover:text-rose-300 hover:bg-rose-950/40'
              }`}
            >
              <Camera className="w-3 h-3" />
              <span>{t.layerCitizenReports} ({citizenReports.length})</span>
            </button>
            <button
              onClick={() => setActiveLayer('nitiSensors')}
              className={`px-3 py-1 rounded-lg transition-all text-xs font-bold flex items-center gap-1.5 ${
                activeLayer === 'nitiSensors'
                  ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-600/40'
                  : 'text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/40'
              }`}
            >
              <Radio className="w-3 h-3" />
              <span>NITI / IIT Mandi Mesh ({indigenousSensorNodes.length})</span>
            </button>
          </div>

          {/* Base Map Switcher Pill */}
          <div className="flex items-center space-x-1 bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-700/80 shadow-xl text-xs">
            <button
              onClick={() => setBaseMapType('dark')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                baseMapType === 'dark' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Dark Canvas
            </button>
            <button
              onClick={() => setBaseMapType('satellite')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                baseMapType === 'satellite' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Satellite (ISRO/Esri)
            </button>
          </div>

          <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl border shadow-xl text-[11px] font-mono backdrop-blur-md bg-emerald-950/80 border-emerald-600/50 text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold">{t.fastApiLive}</span>
          </div>
        </div>

        {/* Quick Jump Buttons & Fullscreen */}
        <div className="absolute top-3.5 right-3.5 z-[1000] hidden md:flex items-center space-x-1.5 bg-slate-900/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-slate-700/80 shadow-xl text-[11px]">
          <span className="text-slate-400 font-semibold px-1">{t.jumpTo}</span>
          <button
            onClick={() => {
              setSelectedItem(hotspots[0]);
              mapInstanceRef.current?.flyTo([25.275, 91.731], 9, { duration: 1 });
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-transparent hover:border-slate-600 transition shadow-sm"
          >
            Cherrapunji
          </button>
          <button
            onClick={() => {
              setSelectedItem(hotspots[2]);
              mapInstanceRef.current?.flyTo([27.050, 88.490], 9.5, { duration: 1 });
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-transparent hover:border-slate-600 transition shadow-sm"
          >
            29th Mile NH-10
          </button>
          <button
            onClick={() => {
              setSelectedItem(hotspots[1]);
              mapInstanceRef.current?.flyTo([25.842, 93.435], 9, { duration: 1 });
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-transparent hover:border-slate-600 transition shadow-sm"
          >
            Karbi Anglong
          </button>
          <button
            onClick={() => {
              setIsFullscreen(prev => !prev);
              setTimeout(() => mapInstanceRef.current?.invalidateSize(), 250);
            }}
            className="ml-1 p-1.5 rounded-lg bg-sky-600/20 hover:bg-sky-600 text-sky-300 hover:text-white border border-sky-500/30 transition shadow-sm"
            title={isFullscreen ? 'Exit Fullscreen Map' : 'Expand Fullscreen GIS Canvas'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* DOM Leaflet Container */}
        <div ref={mapContainerRef} className="w-full h-full" style={{ minHeight: '380px' }} />

        {/* Risk Scale Legend */}
        <div className="absolute bottom-3.5 left-3.5 z-[1000] flex items-center space-x-3 text-xs text-slate-400 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 shadow-xl">
          <span className="font-bold text-slate-200">{t.legendRiskScale}</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>{t.lowRisk}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>{t.moderateRisk}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            <span>{t.highRisk}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span>{t.severeRisk}</span>
          </div>
        </div>
      </div>

      {/* Side Inspector Panel */}
      <div className="w-full lg:w-[420px] bg-[#0c1322] border-t lg:border-t-0 lg:border-l border-slate-800/90 p-5 flex flex-col justify-between overflow-y-auto space-y-4 shadow-xl">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between pb-3.5 border-b border-slate-800/90">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-sky-400 font-mono font-bold">{currentItem.id}</span>
                {currentItem.isCitizenReport ? (
                  <span className="text-[10px] bg-rose-500/15 text-rose-300 font-bold px-2 py-0.5 rounded border border-rose-500/30">
                    📷 GROUND OBS
                  </span>
                ) : currentItem.isNitiNode ? (
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-mono font-bold px-2 py-0.5 rounded border border-cyan-500/40 flex items-center gap-1">
                    <Radio className="w-3 h-3" /> NITI / IIT MANDI SENSOR NODE
                  </span>
                ) : (
                  <span className="text-[10px] bg-sky-500/15 text-sky-300 font-mono px-2 py-0.5 rounded border border-sky-500/30">
                    AI MONITORED SECTOR
                  </span>
                )}
              </div>
              <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">
                {currentItem.name}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                {currentItem.district || currentItem.state}
              </p>
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <div className="text-[10px] text-rose-300 font-mono font-bold bg-rose-500/15 px-2 py-0.5 rounded border border-rose-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                  <span>{currentItem.evacPerimeter || '3.5km Evac Perimeter'}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  ~{currentItem.civiliansAtRisk?.toLocaleString() || '4,820'} Civilians
                </span>
              </div>
            </div>

            {/* NITI Aayog / IIT Mandi Node Telemetry Card */}
            {currentItem.isNitiNode && currentItem.rawNitiNode && (
              <div className="p-3.5 bg-slate-950/90 rounded-2xl border border-cyan-500/30 space-y-2.5 shadow-inner mt-2">
                <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                  <span className="text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    Subsurface Telemetry (JETIR / NITI)
                  </span>
                  <span className="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    Lead: {currentItem.rawNitiNode.leadTimeHours}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center text-[11px] font-mono">
                  <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-800">
                    <span className="text-[9px] text-slate-400 uppercase block">1.5m Soil Moisture</span>
                    <b className={`text-sm ${currentItem.rawNitiNode.moisture1_5m_pct >= 75 ? 'text-rose-400 font-bold' : (currentItem.rawNitiNode.moisture1_5m_pct >= 65 ? 'text-amber-400' : 'text-emerald-400')}`}>
                      {currentItem.rawNitiNode.moisture1_5m_pct}%
                    </b>
                    <span className="text-[9px] text-slate-500 block">Failure limit: 75%</span>
                  </div>
                  <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-800">
                    <span className="text-[9px] text-slate-400 uppercase block">MEMS Tilt (Δθ)</span>
                    <b className={`text-sm ${currentItem.rawNitiNode.tiltAngle_deg >= 3.2 ? 'text-rose-400 font-bold' : (currentItem.rawNitiNode.tiltAngle_deg >= 2.5 ? 'text-amber-400' : 'text-emerald-400')}`}>
                      {currentItem.rawNitiNode.tiltAngle_deg}°
                    </b>
                    <span className="text-[9px] text-slate-500 block">Critical: 2.5° | Breach: 3.2°</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
                  <span>Solar: <b className="text-slate-200">{currentItem.rawNitiNode.battery_v}V</b></span>
                  <span>LoRa: <b className="text-slate-200">{currentItem.rawNitiNode.rssi_dbm} dBm</b></span>
                </div>
              </div>
            )}
            <span
              className="px-3 py-1 rounded-xl text-xs font-black shrink-0 uppercase tracking-wider shadow-sm font-mono"
              style={{
                backgroundColor: `${itemColor}18`,
                color: itemColor,
                border: `1px solid ${itemColor}40`,
              }}
            >
              {currentItem.tier}
            </span>
          </div>

          {/* Citizen Report Photo Preview (if clicked) */}
          {currentItem.isCitizenReport && currentItem.rawReport && (
            <div className="space-y-3 p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 shadow-inner">
              <div className="relative h-44 rounded-xl overflow-hidden border border-slate-800 bg-black group">
                <img
                  src={currentItem.rawReport.photoUrl}
                  alt={currentItem.rawReport.hazard}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-2 left-2 bg-black/80 backdrop-blur px-2 py-0.5 rounded text-[10px] text-white font-mono flex items-center gap-1">
                  <Camera className="w-3 h-3 text-rose-400" />
                  <span>{currentItem.rawReport.time}</span>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur px-2 py-0.5 rounded text-[10px] text-sky-300 font-mono tabular-nums">
                  {currentItem.rawReport.lat?.toFixed(2)}°N, {currentItem.rawReport.lon?.toFixed(2)}°E
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-400 font-medium">Verification Status:</span>
                <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                  currentItem.rawReport.status === 'VERIFIED_TRUE_ALARM'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : currentItem.rawReport.status === 'DISMISSED_FALSE_ALARM'
                    ? 'bg-slate-800 text-slate-400 border border-slate-700'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                }`}>
                  {currentItem.rawReport.status.replace(/_/g, ' ')}
                </span>
              </div>

              {onVerifyReport && currentItem.rawReport.status === 'PENDING_REVIEW' && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => {
                      onVerifyReport(currentItem.rawReport.id, 'VERIFIED_TRUE_ALARM');
                      setSelectedItem(prev => ({
                        ...prev,
                        rawReport: { ...prev.rawReport, status: 'VERIFIED_TRUE_ALARM' }
                      }));
                    }}
                    className="py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Verify & Alert</span>
                  </button>
                  <button
                    onClick={() => {
                      onVerifyReport(currentItem.rawReport.id, 'DISMISSED_FALSE_ALARM');
                      setSelectedItem(prev => ({
                        ...prev,
                        rawReport: { ...prev.rawReport, status: 'DISMISSED_FALSE_ALARM' }
                      }));
                    }}
                    className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 border border-slate-700 transition"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Dismiss</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* LSI Gauge */}
          <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800/80 space-y-2.5 shadow-inner">
            <div className="flex justify-between items-baseline text-xs text-slate-300 font-medium">
              <span className="font-semibold text-slate-200">Landslide Susceptibility Index (LSI)</span>
              <span
                className="text-2xl sm:text-3xl font-black font-mono tracking-tight tabular-nums"
                style={{ color: itemColor }}
              >
                {(currentItem.intensity * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${currentItem.intensity * 100}%`,
                  backgroundColor: itemColor,
                }}
              />
            </div>
          </div>

          {/* 2x2 Telemetry Grid */}
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            {/* Slope */}
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60 transition-all duration-200 space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <Mountain className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px] font-semibold">{t.slopeGradient}</span>
                </div>
                {currentItem.slope > 35 && (
                  <span className="text-[9px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 px-1.5 py-0.5 rounded">
                    &gt;35° {lang === 'hi' ? 'गंभीर' : 'CRITICAL'}
                  </span>
                )}
              </div>
              <div className="flex items-baseline space-x-1">
                <p className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight tabular-nums">
                  {currentItem.slope}
                </p>
                <span className="text-xs font-bold text-amber-400 font-mono">°</span>
              </div>
              <span className="text-[10px] text-slate-500 block font-mono">SRTM 30m DEM</span>
            </div>

            {/* 48h Rain */}
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60 transition-all duration-200 space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <CloudRain className="w-3.5 h-3.5 text-sky-400" />
                  <span className="text-[11px] font-semibold">{lang === 'hi' ? '48 घंटे वर्षा' : '48h Rain'}</span>
                </div>
                {currentItem.rain48 > 150 && (
                  <span className="text-[9px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 px-1.5 py-0.5 rounded animate-pulse">
                    {lang === 'hi' ? 'सीमा पार' : 'BREACHED'}
                  </span>
                )}
              </div>
              <div className="flex items-baseline space-x-1">
                <p className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight tabular-nums">
                  {currentItem.rain48}
                </p>
                <span className="text-xs font-bold text-sky-400 font-mono">mm</span>
              </div>
              <span className="text-[10px] text-slate-500 block font-mono">IMD AWS Gauge</span>
            </div>

            {/* Soil Saturation */}
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60 transition-all duration-200 space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <Droplets className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-[11px] font-semibold">{t.soilSaturation}</span>
                </div>
                {currentItem.soil > 80 && (
                  <span className="text-[9px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40 px-1.5 py-0.5 rounded">
                    {lang === 'hi' ? 'संतृप्त' : 'PORE SURGE'}
                  </span>
                )}
              </div>
              <div className="flex items-baseline space-x-1">
                <p className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight tabular-nums">
                  {currentItem.soil}
                </p>
                <span className="text-xs font-bold text-blue-400 font-mono">%</span>
              </div>
              <span className="text-[10px] text-slate-500 block font-mono">NASA SMAP L4</span>
            </div>

            {/* InSAR Creep */}
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60 transition-all duration-200 space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <Activity className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-[11px] font-semibold">{t.insarCreep}</span>
                </div>
                {Math.abs(currentItem.insar) > 15 && (
                  <span className="text-[9px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 px-1.5 py-0.5 rounded">
                    {lang === 'hi' ? 'सक्रिय विस्थापन' : 'ACTIVE SLIP'}
                  </span>
                )}
              </div>
              <div className="flex items-baseline space-x-1">
                <p className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight tabular-nums">
                  {currentItem.insar}
                </p>
                <span className="text-xs font-bold text-rose-400 font-mono">mm/yr</span>
              </div>
              <span className="text-[10px] text-slate-500 block font-mono">Sentinel-1 InSAR</span>
            </div>
          </div>

          {/* TreeSHAP AI Feature Contribution */}
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-sky-900/35 text-xs space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">{t.aiCauseExplanation}</h4>
                  <p className="text-[10px] text-slate-400 font-mono">Feature Contribution • TreeSHAP v0.42</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold bg-sky-500/15 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded-full">
                {lang === 'hi' ? 'सटीकता 94.8%' : 'Confidence 94.8%'}
              </span>
            </div>

            <div className="space-y-2.5 pt-1">
              {(currentItem.aiContributions || [
                { name: "Rainfall (Antecedent 48h)", pct: 42, color: "#38bdf8", gradient: "from-sky-500 to-blue-500" },
                { name: "Slope Gradient (SRTM DEM)", pct: 28, color: "#f59e0b", gradient: "from-amber-500 to-orange-500" },
                { name: "Soil Moisture Saturation", pct: 18, color: "#60a5fa", gradient: "from-blue-500 to-indigo-500" },
                { name: "InSAR Surface Creep", pct: 12, color: "#f43f5e", gradient: "from-rose-500 to-pink-500" }
              ]).map((feat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center text-[11px]">
                    <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: feat.color }} />
                      <span>{feat.name}</span>
                    </div>
                    <span className="font-mono font-black text-xs tabular-nums" style={{ color: feat.color }}>
                      {feat.pct}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${feat.gradient} transition-all duration-500`}
                      style={{ width: `${feat.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Factor of Safety Physics Box */}
            <div className="p-2.5 rounded-xl bg-[#080d1a] border border-slate-800 space-y-1 font-mono text-[10px]">
              <div className="flex justify-between text-slate-400">
                <span>Infinite Slope Factor of Safety (Fs):</span>
                <span className={`font-bold ${Fs < 1.0 ? 'text-rose-400 animate-pulse' : Fs < 1.3 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  Fs = {Fs} ({Fs < 1.0 ? 'FAILING / PLASTIC SLIP' : Fs < 1.3 ? 'MARGINAL' : 'STABLE'})
                </span>
              </div>
              <div className="text-[9px] text-slate-500 truncate">
                Formula: Fs = [c' + (γ - m·γw)·z·cos²β·tanφ'] / (γ·z·sinβ·cosβ)
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80">
              <p className="text-slate-300 leading-relaxed text-[11px] font-normal">
                {lang === 'hi' ? currentItem.exp_hi : currentItem.exp_en}
              </p>
            </div>
          </div>
        </div>

        {/* Evacuation Siren Broadcast Button */}
        <div className="pt-2">
          <button
            onClick={handleTriggerSiren}
            disabled={isSirenActive}
            className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg ${
              isSirenActive
                ? 'bg-emerald-600 text-white shadow-emerald-600/30 ring-2 ring-emerald-400'
                : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30 hover:shadow-rose-600/40 active:scale-[0.99]'
            }`}
          >
            {isSirenActive ? (
              <>
                <Check className="w-4 h-4" />
                <span>{t.sirenDispatched}</span>
              </>
            ) : (
              <>
                <TriangleAlert className="w-4 h-4 animate-bounce" />
                <span>{t.sirenButton}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
