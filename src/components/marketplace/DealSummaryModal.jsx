import React from 'react';
import { 
  CheckCircle2, ShieldCheck, MapPin, Calendar, User, 
  ExternalLink, ArrowRight, Clock, Award, AlertCircle 
} from 'lucide-react';
import Modal from '../common/Modal';
import { useApp } from '../../context/AppContext';

export default function DealSummaryModal() {
  const { 
    dealSummaryModal, 
    setDealSummaryModal, 
    completeDeal, 
    cancelDeal,
    setWhatsAppModalData,
    showToast 
  } = useApp();

  if (!dealSummaryModal) return null;

  const deal = dealSummaryModal;
  const isAgreed = deal.status === 'DEAL_AGREED';
  const isCompleted = deal.status === 'COMPLETED';

  const handleMarkCompleted = () => {
    completeDeal(deal.id);
    setDealSummaryModal(null);
  };

  const handleBridgeWhatsApp = () => {
    setWhatsAppModalData({
      deal,
    });
  };

  return (
    <Modal
      isOpen={!!dealSummaryModal}
      onClose={() => setDealSummaryModal(null)}
      title="Verified Campus Deal Summary"
      subtitle="Digital proof of agreed terms, participants, and safe meetup location"
      maxWidth="max-w-xl"
    >
      <div className="space-y-4">
        {/* Deal Header Banner */}
        <div className={`p-4 rounded-2xl border flex items-center justify-between ${
          isCompleted 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
            : 'bg-blue-50 border-blue-200 text-blue-900'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
              isCompleted ? 'bg-emerald-600 text-white' : 'bg-blue-900 text-white'
            }`}>
              ✓
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider block">
                Official Transaction Record
              </span>
              <h4 className="font-extrabold text-base">
                {isCompleted ? 'Transaction Finalized' : 'Deal Locked & Agreed'}
              </h4>
            </div>
          </div>

          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
            isCompleted 
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
              : 'bg-blue-100 text-blue-800 border border-blue-300'
          }`}>
            {deal.status.replace('_', ' ')}
          </span>
        </div>

        {/* Structured Terms Breakdown */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-3.5 text-xs sm:text-sm">
          <div className="flex justify-between items-start border-b border-slate-200/80 pb-2.5">
            <span className="text-slate-500 font-medium">Item Name</span>
            <span className="font-bold text-slate-900 text-right max-w-[240px] truncate">
              {deal.listingTitle}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 border-b border-slate-200/80 pb-2.5">
            <div>
              <span className="text-slate-500 font-medium text-xs block">Seller</span>
              <span className="font-bold text-slate-800">{deal.sellerName}</span>
              <span className="text-[10px] text-blue-700 font-semibold block">Campus Verified ✓</span>
            </div>
            <div>
              <span className="text-slate-500 font-medium text-xs block">Buyer</span>
              <span className="font-bold text-slate-800">{deal.buyerName}</span>
              <span className="text-[10px] text-blue-700 font-semibold block">Campus Verified ✓</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 border-b border-slate-200/80 pb-2.5">
            <div>
              <span className="text-slate-500 font-medium text-xs block">Listed Asking Price</span>
              <span className="text-slate-500 line-through font-semibold">₹{deal.originalPrice}</span>
            </div>
            <div>
              <span className="text-slate-500 font-medium text-xs block">Agreed Final Deal Price</span>
              <span className="text-xl font-extrabold text-emerald-600">₹{deal.agreedPrice}</span>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <span className="text-slate-500 font-medium">Safe Meetup Point</span>
            <div className="text-right">
              <span className="font-bold text-slate-900 flex items-center gap-1 justify-end">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                {deal.pickupLocation}
              </span>
              <span className="text-[11px] text-slate-500">Public CCTV-monitored campus area</span>
            </div>
          </div>
        </div>

        {/* Why this stops WhatsApp chaos */}
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed">
          <strong>Transparency Guarantee:</strong> Neither buyer nor seller has to guess availability or renegotiate on arrival. Price and location are immutable in this summary.
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          {isAgreed && (
            <button
              type="button"
              onClick={handleMarkCompleted}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Physical Exchange & Mark Deal Completed</span>
            </button>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleBridgeWhatsApp}
              className="flex-1 py-2 px-3 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Send Summary via WhatsApp Bridge</span>
            </button>

            {isAgreed && (
              <button
                type="button"
                onClick={() => {
                  cancelDeal(deal.id);
                  setDealSummaryModal(null);
                }}
                className="py-2 px-3 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-medium cursor-pointer"
              >
                Cancel Deal
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
