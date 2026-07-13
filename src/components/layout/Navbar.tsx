import React from 'react';
import { motion } from 'framer-motion';

export const Navbar = () => {
  return (
    <header className="sticky top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm">
      <nav className="flex justify-between items-center px-margin-desktop lg:pl-32 lg:pr-margin-desktop py-4 max-w-container-max mx-auto max-md:px-margin-mobile">
        <div className="font-headline-md text-headline-md font-bold text-primary">DevPortfolio</div>
        <div className="hidden md:flex items-center gap-8">
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md font-bold relative after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full"
            href="#work"
          >
            Work
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md"
            href="#expertise"
          >
            Expertise
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md"
            href="#about"
          >
            About
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md"
            href="#education"
          >
            Education
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md"
            href="#contact"
          >
            Contact
          </a>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-md text-label-md"
        >
          Resume
        </motion.button>
      </nav>
    </header>
  );
};
