import React, { useState } from 'react';
import { 
  Building2, Search, PlusCircle, Bell, Heart, User, ShieldCheck, 
  MapPin, Coffee, Car, BookOpen, Gift, RefreshCw, Menu, X, 
  ChevronDown, ExternalLink, Sparkles, CheckCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VerifiedBadge } from './Badge';

export default function Navbar() {
  const { 
    activeTab, 
    setActiveTab, 
    user, 
    notifications, 
    markAllNotificationsRead, 
    savedItems, 
    setQuickSellOpen,
    setVerifyModalOpen,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navLinks = [
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'food', label: 'Food & Snacks' },
    { id: 'rides', label: 'Campus Rides' },
    { id: 'services', label: 'Services' },
    { id: 'giveaway', label: 'Give Away (₹0)' },
    { id: 'rent', label: 'Rent / Borrow' },
    { id: 'map', label: 'Campus Map' },
    { id: 'opportunities', label: 'Opportunities' },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top micro-announcement banner */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 text-center font-medium hidden sm:flex items-center justify-center gap-3">
        <span className="flex items-center gap-1.5 text-blue-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>The Verified Digital Layer for Campus Life</span>
        </span>
        <span className="text-slate-600">•</span>
        <span className="text-slate-400">
          Replacing chaotic WhatsApp chats with structured discovery, verified identities, and guaranteed deal workflows.
        </span>
        <button
          onClick={() => setActiveTab('safety')}
          className="text-xs text-blue-400 hover:text-blue-300 underline font-medium cursor-pointer"
        >
          Safety Guidelines
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-900 text-white flex items-center justify-center shadow-md group-hover:bg-blue-800 transition-colors">
                <Building2 className="w-5 h-5 text-blue-200" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-slate-900 group-hover:text-blue-900 transition-colors">
                    CAMPUS HUSTLE
                  </span>
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded border border-blue-200">
                    VERIFIED
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium leading-none hidden sm:block">
                  Everything campus. One trusted platform.
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-slate-100 text-blue-900 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Sell CTA */}
            <button
              onClick={() => setQuickSellOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition shadow-sm cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-blue-300" />
              <span className="hidden sm:inline">Quick Sell</span>
              <span className="sm:hidden">Sell</span>
            </button>

            {/* Saved Items */}
            <button
              onClick={() => handleNavClick('dashboard')}
              title="Saved Items & Wishlist"
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              {savedItems.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {savedItems.length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown Menu */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Campus Activity & Deals</h4>
                      <p className="text-[11px] text-slate-500">Real-time alerts and deal updates</p>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[11px] text-blue-600 hover:underline font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCheck className="w-3 h-3" />
                        Mark read
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-500">
                        You’re all caught up! No notifications.
                      </div>
                    ) : (
                      notifications.slice(0, 6).map((n) => (
                        <div
                          key={n.id}
                          className={`p-3 text-xs hover:bg-slate-50 transition cursor-pointer ${
                            !n.read ? 'bg-blue-50/40' : ''
                          }`}
                          onClick={() => {
                            setNotificationsOpen(false);
                            if (n.link === '/marketplace') setActiveTab('marketplace');
                            else if (n.link === '/rides') setActiveTab('rides');
                            else setActiveTab('dashboard');
                          }}
                        >
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="font-semibold text-slate-900">{n.title}</span>
                            <span className="text-[10px] text-slate-400">{n.time}</span>
                          </div>
                          <p className="text-slate-600 text-[11px] leading-tight">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="px-4 py-2 border-t border-slate-100 text-center">
                    <button
                      onClick={() => {
                        setNotificationsOpen(false);
                        setActiveTab('dashboard');
                      }}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                    >
                      View All in Dashboard →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar & Trust Badge */}
            <div className="flex items-center pl-2 border-l border-slate-200">
              <button
                onClick={() => handleNavClick('dashboard')}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition cursor-pointer"
                title={`${user.name} - ${user.verificationBadge}`}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/40"
                />
                <div className="hidden lg:block text-left text-xs leading-none">
                  <div className="flex items-center gap-1 font-semibold text-slate-900">
                    <span>{user.name.split(' ')[0]}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <span className="text-[10px] text-emerald-600 font-medium">★ {user.rating}</span>
                </div>
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${
                  activeTab === link.id
                    ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('dashboard')}
              className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between"
            >
              <span>My Student Dashboard</span>
              <span className="text-[10px] bg-slate-200 text-slate-800 px-2 py-0.5 rounded">Active</span>
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-amber-800 bg-amber-50/70 hover:bg-amber-100 flex items-center justify-between"
            >
              <span>Campus Safety & Admin Portal</span>
              <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded">Mod</span>
            </button>
            <button
              onClick={() => setVerifyModalOpen(true)}
              className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-blue-700 bg-blue-50 flex items-center justify-between"
            >
              <span>Verify Campus Identity</span>
              <ShieldCheck className="w-4 h-4 text-blue-600" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
