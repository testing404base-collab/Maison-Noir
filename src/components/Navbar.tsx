import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Calendar, Menu as MenuIcon, X, Globe, Sparkles, User, ChevronDown, BookmarkCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Currency, Language } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenReservation: () => void;
  onOpenAuth: () => void;
  onOpenDashboard: () => void;
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReservation,
  onOpenAuth,
  onOpenDashboard,
  currency,
  onCurrencyChange,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  const { language, setLanguage, t, languages } = useLanguage();
  const { currentUser } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('story'), href: '#story' },
    { label: t('chef'), href: '#chef' },
    { label: t('menu'), href: '#menu' },
    { label: t('wine'), href: '#wine' },
    { label: t('private'), href: '#private' },
    { label: t('gallery'), href: '#gallery' },
    { label: t('vouchers'), href: '#vouchers' },
    { label: t('contact'), href: '#contact' },
  ];

  const currentLangObj = languages.find((l) => l.code === language) || languages[0];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    setIsNavigating(true);
    setProgress(100);

    if (href === '#' || href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        const headerOffset = 75;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }

    setTimeout(() => {
      setIsNavigating(false);
      setProgress(0);
    }, 600);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300">
      {/* Top Utility Bar (Connected to main navbar, always accessible) */}
      <div className="bg-[#070606] border-b border-[#26221d] text-xs px-4 py-1.5 text-[#a39d89] hidden md:block relative z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          <div className="flex items-center gap-4 lg:gap-6 shrink-0 text-[11px]">
            <span className="flex items-center gap-1.5 hover:text-[#d4af37] transition-colors whitespace-nowrap">
              <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
              {RESTAURANT_INFO.address.street}, {RESTAURANT_INFO.location}
            </span>
            <span className="text-[#3a352f]">|</span>
            <span className="flex items-center gap-1.5 hover:text-[#d4af37] transition-colors whitespace-nowrap">
              <Phone className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
              {RESTAURANT_INFO.contact.phone}
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <span className="inline-flex items-center gap-1 text-[#d4af37] bg-[#d4af37]/10 px-2.5 py-0.5 rounded-full border border-[#d4af37]/20 font-medium text-[10px] sm:text-[11px] whitespace-nowrap">
              <Sparkles className="w-3 h-3 shrink-0" />
              {t('michelinDistinction')}
            </span>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 bg-[#181614] border border-[#2d2822] hover:border-[#d4af37]/50 rounded-md px-2 py-0.5 text-[11px] font-semibold text-[#f3ebdc] transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>{currentLangObj.flag}</span>
                <span>{currentLangObj.name}</span>
                <ChevronDown className="w-3 h-3 text-[#a39d89]" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-[#12100e] border border-[#2d2822] rounded shadow-2xl py-1 z-50 animate-in fade-in duration-150">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setLanguage(lang.code as Language);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-[#221d18] transition-colors cursor-pointer ${
                        language === lang.code ? 'text-[#d4af37] font-bold bg-[#1a1613]' : 'text-[#d4ceb8]'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Selector */}
            <div className="flex items-center bg-[#181614] border border-[#2d2822] rounded-md px-1.5 py-0.5 shrink-0">
              <Globe className="w-3 h-3 text-[#a39d89] mr-1 shrink-0" />
              {(['USD', 'GBP', 'EUR'] as Currency[]).map((curr) => (
                <button
                  key={curr}
                  onClick={() => onCurrencyChange(curr)}
                  className={`px-1.5 py-0.5 text-[10px] font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
                    currency === curr ? 'btn-gold !py-0.5' : 'btn-dark !py-0.5'
                  }`}
                >
                  {curr === 'USD' ? '$ USD' : curr === 'GBP' ? '£ GBP' : '€ EUR'}
                </button>
              ))}
            </div>

            {/* User Profile Badge */}
            {currentUser ? (
              <button
                onClick={onOpenDashboard}
                className="btn-dark px-2.5 py-0.5 rounded text-[11px] font-bold uppercase flex items-center gap-1.5 text-[#d4af37] border-[#d4af37]/40 hover:border-[#d4af37] shrink-0 whitespace-nowrap max-w-[150px] truncate cursor-pointer"
                title={currentUser.name}
              >
                <User className="w-3 h-3 text-[#d4af37] shrink-0" />
                <span className="truncate">{currentUser.name}</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="btn-dark px-2.5 py-0.5 rounded text-[11px] font-bold uppercase flex items-center gap-1.5 text-[#f3ebdc] shrink-0 whitespace-nowrap cursor-pointer"
              >
                <User className="w-3 h-3 text-[#d4af37] shrink-0" />
                <span>{t('signIn')}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a0909]/95 backdrop-blur-md border-b border-[#231f1a] py-2.5 shadow-2xl'
            : 'bg-gradient-to-b from-[#0b0a0a]/95 via-[#0b0a0a]/80 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, '#')}
            className="group flex flex-col items-start cursor-pointer shrink-0"
          >
            <span className="font-serif-display text-xl sm:text-2xl md:text-3xl tracking-[0.2em] text-[#f3ebdc] font-semibold group-hover:text-[#d4af37] transition-colors uppercase whitespace-nowrap">
              Maison Noir
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.3em] text-[#a39d89] uppercase font-sans-luxury whitespace-nowrap">
              Manhattan • New York
            </span>
          </a>

          {/* Desktop Nav Links (xl breakpoint prevents overlapping) */}
          <nav className="hidden xl:flex items-center gap-4 2xl:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs font-sans-luxury tracking-widest text-[#d4ceb8] hover:text-[#d4af37] transition-colors uppercase py-1 whitespace-nowrap relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons Container */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {currentUser && (
              <button
                onClick={onOpenDashboard}
                className="btn-dark px-3 sm:px-4 py-2 rounded-sm font-sans-luxury text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 sm:gap-2 text-[#d4af37] border-[#d4af37]/40 hover:border-[#d4af37] shrink-0 whitespace-nowrap shadow-md"
              >
                <BookmarkCheck className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>{currentUser.role === 'admin' ? 'Panel' : t('yourReserves')}</span>
              </button>
            )}

            <button
              onClick={onOpenReservation}
              className="btn-gold px-4 sm:px-5 py-2 rounded-sm font-sans-luxury text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 sm:gap-2 shrink-0 whitespace-nowrap shadow-lg"
            >
              <Calendar className="w-3.5 h-3.5 text-[#0b0a0a] shrink-0" />
              <span>{t('reserveTable')}</span>
            </button>

            {/* Mobile / Tablet Drawer Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 btn-dark rounded text-[#e8e2d8] shrink-0"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Golden Nav Progress Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1a1714] overflow-hidden pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-[#d4af37] via-[#f5e4b3] to-[#d4af37] shadow-[0_0_10px_#d4af37]"
            style={{
              width: `${progress}%`,
              opacity: isNavigating ? 1 : 0,
              transition: isNavigating ? 'width 0.5s ease-out, opacity 0.2s ease' : 'none',
              willChange: 'width, opacity',
            }}
          />
        </div>

        {/* Mobile / Tablet Slide-down Navigation */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#0d0c0c] border-b border-[#26221d] px-6 py-5 space-y-4 animate-in slide-in-from-top-4 duration-200">
            <div className="flex justify-between items-center pb-3 border-b border-[#201d19]">
              <span className="text-xs text-[#a39d89] uppercase tracking-widest">Language:</span>
              <div className="flex items-center gap-1 bg-[#181614] border border-[#2d2822] rounded p-1">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code as Language)}
                    className={`px-2 py-1 text-xs rounded font-bold ${
                      language === l.code ? 'btn-gold' : 'text-[#a39d89]'
                    }`}
                  >
                    {l.flag}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-[#201d19]">
              <span className="text-xs text-[#a39d89] uppercase tracking-widest">Account:</span>
              {currentUser ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDashboard();
                  }}
                  className="btn-dark px-3 py-1.5 text-xs font-bold rounded uppercase flex items-center gap-1.5 text-[#d4af37]"
                >
                  <User className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{currentUser.name}</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="btn-dark px-3 py-1.5 text-xs font-bold rounded uppercase"
                >
                  {t('signIn')}
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-xs font-sans-luxury tracking-wider text-[#d4ceb8] hover:text-[#d4af37] py-2 border-b border-[#181614] cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
