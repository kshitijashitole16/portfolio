import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import { SleekMarquee } from './components/ui/sleek-marquee';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Refresh ScrollTrigger after a slight delay to ensure all DOM elements and images are loaded
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  return (
    <div className="App">
      <main>
        <Hero />
        <SleekMarquee />
        <Experience />
        <SleekMarquee />
        <Projects />
        <SleekMarquee />
        <Skills />
        <SleekMarquee />
        <Education />
        <SleekMarquee />
        <Contact />
      </main>
      <footer>
        <p>© 2026 Kshitija Anant Shitole. Built with React & Three.js.</p>
      </footer>
    </div>
  );
}

export default App;
