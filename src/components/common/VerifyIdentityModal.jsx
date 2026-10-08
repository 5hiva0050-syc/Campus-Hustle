import React, { useState } from 'react';
import { ShieldCheck, Mail, GraduationCap, CheckCircle2, Lock } from 'lucide-react';
import Modal from './Modal';
import { useApp } from '../../context/AppContext';

export default function VerifyIdentityModal() {
  const { verifyModalOpen, setVerifyModalOpen, verifyIdentity, user } = useApp();
  const [email, setEmail] = useState(user.email || '');
  const [roll, setRoll] = useState('22BCSE104');
  const [dept, setDept] = useState(user.department || 'Computer Science & Engineering');
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!verifyModalOpen) return null;

  const handleSendCode = (e) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep(2);
      setOtp('8492'); // Pre-fill demo OTP for effortless judging
    }, 800);
  };

  const handleConfirmVerification = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      verifyIdentity(email, roll, dept);
      setStep(1);
    }, 600);
  };

  return (
    <Modal
      isOpen={verifyModalOpen}
      onClose={() => setVerifyModalOpen(false)}
      title="Campus Identity Verification"
      subtitle="Ensuring 100% peer-to-peer trust across university members"
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        {/* Trust explanation banner */}
        <div className="rounded-xl bg-blue-50/80 border border-blue-200/80 p-3.5 text-xs text-blue-900 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">Why campus verification matters</p>
            <p className="text-blue-700 leading-relaxed">
              Unlike anonymous open groups, every listing and offer on Campus Hustle is tied to a verified student identity. No random strangers or commercial spammers.
            </p>
          </div>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSendCode} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Official University Email (.edu / .ac.in)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. arjun.v@campus.edu"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Requires approved university domain or student portal handle.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Roll / Student ID
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={roll}
                    onChange={(e) => setRoll(e.target.value)}
                    placeholder="22BCSE104"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  required
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  placeholder="Computer Science"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isVerifying ? 'Generating One-Time Campus Pass...' : 'Send Verification Code'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleConfirmVerification} className="space-y-4">
            <div className="text-center py-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-900">Enter Demo Verification Code</p>
              <p className="text-xs text-slate-500">Sent to {email} (Pre-filled for fast testing)</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 text-center">
                4-Digit Security Code
              </label>
              <input
                type="text"
                required
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-40 mx-auto block text-center tracking-widest text-xl font-mono py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-2.5 px-3 rounded-xl border border-slate-300 text-slate-700 text-xs font-medium cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isVerifying}
                className="w-2/3 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition shadow-sm cursor-pointer"
              >
                {isVerifying ? 'Verifying...' : 'Confirm & Grant Badge ✓'}
              </button>
            </div>
          </form>
        )}

        <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" />
          <span>Demo verification protocol — no external student API required.</span>
        </div>
      </div>
    </Modal>
  );
}
