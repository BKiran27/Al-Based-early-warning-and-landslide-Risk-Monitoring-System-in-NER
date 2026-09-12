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

### 🌐 Live Official Link
- 🚀 **Permanent Live Web App (GitHub Pages)**: [https://bkiran27.github.io/Al-Based-early-warning-and-landslide-Risk-Monitoring-System-in-NER/](https://bkiran27.github.io/Al-Based-early-warning-and-landslide-Risk-Monitoring-System-in-NER/)
- 💻 **Local Development**: `http://localhost:3000/`

---

## 📌 Problem Overview & Mandate (SIH26001)

The **North Eastern Region (NER)** of India—encompassing **Sikkim, Assam, Arunachal Pradesh, Meghalaya, Nagaland, Manipur, Mizoram, and Tripura**—faces severe recurring landslide hazards driven by extreme monsoon precipitation, complex seismic activity (Zone V), steep topographic gradients, and fragile Himalayan/Indo-Burman geological formations.

This unified platform addresses **Smart India Hackathon 2026 Problem Statement SIH26001** for the **Ministry of Development of North Eastern Region (MDoNER)** and **National Disaster Management Authority (NDMA)** by integrating all state-of-the-art features from leading national benchmarks and peer-reviewed research:
1. **[NER Early Warning System](https://ner-early-warning-system.vercel.app/)** — Interactive Esri GIS canvas, TreeSHAP explainability, dual-tone siren oscillator, multilingual TTS.
2. **[SIH26001 Official Requirements](https://sih.euome.com/SIH26001)** — Geotechnical Factor of Safety ($F_s$) infinite slope solver, YOLOv8 computer vision detection, OASIS CAP 1.2 XML protocol for NDMA SACHET, and IndexedDB offline PWA sync.
3. **[NER Defender](https://nerdefender.vercel.app/)** — 8-State Strategic Risk Index, population tracking, and real-time precipitation threshold monitoring.
4. **[SIH-1-IOTA](https://sih-1-iota.vercel.app/)** — BRO highway clearance bulletins, disaster relief fund pledging, 24x7 public safety helplines, and rainfall vs. safe limits surge simulation.
5. **[E3S Web of Conferences 692, 03011 (2026)](https://doi.org/10.1051/e3sconf/202669203011)** — Sahithi K et al.: IoT-based landslide monitoring & comparative ML benchmarking (Multilinear Regression vs. Decision Tree vs. Random Forest, $R^2=0.94$).
6. **[JETIR May 2026](https://www.jetir.org/)** — Akhilesh Kumar et al.: IoT & AI landslide early warning (Standard Proctor OMC 17%, Failure at 75% moisture, Direct Shear $c=0.36\text{ kPa}, \phi=19^\circ$, Pycnometer $G_s=2.57$, 1.5–2m Subsurface Probe, MEMS Tilt $2.5^\circ \rightarrow 3.2^\circ$).
7. **[NITI Aayog Frontier Technologies](https://frontiertech.niti.gov.in/story/low-cost-indigenous-sensors-ai-deliver-real-time-landslide-alerts-across-himalayan-slopes/)** — IIT Mandi Low-Cost Indigenous Sensors (Prof. K.V. Uday & Prof. Varun Dutt, WCDM-DRR 2024 Award, 3-hour advance prediction window with >90% accuracy, ₹1.2L vs ₹1.1Cr imported radar).

---

## 🌟 Key Features

### 1. 🗺️ High-Resolution GIS Geoportal & NITI IoT Mesh Layer
- **Multi-Layer Base Switcher**: Seamlessly toggle between **Esri Dark Canvas** and **High-Resolution Satellite Orthophoto** layers.
- **5 Layer Controls**: Point Risk Heatmap, Landslide Susceptibility Index (LSI) polygon hazard zones, Arterial Road Networks, Verified Citizen Observations (YOLOv8), and **NITI / IIT Mandi Indigenous Sensor Mesh (64 Nodes)**.
- **Hyperlocal Node Inspection**: Real-time popups with 1.5m subsurface soil moisture, MEMS 3-axis inclinometer tilt ($\Delta\theta$), solar battery voltage, and 3-hour advance failure prediction window.
- **Quick-Jump Hotspots**: Rapid fly-to controls for high-risk corridors (**Cherrapunji Escarpment**, **29th Mile NH-10 Teesta Flank**, **Karbi Anglong Defile**).
- **Fullscreen Tactical Canvas**: Maximizable map workspace for emergency operations centers (EOCs).

### 2. 🧠 Academic ML Benchmark & Comparative Studio (E3S 2026)
- **Comparative Model Benchmarking**:
  - **Multilinear Regression (OLS)**: $R^2 = 0.82$, $\text{RMSE} = 0.184$, $\text{MAE} = 0.132$ (Baseline linear model, underpredicts $F_s < 0.6$).
  - **Decision Tree**: $R^2 = 0.89$, $\text{RMSE} = 0.145$, $\text{MAE} = 0.110$ (Threshold rules on rainfall & slope, moderate skewness).
  - **Random Forest Ensemble**: $R^2 = 0.94$, $\text{RMSE} = 0.098$, $\text{MAE} = 0.072$ (**Top performer**, lowest error, zero-centered symmetrical residuals).
- **Actual vs. Predicted FOS Scatter Plot**: Visualizes individual sample predictions against the 45° theoretical parity line.
- **Residual Distribution Analysis (Figure 6)**: Side-by-side histogram comparison of residual variance.
- **Feature Importance Breakdown**: Rainfall Intensity ($41\%$), Slope Angle ($26\%$), Soil Cohesion ($17\%$), Friction Angle ($11\%$), Slope Height ($5\%$).

### 3. 🔬 Subsurface IoT & Geomechanics Lab (JETIR 2026)
- **Subsurface Soil Stratigraphy Profile (0.0–2.0m)**: Visualizes the vertical borehole depth slice from topsoil down to the critical shear slip surface at 1.8m.
- **Soil Laboratory Bench**:
  - **Standard Proctor Compaction Test**: Optimum Moisture Content ($\text{OMC} = 17\%$), Dry Density $1.88\text{ g/cm}^3$, Pre-Alarm at $65\%$ moisture, catastrophic failure at $75\%$ moisture content.
  - **Direct Shear Box Test**: Cohesion $c = 0.36\text{ kPa}$, internal friction angle $\phi = 19^\circ$, Mohr-Coulomb failure envelope ($\tau = c + \sigma_n \tan\phi$).
  - **Pycnometer Specific Gravity**: $G_s = 2.57\text{ g/cm}^3$ for weathered Himalayan silty clay.
- **MEMS 3-Axis Inclinometer / Gyroscope Kinematics**: Tracks angular tilt $\Delta\theta$ with critical warning at $2.5^\circ$ and danger breach at $3.2^\circ$, actuating local alarm in 5–10 seconds.

### 4. 🛰️ NITI Aayog & IIT Mandi Indigenous Low-Cost Sensor Mesh
- **64-Node Deployed Fleet**: Deployed across all 8 NER states along critical arterial highways (NH-10, NH-6, NH-29, NH-102, NH-13, NH-8, etc.) at 500m–1km intervals.
- **3-Hour Advance AI Warning Window**: Predicts slope shear collapse up to 3.0 hours in advance with >90% accuracy.
- **Frugal Innovation Economics**: ₹1.2 Lakhs indigenous node vs. ₹1.1 Crore imported radar (90x cost reduction).
- **Hyperlocal Strobe & Siren Simulator**: Interactive site strobe blinker and buzzer actuation test.

### 5. 👁️ YOLOv8 Computer Vision Citizen Review
- **Crowdsourced Hazard Verification**: Citizen incident review queue with simulated YOLOv8 object detection inference.
- **Automated Detection Bounding Boxes**: Detects *Slope Tension Cracks*, *Rockfall Debris*, and *Road Obstructions* with confidence percentages (e.g., 94.2%).
- **ML Retraining Pipeline**: Verified true positive reports automatically feed the active retraining log to eliminate false alarms.

### 6. 🚨 Multi-Channel Emergency Early Warning System
- **OASIS CAP 1.2 XML Protocol**: Automated Common Alerting Protocol generation conforming to **NDMA SACHET** and **C-DOT** cell-broadcast standards. Includes instant XML clipboard export and download.
- **Dual-Tone Emergency Siren Oscillator**: Built with Web Audio API (oscillating between 750 Hz and 1150 Hz with exponential frequency modulation) for zero-latency local alarm broadcasts.
- **Multilingual Voice Announcements**: Web Speech API speech synthesis delivering automated spoken evacuation advisories in **5 regional languages** (English, Hindi, Bengali, Assamese, Khasi).
- **Cell Broadcast & SMS Simulator**: Telecom DLT-approved SMS emergency templates with variable parameter substitution and WhatsApp Cloud API JSON payload generation.

### 7. 📑 15 Tactical Operational Decks
| # | Deck Name | Research / Benchmark Source | Description | Key Shortcut |
|---|-----------|-----------------------------|-------------|--------------|
| 1 | **Road Corridors** | BRO Lifelines | Arterial highway connectivity (NH-10, NH-6, NH-29), active blockages, and Border Roads Organisation (BRO) detours. | `1` |
| 2 | **Weather & Radar** | IMD Doppler Feeds | IMD Doppler Weather Radar (DWR Agartala/Cherrapunji) and 48-hour precipitation nowcast. | `2` |
| 3 | **Priorities Matrix** | NDMA Matrix | Multi-criteria disaster mitigation matrix (NDRF staging, road clearance, hospital access). | `3` |
| 4 | **Decadal Trends** | Historical Archive | Historical landslide incidence analysis (2018–2025) with trigger distributions. | `4` |
| 5 | **Citizen Review** | YOLOv8 Vision | YOLOv8 computer vision detection, ground-truth reports, and active retraining queue. | `5` |
| 6 | **AI Predictive Studio** | Infinite Slope ($F_s$) | Interactive geotechnical stability modeling with real-time Factor of Safety ($F_s$) sliders & TreeSHAP waterfall. | `6` |
| 7 | **ML Benchmark** | **E3S 2026 Paper** | Multilinear Regression vs. Decision Tree vs. Random Forest ($R^2=0.94$), residuals & actual vs. predicted FOS. | `7` |
| 8 | **Geomechanics Lab** | **JETIR 2026 Paper** | Subsurface 0–2m stratigraphy, Proctor OMC (17% / 75% failure), Direct Shear ($c=0.36, \phi=19^\circ$), MEMS tilt ($2.5^\circ \rightarrow 3.2^\circ$). | `8` |
| 9 | **NITI Sensor Mesh** | **NITI Aayog / IIT Mandi** | 64 indigenous low-cost sensor nodes, 3-hour advance prediction window, ₹1.2L vs ₹1.1Cr, hyperlocal strobe test. | `9` |
| 10 | **Rain vs Limits** | **NER Defender / SIH-1-IOTA** | Town rainfall tracking against saturation limits with dynamic rain surge slider. | `0` |
| 11 | **BRO Bulletins** | **SIH-1-IOTA** | Official Border Roads Organisation (BRO) clearance notices and state disaster bulletins. | `B` |
| 12 | **Relief Fund & Aid** | **SIH-1-IOTA** | Disaster relief fund tracking, community supply kit pledging, and logistics distribution. | `U` |
| 13 | **Public Safety** | **SIH-1-IOTA** | 24x7 state-wise emergency helplines, evacuation routes, and color danger guidelines. | `P` |
| 14 | **Governance** | Climate Resilience | 8-State climate resilience scorecards and infrastructure damage exposure metrics. | `G` |
| 15 | **IMD Integrations** | Satellite & IoT | Live telemetry feeds: IMD AWS, Sentinel-1 InSAR, INSAT-3DR, and LoRaWAN IoT mesh. | `I` |

### 8. 📴 Cloud-Native Architecture with Offline PWA Sync
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