import React from 'react';
import { motion } from 'framer-motion';

export const Education = () => {
  return (
    <section className="px-margin-mobile md:px-margin-desktop lg:pl-32 lg:pr-margin-desktop py-stack-lg max-w-container-max mx-auto" id="education">
      <div className="mb-16">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Academic Background</h2>
        <p className="text-on-surface-variant">The foundation of my engineering journey.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Education Card 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="p-8 md:p-12 rounded-[2.5rem] bg-surface-container-low border border-outline-variant/20 hover:border-primary/20 transition-all group"
        >
          <div className="flex flex-col h-full">
            <div className="w-16 h-16 rounded-2xl bg-primary-container flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">school</span>
            </div>
            <span className="font-label-md text-primary/60 mb-2">2023 — 2026 (Expected)</span>
            <h3 className="font-headline-lg text-primary mb-4 leading-tight">Master of Computer Applications (MCA)</h3>
            <p className="font-body-lg text-on-surface-variant mt-auto">
              LEAD College (Autonomous), Palakkad<br/>
              <span className="text-sm opacity-80 uppercase tracking-wider">Kerala, India</span>
            </p>
          </div>
        </motion.div>
        
        {/* Education Card 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="p-8 md:p-12 rounded-[2.5rem] bg-surface-container-low border border-outline-variant/20 hover:border-primary/20 transition-all group translate-y-0 md:translate-y-12"
        >
          <div className="flex flex-col h-full">
            <div className="w-16 h-16 rounded-2xl bg-secondary-container flex items-center justify-center text-secondary mb-8 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">terminal</span>
            </div>
            <span className="font-label-md text-primary/60 mb-2">2020 — 2023</span>
            <h3 className="font-headline-lg text-primary mb-4 leading-tight">Bachelor of Computer Applications (BCA)</h3>
            <p className="font-body-lg text-on-surface-variant mt-auto">
              University of Calicut<br/>
              <span className="text-sm opacity-80 uppercase tracking-wider">Kerala, India</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
