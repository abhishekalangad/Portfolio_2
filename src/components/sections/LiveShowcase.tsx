import React from 'react';
import { motion } from 'framer-motion';

export const LiveShowcase = () => {
  const liveUrl = "https://abhishek-k-portfolio.vercel.app";

  return (
    <section className="px-margin-mobile md:px-margin-desktop lg:pl-32 lg:pr-margin-desktop py-16 md:py-24 max-w-container-max mx-auto bg-surface-container/10 overflow-hidden" id="showcase">
      <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
        <span className="text-primary/40 font-mono text-xs tracking-widest uppercase mb-2">Live Demo</span>
        <h2 className="font-display-lg text-4xl md:text-5xl text-primary font-bold italic">Interactive Device Simulator</h2>
        <div className="h-1 w-24 bg-primary-fixed mt-4 mb-6 rounded-full"></div>
        <p className="text-on-surface-variant font-body-md leading-relaxed">
          Experience this portfolio directly inside simulated device frame mockups.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row items-center justify-center gap-12 xl:gap-20 max-w-5xl mx-auto">
        
        {/* Desktop Monitor */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex-1 w-full max-w-[620px] shrink-0"
        >
          <div className="bg-neutral-900 border-[10px] border-neutral-800 rounded-3xl shadow-2xl relative w-full aspect-video flex flex-col overflow-hidden">
            <div className="bg-neutral-800 px-4 py-2 flex items-center gap-3 border-b border-neutral-900 shrink-0">
              <div className="flex gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
              </div>
              <div className="flex-1 bg-neutral-900 rounded-md text-[10px] text-neutral-400 py-1 px-3 truncate text-center select-none font-mono tracking-tight">
                {liveUrl}
              </div>
            </div>

            <div className="flex-1 w-full bg-surface relative">
              <iframe 
                src={liveUrl} 
                title="Desktop Site Preview"
                className="absolute inset-0 w-full h-full border-none"
                loading="lazy"
              />
            </div>
          </div>

          <div className="w-28 h-12 bg-neutral-800 mx-auto rounded-b-xl shrink-0 shadow-lg relative z-0"></div>
          <div className="w-48 h-3 bg-neutral-900 mx-auto rounded-full shrink-0 shadow-md"></div>
        </motion.div>

        {/* Mobile Phone */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-60 shrink-0 relative"
        >
          <div className="bg-neutral-900 border-[10px] border-neutral-800 rounded-[38px] shadow-2xl relative w-full h-[460px] flex flex-col overflow-hidden">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-neutral-800 h-4 w-28 rounded-full z-50 flex items-center justify-center">
              <span className="w-10 h-0.5 rounded-full bg-neutral-900/60 block"></span>
            </div>

            <div className="flex-1 w-full bg-surface relative pt-6">
              <iframe 
                src={liveUrl} 
                title="Mobile Site Preview"
                className="absolute inset-0 w-full h-full border-none"
                loading="lazy"
              />
            </div>

            <div className="bg-neutral-900 py-1.5 flex items-center justify-center shrink-0">
              <span className="w-20 h-1 rounded-full bg-neutral-700/80 block"></span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
