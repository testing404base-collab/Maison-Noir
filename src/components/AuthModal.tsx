import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle2, Sparkles, UserCheck, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { loginWithCredentials } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid Gmail / Email address.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Please enter a password.');
      return;
    }

    const res = loginWithCredentials(fullName, email, password);

    if (res.success) {
      if (res.role === 'admin') {
        setSuccessMessage('Logged in as Executive Admin. Access granted!');
      } else {
        setSuccessMessage(`Welcome, ${fullName.trim()}! You are now signed in.`);
      }

      setTimeout(() => {
        onClose();
        if (onSuccess) {
          onSuccess();
        }
      }, 700);
    } else {
      setErrorMessage(res.message || 'Authentication failed. Please check your details.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-[#0f0d0c] border border-[#d4af37]/30 rounded-lg p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Top Decorative Gold Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4af37] via-[#f5e4b3] to-[#d4af37]" />

        {/* Close Modal Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#a39d89] hover:text-[#d4af37] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#f3ebdc] uppercase tracking-wider">
            Sign In / Register
          </h2>
          <p className="text-xs font-sans-luxury text-[#a39d89] mt-1">
            Access reservations, priority seating & exclusive member benefits
          </p>
        </div>

        {/* Error Feedback */}
        {errorMessage && (
          <div className="mb-5 p-3.5 bg-red-950/60 border border-red-600/40 rounded-md text-red-200 text-xs flex items-center gap-2.5 animate-in slide-in-from-top-2">
            <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
            <p className="font-semibold">{errorMessage}</p>
          </div>
        )}

        {/* Success Feedback */}
        {successMessage && (
          <div className="mb-5 p-3.5 bg-emerald-950/60 border border-emerald-600/40 rounded-md text-emerald-200 text-xs flex items-center gap-2.5 animate-in slide-in-from-top-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <p className="font-semibold">{successMessage}</p>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-sans-luxury text-[#d4ceb8] uppercase tracking-wider mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Lord Julian Vance"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-[#181614] border border-[#2d2822] focus:border-[#d4af37] rounded px-3.5 py-2.5 text-sm text-[#f3ebdc] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-sans-luxury text-[#d4ceb8] uppercase tracking-wider mb-1.5">
              Gmail / Email *
            </label>
            <input
              type="email"
              required
              placeholder="e.g. julian@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#181614] border border-[#2d2822] focus:border-[#d4af37] rounded px-3.5 py-2.5 text-sm text-[#f3ebdc] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-sans-luxury text-[#d4ceb8] uppercase tracking-wider mb-1.5">
              Password *
            </label>
            <input
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#181614] border border-[#2d2822] focus:border-[#d4af37] rounded px-3.5 py-2.5 text-sm text-[#f3ebdc] focus:outline-none transition-colors"
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full btn-gold py-3.5 rounded-sm font-sans-luxury text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl"
            >
              <UserCheck className="w-4 h-4 text-[#0b0a0a]" />
              <span>Continue / Sign In</span>
            </button>
          </div>

          <p className="text-[11px] text-[#8c8573] text-center pt-2">
            Sign in is required to make and manage table reservations at Maison Noir.
          </p>
        </form>
      </div>
    </div>
  );
};
