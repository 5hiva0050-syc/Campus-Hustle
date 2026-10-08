import React from 'react';
import { Building2, ShieldCheck, Heart, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Footer() {
  const { setActiveTab, setVerifyModalOpen } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Manifesto */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow">
                CH
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">
                CAMPUS HUSTLE
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              “Everything campus. One trusted platform.”
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              We didn’t build another marketplace. We built the digital layer for everyday campus life—replacing chaotic WhatsApp spam with verified discovery and locked deal summaries.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-900/60 text-blue-300 border border-blue-700/60">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                100% Student-First Ecosystem
              </span>
            </div>
          </div>

          {/* Campus Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              Campus Discovery
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab('marketplace')} className="hover:text-white transition cursor-pointer">
                  Buy & Sell Marketplace
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('food')} className="hover:text-white transition cursor-pointer">
                  Canteen Pre-Orders & Snacks
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('rides')} className="hover:text-white transition cursor-pointer">
                  Campus Rides & Mobility
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-white transition cursor-pointer">
                  Student Peer Services
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('giveaway')} className="hover:text-white transition cursor-pointer">
                  Give Away (₹0 Free Essentials)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('rent')} className="hover:text-white transition cursor-pointer">
                  Rent / Borrow Campus Tools
                </button>
              </li>
            </ul>
          </div>

          {/* Safety & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              Safety & Verification
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab('safety')} className="hover:text-white transition cursor-pointer">
                  Safety Center & Guidelines
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('safety')} className="hover:text-white transition cursor-pointer">
                  Approved Safe Meetup Points
                </button>
              </li>
              <li>
                <button onClick={() => setVerifyModalOpen(true)} className="hover:text-white transition cursor-pointer">
                  Verify University Email
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('map')} className="hover:text-white transition cursor-pointer">
                  Interactive Campus Map
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-white transition cursor-pointer">
                  Moderation Portal (Admin)
                </button>
              </li>
            </ul>
          </div>

          {/* Product Philosophy */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              WhatsApp Integration Strategy
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We don’t ask students to stop using WhatsApp. We give their WhatsApp chats a structured starting point through verified listings, locked offers, and designated pickup spots.
            </p>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-[11px] text-slate-300">
              <span className="font-semibold text-emerald-400 block mb-1">Deal Transformation:</span>
              VERIFY → DISCOVER → COMMUNICATE → TRANSACT → COMPLETE → REVIEW
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Campus Hustle. Designed & Engineered for PromptWar Competition.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Student-to-Student Architecture</span>
            <span>•</span>
            <span>No Fake Claims</span>
            <span>•</span>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="text-blue-400 hover:underline cursor-pointer"
            >
              My Dashboard
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
