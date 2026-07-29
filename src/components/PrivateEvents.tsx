import React, { useState } from 'react';
import { Users, Sparkles, Check, Send, X } from 'lucide-react';
import { PRIVATE_ROOMS } from '../data/restaurantData';
import { saveEventInquiryToSupabase } from '../lib/supabase';

export const PrivateEvents: React.FC = () => {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '12',
    eventType: 'Anniversary Celebration',
    room: 'The Imperial Cellar Salon',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);

    await saveEventInquiryToSupabase({
      full_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      target_date: formData.date,
      guests: formData.guests,
      room_name: formData.room,
      notes: formData.message,
      status: 'Pending',
    });
  };

  return (
    <section id="private" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0b0a0a] text-[#e8e2d8] relative border-t border-[#1c1916]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181512] border border-[#d4af37]/25 text-[#d4af37] text-xs font-sans-luxury tracking-[0.2em] uppercase mb-4">
            <Users className="w-3.5 h-3.5" />
            Exclusive Gatherings
          </div>
          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-[#f3ebdc] tracking-wide mb-4">
            Private Dining & Luxury Events
          </h2>
          <p className="font-playfair text-lg text-[#d4ceb8] italic">
            "Bespoke dining suites designed for high-profile business dinners and intimate celebrations"
          </p>
        </div>

        {/* Private Dining Rooms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {PRIVATE_ROOMS.map((room) => (
            <div
              key={room.id}
              className="bg-[#12100f] border border-[#24201b] hover:border-[#d4af37]/60 rounded-sm overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 w-full overflow-hidden border-b border-[#231f1a]">
                  <img
                    src={room.image}
                    alt={room.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 bg-[#0b0a0a]/80 backdrop-blur-md px-3 py-1 rounded text-xs text-[#d4af37] border border-[#d4af37]/30 uppercase font-semibold tracking-wider">
                    {room.capacity}
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="font-serif-display text-3xl text-[#f3ebdc] mb-3">{room.name}</h3>
                  <p className="text-xs text-[#a39d89] leading-relaxed mb-6">{room.description}</p>

                  <div className="space-y-2 mb-6">
                    <span className="text-[10px] uppercase tracking-widest text-[#8c8573] font-semibold block">
                      Suite Privileges:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#c7c0af]">
                      {room.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-[#181512] border-t border-[#231f1a] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#8c8573] uppercase block">Minimum Spend</span>
                  <span className="font-serif-display text-xl text-[#d4af37] font-semibold">
                    {room.minimumSpend}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setFormData({ ...formData, room: room.name });
                    setSelectedRoomId(room.id);
                  }}
                  className="btn-gold px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider"
                >
                  Inquire Suite
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Private Dining Modal / Form View */}
        {selectedRoomId && (
          <div className="fixed inset-0 z-50 bg-[#070606]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#12100f] border border-[#3a3229] max-w-xl w-full rounded-sm p-6 sm:p-8 relative shadow-2xl my-8">
              <button
                onClick={() => {
                  setSelectedRoomId(null);
                  setInquirySubmitted(false);
                }}
                className="btn-dark absolute top-4 right-4 p-1.5 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              {inquirySubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37] flex items-center justify-center mx-auto">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif-display text-3xl text-[#f3ebdc]">Private Event Inquiry Sent</h3>
                  <p className="text-xs text-[#a39d89] max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name}. Our Event Director & Sommelier team will review your details for{' '}
                    <strong className="text-[#d4af37]">{formData.room}</strong> and contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedRoomId(null);
                      setInquirySubmitted(false);
                    }}
                    className="btn-gold mt-4 px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-center mb-6">
                    <span className="text-xs uppercase tracking-widest text-[#d4af37] block font-semibold">Bespoke Suite Reservation</span>
                    <h3 className="font-serif-display text-2xl text-[#f3ebdc] mt-1">Inquire for {formData.room}</h3>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#a39d89] block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Lord Edward Sterling"
                      className="w-full px-3.5 py-2.5 bg-[#181614] border border-[#2d2822] rounded-sm text-xs text-[#f3ebdc] focus:border-[#d4af37] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#a39d89] block mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@domain.com"
                        className="w-full px-3.5 py-2.5 bg-[#181614] border border-[#2d2822] rounded-sm text-xs text-[#f3ebdc] focus:border-[#d4af37] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#a39d89] block mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (212) 555-0199"
                        className="w-full px-3.5 py-2.5 bg-[#181614] border border-[#2d2822] rounded-sm text-xs text-[#f3ebdc] focus:border-[#d4af37] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#a39d89] block mb-1">Target Date</label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#181614] border border-[#2d2822] rounded-sm text-xs text-[#f3ebdc] focus:border-[#d4af37] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#a39d89] block mb-1">Expected Guests</label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#181614] border border-[#2d2822] rounded-sm text-xs text-[#f3ebdc] focus:border-[#d4af37] outline-none"
                      >
                        <option value="8">8 Guests</option>
                        <option value="12">12 Guests</option>
                        <option value="16">16 Guests</option>
                        <option value="24">24 Guests</option>
                        <option value="32">32 Guests (Full Wing)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#a39d89] block mb-1">Special Requirements or Notes</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Sommelier wine pairing preference, custom speech setup, dietary requirements..."
                      className="w-full px-3.5 py-2.5 bg-[#181614] border border-[#2d2822] rounded-sm text-xs text-[#f3ebdc] focus:border-[#d4af37] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold w-full py-3.5 text-xs font-bold uppercase tracking-wider rounded-sm flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Event Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
