import React from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Toast() {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-slate-900 text-white rounded-xl shadow-2xl p-4 border border-slate-700/80 animate-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-full p-1 bg-emerald-500/20 text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-100">{toastMessage.title}</p>
          {toastMessage.message && (
            <p className="mt-0.5 text-xs text-slate-300 leading-relaxed">{toastMessage.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
