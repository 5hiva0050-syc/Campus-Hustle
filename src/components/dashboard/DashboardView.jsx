import React, { useState } from 'react';
import { 
  User, Package, ShoppingCart, Car, Utensils, Heart, Bell, 
  Search, ShieldCheck, Star, Clock, CheckCircle2, RefreshCw, 
  Trash2, ExternalLink, PlusCircle, AlertCircle 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AvailabilityBadge, VerifiedBadge } from '../common/Badge';

export default function DashboardView() {
  const { 
    user, 
    listings, 
    deals, 
    foodOrders, 
    activeRide, 
    savedItems, 
    savedSearches, 
    toggleSaveItem,
    removeSavedSearch,
    updateListingAvailability,
    deleteListing,
    refreshListing,
    setDealSummaryModal,
    setQuickSellOpen,
    setVerifyModalOpen,
    setSelectedListing,
    setActiveTab,
    showToast
  } = useApp();

  const [activeTab, setActiveDashboardTab] = useState('listings');

  // Filter listings owned by this user
  const myListings = listings.filter(l => l.seller.id === user.id || l.seller.name === user.name);
  const myDeals = deals.filter(d => d.buyerId === user.id || d.sellerId === user.id);
  const savedListingObjects = listings.filter(l => savedItems.includes(l.id));

  return (
    <div className="space-y-6">
      {/* User Trust Profile Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-blue-500/30 shadow-md"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  {user.name}
                </h2>
                <VerifiedBadge type={user.verificationBadge} size="md" />
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                {user.department} • {user.year}
              </p>
              <p className="text-xs text-slate-400">
                {user.hostel} • Member since {user.memberSince}
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80 text-center">
            <div>
              <span className="text-[11px] text-slate-400 block">Deals Completed</span>
              <span className="text-base sm:text-lg font-extrabold text-white">{user.dealsCompleted}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Trust Rating</span>
              <span className="text-base sm:text-lg font-extrabold text-amber-400 flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-amber-400" />
                {user.rating}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Active Listings</span>
              <span className="text-base sm:text-lg font-extrabold text-blue-400">{myListings.length}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Saved Wishlist</span>
              <span className="text-base sm:text-lg font-extrabold text-rose-400">{savedItems.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
        {[
          { id: 'listings', label: `My Listings (${myListings.length})`, icon: Package },
          { id: 'deals', label: `My Deals & Purchases (${myDeals.length})`, icon: ShoppingCart },
          { id: 'orders', label: `Food & Canteen (${foodOrders.length})`, icon: Utensils },
          { id: 'saved', label: `Saved Items (${savedItems.length})`, icon: Heart },
          { id: 'searches', label: `Saved Searches (${savedSearches.length})`, icon: Search },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveDashboardTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: My Listings */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm sm:text-base text-slate-900">
              Manage Your Campus Listings
            </h3>
            <button
              onClick={() => setQuickSellOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-blue-900 text-white text-xs font-bold transition hover:bg-blue-800 flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ Quick Sell New Item</span>
            </button>
          </div>

          {myListings.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <Package className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-800">No active listings posted yet</p>
              <p className="text-xs text-slate-500">Post books, calculators, or hostel gear in 60 seconds.</p>
              <button
                onClick={() => setQuickSellOpen(true)}
                className="px-4 py-2 rounded-xl bg-blue-900 text-white text-xs font-bold cursor-pointer"
              >
                Create First Listing
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myListings.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-bold text-sm text-slate-900 truncate">
                          {item.title}
                        </h4>
                        <AvailabilityBadge status={item.availability} />
                      </div>
                      <p className="text-xs font-extrabold text-slate-900 mt-1">
                        ₹{item.price}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        Pickup: {item.pickupLocation}
                      </p>
                    </div>
                  </div>

                  {/* Seller Controls */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5">
                      <select
                        value={item.availability}
                        onChange={(e) => updateListingAvailability(item.id, e.target.value)}
                        className="px-2 py-1 rounded-lg border border-slate-300 text-xs font-medium bg-slate-50 cursor-pointer"
                      >
                        <option value="AVAILABLE">Mark Available</option>
                        <option value="NEGOTIATING">Mark Negotiating</option>
                        <option value="RESERVED">Mark Reserved</option>
                        <option value="SOLD">Mark SOLD</option>
                        <option value="CLOSED">Mark Closed</option>
                      </select>

                      <button
                        onClick={() => refreshListing(item.id)}
                        title="Bump to top of campus feed"
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => deleteListing(item.id)}
                      className="text-xs text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Deals & Transactions */}
      {activeTab === 'deals' && (
        <div className="space-y-4">
          <h3 className="font-bold text-sm sm:text-base text-slate-900">
            Locked Deals & Transaction Ledger
          </h3>

          <div className="space-y-3">
            {myDeals.map((deal) => (
              <div
                key={deal.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">
                      {deal.listingTitle}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                      {deal.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Seller: {deal.sellerName} • Buyer: {deal.buyerName}
                  </p>
                  <p className="text-xs font-semibold text-emerald-600">
                    Agreed Final Price: ₹{deal.agreedPrice}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDealSummaryModal(deal)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer"
                  >
                    View Deal Summary
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Food Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h3 className="font-bold text-sm sm:text-base text-slate-900">
            Canteen & Meal Pre-Orders
          </h3>

          <div className="space-y-3">
            {foodOrders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900">{ord.item}</h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {ord.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Stall: {ord.provider} • Pickup: {ord.pickupLocation}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-extrabold text-emerald-600">₹{ord.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Saved Wishlist */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          <h3 className="font-bold text-sm sm:text-base text-slate-900">
            Saved Campus Items ({savedListingObjects.length})
          </h3>

          {savedListingObjects.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <Heart className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-xs text-slate-500">Your saved wishlist is empty.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {savedListingObjects.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs flex items-center justify-between gap-3"
                >
                  <img
                    src={item.images[0]}
                    alt=""
                    className="w-14 h-14 rounded-xl object-cover shrink-0 cursor-pointer"
                    onClick={() => setSelectedListing(item)}
                  />
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setSelectedListing(item)}>
                    <h4 className="font-bold text-xs text-slate-900 truncate">{item.title}</h4>
                    <p className="font-extrabold text-xs text-slate-900">₹{item.price}</p>
                    <span className="text-[10px] text-slate-400">{item.pickupLocation.split(' (')[0]}</span>
                  </div>
                  <button
                    onClick={() => toggleSaveItem(item.id)}
                    className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Saved Searches */}
      {activeTab === 'searches' && (
        <div className="space-y-4">
          <h3 className="font-bold text-sm sm:text-base text-slate-900">
            Instant Match Alerts & Saved Searches
          </h3>
          <p className="text-xs text-slate-500">
            Get pinged immediately when junior students post items matching your study or hostel requirements:
          </p>

          <div className="space-y-2">
            {savedSearches.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-xs flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
                    <Search className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">"{s.query}"</h4>
                    <span className="text-[10px] text-slate-400">Category: {s.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {s.count} New Matches
                  </span>
                  <button
                    onClick={() => removeSavedSearch(s.id)}
                    className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
