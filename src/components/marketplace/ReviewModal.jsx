import React, { useState } from 'react';
import { Star, Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import Modal from '../common/Modal';
import { useApp } from '../../context/AppContext';

export default function ReviewModal() {
  const { reviewModalDeal, setReviewModalDeal, submitReview } = useApp();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState(['Accurate Condition', 'Safe Meetup']);

  if (!reviewModalDeal) return null;

  const deal = reviewModalDeal;
  const tagsList = ['Accurate Condition', 'Safe Meetup', 'Fast Responder', 'Fair Price', 'Punctual'];

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prev => prev.filter(t => t !== tag));
    } else {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalComment = comment.trim() || `${selectedTags.join(', ')}. Smooth campus exchange.`;
    submitReview(deal.id, rating, finalComment);
  };

  return (
    <Modal
      isOpen={!!reviewModalDeal}
      onClose={() => setReviewModalDeal(null)}
      title="Rate Verified Transaction"
      subtitle={`Completed deal with ${deal.sellerName} for "${deal.listingTitle}"`}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating Stars */}
        <div className="text-center py-2 space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Overall Experience Rating
          </p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => {
              const active = hoverRating ? hoverRating >= star : rating >= star;
              return (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 text-slate-300 transition-transform hover:scale-110 cursor-pointer"
                >
                  <Star
                    className={`w-8 h-8 ${
                      active ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                    }`}
                  />
                </button>
              );
            })}
          </div>
          <span className="text-xs font-bold text-slate-700 block">
            {rating === 5 ? 'Excellent & Trustworthy (5/5)' : `${rating} out of 5 Stars`}
          </span>
        </div>

        {/* Quick Tag Pills */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Key Trust Highlights
          </label>
          <div className="flex flex-wrap gap-1.5">
            {tagsList.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Optional Review Comment */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Optional Campus Feedback
          </label>
          <textarea
            rows={2}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="e.g. Great condition, met right at the library entrance."
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Only verified deal participants can post reviews. No fake ratings.</span>
        </div>

        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={() => setReviewModalDeal(null)}
            className="w-1/3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 cursor-pointer"
          >
            Skip
          </button>
          <button
            type="submit"
            className="w-2/3 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs transition shadow-sm cursor-pointer"
          >
            Submit Verified Review
          </button>
        </div>
      </form>
    </Modal>
  );
}
