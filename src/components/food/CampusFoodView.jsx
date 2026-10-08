import React, { useState } from 'react';
import { 
  Utensils, Clock, MapPin, Star, ShieldCheck, CheckCircle2, 
  ShoppingBag, ArrowRight, ExternalLink 
} from 'lucide-react';
import { CAMPUS_FOOD_ITEMS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export default function CampusFoodView() {
  const { foodOrders, placeFoodOrder, showToast, setWhatsAppModalData } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [trayItem, setTrayItem] = useState(null);

  const categories = ['All', 'Snacks', 'Meals', 'Beverages'];

  const filteredItems = selectedCategory === 'All'
    ? CAMPUS_FOOD_ITEMS
    : CAMPUS_FOOD_ITEMS.filter(item => item.category === selectedCategory);

  const handleOrder = (item) => {
    placeFoodOrder(item, 1);
    setTrayItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg border border-slate-800">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Campus Canteen & Evening Pre-Orders
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Food & Late-Night Campus Canteen
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Skip long queues between lectures and late night hostel study sessions. Pre-order snacks and beverages for designated campus counter pickup.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-10 translate-y-10">
          <Utensils className="w-80 h-80 text-white" />
        </div>
      </div>

      {/* Live Order Tracker Banner if orders exist */}
      {foodOrders.length > 0 && (
        <div className="bg-white rounded-2xl border border-blue-200 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                Active Pre-Order Status ({foodOrders[0].item})
              </h4>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-100 text-blue-800">
              {foodOrders[0].status.replace(/_/g, ' ')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div>
              <span className="text-slate-400 block">Stall / Provider:</span>
              <span className="font-semibold text-slate-800">{foodOrders[0].provider}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Pickup Counter:</span>
              <span className="font-semibold text-slate-800">{foodOrders[0].pickupLocation}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Total Amount:</span>
              <span className="font-extrabold text-emerald-600">₹{foodOrders[0].total}</span>
            </div>
          </div>
        </div>
      )}

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 right-2.5 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.prepTime}
                </span>
                <span className="absolute bottom-2.5 left-2.5 bg-white/95 text-blue-900 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                  {item.providerName}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    {item.name}
                  </h3>
                  <span className="text-base font-extrabold text-slate-900 shrink-0">
                    ₹{item.price}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-1 font-semibold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{item.rating}</span>
                    <span className="text-slate-400 font-normal">({item.ordersCount})</span>
                  </div>
                  <span className="truncate max-w-[150px]">{item.pickupLocation.split(' (')[0]}</span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                type="button"
                onClick={() => handleOrder(item)}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-blue-300" />
                <span>Pre-Order for Pickup (₹{item.price})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
