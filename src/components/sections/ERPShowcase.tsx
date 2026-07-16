import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const ERPShowcase = () => {
  const codeLines = [
    { text: "# Custom ERPNext Implementation", color: "text-primary-fixed-dim" },
    { text: "class ManufacturingOrder(DocType):", color: "text-white" },
    { text: "    def before_save(self):", color: "text-white pl-4" },
    { text: "        self.calculate_carbon_footprint()", color: "text-secondary-fixed pl-8" },
    { text: "        self.validate_supply_chain()", color: "text-secondary-fixed pl-8" },
    { text: "", color: "min-h-[0.75rem]" },
    { text: "// High-performance React component", color: "text-primary-fixed-dim" },
    { text: "const Dashboard = () => { ... }", color: "text-white" }
  ];

  const [visibleLines, setVisibleLines] = useState<string[]>(Array(codeLines.length).fill(""));
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);

  useEffect(() => {
    let timer: any;
    const currentLine = codeLines[currentLineIdx];

    if (!currentLine) {
      // Reset after full typing complete
      timer = setTimeout(() => {
        setVisibleLines(Array(codeLines.length).fill(""));
        setCurrentLineIdx(0);
        setCurrentCharIdx(0);
      }, 5000);
      return () => clearTimeout(timer);
    }

    if (currentLine.text === "") {
      setCurrentLineIdx(prev => prev + 1);
      setCurrentCharIdx(0);
      return;
    }

    if (currentCharIdx < currentLine.text.length) {
      timer = setTimeout(() => {
        setVisibleLines(prev => {
          const next = [...prev];
          next[currentLineIdx] = currentLine.text.slice(0, currentCharIdx + 1);
          return next;
        });
        setCurrentCharIdx(prev => prev + 1);
      }, 40);
    } else {
      timer = setTimeout(() => {
        setCurrentLineIdx(prev => prev + 1);
        setCurrentCharIdx(0);
      }, 400);
    }

    return () => clearTimeout(timer);
  }, [currentLineIdx, currentCharIdx]);

  return (
    <section className="bg-primary text-on-primary px-margin-mobile md:px-margin-desktop lg:pl-32 lg:pr-margin-desktop py-stack-lg rounded-3xl md:rounded-[3rem] mx-3 md:mx-4 my-12 overflow-hidden relative">
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
          <a href="#contact" className="inline-block w-full sm:w-auto text-center bg-primary-fixed text-on-primary-fixed px-8 py-4 rounded-lg font-label-md hover:bg-white transition-all">
            Discuss ERP Strategy
          </a>
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
          <div className="overflow-x-auto space-y-3 font-mono text-sm opacity-90 min-h-[220px]">
            {codeLines.map((line, idx) => {
              const isCurrent = idx === currentLineIdx;
              const typedText = visibleLines[idx];
              
              return (
                <div key={idx} className={`${line.color} min-h-6 flex items-center`}>
                  <span>{typedText}</span>
                  {isCurrent && (
                    <span className="inline-block w-1.5 h-4 bg-secondary-fixed ml-1 animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
