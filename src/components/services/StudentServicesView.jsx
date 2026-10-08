import React, { useState } from 'react';
import { 
  Wrench, Star, ShieldCheck, CheckCircle2, MessageSquare, 
  Clock, DollarSign, Calendar, Send 
} from 'lucide-react';
import { STUDENT_SERVICES } from '../../data/mockData';
import { VerifiedBadge } from '../common/Badge';
import Modal from '../common/Modal';
import { useApp } from '../../context/AppContext';

export default function StudentServicesView() {
  const { requestService, showToast } = useApp();
  const [selectedService, setSelectedService] = useState(null);
  const [requestDetails, setRequestDetails] = useState('');

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    if (!selectedService) return;
    requestService(selectedService, requestDetails);
    setSelectedService(null);
    setRequestDetails('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg border border-slate-800">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Verified Peer Student Skills
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Student Services & Peer Assistance
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Need urgent report printing at 2 AM, tutoring for mid-terms, or laptop thermal paste servicing? Hire skilled, verified peers on campus.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-10 translate-y-10">
          <Wrench className="w-80 h-80 text-white" />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STUDENT_SERVICES.map((srv) => (
          <div
            key={srv.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
                <img
                  src={srv.image}
                  alt={srv.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-bold text-slate-900 shadow-xs">
                  {srv.rate}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-bold text-base text-slate-900 leading-snug">
                  {srv.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {srv.description}
                </p>

                {/* Provider Card */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-900 text-white font-bold text-xs flex items-center justify-center">
                        {srv.provider.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1 font-bold text-xs text-slate-900">
                          <span>{srv.provider}</span>
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                        <span className="text-[10px] text-slate-400 block">{srv.department}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-500 justify-end">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{srv.rating}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {srv.completedJobs} Jobs
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                type="button"
                onClick={() => setSelectedService(srv)}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5 text-blue-300" />
                <span>Request Service</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Service Request Modal */}
      {selectedService && (
        <Modal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          title={`Request Service from ${selectedService.provider}`}
          subtitle={selectedService.title}
          maxWidth="max-w-md"
        >
          <form onSubmit={handleRequestSubmit} className="space-y-4">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1">
              <span className="text-slate-500">Service Rate:</span>
              <p className="font-extrabold text-sm text-slate-900">{selectedService.rate}</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Details of your requirement / Deadlines
              </label>
              <textarea
                required
                rows={3}
                value={requestDetails}
                onChange={(e) => setRequestDetails(e.target.value)}
                placeholder="e.g. 50 page black-and-white thesis print with spiral binding needed before 5 PM today."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="w-1/3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-2/3 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs transition shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Request</span>
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
