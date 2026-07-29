import React, { useState } from 'react';
import { Camera, X, Sparkles, Maximize2 } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Photography' },
    { id: 'hall', label: 'Dining Hall' },
    { id: 'chef', label: 'Chef at Work' },
    { id: 'steak', label: 'Signature Steaks' },
    { id: 'cellar', label: 'Wine Cellar' },
    { id: 'dessert', label: 'Elegant Desserts' },
    { id: 'cocktails', label: 'Cocktail Bar' },
    { id: 'private', label: 'Private Suites' },
    { id: 'terrace', label: 'Outdoor Terrace' },
    { id: 'table', label: 'Table Settings' },
  ];

  const filteredGallery = GALLERY_ITEMS.filter((item) =>
    activeCategory === 'all' ? true : item.category === activeCategory
  );

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070606] text-[#e8e2d8] relative border-t border-[#1c1916]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181512] border border-[#d4af37]/25 text-[#d4af37] text-xs font-sans-luxury tracking-[0.2em] uppercase mb-4">
            <Camera className="w-3.5 h-3.5" />
            Visual Atmosphere
          </div>
          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-[#f3ebdc] tracking-wide mb-4">
            The Maison Noir Gallery
          </h2>
          <p className="font-playfair text-lg text-[#d4ceb8] italic">
            "A showcase of refined spaces, culinary craftsmanship, and timeless ambience"
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-sm text-xs font-sans-luxury tracking-wider uppercase transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-[#d4af37] text-[#0b0a0a] font-bold shadow-md'
                  : 'bg-[#12100f] text-[#a39d89] border border-[#231f1a] hover:text-[#e8e2d8]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="group relative h-80 overflow-hidden rounded-sm border border-[#26221d] cursor-pointer bg-[#12100f] shadow-xl"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070606] via-[#070606]/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold block mb-1">
                  Maison Noir Photography
                </span>
                <h3 className="font-serif-display text-2xl text-[#f3ebdc] font-medium">{item.title}</h3>
                <p className="text-xs text-[#a39d89] mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.caption}
                </p>
              </div>

              <div className="absolute top-4 right-4 p-2 rounded-full bg-[#0b0a0a]/70 backdrop-blur-md text-[#d4af37] border border-[#d4af37]/30 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxItem && (
          <div className="fixed inset-0 z-50 bg-[#070606]/95 backdrop-blur-lg flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full bg-[#12100f] border border-[#3a3229] rounded-sm overflow-hidden shadow-2xl">
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 z-10 p-2 text-[#f3ebdc] bg-[#0b0a0a]/80 rounded-full border border-[#d4af37]/30 hover:text-[#d4af37]"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="max-h-[70vh] w-full overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={lightboxItem.image}
                  alt={lightboxItem.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>

              <div className="p-6 bg-[#12100f] border-t border-[#231f1a]">
                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold block mb-1">
                  Maison Noir • Manhattan
                </span>
                <h3 className="font-serif-display text-3xl text-[#f3ebdc]">{lightboxItem.title}</h3>
                <p className="text-xs text-[#a39d89] mt-2 leading-relaxed">{lightboxItem.caption}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
