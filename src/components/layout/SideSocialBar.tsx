import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SideSocialBar = () => {
  const [showToast, setShowToast] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (navigator.share) {
      navigator.share({
        title: 'Abhishek K - Portfolio',
        text: 'Check out the professional portfolio of Abhishek K, Software & ERPNext Developer.',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
        })
        .catch(err => {
          console.error('Could not copy text: ', err);
        });
    }
  };

  return (
    <>
      <aside className="fixed left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 items-center z-40">
        <div className="flex flex-col gap-6 items-center">
          <a 
            className="text-on-surface-variant opacity-60 hover:opacity-100 hover:scale-125 transition-all" 
            href="#work"
            title="View Projects"
          >
            <span className="material-symbols-outlined">code</span>
          </a>
          <button 
            className="text-on-surface-variant opacity-60 hover:opacity-100 hover:scale-125 transition-all cursor-pointer bg-transparent border-none p-0 outline-none" 
            onClick={handleShare}
            title="Share Portfolio"
          >
            <span className="material-symbols-outlined">share</span>
          </button>
          <a 
            className="text-on-surface-variant opacity-60 hover:opacity-100 hover:scale-125 transition-all" 
            href="#contact"
            title="Contact Me"
          >
            <span className="material-symbols-outlined">chat</span>
          </a>
          <a 
            className="text-on-surface-variant opacity-60 hover:opacity-100 hover:scale-125 transition-all" 
            href="mailto:hello@abhishekk.dev"
            title="Email Me"
          >
            <span className="material-symbols-outlined">mail</span>
          </a>
        </div>
        <div className="w-px h-24 bg-outline-variant"></div>
      </aside>

      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-8 left-1/2 bg-primary text-on-primary px-6 py-3 rounded-full shadow-lg font-label-md text-sm z-50 flex items-center gap-2 border border-outline/20 backdrop-blur-md"
          >
            <span className="material-symbols-outlined text-green-400">check_circle</span>
            Portfolio link copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
