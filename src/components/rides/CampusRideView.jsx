import React, { useState } from 'react';
import { 
  Car, MapPin, ArrowRightLeft, Clock, ShieldCheck, Star, 
  CheckCircle2, AlertCircle, X, ExternalLink, Navigation, Compass 
} from 'lucide-react';
import { CAMPUS_RIDE_ROUTES, CAMPUS_LOCATIONS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export default function CampusRideView() {
  const { activeRide, bookRide, progressRideStatus, cancelActiveRide, setWhatsAppModalData, showToast } = useApp();

  const [fromLoc, setFromLoc] = useState('Boys Hostel A (Visitors Lounge)');
  const [toLoc, setToLoc] = useState('CSE Department (Atrium)');
  const [ratingModal, setRatingModal] = useState(false);
  const [riderRating, setRiderRating] = useState(5);

  // Find matching route or fallback to calculated estimate
  const currentRoute = CAMPUS_RIDE_ROUTES.find(r => r.from === fromLoc && r.to === toLoc) || {
    id: `custom-route`,
    from: fromLoc,
    to: toLoc,
    distance: '1.8 km',
    estimatedTime: '6 min',
    fare: 20,
    status: 'Available',
    provider: {
      name: 'Rohit Kumar',
      roll: '23BME045',
      badge: 'Approved Campus Rider',
      rating: 4.9,
      totalRides: 146,
      vehicle: 'TVS Jupiter (Reg #DL-14)',
      helmetProvided: true,
    }
  };

  const handleSwap = () => {
    const temp = fromLoc;
    setFromLoc(toLoc);
    setToLoc(temp);
  };

  const handleBook = () => {
    bookRide(currentRoute);
  };

  const handleWhatsAppBridge = () => {
    setWhatsAppModalData({
      deal: {
        id: activeRide?.id || 'RIDE-1',
        listingTitle: `Campus Ride: ${currentRoute.from} → ${currentRoute.to}`,
        agreedPrice: currentRoute.fare,
        pickupLocation: currentRoute.from,
        status: activeRide?.status || 'REQUESTED',
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg border border-slate-800">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Approved Student Peer Mobility Network
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Campus Rides & Fast Internal Transit
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Never get stranded across campus blocks. Pre-approved student riders with verified IDs, flat transparent fares, and zero external surges.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-10 translate-y-10">
          <Car className="w-80 h-80 text-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Functional Campus Map (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-sm sm:text-base text-slate-900">
                  Interactive Campus Transit Map
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                Click points to set Route
              </span>
            </div>

            {/* SVG Interactive Canvas */}
            <div className="relative w-full aspect-16/10 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-inner flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full p-4">
                {/* Roads / Campus pathways */}
                <path
                  d="M 20 72 L 50 38 L 80 75"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M 35 25 L 50 38 L 68 24"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M 50 38 L 48 56 L 62 55 L 50 92"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 20 72 L 22 45 L 35 25"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="2.5"
                  strokeDasharray="2,2"
                />

                {/* Highlighted active route path between selected locations */}
                <path
                  d="M 20 72 Q 35 55 35 25"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="2.5"
                  strokeDasharray="3,3"
                  className="animate-pulse"
                />

                {/* Campus Locations Nodes */}
                {CAMPUS_LOCATIONS.map((loc) => {
                  const isFrom = fromLoc.includes(loc.name.split(' (')[0]);
                  const isTo = toLoc.includes(loc.name.split(' (')[0]);
                  const isActive = isFrom || isTo;

                  return (
                    <g
                      key={loc.id}
                      className="cursor-pointer group"
                      onClick={() => {
                        if (!isFrom) setToLoc(loc.name);
                        else setFromLoc(loc.name);
                        showToast('Map Node Selected', `Destination set to ${loc.name}`);
                      }}
                    >
                      <circle
                        cx={loc.x}
                        cy={loc.y}
                        r={isActive ? 4.5 : 3}
                        className={`transition-all duration-300 ${
                          isFrom
                            ? 'fill-blue-600 stroke-4 stroke-blue-200'
                            : isTo
                            ? 'fill-emerald-600 stroke-4 stroke-emerald-200'
                            : 'fill-slate-700 hover:fill-blue-500'
                        }`}
                      />
                      <text
                        x={loc.x}
                        y={loc.y - 4.5}
                        textAnchor="middle"
                        className={`text-[3.2px] font-sans font-bold select-none ${
                          isActive ? 'fill-slate-900 font-extrabold' : 'fill-slate-500 group-hover:fill-slate-900'
                        }`}
                      >
                        {loc.name.split(' (')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Map Legend */}
              <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs p-2 rounded-xl text-[10px] text-slate-600 space-y-1 border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span>Pickup: {fromLoc.split(' (')[0]}</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span>Drop-off: {toLoc.split(' (')[0]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Route Shortcuts */}
          <div className="pt-4 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-500 block mb-2">
              Popular Pre-Approved Campus Routes:
            </span>
            <div className="flex flex-wrap gap-2">
              {CAMPUS_RIDE_ROUTES.slice(0, 4).map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setFromLoc(r.from);
                    setToLoc(r.to);
                  }}
                  className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-[11px] font-medium hover:border-blue-500 hover:bg-blue-50/50 transition cursor-pointer text-slate-700"
                >
                  {r.from.split(' (')[0]} → {r.to.split(' (')[0]} (₹{r.fare})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Route Selector & Booking Engine (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-slate-900">
              Select Campus Route
            </h3>

            {/* FROM & TO Selector */}
            <div className="space-y-3 relative">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  FROM (Approved Pickup Point)
                </label>
                <select
                  value={fromLoc}
                  onChange={(e) => setFromLoc(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                >
                  {CAMPUS_LOCATIONS.map((l) => (
                    <option key={l.id} value={l.name}>{l.name}</option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center -my-1 z-10 relative">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition cursor-pointer shadow-xs"
                  title="Reverse Route"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  TO (Approved Drop Location)
                </label>
                <select
                  value={toLoc}
                  onChange={(e) => setToLoc(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                >
                  {CAMPUS_LOCATIONS.map((l) => (
                    <option key={l.id} value={l.name}>{l.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Fare & ETA Card */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-3 gap-2 text-center">
              <div>
                <span className="text-[11px] text-slate-500 font-medium block">Distance</span>
                <span className="text-sm font-bold text-slate-900">{currentRoute.distance}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-medium block">Est. Time</span>
                <span className="text-sm font-bold text-slate-900">{currentRoute.estimatedTime}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-medium block">Flat Fare</span>
                <span className="text-base font-extrabold text-emerald-600">₹{currentRoute.fare}</span>
              </div>
            </div>

            {/* Approved Rider Card */}
            <div className="p-3.5 rounded-2xl border border-slate-200 bg-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Assigned Approved Rider
                </span>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {currentRoute.provider.badge}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-blue-900 text-white font-bold text-xs flex items-center justify-center">
                    {currentRoute.provider.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-900">{currentRoute.provider.name}</h5>
                    <p className="text-[11px] text-slate-500">{currentRoute.provider.vehicle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{currentRoute.provider.rating}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-1 border-t border-slate-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sanitized helmet provided • Student ID verified</span>
              </div>
            </div>

            {/* Booking State Machine */}
            {!activeRide ? (
              <button
                type="button"
                onClick={handleBook}
                className="w-full py-3.5 px-4 rounded-2xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm transition shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Car className="w-4 h-4 text-blue-300" />
                <span>Book Campus Ride (₹{currentRoute.fare})</span>
              </button>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800">
                    Live Booking Status:
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-600 text-white animate-pulse">
                    {activeRide.status}
                  </span>
                </div>

                <p className="text-xs text-emerald-700 leading-snug">
                  {activeRide.status === 'REQUESTED' && 'Locating rider near pickup point...'}
                  {activeRide.status === 'ACCEPTED' && `${activeRide.provider.name} is on the way to ${activeRide.from.split(' (')[0]}. ETA: 3 mins.`}
                  {activeRide.status === 'IN_TRANSIT' && `Ride in progress towards ${activeRide.to.split(' (')[0]}.`}
                  {activeRide.status === 'COMPLETED' && 'Ride completed successfully. Thank you for using Campus Mobility!'}
                </p>

                {/* Ride Lifecycle buttons */}
                <div className="flex flex-col gap-2 pt-1">
                  {activeRide.status === 'ACCEPTED' && (
                    <button
                      onClick={() => progressRideStatus('IN_TRANSIT')}
                      className="w-full py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Start Ride (Boarded Vehicle)
                    </button>
                  )}

                  {activeRide.status === 'IN_TRANSIT' && (
                    <button
                      onClick={() => {
                        progressRideStatus('COMPLETED');
                        setRatingModal(true);
                      }}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Arrived & Mark Ride Completed
                    </button>
                  )}

                  {activeRide.status === 'COMPLETED' && (
                    <button
                      onClick={() => setRatingModal(true)}
                      className="w-full py-2 bg-slate-900 text-white text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Rate Approved Rider
                    </button>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={handleWhatsAppBridge}
                      className="flex-1 py-1.5 px-3 rounded-lg border border-emerald-300 bg-white text-emerald-800 text-xs font-semibold hover:bg-emerald-50 cursor-pointer flex items-center justify-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>WhatsApp Bridge</span>
                    </button>
                    {activeRide.status !== 'COMPLETED' && (
                      <button
                        onClick={cancelActiveRide}
                        className="py-1.5 px-3 rounded-lg border border-slate-300 text-slate-600 text-xs hover:bg-slate-50 cursor-pointer"
                      >
                        Cancel Ride
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rider Rating Modal */}
      {ratingModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 border border-slate-200 shadow-2xl space-y-4">
            <h4 className="font-bold text-base text-slate-900 text-center">
              Rate Campus Rider
            </h4>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRiderRating(star)}
                  className="p-1 text-slate-300 hover:scale-110 transition cursor-pointer"
                >
                  <Star
                    className={`w-7 h-7 ${
                      riderRating >= star ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                setRatingModal(false);
                cancelActiveRide();
                showToast('Rider Rated ★★★★★', 'Thanks for keeping campus mobility safe!');
              }}
              className="w-full py-2.5 rounded-xl bg-blue-900 text-white font-bold text-xs cursor-pointer"
            >
              Submit Rating & Finish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
