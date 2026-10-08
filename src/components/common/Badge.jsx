import React from 'react';
import { CheckCircle2, ShieldCheck, Clock, AlertCircle, Sparkles } from 'lucide-react';

export function AvailabilityBadge({ status }) {
  switch (status) {
    case 'AVAILABLE':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Available
        </span>
      );
    case 'NEGOTIATING':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          <Clock className="w-3 h-3" />
          Negotiating
        </span>
      );
    case 'RESERVED':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <Sparkles className="w-3 h-3" />
          Reserved
        </span>
      );
    case 'SOLD':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-300 line-through">
          Sold
        </span>
      );
    case 'CLOSED':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-200">
          <AlertCircle className="w-3 h-3" />
          Closed
        </span>
      );
    default:
      return null;
  }
}

export function VerifiedBadge({ type = 'Campus Verified', size = 'sm' }) {
  const isSm = size === 'sm';
  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200 ${
        isSm ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
      }`}
      title="Verified University Student Member"
    >
      <CheckCircle2 className={`${isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-blue-600 fill-blue-100`} />
      {type}
    </span>
  );
}

export function ConditionBadge({ condition }) {
  return (
    <span className="inline-flex items-center text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
      {condition}
    </span>
  );
}
