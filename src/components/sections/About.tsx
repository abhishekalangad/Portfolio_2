import React from 'react';
import { motion } from 'framer-motion';

export const About = () => {
  return (
    <section className="px-margin-mobile md:px-margin-desktop lg:pl-32 lg:pr-margin-desktop py-stack-lg max-w-container-max mx-auto" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 relative"
        >
          <div className="aspect-4/5 rounded-3xl overflow-hidden organic-shadow animate-float">
            <img 
              className="w-full h-full object-cover" 
              alt="Abhishek K Portrait" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRtgntoXha_ZWGutv2w3uhAUcm5p-pBqkmTrVDSETb7VPxJ1BQJYJ9uZUviXUD2q1dP4-g4wu6y6i777Fdd87X0AC1SgrnOoHydSr6WZqyuCo1iaG91hlWP4VsgtrjqJInKALI_OFOXBgU9R0Z6kq29yMIP96Z36iYwkIslxiTjuRKXTod1z2Jiymrl3K4D3y_Skp6EHbmUSSuEgckvp_7HqGb2qwnffoK32YDl2l4hjplt0duJuq8"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 bg-surface-container-highest p-8 rounded-2xl organic-shadow">
            <span className="font-display-lg text-display-lg text-primary block">1.5+</span>
            <span className="font-label-md text-on-surface-variant">Years of Internship</span>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7 lg:pl-12 max-lg:mt-12"
        >
          <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Rooted in code, focused on growth.</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
            As an MCA Student and passionate Software Developer, I believe that enterprise software doesn't have to be cold—it can be as intuitive and beautiful as any consumer app. My journey encompasses ERPNext, Python, Full Stack development, and Cloud automation, always focusing on robust problem-solving.
          </p>
          <div className="grid grid-cols-2 gap-gutter">
            <div className="p-6 rounded-2xl bg-surface-container-low">
              <span className="material-symbols-outlined text-primary mb-4 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
              <h4 className="font-label-md text-primary mb-2">Sustainable Tech</h4>
              <p className="text-sm text-on-surface-variant">Clean architectures in Python and React that evolve without technical debt.</p>
            </div>
            <div className="p-6 rounded-2xl bg-surface-container-low">
              <span className="material-symbols-outlined text-primary mb-4 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>diamond</span>
              <h4 className="font-label-md text-primary mb-2">Business Automation</h4>
              <p className="text-sm text-on-surface-variant">Custom Frappe applications and workflow automation strategies.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
