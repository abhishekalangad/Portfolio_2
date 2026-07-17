import React from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import studentAnimation from '../../assets/student with laptop.json';

export const About = () => {
  return (
    <section className="px-margin-mobile md:px-margin-desktop lg:pl-32 lg:pr-margin-desktop py-stack-lg max-w-container-max mx-auto" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 relative mb-0"
        >
          <div className="aspect-4/5 rounded-3xl overflow-hidden organic-shadow bg-surface-container-low flex items-center justify-center p-4">
            <Lottie 
              animationData={studentAnimation} 
              loop={true} 
              className="w-full h-full max-h-[380px]"
            />
          </div>
          <div className="absolute bottom-3 right-3 md:-bottom-8 md:-right-8 bg-surface-container-highest p-5 md:p-8 rounded-2xl organic-shadow">
            <span className="font-display-lg text-display-lg text-primary block">1.5+</span>
            <span className="font-label-md text-on-surface-variant text-xs md:text-base">Years of Internship</span>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7 lg:pl-12"
        >
          <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Rooted in code, focused on growth.</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
            As an MCA Student and passionate Software Developer, I believe that enterprise software doesn't have to be cold—it can be as intuitive and beautiful as any consumer app. My journey encompasses Python, Full Stack development and ERPNext always focusing on robust problem-solving.
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
