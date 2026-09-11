import React from 'react';
import { 
  ShieldCheck, PhoneCall, AlertTriangle, LifeBuoy, 
  HelpCircle, CheckCircle2, ChevronRight, Share2 
} from 'lucide-react';

export function PublicSafetyDeck({ lang }) {
  const handleQuickShare = () => {
    const shareText = `⚠️ NER LANDSLIDE EMERGENCY SAFETY NOTICE:\nIn case of heavy rainfall on steep hill slopes, call 24x7 Helpline 1070 / 1078. Stay away from hill edges and drainage channels. Access live risk map: https://ner-early-warning-system.vercel.app`;
    if (navigator.share) {
      navigator.share({ title: "Landslide Safety Advisory", text: shareText, url: window.location.href });
    } else {
      navigator.clipboard.writeText(shareText);
      alert("Safety advisory copied to clipboard! Share with family and neighbors.");
    }
  };

  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-[#0c1322] border border-cyan-500/30 space-y-6 shadow-2xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <LifeBuoy className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Public Safety & Landslide Citizen Action Guide
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                CITIZEN PORTAL • NO LOGIN NEEDED
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Free 24x7 emergency helplines, visual 4-level color danger guide, and lifesaving landslide protocols
            </p>
          </div>
        </div>

        <button
          onClick={handleQuickShare}
          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-lg shadow-emerald-600/30"
        >
          <Share2 className="w-3.5 h-3.5" />
          Share Safety Warning
        </button>
      </div>

      {/* 1. 4-Level Color Danger Code Guide */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
          How to Read Landslide Threat Levels (Simple Color Guide):
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/40 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-black text-red-400 uppercase">🔴 RED = DANGER</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              High danger of sliding mud and boulders. Move away from steep slopes immediately to designated shelters.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-orange-950/30 border border-orange-500/40 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-xs font-black text-orange-400 uppercase">🟠 ORANGE = WARNING</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Heavy continuous rain is soaking the soil. Avoid travel on arterial hill highways unless necessary.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-xs font-black text-amber-400 uppercase">🟡 YELLOW = WATCH</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Moderate precipitation. Inspect outdoor culverts and avoid parking near cracked retaining walls.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-black text-emerald-400 uppercase">🟢 GREEN = SAFE</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Safe weather conditions. Automated IoT sensor and satellite monitoring active in normal state.
            </p>
          </div>

        </div>
      </div>

      {/* 2. Before, During & After Citizen Rules */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
          What to Do During Landslide Disasters:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h4 className="font-bold text-sky-400 flex items-center gap-1.5 text-xs uppercase">
              <ChevronRight className="w-4 h-4" /> 1. Before Heavy Rains:
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-300 list-disc list-inside leading-relaxed">
              <li>Keep battery torches, essential medications, and emergency ID proofs packed.</li>
              <li>Inspect retaining walls and hill cuts for new hairline fissures or muddy springs.</li>
              <li>Know the shortest evacuation route to designated high ridge shelters.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h4 className="font-bold text-rose-400 flex items-center gap-1.5 text-xs uppercase">
              <ChevronRight className="w-4 h-4" /> 2. During Active Mudflow:
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-300 list-disc list-inside leading-relaxed">
              <li>Run sideways away from the path of falling debris; never run downhill in the path.</li>
              <li>Never attempt to drive across submerged or mud-coated highway bridges.</li>
              <li>Curl into a tight ball and protect your head if escape is impossible.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h4 className="font-bold text-emerald-400 flex items-center gap-1.5 text-xs uppercase">
              <ChevronRight className="w-4 h-4" /> 3. After the Slide:
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-300 list-disc list-inside leading-relaxed">
              <li>Stay well clear of the slide zone; secondary collapses frequently follow within hours.</li>
              <li>Check for trapped neighbors without entering unstable mud deposits.</li>
              <li>Dial 1070 / 1078 to report structural damage and isolated casualties.</li>
            </ul>
          </div>

        </div>
      </div>

      {/* 3. 24x7 Emergency Helpline Numbers Directory */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            24x7 Toll-Free Government Emergency Numbers:
          </span>
          <span className="text-[10px] font-mono text-emerald-400 font-bold">ALL OPERATORS TOLL FREE</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <a
            href="tel:1070"
            className="p-3 bg-black/40 hover:bg-black/60 rounded-lg border border-slate-800 flex items-center justify-between transition cursor-pointer"
          >
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">NDMA National Control</span>
              <span className="text-base font-black font-mono text-cyan-400">1070</span>
            </div>
            <PhoneCall className="w-4 h-4 text-cyan-400" />
          </a>

          <a
            href="tel:1078"
            className="p-3 bg-black/40 hover:bg-black/60 rounded-lg border border-slate-800 flex items-center justify-between transition cursor-pointer"
          >
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">NDRF Emergency Rescue</span>
              <span className="text-base font-black font-mono text-emerald-400">1078</span>
            </div>
            <PhoneCall className="w-4 h-4 text-emerald-400" />
          </a>

          <a
            href="tel:1077"
            className="p-3 bg-black/40 hover:bg-black/60 rounded-lg border border-slate-800 flex items-center justify-between transition cursor-pointer"
          >
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">State Disaster Authority</span>
              <span className="text-base font-black font-mono text-amber-400">1077</span>
            </div>
            <PhoneCall className="w-4 h-4 text-amber-400" />
          </a>

          <a
            href="tel:112"
            className="p-3 bg-black/40 hover:bg-black/60 rounded-lg border border-slate-800 flex items-center justify-between transition cursor-pointer"
          >
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">Emergency Police/Ambulance</span>
              <span className="text-base font-black font-mono text-rose-400">112</span>
            </div>
            <PhoneCall className="w-4 h-4 text-rose-400" />
          </a>
        </div>
      </div>

    </div>
  );
}

export default PublicSafetyDeck;
