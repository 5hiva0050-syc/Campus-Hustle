import React, { useState } from 'react';
import { MessageSquare, ExternalLink, Copy, Check, ShieldCheck, AlertCircle } from 'lucide-react';
import Modal from './Modal';
import { useApp } from '../../context/AppContext';

export default function WhatsAppBridgeModal() {
  const { whatsAppModalData, setWhatsAppModalData, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!whatsAppModalData) return null;

  const { listing, deal, seller, buyer } = whatsAppModalData;

  // Generate a structured Campus Hustle deal ticket
  const itemTitle = listing?.title || deal?.listingTitle || 'Campus Item';
  const price = deal ? deal.agreedPrice : listing?.price;
  const pickupLocation = deal ? deal.pickupLocation : (listing?.pickupLocation || 'Central Library (Ground Floor Lobby)');
  const dealId = deal ? deal.id : `INQ-${listing?.id}`;

  const structuredMessage = 
`🎓 *CAMPUS HUSTLE VERIFIED TICKET*
────────────────────────
📦 *Item:* ${itemTitle}
💰 *Listed / Agreed Price:* ₹${price}
📍 *Safe Meetup:* ${pickupLocation}
🛡️ *Deal Status:* ${deal?.status === 'DEAL_AGREED' ? 'DEAL LOCKED' : 'VERIFIED INQUIRY'}
🆔 *Reference:* #${dealId}
👤 *Campus Hustle Buyer:* Arjun Verma (Campus Verified ✓)
────────────────────────
_Sent via Campus Hustle Bridge: Structured discovery, verified identities, transparent deal log._`;

  const handleCopy = () => {
    navigator.clipboard.writeText(structuredMessage);
    setCopied(true);
    showToast('Copied to Clipboard!', 'Structured ticket ready to paste on WhatsApp.');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    // Generate clean wa.me link with encoded structured message without pretending server API
    const encodedText = encodeURIComponent(structuredMessage);
    window.open(`https://api.whatsapp.com/send?text=${encodedText}`, '_blank');
  };

  return (
    <Modal
      isOpen={!!whatsAppModalData}
      onClose={() => setWhatsAppModalData(null)}
      title="Continue on WhatsApp"
      subtitle="Optional communication bridge powered by Campus Hustle structured records"
      maxWidth="max-w-xl"
    >
      <div className="space-y-4">
        {/* Architecture explanation badge */}
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-xs text-slate-700 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-slate-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Why Campus Hustle + WhatsApp Bridge?</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            WhatsApp allows chats, but lacks structured listings, availability tracking, offers, and verified reputation.
            Campus Hustle acts as the <strong>digital layer</strong>: the agreement, verified profile, and safe meetup point are locked here first.
          </p>
        </div>

        {/* Structured Ticket Preview */}
        <div className="rounded-xl bg-emerald-950 text-emerald-100 p-4 font-mono text-xs shadow-inner space-y-2 border border-emerald-800/60">
          <div className="flex items-center justify-between border-b border-emerald-800/80 pb-2">
            <span className="font-semibold text-emerald-300">PRE-STRUCTURED DEAL TICKET</span>
            <span className="text-[10px] bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded">Ready to Send</span>
          </div>
          <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-slate-200">
            {structuredMessage}
          </pre>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied Ticket!' : 'Copy Formatted Ticket'}
          </button>

          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors shadow-sm cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            Launch WhatsApp with Ticket
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </button>
        </div>

        <div className="text-[11px] text-slate-500 text-center">
          Note: Deal completion, reviews, and verified status must still be confirmed inside Campus Hustle to protect your reputation score.
        </div>
      </div>
    </Modal>
  );
}
