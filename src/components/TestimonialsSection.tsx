import React from 'react';
import { Star, Quote, Award, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data/restaurantData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070606] text-[#e8e2d8] relative border-t border-[#1c1916]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181512] border border-[#d4af37]/25 text-[#d4af37] text-xs font-sans-luxury tracking-[0.2em] uppercase mb-4">
            <Quote className="w-3.5 h-3.5" />
            Guest Acclaim
          </div>
          <h2 className="font-serif-display text-4xl sm:text-5xl text-[#f3ebdc] tracking-wide mb-4">
            Words of Appreciation
          </h2>
          <p className="font-playfair text-lg text-[#d4ceb8] italic">
            "Reviews from Michelin critics, culinary enthusiasts, and valued patrons"
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="p-8 bg-[#12100f] border border-[#24201b] hover:border-[#d4af37]/50 rounded-sm relative transition-all duration-300 shadow-xl flex flex-col justify-between group"
            >
              <Quote className="w-8 h-8 text-[#d4af37]/20 absolute top-6 right-6 group-hover:text-[#d4af37]/40 transition-colors" />

              <div>
                {/* 5 Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                  ))}
                </div>

                <p className="font-playfair text-base sm:text-lg text-[#f3ebdc] italic leading-relaxed mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#1e1b17] flex justify-between items-end">
                <div>
                  <h4 className="font-serif-display text-xl text-[#f3ebdc] font-medium">{item.name}</h4>
                  <p className="text-xs text-[#8c8573] mt-0.5">{item.role}</p>
                </div>
                <span className="text-[10px] text-[#d4af37] uppercase tracking-wider font-semibold">
                  {item.source}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Michelin Guide Quote Banner */}
        <div className="mt-16 p-8 bg-[#12100f] border border-[#d4af37]/30 rounded-sm text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-bl-full pointer-events-none" />
          <Award className="w-8 h-8 text-[#d4af37] mx-auto mb-3" />
          <p className="font-serif-display text-2xl text-[#f3ebdc] italic leading-relaxed">
            "A masterclass in culinary synthesis. Chef Alexandre Laurent seamlessly weaves the precision of Parisian technique with the poetic simplicity of Japanese seasonality."
          </p>
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mt-4 block">
            — The Michelin Guide Inspection Review
          </span>
        </div>
      </div>
    </section>
  );
};
