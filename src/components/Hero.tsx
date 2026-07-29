import React from 'react';
import { Calendar, Utensils, Star, Clock, ChevronDown } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useLanguage } from '../context/LanguageContext';
import heroDiningHallImg from '../assets/images/hero_dining_hall_1785160085649.jpg';

interface HeroProps {
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation }) => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#070606]">
      {/* Background Image with Cinematic Noir Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroDiningHallImg}
          alt="Maison Noir Dining Hall"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-110 transform transition-transform duration-10000 ease-out animate-pulse-slow"
        />
        {/* Radial Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a0a] via-[#0b0a0a]/60 to-[#0b0a0a]/80" />
        <div className="absolute inset-0 bg-radial-vignette opacity-70" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Top Michelin Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181512]/80 backdrop-blur-md border border-[#d4af37]/30 text-[#d4af37] text-xs font-sans-luxury tracking-[0.2em] uppercase mb-8 shadow-xl animate-fade-in">
          <Star className="w-3.5 h-3.5 fill-[#d4af37]" />
          <span>{t('michelinDistinction')} • Est. 2016</span>
          <Star className="w-3.5 h-3.5 fill-[#d4af37]" />
        </div>

        {/* Restaurant Main Title */}
        <h1 className="font-serif-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.18em] font-light text-[#f8f3ea] uppercase mb-4 drop-shadow-2xl">
          Maison Noir
        </h1>

        {/* Tagline */}
        <p className="font-playfair italic text-xl sm:text-2xl md:text-3xl text-[#d4af37] max-w-3xl mb-6 font-normal tracking-wide">
          "{t('tagline')}"
        </p>

        {/* Cuisine & Location detail */}
        <p className="text-xs sm:text-sm font-sans-luxury tracking-[0.3em] uppercase text-[#a39d89] mb-10 max-w-xl">
          {t('cuisineLocation')}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto mb-16">
          <button
            onClick={onOpenReservation}
            className="btn-gold w-full sm:w-auto px-8 py-4 rounded-sm font-sans-luxury text-xs font-bold tracking-[0.25em] uppercase flex items-center justify-center gap-3"
          >
            <Calendar className="w-4 h-4 text-[#0b0a0a]" />
            <span>{t('reserveTable')}</span>
          </button>

          <a
            href="#menu"
            className="btn-outline w-full sm:w-auto px-8 py-4 rounded-sm font-sans-luxury text-xs font-semibold tracking-[0.2em] uppercase flex items-center justify-center gap-3 group"
          >
            <Utensils className="w-4 h-4 text-[#d4af37] group-hover:text-[#0b0a0a] transition-colors" />
            <span>{t('signatureMenu')}</span>
          </a>
        </div>

        {/* Status Pill & Highlights Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 w-full max-w-4xl py-5 px-6 rounded-lg noir-glass border border-[#d4af37]/15">
          <div className="flex flex-col items-center text-center">
            <span className="text-[10px] uppercase tracking-widest text-[#8c8573]">{t('dressCode')}</span>
            <span className="text-xs font-serif-display text-[#f3ebdc] mt-0.5 font-medium">{RESTAURANT_INFO.dressCode}</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-[10px] uppercase tracking-widest text-[#8c8573]">{t('seatingCapacity')}</span>
            <span className="text-xs font-serif-display text-[#f3ebdc] mt-0.5 font-medium">{RESTAURANT_INFO.capacity} Guests</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-[10px] uppercase tracking-widest text-[#8c8573]">{t('privateDiningAvail')}</span>
            <span className="text-xs font-serif-display text-[#f3ebdc] mt-0.5 font-medium">Available</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-[10px] uppercase tracking-widest text-[#8c8573]">{t('openingHours')}</span>
            <span className="text-xs font-serif-display text-[#d4af37] mt-0.5 font-medium flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#d4af37]" />
              {t('hours')}
            </span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#story"
          className="mt-12 text-[#a39d89] hover:text-[#d4af37] transition-colors animate-bounce flex flex-col items-center gap-1"
          aria-label="Scroll down"
        >
          <span className="text-[9px] tracking-widest uppercase">{t('scrollTop')}</span>
          <ChevronDown className="w-4 h-4 text-[#d4af37]" />
        </a>
      </div>
    </section>
  );
};
