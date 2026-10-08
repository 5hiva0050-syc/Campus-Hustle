import React from 'react';
import { Calendar, Trophy, Rocket, Users, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
import { CAMPUS_OPPORTUNITIES } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export default function OpportunitiesView() {
  const { showToast } = useApp();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg border border-slate-800">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Verified & Moderated Campus Information
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Campus Opportunities & Hackathons
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Curated student hackathons, robotics workshops, university incubation grants, and official club recruitment—without chaotic chat forward spam.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-10 translate-y-10">
          <Trophy className="w-80 h-80 text-white" />
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CAMPUS_OPPORTUNITIES.map((opp) => (
          <div
            key={opp.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  {opp.category}
                </span>
                <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                  {opp.deadline}
                </span>
              </div>

              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-snug">
                {opp.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {opp.description}
              </p>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-slate-700">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-medium">Organizer: {opp.organizer}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{opp.date}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{opp.location}</span>
                </div>
                {opp.prize && (
                  <div className="flex items-center gap-2 font-bold text-emerald-700 pt-1 border-t border-slate-200/60">
                    <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{opp.prize}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => showToast('Registered Interest', `Your campus identity is logged for ${opp.title}`)}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Register with Campus ID</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-300" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
