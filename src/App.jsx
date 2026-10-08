import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Toast from './components/common/Toast';
import JudgeTourModal from './components/common/JudgeTourModal';
import WhatsAppBridgeModal from './components/common/WhatsAppBridgeModal';
import VerifyIdentityModal from './components/common/VerifyIdentityModal';

import HomeView from './components/home/HomeView';
import MarketplaceView from './components/marketplace/MarketplaceView';
import ListingDetailsModal from './components/marketplace/ListingDetailsModal';
import QuickSellModal from './components/marketplace/QuickSellModal';
import MakeOfferModal from './components/marketplace/MakeOfferModal';
import DealSummaryModal from './components/marketplace/DealSummaryModal';
import ReviewModal from './components/marketplace/ReviewModal';
import ListingChatModal from './components/chat/ListingChatModal';

import CampusFoodView from './components/food/CampusFoodView';
import CampusRideView from './components/rides/CampusRideView';
import StudentServicesView from './components/services/StudentServicesView';
import GiveAwayView from './components/community/GiveAwayView';
import RentBorrowView from './components/community/RentBorrowView';
import CampusMapView from './components/community/CampusMapView';
import OpportunitiesView from './components/community/OpportunitiesView';
import DashboardView from './components/dashboard/DashboardView';
import SafetyCenterView from './components/safety/SafetyCenterView';
import AdminView from './components/admin/AdminView';

function AppContent() {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-900 selection:text-white">
      {/* Global Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'marketplace' && <MarketplaceView />}
        {activeTab === 'food' && <CampusFoodView />}
        {activeTab === 'rides' && <CampusRideView />}
        {activeTab === 'services' && <StudentServicesView />}
        {activeTab === 'giveaway' && <GiveAwayView />}
        {activeTab === 'rent' && <RentBorrowView />}
        {activeTab === 'map' && <CampusMapView />}
        {activeTab === 'opportunities' && <OpportunitiesView />}
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'safety' && <SafetyCenterView />}
        {activeTab === 'admin' && <AdminView />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Modals */}
      <ListingDetailsModal />
      <QuickSellModal />
      <ListingChatModal />
      <MakeOfferModal />
      <DealSummaryModal />
      <ReviewModal />
      <WhatsAppBridgeModal />
      <VerifyIdentityModal />
      <JudgeTourModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
