import React from 'react';
import { motion } from 'framer-motion';

export const Experience = () => {
  return (
    <section className="px-margin-mobile md:px-margin-desktop lg:pl-32 lg:pr-margin-desktop py-stack-lg max-w-container-max mx-auto">
      <div className="mt-24 md:mt-32">
        <div className="flex flex-col items-center mb-16">
          <span className="text-primary/40 font-mono text-sm tracking-widest uppercase mb-2">Career Path</span>
          <h2 className="font-display-lg text-4xl md:text-5xl text-primary font-bold italic text-center">Professional Experience</h2>
          <div className="h-1 w-24 bg-primary-fixed mt-4 rounded-full"></div>
        </div>
        
        <div className="relative">
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-outline-variant opacity-30 -translate-x-1/2 hidden md:block origin-top"
          ></motion.div>
          
          <div className="space-y-12 relative">
            {/* Experience Item 1 */}
            <div className="group relative flex flex-col md:flex-row items-center gap-8 md:gap-0">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7 }}
                className="w-full md:w-1/2 md:pr-12 text-left md:text-right"
              >
                <div className="inline-block px-4 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-sm mb-2">
                  SEP 2025 — FEB 2026
                </div>
                <p className="text-on-surface-variant font-medium">(Assimilate Technologies) Pune, India </p>
              </motion.div>
              
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10 hidden md:block group-hover:scale-150 transition-transform duration-300"></div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7 }}
                className="w-full md:w-1/2 md:pl-12"
              >
                <div className="bg-surface p-8 rounded-3xl organic-shadow border border-transparent hover:border-primary/10 hover:bg-surface-container-low hover:scale-[1.02] transition-all duration-300">
                  <h4 className="text-xl font-bold text-primary mb-2">ERPNext Developer Intern</h4>
                  <p className="text-body-md text-on-surface-variant leading-relaxed">
                    Gaining hands-on experience in ERPNext implementation and custom Frappe module development for enterprise clients.
                  </p>
                </div>
              </motion.div>
            </div>
            
            {/* Experience Item 2 */}
            <div className="group relative flex flex-col md:flex-row-reverse items-center gap-8 md:gap-0">
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7 }}
                className="w-full md:w-1/2 md:pl-12 text-left"
              >
                <div className="inline-block px-4 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-sm mb-2">
                  APR 2023 — APR 2024
                </div>
                <p className="text-on-surface-variant font-medium">(Right Soft Options) Kochi, India </p>
              </motion.div>
              
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10 hidden md:block group-hover:scale-150 transition-transform duration-300"></div>
              
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7 }}
                className="w-full md:w-1/2 md:pr-12"
              >
                <div className="bg-surface p-8 rounded-3xl organic-shadow border border-transparent hover:border-primary/10 hover:bg-surface-container-low hover:scale-[1.02] transition-all duration-300">
                  <h4 className="text-xl font-bold text-primary mb-2 text-left md:text-right">Python Developer Intern</h4>
                  <p className="text-body-md text-on-surface-variant leading-relaxed text-left md:text-right">
                    Contributed to backend development using Python and Django, focusing on API optimization and database management.
                  </p>
                </div>
              </motion.div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};
