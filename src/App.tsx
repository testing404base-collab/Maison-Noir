import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandStory } from './components/BrandStory';
import { ChefSection } from './components/ChefSection';
import { MenuSection } from './components/MenuSection';
import { WineCellar } from './components/WineCellar';
import { PrivateEvents } from './components/PrivateEvents';
import { GallerySection } from './components/GallerySection';
import { GiftVouchers } from './components/GiftVouchers';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { FloatingReserveButton } from './components/FloatingReserveButton';
import { AuthModal } from './components/AuthModal';
import { MemberDashboard } from './components/MemberDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { Currency } from './types';

function MainApp() {
  const [reservationOpen, setReservationOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [pendingReservation, setPendingReservation] = useState(false);
  const [currency, setCurrency] = useState<Currency>('USD');

  const { currentUser } = useAuth();

  // Initialize Lenis Ultra-Smooth Butter Momentum Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Compulsory login check for reservation
  const handleOpenReservation = () => {
    if (!currentUser) {
      setPendingReservation(true);
      setAuthModalOpen(true);
    } else {
      setReservationOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    if (pendingReservation) {
      setPendingReservation(false);
      setReservationOpen(true);
    } else {
      setDashboardOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0a0a] text-[#e8e2d8] font-sans-luxury selection:bg-[#d4af37]/30 selection:text-[#f3ebdc] relative">
      {/* Custom Hardware-Accelerated Lag-Free Cursor */}
      <CustomCursor />

      {/* Main Header */}
      <Navbar
        onOpenReservation={handleOpenReservation}
        onOpenAuth={() => {
          setPendingReservation(false);
          setAuthModalOpen(true);
        }}
        onOpenDashboard={() => setDashboardOpen(true)}
        currency={currency}
        onCurrencyChange={setCurrency}
      />

      {/* Hero Banner */}
      <Hero onOpenReservation={handleOpenReservation} />

      {/* Brand Philosophy & Story */}
      <BrandStory />

      {/* Executive Chef Feature */}
      <ChefSection />

      {/* Interactive Signature Menu */}
      <MenuSection
        currency={currency}
        onOpenReservation={handleOpenReservation}
      />

      {/* Vintage Wine & Japanese Whisky Cellar */}
      <WineCellar
        currency={currency}
        onOpenReservation={handleOpenReservation}
      />

      {/* Private Dining Rooms & Events */}
      <PrivateEvents />

      {/* Photography Gallery */}
      <GallerySection />

      {/* Digital Gastronomic Vouchers */}
      <GiftVouchers currency={currency} />

      {/* Verified Guest Reviews & Acclaim */}
      <TestimonialsSection />

      {/* Footer & Contact */}
      <Footer onOpenReservation={handleOpenReservation} />

      {/* Fixed Floating Reservation Button with Wave Ripples */}
      <FloatingReserveButton onClick={handleOpenReservation} />

      {/* Table Reservation Flow Modal */}
      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
      />

      {/* Sign In & Register Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => {
          setAuthModalOpen(false);
          setPendingReservation(false);
        }}
        onSuccess={handleAuthSuccess}
      />

      {/* Member Dashboard */}
      {currentUser?.role === 'member' && (
        <MemberDashboard
          isOpen={dashboardOpen}
          onClose={() => setDashboardOpen(false)}
          onOpenReservation={handleOpenReservation}
        />
      )}

      {/* Admin Single-Session Dashboard */}
      {currentUser?.role === 'admin' && (
        <AdminDashboard
          isOpen={dashboardOpen}
          onClose={() => setDashboardOpen(false)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </LanguageProvider>
  );
}
