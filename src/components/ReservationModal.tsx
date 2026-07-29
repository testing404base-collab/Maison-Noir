import React, { useState, useEffect } from 'react';
import { ChevronRight, QrCode, ShieldCheck, CheckCircle2, X } from 'lucide-react';
import { ReservationDetails } from '../types';
import { useAuth } from '../context/AuthContext';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, addReservation } = useAuth();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);

  const [details, setDetails] = useState<ReservationDetails>({
    date: new Date().toISOString().split('T')[0],
    time: '7:00 PM',
    guests: 2,
    seatingArea: 'main_hall',
    occasion: 'Special Occasion',
    dietaryNotes: '',
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
  });

  useEffect(() => {
    if (currentUser) {
      setDetails((prev) => ({
        ...prev,
        fullName: prev.fullName || currentUser.name,
        email: prev.email || currentUser.email,
      }));
    }
  }, [currentUser]);

  if (!isOpen) return null;

  const timeSlots = [
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
    '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
    '9:00 PM', '9:30 PM', '10:00 PM'
  ];

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    const createdRes = addReservation({
      date: details.date,
      time: details.time,
      guests: details.guests,
      seatingArea: details.seatingArea,
      occasion: details.occasion,
      dietaryNotes: details.dietaryNotes,
      fullName: details.fullName,
      email: details.email,
      phone: details.phone,
    });

    setConfirmationCode(createdRes.confirmationCode || createdRes.id);
    setStep(4);
  };

  const areaNames = {
    main_hall: 'Main Dining Hall',
    chefs_counter: "Chef's Omakase Counter",
    private_dining: 'Imperial Cellar Salon',
    terrace: 'Heated Rooftop Terrace'
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070606]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#12100f] border border-[#3a3229] max-w-2xl w-full rounded-sm p-6 sm:p-10 relative shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn-dark absolute top-5 right-5 p-1.5 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold block mb-1">
            Maison Noir Manhattan
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-[#f3ebdc]">
            Table Reservation
          </h2>
          {step < 4 && (
            <div className="flex items-center justify-center gap-2 mt-4 text-xs font-sans-luxury">
              <span className={`w-2 h-2 rounded-full ${step >= 1 ? 'bg-[#d4af37]' : 'bg-[#2a251f]'}`} />
              <span className={`w-2 h-2 rounded-full ${step >= 2 ? 'bg-[#d4af37]' : 'bg-[#2a251f]'}`} />
              <span className={`w-2 h-2 rounded-full ${step >= 3 ? 'bg-[#d4af37]' : 'bg-[#2a251f]'}`} />
              <span className="text-[#8c8573] ml-2">Step {step} of 3</span>
            </div>
          )}
        </div>

        {/* STEP 1: Date, Time & Guests */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            {/* Guest Count Selector */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#a39d89] block mb-2 font-semibold">
                1. Select Guest Count
              </label>
              <div className="grid grid-cols-6 gap-2">
                {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setDetails({ ...details, guests: g })}
                    className={`py-2.5 text-xs font-semibold rounded-sm transition-all ${
                      details.guests === g
                        ? 'btn-gold font-bold shadow-md'
                        : 'btn-dark'
                    }`}
                  >
                    {g} {g === 1 ? 'Guest' : 'Guests'}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Picker */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#a39d89] block mb-2 font-semibold">
                2. Select Reservation Date
              </label>
              <input
                type="date"
                value={details.date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDetails({ ...details, date: e.target.value })}
                className="w-full px-4 py-3 bg-[#181614] border border-[#2d2822] rounded-sm text-sm text-[#f3ebdc] focus:border-[#d4af37] outline-none"
              />
            </div>

            {/* Time Slot Picker */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#a39d89] block mb-2 font-semibold">
                3. Available Dining Times
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setDetails({ ...details, time: slot })}
                    className={`py-2 text-[11px] font-semibold rounded-sm transition-all ${
                      details.time === slot
                        ? 'btn-gold font-bold'
                        : 'btn-dark'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="btn-gold w-full py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-sm flex items-center justify-center gap-2 mt-8"
            >
              <span>Continue to Dining Area</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Seating Area & Occasion */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="text-xs uppercase tracking-wider text-[#a39d89] block mb-3 font-semibold">
                Select Preferred Seating Atmosphere
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'main_hall', name: 'Main Dining Hall', desc: 'Steinway grand piano & walnut warm amber lighting.' },
                  { id: 'chefs_counter', name: "Chef's Omakase Counter", desc: 'Direct view of Chef Alexandre Laurent plating.' },
                  { id: 'private_dining', name: 'Imperial Cellar Salon', desc: 'Intimate glass wine vault setting.' },
                  { id: 'terrace', name: 'Heated Rooftop Terrace', desc: 'Enclosed sky patio overlooking Madison Ave.' }
                ].map((area) => (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => setDetails({ ...details, seatingArea: area.id as any })}
                    className={`p-4 rounded-sm border text-left transition-all ${
                      details.seatingArea === area.id
                        ? 'btn-gold !text-left'
                        : 'btn-dark !text-left'
                    }`}
                  >
                    <span className="font-serif-display text-lg block font-medium">{area.name}</span>
                    <span className="text-[11px] block mt-1 opacity-80">{area.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-[#a39d89] block mb-2 font-semibold">
                Dining Occasion
              </label>
              <select
                value={details.occasion}
                onChange={(e) => setDetails({ ...details, occasion: e.target.value })}
                className="w-full px-4 py-3 bg-[#181614] border border-[#2d2822] rounded-sm text-xs text-[#f3ebdc] outline-none focus:border-[#d4af37]"
              >
                <option value="Anniversary">Anniversary Celebration</option>
                <option value="Birthday">Birthday Gathering</option>
                <option value="Business Dinner">Business / Executive Dinner</option>
                <option value="Romantic Date">Romantic Evening</option>
                <option value="Food Enthusiast">Culinary Exploration</option>
              </select>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-[#a39d89] block mb-2 font-semibold">
                Dietary Restrictions / Allergies (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Shellfish allergy, Gluten sensitivity, Vegetarian options required"
                value={details.dietaryNotes}
                onChange={(e) => setDetails({ ...details, dietaryNotes: e.target.value })}
                className="w-full px-4 py-3 bg-[#181614] border border-[#2d2822] rounded-sm text-xs text-[#f3ebdc] outline-none focus:border-[#d4af37]"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setStep(1)}
                className="btn-dark w-1/3 py-3.5 text-xs font-bold uppercase tracking-wider rounded-sm"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="btn-gold w-2/3 py-3.5 text-xs font-bold uppercase tracking-[0.2em] rounded-sm flex items-center justify-center gap-2"
              >
                <span>Guest Information</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Guest Details Form */}
        {step === 3 && (
          <form onSubmit={handleComplete} className="space-y-4 animate-fade-in">
            <div>
              <label className="text-xs uppercase tracking-wider text-[#a39d89] block mb-1.5 font-semibold">
                Full Guest Name
              </label>
              <input
                type="text"
                required
                value={details.fullName}
                onChange={(e) => setDetails({ ...details, fullName: e.target.value })}
                placeholder="e.g. Eleanor Vance"
                className="w-full px-4 py-3 bg-[#181614] border border-[#2d2822] rounded-sm text-xs text-[#f3ebdc] focus:border-[#d4af37] outline-none"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-[#a39d89] block mb-1.5 font-semibold">
                Email Address (For Instant Pass)
              </label>
              <input
                type="email"
                required
                value={details.email}
                onChange={(e) => setDetails({ ...details, email: e.target.value })}
                placeholder="reservations@domain.com"
                className="w-full px-4 py-3 bg-[#181614] border border-[#2d2822] rounded-sm text-xs text-[#f3ebdc] focus:border-[#d4af37] outline-none"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-[#a39d89] block mb-1.5 font-semibold">
                Mobile Phone (SMS Confirmation)
              </label>
              <input
                type="tel"
                required
                value={details.phone}
                onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                placeholder="+1 (212) 555-0188"
                className="w-full px-4 py-3 bg-[#181614] border border-[#2d2822] rounded-sm text-xs text-[#f3ebdc] focus:border-[#d4af37] outline-none"
              />
            </div>

            <div className="p-4 bg-[#181512] border border-[#d4af37]/30 rounded text-xs space-y-1 text-[#c7c0af]">
              <p className="text-[#d4af37] font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Smart Elegant Dress Code Applies
              </p>
              <p className="text-[11px]">Reservations held for 15 minutes. Complimentary valet parking included.</p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-dark w-1/3 py-3.5 text-xs font-bold uppercase tracking-wider rounded-sm"
              >
                Back
              </button>
              <button
                type="submit"
                className="btn-gold w-2/3 py-3.5 text-xs font-bold uppercase tracking-[0.2em] rounded-sm"
              >
                Confirm Reservation
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: Instant Confirmation Pass */}
        {step === 4 && (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37] flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold block mb-1">
                Reservation Confirmed
              </span>
              <h3 className="font-serif-display text-3xl text-[#f3ebdc]">
                Welcome, {details.fullName}
              </h3>
              <p className="text-xs text-[#8c8573] mt-1">
                Confirmation Ref: <strong className="text-[#d4af37] font-mono">{confirmationCode}</strong>
              </p>
            </div>

            {/* Digital Dining Pass Card */}
            <div className="bg-[#181512] border border-[#d4af37]/40 p-6 rounded-sm text-left relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4af37]/5 rounded-bl-full pointer-events-none" />

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[10px] text-[#8c8573] uppercase block">Date & Time</span>
                  <span className="text-[#f3ebdc] font-semibold block">{details.date} at {details.time}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8c8573] uppercase block">Party Size</span>
                  <span className="text-[#f3ebdc] font-semibold block">{details.guests} Guests</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8c8573] uppercase block">Seating Suite</span>
                  <span className="text-[#d4af37] font-semibold block">{areaNames[details.seatingArea]}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8c8573] uppercase block">Dress Code</span>
                  <span className="text-[#f3ebdc] font-semibold block">Smart Elegant</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#2d2822] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#8c8573] uppercase block">Address</span>
                  <span className="text-[#c7c0af] text-[11px]">125 Madison Ave, Manhattan NY</span>
                </div>
                <div className="p-2 bg-[#0b0a0a] rounded border border-[#2d2822]">
                  <QrCode className="w-8 h-8 text-[#d4af37]" />
                </div>
              </div>
            </div>

            <p className="text-xs text-[#a39d89]">
              A confirmation pass has been dispatched to <span className="text-[#f3ebdc]">{details.email}</span>.
            </p>

            <button
              onClick={onClose}
              className="btn-gold w-full py-3.5 text-xs font-bold uppercase tracking-widest rounded-sm"
            >
              Done & Return to Site
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
