import React from 'react';
import { Heart, MapPin, Clock, Star, MessageSquare, Tag, ShieldCheck } from 'lucide-react';
import { AvailabilityBadge, VerifiedBadge, ConditionBadge } from '../common/Badge';
import { useApp } from '../../context/AppContext';

export default function ListingCard({ listing, onSelect }) {
  const { savedItems, toggleSaveItem, setOfferModalListing, setChatListing } = useApp();
  const isSaved = savedItems.includes(listing.id);

  return (
    <div 
      onClick={() => onSelect && onSelect(listing)}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden text-left cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
          loading="lazy"
        />

        {/* Badges on Top */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 items-center z-10">
          <AvailabilityBadge status={listing.availability} />
          {listing.isGiveaway && (
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-600 text-white shadow-xs">
              FREE
            </span>
          )}
          {listing.isRent && (
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-600 text-white shadow-xs">
              RENT
            </span>
          )}
        </div>

        {/* Save to Wishlist Heart */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleSaveItem(listing.id);
          }}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md transition cursor-pointer z-10 ${
            isSaved 
              ? 'bg-rose-50 text-rose-600 shadow-sm' 
              : 'bg-slate-900/40 text-white hover:bg-slate-900/60'
          }`}
          aria-label={isSaved ? 'Remove from saved' : 'Save item'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Condition tag on bottom overlay */}
        <div className="absolute bottom-2 left-2.5 z-10">
          <ConditionBadge condition={listing.condition} />
        </div>
      </div>

      {/* Card Details */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category & Freshness */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
            <span className="font-medium text-blue-700 bg-blue-50 px-2 py-0.2 rounded">
              {listing.category}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              {listing.postedTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-900 transition-colors">
            {listing.title}
          </h3>

          {/* Price */}
          <div className="mt-2 flex items-baseline gap-2">
            {listing.isGiveaway ? (
              <span className="text-base font-extrabold text-emerald-600">
                ₹0 / Free Give Away
              </span>
            ) : listing.isRent ? (
              <div className="flex items-baseline gap-1">
                <span className="text-base font-extrabold text-slate-900">
                  ₹{listing.price}
                </span>
                <span className="text-xs text-slate-500">/ day</span>
              </div>
            ) : (
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-extrabold text-slate-900">
                  ₹{listing.price}
                </span>
                {listing.originalRetailPrice > listing.price && (
                  <span className="text-xs text-slate-400 line-through">
                    ₹{listing.originalRetailPrice}
                  </span>
                )}
                {listing.negotiable && (
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded">
                    Negotiable
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Location & Seller Footer */}
        <div className="pt-2 border-t border-slate-100 flex flex-col gap-1.5">
          <div className="flex items-center gap-1 text-[11px] text-slate-500 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{listing.pickupLocation}</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center">
                {listing.seller.name.charAt(0)}
              </div>
              <span className="text-xs font-semibold text-slate-700 truncate max-w-[100px]">
                {listing.seller.name.split(' ')[0]}
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" title="Campus Verified" aria-label="Campus Verified" />
              <span className="sr-only">Campus Verified</span>
            </div>

            <div className="flex items-center gap-1 text-xs font-semibold text-slate-700">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>{listing.seller.rating}</span>
              <span className="text-slate-400 text-[10px]">({listing.seller.completedDeals})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
