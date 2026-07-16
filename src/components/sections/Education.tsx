import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

const educationData = [
  {
    period: '2024 — 2026',
    badge: 'MCA',
    degree: 'Master of Computer Applications',
    institution: 'LEAD College (Autonomous)',
    location: 'Palakkad, Kerala, India',
    icon: 'school',
    color: 'bg-secondary-container text-secondary',
    gradient: 'from-secondary/5 to-secondary-fixed/10',
    accentColor: 'border-secondary/30',
    dotColor: 'bg-secondary'
  },
  {
    period: '2020 — 2023',
    badge: 'BCA',
    degree: 'Bachelor of Computer Applications',
    institution: 'University of Calicut',
    location: 'Kerala, India',
    icon: 'terminal',
    color: 'bg-secondary-container text-secondary',
    gradient: 'from-secondary/5 to-secondary-fixed/10',
    accentColor: 'border-secondary/30',
    dotColor: 'bg-secondary'
  }
];

export const Education = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: mobileScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1024;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const progressToUse = isDesktop ? scrollYProgress : mobileScrollProgress;

  // 1. Generate 3D blocks with flat horizontal landing platforms (matching horizontal steps)
  // Flight 1 Blocks: 11 steps climbing up-left
  const flight1Blocks = Array.from({ length: 11 }, (_, i) => {
    const x1 = 340 - i * 20;
    const y1 = 420 - i * 12.73;
    const x2 = x1 + 80;
    const y2 = y1;
    const x3 = x1 - 20;
    const y3 = y1 - 12.73;
    const x4 = x3 + 80;
    const y4 = y3;
    const R = 12.73;
    return {
      tread: `${x1},${y1} ${x2},${y2} ${x4},${y4} ${x3},${y3}`,
      riser: `${x1},${y1} ${x2},${y2} ${x2},${y2+R} ${x1},${y1+R}`,
    };
  });

  // BCA Flat Landing Platform (horizontal wide slab at y = 280)
  const bcaPlatform = {
    tread: "40,260 175,260 215,280 80,280",
    riserFront: "80,280 215,280 215,292.7 80,292.7",
    riserSide: "40,260 80,280 80,292.7 40,272.7",
    underFill: "40,260 80,280 80,310 40,290" // Fills the space beneath the landing to link to the lower side walls
  };

  // Flight 2 Blocks: 8 steps climbing up-right (starts from back of BCA platform: 100, 260)
  const flight2Blocks = Array.from({ length: 8 }, (_, i) => {
    const x1 = 100 + i * 22.2;
    const y1 = 260 - i * 11.1;
    const x2 = x1 - 60;
    const y2 = y1;
    const x3 = x1 + 22.2;
    const y3 = y1 - 11.1;
    const x4 = x3 - 60;
    const y4 = y3;
    const R = 11.1;
    return {
      tread: `${x1},${y1} ${x2},${y2} ${x4},${y4} ${x3},${y3}`,
      riser: `${x1},${y1} ${x2},${y2} ${x2},${y2+R} ${x1},${y1+R}`,
    };
  });

  // MCA Flat Landing Platform (horizontal wide slab at y = 191.2)
  const mcaPlatform = {
    tread: "195.4,171.2 330,171.2 370,191.2 235.4,191.2",
    riserFront: "235.4,191.2 370,191.2 370,202.3 235.4,202.3",
    riserSide: "330,171.2 370,191.2 370,202.3 330,182.3",
    underFill: "330,171.2 370,191.2 370,225 330,205" // Fills the space beneath the landing
  };

  // Flight 3 Blocks: 7 steps climbing up-left (starts from back of MCA platform: 270, 171.2)
  const flight3Blocks = Array.from({ length: 7 }, (_, i) => {
    const x1 = 270 - i * 17.1;
    const y1 = 171.2 - i * 14.3;
    const x2 = x1 + 60;
    const y2 = y1;
    const x3 = x1 - 17.1;
    const y3 = y1 - 14.3;
    const x4 = x3 + 60;
    const y4 = y3;
    const R = 14.3;
    return {
      tread: `${x1},${y1} ${x2},${y2} ${x4},${y4} ${x3},${y3}`,
      riser: `${x1},${y1} ${x2},${y2} ${x2},${y2+R} ${x1},${y1+R}`,
    };
  });

  // 2. Generate exact tread-center walk-path coordinate arrays (positioning feet exactly on treads and platforms)
  const f1Centers = Array.from({ length: 11 }, (_, i) => ({
    x: 380 - i * 20,
    y: 420 - i * 12.73
  }));
  // BCA Platform center point
  const bcaCenter = { x: 127.5, y: 270.0 };
  const f2Centers = Array.from({ length: 8 }, (_, i) => ({
    x: 70 + i * 22.2,
    y: 260 - i * 11.1
  }));
  // MCA Platform center point
  const mcaCenter = { x: 282.7, y: 181.2 };
  const f3Centers = Array.from({ length: 7 }, (_, i) => ({
    x: 300 - i * 17.1,
    y: 171.2 - i * 14.3
  }));

  const climbPath = [...f1Centers, bcaCenter, ...f2Centers, mcaCenter, ...f3Centers];
  const xCoords = climbPath.map(p => p.x);
  const yCoords = climbPath.map(p => p.y);

  // Dynamic range generated directly from path length to avoid Framer Motion mismatched array error
  const progressRange = Array.from({ length: climbPath.length }, (_, idx) => 0.05 + (idx / (climbPath.length - 1)) * 0.9);

  // Winding staircase climb coordinates mapping (X, Y) for the character group transform
  const characterX = useTransform(progressToUse, progressRange, xCoords, { clamp: true });
  const characterY = useTransform(progressToUse, progressRange, yCoords, { clamp: true });
  const characterTransform = useMotionTemplate`translate(${characterX}px, ${characterY}px)`;

  // Scroll-linked limb walk swing (legs oscillate continuously to represent infinite walking towards the goal)
  const leg1Rotate = useTransform(progressToUse, (p: number) => Math.sin(p * 220) * 25);
  const leg2Rotate = useTransform(progressToUse, (p: number) => -Math.sin(p * 220) * 25);
  const arm1Rotate = useTransform(progressToUse, (p: number) => Math.sin(p * 220) * 20);
  const arm2Rotate = useTransform(progressToUse, (p: number) => -Math.sin(p * 220) * 20);

  // Confetti triggers for landing celebrations
  const bcaConfettiOpacity = useTransform(progressToUse, [0.35, 0.38, 0.48, 0.52], [0, 1, 1, 0]);
  const bcaConfettiY = useTransform(progressToUse, [0.38, 0.48], [-10, 15]);
  const bcaConfettiTransform = useMotionTemplate`translate(127px, ${bcaConfettiY}px)`;

  const mcaConfettiOpacity = useTransform(progressToUse, [0.72, 0.75, 0.82, 0.85], [0, 1, 1, 0]);
  const mcaConfettiY = useTransform(progressToUse, [0.75, 0.82], [-10, 15]);
  const mcaConfettiTransform = useMotionTemplate`translate(282px, ${mcaConfettiY}px)`;

  const gradConfettiOpacity = useTransform(progressToUse, [0.90, 0.95, 1.0], [0, 1, 1]);
  const gradConfettiY = useTransform(progressToUse, [0.92, 1.0], [-15, 20]);
  const gradConfettiTransform = useMotionTemplate`translate(197px, ${gradConfettiY}px)`;

  // BCA Card Scroll Highlights (glow and scale)
  const bcaScale = useTransform(progressToUse, [0.15, 0.35, 0.52, 0.62], [1, 1.03, 1.03, 1]);
  const bcaBorderColor = useTransform(progressToUse,
    [0.15, 0.35, 0.52, 0.62],
    [
      "rgba(194, 200, 192, 0.2)",
      "rgba(22, 52, 34, 0.45)",
      "rgba(22, 52, 34, 0.45)",
      "rgba(194, 200, 192, 0.2)"
    ]
  );
  const bcaShadow = useTransform(progressToUse,
    [0.15, 0.35, 0.52, 0.62],
    [
      "0px 0px 0px rgba(0,0,0,0)",
      "0px 12px 24px rgba(22, 52, 34, 0.05)",
      "0px 12px 24px rgba(22, 52, 34, 0.05)",
      "0px 0px 0px rgba(0,0,0,0)"
    ]
  );

  // MCA Card Scroll Highlights (glow and scale)
  const mcaScale = useTransform(progressToUse, [0.55, 0.72, 0.88, 0.95], [1, 1.03, 1.03, 1]);
  const mcaBorderColor = useTransform(progressToUse,
    [0.55, 0.72, 0.88, 0.95],
    [
      "rgba(194, 200, 192, 0.2)",
      "rgba(22, 52, 34, 0.45)",
      "rgba(22, 52, 34, 0.45)",
      "rgba(194, 200, 192, 0.2)"
    ]
  );
  const mcaShadow = useTransform(progressToUse,
    [0.55, 0.72, 0.88, 0.95],
    [
      "0px 0px 0px rgba(0,0,0,0)",
      "0px 12px 24px rgba(22, 52, 34, 0.05)",
      "0px 12px 24px rgba(22, 52, 34, 0.05)",
      "0px 0px 0px rgba(0,0,0,0)"
    ]
  );

  const bca = educationData[1]; // BCA (2020-2023)
  const mca = educationData[0]; // MCA (2023-2026)

  // Layout switcher: Desktop uses a 150vh sticky scroll showcase; Mobile uses natural flow
  if (isDesktop) {
    return (
      <div 
        ref={containerRef} 
        className="relative transition-all duration-300"
        style={{ height: "150vh" }}
        id="education"
      >
        <div className="sticky top-16 flex flex-col justify-start overflow-hidden pt-8 pb-4 bg-surface" style={{ zIndex: 1, height: 'calc(100vh - 4rem)' }}>
          <section className="px-margin-desktop lg:pl-32 lg:pr-margin-desktop max-w-container-max mx-auto w-full">
            {/* Header */}
            <div className="mb-12">
              <h2 className="font-headline-lg text-headline-lg text-primary mb-3">Academic Background</h2>
              <p className="text-on-surface-variant">The foundations of my professional journey.</p>
            </div>

            {/* Split Screen Grid */}
            <div className="flex flex-row items-center gap-16">
              {/* Left Side: Climbing Staircase Visualizer (Theme-matched Colors, High-Contrast Forest Green Card) */}
              <div className="w-1/2 bg-linear-to-b from-[#1b3d2b] to-[#122b1f] dark:from-[#0c1f15] dark:to-[#050f0a] border border-outline-variant/10 rounded-3xl p-8 relative flex items-center justify-center min-h-[460px] shadow-2xl">
                <svg viewBox="0 0 600 460" className="w-full h-auto overflow-visible select-none">
                  <defs>
                    <linearGradient id="side-grad-1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#85bfa1" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#345c43" stopOpacity="0.85" />
                    </linearGradient>
                    <linearGradient id="side-grad-2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a3cfbb" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#284834" stopOpacity="0.85" />
                    </linearGradient>
                    <radialGradient id="target-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* 3D Side Walls for depth (Continuous structural beams under flights) */}
                  <polygon points="340,420 120,280 120,310 340,450" fill="url(#side-grad-1)" />
                  <polygon points="40,260 195.4,171.2 195.4,196.2 40,285" fill="url(#side-grad-2)" />
                  <polygon points="270,171.2 167.4,85.4 167.4,110.4 270,196.2" fill="url(#side-grad-1)" />

                  {/* 3D Step risers (high contrast shading, matching reference) */}
                  {flight1Blocks.map((b, idx) => (
                    <polygon key={`f1-3d-riser-${idx}`} points={b.riser} fill="#bce3cf" stroke="#85bfa1" strokeWidth="0.5" />
                  ))}
                  {/* BCA landing platform risers & solid structural under-fill wall */}
                  <polygon points={bcaPlatform.underFill} fill="#345c43" stroke="#345c43" strokeWidth="0.5" />
                  <polygon points={bcaPlatform.riserFront} fill="#bce3cf" stroke="#85bfa1" strokeWidth="0.5" />
                  <polygon points={bcaPlatform.riserSide} fill="#85bfa1" stroke="#85bfa1" strokeWidth="0.5" />

                  {flight2Blocks.map((b, idx) => (
                    <polygon key={`f2-3d-riser-${idx}`} points={b.riser} fill="#bce3cf" stroke="#85bfa1" strokeWidth="0.5" />
                  ))}
                  {/* MCA landing platform risers & solid structural under-fill wall */}
                  <polygon points={mcaPlatform.underFill} fill="#284834" stroke="#284834" strokeWidth="0.5" />
                  <polygon points={mcaPlatform.riserFront} fill="#bce3cf" stroke="#85bfa1" strokeWidth="0.5" />
                  <polygon points={mcaPlatform.riserSide} fill="#85bfa1" stroke="#85bfa1" strokeWidth="0.5" />

                  {flight3Blocks.map((b, idx) => (
                    <polygon key={`f3-3d-riser-${idx}`} points={b.riser} fill="#bce3cf" stroke="#85bfa1" strokeWidth="0.5" />
                  ))}

                  {/* 3D Step treads (pure white surfaces layered on top for maximum contrast) */}
                  {flight1Blocks.map((b, idx) => (
                    <polygon key={`f1-3d-tread-${idx}`} points={b.tread} fill="#f4faf7" stroke="#85bfa1" strokeWidth="0.5" />
                  ))}
                  {/* BCA landing platform top surface */}
                  <polygon points={bcaPlatform.tread} fill="#f4faf7" stroke="#85bfa1" strokeWidth="0.5" />

                  {flight2Blocks.map((b, idx) => (
                    <polygon key={`f2-3d-tread-${idx}`} points={b.tread} fill="#f4faf7" stroke="#85bfa1" strokeWidth="0.5" />
                  ))}
                  {/* MCA landing platform top surface */}
                  <polygon points={mcaPlatform.tread} fill="#f4faf7" stroke="#85bfa1" strokeWidth="0.5" />

                  {flight3Blocks.map((b, idx) => (
                    <polygon key={`f3-3d-tread-${idx}`} points={b.tread} fill="#f4faf7" stroke="#85bfa1" strokeWidth="0.5" />
                  ))}

                  {/* BCA Landmark indicator — dot only */}
                  <g transform="translate(127.5, 270.0)">
                    <circle cx="0" cy="0" r="5.5" fill="#ffffff" />
                  </g>

                  {/* MCA Landmark indicator — dot only */}
                  <g transform="translate(282.7, 181.2)">
                    <circle cx="0" cy="0" r="5.5" fill="#ffffff" />
                  </g>

                  {/* Concentric Target bullseye standing at the top platform */}
                  <g transform="translate(197.4, 85.4)">
                    {/* Glowing background */}
                    <circle cx="0" cy="-35" r="30" fill="url(#target-glow)" className="pointer-events-none" />
                    {/* Sign posts */}
                    <line x1="-5" y1="0" x2="-5" y2="-20" stroke="#ffffff" strokeWidth="2.5" />
                    <line x1="5" y1="0" x2="5" y2="-20" stroke="#ffffff" strokeWidth="2.5" />
                    {/* Concentric rings */}
                    <circle cx="0" cy="-35" r="18" fill="#ffffff" />
                    <circle cx="0" cy="-35" r="13" fill="#1b3d2b" />
                    <circle cx="0" cy="-35" r="8" fill="#ffffff" />
                    <circle cx="0" cy="-35" r="4" fill="#1b3d2b" />
                  </g>

                  {/* Confetti groups for celebration */}
                  <motion.g style={{ opacity: bcaConfettiOpacity }} transform={bcaConfettiTransform}>
                    <circle cx="-15" cy="-20" r="3" fill="#ffc107" />
                    <circle cx="15" cy="-25" r="2.5" fill="#e91e63" />
                    <circle cx="-5" cy="-35" r="2" fill="#00bcd4" />
                    <circle cx="20" cy="-15" r="3.5" fill="#4caf50" />
                  </motion.g>

                  <motion.g style={{ opacity: mcaConfettiOpacity }} transform={mcaConfettiTransform}>
                    <circle cx="-20" cy="-20" r="3" fill="#e91e63" />
                    <circle cx="18" cy="-30" r="2" fill="#9c27b0" />
                    <circle cx="0" cy="-25" r="2.5" fill="#3f51b5" />
                    <circle cx="-10" cy="-15" r="3.5" fill="#00ffcc" />
                  </motion.g>

                  <motion.g style={{ opacity: gradConfettiOpacity }} transform={gradConfettiTransform}>
                    <circle cx="-30" cy="-30" r="3" fill="#ff5722" />
                    <circle cx="-15" cy="-45" r="2.5" fill="#ffeb3b" />
                    <circle cx="0" cy="-35" r="3.5" fill="#00e676" />
                    <circle cx="15" cy="-50" r="2" fill="#2979ff" />
                    <circle cx="30" cy="-40" r="3" fill="#d500f9" />
                    <circle cx="-10" cy="-20" r="2" fill="#ff1744" />
                    <circle cx="20" cy="-25" r="2.5" fill="#ffff00" />
                  </motion.g>

                  {/* Realistic Silhouette Character walking up the stairs (no hat, dark forest green silhouette) */}
                  <motion.g transform={characterTransform}>
                    {/* Head */}
                    <circle cx="0" cy="-34" r="5" fill="#0d2719" />

                    {/* Torso (Jacket silhouette) */}
                    <path d="M -4,-28 L 4,-28 L 3,-16 L -3,-16 Z" fill="#0d2719" />

                    {/* Left Leg */}
                    <motion.line 
                      x1="0" y1="-16" x2="-6" y2="0" 
                      stroke="#0d2719" 
                      strokeWidth="5" 
                      strokeLinecap="round" 
                      style={{ rotate: leg1Rotate, transformOrigin: "0px -16px" }} 
                    />
                    
                    {/* Right Leg */}
                    <motion.line 
                      x1="0" y1="-16" x2="6" y2="0" 
                      stroke="#0d2719" 
                      strokeWidth="5" 
                      strokeLinecap="round" 
                      style={{ rotate: leg2Rotate, transformOrigin: "0px -16px" }} 
                    />
                    
                    {/* Front Arm */}
                    <motion.line 
                      x1="0" y1="-26" x2="-5" y2="-15" 
                      stroke="#0d2719" 
                      strokeWidth="4" 
                      strokeLinecap="round" 
                      style={{ rotate: arm1Rotate, transformOrigin: "0px -26px" }} 
                    />
                    
                    {/* Back Arm */}
                    <motion.line 
                      x1="0" y1="-26" x2="5" y2="-15" 
                      stroke="#0d2719" 
                      strokeWidth="4" 
                      strokeLinecap="round" 
                      style={{ rotate: arm2Rotate, transformOrigin: "0px -26px" }} 
                    />
                  </motion.g>
                </svg>
              </div>

              {/* Right Side: Reactive Degree Details */}
              <div className="w-1/2 flex flex-col gap-6 justify-center">
                {/* MCA Degree Card */}
                <motion.div
                  style={{ scale: mcaScale, borderColor: mcaBorderColor, boxShadow: mcaShadow }}
                  className="p-6 rounded-3xl border bg-surface-container-lowest transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[4rem] font-black text-primary/4 select-none pointer-events-none uppercase">
                    {mca.badge}
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest ${mca.color}`}>
                      {mca.badge}
                    </span>
                    <span className="font-label-md text-on-surface-variant text-xs tracking-wider font-semibold">
                      {mca.period}
                    </span>
                  </div>
                  <h3 className="font-headline-md text-primary text-[1.1rem] leading-snug mb-2">{mca.degree}</h3>
                  <p className="text-on-surface-variant text-sm">{mca.institution}</p>
                  <span className="text-on-surface-variant/70 text-xs uppercase tracking-wider block mt-1">{mca.location}</span>
                </motion.div>

                {/* BCA Degree Card */}
                <motion.div
                  style={{ scale: bcaScale, borderColor: bcaBorderColor, boxShadow: bcaShadow }}
                  className="p-6 rounded-3xl border bg-surface-container-lowest transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[4rem] font-black text-primary/4 select-none pointer-events-none uppercase">
                    {bca.badge}
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest ${bca.color}`}>
                      {bca.badge}
                    </span>
                    <span className="font-label-md text-on-surface-variant text-xs tracking-wider font-semibold">
                      {bca.period}
                    </span>
                  </div>
                  <h3 className="font-headline-md text-primary text-[1.1rem] leading-snug mb-2">{bca.degree}</h3>
                  <p className="text-on-surface-variant text-sm">{bca.institution}</p>
                  <span className="text-on-surface-variant/70 text-xs uppercase tracking-wider block mt-1">{bca.location}</span>
                </motion.div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  // Mobile/Tablet Inline Layout
  return (
    <section 
      ref={containerRef}
      className="px-margin-mobile md:px-margin-desktop py-16 max-w-container-max mx-auto w-full transition-all duration-300 relative"
      id="education"
    >
      {/* Header */}
      <div className="mb-12">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-3">Academic Background</h2>
        <p className="text-on-surface-variant">The foundations of my professional journey.</p>
      </div>

      <div className="flex flex-col gap-10">
        {/* Staircase Visual Graphic at top */}
        <div className="bg-linear-to-b from-[#1b3d2b] to-[#122b1f] dark:from-[#0c1f15] dark:to-[#050f0a] border border-outline-variant/10 rounded-3xl p-6 relative flex items-center justify-center min-h-[300px] shadow-2xl">
          <svg viewBox="0 0 600 460" className="w-full h-auto overflow-visible select-none max-w-[420px]">
            <defs>
              <linearGradient id="side-grad-m-1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#85bfa1" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#345c43" stopOpacity="0.85" />
              </linearGradient>
              <linearGradient id="side-grad-m-2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a3cfbb" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#284834" stopOpacity="0.85" />
              </linearGradient>
              <radialGradient id="target-glow-m" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* 3D Side Walls for depth (Continuous structural beams under flights) */}
            <polygon points="380,420 160,280 160,310 380,450" fill="url(#side-grad-m-1)" />
            <polygon points="40,260 195.4,171.2 195.4,196.2 40,285" fill="url(#side-grad-m-2)" />
            <polygon points="270,171.2 167.4,85.4 167.4,110.4 270,196.2" fill="url(#side-grad-m-1)" />

            {/* 3D Step risers */}
            {flight1Blocks.map((b, idx) => (
              <polygon key={`f1-m-riser-${idx}`} points={b.riser} fill="#bce3cf" stroke="#85bfa1" strokeWidth="0.5" />
            ))}
            <polygon points={bcaPlatform.underFill} fill="#345c43" stroke="#345c43" strokeWidth="0.5" />
            <polygon points={bcaPlatform.riserFront} fill="#bce3cf" stroke="#85bfa1" strokeWidth="0.5" />
            <polygon points={bcaPlatform.riserSide} fill="#85bfa1" stroke="#85bfa1" strokeWidth="0.5" />

            {flight2Blocks.map((b, idx) => (
              <polygon key={`f2-m-riser-${idx}`} points={b.riser} fill="#bce3cf" stroke="#85bfa1" strokeWidth="0.5" />
            ))}
            <polygon points={mcaPlatform.underFill} fill="#284834" stroke="#284834" strokeWidth="0.5" />
            <polygon points={mcaPlatform.riserFront} fill="#bce3cf" stroke="#85bfa1" strokeWidth="0.5" />
            <polygon points={mcaPlatform.riserSide} fill="#85bfa1" stroke="#85bfa1" strokeWidth="0.5" />

            {flight3Blocks.map((b, idx) => (
              <polygon key={`f3-m-riser-${idx}`} points={b.riser} fill="#bce3cf" stroke="#85bfa1" strokeWidth="0.5" />
            ))}

            {/* 3D Step treads (top horizontal surfaces, drawn on top for sharp outlines) */}
            {flight1Blocks.map((b, idx) => (
              <polygon key={`f1-m-tread-${idx}`} points={b.tread} fill="#f4faf7" stroke="#85bfa1" strokeWidth="0.5" />
            ))}
            <polygon points={bcaPlatform.tread} fill="#f4faf7" stroke="#85bfa1" strokeWidth="0.5" />

            {flight2Blocks.map((b, idx) => (
              <polygon key={`f2-m-tread-${idx}`} points={b.tread} fill="#f4faf7" stroke="#85bfa1" strokeWidth="0.5" />
            ))}
            <polygon points={mcaPlatform.tread} fill="#f4faf7" stroke="#85bfa1" strokeWidth="0.5" />

            {flight3Blocks.map((b, idx) => (
              <polygon key={`f3-m-tread-${idx}`} points={b.tread} fill="#f4faf7" stroke="#85bfa1" strokeWidth="0.5" />
            ))}

            {/* BCA Landmark indicator & text label */}
            <g transform="translate(127.5, 270.0)">
              <circle cx="0" cy="0" r="5.5" fill="#ffffff" />
              <text x="0" y="24" textAnchor="middle" fill="#ffffff" className="font-label-md text-[13px] font-bold tracking-wider drop-shadow-md">BCA</text>
            </g>

            {/* MCA Landmark indicator & text label */}
            <g transform="translate(282.7, 181.2)">
              <circle cx="0" cy="0" r="5.5" fill="#ffffff" />
              <text x="0" y="24" textAnchor="middle" fill="#ffffff" className="font-label-md text-[13px] font-bold tracking-wider drop-shadow-md">MCA</text>
            </g>

            {/* Target bullseye standing at top platform */}
            <g transform="translate(197.4, 85.4)">
              <circle cx="0" cy="-35" r="30" fill="url(#target-glow-m)" className="pointer-events-none" />
              <line x1="-5" y1="0" x2="-5" y2="-20" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="5" y1="0" x2="5" y2="-20" stroke="#ffffff" strokeWidth="2.5" />
              <circle cx="0" cy="-35" r="18" fill="#ffffff" stroke="#1b3d2b" strokeWidth="2.5" />
              <circle cx="0" cy="-35" r="12" fill="#1b3d2b" />
              <circle cx="0" cy="-35" r="6" fill="#ffffff" />
              <circle cx="0" cy="-35" r="2" fill="#1b3d2b" />
            </g>

            {/* Confetti groups for celebration */}
            <motion.g style={{ opacity: bcaConfettiOpacity }} transform={bcaConfettiTransform}>
              <circle cx="-15" cy="-20" r="3" fill="#ffc107" />
              <circle cx="15" cy="-25" r="2.5" fill="#e91e63" />
              <circle cx="-5" cy="-35" r="2" fill="#00bcd4" />
              <circle cx="20" cy="-15" r="3.5" fill="#4caf50" />
            </motion.g>

            <motion.g style={{ opacity: mcaConfettiOpacity }} transform={mcaConfettiTransform}>
              <circle cx="-20" cy="-20" r="3" fill="#e91e63" />
              <circle cx="18" cy="-30" r="2" fill="#9c27b0" />
              <circle cx="0" cy="-25" r="2.5" fill="#3f51b5" />
              <circle cx="-10" cy="-15" r="3.5" fill="#00ffcc" />
            </motion.g>

            <motion.g style={{ opacity: gradConfettiOpacity }} transform={gradConfettiTransform}>
              <circle cx="-30" cy="-30" r="3" fill="#ff5722" />
              <circle cx="-15" cy="-45" r="2.5" fill="#ffeb3b" />
              <circle cx="0" cy="-35" r="3.5" fill="#00e676" />
              <circle cx="15" cy="-50" r="2" fill="#2979ff" />
              <circle cx="30" cy="-40" r="3" fill="#d500f9" />
              <circle cx="-10" cy="-20" r="2" fill="#ff1744" />
              <circle cx="20" cy="-25" r="2.5" fill="#ffff00" />
            </motion.g>

            {/* Climbing Silhouette Character */}
            <motion.g transform={characterTransform}>
              <circle cx="0" cy="-34" r="5" fill="#0d2719" />
              <path d="M -4,-28 L 4,-28 L 3,-16 L -3,-16 Z" fill="#0d2719" />
              <motion.line 
                x1="0" y1="-16" x2="-6" y2="0" 
                stroke="#0d2719" 
                strokeWidth="5" 
                strokeLinecap="round" 
                style={{ rotate: leg1Rotate, transformOrigin: "0px -16px" }} 
              />
              <motion.line 
                x1="0" y1="-16" x2="6" y2="0" 
                stroke="#0d2719" 
                strokeWidth="5" 
                strokeLinecap="round" 
                style={{ rotate: leg2Rotate, transformOrigin: "0px -16px" }} 
              />
              <motion.line 
                x1="0" y1="-26" x2="-5" y2="-15" 
                stroke="#0d2719" 
                strokeWidth="4" 
                strokeLinecap="round" 
                style={{ rotate: arm1Rotate, transformOrigin: "0px -26px" }} 
              />
              <motion.line 
                x1="0" y1="-26" x2="5" y2="-15" 
                stroke="#0d2719" 
                strokeWidth="4" 
                strokeLinecap="round" 
                style={{ rotate: arm2Rotate, transformOrigin: "0px -26px" }} 
              />
            </motion.g>
          </svg>
        </div>

        {/* Cards below */}
        <div className="flex flex-col gap-6">
          {/* MCA Degree Card */}
          <motion.div
            style={{ scale: mcaScale, borderColor: mcaBorderColor, boxShadow: mcaShadow }}
            className="p-6 rounded-3xl border bg-surface-container-lowest transition-all duration-300 relative overflow-hidden border-outline-variant/20"
          >
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[4rem] font-black text-primary/4 select-none pointer-events-none uppercase">
              {mca.badge}
            </div>
            <div className="flex items-center gap-4 mb-4">
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest ${mca.color}`}>
                {mca.badge}
              </span>
              <span className="font-label-md text-on-surface-variant text-xs tracking-wider font-semibold">
                {mca.period}
              </span>
            </div>
            <h3 className="font-headline-md text-primary text-[1.1rem] leading-snug mb-2">{mca.degree}</h3>
            <p className="text-on-surface-variant text-sm">{mca.institution}</p>
            <span className="text-on-surface-variant/70 text-xs uppercase tracking-wider block mt-1">{mca.location}</span>
          </motion.div>

          {/* BCA Degree Card */}
          <motion.div
            style={{ scale: bcaScale, borderColor: bcaBorderColor, boxShadow: bcaShadow }}
            className="p-6 rounded-3xl border bg-surface-container-lowest transition-all duration-300 relative overflow-hidden border-outline-variant/20"
          >
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[4rem] font-black text-primary/4 select-none pointer-events-none uppercase">
              {bca.badge}
            </div>
            <div className="flex items-center gap-4 mb-4">
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest ${bca.color}`}>
                {bca.badge}
              </span>
              <span className="font-label-md text-on-surface-variant text-xs tracking-wider font-semibold">
                {bca.period}
              </span>
            </div>
            <h3 className="font-headline-md text-primary text-[1.1rem] leading-snug mb-2">{bca.degree}</h3>
            <p className="text-on-surface-variant text-sm">{bca.institution}</p>
            <span className="text-on-surface-variant/70 text-xs uppercase tracking-wider block mt-1">{bca.location}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
