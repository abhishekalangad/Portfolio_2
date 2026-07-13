import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSuccess(false);
        (e.target as HTMLFormElement).reset();
      }, 3000);
    }, 1500);
  };

  return (
    <section className="px-margin-mobile md:px-margin-desktop lg:pl-32 lg:pr-margin-desktop py-stack-lg max-w-container-max mx-auto" id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-start">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display-lg text-display-lg text-primary mb-6">Let's Build Something Together</h2>
          <p className="font-body-lg text-on-surface-variant mb-12">
            Whether you have a specific project in mind or just want to explore the possibilities of tech, I'm here to help you grow.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">alternate_email</span>
              </div>
              <div>
                <h4 className="font-label-md text-primary">Email Me</h4>
                <p className="text-on-surface-variant">hello@abhishekk.dev</p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <h4 className="font-label-md text-primary">Location</h4>
                <p className="text-on-surface-variant">Kerala, India</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="bg-surface p-8 md:p-12 rounded-4xl organic-shadow"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block font-label-md text-primary mb-2">Your Name</label>
              <input required className="w-full bg-surface-container-low border-transparent rounded-xl p-4 focus:ring-primary focus:border-primary transition-all sunken-input outline-none" placeholder="John Doe" type="text" />
            </div>
            <div>
              <label className="block font-label-md text-primary mb-2">Email Address</label>
              <input required className="w-full bg-surface-container-low border-transparent rounded-xl p-4 focus:ring-primary focus:border-primary transition-all sunken-input outline-none" placeholder="john@example.com" type="email" />
            </div>
            <div>
              <label className="block font-label-md text-primary mb-2">Message</label>
              <textarea required className="w-full bg-surface-container-low border-transparent rounded-xl p-4 focus:ring-primary focus:border-primary transition-all sunken-input outline-none" placeholder="Tell me about your project..." rows={4}></textarea>
            </div>
            <button 
              disabled={isSubmitting || isSuccess}
              className={`w-full text-on-primary py-5 rounded-xl font-headline-md hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 ${isSuccess ? 'bg-green-600 shadow-green-600/10' : 'bg-primary shadow-primary/10'}`} 
              type="submit"
            >
              {isSubmitting ? (
                <><span className="material-symbols-outlined animate-spin">sync</span> Sending...</>
              ) : isSuccess ? (
                <><span className="material-symbols-outlined">check_circle</span> Sent Successfully</>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
