import React, { useState } from 'react';
import { 
  HeartHandshake, QrCode, Copy, Check, ShieldCheck, 
  Package, DollarSign, Award, Users, ArrowUpRight 
} from 'lucide-react';
import { 
  RELIEF_FUND_CONFIG, 
  INITIAL_PLEDGED_SUPPLIES, 
  RECENT_DONATIONS 
} from '../../data/reliefNewsData';

export function ReliefDeck({ lang }) {
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [supplies, setSupplies] = useState(INITIAL_PLEDGED_SUPPLIES);
  const [pledgedSuccess, setPledgedSuccess] = useState('');

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(RELIEF_FUND_CONFIG.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handlePledgeSupply = (id, count = 10) => {
    setSupplies(prev => prev.map(s => s.id === id ? { ...s, pledged: s.pledged + count } : s));
    setPledgedSuccess(`Thank you! Pledged +${count} units.`);
    setTimeout(() => setPledgedSuccess(''), 2500);
  };

  const currentDonation = customAmount ? Number(customAmount) : selectedAmount;

  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-[#0c1322] border border-cyan-500/30 space-y-6 shadow-2xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Disaster Relief Fund & Community Aid (SIH-1-IOTA)
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                80G TAX EXEMPT
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Direct humanitarian support for affected families in Sikkim, Meghalaya, Assam & Eastern Himalayas
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-500/30 font-mono">
          <ShieldCheck className="w-4 h-4" />
          <span>Official State Disaster Relief Fund</span>
        </div>
      </div>

      {/* Main Grid: Donation Portal & Supply Pledging */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col: UPI / Bank Direct Donation (7 Cols) */}
        <div className="lg:col-span-7 space-y-5 p-5 rounded-xl bg-slate-900/60 border border-slate-800">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              1. Donate via UPI / Official Bank Transfer
            </span>
            <span className="text-[10px] font-mono text-slate-400">Zero Gateway Fees</span>
          </div>

          {/* Amount Tiers */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Select Donation Amount (INR):</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {RELIEF_FUND_CONFIG.donationTiers.map((amt) => (
                <button
                  key={amt}
                  onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                  className={`py-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
                    selectedAmount === amt && !customAmount
                      ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-600/30'
                      : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  ₹{amt.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount Input */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Or Custom:</span>
            <input
              type="number"
              placeholder="Enter amount (e.g. 7500)"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500 font-mono w-44"
            />
          </div>

          {/* QR Code & UPI Details Panel */}
          <div className="p-4 rounded-xl bg-black/50 border border-slate-800 flex flex-col sm:flex-row items-center gap-5">
            
            {/* Simulated UPI QR Code */}
            <div className="p-3 bg-white rounded-xl shadow-lg flex flex-col items-center shrink-0">
              <div className="w-28 h-28 bg-slate-900 rounded-lg flex flex-col items-center justify-center p-2 text-center text-white relative">
                <QrCode className="w-20 h-20 text-emerald-400" />
                <span className="text-[8px] font-mono text-slate-300 mt-1">BHIM UPI PAY</span>
              </div>
              <span className="text-[9px] font-bold text-slate-800 mt-1 font-mono">GPay / PhonePe / Paytm</span>
            </div>

            {/* Official Banking Credentials */}
            <div className="space-y-2 text-xs text-slate-300 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Official UPI ID:</span>
                <button
                  onClick={handleCopyUpi}
                  className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded text-[11px] font-mono flex items-center gap-1 cursor-pointer"
                >
                  {copiedUpi ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedUpi ? 'Copied!' : RELIEF_FUND_CONFIG.upiId}</span>
                </button>
              </div>

              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-slate-400">Account:</span>
                <span className="text-slate-200">{RELIEF_FUND_CONFIG.accountNumber}</span>
              </div>

              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-slate-400">Bank & IFSC:</span>
                <span className="text-slate-200">SBI ({RELIEF_FUND_CONFIG.ifscCode})</span>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[10px] text-amber-300 leading-snug">
                {RELIEF_FUND_CONFIG.taxExemptionText}
              </div>
            </div>

          </div>

          {/* Action Button */}
          <button
            onClick={() => alert(`Redirecting to UPI payment app for ₹${currentDonation}...`)}
            className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-rose-600/30"
          >
            <DollarSign className="w-4 h-4" />
            Proceed to Donate ₹{currentDonation.toLocaleString()} via UPI
          </button>

        </div>

        {/* Right Col: Supply Pledging & Recent Donations (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Supply Pledging Card */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Package className="w-4 h-4 text-sky-400" />
                2. Pledge Essential Relief Supplies
              </span>
              {pledgedSuccess && <span className="text-[10px] font-bold text-emerald-400 animate-pulse">{pledgedSuccess}</span>}
            </div>

            <div className="space-y-2.5">
              {supplies.map((item) => (
                <div key={item.id} className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-200">{item.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${item.color}`}>
                      {item.pledged} / {item.target}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">{item.unit}</div>
                  
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-cyan-500 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (item.pledged / item.target) * 100)}%` }}
                    />
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => handlePledgeSupply(item.id, 25)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-sky-300 rounded text-[10px] font-semibold flex items-center gap-1 transition cursor-pointer"
                    >
                      Pledge +25 Units
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Contributions Feed */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-purple-400" /> Recent Community Aid
              </span>
              <span className="text-[10px] font-mono text-emerald-400">Live Ticker</span>
            </div>

            <div className="space-y-1.5">
              {RECENT_DONATIONS.map((don, i) => (
                <div key={i} className="flex items-center justify-between text-xs bg-black/40 px-2.5 py-1.5 rounded-lg border border-slate-800/80">
                  <div>
                    <span className="font-semibold text-slate-200">{don.donor}</span>
                    <span className="text-[10px] text-slate-500 ml-1.5">({don.state})</span>
                  </div>
                  <div className="font-mono text-right">
                    <span className="text-emerald-400 font-bold">₹{don.amount.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-500 block">{don.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ReliefDeck;
