import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'WebMall',
    description: 'E-commerce Platform',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-qvIlNrh4M2SCiHRkpzTWt9jBvBjBdhG6vdPfI-RKF2I5Oksq41Nixu3ieIt2OzAzXBZnfNvlMMBlTDOiE4V2aD0mHeUGV1TPXgO8xZm-ezLL0HIZWQ2VG0mvN-C0AqM8Ec90Cyvo3BhpZ8NHgy3tXVs6HSvX5poO6ip5cV7AO6dA3r5Vpo4AnFhmcxeULVa4eO6wk7WpCvDG0wUe4pD3fx2xMA0ovO535x1bmKJ_LhzmVKk8addl',
    link: '#'
  },
  {
    title: 'CAR2GO',
    description: 'Vehicle Rental Service',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwkYHo_GuKVPwyiAskPAMnpKJBjL9RkLeOrX-nD8Z1FIqJDzJ6ezEkif-yhs6np0I4sMSvjMSKjv2QLPI5wg9s-2qdVd-BlqDJr0yg6Cc9bQz1Zbqn5rtRnvVvXfbg0ve10FCAW7bF1mG-lfpTsfp5vPTJVLvCoKfFXVcUuWq0FMUVQYSPM84a2kgV1Yk0xddxkgndD3UiWCaQDrBrWQ0Oq1sb_k7222LiBUBxldi8SZwVEEEYr_9w',
    link: '#'
  },
  {
    title: 'Lumos Learning',
    description: 'EdTech Platform',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-WThQC6HSprr7HDZ6Gso1JrMmqsbP3hlpCWSGWPFW2m414PKKNN9IZ--5B56DwYpZpDNAYT1MoWBjxD4qqhNRYwyOzPQDjqDDGReAtwJiVZzE3ek8SKnERUJvd1F5n46dN16WUcGVjhDtuM3M2UixP1otujNP6cpGRbcpjtodrpfrGUodkedPfaDc5U_j0zn45T3Ku7a66cRoHsjj68EDSXt3ZsRp-97ECNGMnMwXE1svRagTehWr',
    link: '#'
  }
];

export const Projects = () => {
  return (
    <section className="px-margin-mobile md:px-margin-desktop lg:pl-32 lg:pr-margin-desktop py-stack-lg max-w-container-max mx-auto" id="work">
      <div className="flex justify-between items-end mb-16">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Selected Projects</h2>
          <p className="text-on-surface-variant">Quality-driven solutions for complex problems.</p>
        </div>
        <div className="hidden md:block h-px flex-1 mx-12 bg-outline-variant opacity-30"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group cursor-pointer hover:scale-[1.02] transition-all duration-500"
          >
            <div className="aspect-4/3 rounded-3xl overflow-hidden bg-surface-container relative mb-6 organic-shadow">
              <img alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={project.image} />
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-surface text-primary px-6 py-3 rounded-full font-label-md shadow-lg">Case Study</span>
              </div>
            </div>
            <div className="flex justify-between items-start px-2">
              <div>
                <h3 className="font-headline-md text-primary mb-1">{project.title}</h3>
                <p className="text-on-surface-variant text-sm">{project.description}</p>
              </div>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
