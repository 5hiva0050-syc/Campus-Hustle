import React, { useState } from 'react';
import { 
  Heart, MapPin, Clock, Star, MessageSquare, Tag, ShieldCheck, 
  ExternalLink, Flag, AlertTriangle, ArrowRight, Share2, CheckCircle2 
} from 'lucide-react';
import Modal from '../common/Modal';
import { AvailabilityBadge, VerifiedBadge, ConditionBadge } from '../common/Badge';
import { useApp } from '../../context/AppContext';

export default function ListingDetailsModal() {
  const { 
    selectedListing, 
    setSelectedListing, 
    savedItems, 
    toggleSaveItem,
    setOfferModalListing,
    setChatListing,
    setWhatsAppModalData,
    submitReport,
    showToast
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('Misleading Condition');
  const [reportDetails, setReportDetails] = useState('');

  if (!selectedListing) return null;

  const isSaved = savedItems.includes(selectedListing.id);
  const seller = selectedListing.seller;

  const handleReportSubmit = (e) => {
    e.preventDefault();
    submitReport({
      listingId: selectedListing.id,
      reason: reportReason,
      details: reportDetails || 'Reported by campus user.'
    });
    setReportModalOpen(false);
    setReportDetails('');
  };

  const handleMakeOffer = () => {
    setOfferModalListing(selectedListing);
  };

  const handleOpenChat = () => {
    setChatListing(selectedListing);
  };

  const handleWhatsAppBridge = () => {
    setWhatsAppModalData({
      listing: selectedListing,
      seller: selectedListing.seller,
    });
  };

  return (
    <>
      <Modal
        isOpen={!!selectedListing}
        onClose={() => setSelectedListing(null)}
        title={selectedListing.title}
        subtitle={`${selectedListing.category} • ${selectedListing.pickupLocation}`}
        maxWidth="max-w-4xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Image Gallery & Tags (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
              <img
                src={selectedListing.images[activeImageIndex] || selectedListing.images[0]}
                alt={selectedListing.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <AvailabilityBadge status={selectedListing.availability} />
                <ConditionBadge condition={selectedListing.condition} />
              </div>
            </div>

            {/* Thumbnail switcher if multiple images */}
            {selectedListing.images.length > 1 && (
              <div className="flex gap-2">
                {selectedListing.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                      activeImageIndex === idx ? 'border-blue-600 scale-105' : 'border-slate-200 opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Item Description & Verification Notes
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                {selectedListing.description}
              </p>
            </div>

            {/* Meetup Safety Notice */}
            <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200/80 text-xs text-blue-900 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Designated Campus Safe Pickup Point:</p>
                <p className="text-blue-800">{selectedListing.pickupLocation}</p>
                <p className="text-[11px] text-blue-600 mt-0.5">
                  Public, well-lit campus area with CCTV and active security. Never transact in private unmonitored rooms.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing, Seller Trust, Actions (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              {/* Price card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Price</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedListing.postedTime}
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  {selectedListing.isGiveaway ? (
                    <span className="text-2xl font-extrabold text-emerald-600">
                      ₹0 / Free
                    </span>
                  ) : (
                    <>
                      <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        ₹{selectedListing.price}
                      </span>
                      {selectedListing.isRent && (
                        <span className="text-sm text-slate-500 font-medium">/ day</span>
                      )}
                      {selectedListing.originalRetailPrice > selectedListing.price && (
                        <span className="text-sm text-slate-400 line-through">
                          ₹{selectedListing.originalRetailPrice}
                        </span>
                      )}
                    </>
                  )}
                </div>

                {selectedListing.negotiable && !selectedListing.isGiveaway && (
                  <p className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Seller is open to fair student offers
                  </p>
                )}
              </div>

              {/* Seller Trust Profile Card */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Why Trust This Seller?
                  </span>
                  <VerifiedBadge type={seller.verificationBadge} size="sm" />
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-blue-900 text-white font-bold text-sm flex items-center justify-center">
                    {seller.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-slate-900">{seller.name}</h5>
                    <p className="text-xs text-slate-500">{seller.department}</p>
                  </div>
                </div>

                {/* Seller Metrics */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{seller.rating} / 5.0</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{seller.reviewCount} verified reviews</span>
                  </div>

                  <div className="bg-slate-50 p-2 rounded-lg">
                    <span className="font-bold text-slate-900 block">{seller.completedDeals} Deals</span>
                    <span className="text-[10px] text-slate-500">100% Completed</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                  <span>Member since {seller.memberSince}</span>
                  <span className="text-emerald-700 font-semibold">{seller.responseRate}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleMakeOffer}
                  disabled={selectedListing.availability === 'SOLD'}
                  className="flex-1 py-3 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 disabled:bg-slate-300 text-white font-bold text-sm transition shadow-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  <Tag className="w-4 h-4 text-blue-300" />
                  <span>Make Offer</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenChat}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition shadow-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-slate-300" />
                  <span>Chat on Campus</span>
                </button>
              </div>

              {/* Optional WhatsApp Bridge Button */}
              <button
                type="button"
                onClick={handleWhatsAppBridge}
                className="w-full py-2.5 px-4 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Continue on WhatsApp (Structured Ticket)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
                <button
                  onClick={() => toggleSaveItem(selectedListing.id)}
                  className="flex items-center gap-1.5 hover:text-slate-900 cursor-pointer"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{isSaved ? 'Saved in Wishlist' : 'Save Item'}</span>
                </button>

                <button
                  onClick={() => setReportModalOpen(true)}
                  className="flex items-center gap-1 hover:text-red-600 text-slate-400 cursor-pointer"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Safety Report Modal */}
      {reportModalOpen && (
        <Modal
          isOpen={reportModalOpen}
          onClose={() => setReportModalOpen(false)}
          title="Report Listing to Campus Moderators"
          subtitle={`Reporting "${selectedListing.title}"`}
          maxWidth="max-w-md"
        >
          <form onSubmit={handleReportSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Reason for report
              </label>
              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="Misleading Condition">Misleading Condition or Price</option>
                <option value="Prohibited Item">Prohibited Item (Policy Violation)</option>
                <option value="Duplicate or Spam">Duplicate or Spam Listing</option>
                <option value="Suspected Fake / Scam">Suspected Fake / Scammer</option>
                <option value="Harassment or Inappropriate">Harassment or Inappropriate</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Details or evidence for moderators
              </label>
              <textarea
                rows={3}
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
                placeholder="Explain what is inaccurate or suspicious..."
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setReportModalOpen(false)}
                className="w-1/3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-2/3 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition cursor-pointer"
              >
                Submit Report
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
