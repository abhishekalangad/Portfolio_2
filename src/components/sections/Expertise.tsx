import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SkillsBackground } from './SkillsBackground';

const FrappeIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#0b5c3a" />
    <path d="M16 8H12V10H15V12H12V18H10V12H8V10H10V7C10 5.34315 11.3431 4 13 4H16V8Z" fill="white" />
  </svg>
);

const ERPNextIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#1b5ebe" />
    <path d="M7 7H17V9H9V11H15V13H9V15H17V17H7V7Z" fill="white" />
  </svg>
);

interface Skill {
  name: string;
  icon?: string;
  customIcon?: React.ReactNode;
  level: number;
  color: string;
  group: string;
}

const allSkills: Skill[] = [
  // Orbit 0: Frontend Core (HTML5, CSS3, JavaScript, TypeScript)
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', level: 95, color: '#e34c26', group: 'Frontend' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', level: 90, color: '#264de4', group: 'Frontend' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', level: 90, color: '#f7df1e', group: 'Frontend' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', level: 85, color: '#3178c6', group: 'Frontend' },
  
  // Orbit 1: Frameworks & Backend (React JS, Tailwind CSS, Python, Django)
  { name: 'React JS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', level: 90, color: '#61dafb', group: 'Frontend' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', level: 95, color: '#06b6d4', group: 'Frontend' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', level: 90, color: '#3776ab', group: 'Backend' },
  { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg', level: 80, color: '#092e20', group: 'Backend' },
  
  // Orbit 2: Systems & Enterprise (MariaDB, Frappe Framework, ERPNext, Git Versioning)
  { name: 'MariaDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mariadb/mariadb-original.svg', level: 85, color: '#003545', group: 'Backend' },
  { name: 'Frappe Framework', customIcon: <FrappeIcon />, level: 90, color: '#0b5c3a', group: 'Enterprise' },
  { name: 'ERPNext', customIcon: <ERPNextIcon />, level: 90, color: '#1b5ebe', group: 'Enterprise' },
  { name: 'Git Versioning', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', level: 85, color: '#f05032', group: 'Enterprise' }
];

// Map skill indices to 3 distinct orbits
const orbitMapping = [
  [0, 1, 2, 3],   // Orbit 0 (Frontend Core)
  [4, 5, 6, 7],   // Orbit 1 (Frameworks & Backend)
  [8, 9, 10, 11]  // Orbit 2 (Systems & Enterprise)
];

// Helper functions for 3D rotation math
const rotateX = (x: number, y: number, z: number, angle: number) => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [
    x,
    y * cos - z * sin,
    y * sin + z * cos
  ];
};

const rotateY = (x: number, y: number, z: number, angle: number) => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [
    x * cos - z * sin,
    y,
    x * sin + z * cos
  ];
};

// Calculate local coordinates on a tilted orbit ellipse
const getOrbitPosition = (theta: number, orbitIndex: number, a: number, b: number) => {
  // 1. Local coordinate on the ellipse
  const xLocal = a * Math.cos(theta);
  const yLocal = b * Math.sin(theta);
  const zLocal = 0;
  
  // 2. Rotate by orbit orientation psi (around Z-axis)
  // Tilt orbits at 0, 120, and 240 degrees to cross each other symmetrically
  const psi = (orbitIndex * 2 * Math.PI) / 3;
  const x1 = xLocal * Math.cos(psi) - yLocal * Math.sin(psi);
  const y1 = xLocal * Math.sin(psi) + yLocal * Math.cos(psi);
  const z1 = zLocal;
  
  // 3. Tilt the orbit plane (rotate around X-axis to give it depth)
  const tilt = Math.PI / 5.2; // ~34 degrees vertical tilt to keep orbits flat and prevent upward overlaps
  const x2 = x1;
  const y2 = y1 * Math.cos(tilt);
  const z2 = y1 * Math.sin(tilt);
  
  return [x2, y2, z2];
};

const SkillItem = ({ 
  skill, 
  opacity, 
  zIndex, 
  x, 
  y, 
  onHoverChange 
}: { 
  skill: Skill; 
  opacity: number; 
  zIndex: number;
  x: number;
  y: number;
  onHoverChange: (isHovered: boolean) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true);
        onHoverChange(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHoverChange(false);
      }}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        // Constant scale of 1.0 (no automatic shrinking or hover scale jumps)
        transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(1.0)`,
        opacity: isHovered ? 1.0 : opacity,
        zIndex: isHovered ? 9999 : zIndex,
        borderColor: isHovered ? skill.color + '60' : 'rgba(22, 52, 34, 0.15)',
        boxShadow: isHovered 
          ? `0 14px 32px -8px ${skill.color}50, inset 0 0 10px 0 ${skill.color}20` 
          : '0 4px 12px -4px rgba(22, 52, 34, 0.05)',
        transition: 'border-color 0.25s, box-shadow 0.25s, background-color 0.25s'
      }}
      // Responsive padding/sizing classes
      className="px-3.5 py-2 sm:px-5 sm:py-3 rounded-full bg-surface-container-lowest/90 border cursor-pointer flex items-center gap-2 sm:gap-3 select-none backdrop-blur-sm"
    >
      <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-md p-0.5 shrink-0 bg-surface-container-low">
        {skill.customIcon ? (
          skill.customIcon
        ) : (
          <img 
            alt={skill.name} 
            className="w-full h-full object-contain" 
            src={skill.icon} 
          />
        )}
      </div>
      <span className="font-label-md text-[10px] sm:text-xs text-primary font-bold tracking-tight whitespace-nowrap">{skill.name}</span>
      
      {/* Brand accent dot */}
      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0" style={{ backgroundColor: skill.color }} />
    </div>
  );
};

export const Expertise = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Responsive dimensions state
  const [dimensions, setDimensions] = useState({ a: 360, b: 85, containerHeight: 400 });

  // Handle window resizing to make the 3D atom fully responsive on all screens
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        // Mobile screens: major axis 150px
        setDimensions({ a: 150, b: 40, containerHeight: 280 });
      } else if (w < 768) {
        // Tablet screens: major axis 240px
        setDimensions({ a: 240, b: 60, containerHeight: 340 });
      } else {
        // Desktop screens: 60% size (major axis 360px)
        setDimensions({ a: 360, b: 85, containerHeight: 400 });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Accumulated global orbital tilt angles
  const angleX = useRef(0.25);
  const angleY = useRef(0.35);

  // Independent orbital angles for skills revolving along the ellipses
  const orbitAngles = useRef<number[]>([0, Math.PI / 2, Math.PI]);

  const [renderedSkills, setRenderedSkills] = useState<Array<{
    skill: Skill;
    x: number;
    y: number;
    opacity: number;
    zIndex: number;
  }>>([]);

  // Mouse & Drag states
  const isBadgeHovered = useRef(false);
  const isDragging = useRef(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const prevMousePos = useRef({ x: 0, y: 0 });

  // Update loop for 3D atomic orbits and automatic rotation
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      // Rotation slows down on badge hover, and stops completely during active drag
      const speedFactor = isBadgeHovered.current ? 0.15 : (isDragging.current ? 0 : 1.0);
      
      // Auto-rotate the whole atomic frame continuously when not dragging or badge hovered
      if (!isDragging.current && !isBadgeHovered.current) {
        angleY.current += 0.0035;
        angleX.current += 0.0012;
      }

      // Revolve the skills (electrons) along their elliptical paths
      orbitAngles.current = orbitAngles.current.map(angle => angle + 0.007 * speedFactor);

      // Map all 12 skills to their 3D paths, apply global tilts, and project them
      const projected = [];
      const R = dimensions.a; // radius scaling matching ellipse major axis

      for (let orbitIndex = 0; orbitIndex < 3; orbitIndex++) {
        const skillIndices = orbitMapping[orbitIndex];
        const baseAngle = orbitAngles.current[orbitIndex];

        for (let j = 0; j < skillIndices.length; j++) {
          const skillIndex = skillIndices[j];
          const skill = allSkills[skillIndex];

          // Distribute 4 skills evenly spaced by 90 degrees along the ellipse
          const theta = baseAngle + (j * Math.PI) / 2;

          // Local position on ellipse
          const [x, y, z] = getOrbitPosition(theta, orbitIndex, dimensions.a, dimensions.b);

          // Apply global tilts (angleY and angleX)
          const [x1, y1, z1] = rotateY(x, y, z, angleY.current);
          const [x2, y2, z2] = rotateX(x1, y1, z1, angleX.current);

          // Compute perspective transformations (S is fixed at 1.0)
          const opacity = 0.5 + 0.5 * (z2 + R) / (2 * R); // depth opacity (ranges from 0.5 to 1.0)
          const zIndex = Math.round(z2 + R);

          projected.push({
            skill,
            x: x2,
            y: y2,
            opacity,
            zIndex
          });
        }
      }

      setRenderedSkills(projected);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [dimensions]); // Re-run animation sync when responsive dimensions change

  // Mouse Drag Event Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    setIsDragActive(true);
    prevMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    const deltaX = e.clientX - prevMousePos.current.x;
    const deltaY = e.clientY - prevMousePos.current.y;

    // Track cursor movements directly: drag rotates the atomic model in real-time
    angleY.current += deltaX * 0.007;
    angleX.current -= deltaY * 0.007;

    prevMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    setIsDragActive(false);
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    setIsDragActive(false);
  };

  // Touch Drag Event Handlers (for mobile/tablet screens)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) return;
    isDragging.current = true;
    setIsDragActive(true);
    prevMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current || e.touches.length === 0) return;

    const deltaX = e.touches[0].clientX - prevMousePos.current.x;
    const deltaY = e.touches[0].clientY - prevMousePos.current.y;

    angleY.current += deltaX * 0.007;
    angleX.current -= deltaY * 0.007;

    prevMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    setIsDragActive(false);
  };

  // Helper to generate coordinates for drawing SVG orbit path strings dynamically
  const getOrbitPathData = (orbitIndex: number) => {
    const points: string[] = [];
    const steps = 90;

    for (let i = 0; i <= steps; i++) {
      const theta = (i / steps) * 2 * Math.PI;
      const [x, y, z] = getOrbitPosition(theta, orbitIndex, dimensions.a, dimensions.b);

      // Rotate with the same global angles
      const [x1, y1, z1] = rotateY(x, y, z, angleY.current);
      const [x2, y2, z2] = rotateX(x1, y1, z1, angleX.current);

      points.push(`${i === 0 ? 'M' : 'L'} ${x2} ${y2}`);
    }
    return points.join(' ');
  };

  return (
    <section className="relative px-margin-mobile md:px-margin-desktop lg:pl-32 lg:pr-margin-desktop py-stack-lg bg-surface-container/10 overflow-hidden" id="expertise">
      {/* Background connecting particle constellation canvas */}
      <SkillsBackground />

      <div className="max-w-container-max mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Core Stack</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto font-body-md">
            Interactive atomic orbits. Click and drag anywhere to rotate the orbits, or hover over a skill to slow down rotation.
          </p>
        </motion.div>

        {/* 3D Atom Model Container (Responsive size & mt-36/md:mt-44 margin separation. Dynamic grab cursors) */}
        <div 
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ height: dimensions.containerHeight }}
          className={`w-full max-w-[800px] mt-36 md:mt-44 mx-auto relative flex items-center justify-center overflow-visible select-none ${
            isDragActive ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {/* Central Nucleus Core */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-surface-container-lowest border-2 border-outline-variant/30 flex flex-col items-center justify-center shadow-xl relative z-50 select-none backdrop-blur-md">
            <span className="material-symbols-outlined text-2xl sm:text-3xl text-primary animate-pulse">lens_blur</span>
            <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-primary mt-1">Expertise</span>
          </div>

          {/* SVG Orbit Rings (Dynamic scale viewbox based on state) */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0"
            viewBox={`-${dimensions.a + 60} -${dimensions.b + 80} ${(dimensions.a + 60) * 2} ${(dimensions.b + 80) * 2}`}
          >
            {[0, 1, 2].map((orbitIndex) => (
              <path
                key={orbitIndex}
                d={getOrbitPathData(orbitIndex)}
                fill="none"
                stroke="rgba(22, 52, 34, 0.15)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
            ))}
          </svg>

          {/* Revolve Skills (Electrons) */}
          {renderedSkills.map(({ skill, x, y, opacity, zIndex }) => (
            <SkillItem
              key={skill.name}
              skill={skill}
              opacity={opacity}
              zIndex={zIndex}
              x={x}
              y={y}
              onHoverChange={(hovered) => {
                isBadgeHovered.current = hovered;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
