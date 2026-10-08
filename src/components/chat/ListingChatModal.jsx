import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, ShieldCheck, MapPin, Tag, Check, X, RotateCcw, 
  ExternalLink, Sparkles, MessageSquare, AlertCircle, ArrowRight 
} from 'lucide-react';
import Modal from '../common/Modal';
import { AvailabilityBadge } from '../common/Badge';
import { useApp } from '../../context/AppContext';

export default function ListingChatModal() {
  const { 
    chatListing, 
    setChatListing, 
    chatThreads, 
    sendChatMessage, 
    user, 
    deals, 
    acceptDeal, 
    counterOffer, 
    setDealSummaryModal,
    setWhatsAppModalData 
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [showCounterInput, setShowCounterInput] = useState(false);
  const [counterAmount, setCounterAmount] = useState('');
  const messagesEndRef = useRef(null);

  const activeDeal = chatListing ? deals.find(d => d.listingId === chatListing.id) : null;
  const messages = chatListing ? (chatThreads[chatListing.id] || []) : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!chatListing) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendChatMessage(chatListing.id, inputMessage.trim());
    setInputMessage('');
  };

  const handleAcceptOffer = () => {
    if (activeDeal) {
      acceptDeal(activeDeal.id);
    }
  };

  const handleCounterSubmit = (e) => {
    e.preventDefault();
    if (!counterAmount || !activeDeal) return;
    counterOffer(activeDeal.id, Number(counterAmount), `Counter-offer: ₹${counterAmount}`);
    setShowCounterInput(false);
    setCounterAmount('');
  };

  const handleWhatsAppBridge = () => {
    setWhatsAppModalData({
      listing: chatListing,
      deal: activeDeal,
      seller: chatListing.seller,
      buyer: user,
    });
  };

  return (
    <Modal
      isOpen={!!chatListing}
      onClose={() => setChatListing(null)}
      title="Listing-Specific Deal Chat"
      subtitle="Encrypted conversation linked directly to this listing"
      maxWidth="max-w-2xl"
    >
      <div className="flex flex-col h-[650px] -m-4 sm:-m-6">
        {/* Listing Header Context Banner (Essential to prevent mixing chats) */}
        <div className="bg-slate-50 border-b border-slate-200 p-3.5 px-4 sm:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={chatListing.images[0]}
              alt=""
              className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                  {chatListing.title}
                </h4>
                <AvailabilityBadge status={chatListing.availability} />
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                <span className="font-extrabold text-slate-900">₹{chatListing.price}</span>
                <span>•</span>
                <span className="truncate">{chatListing.pickupLocation}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {activeDeal && activeDeal.status === 'DEAL_AGREED' && (
              <button
                type="button"
                onClick={() => setDealSummaryModal(activeDeal)}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                Deal Summary
              </button>
            )}
            <button
              type="button"
              onClick={handleWhatsAppBridge}
              className="p-1.5 rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-medium cursor-pointer"
              title="Bridge to WhatsApp with Deal Ticket"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Deal Negotiation Status Pill */}
        {activeDeal && (
          <div className="bg-blue-50/90 border-b border-blue-200/80 px-4 py-2 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-900">Current Deal Stage:</span>
              <span className="px-2 py-0.5 rounded bg-blue-100 font-bold text-blue-800">
                {activeDeal.status.replace('_', ' ')} (₹{activeDeal.agreedPrice})
              </span>
            </div>

            {activeDeal.status === 'COUNTER_OFFER' && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleAcceptOffer}
                  className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer"
                >
                  Accept ₹{activeDeal.agreedPrice}
                </button>
                <button
                  onClick={() => setShowCounterInput(!showCounterInput)}
                  className="px-2.5 py-1 rounded border border-slate-300 bg-white text-slate-700 font-medium cursor-pointer"
                >
                  Counter
                </button>
              </div>
            )}
          </div>
        )}

        {/* Counter Offer Input Sub-form if toggled */}
        {showCounterInput && (
          <form onSubmit={handleCounterSubmit} className="bg-amber-50 p-3 border-b border-amber-200 flex items-center gap-2">
            <span className="text-xs font-semibold text-amber-900">Your Counter: ₹</span>
            <input
              type="number"
              required
              min="1"
              value={counterAmount}
              onChange={(e) => setCounterAmount(e.target.value)}
              placeholder="e.g. 680"
              className="w-28 px-2 py-1 text-xs rounded border border-amber-300 bg-white"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-amber-600 text-white rounded text-xs font-semibold cursor-pointer"
            >
              Send Counter
            </button>
            <button
              type="button"
              onClick={() => setShowCounterInput(false)}
              className="text-xs text-slate-500 underline cursor-pointer"
            >
              Cancel
            </button>
          </form>
        )}

        {/* Chat Messages Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/40">
          {/* Security Notice Bubble */}
          <div className="max-w-md mx-auto bg-white rounded-xl p-3 border border-slate-200 text-center text-xs text-slate-600 space-y-1 shadow-xs">
            <div className="flex items-center justify-center gap-1 font-semibold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Campus Verified Channel</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Transactions agreed here are protected by Campus Hustle deal logging. Always meetup at designated spots like {chatListing.pickupLocation}.
            </p>
          </div>

          {messages.map((m) => {
            const isMe = m.sender === 'buyer';
            const isSystem = m.isSystem;

            if (isSystem) {
              return (
                <div key={m.id} className="text-center my-3">
                  <span className="inline-block bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-200 shadow-xs">
                    {m.text}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={m.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-baseline gap-2 mb-1 px-1">
                  <span className="text-[11px] font-semibold text-slate-700">
                    {m.senderName}
                  </span>
                  <span className="text-[10px] text-slate-400">{m.time}</span>
                </div>

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm shadow-xs ${
                    isMe
                      ? 'bg-blue-900 text-white rounded-tr-xs'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>

                  {/* Counter Offer Box embedded in message */}
                  {m.isCounter && m.amount && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200/40 flex items-center justify-between gap-3">
                      <span className="font-extrabold text-amber-500 text-xs">
                        Offered: ₹{m.amount}
                      </span>
                      {activeDeal && activeDeal.status !== 'DEAL_AGREED' && (
                        <button
                          type="button"
                          onClick={() => acceptDeal(activeDeal.id)}
                          className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                        >
                          Accept ₹{m.amount}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type message or ask condition questions..."
            className="flex-1 px-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white cursor-pointer transition shadow-xs"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </Modal>
  );
}
