import React, { useState, useEffect } from 'react';
import { X, Lock, Users, Calendar, Search, LogOut, Wine, UserCheck, ShieldCheck, RefreshCw, Gift, MessageSquare, Sparkles, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { fetchUsersFromSupabase, fetchVouchersFromSupabase, fetchContactMessagesFromSupabase, fetchEventInquiriesFromSupabase, updateEventInquiryStatusInSupabase, VoucherRecord, ContactMessageRecord, EventInquiryRecord } from '../lib/supabase';
import { UserProfile } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const { currentUser, reservations, logout, cancelReservation } = useAuth();
  const [activeTab, setActiveTab] = useState<'reservations' | 'users' | 'vouchers' | 'messages' | 'inquiries'>('reservations');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Confirmed' | 'Cancelled'>('All');

  const [supabaseUsers, setSupabaseUsers] = useState<UserProfile[]>([]);
  const [vouchers, setVouchers] = useState<VoucherRecord[]>([]);
  const [messages, setMessages] = useState<ContactMessageRecord[]>([]);
  const [inquiries, setInquiries] = useState<EventInquiryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    const [uList, vList, mList, iList] = await Promise.all([
      fetchUsersFromSupabase(),
      fetchVouchersFromSupabase(),
      fetchContactMessagesFromSupabase(),
      fetchEventInquiriesFromSupabase(),
    ]);

    if (uList) setSupabaseUsers(uList);
    if (vList) setVouchers(vList);
    if (mList) setMessages(mList);
    if (iList) setInquiries(iList);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen || currentUser?.role !== 'admin') return null;

  const totalSeatsBooked = reservations
    .filter((r) => r.status === 'Confirmed')
    .reduce((sum, r) => sum + r.guests, 0);

  const capacityPercentage = Math.min(Math.round((totalSeatsBooked / 84) * 100), 100);

  const filteredReservations = reservations.filter((r) => {
    const matchesSearch =
      r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredUsers = supabaseUsers.filter((u) => {
    return (
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleToggleInquiryStatus = async (inquiry: EventInquiryRecord) => {
    if (!inquiry.id) return;
    const newStatus = inquiry.status === 'Confirmed' ? 'Pending' : 'Confirmed';
    await updateEventInquiryStatusInSupabase(inquiry.id, newStatus);
    setInquiries((prev) =>
      prev.map((i) => (i.id === inquiry.id ? { ...i, status: newStatus } : i))
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-in fade-in duration-300">
      <div data-lenis-prevent className="relative w-full max-w-5xl bg-[#0b0908] border border-red-500/40 rounded-lg shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Glowing Red/Gold Admin Banner */}
        <div className="h-1 bg-gradient-to-r from-red-600 via-[#d4af37] to-red-600" />

        {/* Admin Header */}
        <div className="p-6 bg-[#120f0d] border-b border-[#261e18] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-red-950 border border-red-600/50 flex items-center justify-center text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif-display text-2xl font-bold text-[#f3ebdc] tracking-wide">
                  Executive Admin Console
                </h2>
                <span className="text-[10px] font-bold uppercase bg-red-950 border border-red-600/50 text-red-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  🔒 Session Authenticated
                </span>
              </div>
              <p className="text-xs text-[#a39d89]">
                Authenticated as <strong className="text-[#d4af37]">{currentUser.name}</strong> ({currentUser.email})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="px-3.5 py-2 rounded text-xs font-bold uppercase tracking-wider bg-red-950 hover:bg-red-900 border border-red-700/60 text-red-200 flex items-center gap-1.5 transition-colors shadow-md"
            >
              <LogOut className="w-4 h-4" />
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

        {/* Navigation Tabs - Hidden Scrollbar */}
        <div className="bg-[#0f0c0a] px-6 py-2.5 border-b border-[#261e18] flex items-center justify-between gap-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setActiveTab('reservations');
                setSearchTerm('');
              }}
              className={`px-3.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'reservations'
                  ? 'bg-[#d4af37] text-[#0b0a0a] shadow-lg font-extrabold'
                  : 'bg-[#181412] text-[#a39d89] hover:text-[#f3ebdc] border border-[#2d231b]'
              }`}
            >
              <Wine className="w-3.5 h-3.5" />
              <span>Reservations ({reservations.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('users');
                setSearchTerm('');
                loadData();
              }}
              className={`px-3.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'users'
                  ? 'bg-[#d4af37] text-[#0b0a0a] shadow-lg font-extrabold'
                  : 'bg-[#181412] text-[#a39d89] hover:text-[#f3ebdc] border border-[#2d231b]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Users ({supabaseUsers.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('vouchers');
                setSearchTerm('');
                loadData();
              }}
              className={`px-3.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'vouchers'
                  ? 'bg-[#d4af37] text-[#0b0a0a] shadow-lg font-extrabold'
                  : 'bg-[#181412] text-[#a39d89] hover:text-[#f3ebdc] border border-[#2d231b]'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Vouchers ({vouchers.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('messages');
                setSearchTerm('');
                loadData();
              }}
              className={`px-3.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'messages'
                  ? 'bg-[#d4af37] text-[#0b0a0a] shadow-lg font-extrabold'
                  : 'bg-[#181412] text-[#a39d89] hover:text-[#f3ebdc] border border-[#2d231b]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Messages ({messages.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('inquiries');
                setSearchTerm('');
                loadData();
              }}
              className={`px-3.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'inquiries'
                  ? 'bg-[#d4af37] text-[#0b0a0a] shadow-lg font-extrabold'
                  : 'bg-[#181412] text-[#a39d89] hover:text-[#f3ebdc] border border-[#2d231b]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Suite Inquiries ({inquiries.length})</span>
            </button>
          </div>

          <button
            type="button"
            onClick={loadData}
            disabled={isLoading}
            className="p-2 bg-[#181412] border border-[#2d231b] hover:border-[#d4af37] text-[#a39d89] hover:text-[#d4af37] rounded-md transition-colors text-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
            title="Refresh Supabase Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#d4af37]' : ''}`} />
            <span className="hidden sm:inline">Sync Data</span>
          </button>
        </div>

        {/* Dashboard Body */}
        <div data-lenis-prevent className="p-6 overflow-y-auto space-y-6 custom-scrollbar flex-1 overscroll-contain">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="bg-[#14100e] border border-[#2d231b] rounded-lg p-3.5 flex items-center gap-3">
              <div className="p-2.5 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full text-[#d4af37] shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="truncate">
                <span className="text-[10px] text-[#8c8573] uppercase tracking-wider block">Bookings</span>
                <span className="text-xl font-serif-display font-bold text-[#f3ebdc]">
                  {reservations.length}
                </span>
              </div>
            </div>

            <div className="bg-[#14100e] border border-[#2d231b] rounded-lg p-3.5 flex items-center gap-3">
              <div className="p-2.5 bg-emerald-950 border border-emerald-700/40 rounded-full text-emerald-400 shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div className="truncate">
                <span className="text-[10px] text-[#8c8573] uppercase tracking-wider block">Users</span>
                <span className="text-xl font-serif-display font-bold text-[#f3ebdc]">
                  {supabaseUsers.length}
                </span>
              </div>
            </div>

            <div className="bg-[#14100e] border border-[#2d231b] rounded-lg p-3.5 flex items-center gap-3">
              <div className="p-2.5 bg-amber-950 border border-amber-700/40 rounded-full text-amber-400 shrink-0">
                <Gift className="w-5 h-5" />
              </div>
              <div className="truncate">
                <span className="text-[10px] text-[#8c8573] uppercase tracking-wider block">Vouchers</span>
                <span className="text-xl font-serif-display font-bold text-[#f3ebdc]">{vouchers.length}</span>
              </div>
            </div>

            <div className="bg-[#14100e] border border-[#2d231b] rounded-lg p-3.5 flex items-center gap-3">
              <div className="p-2.5 bg-blue-950 border border-blue-700/40 rounded-full text-blue-400 shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="truncate">
                <span className="text-[10px] text-[#8c8573] uppercase tracking-wider block">Messages</span>
                <span className="text-xl font-serif-display font-bold text-[#f3ebdc]">{messages.length}</span>
              </div>
            </div>

            <div className="bg-[#14100e] border border-[#2d231b] rounded-lg p-3.5 flex items-center gap-3">
              <div className="p-2.5 bg-purple-950 border border-purple-700/40 rounded-full text-purple-400 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="truncate">
                <span className="text-[10px] text-[#8c8573] uppercase tracking-wider block">Inquiries</span>
                <span className="text-xl font-serif-display font-bold text-[#f3ebdc]">{inquiries.length}</span>
              </div>
            </div>
          </div>

          {/* TAB 1: RESERVATIONS */}
          {activeTab === 'reservations' && (
            <div className="bg-[#120f0d] border border-[#28201a] rounded-lg p-5 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-[#231b15]">
                <h3 className="font-serif-display text-xl text-[#f3ebdc] font-semibold flex items-center gap-2">
                  <Wine className="w-5 h-5 text-[#d4af37]" />
                  <span>Live Table Reservation Roster</span>
                </h3>

                {/* Controls */}
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  {/* Search */}
                  <div className="relative flex-1 sm:flex-initial">
                    <Search className="w-4 h-4 text-[#8c8573] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search guest or code..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full sm:w-48 bg-[#1a1512] border border-[#332820] focus:border-[#d4af37] rounded pl-9 pr-3 py-1.5 text-xs text-[#f3ebdc] focus:outline-none"
                    />
                  </div>

                  {/* Status Filter */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="bg-[#1a1512] border border-[#332820] text-[#f3ebdc] text-xs rounded px-3 py-1.5 focus:outline-none"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Reservations Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#241d17] text-[#8c8573] uppercase text-[10px] tracking-wider">
                      <th className="py-2.5 px-3">Code</th>
                      <th className="py-2.5 px-3">Guest Name & Email</th>
                      <th className="py-2.5 px-3">Date & Time</th>
                      <th className="py-2.5 px-3">Guests</th>
                      <th className="py-2.5 px-3">Seating Area</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1f1914]">
                    {filteredReservations.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-[#8c8573]">
                          No matching table reservations found.
                        </td>
                      </tr>
                    ) : (
                      filteredReservations.map((res) => (
                        <tr key={res.id} className="hover:bg-[#1a1512] transition-colors">
                          <td className="py-3 px-3 font-mono font-bold text-[#d4af37]">
                            {res.id}
                          </td>
                          <td className="py-3 px-3">
                            <div className="font-semibold text-[#f3ebdc]">{res.fullName}</div>
                            <div className="text-[11px] text-[#8c8573]">{res.email}</div>
                          </td>
                          <td className="py-3 px-3 text-[#d4ceb8]">
                            {res.date} @ {res.time}
                          </td>
                          <td className="py-3 px-3 font-bold text-[#f3ebdc]">
                            {res.guests}
                          </td>
                          <td className="py-3 px-3 text-[#a39d89] uppercase text-[11px]">
                            {res.seatingArea.replace('_', ' ')}
                          </td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                res.status === 'Confirmed'
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                  : 'bg-red-950 text-red-400 border border-red-800'
                              }`}
                            >
                              {res.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            {res.status === 'Confirmed' ? (
                              <button
                                onClick={() => cancelReservation(res.id)}
                                className="px-2.5 py-1 text-[11px] bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800 rounded transition-colors"
                              >
                                Cancel Booking
                              </button>
                            ) : (
                              <span className="text-[11px] text-[#8c8573] italic">Cancelled</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: REGISTERED USERS & SIGN UPS */}
          {activeTab === 'users' && (
            <div className="bg-[#120f0d] border border-[#28201a] rounded-lg p-5 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-[#231b15]">
                <h3 className="font-serif-display text-xl text-[#f3ebdc] font-semibold flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-[#d4af37]" />
                  <span>Registered Users & Sign-Ups</span>
                </h3>

                {/* Search */}
                <div className="relative w-full sm:w-auto">
                  <Search className="w-4 h-4 text-[#8c8573] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search user name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 bg-[#1a1512] border border-[#332820] focus:border-[#d4af37] rounded pl-9 pr-3 py-1.5 text-xs text-[#f3ebdc] focus:outline-none"
                  />
                </div>
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#241d17] text-[#8c8573] uppercase text-[10px] tracking-wider">
                      <th className="py-2.5 px-3">User ID</th>
                      <th className="py-2.5 px-3">Full Name</th>
                      <th className="py-2.5 px-3">Email Address</th>
                      <th className="py-2.5 px-3">Role</th>
                      <th className="py-2.5 px-3">Membership Tier</th>
                      <th className="py-2.5 px-3 text-right">Joined Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1f1914]">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-[#8c8573]">
                          {isLoading ? 'Loading registered users...' : 'No users registered yet.'}
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((usr) => (
                        <tr key={usr.id} className="hover:bg-[#1a1512] transition-colors">
                          <td className="py-3 px-3 font-mono text-[#a39d89]">
                            {usr.id}
                          </td>
                          <td className="py-3 px-3 font-semibold text-[#f3ebdc]">
                            {usr.name}
                          </td>
                          <td className="py-3 px-3 text-[#d4af37]">
                            {usr.email}
                          </td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                usr.role === 'admin'
                                  ? 'bg-red-950 text-red-300 border border-red-700'
                                  : 'bg-amber-950/60 text-amber-300 border border-amber-800'
                              }`}
                            >
                              {usr.role}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-[#d4ceb8]">
                            {usr.membershipTier || 'Gold Patron'}
                          </td>
                          <td className="py-3 px-3 text-right text-[#8c8573]">
                            {usr.createdAt ? new Date(usr.createdAt).toLocaleDateString() : 'Recent'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: DIGITAL VOUCHERS */}
          {activeTab === 'vouchers' && (
            <div className="bg-[#120f0d] border border-[#28201a] rounded-lg p-5 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-[#231b15]">
                <h3 className="font-serif-display text-xl text-[#f3ebdc] font-semibold flex items-center gap-2">
                  <Gift className="w-5 h-5 text-[#d4af37]" />
                  <span>Issued Digital Vouchers</span>
                </h3>

                <div className="relative w-full sm:w-auto">
                  <Search className="w-4 h-4 text-[#8c8573] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search code, email or recipient..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 bg-[#1a1512] border border-[#332820] focus:border-[#d4af37] rounded pl-9 pr-3 py-1.5 text-xs text-[#f3ebdc] focus:outline-none"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#241d17] text-[#8c8573] uppercase text-[10px] tracking-wider">
                      <th className="py-2.5 px-3">Voucher Code</th>
                      <th className="py-2.5 px-3">Issuer Email & Password</th>
                      <th className="py-2.5 px-3">Recipient Name</th>
                      <th className="py-2.5 px-3">Amount</th>
                      <th className="py-2.5 px-3">Theme</th>
                      <th className="py-2.5 px-3 text-right">Created At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1f1914]">
                    {vouchers.filter(v =>
                      (v.voucher_code || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                      (v.user_email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                      (v.recipient_name || '').toLowerCase().includes(searchTerm.toLowerCase())
                    ).length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-[#8c8573]">
                          {isLoading ? 'Loading digital vouchers...' : 'No vouchers issued yet.'}
                        </td>
                      </tr>
                    ) : (
                      vouchers
                        .filter(v =>
                          (v.voucher_code || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (v.user_email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (v.recipient_name || '').toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((v, i) => (
                          <tr key={v.id || i} className="hover:bg-[#1a1512] transition-colors">
                            <td className="py-3 px-3 font-mono font-bold text-[#d4af37]">
                              {v.voucher_code}
                            </td>
                            <td className="py-3 px-3">
                              <div className="font-semibold text-[#f3ebdc]">{v.user_email}</div>
                              <div className="text-[11px] text-[#8c8573]">Pass: {v.user_password || '******'}</div>
                            </td>
                            <td className="py-3 px-3 text-[#f3ebdc]">
                              {v.recipient_name}
                            </td>
                            <td className="py-3 px-3 font-bold text-[#d4af37]">
                              ${v.amount}
                            </td>
                            <td className="py-3 px-3 text-[#a39d89] uppercase text-[10px]">
                              {v.card_theme}
                            </td>
                            <td className="py-3 px-3 text-right text-[#8c8573]">
                              {v.created_at ? new Date(v.created_at).toLocaleDateString() : 'Recent'}
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: CONTACT MESSAGES */}
          {activeTab === 'messages' && (
            <div className="bg-[#120f0d] border border-[#28201a] rounded-lg p-5 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-[#231b15]">
                <h3 className="font-serif-display text-xl text-[#f3ebdc] font-semibold flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#d4af37]" />
                  <span>Guest Direct Messages</span>
                </h3>

                <div className="relative w-full sm:w-auto">
                  <Search className="w-4 h-4 text-[#8c8573] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search name, email or note..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 bg-[#1a1512] border border-[#332820] focus:border-[#d4af37] rounded pl-9 pr-3 py-1.5 text-xs text-[#f3ebdc] focus:outline-none"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#241d17] text-[#8c8573] uppercase text-[10px] tracking-wider">
                      <th className="py-2.5 px-3">Sender Name</th>
                      <th className="py-2.5 px-3">Email Address</th>
                      <th className="py-2.5 px-3">Message Note</th>
                      <th className="py-2.5 px-3 text-right">Received Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1f1914]">
                    {messages.filter(m =>
                      (m.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                      (m.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                      (m.message || '').toLowerCase().includes(searchTerm.toLowerCase())
                    ).length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-[#8c8573]">
                          {isLoading ? 'Loading direct messages...' : 'No guest messages received yet.'}
                        </td>
                      </tr>
                    ) : (
                      messages
                        .filter(m =>
                          (m.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (m.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (m.message || '').toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((m, i) => (
                          <tr key={m.id || i} className="hover:bg-[#1a1512] transition-colors">
                            <td className="py-3 px-3 font-semibold text-[#f3ebdc]">
                              {m.full_name || 'Guest'}
                            </td>
                            <td className="py-3 px-3 text-[#d4af37]">
                              {m.email}
                            </td>
                            <td className="py-3 px-3 text-[#d4ceb8] max-w-md">
                              "{m.message}"
                            </td>
                            <td className="py-3 px-3 text-right text-[#8c8573]">
                              {m.created_at ? new Date(m.created_at).toLocaleDateString() : 'Recent'}
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: SUITE INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="bg-[#120f0d] border border-[#28201a] rounded-lg p-5 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-[#231b15]">
                <h3 className="font-serif-display text-xl text-[#f3ebdc] font-semibold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#d4af37]" />
                  <span>Bespoke Suite & Event Inquiries</span>
                </h3>

                <div className="relative w-full sm:w-auto">
                  <Search className="w-4 h-4 text-[#8c8573] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search name, room or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 bg-[#1a1512] border border-[#332820] focus:border-[#d4af37] rounded pl-9 pr-3 py-1.5 text-xs text-[#f3ebdc] focus:outline-none"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#241d17] text-[#8c8573] uppercase text-[10px] tracking-wider">
                      <th className="py-2.5 px-3">Guest Name & Contact</th>
                      <th className="py-2.5 px-3">Suite / Room</th>
                      <th className="py-2.5 px-3">Date & Guests</th>
                      <th className="py-2.5 px-3">Special Notes</th>
                      <th className="py-2.5 px-3 text-center">Status</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1f1914]">
                    {inquiries.filter(i =>
                      (i.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                      (i.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                      (i.room_name || '').toLowerCase().includes(searchTerm.toLowerCase())
                    ).length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-[#8c8573]">
                          {isLoading ? 'Loading suite inquiries...' : 'No suite inquiries submitted yet.'}
                        </td>
                      </tr>
                    ) : (
                      inquiries
                        .filter(i =>
                          (i.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (i.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (i.room_name || '').toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((inq, idx) => (
                          <tr key={inq.id || idx} className="hover:bg-[#1a1512] transition-colors">
                            <td className="py-3 px-3">
                              <div className="font-semibold text-[#f3ebdc]">{inq.full_name}</div>
                              <div className="text-[11px] text-[#d4af37]">{inq.email}</div>
                              <div className="text-[10px] text-[#8c8573]">{inq.phone}</div>
                            </td>
                            <td className="py-3 px-3 font-semibold text-[#f5e4b3]">
                              {inq.room_name}
                            </td>
                            <td className="py-3 px-3 text-[#c7c0af]">
                              <div>{inq.target_date}</div>
                              <div className="text-[10px] text-[#8c8573]">{inq.guests} Guests</div>
                            </td>
                            <td className="py-3 px-3 text-[#a39d89] max-w-xs truncate">
                              {inq.notes ? `"${inq.notes}"` : 'None'}
                            </td>
                            <td className="py-3 px-3 text-center">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                inq.status === 'Confirmed'
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-600/50'
                                  : 'bg-amber-950 text-amber-400 border border-amber-600/50'
                              }`}>
                                {inq.status === 'Confirmed' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                <span>{inq.status || 'Pending'}</span>
                              </span>
                            </td>
                            <td className="py-3 px-3 text-right">
                              <button
                                type="button"
                                onClick={() => handleToggleInquiryStatus(inq)}
                                className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-all cursor-pointer ${
                                  inq.status === 'Confirmed'
                                    ? 'bg-[#1e1915] border border-[#3d332a] text-[#a39d89] hover:text-amber-400'
                                    : 'bg-[#d4af37] text-[#0b0a0a] hover:bg-[#f5e4b3] font-extrabold shadow-md'
                                }`}
                              >
                                {inq.status === 'Confirmed' ? 'Set Pending' : 'Confirm Inquiry'}
                              </button>
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
