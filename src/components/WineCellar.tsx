import React, { useState } from 'react';
import { Wine, Search, GlassWater } from 'lucide-react';
import { Currency } from '../types';
import { formatPrice } from '../lib/currency';
import wineCellarImg from '../assets/images/wine_cellar_1785160130513.jpg';

interface WineCellarProps {
  currency: Currency;
  onOpenReservation: () => void;
}

export const WineCellar: React.FC<WineCellarProps> = ({ currency, onOpenReservation }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'wine' | 'whisky' | 'cocktail'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const cellarCollection = [
    {
      id: "wc1",
      name: "Château Lafite Rothschild 2010",
      category: "wine",
      type: "Pauillac Premier Grand Cru Classé",
      priceGBP: 180,
      bottlePriceGBP: 1250,
      region: "Bordeaux, France",
      notes: "Blackcurrant, cedarwood, graphite, and silky velvet tannic backbone.",
      pairing: "A5 Miyazaki Wagyu Tenderloin"
    },
    {
      id: "wc2",
      name: "Dom Pérignon Vintage 2013 Champagne",
      category: "wine",
      type: "Brut Prestige Cuvée",
      priceGBP: 45,
      bottlePriceGBP: 380,
      region: "Épernay, Champagne, France",
      notes: "Eucalyptus, toasted brioche, white peach, and fine mineral effervescence.",
      pairing: "Truffle Burrata & Oscietra Caviar"
    },
    {
      id: "wc3",
      name: "Yamazaki 18 Year Single Malt",
      category: "whisky",
      type: "Japanese Single Malt Whisky",
      priceGBP: 65,
      bottlePriceGBP: 1100,
      region: "Osaka Prefecture, Japan",
      notes: "Mizunara oak aging, dark cherry, espresso bean, and long subtle smoke finish.",
      pairing: "Valrhona Dark Chocolate Sphere"
    },
    {
      id: "wc4",
      name: "Hibiki 21 Year Japanese Whisky",
      category: "whisky",
      type: "Suntory Blended Whisky",
      priceGBP: 95,
      bottlePriceGBP: 1800,
      region: "Kyoto / Aichi, Japan",
      notes: "Sweet dried fruit, sandalwood, blackberry jam, and deep honeyed spice.",
      pairing: "A5 Wagyu & Matsutake Mushroom"
    },
    {
      id: "wc5",
      name: "Noir Velvet Signature Cocktail",
      category: "cocktail",
      type: "Artisanal Smoked Cocktail",
      priceGBP: 26,
      bottlePriceGBP: 26,
      region: "Maison Noir Mixology Bar",
      notes: "Hibiki Harmony, black truffle infusion, cherrywood smoke, and 24K gold ice sphere.",
      pairing: "Bluefin Tuna Tartare"
    },
    {
      id: "wc6",
      name: "Dassai 23 Junmai Daiginjo Sake",
      category: "wine",
      type: "Ultra-Premium Junmai Daiginjo Sake",
      priceGBP: 32,
      bottlePriceGBP: 220,
      region: "Yamaguchi, Japan",
      notes: "Polished to 23% rice grain. Aromas of white grapes, melon, and pure spring water.",
      pairing: "Saikyo Miso Black Cod"
    }
  ];

  const filteredCollection = cellarCollection.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.notes.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="wine" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070606] text-[#e8e2d8] relative border-t border-[#1c1916]">
      <div className="max-w-7xl mx-auto">
        {/* Banner with Cellar Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 relative">
            <div className="overflow-hidden rounded-sm border border-[#2d2822] shadow-2xl relative">
              <img
                src={wineCellarImg}
                alt="Maison Noir Wine Cellar"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] object-cover filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070606] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#0d0c0b]/90 backdrop-blur-md rounded border border-[#d4af37]/30 text-xs">
                <span className="text-[#d4af37] font-semibold uppercase tracking-wider block">
                  The Master Sommelier Vault
                </span>
                <p className="text-[#a39d89] mt-0.5">1,500+ Rare Vintages & Rare Japanese Whiskies</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181512] border border-[#d4af37]/25 text-[#d4af37] text-xs font-sans-luxury tracking-[0.2em] uppercase">
              <Wine className="w-3.5 h-3.5" />
              Sommelier Cellar Collection
            </div>
            <h2 className="font-serif-display text-4xl sm:text-5xl text-[#f3ebdc] tracking-wide">
              Curated Vintage Cellar & Japanese Whiskies
            </h2>
            <p className="text-sm sm:text-base text-[#c7c0af] leading-relaxed">
              Supervised by Master Sommelier Jean-Luc Moreau, Maison Noir houses an extraordinary inventory of grand crus from Bordeaux, Burgundy, and Champagne alongside rare single-barrel Japanese whiskies directly imported from Kyoto and Osaka.
            </p>

            {/* Quick Search & Filters */}
            <div className="space-y-4 pt-2">
              <div className="relative">
                <Search className="w-4 h-4 text-[#8c8573] absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search wine vintage, region, or tasting note..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#12100f] border border-[#2a251f] rounded-sm text-xs text-[#f3ebdc] focus:outline-none focus:border-[#d4af37] transition-colors"
                />
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  { id: 'all', label: 'All Vault Items' },
                  { id: 'wine', label: 'Vintage Wines & Champagne' },
                  { id: 'whisky', label: 'Japanese Whisky' },
                  { id: 'cocktail', label: 'Signature Cocktails' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as any)}
                    className={`px-3 py-1.5 rounded-sm font-semibold uppercase tracking-wider transition-all ${
                      activeCategory === cat.id ? 'btn-gold' : 'btn-dark'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCollection.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-[#12100f] border border-[#24201b] hover:border-[#d4af37]/60 rounded-sm transition-all duration-300 hover:-translate-y-1 group space-y-3"
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold bg-[#1a1a14] px-2 py-0.5 rounded border border-[#2a251f]">
                  {item.type}
                </span>
                <span className="text-xs text-[#8c8573]">{item.region}</span>
              </div>

              <h3 className="font-serif-display text-2xl text-[#f3ebdc] group-hover:text-[#d4af37] transition-colors">
                {item.name}
              </h3>

              <p className="text-xs text-[#a39d89] leading-relaxed font-light italic">
                "{item.notes}"
              </p>

              <div className="pt-3 border-t border-[#1e1b17] flex justify-between items-center text-xs">
                <div>
                  <span className="text-[#8c8573] text-[10px] uppercase block">Pour / Glass</span>
                  <span className="font-serif-display text-xl text-[#d4af37] font-semibold">
                    {formatPrice(item.priceGBP, currency)}
                  </span>
                </div>
                {item.bottlePriceGBP > item.priceGBP && (
                  <div className="text-right">
                    <span className="text-[#8c8573] text-[10px] uppercase block">Full Bottle</span>
                    <span className="text-sm text-[#f3ebdc] font-medium">
                      {formatPrice(item.bottlePriceGBP, currency)}
                    </span>
                  </div>
                )}
              </div>

              <div className="text-[11px] text-[#8c8573] pt-1 flex items-center gap-1.5">
                <GlassWater className="w-3 h-3 text-[#d4af37]" />
                Pairing: <span className="text-[#d4ceb8] font-medium">{item.pairing}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
