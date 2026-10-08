import React from 'react';
import { 
  Sparkles, CheckCircle2, ChevronRight, ChevronLeft, X, 
  ArrowRight, ShieldCheck, Play, RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function JudgeTourModal() {
  const { 
    judgeTourStep, 
    setJudgeTourStep, 
    setActiveTab, 
    setSearchQuery, 
    setSelectedListing,
    listings,
    makeOffer,
    counterOffer,
    acceptDeal,
    completeDeal,
    deals,
    setDealSummaryModal,
    setReviewModalDeal,
    bookRide,
    progressRideStatus,
    activeRide,
    resetAllDataToDefault,
    showToast
  } = useApp();

  if (judgeTourStep === 0) {
    return (
      <div className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2">
        <button
          onClick={() => {
            setJudgeTourStep(1);
            setActiveTab('home');
          }}
          className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900 text-white font-medium text-xs hover:bg-blue-600 transition-all duration-300 shadow-xl border border-slate-700 hover:border-blue-400 cursor-pointer"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
          <span>PromptWar Judge Demo Tour (1-Click Walkthrough)</span>
        </button>
      </div>
    );
  }

  const tourSteps = [
    {
      step: 1,
      title: 'STEP 1: Platform Overview (Homepage)',
      desc: 'Campus Hustle is the digital layer for campus life. Notice the clear trust positioning: replacing unstructured WhatsApp groups with verified peer commerce.',
      actionLabel: 'Go to Step 2: Open Marketplace',
      execute: () => {
        setActiveTab('home');
        setJudgeTourStep(2);
      }
    },
    {
      step: 2,
      title: 'STEP 2: Explore Structured Marketplace',
      desc: 'Browse items with structured categories, exact conditions, locations, and live availability badges—not buried messages in a chat.',
      actionLabel: 'Go to Step 3: Search "Scientific Calculator"',
      execute: () => {
        setActiveTab('marketplace');
        setJudgeTourStep(3);
      }
    },
    {
      step: 3,
      title: 'STEP 3: Instant Search & Filter',
      desc: 'Watch the marketplace instantly filter for "Scientific Calculator". Notice the availability status and verified seller reputation right on the card.',
      actionLabel: 'Go to Step 4: Open Product Details',
      execute: () => {
        setActiveTab('marketplace');
        setSearchQuery('Scientific Calculator');
        setJudgeTourStep(4);
      }
    },
    {
      step: 4,
      title: 'STEP 4: Inspect Listing Details & Trust Profile',
      desc: 'High-res gallery, clear condition, pickup point, and "Why trust this seller?" badge (✓ 27 Deals, 4.9 Rating, 12 min response).',
      actionLabel: 'Go to Step 5: Make Offer (₹600)',
      execute: () => {
        const item = listings.find(l => l.id === 'prod-1') || listings[0];
        setSelectedListing(item);
        setJudgeTourStep(5);
      }
    },
    {
      step: 5,
      title: 'STEP 5: Structured Offer Engine (₹600)',
      desc: 'No messy back-and-forth chat. Buyer submits a formal offer of ₹600. The listing availability shifts to "NEGOTIATING".',
      actionLabel: 'Go to Step 6: Seller Counter Offer (₹700)',
      execute: () => {
        const item = listings.find(l => l.id === 'prod-1') || listings[0];
        makeOffer(item, 600, 'I can pick it up today at Central Library lobby.');
        setJudgeTourStep(6);
      }
    },
    {
      step: 6,
      title: 'STEP 6: Seller Proposes Counter Offer (₹700)',
      desc: 'Seller responds with a structured counter-offer of ₹700 directly within the listing-specific negotiation flow.',
      actionLabel: 'Go to Step 7: Buyer Accepts Deal',
      execute: () => {
        const deal = deals.find(d => d.listingId === 'prod-1') || deals[0];
        if (deal) {
          counterOffer(deal.id, 700, 'Battery is fresh, let us meet halfway at ₹700.');
        }
        setJudgeTourStep(7);
      }
    },
    {
      step: 7,
      title: 'STEP 7: Buyer Accepts Deal (Lock Agreement)',
      desc: 'Both parties agree on ₹700! The listing automatically becomes RESERVED. No more "Is this still available?".',
      actionLabel: 'Go to Step 8: View Deal Summary & Safe Meetup',
      execute: () => {
        const deal = deals.find(d => d.listingId === 'prod-1') || deals[0];
        if (deal) {
          acceptDeal(deal.id);
        }
        setJudgeTourStep(8);
      }
    },
    {
      step: 8,
      title: 'STEP 8: Verified Deal Summary',
      desc: 'Locks in agreed price (₹700), participants, and designates safe meetup zone (Central Library). Also shows the optional WhatsApp Bridge!',
      actionLabel: 'Go to Step 9: Finalize & Mark Completed',
      execute: () => {
        const deal = deals.find(d => d.listingId === 'prod-1') || deals[0];
        if (deal) {
          setDealSummaryModal(deal);
        }
        setJudgeTourStep(9);
      }
    },
    {
      step: 9,
      title: 'STEP 9: Transaction Completion',
      desc: 'Upon physical exchange at the library, parties confirm the transaction. Listing shifts permanently to SOLD.',
      actionLabel: 'Go to Step 10: Submit Trust Rating',
      execute: () => {
        const deal = deals.find(d => d.listingId === 'prod-1') || deals[0];
        if (deal) {
          completeDeal(deal.id);
        }
        setJudgeTourStep(10);
      }
    },
    {
      step: 10,
      title: 'STEP 10: Verified Review & Reputation Loop',
      desc: 'Only completed deals can leave ratings. This eliminates fake reviews and constructs real campus social proof.',
      actionLabel: 'Go to Step 11: Switch to Campus Mobility',
      execute: () => {
        setReviewModalDeal(null);
        setSelectedListing(null);
        setJudgeTourStep(11);
      }
    },
    {
      step: 11,
      title: 'STEP 11: Interactive Campus Rides',
      desc: 'Not public taxi transport. A dedicated student-to-student campus ride network with approved student riders and fixed routes.',
      actionLabel: 'Go to Step 12: Select Boys Hostel A → CSE Dept',
      execute: () => {
        setActiveTab('rides');
        setJudgeTourStep(12);
      }
    },
    {
      step: 12,
      title: 'STEP 12: Campus Map & Route Calculator',
      desc: 'Interactive map highlights the exact route (2.1 km, 8 min, ₹20). Verified rider Rohit Kumar (★4.9, TVS Jupiter DL-14).',
      actionLabel: 'Go to Step 13: Book Campus Ride',
      execute: () => {
        setActiveTab('rides');
        setJudgeTourStep(13);
      }
    },
    {
      step: 13,
      title: 'STEP 13: Ride State Machine (Requested → Accepted)',
      desc: 'Live booking lifecycle: Requested → Provider Accepted → Confirmed. Real-time pickup coordination without spamming group chats.',
      actionLabel: 'Go to Step 14: Complete Ride',
      execute: () => {
        const route = {
          id: 'route-1',
          from: 'Boys Hostel A (Visitors Lounge)',
          to: 'CSE Department (Atrium)',
          distance: '2.1 km',
          estimatedTime: '8 min',
          fare: 20,
          provider: {
            name: 'Rohit Kumar',
            roll: '23BME045',
            badge: 'Approved Campus Rider',
            rating: 4.9,
            vehicle: 'TVS Jupiter (DL-14)',
          }
        };
        bookRide(route);
        setJudgeTourStep(14);
      }
    },
    {
      step: 14,
      title: 'STEP 14: Finalize Ride & Rate Rider',
      desc: 'Ride completed safely. Ride history and earnings update in the student ecosystem ledger.',
      actionLabel: 'Go to Step 15: Check Food & Snacks Pre-Orders',
      execute: () => {
        progressRideStatus('COMPLETED');
        setJudgeTourStep(15);
      }
    },
    {
      step: 15,
      title: 'STEP 15: Food & Night Canteen Pre-Orders',
      desc: 'Pre-order Grilled Sandwiches or Night Maggi without queueing up during breaks. Clear prep times and pickup points.',
      actionLabel: 'Go to Step 16: View Personal Dashboard',
      execute: () => {
        setActiveTab('food');
        setJudgeTourStep(16);
      }
    },
    {
      step: 16,
      title: 'STEP 16: Unified Personal Dashboard',
      desc: 'One command center for active listings, completed sales, purchases, active rides, food orders, saved searches, and trust score.',
      actionLabel: 'Go to Step 17: Admin Moderation Portal',
      execute: () => {
        setActiveTab('dashboard');
        setJudgeTourStep(17);
      }
    },
    {
      step: 17,
      title: 'STEP 17: Campus Moderation & Safety Center',
      desc: 'Complete safety architecture: Safe meetup points, prohibited items policy, and live admin queue to resolve reports or hide bad listings.',
      actionLabel: 'Finish Tour & Explore Freely',
      execute: () => {
        setActiveTab('admin');
        showToast('Judge Walkthrough Completed! 🏆', 'All 17 core workflows demonstrated successfully.');
        setJudgeTourStep(0);
      }
    },
  ];

  const current = tourSteps[judgeTourStep - 1] || tourSteps[0];

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 max-w-lg w-full bg-slate-900 text-white rounded-2xl shadow-2xl border border-blue-500/50 p-4 sm:p-5 backdrop-blur-md">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white uppercase tracking-wider">
            Judge Mode
          </span>
          <span className="text-xs text-slate-300 font-medium">
            Step {judgeTourStep} of {tourSteps.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              resetAllDataToDefault();
              setJudgeTourStep(1);
            }}
            title="Reset Tour Data"
            className="text-slate-400 hover:text-slate-200 text-xs flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>
          <button
            onClick={() => setJudgeTourStep(0)}
            className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
            aria-label="Exit tour"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-1.5 mb-4">
        <h4 className="font-bold text-sm sm:text-base text-blue-300 leading-snug">
          {current.title}
        </h4>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {current.desc}
        </p>
      </div>

      {/* Action CTA */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <button
          disabled={judgeTourStep === 1}
          onClick={() => {
            const prevStep = judgeTourStep - 1;
            setJudgeTourStep(prevStep);
            tourSteps[prevStep - 1].execute();
          }}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 text-xs hover:bg-slate-800 disabled:opacity-40 cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Prev
        </button>

        <button
          onClick={current.execute}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
        >
          <span>{current.actionLabel}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
