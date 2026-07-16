import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    fetch('https://formspree.io/f/xojavwlz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...formData,
        submittedAt: new Date().toLocaleString(),
        _subject: `New Contact from ${formData.name} - ${new Date().toLocaleString()}`
      })
    })
      .then(response => {
        setIsSubmitting(false);
        if (response.ok) {
          setSubmitStatus('success');
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => setSubmitStatus('idle'), 3000);
        } else {
          setSubmitStatus('error');
          setTimeout(() => setSubmitStatus('idle'), 3000);
        }
      })
      .catch(error => {
        console.error('Formspree Error:', error);
        setIsSubmitting(false);
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 3000);
      });
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
          <h2 className="font-display-lg text-display-lg text-primary mb-6">Get in Touch</h2>
          <p className="font-body-lg text-on-surface-variant mb-8">
            I’m interested in freelance opportunities – especially ambitious or large projects. However, if you have other request or question, don’t hesitate to use the form.
          </p>
          
          <div className="space-y-6 mb-10">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">alternate_email</span>
              </div>
              <div>
                <h4 className="font-label-md text-primary">Email Me</h4>
                <p className="text-on-surface-variant">abhishekalangad@gmail.com</p>
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

          <div className="border-t border-outline-variant/10 pt-6">
            <h4 className="font-label-md text-primary mb-4">Follow Me</h4>
            <div className="flex gap-4">
              <a 
                href="https://linkedin.com/in/abhishek-kulangara" 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-surface-container-low border border-outline-variant/20 flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all duration-300 shadow-sm"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a 
                href="https://github.com/abhishekalangad" 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-surface-container-low border border-outline-variant/20 flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all duration-300 shadow-sm"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="bg-surface p-8 md:p-12 rounded-4xl organic-shadow border border-outline-variant/10"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block font-label-md text-primary mb-2">Your Name</label>
              <input 
                required 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-surface-container-low border-transparent rounded-xl p-4 focus:ring-primary focus:border-primary transition-all sunken-input outline-none" 
                placeholder="Enter your name" 
                type="text" 
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-label-md text-primary mb-2">Email Address</label>
              <input 
                required 
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-surface-container-low border-transparent rounded-xl p-4 focus:ring-primary focus:border-primary transition-all sunken-input outline-none" 
                placeholder="Enter your email address" 
                type="email" 
              />
            </div>
            <div>
              <label htmlFor="message" className="block font-label-md text-primary mb-2">Message</label>
              <textarea 
                required 
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-surface-container-low border-transparent rounded-xl p-4 focus:ring-primary focus:border-primary transition-all sunken-input outline-none" 
                placeholder="Enter your message" 
                rows={4}
              ></textarea>
            </div>
            <button 
              disabled={isSubmitting || submitStatus !== 'idle'}
              className={`w-full text-on-primary py-5 rounded-xl font-headline-md hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 ${
                submitStatus === 'success' 
                  ? 'bg-green-600 shadow-green-600/10' 
                  : submitStatus === 'error' 
                    ? 'bg-red-600 shadow-red-600/10' 
                    : 'bg-primary shadow-primary/10'
              }`} 
              type="submit"
            >
              {isSubmitting ? (
                <><span className="material-symbols-outlined animate-spin">sync</span> Sending...</>
              ) : submitStatus === 'success' ? (
                <><span className="material-symbols-outlined">check_circle</span> Sent Successfully</>
              ) : submitStatus === 'error' ? (
                <><span className="material-symbols-outlined">error</span> Error Sending</>
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
