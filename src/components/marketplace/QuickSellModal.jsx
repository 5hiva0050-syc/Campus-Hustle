import React, { useState } from 'react';
import { Camera, Image, Sparkles, MapPin, Tag, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';
import Modal from '../common/Modal';
import { CAMPUS_LOCATIONS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export default function QuickSellModal() {
  const { quickSellOpen, setQuickSellOpen, createListing, setSelectedListing } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Marketplace');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('Gently Used');
  const [pickupLocation, setPickupLocation] = useState('Central Library (Ground Floor Lobby)');
  const [description, setDescription] = useState('');
  const [negotiable, setNegotiable] = useState(true);
  const [selectedPhotoPreset, setSelectedPhotoPreset] = useState(0);
  const [customPhotoUrl, setCustomPhotoUrl] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  if (!quickSellOpen) return null;

  // Curated high quality campus sample photo presets for instant 1-click posting
  const photoPresets = [
    { label: 'Calculator', url: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80' },
    { label: 'Textbook / Notes', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80' },
    { label: 'Desk Lamp', url: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&w=800&q=80' },
    { label: 'Mouse / Tech', url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80' },
    { label: 'Backpack', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80' },
    { label: 'Hostel Chair', url: 'https://images.unsplash.com/photo-1580481077195-c3a821a58875?auto=format&fit=crop&w=800&q=80' },
  ];

  const currentPhoto = customPhotoUrl.trim() || photoPresets[selectedPhotoPreset].url;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || price === '') return;

    const newListing = createListing({
      title,
      category,
      price: Number(price),
      condition,
      pickupLocation,
      description: description || `Verified student listing for ${title}. Available for inspection and safe pickup at ${pickupLocation}.`,
      negotiable,
      images: [currentPhoto],
    });

    setQuickSellOpen(false);
    // Reset fields
    setTitle('');
    setPrice('');
    setDescription('');
    setShowPreview(false);
  };

  return (
    <Modal
      isOpen={quickSellOpen}
      onClose={() => setQuickSellOpen(false)}
      title="Quick Sell — Post in 60 Seconds"
      subtitle="As fast as a WhatsApp message, but organized, verified, and structured"
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Toggle between Form and Live Preview */}
        <div className="flex items-center justify-between bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setShowPreview(false)}
            className={`flex-1 py-1.5 rounded-lg transition cursor-pointer ${
              !showPreview ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Edit Listing Form
          </button>
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className={`flex-1 py-1.5 rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
              showPreview ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Live Preview Card
          </button>
        </div>

        {!showPreview ? (
          <div className="space-y-4">
            {/* Photo Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Product Photo (Choose instant preset or paste image URL)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
                {photoPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedPhotoPreset(idx);
                      setCustomPhotoUrl('');
                    }}
                    className={`relative rounded-xl overflow-hidden aspect-square border-2 transition cursor-pointer group ${
                      selectedPhotoPreset === idx && !customPhotoUrl
                        ? 'border-blue-600 ring-2 ring-blue-300'
                        : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-slate-900/80 text-[10px] text-white py-0.5 truncate text-center">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>
              <input
                type="url"
                value={customPhotoUrl}
                onChange={(e) => setCustomPhotoUrl(e.target.value)}
                placeholder="Or paste external image URL..."
                className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Title & Price */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label htmlFor="quick-sell-title" className="block text-xs font-semibold text-slate-700 mb-1">
                  Product Name / Title *
                </label>
                <input
                  id="quick-sell-title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Casio fx-991EX Scientific Calculator"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 650 (0 for Free)"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-bold"
                />
              </div>
            </div>

            {/* Category & Condition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Technical Accessories">Technical Accessories</option>
                  <option value="Study Materials">Study Materials / Books</option>
                  <option value="Marketplace">Marketplace & Hostel Items</option>
                  <option value="Study & Campus Accessories">Study & Campus Accessories</option>
                  <option value="Give Away">Give Away (₹0 Free)</option>
                  <option value="Rent / Borrow">Rent / Borrow</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Condition
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Brand New">Brand New (Unopened)</option>
                  <option value="Like New">Like New (Mint Condition)</option>
                  <option value="Gently Used">Gently Used</option>
                  <option value="Fair">Fair / Functional</option>
                </select>
              </div>
            </div>

            {/* Safe Pickup Location */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Designated Safe Campus Pickup Location
              </label>
              <select
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {CAMPUS_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Short Notes (Semester used, accessories included)
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Used for 2 semesters, fresh battery, includes cover."
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Negotiable Toggle */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="negotiable"
                checked={negotiable}
                onChange={(e) => setNegotiable(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="negotiable" className="text-xs text-slate-700 font-medium cursor-pointer">
                Open to reasonable student offers & bargaining
              </label>
            </div>
          </div>
        ) : (
          /* Live Card Preview */
          <div className="py-2">
            <p className="text-xs text-slate-500 mb-3 text-center">
              This is how your verified card will appear in the campus marketplace:
            </p>
            <div className="max-w-xs mx-auto bg-white rounded-2xl border border-slate-300 shadow-md overflow-hidden">
              <div className="relative aspect-4/3 bg-slate-100">
                <img src={currentPhoto} alt="Preview" className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Available
                </span>
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] bg-slate-900/80 text-white">
                  {condition}
                </span>
              </div>
              <div className="p-3.5 space-y-2">
                <span className="text-[10px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded">
                  {category}
                </span>
                <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{title || 'Product Title'}</h4>
                <div className="text-base font-extrabold text-slate-900">
                  {price === '0' || price === 0 ? '₹0 / Free' : `₹${price || '0'}`}
                </div>
                <div className="text-[11px] text-slate-500 flex items-center gap-1 truncate pt-1 border-t border-slate-100">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{pickupLocation}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setQuickSellOpen(false)}
            className="w-1/3 py-2.5 px-3 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-2/3 py-2.5 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm transition shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-blue-300" />
            <span>Publish to Campus Instantly</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
