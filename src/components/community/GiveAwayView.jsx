import React from 'react';
import { Gift, Heart, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ListingCard from '../marketplace/ListingCard';

export default function GiveAwayView() {
  const { listings, setSelectedListing, setQuickSellOpen } = useApp();

  const freeItems = listings.filter(item => item.price === 0 || item.isGiveaway || item.category === 'Give Away');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg border border-emerald-900">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Gift className="w-4 h-4 text-emerald-400" />
            Zero-Rupee Campus Sharing
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Give Away — ₹0 / 100% Free
          </h2>
          <p className="text-sm text-emerald-200/90 leading-relaxed">
            Pass on lab manuals, spare hostel hangers, previous semester notes, and items you no longer need. Strengthen campus solidarity without commercial clutter.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setQuickSellOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-sm cursor-pointer"
            >
              + List a Free Item
            </button>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-10 translate-y-10">
          <Gift className="w-80 h-80 text-white" />
        </div>
      </div>

      {/* Grid of Free Items */}
      {freeItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <Gift className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No free items currently listed</h3>
          <p className="text-xs text-slate-500 mt-1">Be the first student to pass on notes or hostel items!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {freeItems.map((item) => (
            <ListingCard
              key={item.id}
              listing={item}
              onSelect={setSelectedListing}
            />
          ))}
        </div>
      )}
    </div>
  );
}
