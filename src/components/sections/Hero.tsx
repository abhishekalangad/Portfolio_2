import React from 'react';
import { motion } from 'framer-motion';
import { HeroBackground } from './HeroBackground';

export const Hero = () => {
  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center py-stack-lg overflow-hidden">
      <HeroBackground />
      <div className="max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop lg:pl-32 lg:pr-margin-desktop relative z-10">
        <div className="max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-container text-on-secondary-container font-label-md mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Available for New Projects
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-display-lg font-display-lg text-primary mb-6 leading-tight"
        >
          Hi, I'm <span className="italic font-serif">ABHISHEK K</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-base md:font-headline-md md:text-headline-md text-primary/80 mb-4 max-w-2xl"
        >
          Software Developer • ERPNext Developer • Python Developer • Full Stack Developer
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-8"
        >
          Building scalable web applications, ERP solutions, and cloud-enabled software with modern technologies.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
        >
          <a className="bg-primary text-on-primary px-6 sm:px-8 py-4 rounded-lg font-label-md hover:scale-105 transition-all flex items-center justify-center gap-2 text-sm sm:text-base" href="#work">
            View Projects <span className="material-symbols-outlined">arrow_downward</span>
          </a>
          <a className="border border-outline text-primary px-6 sm:px-8 py-4 rounded-lg font-label-md hover:bg-surface-container transition-all backdrop-blur-sm text-center text-sm sm:text-base" href="/resume.pdf" download>
            Download Resume
          </a>
          <a className="border border-outline text-primary px-6 sm:px-8 py-4 rounded-lg font-label-md hover:bg-surface-container transition-all backdrop-blur-sm text-center text-sm sm:text-base" href="#contact">
            Contact Me
          </a>
        </motion.div>
      </div>
      </div>
    </section>
  );
};
