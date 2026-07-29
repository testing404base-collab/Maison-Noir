import React, { useState } from 'react';
import { Utensils, Sparkles, Filter, ChevronRight, X, Wine } from 'lucide-react';
import { MENU_ITEMS, TASTING_MENUS } from '../data/restaurantData';
import { MenuItem, TastingMenu, Currency } from '../types';
import { formatPrice } from '../lib/currency';
import { useLanguage } from '../context/LanguageContext';

interface MenuSectionProps {
  currency: Currency;
  onOpenReservation: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ currency, onOpenReservation }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'starters' | 'mains' | 'desserts' | 'drinks' | 'tasting'>('all');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedTastingMenu, setSelectedTastingMenu] = useState<TastingMenu | null>(TASTING_MENUS[0]);

  const { t } = useLanguage();

  // Filter items
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesDietary =
      dietaryFilter === 'all' || (item.dietary && item.dietary.includes(dietaryFilter as any));
    return matchesTab && matchesDietary;
  });

  return (
    <section id="menu" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0b0a0a] text-[#e8e2d8] relative border-t border-[#1c1916]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181512] border border-[#d4af37]/25 text-[#d4af37] text-xs font-sans-luxury tracking-[0.2em] uppercase mb-4">
            <Utensils className="w-3.5 h-3.5" />
            {t('signatureMenu')}
          </div>
          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-[#f3ebdc] tracking-wide mb-4">
            {t('signatureMenu')}
          </h2>
          <p className="font-playfair text-lg text-[#d4ceb8] italic">
            "Artfully prepared with French technique and Tokyo seasonality"
          </p>
        </div>

        {/* Category Nav Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 border-b border-[#231f1a] pb-6">
          {[
            { id: 'all', label: t('allSignatures') },
            { id: 'tasting', label: t('tastingMenus') },
            { id: 'starters', label: t('starters') },
            { id: 'mains', label: t('mainCourses') },
            { id: 'desserts', label: t('desserts') },
            { id: 'drinks', label: t('drinks') },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-sm text-xs font-sans-luxury tracking-widest uppercase transition-all duration-300 ${
                activeTab === tab.id ? 'btn-gold font-bold shadow-lg' : 'btn-dark'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dietary Filters */}
        {activeTab !== 'tasting' && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12 text-xs">
            <span className="text-[#8c8573] uppercase tracking-wider flex items-center gap-1 mr-2 font-medium">
              <Filter className="w-3.5 h-3.5 text-[#d4af37]" /> Filter:
            </span>
            {['all', 'GF', 'DF', 'V', 'Chef Special'].map((diet) => (
              <button
                key={diet}
                onClick={() => setDietaryFilter(diet)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] transition-all ${
                  dietaryFilter === diet ? 'btn-gold !py-1' : 'btn-dark !py-1'
                }`}
              >
                {diet === 'all'
                  ? t('showAll')
                  : diet === 'GF'
                  ? t('glutenFree')
                  : diet === 'DF'
                  ? t('dairyFree')
                  : diet === 'V'
                  ? t('vegetarian')
                  : t('chefsSpecial')}
              </button>
            ))}
          </div>
        )}

        {/* Display Tasting Menus Special View */}
        {activeTab === 'tasting' ? (
          <div className="space-y-16 animate-fade-in">
            {/* Tasting Menu Selector Tabs */}
            <div className="flex flex-wrap justify-center gap-4">
              {TASTING_MENUS.map((menu) => (
                <button
                  key={menu.id}
                  onClick={() => setSelectedTastingMenu(menu)}
                  className={`px-6 py-3.5 rounded-sm border text-left ${
                    selectedTastingMenu?.id === menu.id ? 'btn-gold !text-left' : 'btn-dark !text-left'
                  }`}
                >
                  <span className="text-xs uppercase tracking-widest text-[#d4af37] block font-semibold">
                    {menu.coursesCount} Courses
                  </span>
                  <span className="font-serif-display text-2xl font-semibold">{menu.name}</span>
                  <span className="text-xs block mt-1">
                    {formatPrice(menu.priceGBP, currency)} / Person
                  </span>
                </button>
              ))}
            </div>

            {/* Active Tasting Menu Detailed Timeline */}
            {selectedTastingMenu && (
              <div className="bg-[#12100f] border border-[#2b2620] p-8 sm:p-12 rounded-sm max-w-4xl mx-auto relative shadow-2xl">
                <div className="text-center mb-10 pb-6 border-b border-[#231f1a]">
                  <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold block mb-1">
                    Multi-Course Experience
                  </span>
                  <h3 className="font-serif-display text-4xl text-[#f3ebdc]">{selectedTastingMenu.name}</h3>
                  <p className="font-playfair text-[#d4ceb8] italic mt-2">{selectedTastingMenu.tagline}</p>
                  <div className="mt-4 flex justify-center items-center gap-6 text-sm">
                    <span className="text-[#f3ebdc] font-semibold">
                      Tasting Menu: <span className="text-[#d4af37]">{formatPrice(selectedTastingMenu.priceGBP, currency)}</span>
                    </span>
                    <span className="text-[#8c8573]">|</span>
                    <span className="text-[#f3ebdc] font-semibold">
                      Sommelier Wine Pairing: <span className="text-[#d4af37]">+{formatPrice(selectedTastingMenu.pairingPriceGBP, currency)}</span>
                    </span>
                  </div>
                </div>

                {/* Courses List */}
                <div className="space-y-8 relative before:absolute before:inset-0 before:left-6 before:w-[1px] before:bg-gradient-to-b before:from-[#d4af37] before:via-[#332c24] before:to-transparent">
                  {selectedTastingMenu.courses.map((course) => (
                    <div key={course.courseNumber} className="relative pl-14 group">
                      <div className="absolute left-2 top-0 w-8 h-8 rounded-full bg-[#1e1a16] border border-[#d4af37] text-[#d4af37] font-serif-display text-sm font-bold flex items-center justify-center shadow-md">
                        {course.courseNumber}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <h4 className="font-serif-display text-xl text-[#f3ebdc] group-hover:text-[#d4af37] transition-colors">
                          {course.title} {course.japaneseTitle && <span className="text-xs text-[#8c8573] font-normal ml-2">({course.japaneseTitle})</span>}
                        </h4>
                      </div>
                      <p className="text-xs text-[#c7c0af] mt-1 leading-relaxed">{course.description}</p>
                      <p className="text-[11px] text-[#d4af37] font-medium mt-1.5 flex items-center gap-1">
                        <Wine className="w-3 h-3 text-[#d4af37]" />
                        Sommelier Pairing: {course.winePairing}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-12 text-center pt-8 border-t border-[#231f1a]">
                  <button
                    onClick={onOpenReservation}
                    className="btn-gold px-8 py-3.5 rounded-sm font-sans-luxury text-xs font-bold tracking-[0.2em] uppercase shadow-xl"
                  >
                    {t('reserveToTaste')}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Standard Menu Items Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="bg-[#12100f] border border-[#24201b] hover:border-[#d4af37]/60 rounded-sm p-6 transition-all duration-300 hover:-translate-y-1 group cursor-pointer flex flex-col justify-between shadow-lg"
              >
                <div>
                  {item.image && (
                    <div className="h-44 w-full mb-5 overflow-hidden rounded-sm border border-[#26221d] relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {item.featured && (
                        <span className="absolute top-2 right-2 bg-[#d4af37] text-[#0b0a0a] text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest rounded-xs">
                          {t('chefsSpecial')}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex justify-between items-baseline gap-2 mb-2">
                    <h3 className="font-serif-display text-2xl text-[#f3ebdc] group-hover:text-[#d4af37] transition-colors">
                      {item.name}
                    </h3>
                    <span className="font-serif-display text-2xl text-[#d4af37] font-semibold whitespace-nowrap">
                      {formatPrice(item.priceGBP, currency)}
                    </span>
                  </div>

                  <p className="text-xs text-[#a39d89] leading-relaxed line-clamp-3 mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1e1b17] flex justify-between items-center text-[11px] text-[#8c8573]">
                  <div className="flex gap-1.5 flex-wrap">
                    {item.dietary?.map((d) => (
                      <span key={d} className="px-1.5 py-0.5 bg-[#1a1714] border border-[#2d2822] rounded text-[9px] text-[#d4af37]">
                        {d}
                      </span>
                    ))}
                  </div>

                  <span className="text-[#d4af37] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold text-[10px] uppercase tracking-wider">
                    {t('details')} <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Dish Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 bg-[#070606]/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#12100f] border border-[#383027] max-w-xl w-full rounded-sm p-6 sm:p-8 relative shadow-2xl animate-in zoom-in-95 duration-200">
              <button
                onClick={() => setSelectedItem(null)}
                className="btn-dark absolute top-4 right-4 p-1.5 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              {selectedItem.image && (
                <div className="h-56 w-full mb-6 overflow-hidden rounded-sm border border-[#2d2822]">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex justify-between items-baseline mb-3">
                <h3 className="font-serif-display text-3xl text-[#f3ebdc]">{selectedItem.name}</h3>
                <span className="font-serif-display text-3xl text-[#d4af37] font-semibold">
                  {formatPrice(selectedItem.priceGBP, currency)}
                </span>
              </div>

              <p className="text-sm text-[#c7c0af] leading-relaxed mb-6">
                {selectedItem.description}
              </p>

              <div className="space-y-4 border-t border-[#231f1a] pt-4 text-xs">
                <div>
                  <span className="text-[#8c8573] uppercase tracking-wider block mb-1">Key Ingredients & Provenance:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.ingredients.map((ing, i) => (
                      <span key={i} className="px-2.5 py-1 bg-[#1a1714] border border-[#2d2822] rounded text-[#e8e2d8]">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedItem.pairing && (
                  <div className="p-3 bg-[#181512] border border-[#d4af37]/30 rounded text-[#d4af37] flex items-center gap-2">
                    <Wine className="w-4 h-4 shrink-0" />
                    <span>
                      <strong className="text-[#f3ebdc]">Master Sommelier Pairing:</strong> {selectedItem.pairing}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-[#231f1a] flex gap-3">
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    onOpenReservation();
                  }}
                  className="btn-gold w-full py-3.5 font-sans-luxury text-xs font-bold uppercase tracking-wider rounded-sm"
                >
                  {t('reserveToTaste')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
