import React from 'react';
import { RefreshCw, Clock, ShieldCheck, Tag, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ListingCard from '../marketplace/ListingCard';

export default function RentBorrowView() {
  const { listings, setSelectedListing, setQuickSellOpen } = useApp();

  const rentalItems = listings.filter(item => item.isRent || item.category === 'Rent / Borrow');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg border border-slate-800">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <RefreshCw className="w-4 h-4 text-emerald-400" />
            Temporary Campus Equipment & Gear
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Rent & Borrow — Daily Flexible Rates
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Why buy when you only need it for one exam or weekend project? Rent scientific calculators, projectors, and bicycles directly from verified campus peers.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setQuickSellOpen(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-sm cursor-pointer"
            >
              + List an Item for Rent
            </button>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-10 translate-y-10">
          <RefreshCw className="w-80 h-80 text-white" />
        </div>
      </div>

      {/* Safety Notice */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex items-start gap-3 text-xs text-blue-900">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Security Protocol:</strong> Student ID verification is verified upon physical handover. All rentals must be returned in the original condition agreed at pickup.
        </p>
      </div>

      {/* Grid of Rental Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {rentalItems.map((item) => (
          <ListingCard
            key={item.id}
            listing={item}
            onSelect={setSelectedListing}
          />
        ))}
      </div>
    </div>
  );
}
