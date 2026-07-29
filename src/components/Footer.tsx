import React, { useState } from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Pin, Youtube, Calendar, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { saveContactMessageToSupabase } from '../lib/supabase';

interface FooterProps {
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation }) => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [messageSubmitted, setMessageSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage.trim() || !contactEmail.trim()) return;

    setIsSending(true);
    await saveContactMessageToSupabase({
      full_name: contactName.trim() || 'Guest',
      email: contactEmail.trim(),
      message: contactMessage.trim(),
      created_at: new Date().toISOString(),
    });

    setIsSending(false);
    setMessageSubmitted(true);
    setContactMessage('');
  };

  return (
    <footer id="contact" className="bg-[#050404] text-[#a39d89] text-xs pt-20 pb-12 border-t border-[#1c1916] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#1c1916]">
          {/* Brand & Story */}
          <div className="lg:col-span-4 space-y-5">
            <a href="#" className="inline-block">
              <span className="font-serif-display text-3xl tracking-[0.22em] text-[#f3ebdc] font-semibold uppercase block">
                Maison Noir
              </span>
              <span className="text-[9px] tracking-[0.35em] text-[#d4af37] uppercase font-sans-luxury block mt-0.5">
                Manhattan • New York
              </span>
            </a>

            <p className="text-xs text-[#8c8573] leading-relaxed max-w-sm">
              An award-winning luxury fine dining establishment where contemporary French gastronomy meets modern Japanese culinary artistry.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenReservation}
                className="btn-gold px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5 text-[#0b0a0a]" />
                <span>Reserve Table</span>
              </button>
            </div>
          </div>

          {/* Opening Hours Schedule */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif-display text-xl text-[#f3ebdc] uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#d4af37]" />
              Opening Hours
            </h4>

            <div className="space-y-2 text-xs font-sans-luxury">
              {RESTAURANT_INFO.hours.map((item, idx) => (
                <div key={idx} className="flex justify-between py-1 border-b border-[#181614]">
                  <span className="text-[#d4ceb8] font-medium">{item.day}</span>
                  <span className={item.hours === 'Closed' ? 'text-[#8c8573] italic' : 'text-[#d4af37]'}>
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-[#8c8573] pt-1">
              Dress Code: <strong className="text-[#f3ebdc]">{RESTAURANT_INFO.dressCode}</strong>
            </p>
          </div>

          {/* Contact & Address */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif-display text-xl text-[#f3ebdc] uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#d4af37]" />
              Contact & Location
            </h4>

            <div className="space-y-3 text-xs text-[#c7c0af]">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>
                  {RESTAURANT_INFO.address.street}
                  <br />
                  {RESTAURANT_INFO.address.city}, {RESTAURANT_INFO.address.state} {RESTAURANT_INFO.address.zip}, {RESTAURANT_INFO.address.country}
                </span>
              </p>

              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.contact.phone}`} className="hover:text-[#d4af37] transition-colors">
                  {RESTAURANT_INFO.contact.phone}
                </a>
              </p>

              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.contact.email}`} className="hover:text-[#d4af37] transition-colors">
                  {RESTAURANT_INFO.contact.email}
                </a>
              </p>
            </div>

            {/* Send Message to Maison Noir Admin */}
            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-wider text-[#d4af37] block mb-2 font-semibold flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#d4af37]" />
                Send Direct Message To Executive Concierge
              </span>

              {messageSubmitted ? (
                <div className="p-3 bg-[#181512] border border-[#d4af37]/40 rounded text-xs text-[#d4af37] space-y-1">
                  <p className="flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4" /> Message sent
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3 py-1.5 bg-[#12100f] border border-[#231f1a] rounded-sm text-xs text-[#f3ebdc] focus:border-[#d4af37] outline-none"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your Email Address"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-3 py-1.5 bg-[#12100f] border border-[#231f1a] rounded-sm text-xs text-[#f3ebdc] focus:border-[#d4af37] outline-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <textarea
                      required
                      rows={2}
                      placeholder="enter message for us"
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full px-3 py-2 bg-[#12100f] border border-[#231f1a] rounded-sm text-xs text-[#f3ebdc] focus:border-[#d4af37] outline-none"
                    />
                    <div className="flex sm:flex-col gap-2 shrink-0">
                      <button
                        type="submit"
                        disabled={isSending}
                        className="btn-gold px-4 py-2 rounded-sm flex items-center justify-center gap-1.5 cursor-pointer text-xs font-bold uppercase tracking-wider"
                      >
                        <Send className="w-3.5 h-3.5 text-[#0b0a0a]" />
                        <span>Send</span>
                      </button>
                      <button
                        type="submit"
                        disabled={isSending}
                        className="bg-[#1c1815] hover:bg-[#28221d] border border-[#d4af37]/40 text-[#d4af37] px-3 py-1.5 rounded-sm flex items-center justify-center gap-1.5 cursor-pointer text-[10px] font-bold uppercase tracking-wider transition-all"
                      >
                        <MessageSquare className="w-3 h-3 text-[#d4af37]" />
                        <span>Send Message</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Socials & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8c8573]">
          <p>© {new Date().getFullYear()} Maison Noir. All rights reserved. Manhattan, New York.</p>

          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#a39d89] hover:text-[#d4af37] transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@maisonnoir</span>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#a39d89] hover:text-[#d4af37] transition-colors"
            >
              <Facebook className="w-3.5 h-3.5" />
              <span>Facebook</span>
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#a39d89] hover:text-[#d4af37] transition-colors"
            >
              <Pin className="w-3.5 h-3.5" />
              <span>Pinterest</span>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#a39d89] hover:text-[#d4af37] transition-colors"
            >
              <Youtube className="w-3.5 h-3.5" />
              <span>YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
