import React, { useState, useMemo } from 'react';
import { 
  Search, SlidersHorizontal, Tag, MapPin, X, ArrowUpDown, 
  PlusCircle, Sparkles, AlertCircle, Heart, Bell 
} from 'lucide-react';
import ListingCard from './ListingCard';
import { useApp } from '../../context/AppContext';
import { CAMPUS_LOCATIONS } from '../../data/mockData';

export default function MarketplaceView() {
  const { 
    listings, 
    setSelectedListing, 
    setQuickSellOpen, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    addSavedSearch,
    showToast 
  } = useApp();

  const [priceFilter, setPriceFilter] = useState('All'); // All, under300, under700, 700plus
  const [conditionFilter, setConditionFilter] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // newest, priceAsc, priceDesc, relevant
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const categories = [
    'All',
    'Technical Accessories',
    'Study Materials',
    'Marketplace',
    'Study & Campus Accessories',
    'Give Away',
    'Rent / Borrow'
  ];

  // Filtering and sorting logic
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // Hidden by admin
      if (item.isHiddenByAdmin) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description?.toLowerCase().includes(q);
        const matchTag = item.tags?.some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchTag) return false;
      }

      // Category
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Condition
      if (conditionFilter !== 'All' && item.condition !== conditionFilter) {
        return false;
      }

      // Availability
      if (availabilityFilter !== 'All' && item.availability !== availabilityFilter) {
        return false;
      }

      // Location
      if (locationFilter !== 'All' && item.pickupLocation !== locationFilter) {
        return false;
      }

      // Price
      if (priceFilter === 'under300' && item.price > 300) return false;
      if (priceFilter === 'under700' && item.price > 700) return false;
      if (priceFilter === '700plus' && item.price <= 700) return false;
      if (priceFilter === 'free' && item.price > 0) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return (b.timestamp || 0) - (a.timestamp || 0);
      if (sortBy === 'priceAsc') return a.price - b.price;
      if (sortBy === 'priceDesc') return b.price - a.price;
      if (sortBy === 'rating') return (b.seller.rating || 0) - (a.seller.rating || 0);
      return 0;
    });
  }, [listings, searchQuery, selectedCategory, conditionFilter, availabilityFilter, locationFilter, priceFilter, sortBy]);

  const handleSaveCurrentSearch = () => {
    if (!searchQuery) {
      showToast('Enter a search keyword first to save an alert');
      return;
    }
    addSavedSearch(searchQuery, selectedCategory);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPriceFilter('All');
    setConditionFilter('All');
    setAvailabilityFilter('All');
    setLocationFilter('All');
    setSortBy('newest');
  };

  const hasActiveFilters = 
    searchQuery || 
    selectedCategory !== 'All' || 
    priceFilter !== 'All' || 
    conditionFilter !== 'All' || 
    availabilityFilter !== 'All' || 
    locationFilter !== 'All';

  return (
    <div className="space-y-6">
      {/* Top Search & Action Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, calculators, electronics, lamps, notes..."
              className="w-full pl-10 pr-10 py-2.5 text-sm rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Save Search Alert */}
          {searchQuery && (
            <button
              onClick={handleSaveCurrentSearch}
              className="px-3.5 py-2.5 rounded-2xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5"
            >
              <Bell className="w-4 h-4 text-blue-600" />
              <span>Save Search Alert</span>
            </button>
          )}

          {/* Quick Sell CTA Button */}
          <button
            onClick={() => setQuickSellOpen(true)}
            className="w-full md:w-auto px-5 py-2.5 rounded-2xl bg-blue-900 hover:bg-blue-800 text-white text-xs sm:text-sm font-bold whitespace-nowrap transition shadow-sm cursor-pointer flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4 text-blue-300" />
            <span>Post Listing</span>
          </button>
        </div>

        {/* Category Pills Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Filter & Sort Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100/80 p-3 rounded-2xl border border-slate-200 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Price Selector */}
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 font-semibold text-slate-700 cursor-pointer"
          >
            <option value="All">All Prices</option>
            <option value="free">₹0 / Free Only</option>
            <option value="under300">Under ₹300</option>
            <option value="under700">Under ₹700</option>
            <option value="700plus">₹700 & Above</option>
          </select>

          {/* Condition Selector */}
          <select
            value={conditionFilter}
            onChange={(e) => setConditionFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 font-semibold text-slate-700 cursor-pointer"
          >
            <option value="All">All Conditions</option>
            <option value="Brand New">Brand New</option>
            <option value="Like New">Like New</option>
            <option value="Gently Used">Gently Used</option>
            <option value="Fair">Fair</option>
          </select>

          {/* Availability Selector */}
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 font-semibold text-slate-700 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="AVAILABLE">Available</option>
            <option value="NEGOTIATING">Negotiating</option>
            <option value="RESERVED">Reserved</option>
            <option value="SOLD">Sold</option>
          </select>

          {/* Location Selector */}
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 font-semibold text-slate-700 cursor-pointer max-w-[150px] truncate"
          >
            <option value="All">All Locations</option>
            {CAMPUS_LOCATIONS.map(l => (
              <option key={l.id} value={l.name}>{l.name.split(' (')[0]}</option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-rose-600 hover:underline font-semibold ml-1 cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium hidden sm:inline">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 font-bold text-slate-800 cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="rating">Top Rated Seller</option>
          </select>
        </div>
      </div>

      {/* Listings Count & Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Showing <strong>{filteredListings.length}</strong> verified campus items</span>
          <span>Verified Student Marketplace</span>
        </div>

        {filteredListings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <Search className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">
              No matching campus listings found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your keyword, resetting filters, or be the first verified student to post this item.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredListings.map((item) => (
              <ListingCard
                key={item.id}
                listing={item}
                onSelect={setSelectedListing}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
