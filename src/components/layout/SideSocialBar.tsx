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

  const links = [
    {
      type: 'anchor',
      href: '#work',
      icon: 'work',           // briefcase — matches "Work / Projects"
      title: 'View Projects',
    },
    {
      type: 'button',
      icon: 'ios_share',      // native share icon — clean & modern
      title: 'Share Portfolio',
      onClick: handleShare,
    },
    {
      type: 'anchor',
      href: '#contact',
      icon: 'contact_page',   // contact card — matches "Contact Me"
      title: 'Contact Me',
    },
    {
      type: 'anchor',
      // mailto: opens default mail app BUT if user wants webmail we use Gmail directly
      href: 'https://mail.google.com/mail/?view=cm&to=abhishekalangad@gmail.com',
      target: '_blank',
      icon: 'forward_to_inbox', // send-to-inbox arrow — distinct email send icon
      title: 'Email Me',
    },
  ];

  return (
    <>
      <aside className="fixed left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 items-center z-40">
        <div className="flex flex-col gap-6 items-center">
          {links.map((link, i) =>
            link.type === 'button' ? (
              <button
                key={i}
                className="text-on-surface-variant opacity-60 hover:opacity-100 hover:text-primary hover:scale-125 transition-all cursor-pointer bg-transparent border-none p-0 outline-none"
                onClick={link.onClick}
                title={link.title}
              >
                <span className="material-symbols-outlined">{link.icon}</span>
              </button>
            ) : (
              <a
                key={i}
                className="text-on-surface-variant opacity-60 hover:opacity-100 hover:text-primary hover:scale-125 transition-all"
                href={link.href}
                target={link.target}
                rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                title={link.title}
              >
                <span className="material-symbols-outlined">{link.icon}</span>
              </a>
            )
          )}
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
