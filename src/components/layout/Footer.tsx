import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-surface-container w-full rounded-t-xl mt-24">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop lg:pl-32 lg:pr-margin-desktop py-stack-lg gap-gutter max-w-container-max mx-auto max-md:px-margin-mobile">
        <div className="flex flex-col gap-4">
          <div className="font-headline-sm text-headline-sm text-primary">DevPortfolio</div>
          <p className="font-body-md text-body-md text-on-surface-variant">© 2026 DevPortfolio. Built with intention.</p>
        </div>
        <div className="flex gap-8">
          <a className="text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4" href="#">Case Studies</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4" href="#">Privacy Policy</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4" href="#">Source Code</a>
        </div>
        <div className="flex gap-4">
          <a className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-primary hover:scale-110 transition-transform" href="#">
            <span className="material-symbols-outlined text-xl">share</span>
          </a>
          <a className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-primary hover:scale-110 transition-transform" href="#">
            <span className="material-symbols-outlined text-xl">terminal</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
