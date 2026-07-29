import React, { useState } from 'react';
import { Gift, Sparkles, CheckCircle2, Lock, Mail, CreditCard, ShieldCheck, X } from 'lucide-react';
import { Currency } from '../types';
import { formatPrice } from '../lib/currency';
import { saveVoucherToSupabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface GiftVouchersProps {
  currency: Currency;
}

export const GiftVouchers: React.FC<GiftVouchersProps> = ({ currency }) => {
  const { currentUser } = useAuth();
  const [amount, setAmount] = useState<number>(250);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>(currentUser?.email || '');
  const [userPassword, setUserPassword] = useState<string>('');
  const [recipientName, setRecipientName] = useState<string>('Sophia Sterling');
  const [message, setMessage] = useState<string>('With warmest regards for an unforgettable dining evening at Maison Noir.');
  const [cardTheme, setCardTheme] = useState<'noir' | 'gold' | 'velvet'>('noir');
  const [issuedCode, setIssuedCode] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Compulsory Payment Modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cardName, setCardName] = useState(currentUser?.name || '');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const activeAmount = customAmount ? parseInt(customAmount) || 250 : amount;

  const themes = {
    noir: {
      bg: 'bg-gradient-to-br from-[#1c1916] via-[#12100f] to-[#080707]',
      border: 'border-[#d4af37]/40',
      text: 'text-[#f3ebdc]',
      accent: 'text-[#d4af37]'
    },
    gold: {
      bg: 'bg-gradient-to-br from-[#382f1b] via-[#241e12] to-[#120f09]',
      border: 'border-[#f5e4b3]/60',
      text: 'text-[#f5e4b3]',
      accent: 'text-[#f5e4b3]'
    },
    velvet: {
      bg: 'bg-gradient-to-br from-[#241217] via-[#140b0d] to-[#080405]',
      border: 'border-[#e091a1]/40',
      text: 'text-[#f8e8eb]',
      accent: 'text-[#e091a1]'
    }
  };

  const selectedTheme = themes[cardTheme];

  const handleOpenPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser && (!userEmail.trim() || !userPassword.trim())) {
      alert('Please enter your email address and password to authenticate your digital voucher issuance.');
      return;
    }
    setShowPaymentModal(true);
  };

  const handleProcessPaymentAndIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber.trim() || !cardExpiry.trim() || !cardCvc.trim()) {
      alert('Payment information is required to issue this digital voucher.');
      return;
    }

    setIsSubmitting(true);
    const code = `MN-GIFT-${Math.floor(10000 + Math.random() * 90000)}`;

    const finalEmail = currentUser ? currentUser.email : userEmail.trim();
    const finalPass = currentUser ? 'AUTHENTICATED' : userPassword.trim();

    await saveVoucherToSupabase({
      voucher_code: code,
      user_email: finalEmail,
      user_password: finalPass,
      recipient_name: recipientName.trim() || 'Valued Guest',
      amount: activeAmount,
      message: message.trim(),
      card_theme: cardTheme,
      created_at: new Date().toISOString(),
    });

    setIssuedCode(code);
    setIsSubmitting(false);
    setShowPaymentModal(false);
  };

  return (
    <section id="vouchers" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0b0a0a] text-[#e8e2d8] relative border-t border-[#1c1916]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181512] border border-[#d4af37]/25 text-[#d4af37] text-xs font-sans-luxury tracking-[0.2em] uppercase mb-4">
            <Gift className="w-3.5 h-3.5" />
            Gastronomic Gifting
          </div>
          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-[#f3ebdc] tracking-wide mb-4">
            Maison Noir Experience Vouchers
          </h2>
          <p className="font-playfair text-lg text-[#d4ceb8] italic">
            "Bestow the gift of world-class Michelin fine dining to those who appreciate culinary perfection"
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Builder Form */}
          <form onSubmit={handleOpenPayment} className="lg:col-span-6 space-y-5 bg-[#12100f] border border-[#24201b] p-6 sm:p-8 rounded-sm shadow-xl">
            <h3 className="font-serif-display text-2xl text-[#f3ebdc] border-b border-[#231f1a] pb-4">
              Configure Experience Voucher
            </h3>

            {/* Authentication Details - ONLY SHOW IF NOT LOGGED IN */}
            {currentUser ? (
              <div className="p-3 bg-[#181512] border border-[#d4af37]/30 rounded text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                  <div>
                    <span className="text-[#a39d89] block text-[10px] uppercase font-semibold">Authenticated Patron Session</span>
                    <span className="text-[#f3ebdc] font-bold">{currentUser.name} ({currentUser.email})</span>
                  </div>
                </div>
                <span className="text-[10px] bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f5e4b3] px-2 py-0.5 rounded font-bold uppercase">
                  Verified
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#181512] border border-[#2e261e] rounded">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#d4af37] block mb-1 font-semibold flex items-center gap-1">
                    <Mail className="w-3 h-3" /> Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="your.email@domain.com"
                    className="w-full px-3 py-2 bg-[#0f0d0c] border border-[#332a22] rounded-sm text-xs text-[#f3ebdc] focus:border-[#d4af37] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#d4af37] block mb-1 font-semibold flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-3 py-2 bg-[#0f0d0c] border border-[#332a22] rounded-sm text-xs text-[#f3ebdc] focus:border-[#d4af37] outline-none"
                  />
                </div>
              </div>
            )}

            {/* Amount Selection */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#a39d89] block mb-2 font-semibold">
                1. Select Voucher Value
              </label>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[150, 250, 500, 1000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setAmount(amt);
                      setCustomAmount('');
                    }}
                    className={`py-2 text-xs font-semibold rounded-sm transition-all cursor-pointer ${
                      activeAmount === amt && !customAmount
                        ? 'btn-gold'
                        : 'btn-dark'
                    }`}
                  >
                    {formatPrice(amt, currency)}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Selection */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#a39d89] block mb-2 font-semibold">
                2. Select Metallic Card Styling
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'noir', name: 'Classic Noir Gold' },
                  { id: 'gold', name: 'Imperial Champagne' },
                  { id: 'velvet', name: 'Midnight Rose' }
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setCardTheme(t.id as any)}
                    className={`p-2 rounded-sm text-xs font-medium text-center transition-all cursor-pointer ${
                      cardTheme === t.id
                        ? 'btn-gold'
                        : 'btn-dark'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient Details */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#a39d89] block mb-1 font-semibold">
                Recipient Name
              </label>
              <input
                type="text"
                required
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Recipient Full Name"
                className="w-full px-3.5 py-2 bg-[#181614] border border-[#2d2822] rounded-sm text-xs text-[#f3ebdc] focus:border-[#d4af37] outline-none"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-[#a39d89] block mb-1 font-semibold">
                Personal Dedication Message
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your dedication message..."
                className="w-full px-3.5 py-2 bg-[#181614] border border-[#2d2822] rounded-sm text-xs text-[#f3ebdc] focus:border-[#d4af37] outline-none"
              />
            </div>

            <button
              type="submit"
              className="btn-gold w-full py-3.5 text-xs font-bold uppercase tracking-[0.2em] rounded-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <CreditCard className="w-4 h-4 text-[#0b0a0a]" />
              <span>Proceed to Secure Checkout ({formatPrice(activeAmount, currency)})</span>
            </button>
          </form>

          {/* Live Card Preview */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] block font-semibold text-center">
              Live Digital Gift Card Preview
            </span>

            <div
              className={`p-8 sm:p-10 rounded-lg border ${selectedTheme.border} ${selectedTheme.bg} shadow-2xl relative overflow-hidden transition-all duration-500`}
            >
              {/* Metallic Foil Emblem */}
              <div className="flex justify-between items-start mb-12">
                <div>
                  <span className="font-serif-display text-2xl tracking-[0.2em] text-[#f3ebdc] font-bold block uppercase">
                    Maison Noir
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#a39d89] block font-sans-luxury">
                    Manhattan • New York
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-[#8c8573] block tracking-widest">
                    Voucher Value
                  </span>
                  <span className={`font-serif-display text-3xl font-bold ${selectedTheme.accent}`}>
                    {formatPrice(activeAmount, currency)}
                  </span>
                </div>
              </div>

              {/* Message */}
              <div className="mb-10 space-y-2">
                <span className="text-[10px] text-[#8c8573] uppercase tracking-widest block">
                  Presented To:
                </span>
                <h4 className="font-serif-display text-2xl text-[#f3ebdc] font-medium">{recipientName || 'Valued Guest'}</h4>
                <p className="font-playfair text-xs italic text-[#c7c0af] leading-relaxed pt-1">
                  "{message || 'A dining journey at Maison Noir.'}"
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-6 border-t border-white/10 flex justify-between items-center text-[10px] text-[#8c8573] uppercase tracking-wider">
                <span>Ref: {issuedCode || 'MN-GIFT-PENDING'}</span>
                <span>Valid for 24 Months</span>
              </div>
            </div>

            {issuedCode && (
              <div className="p-4 bg-[#181512] border border-[#d4af37]/40 rounded text-center space-y-2 animate-fade-in">
                <span className="text-xs text-[#d4af37] font-semibold flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Digital Voucher Issued Successfully!
                </span>
                <p className="text-[11px] text-[#a39d89]">
                  Voucher code <strong className="text-[#f3ebdc]">{issuedCode}</strong> has been created.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* COMPULSORY PAYMENT CHECKOUT MODAL */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#12100f] border border-[#d4af37]/50 max-w-md w-full rounded-lg p-6 sm:p-8 relative shadow-2xl space-y-5">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 p-1.5 text-[#a39d89] hover:text-[#d4af37] rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1 pb-3 border-b border-[#24201b]">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-bold block">
                Maison Noir Payment Gateway
              </span>
              <h3 className="font-serif-display text-2xl text-[#f3ebdc] font-bold">
                Complete Voucher Payment
              </h3>
              <p className="text-xs text-[#a39d89]">
                Total Amount Due: <strong className="text-[#d4af37] font-mono font-bold">{formatPrice(activeAmount, currency)}</strong>
              </p>
            </div>

            <form onSubmit={handleProcessPaymentAndIssue} className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] uppercase text-[#a39d89] block mb-1 font-semibold">
                  Cardholder Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full px-3.5 py-2.5 bg-[#181614] border border-[#332a22] rounded text-[#f3ebdc] focus:border-[#d4af37] outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase text-[#a39d89] block mb-1 font-semibold flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-[#d4af37]" /> Credit / Debit Card Number *
                </label>
                <input
                  type="text"
                  required
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="4532 •••• •••• 8829"
                  className="w-full px-3.5 py-2.5 bg-[#181614] border border-[#332a22] rounded text-[#f3ebdc] font-mono focus:border-[#d4af37] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] uppercase text-[#a39d89] block mb-1 font-semibold">
                    Expires (MM/YY) *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="12/28"
                    className="w-full px-3.5 py-2.5 bg-[#181614] border border-[#332a22] rounded text-[#f3ebdc] font-mono focus:border-[#d4af37] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase text-[#a39d89] block mb-1 font-semibold">
                    CVC Code *
                  </label>
                  <input
                    type="password"
                    required
                    maxLength={4}
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    placeholder="883"
                    className="w-full px-3.5 py-2.5 bg-[#181614] border border-[#332a22] rounded text-[#f3ebdc] font-mono focus:border-[#d4af37] outline-none"
                  />
                </div>
              </div>

              <div className="p-3 bg-[#181512] border border-[#d4af37]/30 rounded text-[11px] text-[#c7c0af] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>256-Bit SSL Encrypted Fine Dining Checkout Gateway</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold w-full py-3.5 text-xs font-bold uppercase tracking-widest rounded flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-2"
              >
                <Sparkles className="w-4 h-4 text-[#0b0a0a]" />
                <span>{isSubmitting ? 'Processing Payment...' : `Pay ${formatPrice(activeAmount, currency)} & Issue Voucher`}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

