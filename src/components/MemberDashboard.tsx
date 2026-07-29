import React from 'react';
import { X, Calendar, User, Award, CheckCircle2, AlertCircle, LogOut, Sparkles, Phone, MapPin, Gift } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface MemberDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReservation: () => void;
}

export const MemberDashboard: React.FC<MemberDashboardProps> = ({
  isOpen,
  onClose,
  onOpenReservation,
}) => {
  const { currentUser, reservations, logout, cancelReservation } = useAuth();
  const { t } = useLanguage();

  if (!isOpen || !currentUser) return null;

  const userEmailClean = (currentUser.email || '').trim().toLowerCase();
  const userNameClean = (currentUser.name || '').trim().toLowerCase();

  const myReservations = reservations.filter(
    (r) =>
      currentUser.role === 'admin' ||
      (r.email && r.email.trim().toLowerCase() === userEmailClean) ||
      (r.fullName && r.fullName.trim().toLowerCase() === userNameClean)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div data-lenis-prevent className="relative w-full max-w-3xl bg-[#0e0c0b] border border-[#d4af37]/30 rounded-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Decorative Top Accent */}
        <div className="h-1 bg-gradient-to-r from-[#d4af37] via-[#f5e4b3] to-[#d4af37]" />

        {/* Modal Header */}
        <div className="p-6 border-b border-[#231f1a] flex items-center justify-between bg-[#141110]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#d4af37]/15 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-[#f3ebdc]">
                  {currentUser.name}
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f5e4b3] px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Award className="w-3 h-3 text-[#d4af37]" />
                  {currentUser.membershipTier || 'Gold Patron'}
                </span>
              </div>
              <p className="text-xs text-[#a39d89]">{currentUser.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={logout}
              className="btn-dark px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 text-[#e57373] hover:text-white"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#a39d89] hover:text-[#d4af37] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Dashboard Body */}
        <div data-lenis-prevent className="p-6 overflow-y-auto space-y-6 custom-scrollbar flex-1 overscroll-contain">
          {/* Member Digital Pass / VIP Status Card */}
          <div className="bg-gradient-to-r from-[#1c1815] via-[#241f1a] to-[#1a1613] border border-[#d4af37]/40 rounded-lg p-5 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none text-[#d4af37]">
              <Sparkles className="w-32 h-32" />
            </div>

            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#d4af37] font-semibold">
                  Maison Noir Patron Pass
                </span>
                <h3 className="font-serif-display text-lg text-[#f3ebdc] font-semibold mt-0.5">
                  Exclusive Privileges Enabled
                </h3>
              </div>
              <span className="text-xs font-mono text-[#d4af37] border border-[#d4af37]/30 px-2.5 py-1 rounded bg-[#0b0a0a]">
                ID: {currentUser.id}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2 border-t border-[#332c25]">
              <div>
                <span className="text-[#8c8573] block text-[10px] uppercase">Table Priority</span>
                <span className="text-[#f3ebdc] font-medium">Guarantee 48h Advance Window</span>
              </div>
              <div>
                <span className="text-[#8c8573] block text-[10px] uppercase">Sommelier Service</span>
                <span className="text-[#f3ebdc] font-medium">Complimentary Vintage Tasting</span>
              </div>
              <div>
                <span className="text-[#8c8573] block text-[10px] uppercase">Chef Interaction</span>
                <span className="text-[#f3ebdc] font-medium">Direct Kitchen Greetings</span>
              </div>
            </div>
          </div>

          {/* Reserved Tables Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif-display text-xl text-[#f3ebdc] font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#d4af37]" />
                <span>My Table Reservations</span>
              </h3>
              <button
                onClick={() => {
                  onClose();
                  onOpenReservation();
                }}
                className="btn-gold px-3.5 py-1.5 rounded text-xs font-bold uppercase tracking-wider"
              >
                + New Table Reservation
              </button>
            </div>

            {myReservations.length === 0 ? (
              <div className="bg-[#141110] border border-[#231f1a] rounded-lg p-8 text-center text-xs text-[#a39d89] space-y-3">
                <Calendar className="w-8 h-8 text-[#d4af37] mx-auto opacity-50" />
                <p>You have no active table bookings recorded under this account.</p>
                <button
                  onClick={() => {
                    onClose();
                    onOpenReservation();
                  }}
                  className="btn-gold px-4 py-2 rounded uppercase text-xs font-bold"
                >
                  Reserve Your First Table
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {myReservations.map((res) => (
                  <div
                    key={res.id}
                    className="bg-[#141110] border border-[#2a241e] hover:border-[#d4af37]/40 rounded-lg p-4 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#d4af37] font-mono">
                          {res.confirmationCode}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                            res.status === 'Confirmed'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-red-950 text-red-400 border border-red-800'
                          }`}
                        >
                          {res.status}
                        </span>
                        {res.occasion && (
                          <span className="text-[10px] bg-[#221d18] text-[#d4ceb8] px-2 py-0.5 rounded border border-[#332a22]">
                            🎉 {res.occasion}
                          </span>
                        )}
                      </div>

                      <div className="text-sm text-[#f3ebdc] font-medium flex items-center gap-4 pt-1">
                        <span>📅 {res.date} at {res.time}</span>
                        <span>👥 {res.guests} Guests</span>
                      </div>

                      <div className="text-xs text-[#a39d89] flex items-center gap-2">
                        <span>Seating Area: <strong className="text-[#d4ceb8] uppercase">{res.seatingArea.replace('_', ' ')}</strong></span>
                      </div>
                    </div>

                    {res.status === 'Confirmed' && (
                      <button
                        onClick={() => cancelReservation(res.id)}
                        className="btn-dark text-xs px-3 py-1.5 rounded text-red-400 border-red-900/40 hover:bg-red-950/50"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
