import React from 'react';
import { motion } from 'framer-motion';

const FrappeIcon = () => (
  <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#0b5c3a" />
    <path d="M16 8H12V10H15V12H12V18H10V12H8V10H10V7C10 5.34315 11.3431 4 13 4H16V8Z" fill="white" />
  </svg>
);

const ERPNextIcon = () => (
  <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#1b5ebe" />
    <path d="M7 7H17V9H9V11H15V13H9V15H17V17H7V7Z" fill="white" />
  </svg>
);

const categories = [
  {
    title: 'Frontend Development',
    icon: 'desktop_windows',
    headline: 'User Interfaces & Client Apps',
    description: 'Building interactive and responsive web clients using modern UI libraries, static styling frameworks, and modular states.',
    skills: [
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
      { name: 'React JS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' }
    ]
  },
  {
    title: 'Backend & Data',
    icon: 'dns',
    headline: 'APIs & Server Architectures',
    description: 'Designing backend databases, server-side workflow scripts, REST API integrations, and robust query optimization.',
    skills: [
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg' },
      { name: 'MariaDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mariadb/mariadb-original.svg' }
    ]
  },
  {
    title: 'Enterprise & Systems',
    icon: 'settings_suggest',
    headline: 'ERPNext & Workflow Automation',
    description: 'Developing custom ERP modules, doctypes, automated workflow logic, custom print templates, and git deployments.',
    skills: [
      { name: 'Frappe Framework', customIcon: <FrappeIcon /> },
      { name: 'ERPNext', customIcon: <ERPNextIcon /> },
      { name: 'Git Versioning', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' }
    ]
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 70,
      damping: 15,
      mass: 0.8
    }
  }
};

export const Expertise = () => {
  return (
    <section className="bg-surface-container/30 px-margin-mobile md:px-margin-desktop lg:pl-32 lg:pr-margin-desktop py-stack-lg" id="expertise">
      <div className="max-w-container-max mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Core Expertise</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto">Mastering the stack from database schema design to responsive client interfaces.</p>
        </motion.div>

        {/* 3-Column Grid representing all categories simultaneously */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          {categories.map((category) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              whileHover={{ 
                y: -6, 
                boxShadow: "0 20px 40px -15px rgba(22, 52, 34, 0.08)",
                borderColor: "rgba(22, 52, 34, 0.15)"
              }}
              className="bg-surface p-8 rounded-[2rem] organic-shadow border border-outline-variant/15 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group"
            >
              {/* Decorative top accent line on hover */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary/50 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-secondary-container text-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined text-2xl">{category.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-lg text-primary font-bold">{category.title}</h3>
                    <p className="text-xs font-semibold text-primary/60 uppercase tracking-widest">{category.headline}</p>
                  </div>
                </div>

                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed mb-8">{category.description}</p>
              </div>

              {/* Skills Area */}
              <div>
                <div className="h-px bg-outline-variant/30 mb-6" />
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      whileHover={{ 
                        y: -3, 
                        scale: 1.02,
                        backgroundColor: "var(--color-surface-container-low, #f4f4f0)",
                        borderColor: "rgba(22, 52, 34, 0.25)"
                      }}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/25 transition-all duration-200 cursor-default shadow-sm hover:shadow"
                    >
                      {skill.customIcon ? (
                        skill.customIcon
                      ) : (
                        <img 
                          alt={skill.name} 
                          className="w-5 h-5 object-contain" 
                          src={skill.icon} 
                        />
                      )}
                      <span className="font-label-md text-xs text-primary font-semibold">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
