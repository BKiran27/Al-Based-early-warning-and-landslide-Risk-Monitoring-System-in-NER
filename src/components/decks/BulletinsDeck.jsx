import React, { useState } from 'react';
import { 
  Newspaper, Share2, Route, CloudRain, ShieldAlert, 
  ExternalLink, Check, Clock, Filter 
} from 'lucide-react';
import { OFFICIAL_NEWS_BULLETINS } from '../../data/reliefNewsData';

export function BulletinsDeck({ lang }) {
  const [filter, setFilter] = useState('ALL');
  const [sharedId, setSharedId] = useState(null);

  const filteredNews = filter === 'ALL'
    ? OFFICIAL_NEWS_BULLETINS
    : OFFICIAL_NEWS_BULLETINS.filter(b => b.category === filter);

  const handleShare = async (bulletin) => {
    const text = `🚨 [${bulletin.source}] ${bulletin.title}\n\n${bulletin.summary}\n\nStay alert via NER Landslide Early Warning System: https://ner-early-warning-system.vercel.app`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: bulletin.title,
          text: text,
          url: window.location.href
        });
      } catch (err) {
        console.warn("Share cancelled or failed:", err);
      }
    } else {
      navigator.clipboard.writeText(text);
      setSharedId(bulletin.id);
      setTimeout(() => setSharedId(null), 2500);
    }
  };

  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-[#0c1322] border border-cyan-500/30 space-y-6 shadow-2xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-sky-500/10 border border-sky-500/30 rounded-xl text-sky-400">
            <Newspaper className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Official News & Road Clearance Bulletins (BRO & IMD)
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
                VERIFIED ADVISORIES
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Live updates directly dispatched from Border Roads Organisation, IMD Weather Observatories, and SDRF Task Forces
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
              filter === 'ALL' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Updates
          </button>
          <button
            onClick={() => setFilter('BRO')}
            className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
              filter === 'BRO' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Road Clearance (BRO)
          </button>
          <button
            onClick={() => setFilter('IMD')}
            className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
              filter === 'IMD' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Weather Alerts (IMD)
          </button>
          <button
            onClick={() => setFilter('RESCUE')}
            className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
              filter === 'RESCUE' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Rescue (NDRF)
          </button>
        </div>
      </div>

      {/* Bulletins Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNews.map((item) => (
          <div 
            key={item.id}
            className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3 hover:border-slate-700 transition"
          >
            <div className="flex justify-between items-start gap-2">
              <div className="space-y-1">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  item.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-300 border border-red-500/40' :
                  item.severity === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                  'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}>
                  {item.status}
                </span>
                <h3 className="text-sm font-bold text-white leading-snug pt-1">
                  {item.title}
                </h3>
              </div>

              <button
                onClick={() => handleShare(item)}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition shrink-0 cursor-pointer"
                title="Share this Advisory to WhatsApp / Contacts"
              >
                {sharedId === item.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-sky-400" />}
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {item.summary}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5 font-medium text-slate-300">
                <span>{item.source}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 font-mono text-slate-500">
                  <Clock className="w-3 h-3" /> {item.timestamp}
                </span>
                <a
                  href={item.actionUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 font-semibold"
                >
                  Advisory <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default BulletinsDeck;
