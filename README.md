# 🏔️ AI-Based Early Warning and Landslide Risk Monitoring System in NER

[![SIH 2026](https://img.shields.io/badge/SIH-2026-orange.svg?style=for-the-badge)](https://sih.gov.in)
[![Problem Statement](https://img.shields.io/badge/Problem%20ID-SIH26001-blue.svg?style=for-the-badge)](https://sih.euome.com/SIH26001)
[![Ministry](https://img.shields.io/badge/Ministry-MDoNER%20%7C%20NDMA-green.svg?style=for-the-badge)](https://mdoner.gov.in)
[![React 19](https://img.shields.io/badge/React-19.0.0-61dafb.svg?style=for-the-badge&logo=react)](https://react.dev)
[![Vite 6](https://img.shields.io/badge/Vite-6.0.7-646cff.svg?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Leaflet GIS](https://img.shields.io/badge/GIS-Leaflet%201.9-199900.svg?style=for-the-badge&logo=leaflet)](https://leafletjs.com)
[![Protocol](https://img.shields.io/badge/Protocol-OASIS%20CAP%20v1.2-red.svg?style=for-the-badge)](https://docs.oasis-open.org/emergency/cap/v1.2/CAP-v1.2.html)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

> **A scalable, AI/ML-powered, cloud-native geospatial intelligence platform for real-time landslide risk prediction, early warning dissemination, and disaster mitigation across the 8 North Eastern Region (NER) states of India.**

---

## 📌 Problem Overview & Mandate (SIH26001)

The **North Eastern Region (NER)** of India—encompassing **Sikkim, Assam, Arunachal Pradesh, Meghalaya, Nagaland, Manipur, Mizoram, and Tripura**—faces severe recurring landslide hazards driven by extreme monsoon precipitation, complex seismic activity (Zone V), steep topographic gradients, and fragile Himalayan/Indo-Burman geological formations.

This unified platform addresses **Smart India Hackathon 2026 Problem Statement SIH26001** for the **Ministry of Development of North Eastern Region (MDoNER)** and **National Disaster Management Authority (NDMA)** by integrating all state-of-the-art features from leading national benchmarks:
1. **[NER Early Warning System](https://ner-early-warning-system.vercel.app/)** — Interactive Esri GIS canvas, TreeSHAP explainability, dual-tone siren oscillator, multilingual TTS.
2. **[SIH26001 Official Requirements](https://sih.euome.com/SIH26001)** — Geotechnical Factor of Safety ($F_s$) infinite slope solver, YOLOv8 computer vision detection, OASIS CAP 1.2 XML protocol for NDMA SACHET, and IndexedDB offline PWA sync.
3. **[NER Defender](https://nerdefender.vercel.app/)** — 8-State Strategic Risk Index, population tracking, and real-time precipitation threshold monitoring.
4. **[SIH-1-IOTA](https://sih-1-iota.vercel.app/)** — BRO highway clearance bulletins, disaster relief fund pledging, 24x7 public safety helplines, and rainfall vs. safe limits surge simulation.

---

## 🌟 Key Features

### 1. 🗺️ High-Resolution GIS Geoportal
- **Multi-Layer Base Switcher**: Seamlessly toggle between **Esri Dark Canvas** and **High-Resolution Satellite Orthophoto** layers.
- **Layer Controls**: Point Risk Heatmap, Landslide Susceptibility Index (LSI) polygon hazard zones, Arterial Road Networks, and Verified Ground-Truth Citizen Observations.
- **Interactive Inspection**: Real-time popups with LSI percentage, 48-hour rainfall, slope gradient, soil saturation, and InSAR surface creep velocity.
- **Quick-Jump Hotspots**: Rapid fly-to controls for high-risk corridors (**Cherrapunji Escarpment**, **29th Mile NH-10 Teesta Flank**, **Karbi Anglong Defile**).
- **Fullscreen Tactical Canvas**: Maximizable map workspace for emergency operations centers (EOCs).

### 2. 🧠 AI/ML Geotechnical Predictive Engine
- **Infinite Slope Factor of Safety ($F_s$) Solver**:
  $$F_s = \frac{c' + (\gamma - m \gamma_w) z \cos^2(\beta) \tan(\phi')}{\gamma z \sin(\beta) \cos(\beta)}$$
  Dynamic real-time calculation based on user-adjustable sliders for cohesion ($c'$), soil saturation ($m$), slope inclination ($\beta$), and internal friction angle ($\phi'$).
- **Dynamic TreeSHAP Attribution Waterfall**:
  Explains exact percentage contributions to landslide susceptibility (Rainfall Antecedent: 42%, Slope Gradient: 28%, Soil Moisture: 18%, InSAR Creep: 12%).
- **Hybrid AI Inference**: Combines static Landslide Susceptibility Index (LSI) with LSTM/GRU 2–6h nowcasting models.

### 3. 👁️ YOLOv8 Computer Vision Citizen Review
- **Crowdsourced Hazard Verification**: Citizen incident review queue with simulated YOLOv8 object detection inference.
- **Automated Detection Bounding Boxes**: Detects *Slope Tension Cracks*, *Rockfall Debris*, and *Road Obstructions* with confidence percentages (e.g., 94.2%).
- **ML Retraining Pipeline**: Verified true positive reports automatically feed the active retraining log to eliminate false alarms.

### 4. 🚨 Multi-Channel Emergency Early Warning System
- **OASIS CAP 1.2 XML Protocol**: Automated Common Alerting Protocol generation conforming to **NDMA SACHET** and **C-DOT** cell-broadcast standards. Includes instant XML clipboard export and download.
- **Dual-Tone Emergency Siren Oscillator**: Built with Web Audio API (oscillating between 750 Hz and 1150 Hz with exponential frequency modulation) for zero-latency local alarm broadcasts.
- **Multilingual Voice Announcements**: Web Speech API speech synthesis delivering automated spoken evacuation advisories in **5 regional languages**:
  - English
  - Hindi (हिन्दी)
  - Assamese (অসমীয়া)
  - Bodo (बर' राव)
  - Khasi (Ka Ktien Khasi)
- **Cell Broadcast & SMS Simulator**: Telecom DLT-approved SMS emergency templates with variable parameter substitution and WhatsApp Cloud API JSON payload generation.

### 5. 📑 12 Tactical Operational Decks
| # | Deck Name | Description | Key Shortcut |
|---|-----------|-------------|--------------|
| 1 | **Road Corridors** | Arterial highway connectivity (NH-10, NH-6, NH-29), active blockages, and Border Roads Organisation (BRO) detours. | `1` |
| 2 | **Weather & Radar** | IMD Doppler Weather Radar (DWR Agartala/Cherrapunji) and 48-hour precipitation nowcast. | `2` |
| 3 | **Priorities Matrix** | Multi-criteria disaster mitigation matrix (NDRF staging, road clearance, hospital access). | `3` |
| 4 | **Decadal Trends** | Historical landslide incidence analysis (2018–2025) with trigger distributions. | `4` |
| 5 | **Citizen Review** | YOLOv8 computer vision detection, ground-truth reports, and active retraining queue. | `5` |
| 6 | **AI Engine Studio** | Interactive geotechnical stability modeling with real-time Factor of Safety ($F_s$) sliders. | `6` |
| 7 | **Integrations Hub** | Live telemetry feeds: IMD AWS, Sentinel-1 InSAR, INSAT-3DR, and LoRaWAN IoT mesh. | `7` |
| 8 | **Climate Governance** | 8-State climate resilience scorecards and infrastructure damage exposure metrics. | `8` |
| 9 | **Rain vs Limits** | NER Defender rainfall tracking against critical saturation danger limits with surge slider. | `9` |
| 10 | **News & Bulletins** | Official Border Roads Organisation (BRO) clearance notices and state disaster bulletins. | `0` |
| 11 | **Relief & Aid** | Disaster relief fund tracking, community supply kit pledging, and logistics distribution. | `U` |
| 12 | **Public Safety** | 24x7 state-wise emergency helplines, evacuation routes, and color danger guidelines. | `P` |

### 6. 📴 Cloud-Native Architecture with Offline PWA Sync
- **Progressive Web App (PWA)**: Standalone installable app with `manifest.json` and Service Worker cache for zero-connectivity field use.
- **IndexedDB Local Storage**: Field volunteer hazard submissions are automatically queued in browser IndexedDB when offline.
- **Automated Reconnection Sync**: Queued reports seamlessly sync with the centralized server upon cellular/Wi-Fi reconnection.

---

## ⌨️ Tactical Keyboard Shortcuts

Power users and emergency control room operators can navigate the platform instantly:

| Key | Action |
|-----|--------|
| `1` to `9`, `0` | Switch between Operational Decks 1 through 10 |
| `U` | Open Disaster Relief Fund & Supply Pledging Deck |
| `P` | Open 24x7 Public Safety & Helplines Deck |
| `S` | Generate & Preview Official Situation Report (SitRep) |
| `R` | Open Citizen Hazard Photo/Video Reporting Modal |
| `C` | Trigger Emergency Evacuation Siren Modal & Audio Test |
| `X` | View & Copy OASIS CAP 1.2 XML Protocol |
| `W` | Open Automated SMS & WhatsApp Broadcast Console |
| `M` | Launch Field Mobile Responder PWA Simulator |
| `Esc` | Close any active modal dialog |

---

## 🏗️ System Architecture

```
├── UI Layer (React 19 + Tailwind CSS + Lucide Icons)
│   ├── Tactical Command Dashboard & Citizen Safe View
│   ├── Leaflet GIS Canvas (Esri Dark & Satellite Orthophotos)
│   ├── 12 Operational Decks & Emergency Modals
│   └── Audio Synthesis (Web Audio API Dual-Tone + Web Speech TTS)
│
├── Intelligence & Analytics Engine
│   ├── Infinite Slope Stability Solver (Factor of Safety Fs)
│   ├── XGBoost Landslide Susceptibility Index (LSI)
│   ├── TreeSHAP Attribution Waterfall (Feature Explainability)
│   └── YOLOv8 Computer Vision Inference (Defect & Crack Detection)
│
├── Disaster Communication & Protocols
│   ├── OASIS CAP v1.2 XML Generator (NDMA SACHET / C-DOT)
│   ├── Telecom DLT SMS & WhatsApp Evacuation Payloads
│   └── Official Situation Report (SitRep) PDF/Print Generator
│
├── Cloud, Offline & Telemetry Services
│   ├── IndexedDB Storage Engine (Offline Hazard Queue)
│   ├── Progressive Web App (PWA) Service Worker Cache
│   ├── Serverless API Handlers (/api/health, /api/hotspots, /api/weather)
│   └── Telemetry Integrations (IMD AWS, Sentinel-1 InSAR, LoRaWAN)
```

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/BKiran27/Al-Based-early-warning-and-landslide-Risk-Monitoring-System-in-NER.git
   cd Al-Based-early-warning-and-landslide-Risk-Monitoring-System-in-NER
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```
   The production-ready static assets will be output to `dist/`.

5. **Preview production build**:
   ```bash
   npm run preview
   ```

---

## 🚢 Deployment Options

This project is completely decoupled and can be deployed anywhere without platform lock-in:

### 1. Vercel
```bash
npx vercel
```

### 2. Netlify
```bash
npx netlify deploy --prod --dir=dist
```

### 3. Docker Container
A standard `Dockerfile` using NGINX:
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 📜 Regulatory Standards & Compliance

- **OASIS CAP v1.2**: Complies with the international Common Alerting Protocol specification adopted by NDMA for India's National Disaster Alert Portal (SACHET).
- **EPSG:4326 / WGS 84**: Standard geodetic datum used across all GIS coordinates and geospatial datasets.
- **Telecom DLT Framework**: Conforms to TRAI-mandated Distributed Ledger Technology templates for emergency public alerts.

---

## 👥 Contributors & Acknowledgements

Developed for **Smart India Hackathon 2026 (SIH26001)** under the guidance of:
- **Ministry of Development of North Eastern Region (MDoNER)**
- **National Disaster Management Authority (NDMA)**
- **Border Roads Organisation (BRO)**
- **India Meteorological Department (IMD)**

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.