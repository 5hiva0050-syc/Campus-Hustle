import React, { useState } from 'react';
import { Tag, ShieldCheck, ArrowRight, MessageSquare, AlertCircle } from 'lucide-react';
import Modal from '../common/Modal';
import { useApp } from '../../context/AppContext';

export default function MakeOfferModal() {
  const { offerModalListing, setOfferModalListing, makeOffer, setChatListing } = useApp();
  const [offerAmount, setOfferAmount] = useState('');
  const [note, setNote] = useState('');

  if (!offerModalListing) return null;

  const originalPrice = offerModalListing.price;

  // Preset quick offers
  const quickDiscounts = [
    { label: '-10%', val: Math.round(originalPrice * 0.9) },
    { label: '-15%', val: Math.round(originalPrice * 0.85) },
    { label: '-20%', val: Math.round(originalPrice * 0.8) },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = Number(offerAmount);
    if (!amount || amount <= 0) return;

    makeOffer(offerModalListing, amount, note);
    setOfferModalListing(null);
    setChatListing(offerModalListing);
  };

  return (
    <Modal
      isOpen={!!offerModalListing}
      onClose={() => setOfferModalListing(null)}
      title="Make a Structured Offer"
      subtitle={`Submitting formal offer for "${offerModalListing.title}"`}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Price Context */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">Listed Asking Price</span>
            <p className="text-2xl font-extrabold text-slate-900">₹{originalPrice}</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-500 font-medium">Seller</span>
            <p className="text-xs font-bold text-slate-800">{offerModalListing.seller.name}</p>
            <span className="text-[10px] text-emerald-600 font-semibold">Campus Verified ✓</span>
          </div>
        </div>

        {/* Quick Offer Presets */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Quick Fair Bargaining Presets
          </label>
          <div className="grid grid-cols-3 gap-2">
            {quickDiscounts.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setOfferAmount(preset.val.toString())}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                  offerAmount === preset.val.toString()
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <span>₹{preset.val}</span>
                <span className="text-[10px] text-slate-400 block">{preset.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Offer Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Your Offer Amount (₹) *
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-2.5 text-slate-500 font-bold text-base">₹</span>
            <input
              type="number"
              required
              min="1"
              max={originalPrice * 2}
              value={offerAmount}
              onChange={(e) => setOfferAmount(e.target.value)}
              placeholder="e.g. 600"
              className="w-full pl-8 pr-4 py-2.5 text-base font-bold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Note / Meetup message */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Message to Seller (Optional)
          </label>
          <textarea
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Can pick up today at Central Library lobby."
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="p-3 rounded-xl bg-blue-50 text-[11px] text-blue-900 border border-blue-200/80 leading-relaxed">
          <strong>How Campus Hustle offers work:</strong> The seller will be notified instantly and can Accept, Decline, or Counter-Offer directly in your private deal thread.
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={() => setOfferModalListing(null)}
            className="w-1/3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-2/3 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs transition shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Tag className="w-3.5 h-3.5 text-blue-300" />
            <span>Submit Formal Offer (₹{offerAmount || '...'})</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
