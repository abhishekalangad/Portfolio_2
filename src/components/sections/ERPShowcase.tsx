import React from 'react';
import { motion } from 'framer-motion';

export const ERPShowcase = () => {
  return (
    <section className="bg-primary text-on-primary px-margin-mobile md:px-margin-desktop lg:pl-32 lg:pr-margin-desktop py-stack-lg rounded-[3rem] mx-4 my-12 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"></div>
      
      <div className="max-w-container-max mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display-lg text-headline-lg-mobile md:text-display-lg mb-8">Enterprise Architecture Specialized in ERPNext</h2>
          <p className="font-body-lg text-primary-fixed mb-8">
            I build enterprise resource systems that people actually enjoy using. By leveraging the Frappe Framework, I deliver custom modules that align perfectly with your business DNA.
          </p>
          <ul className="space-y-4 mb-12">
            <li className="flex items-center gap-4">
              <span className="material-symbols-outlined text-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span>Custom Frappe Apps & Doctype Design</span>
            </li>
            <li className="flex items-center gap-4">
              <span className="material-symbols-outlined text-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span>Automated Workflow Engineering</span>
            </li>
            <li className="flex items-center gap-4">
              <span className="material-symbols-outlined text-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span>Third-party API & Data Integration</span>
            </li>
          </ul>
          <button className="bg-primary-fixed text-on-primary-fixed px-8 py-4 rounded-lg font-label-md hover:bg-white transition-all">
            Discuss ERP Strategy
          </button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="bg-surface/10 backdrop-blur-md rounded-3xl p-8 border border-white/10"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="space-y-4 font-mono text-sm opacity-90">
            <div className="text-primary-fixed-dim"># Custom ERPNext Implementation</div>
            <div className="text-white">class ManufacturingOrder(DocType):</div>
            <div className="pl-4 text-white">def before_save(self):</div>
            <div className="pl-8 text-secondary-fixed">self.calculate_carbon_footprint()</div>
            <div className="pl-8 text-secondary-fixed">self.validate_supply_chain()</div>
            
            <div className="text-primary-fixed-dim mt-4">// High-performance React component</div>
            <div className="text-white">const Dashboard = () =&gt; {'{'} ... {'}'}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
