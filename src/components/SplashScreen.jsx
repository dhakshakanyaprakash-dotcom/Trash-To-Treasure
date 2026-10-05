import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SplashScreen.css';

/**
 * CINEMATIC SPLASH CONFIGURATION
 * Tune all timing durations, particle counts, and design tokens here.
 */
export const SPLASH_CONFIG = {
  // Phase durations (seconds)
  driftDuration: 0.8,      // 0.0s - 0.8s: Waste items drift in from edges
  swirlDuration: 1.2,      // 0.8s - 2.0s: Items swirl in spiral toward center
  mergeDuration: 0.6,      // 2.0s - 2.6s: Merge into glowing T2T treasure + sparkle burst
  wordmarkDuration: 0.7,   // 2.6s - 3.3s: Wordmark & tagline fade up
  revealDuration: 0.7,     // 3.3s - 4.0s: Screen door reveal uncovers home page
  totalDuration: 4.0,      // Total cinematic sequence length
  reducedMotionDuration: 0.8, // Simple logo fade for prefers-reduced-motion

  // Item counts
  desktopItemCount: 26,
  mobileItemCount: 14,

  // Theme Design Tokens
  colors: {
    cream: '#F6F1E7',
    sage: '#7A9A6B',
    forest: '#2F5D3A',
    terracotta: '#C8643C',
    mustard: '#E2A93B',
    charcoal: '#2B2B2B',
    gold: '#E8B923',
    lightSage: '#A6C298',
    warmSand: '#E8DFCE',
  }
};

/* -------------------------------------------------------------
 * INLINE TACTILE FELT-CUTOUT SVG WASTE ITEMS (No External Requests)
 * ------------------------------------------------------------- */

const PlasticBottle = ({ color, stitch }) => (
  <svg viewBox="0 0 40 70" width="36" height="58" className="waste-svg" aria-hidden="true">
    <rect x="15" y="2" width="10" height="7" rx="2" fill="#E2A93B" stroke="#2B2B2B" strokeWidth="1.2" />
    <path d="M17 9 L17 14 L11 20 L11 58 Q11 66 20 66 Q29 66 29 58 L29 20 L23 14 L23 9 Z" fill={color} stroke="#2B2B2B" strokeWidth="1.4" />
    <path d="M13 26 L27 26 M13 38 L27 38 M13 50 L27 50" stroke={stitch} strokeWidth="1.2" strokeDasharray="2.5 2" fill="none" />
    <path d="M20 18 L20 60" stroke={stitch} strokeWidth="1.1" strokeDasharray="3 2" fill="none" />
  </svg>
);

const TinCan = ({ color, stitch }) => (
  <svg viewBox="0 0 50 65" width="40" height="52" className="waste-svg" aria-hidden="true">
    <rect x="6" y="10" width="38" height="46" rx="4" fill={color} stroke="#2B2B2B" strokeWidth="1.4" />
    <ellipse cx="25" cy="10" rx="19" ry="6" fill="#F6F1E7" stroke="#2B2B2B" strokeWidth="1.4" />
    <ellipse cx="25" cy="56" rx="19" ry="6" fill={color} stroke="#2B2B2B" strokeWidth="1.4" />
    <circle cx="25" cy="10" r="3" fill="#E2A93B" stroke="#2B2B2B" strokeWidth="1" />
    <line x1="8" y1="24" x2="42" y2="24" stroke={stitch} strokeWidth="1.2" strokeDasharray="3 2" />
    <line x1="8" y1="34" x2="42" y2="34" stroke="#2B2B2B" strokeWidth="1.2" strokeDasharray="3 2" />
    <line x1="8" y1="44" x2="42" y2="44" stroke={stitch} strokeWidth="1.2" strokeDasharray="3 2" />
  </svg>
);

const CardboardPiece = ({ color, stitch }) => (
  <svg viewBox="0 0 60 50" width="48" height="40" className="waste-svg" aria-hidden="true">
    <path d="M6 8 L54 6 L50 44 L8 42 Z" fill={color} stroke="#2B2B2B" strokeWidth="1.4" />
    <path d="M54 6 Q50 14 54 20 Q50 28 54 34 Q50 40 50 44" fill="none" stroke="#2B2B2B" strokeWidth="1.5" />
    <path d="M10 12 L48 10 L44 38 L12 36 Z" fill="none" stroke={stitch} strokeWidth="1.2" strokeDasharray="3 2" />
    <path d="M16 18 Q20 22 24 18 Q28 22 32 18 Q36 22 40 18" fill="none" stroke="#2B2B2B" strokeWidth="1.2" />
  </svg>
);

const ClothScrap = ({ color, stitch }) => (
  <svg viewBox="0 0 55 55" width="44" height="44" className="waste-svg" aria-hidden="true">
    <polygon points="8,10 16,6 24,10 32,6 40,10 48,6 46,18 50,26 46,34 50,42 42,46 34,42 26,46 18,42 10,46 6,38 10,30 6,22 10,14" fill={color} stroke="#2B2B2B" strokeWidth="1.4" />
    <g stroke={stitch} strokeWidth="1.4">
      <line x1="18" y1="20" x2="26" y2="28" /><line x1="26" y1="20" x2="18" y2="28" />
      <line x1="30" y1="24" x2="38" y2="32" /><line x1="38" y1="24" x2="30" y2="32" />
    </g>
  </svg>
);

const GlassJar = ({ color, stitch }) => (
  <svg viewBox="0 0 50 65" width="40" height="52" className="waste-svg" aria-hidden="true">
    <rect x="12" y="4" width="26" height="8" rx="2" fill="#E2A93B" stroke="#2B2B2B" strokeWidth="1.4" />
    <line x1="15" y1="8" x2="35" y2="8" stroke="#F6F1E7" strokeWidth="1" strokeDasharray="2 2" />
    <rect x="8" y="14" width="34" height="46" rx="8" fill={color} stroke="#2B2B2B" strokeWidth="1.4" />
    <rect x="14" y="26" width="22" height="20" rx="3" fill="#F6F1E7" stroke="#2B2B2B" strokeWidth="1.2" />
    <path d="M16 28 L34 28 L34 44 L16 44 Z" fill="none" stroke={stitch} strokeWidth="1" strokeDasharray="2 1.5" />
  </svg>
);

const Newspaper = ({ color, stitch }) => (
  <svg viewBox="0 0 55 60" width="42" height="48" className="waste-svg" aria-hidden="true">
    <polygon points="6,6 42,6 50,14 50,54 6,54" fill="#F6F1E7" stroke="#2B2B2B" strokeWidth="1.4" />
    <polygon points="42,6 42,14 50,14" fill={color} stroke="#2B2B2B" strokeWidth="1.2" />
    <rect x="12" y="14" width="26" height="5" rx="1" fill="#2B2B2B" />
    <line x1="12" y1="20" x2="44" y2="20" stroke={stitch} strokeWidth="1.2" strokeDasharray="3 2" />
    <line x1="12" y1="28" x2="44" y2="28" stroke={color} strokeWidth="2" strokeDasharray="4 2" />
    <line x1="12" y1="36" x2="44" y2="36" stroke="#2B2B2B" strokeWidth="1.5" strokeDasharray="3 2" />
    <line x1="12" y1="44" x2="36" y2="44" stroke="#2B2B2B" strokeWidth="1.5" strokeDasharray="3 2" />
  </svg>
);

const Tyre = ({ color, stitch }) => (
  <svg viewBox="0 0 55 55" width="44" height="44" className="waste-svg" aria-hidden="true">
    <circle cx="27.5" cy="27.5" r="23" fill="#2B2B2B" stroke={color} strokeWidth="1.5" />
    <circle cx="27.5" cy="27.5" r="18" fill="none" stroke={stitch} strokeWidth="2" strokeDasharray="3 3" />
    <circle cx="27.5" cy="27.5" r="9" fill={color} stroke="#F6F1E7" strokeWidth="1.2" />
  </svg>
);

const ShoppingBag = ({ color, stitch }) => (
  <svg viewBox="0 0 50 60" width="40" height="48" className="waste-svg" aria-hidden="true">
    <path d="M8 20 L42 20 L38 54 L12 54 Z" fill={color} stroke="#2B2B2B" strokeWidth="1.4" />
    <path d="M18 20 C18 8, 32 8, 32 20" fill="none" stroke="#E2A93B" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M12 24 L38 24 M15 50 L35 50" stroke={stitch} strokeWidth="1.2" strokeDasharray="2.5 2" />
    <line x1="25" y1="24" x2="25" y2="50" stroke="#2B2B2B" strokeWidth="1" strokeDasharray="3 2" />
  </svg>
);

const BottleCap = ({ color, stitch }) => (
  <svg viewBox="0 0 50 50" width="38" height="38" className="waste-svg" aria-hidden="true">
    <path d="M25 4 C27 4 28 6 30 5 C32 4 34 6 36 6 C38 6 39 8 41 9 C43 10 43 12 44 14 C45 16 46 18 46 20 C46 22 47 24 46 26 C45 28 45 30 44 32 C43 34 42 36 40 37 C38 38 37 40 35 41 C33 42 31 43 29 44 C27 45 25 45 23 44 C21 43 19 42 17 41 C15 40 14 38 12 37 C10 36 9 34 8 32 C7 30 7 28 6 26 C5 24 6 22 6 20 C6 18 7 16 8 14 C9 12 10 10 12 9 C14 8 15 6 17 6 C19 6 21 4 23 5 C24 6 25 4 25 4 Z" fill={color} stroke="#2B2B2B" strokeWidth="1.4" />
    <circle cx="25" cy="25" r="14" fill="#F6F1E7" stroke="#2B2B2B" strokeWidth="1.2" />
    <circle cx="25" cy="25" r="10" fill={color} stroke={stitch} strokeWidth="1" strokeDasharray="2 1.5" />
  </svg>
);

const CardboardBox = ({ color, stitch }) => (
  <svg viewBox="0 0 55 55" width="44" height="44" className="waste-svg" aria-hidden="true">
    <polygon points="6,20 28,10 50,20 28,30" fill={color} stroke="#2B2B2B" strokeWidth="1.4" />
    <polygon points="6,20 28,30 28,50 6,40" fill={color} stroke="#2B2B2B" strokeWidth="1.4" style={{ filter: 'brightness(0.92)' }} />
    <polygon points="28,30 50,20 50,40 28,50" fill={color} stroke="#2B2B2B" strokeWidth="1.4" style={{ filter: 'brightness(0.85)' }} />
    <polygon points="24,12 32,8 32,48 24,52" fill="#E2A93B" opacity="0.85" />
    <line x1="12" y1="28" x2="22" y2="33" stroke={stitch} strokeWidth="1.2" strokeDasharray="2.5 1.5" />
    <line x1="34" y1="33" x2="44" y2="28" stroke={stitch} strokeWidth="1.2" strokeDasharray="2.5 1.5" />
  </svg>
);

const WASTE_COMPONENTS = [
  PlasticBottle,
  TinCan,
  CardboardPiece,
  ClothScrap,
  GlassJar,
  Newspaper,
  Tyre,
  ShoppingBag,
  BottleCap,
  CardboardBox
];

const ITEM_COLORS = [
  SPLASH_CONFIG.colors.sage,
  SPLASH_CONFIG.colors.terracotta,
  SPLASH_CONFIG.colors.mustard,
  SPLASH_CONFIG.colors.forest,
  '#C07850', // warm clay
  '#8EA77F', // light moss
  '#556B4A'  // deep pine
];

/* -------------------------------------------------------------
 * T2T TREASURE LOGO EMBLEM SVG (The Merged Treasure)
 * ------------------------------------------------------------- */
const TreasureLogoMark = () => (
  <svg viewBox="0 0 160 160" width="130" height="130" className="treasure-emblem-svg" aria-hidden="true">
    <defs>
      <radialGradient id="treasureBackGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF7D6" stopOpacity="1" />
        <stop offset="60%" stopColor="#F6EAC2" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#E2A93B" stopOpacity="0.4" />
      </radialGradient>
      <filter id="softGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Golden Background Glow Disc */}
    <circle cx="80" cy="80" r="74" fill="url(#treasureBackGlow)" stroke="#C8643C" strokeWidth="2.5" />
    <circle cx="80" cy="80" r="69" fill="none" stroke="#F6F1E7" strokeWidth="1.8" strokeDasharray="4 3" />

    {/* Intertwined Leaf / Heart Recycling Loop */}
    {/* Arrow 1: Forest Green Leaf Loop */}
    <path
      d="M80 22 C108 22 136 46 136 78 C136 100 118 122 80 144"
      fill="none"
      stroke="#2F5D3A"
      strokeWidth="9"
      strokeLinecap="round"
    />
    <polygon points="76,14 90,22 76,30" fill="#2F5D3A" />

    {/* Arrow 2: Terracotta Warm Loop */}
    <path
      d="M80 144 C42 122 24 100 24 78 C24 46 52 22 80 22"
      fill="none"
      stroke="#C8643C"
      strokeWidth="9"
      strokeLinecap="round"
    />
    <polygon points="84,136 70,144 84,152" fill="#C8643C" />

    {/* Central Leaf Vein and Sprout Accents */}
    <path
      d="M80 40 Q80 80 102 70"
      fill="none"
      stroke="#7A9A6B"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M80 60 Q80 100 58 90"
      fill="none"
      stroke="#E2A93B"
      strokeWidth="4"
      strokeLinecap="round"
    />

    {/* Stitched 'T2T' Central Medallion */}
    <g transform="translate(42, 60)" filter="url(#softGlowFilter)">
      {/* T */}
      <rect x="0" y="0" width="22" height="6" rx="2" fill="#C8643C" stroke="#2B2B2B" strokeWidth="1" />
      <rect x="8" y="5" width="6" height="24" rx="2" fill="#C8643C" stroke="#2B2B2B" strokeWidth="1" />
      <line x1="2" y1="3" x2="20" y2="3" stroke="#F6F1E7" strokeWidth="1" strokeDasharray="2 1.5" />
      <line x1="11" y1="7" x2="11" y2="27" stroke="#F6F1E7" strokeWidth="1" strokeDasharray="2 1.5" />

      {/* 2 */}
      <path
        d="M28 8 Q37 0 44 8 Q46 16 34 26 L48 26 L48 30 L28 30 L28 26 Q40 18 36 12 Q33 7 28 10 Z"
        fill="#7A9A6B"
        stroke="#2B2B2B"
        strokeWidth="1"
      />
      <path
        d="M31 10 Q37 4 41 10 Q42 16 34 24 L45 24"
        fill="none"
        stroke="#F6F1E7"
        strokeWidth="1"
        strokeDasharray="2 1.5"
      />

      {/* T */}
      <rect x="54" y="0" width="22" height="6" rx="2" fill="#2F5D3A" stroke="#2B2B2B" strokeWidth="1" />
      <rect x="62" y="5" width="6" height="24" rx="2" fill="#2F5D3A" stroke="#2B2B2B" strokeWidth="1" />
      <line x1="56" y1="3" x2="74" y2="3" stroke="#F6F1E7" strokeWidth="1" strokeDasharray="2 1.5" />
      <line x1="65" y1="7" x2="65" y2="27" stroke="#F6F1E7" strokeWidth="1" strokeDasharray="2 1.5" />
    </g>

    {/* Golden Sprout Leaf at Crown */}
    <path
      d="M74 22 C74 12, 86 12, 86 22 C86 22, 74 22, 74 22 Z"
      fill="#7A9A6B"
      stroke="#2B2B2B"
      strokeWidth="1"
    />
  </svg>
);

/* -------------------------------------------------------------
 * MAIN COMPONENT: SplashScreen
 * ------------------------------------------------------------- */
export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('drift'); // 'drift' | 'swirl' | 'merge' | 'wordmark' | 'reveal' | 'finished'
  const [isMuted, setIsMuted] = useState(true);
  const audioCtxRef = useRef(null);

  // Check user preference for reduced motion
  const prefersReduced = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Screen dimension tracking for responsive item generation
  const [dimensions, setDimensions] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  }));

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent background scrolling while splash is visible
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Sound Synthesizer via Web Audio API (Zero external assets)
  const playCinematicSound = useCallback(() => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const now = ctx.currentTime;

      // Filtered wind whoosh during spiral convergence
      const bufferSize = Math.floor(ctx.sampleRate * 0.9);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.12;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(350, now + 0.1);
      filter.frequency.exponentialRampToValueAtTime(1400, now + 1.1);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, now);
      noiseGain.gain.linearRampToValueAtTime(0.09, now + 0.5);
      noiseGain.gain.linearRampToValueAtTime(0.001, now + 1.1);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      whiteNoise.start(now);

      // Harmonious chime chord when treasure merges (E5, G#5, B5, E6)
      const chimeFrequencies = [659.25, 830.61, 987.77, 1318.5];
      chimeFrequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + 1.2 + idx * 0.05);

        gain.gain.setValueAtTime(0.001, now + 1.2 + idx * 0.05);
        gain.gain.linearRampToValueAtTime(0.06 / (idx + 1), now + 1.25 + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + 1.2 + idx * 0.05);
        osc.stop(now + 2.6);
      });
    } catch {
      // Audio playback fails gracefully without impacting visual flow
    }
  }, [isMuted]);

  // Finish and dismiss splash
  const handleFinish = useCallback(() => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem('t2t_splash_seen', 'true');
    }
    if (onComplete) onComplete();
  }, [onComplete]);

  // Skip trigger
  const handleSkip = useCallback(() => {
    setPhase('finished');
    handleFinish();
  }, [handleFinish]);

  // Keyboard shortcut listener (Escape, Space, Enter to skip)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip]);

  // Timing Director based on SPLASH_CONFIG
  useEffect(() => {
    if (prefersReduced) {
      // Reduced motion: gentle 0.8s logo fade
      const t = setTimeout(() => {
        handleFinish();
      }, SPLASH_CONFIG.reducedMotionDuration * 1000);
      return () => clearTimeout(t);
    }

    const { driftDuration, swirlDuration, mergeDuration, wordmarkDuration, revealDuration } = SPLASH_CONFIG;

    const tSwirl = setTimeout(() => {
      setPhase('swirl');
      playCinematicSound();
    }, driftDuration * 1000);

    const tMerge = setTimeout(() => {
      setPhase('merge');
    }, (driftDuration + swirlDuration) * 1000);

    const tWordmark = setTimeout(() => {
      setPhase('wordmark');
    }, (driftDuration + swirlDuration + mergeDuration) * 1000);

    const tReveal = setTimeout(() => {
      setPhase('reveal');
    }, (driftDuration + swirlDuration + mergeDuration + wordmarkDuration) * 1000);

    const tEnd = setTimeout(() => {
      setPhase('finished');
      handleFinish();
    }, (driftDuration + swirlDuration + mergeDuration + wordmarkDuration + revealDuration) * 1000);

    return () => {
      clearTimeout(tSwirl);
      clearTimeout(tMerge);
      clearTimeout(tWordmark);
      clearTimeout(tReveal);
      clearTimeout(tEnd);
    };
  }, [prefersReduced, handleFinish, playCinematicSound]);

  // Generate responsive waste items with polar coordinates
  const wasteItems = useMemo(() => {
    const isMobile = dimensions.width < 768;
    const isSmallMobile = dimensions.width < 480;
    const count = isSmallMobile 
      ? 12 
      : isMobile 
        ? SPLASH_CONFIG.mobileItemCount 
        : SPLASH_CONFIG.desktopItemCount;

    const radiusBase = Math.max(dimensions.width, dimensions.height) * (isMobile ? 0.72 : 0.65);
    const maxDriftX = dimensions.width * 0.4;
    const maxDriftY = dimensions.height * 0.4;

    return Array.from({ length: count }).map((_, index) => {
      const angle = (index / count) * Math.PI * 2 + (Math.random() * 0.25 - 0.12);
      const initialDist = radiusBase + (Math.random() * 120 - 60);

      // Start position outside screen bounds
      const startX = Math.cos(angle) * initialDist;
      const startY = Math.sin(angle) * initialDist;

      // Intermediate drift position in view (clamped for portrait phone viewports)
      const driftRadius = Math.min(dimensions.width, dimensions.height) * (isMobile ? 0.36 : 0.34) + (Math.random() * 50 - 25);
      let driftX = Math.cos(angle) * driftRadius;
      let driftY = Math.sin(angle) * driftRadius;

      if (isMobile) {
        driftX = Math.max(-maxDriftX, Math.min(maxDriftX, driftX));
        driftY = Math.max(-maxDriftY, Math.min(maxDriftY, driftY));
      }

      const Component = WASTE_COMPONENTS[index % WASTE_COMPONENTS.length];
      const color = ITEM_COLORS[index % ITEM_COLORS.length];
      const stitch = index % 2 === 0 ? SPLASH_CONFIG.colors.cream : SPLASH_CONFIG.colors.charcoal;
      const initRot = (Math.random() * 360) - 180;
      const spinAmount = (Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 360);

      // Dynamic scale for device size
      const baseScale = isSmallMobile ? 0.58 : isMobile ? 0.7 : 0.95;
      const scale = baseScale + Math.random() * (isMobile ? 0.18 : 0.28);

      return {
        id: index,
        Component,
        color,
        stitch,
        startX,
        startY,
        driftX,
        driftY,
        initRot,
        spinAmount,
        scale,
      };
    });
  }, [dimensions]);

  // Sparkle burst particles
  const sparkles = useMemo(() => {
    const isMobile = dimensions.width < 768;
    const count = isMobile ? 10 : 16;
    return Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const distance = (isMobile ? 65 : 95) + Math.random() * (isMobile ? 50 : 80);
      return {
        id: i,
        targetX: Math.cos(angle) * distance,
        targetY: Math.sin(angle) * distance,
        size: (isMobile ? 6 : 8) + Math.random() * (isMobile ? 6 : 8),
        color: i % 2 === 0 ? SPLASH_CONFIG.colors.gold : SPLASH_CONFIG.colors.mustard,
        delay: (i % 3) * 0.04,
      };
    });
  }, [dimensions.width]);

  return (
    <div 
      className={`splash-fullscreen-container ${phase === 'reveal' ? 'phase-reveal' : ''}`}
      role="status"
      aria-label="Trash to Treasure Introduction"
      onClick={(e) => {
        // Tap anywhere on screen to skip (especially friendly on touchscreens)
        if (e.target.closest('.splash-control-btn')) return;
        handleSkip();
      }}
    >
      <div className="sr-only">
        Trash to Treasure is opening. Transforming reclaimed materials into handcrafted treasures.
      </div>

      {/* ========================================================
          CURTAIN DOORS (Uncover the home page at 3.3s - 4.0s)
          ======================================================== */}
      <motion.div
        className="splash-curtain-door splash-door-left"
        initial={{ x: 0 }}
        animate={{ x: phase === 'reveal' || phase === 'finished' ? '-100%' : 0 }}
        transition={{ duration: SPLASH_CONFIG.revealDuration, ease: [0.65, 0, 0.35, 1] }}
      />
      <motion.div
        className="splash-curtain-door splash-door-right"
        initial={{ x: 0 }}
        animate={{ x: phase === 'reveal' || phase === 'finished' ? '100%' : 0 }}
        transition={{ duration: SPLASH_CONFIG.revealDuration, ease: [0.65, 0, 0.35, 1] }}
      />

      {/* Main Canvas Area */}
      <div className="splash-stage">
        
        {/* ========================================================
            PREFERS-REDUCED-MOTION FALLBACK
            ======================================================== */}
        {prefersReduced ? (
          <motion.div 
            className="splash-reduced-content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <TreasureLogoMark />
            <h1 className="splash-wordmark">Trash to Treasure</h1>
            <p className="splash-tagline">Upcycled Handcrafted Living</p>
          </motion.div>
        ) : (
          <>
            {/* ========================================================
                PHASE 1 & 2: WASTE ITEMS FLYING & SPIRALING INWARD
                ======================================================== */}
            <div className="waste-vortex-field" aria-hidden="true">
              {wasteItems.map((item) => {
                const ItemComponent = item.Component;

                let animateProps = {
                  x: item.startX,
                  y: item.startY,
                  opacity: 0,
                  scale: item.scale * 0.6,
                  rotate: item.initRot,
                };

                let transitionProps = {
                  duration: SPLASH_CONFIG.driftDuration,
                  ease: 'easeOut',
                };

                if (phase === 'drift') {
                  animateProps = {
                    x: [item.startX, item.driftX],
                    y: [item.startY, item.driftY],
                    opacity: [0, 0.95],
                    scale: [item.scale * 0.6, item.scale],
                    rotate: [item.initRot, item.initRot + 25],
                  };
                  transitionProps = {
                    duration: SPLASH_CONFIG.driftDuration,
                    ease: [0.25, 0.1, 0.25, 1],
                  };
                } else if (phase === 'swirl') {
                  animateProps = {
                    x: [item.driftX, 0],
                    y: [item.driftY, 0],
                    opacity: [0.95, 0],
                    scale: [item.scale, 0.05],
                    rotate: [item.initRot + 25, item.initRot + item.spinAmount],
                  };
                  transitionProps = {
                    duration: SPLASH_CONFIG.swirlDuration,
                    ease: [0.45, 0, 0.7, 1], // accelerating inward vortex
                  };
                } else {
                  // Phase 'merge' and beyond: already compressed into center
                  animateProps = {
                    x: 0,
                    y: 0,
                    opacity: 0,
                    scale: 0,
                    rotate: item.initRot + item.spinAmount,
                  };
                  transitionProps = { duration: 0.1 };
                }

                return (
                  <motion.div
                    key={item.id}
                    className="waste-item-wrapper"
                    animate={animateProps}
                    transition={transitionProps}
                  >
                    <ItemComponent color={item.color} stitch={item.stitch} />
                  </motion.div>
                );
              })}
            </div>

            {/* ========================================================
                PHASE 3, 4, 5: TREASURE MERGE, SPARKLE BURST & BRAND REVEAL
                ======================================================== */}
            <AnimatePresence>
              {(phase === 'merge' || phase === 'wordmark' || phase === 'reveal') && (
                <motion.div
                  className="treasure-center-stage"
                  initial={{ scale: 0, opacity: 0, rotate: -25 }}
                  animate={{ 
                    scale: phase === 'reveal' ? 1.08 : 1, 
                    opacity: phase === 'reveal' ? 0 : 1, 
                    rotate: 0 
                  }}
                  transition={{
                    scale: { type: 'spring', stiffness: 240, damping: 16 },
                    opacity: { duration: phase === 'reveal' ? 0.4 : 0.3 }
                  }}
                >
                  {/* Golden Aura Glow Pulse */}
                  <motion.div
                    className="treasure-glow-pulse"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: [0.6, 1.6, 1.2], opacity: [0, 0.8, 0.4] }}
                    transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse' }}
                  />

                  {/* Expanding Golden Ripple Wave */}
                  <motion.div
                    className="treasure-ripple-wave"
                    initial={{ scale: 0.3, opacity: 0.9 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{ duration: 1.0, ease: 'easeOut' }}
                  />

                  {/* Sparkle Burst Particles */}
                  <div className="sparkle-burst-container" aria-hidden="true">
                    {sparkles.map((sp) => (
                      <motion.div
                        key={sp.id}
                        className="sparkle-particle"
                        style={{ width: sp.size, height: sp.size, backgroundColor: sp.color }}
                        initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
                        animate={{
                          x: sp.targetX,
                          y: sp.targetY,
                          scale: [0, 1.3, 0],
                          opacity: [1, 1, 0],
                          rotate: 180,
                        }}
                        transition={{
                          duration: 0.8,
                          delay: sp.delay,
                          ease: 'easeOut',
                        }}
                      >
                        ✦
                      </motion.div>
                    ))}
                  </div>

                  {/* Center Treasure Logo Mark */}
                  <motion.div 
                    className="treasure-mark-wrapper"
                    whileHover={{ scale: 1.05 }}
                  >
                    <TreasureLogoMark />
                  </motion.div>

                  {/* ====================================================
                      PHASE 4: WORDMARK & TAGLINE FADE UP
                      ==================================================== */}
                  <motion.div
                    className="splash-typography-block"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ 
                      opacity: (phase === 'wordmark' || phase === 'reveal') ? 1 : 0, 
                      y: (phase === 'wordmark' || phase === 'reveal') ? 0 : 18 
                    }}
                    transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
                  >
                    <h1 className="splash-wordmark">Trash to Treasure</h1>
                    <motion.p 
                      className="splash-tagline"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ 
                        opacity: (phase === 'wordmark' || phase === 'reveal') ? 1 : 0, 
                        y: (phase === 'wordmark' || phase === 'reveal') ? 0 : 8 
                      }}
                      transition={{ duration: 0.45, ease: 'easeOut', delay: 0.25 }}
                    >
                      Upcycled Handcrafted Living
                    </motion.p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* ========================================================
          CONTROLS: AUDIO TOGGLE & SKIP BUTTON
          ======================================================== */}
      <div className="splash-bottom-controls">
        <button
          type="button"
          className="splash-control-btn splash-sound-btn"
          onClick={() => {
            setIsMuted((prev) => !prev);
            if (isMuted) {
              playCinematicSound();
            }
          }}
          title={isMuted ? 'Turn Sound On' : 'Mute Sound'}
          aria-label={isMuted ? 'Turn Sound On' : 'Mute Sound'}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>

        <button
          type="button"
          className="splash-control-btn splash-skip-btn"
          onClick={handleSkip}
          aria-label="Skip introduction animation"
        >
          <span>Skip</span>
          <span className="skip-arrow">➔</span>
        </button>
      </div>
    </div>
  );
}
