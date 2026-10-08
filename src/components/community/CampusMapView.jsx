import React, { useState } from 'react';
import { 
  MapPin, Compass, ShieldCheck, Car, Utensils, Wrench, 
  Clock, CheckCircle2, ChevronRight, Layers 
} from 'lucide-react';
import { CAMPUS_LOCATIONS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export default function CampusMapView() {
  const { setActiveTab } = useApp();
  const [selectedLocation, setSelectedLocation] = useState(CAMPUS_LOCATIONS[0]);
  const [filterType, setFilterType] = useState('All');

  const filterTypes = ['All', 'Academic', 'Hostel', 'Dining', 'Library', 'Recreation', 'Entrance'];

  const filteredLocations = filterType === 'All'
    ? CAMPUS_LOCATIONS
    : CAMPUS_LOCATIONS.filter(l => l.type.toLowerCase() === filterType.toLowerCase());

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg border border-slate-800">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <Compass className="w-4 h-4 text-emerald-400" />
            Approved Safe Hubs & Transit Nodes
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Official Campus Ecosystem Map
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Every transaction, peer ride, and canteen pre-order on Campus Hustle happens at an approved, monitored campus node. Explore verified zones below.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-10 translate-y-10">
          <Compass className="w-80 h-80 text-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Map Canvas (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              Interactive Campus Architecture
            </h3>

            {/* Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto">
              {filterTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    filterType === t
                      ? 'bg-blue-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Map */}
          <div className="relative w-full aspect-16/10 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-inner flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full p-4">
              {/* Campus Roads and Connecting Walkways */}
              <path d="M 20 72 L 50 38 L 80 75" fill="none" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
              <path d="M 35 25 L 50 38 L 68 24" fill="none" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
              <path d="M 50 38 L 48 56 L 62 55 L 50 92" fill="none" stroke="#CBD5E1" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 20 72 L 22 45 L 35 25" fill="none" stroke="#CBD5E1" strokeWidth="2.5" />
              <circle cx="50" cy="50" r="32" fill="none" stroke="#F1F5F9" strokeWidth="2" strokeDasharray="3,3" />

              {/* Location Nodes */}
              {filteredLocations.map((loc) => {
                const isSelected = selectedLocation?.id === loc.id;
                return (
                  <g
                    key={loc.id}
                    className="cursor-pointer group"
                    onClick={() => setSelectedLocation(loc)}
                  >
                    <circle
                      cx={loc.x}
                      cy={loc.y}
                      r={isSelected ? 4.8 : 3.2}
                      className={`transition-all duration-300 ${
                        isSelected
                          ? 'fill-blue-600 stroke-4 stroke-blue-200 shadow-lg'
                          : 'fill-slate-800 hover:fill-blue-500'
                      }`}
                    />
                    <text
                      x={loc.x}
                      y={loc.y - 4.5}
                      textAnchor="middle"
                      className={`text-[3.2px] font-sans font-bold select-none ${
                        isSelected ? 'fill-blue-900 font-extrabold' : 'fill-slate-600 group-hover:fill-slate-900'
                      }`}
                    >
                      {loc.name.split(' (')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Floating indicator */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs p-2.5 rounded-xl border border-slate-200 text-xs shadow-xs">
              <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">
                Active Selection
              </span>
              <p className="font-extrabold text-slate-900">{selectedLocation.name.split(' (')[0]}</p>
            </div>
          </div>
        </div>

        {/* Location Details Card (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {selectedLocation.type} Zone
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Safe Zone
                </span>
              </div>
              <h4 className="font-extrabold text-base text-slate-900 pt-1">
                {selectedLocation.name}
              </h4>
            </div>

            <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 font-medium text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>CCTV Monitored 24/7 Security</span>
              </div>
              <p className="leading-relaxed">
                Recommended for peer deal exchanges, student ride departures, and pre-order meal collections.
              </p>
            </div>

            {/* Quick Actions at this location */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 block">
                Available Ecosystem Actions Here:
              </span>

              <button
                onClick={() => setActiveTab('rides')}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-blue-600" />
                  <span>Request Ride From Here</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => setActiveTab('marketplace')}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Browse Listings Near Here</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
