import React, { useState } from 'react';
import { Award, Compass, Wine, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_INFO, RESTAURANT_FEATURES } from '../data/restaurantData';

import heroDiningHallImg from '../assets/images/hero_dining_hall_1785160085649.jpg';
import wineCellarImg from '../assets/images/wine_cellar_1785160130513.jpg';

export const BrandStory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hall' | 'cellar' | 'terrace'>('hall');

  const atmosphereData = {
    hall: {
      title: "The Main Dining Hall",
      desc: "An architectural haven of dark European walnut, brushed gold accents, and hand-blown crystal chandeliers. Designed for intimate conversations and grand celebrations alike.",
      capacity: "80 Guests",
      vibe: "Warm Amber Noir • Grand Steinway Piano",
      image: heroDiningHallImg
    },
    cellar: {
      title: "The Imperial Wine Cellar",
      desc: "Surrounded by over 1,500 floor-to-ceiling vintage bottles. Temperature and humidity-controlled for optimal preservation, creating an unmatched sommelier dining atmosphere.",
      capacity: "16 Guests (Private)",
      vibe: "Subterranean Gold • Glass Enclosed",
      image: wineCellarImg
    },
    terrace: {
      title: "The Heated Rooftop Terrace",
      desc: "Enclosed glass outdoor salon offering breathtaking views of Madison Avenue and the Manhattan skyline. Equipped with radiant heating for year-round luxury.",
      capacity: "24 Guests",
      vibe: "Skyline Sunset • All-Weather Glass",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80"
    }
  };

  const currentAtmosphere = atmosphereData[activeTab];

  return (
    <section id="story" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0b0a0a] text-[#e8e2d8] relative overflow-hidden border-t border-[#1c1916]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181512] border border-[#d4af37]/25 text-[#d4af37] text-xs font-sans-luxury tracking-[0.2em] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Our Philosophy
          </div>
          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-[#f3ebdc] tracking-wide mb-6">
            Where Culinary Art Meets Timeless Elegance
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-6" />
          <p className="font-playfair text-lg text-[#d4ceb8] leading-relaxed italic">
            "Every dish is designed as a work of art, combining exceptional flavours, elegant presentation, and golden-standard hospitality."
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          {/* Text Column */}
          <div className="lg:col-span-7 space-y-6 text-[#c7c0af] leading-relaxed text-sm sm:text-base">
            <h3 className="font-serif-display text-3xl text-[#f3ebdc] tracking-wider mb-2">
              Established 2016 in Manhattan
            </h3>
            <p>
              Maison Noir is an award-winning luxury fine dining establishment situated on Manhattan's prestigious Madison Avenue. Inspired by contemporary French gastronomy with modern Japanese influences, Maison Noir offers an unforgettable culinary journey crafted with seasonal ingredients sourced from local organic farms and premium international suppliers.
            </p>
            <p>
              The restaurant provides an intimate atmosphere featuring sophisticated dark interiors, warm ambient lighting, handcrafted furniture, and an extensive wine collection curated by expert sommeliers.
            </p>
            <p>
              Maison Noir serves business executives, luxury travellers, couples celebrating special occasions, and food enthusiasts seeking a world-class dining experience.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#201d19]">
              <div className="p-4 bg-[#12100f] border border-[#26221d] rounded-sm text-center">
                <span className="font-serif-display text-3xl text-[#d4af37] block font-bold">2016</span>
                <span className="text-[10px] uppercase tracking-widest text-[#8c8573]">Established</span>
              </div>
              <div className="p-4 bg-[#12100f] border border-[#26221d] rounded-sm text-center">
                <span className="font-serif-display text-3xl text-[#d4af37] block font-bold">120</span>
                <span className="text-[10px] uppercase tracking-widest text-[#8c8573]">Guest Capacity</span>
              </div>
              <div className="p-4 bg-[#12100f] border border-[#26221d] rounded-sm text-center">
                <span className="font-serif-display text-3xl text-[#d4af37] block font-bold">1,500+</span>
                <span className="text-[10px] uppercase tracking-widest text-[#8c8573]">Wine Vintages</span>
              </div>
              <div className="p-4 bg-[#12100f] border border-[#26221d] rounded-sm text-center">
                <span className="font-serif-display text-3xl text-[#d4af37] block font-bold">$$$$</span>
                <span className="text-[10px] uppercase tracking-widest text-[#8c8573]">Fine Dining</span>
              </div>
            </div>
          </div>

          {/* Interactive Atmosphere Explorer */}
          <div className="lg:col-span-5 bg-[#12100f] border border-[#2b2620] rounded-sm p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#231f1a] mb-6">
              <span className="text-xs uppercase tracking-widest font-sans-luxury text-[#d4af37] font-semibold flex items-center gap-1.5">
                <Compass className="w-4 h-4" />
                Explore Atmospheres
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('hall')}
                  className={`px-3 py-1 text-[11px] font-semibold rounded uppercase tracking-wider transition-colors ${
                    activeTab === 'hall' ? 'bg-[#d4af37] text-[#0b0a0a]' : 'bg-[#1e1b17] text-[#a39d89] hover:text-[#e8e2d8]'
                  }`}
                >
                  Main Hall
                </button>
                <button
                  onClick={() => setActiveTab('cellar')}
                  className={`px-3 py-1 text-[11px] font-semibold rounded uppercase tracking-wider transition-colors ${
                    activeTab === 'cellar' ? 'bg-[#d4af37] text-[#0b0a0a]' : 'bg-[#1e1b17] text-[#a39d89] hover:text-[#e8e2d8]'
                  }`}
                >
                  Wine Cellar
                </button>
                <button
                  onClick={() => setActiveTab('terrace')}
                  className={`px-3 py-1 text-[11px] font-semibold rounded uppercase tracking-wider transition-colors ${
                    activeTab === 'terrace' ? 'bg-[#d4af37] text-[#0b0a0a]' : 'bg-[#1e1b17] text-[#a39d89] hover:text-[#e8e2d8]'
                  }`}
                >
                  Terrace
                </button>
              </div>
            </div>

            {/* Atmosphere Card Content */}
            <div className="space-y-4 animate-fade-in">
              <div className="relative h-60 w-full overflow-hidden rounded-sm border border-[#2b2620]">
                <img
                  src={currentAtmosphere.image}
                  alt={currentAtmosphere.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-[#0b0a0a]/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] text-[#d4af37] border border-[#d4af37]/30 uppercase tracking-widest">
                  {currentAtmosphere.capacity}
                </div>
              </div>

              <div>
                <h4 className="font-serif-display text-xl text-[#f3ebdc] mb-2">{currentAtmosphere.title}</h4>
                <p className="text-xs text-[#a39d89] leading-relaxed mb-3">{currentAtmosphere.desc}</p>
                <p className="text-[11px] text-[#d4af37] font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#d4af37]" />
                  Acoustic Ambience: {currentAtmosphere.vibe}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features & Key Amenities Grid */}
        <div className="pt-12 border-t border-[#1f1c18]">
          <h3 className="font-serif-display text-2xl text-center text-[#f3ebdc] tracking-wider mb-10 uppercase">
            Signature Maison Noir Features
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RESTAURANT_FEATURES.map((feature, idx) => (
              <div
                key={idx}
                className="p-5 bg-[#12100f] border border-[#24201b] hover:border-[#d4af37]/40 rounded-sm transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-serif-display text-lg text-[#f3ebdc] group-hover:text-[#d4af37] transition-colors mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-[#8c8573] leading-normal">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
