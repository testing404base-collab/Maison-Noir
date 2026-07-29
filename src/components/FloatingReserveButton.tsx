import React from 'react';
import { Calendar } from 'lucide-react';

interface FloatingReserveButtonProps {
  onClick: () => void;
}

export const FloatingReserveButton: React.FC<FloatingReserveButtonProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center justify-center group">
      {/* Wave Ripples emanating from behind the button */}
      <div className="absolute inset-0 rounded-full border border-[#d4af37] animate-wave-ring-1 pointer-events-none" />
      <div className="absolute inset-0 rounded-full border border-[#d4af37] animate-wave-ring-2 pointer-events-none" />
      <div className="absolute inset-0 rounded-full border border-[#f5e4b3] animate-wave-ring-3 pointer-events-none" />

      {/* Main Floating Circle Button */}
      <button
        onClick={onClick}
        aria-label="Reserve Table"
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full btn-gold border-2 border-[#f5e4b3] shadow-[0_0_30px_rgba(212,175,55,0.7)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
      >
        <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-[#0b0a0a] group-hover:rotate-12 transition-transform duration-300" />
      </button>

      {/* Hover Label Tooltip */}
      <div className="absolute right-full mr-3 px-3 py-1.5 bg-[#12100f]/95 backdrop-blur-md border border-[#d4af37]/40 rounded text-xs font-sans-luxury text-[#f3ebdc] font-semibold uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-xl">
        Reserve Table
      </div>
    </div>
  );
};
