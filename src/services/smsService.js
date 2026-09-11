/**
 * Automated SMS & WhatsApp Early Warning Gateway Service
 * Telecom DLT Registered Template Dispatches for NDMA / MDoNER
 */

// Telecom DLT Approved Templates
export const DLT_TEMPLATES = {
  en: {
    dltId: "DLT-110716823901",
    senderId: "DM-NDMANE",
    template: (zone, leadTime, action) => 
      `NDMA URGENT: High landslide risk in ${zone}. Est. occurrence within ${leadTime}. ${action}. Dial 1070 / 1078 for emergency help.`
  },
  hi: {
    dltId: "DLT-110716823902",
    senderId: "DM-NDMANE",
    template: (zone, leadTime, action) => 
      `NDMA चेतावनी: ${zone} में भूस्खलन का गंभीर खतरा। समय ${leadTime}। सुरक्षित ऊंचे स्थानों पर जाएं। सहायता हेतु 1070 डायल करें।`
  },
  as: {
    dltId: "DLT-110716823903",
    senderId: "DM-NDMANE",
    template: (zone, leadTime, action) => 
      `NDMA সতৰ্কতা: ${zone} ত প্ৰবল ভূমিস্খলনৰ সম্ভাৱনা। সময় ${leadTime}। নিৰাপদ স্থানলৈ স্থানান্তৰিত হওক। হেল্পলাইন: 1070।`
  },
  brx: {
    dltId: "DLT-110716823904",
    senderId: "DM-NDMANE",
    template: (zone, leadTime, action) => 
      `NDMA सांग्रांथि: ${zone} याव हा खायनायनि गोख्रों खैफोड। सम ${leadTime}। रैखाथि थावनियाव थां। अनसुंथाइ: 1070।`
  },
  kha: {
    dltId: "DLT-110716823905",
    senderId: "DM-NDMANE",
    template: (zone, leadTime, action) => 
      `NDMA MAHAM: Jingjulor khyndew ha ${zone}. Por ${leadTime}. Kynriah noh sha ki jaka ba shngain. Helpline: 1070.`
  }
};

/**
 * Generates an official WhatsApp Business API broadcast payload
 */
export function generateWhatsAppPayload(hotspot, lang = 'en') {
  const zoneName = hotspot.name;
  const state = hotspot.state;
  const lsi = hotspot.surgeData ? hotspot.surgeData.lsi : hotspot.lsi;
  const timeStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  return {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "template",
    template: {
      name: "ndma_landslide_evac_v2",
      language: { code: lang === 'hi' ? 'hi' : 'en_US' },
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "text",
              text: `🚨 URGENT: EVACUATION ORDER - ${zoneName.toUpperCase()}`
            }
          ]
        },
        {
          type: "body",
          parameters: [
            { type: "text", text: zoneName },
            { type: "text", text: state },
            { type: "text", text: `${lsi} (CRITICAL / SEVERE)` },
            { type: "text", text: "2.0 - 4.5 Hours" },
            { type: "text", text: `${timeStr} IST` }
          ]
        },
        {
          type: "button",
          sub_type: "url",
          index: 0,
          parameters: [
            {
              type: "text",
              text: `shelters/${hotspot.id}`
            }
          ]
        }
      ]
    }
  };
}

/**
 * Simulates a cellular BTS tower SMS blast across telecom operators
 */
export async function simulateSmsBlast({
  hotspot,
  lang = 'en',
  operators = ['Airtel', 'Jio', 'BSNL'],
  onProgress
}) {
  const t = DLT_TEMPLATES[lang] || DLT_TEMPLATES.en;
  const leadTime = "2.5 Hours";
  const action = "Move to designated ridge shelters immediately";
  const textBody = t.template(hotspot.name, leadTime, action);

  const totalSubscribers = Math.floor(hotspot.civiliansAtRisk * 1.35) || 6500;
  let sentCount = 0;

  for (let i = 1; i <= 5; i++) {
    await new Promise((res) => setTimeout(res, 250));
    sentCount = Math.floor((i / 5) * totalSubscribers);
    if (onProgress) {
      onProgress({
        progressPct: i * 20,
        subscribersReached: sentCount,
        totalSubscribers,
        status: i === 5 ? "COMPLETED" : "TRANSMITTING_CELL_TOWERS"
      });
    }
  }

  return {
    dispatchId: `SMS-NDMA-${Date.now()}`,
    timestamp: new Date().toISOString(),
    dltId: t.dltId,
    senderId: t.senderId,
    messageText: textBody,
    subscribersReached: totalSubscribers,
    deliveryRatePct: 98.6,
    operatorBreakdown: {
      Airtel: Math.round(totalSubscribers * 0.46),
      Jio: Math.round(totalSubscribers * 0.38),
      BSNL: Math.round(totalSubscribers * 0.16)
    }
  };
}
