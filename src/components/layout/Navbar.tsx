import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import resumePdf from '../../assets/resume.pdf';

const NAV_LINKS = [
  { label: 'About',     href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Education', href: '#education' },
  { label: 'Work',      href: '#work' },
  { label: 'Contact',   href: '#contact' },
];

export const Navbar = () => {
  const [logoText, setLogoText] = useState('');
  const fullText = 'DevPortfolio';
  const [menuOpen, setMenuOpen] = useState(false);

  // Active section scroll-spy via IntersectionObserver
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];
    const visibleSections = new Map<string, number>();

    const pickActive = () => {
      if (visibleSections.size === 0) return;
      let best = '';
      let bestRatio = -1;
      visibleSections.forEach((ratio, id) => {
        if (ratio > bestRatio) { bestRatio = ratio; best = id; }
      });
      if (best) setActiveSection(best);
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleSections.set(id, entry.intersectionRatio);
            } else {
              visibleSections.delete(id);
            }
            pickActive();
          });
        },
        { threshold: [0, 0.1, 0.2, 0.3, 0.5], rootMargin: '-60px 0px -30% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Logo typewriter
  useEffect(() => {
    let index = 0;
    let timer: any;
    const type = () => {
      if (index < fullText.length) {
        setLogoText(fullText.substring(0, index + 1));
        index++;
        timer = setTimeout(type, 120);
      }
    };
    const startTimeout = setTimeout(type, 400);
    return () => { clearTimeout(startTimeout); clearTimeout(timer); };
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 w-full z-50 bg-surface/90 backdrop-blur-md shadow-sm">
        <nav className="flex justify-between items-center px-4 sm:px-margin-desktop lg:pl-32 lg:pr-margin-desktop py-4 max-w-container-max mx-auto">
          {/* Logo */}
          <div className="font-headline-md text-headline-md font-bold text-primary flex items-center select-none min-h-[32px] shrink-0 min-w-[160px]">
            <span>{logoText}</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-[2px] h-[0.9em] bg-primary ml-1 inline-block align-middle"
            />
          </div>

          {/* Desktop Nav links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.slice(1);
              const isActive = activeSection === id;
              return (
                <a
                  key={id}
                  href={href}
                  className={`relative font-label-md text-label-md font-bold transition-colors pb-1 ${
                    isActive ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="navActiveDot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right: Resume button + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href={resumePdf}
              target="_blank"
              rel="noreferrer"
              className="bg-primary text-on-primary px-5 py-2 rounded-lg font-label-md text-label-md hover:scale-105 transition-all text-sm hidden sm:inline-flex items-center gap-1"
            >
              Resume
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-lg hover:bg-surface-container transition-all"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="block w-5 h-[2px] bg-primary rounded-full origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="block w-5 h-[2px] bg-primary rounded-full"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="block w-5 h-[2px] bg-primary rounded-full origin-center"
              />
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden overflow-hidden bg-surface/95 backdrop-blur-md border-t border-outline-variant/10"
            >
              <div className="flex flex-col px-4 py-4 gap-1">
                {NAV_LINKS.map(({ label, href }) => {
                  const id = href.slice(1);
                  const isActive = activeSection === id;
                  return (
                    <a
                      key={id}
                      href={href}
                      onClick={handleLinkClick}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-label-md font-semibold transition-all ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'
                      }`}
                    >
                      {isActive && <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />}
                      {label}
                    </a>
                  );
                })}
                <a
                  href={resumePdf}
                  download="Abhishek_Resume.pdf"
                  onClick={handleLinkClick}
                  className="mt-2 bg-primary text-on-primary px-5 py-3 rounded-xl font-label-md text-center text-sm font-semibold hover:opacity-90 transition-all"
                >
                  Download Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/20 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};
