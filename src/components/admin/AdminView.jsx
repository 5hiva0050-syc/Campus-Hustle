import React, { useState } from 'react';
import { 
  ShieldCheck, AlertTriangle, Eye, EyeOff, Check, X, 
  Users, Package, FileText, Ban, Trash2, ArrowUpRight 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminView() {
  const { 
    reports, 
    resolveReport, 
    listings, 
    hideListingAdmin, 
    restoreListingAdmin, 
    user, 
    activeRide, 
    foodOrders, 
    showToast 
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState('reports');

  const pendingReports = reports.filter(r => r.status === 'PENDING');
  const activeListingsCount = listings.filter(l => l.availability === 'AVAILABLE').length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg border border-slate-800">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            University Proctor & Moderation Console
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Campus Ecosystem Admin Portal
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Ensure integrity across student listings, verify academic identities, resolve safety flags, and maintain safe campus commerce standards.
          </p>
        </div>
      </div>

      {/* Admin Health Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block">Verified Students</span>
          <span className="text-2xl font-extrabold text-blue-900">1,248</span>
          <span className="text-[10px] text-emerald-600 block mt-0.5">100% Campus .edu</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block">Active Listings</span>
          <span className="text-2xl font-extrabold text-slate-900">{activeListingsCount}</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Marketplace live</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block">Pending Reports</span>
          <span className="text-2xl font-extrabold text-rose-600">{pendingReports.length}</span>
          <span className="text-[10px] text-rose-500 block mt-0.5">Requires review</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block">Approved Riders</span>
          <span className="text-2xl font-extrabold text-emerald-700">18</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">DL & Helmet verified</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block">Canteen Orders</span>
          <span className="text-2xl font-extrabold text-amber-600">{foodOrders.length + 42}</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Today</span>
        </div>
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
        <button
          onClick={() => setActiveAdminTab('reports')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeAdminTab === 'reports' ? 'bg-blue-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Safety Reports Queue ({pendingReports.length})
        </button>
        <button
          onClick={() => setActiveAdminTab('listings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeAdminTab === 'listings' ? 'bg-blue-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All Listings Moderation ({listings.length})
        </button>
      </div>

      {/* Reports Queue */}
      {activeAdminTab === 'reports' && (
        <div className="space-y-4">
          <h3 className="font-bold text-sm sm:text-base text-slate-900">
            Pending User Reports & Flags
          </h3>

          <div className="space-y-3">
            {reports.map((rep) => {
              const targetListing = listings.find(l => l.id === rep.listingId);
              const isResolved = rep.status === 'RESOLVED';

              return (
                <div
                  key={rep.id}
                  className={`bg-white rounded-2xl border p-4 shadow-xs space-y-3 ${
                    isResolved ? 'border-slate-200 opacity-60' : 'border-rose-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isResolved ? 'bg-slate-100 text-slate-600' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {rep.reason}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900">
                        {rep.itemTitle}
                      </h4>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Reported by {rep.reportedBy} • {rep.date}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    "{rep.details}"
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
                    <div className="text-xs text-slate-500">
                      Status: <strong className={isResolved ? 'text-emerald-600' : 'text-rose-600'}>{rep.status}</strong>
                    </div>

                    <div className="flex items-center gap-2">
                      {targetListing && (
                        <button
                          onClick={() => {
                            if (targetListing.isHiddenByAdmin) restoreListingAdmin(targetListing.id);
                            else hideListingAdmin(targetListing.id);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                            targetListing.isHiddenByAdmin
                              ? 'bg-emerald-600 text-white'
                              : 'bg-rose-600 text-white'
                          }`}
                        >
                          {targetListing.isHiddenByAdmin ? 'Restore Listing' : 'Hide Listing'}
                        </button>
                      )}

                      {!isResolved && (
                        <button
                          onClick={() => resolveReport(rep.id)}
                          className="px-3 py-1.5 rounded-lg bg-blue-900 text-white text-xs font-semibold cursor-pointer"
                        >
                          Mark Resolved ✓
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Listings Moderation Table */}
      {activeAdminTab === 'listings' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900">Active Campus Listings Catalog</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="p-3">Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Seller</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Moderation Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {listings.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900 max-w-xs truncate">{l.title}</td>
                    <td className="p-3">{l.category}</td>
                    <td className="p-3 font-bold">₹{l.price}</td>
                    <td className="p-3">{l.seller.name}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {l.availability}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => {
                          if (l.isHiddenByAdmin) restoreListingAdmin(l.id);
                          else hideListingAdmin(l.id);
                        }}
                        className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer ${
                          l.isHiddenByAdmin ? 'bg-emerald-600 text-white' : 'bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-700'
                        }`}
                      >
                        {l.isHiddenByAdmin ? 'Restore' : 'Hide'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
