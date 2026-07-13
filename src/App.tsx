import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/layout/Navbar';
import { SideSocialBar } from './components/layout/SideSocialBar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Expertise } from './components/sections/Expertise';
import { Experience } from './components/sections/Experience';
import { Education } from './components/sections/Education';
import { Projects } from './components/sections/Projects';
import { ERPShowcase } from './components/sections/ERPShowcase';
import { Contact } from './components/sections/Contact';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Navbar />
      <SideSocialBar />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Experience />
        <Education />
        <Projects />
        <ERPShowcase />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
