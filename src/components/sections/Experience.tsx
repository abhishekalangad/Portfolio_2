import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const experiences = [
  {
    role: "ERPNext Developer Intern",
    company: "Assimilate Technologies",
    location: "Pune, India",
    period: "Sep 2025 — Feb 2026",
    color: "#0b5c3a",
    icon: "deployed_code",
    tech: ["ERPNext", "Frappe Framework", "Python", "Jinja", "HTML5", "CSS3", "JavaScript"],
    bullets: [
      "Customized multiple ERPNext print formats for sales and logistics documents.",
      "Worked with HTML, CSS, and Jinja templating for dynamic document generation.",
      "Configured and tested Sales, Accounting, HRMS, Asset, and Inventory modules.",
      "Supported HRMS setup with employee data, role configuration, and attendance testing.",
      "Performed UAT testing, bug fixing, and deployment support for live client projects.",
      "Collaborated with developers and consultants on client-based ERP requirements and revisions."
    ]
  },
  {
    role: "Python Developer Intern",
    company: "Right Soft Options",
    location: "Kochi, India",
    period: "Apr 2023 — Apr 2024",
    color: "#3776ab",
    icon: "terminal",
    tech: ["Python", "Django", "REST APIs", "SQL", "Git", "API Optimization"],
    bullets: [
      "Worked on backend logic using Python and Django.",
      "Collaborated in team projects and client-side scripting tasks.",
      "Participated in debugging and REST API integration."
    ]
  }
];

export const Experience = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeExp = experiences[activeIdx];

  return (
    <section className="px-margin-mobile md:px-margin-desktop lg:pl-32 lg:pr-margin-desktop py-16 md:py-24 max-w-container-max mx-auto" id="experience">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-12">
        <span className="text-primary/40 font-mono text-xs tracking-widest uppercase mb-2">Career Path</span>
        <h2 className="font-display-lg text-4xl md:text-5xl text-primary font-bold italic text-center">Professional Experience</h2>
        <div className="h-1 w-24 bg-primary-fixed mt-4 rounded-full"></div>
      </div>

      {/* Interactive Deck Layout */}
      <div className="flex flex-col md:flex-row gap-8 items-start bg-surface-container-low border border-outline-variant/15 rounded-3xl p-6 md:p-8 shadow-sm">
        
        {/* Left Column: Tab Selectors */}
        <div className="flex flex-row md:flex-col gap-2 w-full md:w-64 overflow-x-auto md:overflow-x-visible shrink-0 pb-3 md:pb-0 border-b md:border-b-0 md:border-r border-outline-variant/10">
          {experiences.map((exp, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl font-label-md text-sm font-semibold transition-all cursor-pointer whitespace-nowrap md:whitespace-normal text-left w-auto md:w-full select-none ${
                  isActive
                    ? 'text-primary'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high/50'
                }`}
              >
                {/* Active side-indicator bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeExperienceBar"
                    className="absolute left-0 top-0 bottom-0 w-1 md:w-1 bg-primary rounded-full hidden md:block"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
                {/* Active bottom-indicator bar for mobile layout */}
                {isActive && (
                  <motion.div
                    layoutId="activeExperienceBarMobile"
                    className="absolute bottom-0 left-4 right-4 h-1 bg-primary rounded-full md:hidden"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}

                <span
                  className="material-symbols-outlined text-lg shrink-0"
                  style={{ color: exp.color }}
                >
                  {exp.icon}
                </span>
                <div className="flex flex-col">
                  <span className="font-bold text-[13px] leading-tight md:leading-normal">{exp.company}</span>
                  <span className="text-[11px] text-on-surface-variant/75 font-medium mt-0.5">{exp.period}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Viewport Details Panel */}
        <div className="flex-1 w-full min-h-[360px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col h-full"
            >
              {/* Header details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/10 pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                    {activeExp.role}
                  </h3>
                  <p className="text-on-surface-variant font-medium text-sm mt-1 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base text-primary/60">location_on</span>
                    {activeExp.company} • {activeExp.location}
                  </p>
                </div>
                <span className="bg-secondary-container text-on-secondary-container text-[11px] font-bold tracking-wider px-3.5 py-1.5 rounded-full shrink-0 self-start sm:self-center">
                  {activeExp.period}
                </span>
              </div>

              {/* Achievement bullet points */}
              <div className="flex-1">
                <h5 className="text-[11px] font-bold text-primary/45 uppercase tracking-widest mb-3">Key Responsibilities & Impact</h5>
                <ul className="space-y-3">
                  {activeExp.bullets.map((bullet, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.1 }}
                      className="flex items-start gap-3 text-sm text-on-surface-variant leading-relaxed"
                    >
                      <span className="text-primary text-[10px] select-none mt-1 shrink-0">▸</span>
                      <span>{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Associated tech stack tag strip */}
              <div className="border-t border-outline-variant/10 pt-6 mt-8">
                <h5 className="text-[11px] font-bold text-primary/45 uppercase tracking-widest mb-3">Technologies Utilized</h5>
                <div className="flex flex-wrap gap-1.5">
                  {activeExp.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-surface-container-high text-primary rounded-full text-xs font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

