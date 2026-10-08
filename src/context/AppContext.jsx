import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_USER,
  INITIAL_LISTINGS,
  INITIAL_FOOD_ITEMS,
  CAMPUS_RIDE_ROUTES,
  STUDENT_SERVICES,
  CAMPUS_OPPORTUNITIES,
  INITIAL_DEALS,
  INITIAL_NOTIFICATIONS,
  INITIAL_REPORTS,
  SAFE_MEETUP_POINTS,
  CAMPUS_LOCATIONS
} from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Core Data Stores (persisted to localStorage when changed)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ch_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [listings, setListings] = useState(() => {
    const saved = localStorage.getItem('ch_listings');
    return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
  });

  const [deals, setDeals] = useState(() => {
    const saved = localStorage.getItem('ch_deals');
    return saved ? JSON.parse(saved) : INITIAL_DEALS;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('ch_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [savedItems, setSavedItems] = useState(() => {
    const saved = localStorage.getItem('ch_saved_items');
    return saved ? JSON.parse(saved) : ['prod-1', 'prod-3'];
  });

  const [savedSearches, setSavedSearches] = useState(() => {
    const saved = localStorage.getItem('ch_saved_searches');
    return saved ? JSON.parse(saved) : [
      { id: 'ss-1', query: 'Scientific Calculator under ₹800', category: 'Technical Accessories', count: 2, timestamp: Date.now() - 86400000 },
      { id: 'ss-2', query: 'Hostel Study Lamp', category: 'Marketplace', count: 1, timestamp: Date.now() - 43200000 }
    ];
  });

  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem('ch_reports');
    return saved ? JSON.parse(saved) : INITIAL_REPORTS;
  });

  // Active Interactive Workflows
  const [activeRide, setActiveRide] = useState(() => {
    const saved = localStorage.getItem('ch_active_ride');
    return saved ? JSON.parse(saved) : null;
  });

  const [foodOrders, setFoodOrders] = useState(() => {
    const saved = localStorage.getItem('ch_food_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'ord-101',
        item: 'Grilled Cheesy Veg Sandwich',
        quantity: 1,
        total: 60,
        pickupLocation: 'Central Cafeteria / Food Court',
        status: 'READY_FOR_PICKUP',
        timestamp: Date.now() - 15 * 60 * 1000,
        provider: 'Cafeteria Quick Bites (Stall 3)',
      }
    ];
  });

  const [serviceRequests, setServiceRequests] = useState(() => {
    const saved = localStorage.getItem('ch_service_requests');
    return saved ? JSON.parse(saved) : [
      {
        id: 'sreq-1',
        serviceId: 'srv-1',
        title: 'Fast Laser Printing & Spiral Thesis Binding',
        provider: 'Vikram Joshi',
        status: 'COMPLETED',
        details: 'Print 45 pages project report (B&W double sided) with blue spiral cover.',
        charge: '₹120',
        timestamp: Date.now() - 86400000,
      }
    ];
  });

  // Chat messages dictionary indexed by listingId
  const [chatThreads, setChatThreads] = useState(() => {
    const saved = localStorage.getItem('ch_chats');
    if (saved) return JSON.parse(saved);
    return {
      'prod-1': [
        { id: 'm1', sender: 'seller', senderName: 'Rohan Sharma', text: 'Hi Arjun! Yes, the Casio fx-991EX is in perfect condition, battery replaced last month.', time: '11:05 AM' },
        { id: 'm2', sender: 'buyer', senderName: 'Arjun Verma', text: 'Great! Can we do ₹600? I can pick it up today at the library entrance.', time: '11:15 AM' },
        { id: 'm3', sender: 'seller', senderName: 'Rohan Sharma', text: 'Hey! 600 is slightly low as battery is new. How about ₹700?', time: '11:22 AM', isCounter: true, amount: 700 },
      ]
    };
  });

  // Modal Dialog States
  const [selectedListing, setSelectedListing] = useState(null);
  const [quickSellOpen, setQuickSellOpen] = useState(false);
  const [chatListing, setChatListing] = useState(null);
  const [offerModalListing, setOfferModalListing] = useState(null);
  const [dealSummaryModal, setDealSummaryModal] = useState(null);
  const [reviewModalDeal, setReviewModalDeal] = useState(null);
  const [whatsAppModalData, setWhatsAppModalData] = useState(null);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Judge Demo Tour Mode State
  const [judgeTourStep, setJudgeTourStep] = useState(0); // 0 = closed, 1..17 = active steps

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('ch_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ch_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('ch_deals', JSON.stringify(deals));
  }, [deals]);

  useEffect(() => {
    localStorage.setItem('ch_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('ch_saved_items', JSON.stringify(savedItems));
  }, [savedItems]);

  useEffect(() => {
    localStorage.setItem('ch_saved_searches', JSON.stringify(savedSearches));
  }, [savedSearches]);

  useEffect(() => {
    localStorage.setItem('ch_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('ch_active_ride', JSON.stringify(activeRide));
  }, [activeRide]);

  useEffect(() => {
    localStorage.setItem('ch_food_orders', JSON.stringify(foodOrders));
  }, [foodOrders]);

  useEffect(() => {
    localStorage.setItem('ch_service_requests', JSON.stringify(serviceRequests));
  }, [serviceRequests]);

  useEffect(() => {
    localStorage.setItem('ch_chats', JSON.stringify(chatThreads));
  }, [chatThreads]);

  // Toast helper
  const showToast = (title, message = '') => {
    setToastMessage({ title, message });
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Add notification helper
  const addNotification = (title, message, type = 'info', link = '/deals') => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      title,
      message,
      time: 'Just now',
      type,
      read: false,
      link,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // 1. LISTING ACTIONS
  const createListing = (listingData) => {
    const newListing = {
      id: `prod-${Date.now()}`,
      title: listingData.title,
      category: listingData.category || 'Marketplace',
      price: Number(listingData.price) || 0,
      originalRetailPrice: Number(listingData.originalRetailPrice) || Number(listingData.price) * 1.5,
      condition: listingData.condition || 'Gently Used',
      description: listingData.description || 'Campus student owned listing.',
      availability: 'AVAILABLE',
      pickupLocation: listingData.pickupLocation || 'Central Library (Ground Floor Lobby)',
      postedTime: 'Posted just now',
      timestamp: Date.now(),
      negotiable: listingData.negotiable ?? true,
      views: 1,
      chatsCount: 0,
      offersCount: 0,
      isGiveaway: listingData.price == 0,
      isRent: listingData.isRent || false,
      rentPeriod: listingData.rentPeriod || 'per day',
      images: listingData.images && listingData.images.length > 0 ? listingData.images : [
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
      ],
      seller: {
        id: user.id,
        name: user.name,
        department: user.department,
        isVerified: user.isVerified,
        verificationBadge: user.verificationBadge,
        rating: user.rating,
        reviewCount: user.reviewCount,
        completedDeals: user.dealsCompleted,
        memberSince: user.memberSince,
        fastResponder: true,
        responseRate: '10 min avg response',
      },
      tags: [listingData.title.toLowerCase().split(' ')].flat(),
    };

    setListings(prev => [newListing, ...prev]);
    showToast('Listing Published Successfully!', `"${newListing.title}" is now visible to campus.`);
    addNotification('Listing Live', `Your listing "${newListing.title}" is live on Campus Hustle.`, 'listing', '/marketplace');
    return newListing;
  };

  const updateListingAvailability = (listingId, newStatus) => {
    setListings(prev => prev.map(item => item.id === listingId ? { ...item, availability: newStatus } : item));
    showToast('Availability Updated', `Status changed to ${newStatus}`);
  };

  const deleteListing = (listingId) => {
    setListings(prev => prev.filter(item => item.id !== listingId));
    showToast('Listing Removed', 'Item has been deleted from your listings.');
  };

  const refreshListing = (listingId) => {
    setListings(prev => prev.map(item => item.id === listingId ? { ...item, postedTime: 'Posted just now', timestamp: Date.now() } : item));
    showToast('Listing Refreshed', 'Your listing was boosted to the top of campus feed.');
  };

  // 2. CHAT & NEGOTIATION WORKFLOW (CRITICAL)
  const sendChatMessage = (listingId, text, isCounter = false, amount = null) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'buyer',
      senderName: user.name,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCounter,
      amount,
    };

    setChatThreads(prev => ({
      ...prev,
      [listingId]: [...(prev[listingId] || []), newMsg]
    }));

    // Auto-reply simulation if counter offer from demo seller to keep interactive flow exciting
    if (amount && !isCounter) {
      setTimeout(() => {
        const sellerCounter = {
          id: `msg-${Date.now() + 1}`,
          sender: 'seller',
          senderName: 'Rohan Sharma',
          text: `Thanks for the offer! How about ₹${Math.round(amount * 1.15)}? We can meet at the Library lobby.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isCounter: true,
          amount: Math.round(amount * 1.15),
        };
        setChatThreads(prev => ({
          ...prev,
          [listingId]: [...(prev[listingId] || []), sellerCounter]
        }));
        showToast('Counter Offer Received', `Rohan Sharma countered with ₹${sellerCounter.amount}`);
        addNotification('Counter Offer Received', `Rohan Sharma countered ₹${sellerCounter.amount} on ${listingId}`, 'offer');
      }, 1200);
    }
  };

  const makeOffer = (listing, offerAmount, message = '') => {
    const existingDeal = deals.find(d => d.listingId === listing.id);
    const offerRecord = {
      from: 'buyer',
      amount: Number(offerAmount),
      message: message || `Offered ₹${offerAmount}`,
      timestamp: Date.now(),
    };

    let updatedDeal;
    if (existingDeal) {
      updatedDeal = {
        ...existingDeal,
        status: 'OFFER_MADE',
        agreedPrice: Number(offerAmount),
        offersHistory: [...existingDeal.offersHistory, offerRecord],
      };
      setDeals(prev => prev.map(d => d.id === existingDeal.id ? updatedDeal : d));
    } else {
      updatedDeal = {
        id: `deal-${Date.now()}`,
        listingId: listing.id,
        listingTitle: listing.title,
        originalPrice: listing.price,
        agreedPrice: Number(offerAmount),
        buyerId: user.id,
        buyerName: user.name,
        sellerId: listing.seller.id,
        sellerName: listing.seller.name,
        pickupLocation: listing.pickupLocation,
        status: 'OFFER_MADE',
        createdAt: Date.now(),
        offersHistory: [offerRecord],
      };
      setDeals(prev => [updatedDeal, ...prev]);
    }

    // Append to chat
    sendChatMessage(listing.id, message ? `I'd like to make an offer of ₹${offerAmount}: "${message}"` : `I'd like to make an offer of ₹${offerAmount}.`);
    
    // Update listing status to NEGOTIATING
    updateListingAvailability(listing.id, 'NEGOTIATING');
    showToast('Offer Sent!', `Offered ₹${offerAmount} to ${listing.seller.name}`);
    addNotification('Offer Sent', `You made an offer of ₹${offerAmount} for "${listing.title}"`, 'offer');

    return updatedDeal;
  };

  const counterOffer = (dealId, counterAmount, note = '') => {
    const deal = deals.find(d => d.id === dealId);
    if (!deal) return;

    const counterRecord = {
      from: 'seller',
      amount: Number(counterAmount),
      message: note || `Counter offer: ₹${counterAmount}`,
      timestamp: Date.now(),
    };

    const updated = {
      ...deal,
      agreedPrice: Number(counterAmount),
      status: 'COUNTER_OFFER',
      offersHistory: [...deal.offersHistory, counterRecord],
    };

    setDeals(prev => prev.map(d => d.id === dealId ? updated : d));
    
    // Push message to chat thread
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'seller',
      senderName: deal.sellerName,
      text: note || `Counter offer proposed: ₹${counterAmount}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCounter: true,
      amount: Number(counterAmount),
    };

    setChatThreads(prev => ({
      ...prev,
      [deal.listingId]: [...(prev[deal.listingId] || []), newMsg]
    }));

    showToast('Counter Offer Registered', `Countered at ₹${counterAmount}`);
    addNotification('Counter Offer Proposed', `New counter offer of ₹${counterAmount} on ${deal.listingTitle}`, 'offer');
  };

  const acceptDeal = (dealId) => {
    const deal = deals.find(d => d.id === dealId);
    if (!deal) return;

    const updated = {
      ...deal,
      status: 'DEAL_AGREED',
      agreedAt: Date.now(),
      offersHistory: [
        ...deal.offersHistory,
        { from: 'buyer', amount: deal.agreedPrice, message: `Deal agreed for ₹${deal.agreedPrice}!`, timestamp: Date.now() }
      ]
    };

    setDeals(prev => prev.map(d => d.id === dealId ? updated : d));
    updateListingAvailability(deal.listingId, 'RESERVED');

    // Add confirmation message to chat
    const confirmMsg = {
      id: `msg-${Date.now()}`,
      sender: 'system',
      senderName: 'Campus Hustle Deal Bot',
      text: `🎉 Deal agreed at ₹${deal.agreedPrice}! Scheduled pickup: ${deal.pickupLocation}.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSystem: true,
    };
    setChatThreads(prev => ({
      ...prev,
      [deal.listingId]: [...(prev[deal.listingId] || []), confirmMsg]
    }));

    showToast('Deal Agreed! 🎉', `Agreed at ₹${deal.agreedPrice}. View Deal Summary.`);
    addNotification('Deal Agreed!', `Deal locked for "${deal.listingTitle}" at ₹${deal.agreedPrice}.`, 'deal');
    setDealSummaryModal(updated);
  };

  const completeDeal = (dealId) => {
    const deal = deals.find(d => d.id === dealId);
    if (!deal) return;

    const updated = {
      ...deal,
      status: 'COMPLETED',
      completedAt: Date.now(),
    };

    setDeals(prev => prev.map(d => d.id === dealId ? updated : d));
    updateListingAvailability(deal.listingId, 'SOLD');

    // Update user stats
    setUser(prev => ({
      ...prev,
      dealsCompleted: prev.dealsCompleted + 1,
    }));

    showToast('Deal Completed! 🤝', 'Transaction finalized. Please rate the experience.');
    addNotification('Deal Completed', `Transaction for "${deal.listingTitle}" marked completed.`, 'deal');
    
    // Open review modal
    setReviewModalDeal(updated);
  };

  const submitReview = (dealId, rating, comment) => {
    setDeals(prev => prev.map(d => {
      if (d.id === dealId) {
        return {
          ...d,
          review: {
            rating,
            comment,
            date: 'Today',
          }
        };
      }
      return d;
    }));

    showToast('Review Submitted! ★★★★★', 'Your trusted feedback strengthens campus reputation.');
    setReviewModalDeal(null);
  };

  const cancelDeal = (dealId, reason = 'Mutual cancellation') => {
    const deal = deals.find(d => d.id === dealId);
    if (!deal) return;

    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, status: 'CANCELLED', cancelReason: reason } : d));
    updateListingAvailability(deal.listingId, 'AVAILABLE');
    showToast('Deal Cancelled', 'Item availability reverted to Available.');
  };

  // 3. SAVED ITEMS & SEARCHES
  const toggleSaveItem = (listingId) => {
    if (savedItems.includes(listingId)) {
      setSavedItems(prev => prev.filter(id => id !== listingId));
      showToast('Removed from Saved Items');
    } else {
      setSavedItems(prev => [...prev, listingId]);
      showToast('Saved to Wishlist!', 'You can view this item in your Dashboard.');
    }
  };

  const addSavedSearch = (query, category = 'All') => {
    if (!query) return;
    const newSearch = {
      id: `ss-${Date.now()}`,
      query,
      category,
      count: 1,
      timestamp: Date.now(),
    };
    setSavedSearches(prev => [newSearch, ...prev]);
    showToast('Search Alert Saved', `We will notify you when new "${query}" items appear.`);
  };

  const removeSavedSearch = (id) => {
    setSavedSearches(prev => prev.filter(s => s.id !== id));
    showToast('Search Alert Removed');
  };

  // 4. CAMPUS RIDES
  const bookRide = (route) => {
    const newRide = {
      id: `ride-${Date.now()}`,
      routeId: route.id,
      from: route.from,
      to: route.to,
      fare: route.fare,
      distance: route.distance,
      estimatedTime: route.estimatedTime,
      provider: route.provider,
      status: 'REQUESTED',
      bookedAt: Date.now(),
    };
    setActiveRide(newRide);
    showToast('Ride Requested 🛵', `Connecting with approved rider ${route.provider.name}...`);
    addNotification('Ride Requested', `Ride from ${route.from} to ${route.to} requested.`, 'ride');

    // Simulate provider accepting in 1.5s
    setTimeout(() => {
      setActiveRide(prev => prev ? { ...prev, status: 'ACCEPTED' } : null);
      showToast('Rider Accepted! 🛵', `${route.provider.name} accepted your ride request.`);
      addNotification('Rider Accepted', `${route.provider.name} is heading to pickup point.`, 'ride');
    }, 1800);
  };

  const progressRideStatus = (status) => {
    setActiveRide(prev => prev ? { ...prev, status } : null);
    if (status === 'COMPLETED') {
      showToast('Ride Completed! 🏁', 'You have arrived safely at your destination.');
      addNotification('Ride Completed', 'Ride completed. Please rate your campus rider.', 'ride');
    }
  };

  const cancelActiveRide = () => {
    setActiveRide(null);
    showToast('Ride Cancelled', 'Your campus ride booking has been cancelled.');
  };

  // 5. FOOD ORDERS
  const placeFoodOrder = (item, quantity = 1) => {
    const newOrder = {
      id: `ord-${Date.now()}`,
      item: item.name,
      quantity,
      total: item.price * quantity,
      pickupLocation: item.pickupLocation,
      status: 'RECEIVED',
      timestamp: Date.now(),
      provider: item.providerName,
      prepTime: item.prepTime,
    };
    setFoodOrders(prev => [newOrder, ...prev]);
    showToast('Food Order Placed! 🥪', `Pre-order confirmed at ${item.providerName}.`);
    addNotification('Order Confirmed', `${item.name} order sent to ${item.providerName}.`, 'food', '/food');

    // Progress status after 3s
    setTimeout(() => {
      setFoodOrders(prev => prev.map(o => o.id === newOrder.id ? { ...o, status: 'PREPARING' } : o));
    }, 3000);
  };

  // 6. STUDENT SERVICE REQUEST
  const requestService = (service, details) => {
    const newReq = {
      id: `sreq-${Date.now()}`,
      serviceId: service.id,
      title: service.title,
      provider: service.provider,
      status: 'REQUESTED',
      details: details || 'Service requested via Campus Hustle.',
      charge: service.rate,
      timestamp: Date.now(),
    };
    setServiceRequests(prev => [newReq, ...prev]);
    showToast('Service Requested! 🛠️', `Request sent to verified student ${service.provider}.`);
    addNotification('Service Requested', `Sent request for "${service.title}" to ${service.provider}.`, 'service', '/services');
  };

  // 7. SAFETY & ADMIN REPORTS
  const submitReport = ({ listingId, reason, details }) => {
    const listing = listings.find(l => l.id === listingId);
    const newRep = {
      id: `rep-${Date.now()}`,
      listingId,
      itemTitle: listing ? listing.title : 'Listing item',
      reportedBy: `${user.name} (${user.department})`,
      reason,
      details,
      status: 'PENDING',
      date: 'Just now',
    };
    setReports(prev => [newRep, ...prev]);
    showToast('Report Submitted to Admin', 'Our student safety moderators will review this listing shortly.');
  };

  const resolveReport = (reportId) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'RESOLVED' } : r));
    showToast('Report Resolved', 'Moderation record marked resolved.');
  };

  const hideListingAdmin = (listingId) => {
    setListings(prev => prev.map(l => l.id === listingId ? { ...l, availability: 'CLOSED', isHiddenByAdmin: true } : l));
    showToast('Listing Hidden by Admin', 'Listing removed from public discovery due to policy violation.');
  };

  const restoreListingAdmin = (listingId) => {
    setListings(prev => prev.map(l => l.id === listingId ? { ...l, availability: 'AVAILABLE', isHiddenByAdmin: false } : l));
    showToast('Listing Restored', 'Listing restored back to public discovery.');
  };

  // 8. VERIFICATION SIMULATOR
  const verifyIdentity = (email, rollNumber, department) => {
    setUser(prev => ({
      ...prev,
      email: email || prev.email,
      department: department || prev.department,
      isVerified: true,
      verificationBadge: 'Campus Verified',
    }));
    showToast('Campus Identity Verified! ✓', 'Official student credentials confirmed with verified badge.');
    addNotification('Verification Success', 'You now hold official Campus Verified status.', 'verification', '/profile');
    setVerifyModalOpen(false);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const resetAllDataToDefault = () => {
    localStorage.clear();
    setUser(INITIAL_USER);
    setListings(INITIAL_LISTINGS);
    setDeals(INITIAL_DEALS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setSavedItems(['prod-1', 'prod-3']);
    setReports(INITIAL_REPORTS);
    setActiveRide(null);
    showToast('Demo Data Reset', 'Platform restored to initial sample records.');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        listings,
        setListings,
        deals,
        notifications,
        savedItems,
        savedSearches,
        reports,
        activeRide,
        foodOrders,
        serviceRequests,
        chatThreads,
        selectedListing,
        setSelectedListing,
        quickSellOpen,
        setQuickSellOpen,
        chatListing,
        setChatListing,
        offerModalListing,
        setOfferModalListing,
        dealSummaryModal,
        setDealSummaryModal,
        reviewModalDeal,
        setReviewModalDeal,
        whatsAppModalData,
        setWhatsAppModalData,
        verifyModalOpen,
        setVerifyModalOpen,
        judgeTourStep,
        setJudgeTourStep,
        toastMessage,
        showToast,
        createListing,
        updateListingAvailability,
        deleteListing,
        refreshListing,
        sendChatMessage,
        makeOffer,
        counterOffer,
        acceptDeal,
        completeDeal,
        submitReview,
        cancelDeal,
        toggleSaveItem,
        addSavedSearch,
        removeSavedSearch,
        bookRide,
        progressRideStatus,
        cancelActiveRide,
        placeFoodOrder,
        requestService,
        submitReport,
        resolveReport,
        hideListingAdmin,
        restoreListingAdmin,
        verifyIdentity,
        markAllNotificationsRead,
        resetAllDataToDefault,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
