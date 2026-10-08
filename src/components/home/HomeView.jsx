import React from 'react';
import { 
  Building2, ShieldCheck, ArrowRight, PlusCircle, Search, 
  Sparkles, Star, MapPin, Clock, Utensils, Car, Wrench, 
  Gift, RefreshCw, Trophy, CheckCircle2, MessageSquare, ExternalLink 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ListingCard from '../marketplace/ListingCard';
import { CAMPUS_FOOD_ITEMS, CAMPUS_RIDE_ROUTES, STUDENT_SERVICES, CAMPUS_OPPORTUNITIES } from '../../data/mockData';

export default function HomeView() {
  const { 
    setActiveTab, 
    setSelectedCategory, 
    setQuickSellOpen, 
    listings, 
    setSelectedListing,
    setVerifyModalOpen,
    setJudgeTourStep 
  } = useApp();

  const popularItems = listings.slice(0, 4);

  const categories = [
    { id: 'Marketplace', name: 'Buy & Sell', desc: 'Calculators, books, tech & hostel gear', icon: Building2, color: 'text-blue-600 bg-blue-50' },
    { id: 'Food', name: 'Food & Snacks', desc: 'Canteen pre-orders & midnight Maggi', icon: Utensils, color: 'text-amber-600 bg-amber-50', tab: 'food' },
    { id: 'Study Materials', name: 'Study & Notes', desc: 'Textbooks, lab files & PYQ sets', icon: Sparkles, color: 'text-emerald-600 bg-emerald-50' },
    { id: 'Technical Accessories', name: 'Tech & Gadgets', desc: 'Chargers, mice, scientific calculators', icon: Building2, color: 'text-indigo-600 bg-indigo-50' },
    { id: 'Services', name: 'Student Services', desc: 'Tutoring, printing & hardware repair', icon: Wrench, color: 'text-violet-600 bg-violet-50', tab: 'services' },
    { id: 'Rides', name: 'Campus Rides', desc: 'Flat fare student scooter transit', icon: Car, color: 'text-sky-600 bg-sky-50', tab: 'rides' },
    { id: 'Give Away', name: 'Give Away (₹0)', desc: '100% free community study gear', icon: Gift, color: 'text-emerald-600 bg-emerald-50', tab: 'giveaway' },
    { id: 'Rent / Borrow', name: 'Rent / Borrow', desc: 'Daily rentals for exams & projects', icon: RefreshCw, color: 'text-cyan-600 bg-cyan-50', tab: 'rent' },
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Hero Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-900 text-xs font-bold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Verified Campus Digital Layer</span>
              <span className="text-slate-400">•</span>
              <span className="text-blue-700 font-semibold">Not just another marketplace</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Everything campus. <br />
              <span className="text-blue-900">One trusted platform.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
              Buy, sell, rent, order, ride, and connect with verified members of your campus community. 
              Say goodbye to buried WhatsApp chats, missing prices, and endless <em>“Is this available?”</em> loops.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setActiveTab('marketplace');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-2xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Browse Campus</span>
                <ArrowRight className="w-4 h-4 text-blue-300" />
              </button>

              <button
                onClick={() => setQuickSellOpen(true)}
                className="px-6 py-3.5 rounded-2xl bg-white border border-slate-300 hover:border-slate-400 text-slate-900 font-bold text-sm sm:text-base shadow-xs hover:bg-slate-50 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4 text-slate-600" />
                <span>Sell Something (60s)</span>
              </button>

              <button
                onClick={() => setJudgeTourStep(1)}
                className="px-4 py-3.5 rounded-2xl bg-amber-50 border border-amber-300 hover:bg-amber-100 text-amber-900 font-bold text-xs sm:text-sm transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Judge Demo Walkthrough</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-600 font-semibold border-t border-slate-200/80">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Campus Verified Identities</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Student-to-Student Only</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Safe Designated Meetup Zones</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual with Trust Overlay (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-4/5 sm:aspect-square bg-slate-100">
              {/* Premium Realistic University Campus Photography */}
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
                alt="Modern university campus students collaborating"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              {/* Floating Live Trust Card Overlay */}
              <div className="absolute bottom-5 inset-x-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-xl space-y-2 text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-900 text-white font-bold text-xs flex items-center justify-center">
                      R
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Rohan Sharma (4th Year)</h4>
                      <span className="text-[10px] text-emerald-600 font-semibold">Campus Verified ✓</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                    ★ 4.9 (27 Deals)
                  </span>
                </div>
                <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="font-semibold text-slate-900 block truncate">Casio Scientific Calculator fx-991EX</span>
                  <span className="text-[11px] text-emerald-700 font-bold">Deal locked at ₹700 • Met at Central Library</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE WHATSAPP CONTRAST BANNER (CORE PRODUCT STATEMENT) */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
            Why Campus Hustle Exists
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            “Students already have WhatsApp.<br />
            The problem was never communication—it was organization.”
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            WhatsApp groups bury listings under 500 messages, lose prices, cause endless duplicate questions, and offer zero transaction safety.
            Campus Hustle structures the deal from discovery to verified handoff.
          </p>

          {/* Side by side comparison pills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left pt-2">
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-rose-500/30 space-y-2">
              <span className="font-bold text-xs text-rose-400 uppercase tracking-wider block">
                ✕ Chaotic WhatsApp Groups
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li>• Listings buried within minutes in 1,000-member chats</li>
                <li>• Buyers constantly spam: <em>“Is this still available?”</em></li>
                <li>• No reputation score or verified student authentication</li>
                <li>• Messy bargaining and ghosting with zero records</li>
              </ul>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-emerald-500/40 space-y-2">
              <span className="font-bold text-xs text-emerald-400 uppercase tracking-wider block">
                ✓ Campus Hustle Digital Layer
              </span>
              <ul className="text-xs text-slate-200 space-y-1.5">
                <li>• Structured searchable catalog with real-time Availability badges</li>
                <li>• Formal Make Offer & Counter Offer negotiation engine</li>
                <li>• Immutable Deal Summary locking agreed price & safe pickup point</li>
                <li>• 100% student identity verification + authentic deal reviews</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY DISCOVERY GRID */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-left">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
              Campus Ecosystem Hubs
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore by Campus Need
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('marketplace')}
            className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  if (cat.tab) setActiveTab(cat.tab);
                  else {
                    setSelectedCategory(cat.id);
                    setActiveTab('marketplace');
                  }
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 hover:border-blue-400 shadow-xs hover:shadow-md transition-all duration-200 text-left cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-900 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      {cat.desc}
                    </p>
                  </div>
                </div>
                <div className="pt-3 text-[11px] font-semibold text-blue-700 flex items-center gap-1">
                  <span>Open Hub</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. POPULAR CAMPUS ITEMS */}
      <section className="space-y-6 text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
              Trending Marketplace Items
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular on Campus Today
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('marketplace')}
            className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Browse All {listings.length} Listings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularItems.map((item) => (
            <ListingCard
              key={item.id}
              listing={item}
              onSelect={setSelectedListing}
            />
          ))}
        </div>
      </section>

      {/* 5. CAMPUS RIDES PREVIEW */}
      <section className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6 text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
              Internal Student Mobility
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Campus Rides — Fixed Transparent Fares
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Approved student scooter riders connecting Hostels, Academic Blocks, and Main Gate. Flat ₹15–₹25 rates.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('rides')}
            className="px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs transition shadow-sm cursor-pointer whitespace-nowrap self-start md:self-auto"
          >
            Open Interactive Ride Map →
          </button>
        </div>

        {/* 3 Pre-approved Routes preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CAMPUS_RIDE_ROUTES.slice(0, 3).map((r) => (
            <div
              key={r.id}
              onClick={() => setActiveTab('rides')}
              className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-blue-400 transition cursor-pointer space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-600">₹{r.fare} Flat Fare</span>
                <span className="text-slate-400">{r.estimatedTime} ({r.distance})</span>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">FROM: {r.from.split(' (')[0]}</p>
                <p className="text-sm font-bold text-slate-900">TO: {r.to.split(' (')[0]}</p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Rider: {r.provider.name}</span>
                <span className="text-amber-500 font-bold">★ {r.provider.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FOOD & CANTEEN PREVIEW */}
      <section className="space-y-6 text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
              Skip The Long Canteen Queue
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Food & Late-Night Pre-Orders
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('food')}
            className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View Canteen Menu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {CAMPUS_FOOD_ITEMS.slice(0, 3).map((food) => (
            <div
              key={food.id}
              onClick={() => setActiveTab('food')}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-blue-400 transition cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-16/10 bg-slate-100">
                <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
                <span className="absolute top-2 right-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {food.prepTime}
                </span>
              </div>
              <div className="p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900">{food.name}</h4>
                  <span className="font-extrabold text-sm text-emerald-600">₹{food.price}</span>
                </div>
                <p className="text-xs text-slate-500">{food.providerName}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. HOW IT WORKS (THE 6-STEP TRANSFORMATION) */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8 text-center">
        <div className="max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
            End-To-End Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How Campus Hustle Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            The definitive 6-step cycle replacing ad-hoc messages with permanent trust.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-left">
          {[
            { step: '01', title: 'VERIFY', desc: 'University email & student roll badge.' },
            { step: '02', title: 'DISCOVER', desc: 'Real-time category & availability filters.' },
            { step: '03', title: 'COMMUNICATE', desc: 'Listing-specific chat & WhatsApp bridge.' },
            { step: '04', title: 'TRANSACT', desc: 'Formal Make Offer & Counter Offer engine.' },
            { step: '05', title: 'COMPLETE', desc: 'Meet at safe zone & lock deal summary.' },
            { step: '06', title: 'REVIEW', desc: 'Verified deal reviews & reputation score.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
              <span className="text-xs font-black text-blue-900 block font-mono">
                {item.step}
              </span>
              <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">
                {item.title}
              </h4>
              <p className="text-[11px] text-slate-500 leading-snug">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. TRUST & SAFETY BANNER */}
      <section className="bg-blue-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden text-left">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-800 text-blue-200 border border-blue-700">
              Zero Anonymous Activity
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Built on Verified Peer Trust
            </h2>
            <p className="text-sm text-blue-100 leading-relaxed max-w-xl">
              We never expose private room numbers or personal phone numbers. Every exchange is anchored to monitored public campus safe zones like the Central Library and Cafeteria.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => setVerifyModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-white text-blue-950 font-bold text-xs hover:bg-blue-50 transition shadow-sm cursor-pointer"
              >
                Verify Student ID Now
              </button>
              <button
                onClick={() => setActiveTab('safety')}
                className="px-5 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-700 text-white font-semibold text-xs border border-blue-700 cursor-pointer"
              >
                View Safe Meetup Map & Guidelines
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 bg-blue-950/60 p-5 rounded-2xl border border-blue-800/80 space-y-3 text-xs">
            <h4 className="font-bold text-sm text-blue-200">Trust Matrix</h4>
            <div className="space-y-2 text-blue-200/90">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Student Verified Profiles</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Transaction-Only Authentic Ratings</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Prohibited Items Moderation Filter</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA SECTION */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-xl border border-slate-800">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Make campus life easier today.
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          Join your fellow verified students on Campus Hustle. Buy and sell textbooks, reserve late night food, book campus rides, and deal with complete confidence.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              setActiveTab('marketplace');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition shadow-md cursor-pointer"
          >
            Explore Campus Hustle Now
          </button>
          <button
            onClick={() => setQuickSellOpen(true)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 cursor-pointer"
          >
            List an Item in 60s
          </button>
        </div>
      </section>
    </div>
  );
}
