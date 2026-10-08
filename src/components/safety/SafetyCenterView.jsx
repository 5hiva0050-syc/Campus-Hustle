import React, { useState } from 'react';
import { 
  ShieldCheck, AlertTriangle, MapPin, CheckCircle2, Lock, 
  HelpCircle, Flag, Ban, PhoneCall, ChevronDown 
} from 'lucide-react';
import { SAFE_MEETUP_POINTS, PROHIBITED_ITEMS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export default function SafetyCenterView() {
  const { setVerifyModalOpen, submitReport, showToast } = useApp();
  const [reportReason, setReportReason] = useState('Prohibited Item');
  const [reportText, setReportText] = useState('');

  const handleGeneralReport = (e) => {
    e.preventDefault();
    submitReport({
      listingId: 'general-safety-report',
      reason: reportReason,
      details: reportText || 'General community report submitted.',
    });
    setReportText('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg border border-slate-800">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Campus Trust & Physical Safety Protocols
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Trust & Safety Center
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Campus Hustle eliminates the risks of unvetted WhatsApp groups. Every transaction adheres to strict identity verification and designated safe physical meeting zones.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-10 translate-y-10">
          <ShieldCheck className="w-80 h-80 text-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Guidelines & Safe Meetup Locations (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Safe Meetup Points List */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-base text-slate-900">
                Recommended Safe Campus Meetup Points
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Never agree to meet in isolated hostel corridors or private rooms. Always conduct exchanges in designated public zones:
            </p>

            <div className="space-y-3">
              {SAFE_MEETUP_POINTS.map((pt, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                      {pt.name}
                    </h4>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {pt.hours}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{pt.features}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    <strong>Recommended for:</strong> {pt.recommendedFor}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Golden Safety Rules */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Campus Hustle Safety Code</span>
            </h3>

            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50">
                <span className="font-bold text-blue-600">1.</span>
                <span><strong>Inspect Before Paying:</strong> Verify calculators, cables, and books in person before marking the deal completed.</span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50">
                <span className="font-bold text-blue-600">2.</span>
                <span><strong>Lock Price in Deal Summary:</strong> Never enter bargaining renegotiations during physical handoff.</span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50">
                <span className="font-bold text-blue-600">3.</span>
                <span><strong>Privacy Protection:</strong> Never post your room number, phone number, or personal timetable on public descriptions.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Prohibited Items & Moderation Report (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Prohibited Items */}
          <div className="bg-white rounded-3xl border border-rose-200 p-6 shadow-xs space-y-3 bg-rose-50/20">
            <div className="flex items-center gap-2 text-rose-700">
              <Ban className="w-5 h-5" />
              <h3 className="font-bold text-base">Prohibited Items & Non-Negotiables</h3>
            </div>
            <p className="text-xs text-slate-600">
              Zero tolerance policy. Listings containing any of the following are automatically removed and user account suspended:
            </p>

            <ul className="space-y-2 text-xs text-slate-700">
              {PROHIBITED_ITEMS.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Report Form */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Flag className="w-4 h-4 text-red-600" />
              <span>Report Suspicious Activity</span>
            </h3>

            <form onSubmit={handleGeneralReport} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Report Category
                </label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Prohibited Item">Prohibited Item on Campus</option>
                  <option value="Harassment or Impersonation">Harassment or Impersonation</option>
                  <option value="Unverified Stranger">Unverified External Member</option>
                  <option value="Spam or Overpricing">Mass Spam / WhatsApp Group Poaching</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Details / Evidence
                </label>
                <textarea
                  rows={2}
                  required
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  placeholder="Provide context or student ID if known..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition shadow-xs cursor-pointer"
              >
                Submit Confidential Campus Report
              </button>
            </form>
          </div>

          {/* Campus Security Emergency Contact */}
          <div className="bg-slate-900 text-slate-200 rounded-3xl p-5 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-white font-bold">
              <PhoneCall className="w-4 h-4 text-blue-400" />
              <span>Campus Security Emergency Contacts</span>
            </div>
            <p className="text-slate-400">
              Main Gate Security Post: Ext. 2101 / +91-011-2390-HELP
            </p>
            <p className="text-slate-400">
              Hostel Proctor Desk: Ext. 2104 (24/7 Warden Helpline)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
