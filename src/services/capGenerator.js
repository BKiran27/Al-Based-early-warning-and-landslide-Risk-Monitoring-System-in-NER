// OASIS CAP 1.2 XML Protocol Builder for NDMA SACHET / C-DOT Alerting
export const generateCapXml = (alert, hotspot) => {
  const identifier = `URN:NDMA:NER:LEWS:${alert?.id || '101'}:${Date.now()}`;
  const sentTime = new Date().toISOString();
  const expiresTime = new Date(Date.now() + 6 * 3600 * 1000).toISOString();

  const headline = alert?.title || "RED ALERT: Imminent Slope Failure Threat in East Khasi Hills";
  const description = alert?.description || "Cloudburst (>260.4mm in 48h) crossed critical saturation threshold. Pre-emptive evacuation advised along NH-206 corridor.";
  const instruction = hotspot?.suggestedAction || "Pre-emptive evacuation along steep escarpment settlements; suspend vehicular transit on SH-5.";
  const areaDesc = `${hotspot?.district || 'East Khasi Hills'}, ${hotspot?.state || 'Meghalaya'}, North Eastern Region, India`;
  const lat = hotspot?.lat || 25.275;
  const lon = hotspot?.lon || 91.731;
  const circle = `${lat},${lon},5.0`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<alert xmlns="urn:oasis:names:tc:emergency:cap:1.2">
  <identifier>${identifier}</identifier>
  <sender>disaster-cell@mdoner.gov.in</sender>
  <sent>${sentTime}</sent>
  <status>Actual</status>
  <msgType>Alert</msgType>
  <scope>Public</scope>
  <code>NDMA-SACHET-v1.2</code>
  <code>SIH26001-MDoNER</code>
  <info>
    <category>Geo</category>
    <event>Landslide / Debris Flow Threat</event>
    <urgency>Immediate</urgency>
    <severity>${alert?.risk_level === 'SEVERE' ? 'Extreme' : 'Severe'}</severity>
    <certainty>Observed</certainty>
    <eventCode>
      <valueName>NDMA-Hazard-Type</valueName>
      <value>LANDSLIDE_DEBRIS_AVALANCHE</value>
    </eventCode>
    <expires>${expiresTime}</expires>
    <senderName>Ministry of Development of North Eastern Region (MDoNER)</senderName>
    <headline>${headline}</headline>
    <description>${description}</description>
    <instruction>${instruction}</instruction>
    <web>https://ner-early-warning-system.vercel.app</web>
    <contact>Disaster Management Cell: 1070 / 1078</contact>
    <parameter>
      <valueName>LSI_Susceptibility_Score</valueName>
      <value>${hotspot?.intensity ? (hotspot.intensity * 100).toFixed(1) + '%' : '94.0%'}</value>
    </parameter>
    <parameter>
      <valueName>48h_Antecedent_Rainfall_mm</valueName>
      <value>${hotspot?.rain48 || '260.4'}</value>
    </parameter>
    <parameter>
      <valueName>InSAR_Ground_Deformation_mm_yr</valueName>
      <value>${hotspot?.insar || '-32.5'}</value>
    </parameter>
    <area>
      <areaDesc>${areaDesc}</areaDesc>
      <circle>${circle}</circle>
    </area>
  </info>
</alert>`;
};
