import React from 'react';

export const Footer = () => {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-surface-container-low w-full rounded-t-[3rem] mt-24 border-t border-outline-variant/10">
      <div className="px-margin-mobile md:px-margin-desktop lg:pl-32 lg:pr-margin-desktop py-16 max-w-container-max mx-auto">
        
        {/* Top Tier: Multi-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-outline-variant/10 pb-12">
          
          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="font-headline-md text-headline-md text-primary font-bold">Abhishek K</div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Building automation, clean code, and business architectures with purpose. Specialized in ERPNext, Python, and Full Stack development.
            </p>
          </div>
          
          {/* Column 2: Navigation Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-label-md text-primary tracking-wider uppercase text-xs">Quick Links</h4>
            <div className="flex flex-col gap-2.5">
              <a className="text-sm text-on-surface-variant hover:text-primary transition-colors w-fit" href="#about">About Me</a>
              <a className="text-sm text-on-surface-variant hover:text-primary transition-colors w-fit" href="#expertise">Core Stack</a>
              <a className="text-sm text-on-surface-variant hover:text-primary transition-colors w-fit" href="#experience">Experience</a>
              <a className="text-sm text-on-surface-variant hover:text-primary transition-colors w-fit" href="#education">Education</a>
              <a className="text-sm text-on-surface-variant hover:text-primary transition-colors w-fit" href="#projects">Projects</a>
            </div>
          </div>
          
          {/* Column 3: Professional Profiles */}
          <div className="flex flex-col gap-4">
            <h4 className="font-label-md text-primary tracking-wider uppercase text-xs">Profiles</h4>
            <div className="flex flex-col gap-2.5">
              <a 
                className="text-sm text-on-surface-variant hover:text-primary transition-colors w-fit flex items-center gap-2" 
                href="https://linkedin.com/in/abhishek-kulangara" 
                target="_blank" 
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a 
                className="text-sm text-on-surface-variant hover:text-primary transition-colors w-fit flex items-center gap-2" 
                href="https://github.com/abhishekalangad" 
                target="_blank" 
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
          
          {/* Column 4: Contact/Inquiries */}
          <div className="flex flex-col gap-4">
            <h4 className="font-label-md text-primary tracking-wider uppercase text-xs">Contact & Inquiries</h4>
            <div className="flex flex-col gap-2 text-sm text-on-surface-variant">
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">mail</span>
                abhishekalangad@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">location_on</span>
                Kerala, India
              </p>
            </div>
          </div>
          
        </div>
        
        {/* Bottom Tier: Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-1.5 max-sm:text-center">
            <p className="text-sm text-on-surface-variant">
              © {new Date().getFullYear()} Abhishek K. All rights reserved.
            </p>
            <p className="text-xs text-on-surface-variant/60">
              Built with React, Vite & Tailwind CSS.
            </p>
          </div>
          
          <a 
            onClick={scrollToTop}
            href="#top"
            className="w-12 h-12 rounded-full bg-surface-container-high hover:bg-primary hover:text-on-primary transition-all duration-300 flex items-center justify-center text-primary shadow-sm hover:scale-110 active:scale-95 shrink-0"
            title="Scroll to Top"
          >
            <span className="material-symbols-outlined">arrow_upward</span>
          </a>
        </div>
        
      </div>
    </footer>
  );
};
