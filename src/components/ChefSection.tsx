import React, { useState, useEffect, useRef } from 'react';
import { Award, Star, Volume2, Play, Pause, Sparkles, VolumeX } from 'lucide-react';
import { CHEF_INFO } from '../data/restaurantData';

export const ChefSection: React.FC = () => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Stop audio speech and synth
  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    if (gainNodeRef.current && audioContextRef.current) {
      try {
        gainNodeRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.2);
        setTimeout(() => {
          oscillatorsRef.current.forEach((osc) => {
            try { osc.stop(); } catch (e) { /* ignore */ }
          });
          oscillatorsRef.current = [];
          if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close();
            audioContextRef.current = null;
          }
        }, 300);
      } catch (e) {
        console.error(e);
      }
    }

    setIsPlayingAudio(false);
    setAudioProgress(0);
  };

  // Play audio speech + ambient Web Audio synthesizer chord
  const playAudio = () => {
    stopAudio();
    setIsPlayingAudio(true);

    // 1. Web Audio Ambient Synthesizer
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(0, ctx.currentTime);
      mainGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1);
      mainGain.connect(ctx.destination);
      gainNodeRef.current = mainGain;

      // Luxury acoustic harmonic chord frequencies (A Major 9 / Warm Ambient)
      const frequencies = [220, 277.18, 329.63, 440, 554.37, 659.25];

      frequencies.forEach((freq) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Subtle LFO modulation for organic acoustic warmth
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.2, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        oscGain.gain.setValueAtTime(0.15 / frequencies.length, ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(mainGain);
        osc.start();

        oscillatorsRef.current.push(osc);
      });
    } catch (err) {
      console.warn('Web Audio Context not supported or blocked:', err);
    }

    // 2. Speech Synthesis Narration
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const text = `Bonjour. I am Chef Alexandre Laurent. Welcome to Maison Noir. In my kitchen, culinary art is a sacred dialogue between Parisian classical technique and Tokyo's reverence for raw seasonality. Gastronomy is not merely taste—it is memory, emotion, and refined harmony. We invite you to experience our tasting story. Bon appétit.`;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.88;
      utterance.pitch = 0.95;

      // Select French or English sophisticated voice if available
      const voices = window.speechSynthesis.getVoices();
      const frenchVoice = voices.find(v => v.lang.includes('fr') || v.name.includes('French') || v.name.includes('Google'));
      if (frenchVoice) {
        utterance.voice = frenchVoice;
      }

      let interval: NodeJS.Timeout;
      const startTime = Date.now();
      const durationEstimate = 16000; // ~16 seconds

      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / durationEstimate) * 100, 100);
        setAudioProgress(progress);

        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 100);

      utterance.onend = () => {
        clearInterval(interval);
        stopAudio();
      };

      utterance.onerror = () => {
        clearInterval(interval);
        stopAudio();
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback timer if speech synth unavailable
      let timer = 0;
      const interval = setInterval(() => {
        timer += 5;
        setAudioProgress(timer);
        if (timer >= 100) {
          clearInterval(interval);
          stopAudio();
        }
      }, 500);
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <section id="chef" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070606] text-[#e8e2d8] relative border-t border-[#1c1916]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Chef Image Column */}
          <div className="lg:col-span-5 relative group">
            <div className="relative z-10 overflow-hidden rounded-sm border border-[#332c24] shadow-2xl">
              <img
                src={CHEF_INFO.image}
                alt={CHEF_INFO.name}
                referrerPolicy="no-referrer"
                className="w-full h-[520px] object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070606] via-transparent to-transparent opacity-80" />

              {/* Chef Name Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#0d0b0a]/90 backdrop-blur-md border border-[#d4af37]/30 rounded-sm">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] block font-sans-luxury">
                  {CHEF_INFO.role}
                </span>
                <h3 className="font-serif-display text-2xl text-[#f3ebdc] mt-1 font-semibold">
                  {CHEF_INFO.name}
                </h3>
                <p className="text-xs text-[#a39d89] mt-0.5">Parisian Precision × Tokyo Mastery</p>
              </div>
            </div>

            {/* Decorative Gold Frame Offset */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#d4af37]/20 rounded-sm z-0 hidden sm:block pointer-events-none" />
          </div>

          {/* Biography & Awards Column */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181512] border border-[#d4af37]/25 text-[#d4af37] text-xs font-sans-luxury tracking-[0.2em] uppercase mb-4">
                <Award className="w-3.5 h-3.5" />
                Culinary Leadership
              </div>
              <h2 className="font-serif-display text-4xl sm:text-5xl text-[#f3ebdc] tracking-wide mb-4">
                Chef Alexandre Laurent
              </h2>
              <p className="font-playfair text-xl text-[#d4af37] italic mb-6">
                "French precision seamlessly interwoven with Japanese restraint."
              </p>
              <div className="w-20 h-[1px] bg-[#d4af37] mb-6" />
            </div>

            {/* Biography Text */}
            <p className="text-sm sm:text-base text-[#c7c0af] leading-relaxed">
              {CHEF_INFO.bio}
            </p>

            {/* Quote & Interactive Audio Note Player */}
            <div className="p-6 bg-[#12100f] border-l-2 border-[#d4af37] rounded-r-sm space-y-4 shadow-xl relative overflow-hidden">
              <p className="font-playfair italic text-sm text-[#e8e2d8] leading-relaxed">
                "{CHEF_INFO.quote}"
              </p>

              <div className="pt-2 border-t border-[#231f1a] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-[10px] uppercase tracking-widest text-[#8c8573]">— Chef Alexandre Laurent</span>

                {/* Audio Experience Toggle with Visual Wave indicator */}
                <div className="flex items-center gap-3">
                  {isPlayingAudio && (
                    <div className="flex items-center gap-1 h-4">
                      <span className="w-1 bg-[#d4af37] h-full animate-bounce rounded-full" style={{ animationDelay: '0ms' }} />
                      <span className="w-1 bg-[#d4af37] h-3 animate-bounce rounded-full" style={{ animationDelay: '150ms' }} />
                      <span className="w-1 bg-[#d4af37] h-full animate-bounce rounded-full" style={{ animationDelay: '300ms' }} />
                      <span className="w-1 bg-[#d4af37] h-2 animate-bounce rounded-full" style={{ animationDelay: '450ms' }} />
                    </div>
                  )}

                  <button
                    onClick={isPlayingAudio ? stopAudio : playAudio}
                    className="btn-gold flex items-center gap-2.5 text-xs px-4 py-2 rounded-sm shadow-md"
                  >
                    {isPlayingAudio ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-[#0b0a0a]" />
                        <span>Pause Audio Note</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-[#0b0a0a]" />
                        <span>Listen to Chef's Philosophy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Progress bar during audio playback */}
              {isPlayingAudio && (
                <div className="w-full bg-[#24201b] h-1 rounded-full overflow-hidden mt-2">
                  <div
                    className="bg-[#d4af37] h-full transition-all duration-200"
                    style={{ width: `${audioProgress}%` }}
                  />
                </div>
              )}
            </div>

            {/* Awards Grid */}
            <div>
              <h4 className="font-serif-display text-xl text-[#f3ebdc] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                Accolades & Distinctions
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CHEF_INFO.awards.map((award, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#12100f] border border-[#26221d] rounded-sm hover:border-[#d4af37]/40 transition-colors flex items-start gap-3"
                  >
                    <Star className="w-4 h-4 text-[#d4af37] shrink-0 mt-1 fill-[#d4af37]/20" />
                    <div>
                      <h5 className="font-serif-display text-base text-[#f3ebdc] font-medium">{award.title}</h5>
                      <p className="text-xs text-[#8c8573]">{award.issuer} • {award.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
