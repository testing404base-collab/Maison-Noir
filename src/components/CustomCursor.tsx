import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if device supports fine cursor (desktop/mouse)
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let glowX = -100;
    let glowY = -100;

    let isHovered = false;
    let isMouseDown = false;
    let rafId: number;

    // Ultra-fast mousemove handler: pure coordinate updates, zero DOM tree traversal
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Event delegation for hover status: only triggers when crossing element boundaries
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'button, a, input, select, textarea, [role="button"], .cursor-pointer'
      );
      isHovered = !!interactive;
    };

    const onMouseDown = () => {
      isMouseDown = true;
    };
    const onMouseUp = () => {
      isMouseDown = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });

    // Hardware accelerated RAF Render Loop
    const loop = () => {
      // Smooth lerp calculations
      ringX += (mouseX - ringX) * 0.35;
      ringY += (mouseY - ringY) * 0.35;

      glowX += (mouseX - glowX) * 0.18;
      glowY += (mouseY - glowY) * 0.18;

      if (dotRef.current) {
        const scale = isMouseDown ? 1.4 : isHovered ? 1.7 : 1;
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      if (ringRef.current) {
        const scale = isMouseDown ? 0.75 : isHovered ? 1.35 : 1;
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;
        ringRef.current.style.borderColor = isHovered ? '#f5e4b3' : 'rgba(212, 175, 55, 0.85)';
        ringRef.current.style.backgroundColor = isHovered ? 'rgba(212, 175, 55, 0.15)' : 'transparent';
      }

      if (glowRef.current) {
        const scale = isHovered ? 1.3 : 1;
        glowRef.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Soft Ambient Gold Spotlight Glow (No heavy CSS blur filter to eliminate scroll/cursor lag) */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed top-0 left-0 z-[9997] rounded-full w-[180px] h-[180px] opacity-40 hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.22) 0%, rgba(212, 175, 55, 0.08) 45%, rgba(212, 175, 55, 0) 75%)',
          willChange: 'transform',
        }}
      />

      {/* Outer Smooth Lag-Free Precision Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full w-9 h-9 border border-[#d4af37] transition-colors duration-150 hidden md:block"
        style={{
          boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)',
          willChange: 'transform',
        }}
      />

      {/* Center Instant Follow Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full w-2.5 h-2.5 bg-gradient-to-r from-[#ffffff] to-[#d4af37] hidden md:block"
        style={{
          boxShadow: '0 0 12px rgba(255, 255, 255, 0.9), 0 0 6px #d4af37',
          willChange: 'transform',
        }}
      />
    </>
  );
};
