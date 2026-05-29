import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, useInView } from 'framer-motion';
import { RevolvingTextBackground } from './ui/RevolvingTextBackground';
import { DotsBackground } from './ui/DotsBackground';
import { GhostCursor } from './ui/GhostCursor';
import resumePdf from '../lib/Kshitija_Shitole_Resume.pdf';
import './Hero.css';

// Dynamically import all 40 frames
const importAll = (r) => r.keys().sort().map(r);
const rawFrames = importAll(require.context('../kshitija_frames', false, /\.(png|jpe?g|svg)$/));
// Shift frames by 5 so that Camera_rotates_around_202604271056_026.png (index 25) 
// becomes the center frame (index 20) when mouse is at the center.
const frames = [...rawFrames.slice(5), ...rawFrames.slice(0, 5)];

// --- SCROLL DOWN CTA ---
const ScrollIndicator = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, -150]);
  const pointerEvents = useTransform(scrollY, [0, 100], ['auto', 'none']);

  const handleScrollClick = () => {
    const experienceSection = document.getElementById('experience');
    if (experienceSection) {
      const targetPosition = experienceSection.getBoundingClientRect().top + window.scrollY;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 1200; // 1.2s for an elegant transition
      let startTime = null;

      // cubic-out/quart-out starts very fast and decelerates extremely smoothly (fast-to-slow)
      const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeOutQuart(Math.min(timeElapsed / duration, 1));
        window.scrollTo(0, startPosition + distance * run);
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
  };

  return (
    <motion.div
      style={{ opacity, y, x: "-50%", pointerEvents }}
      className="absolute bottom-16 left-1/2 flex flex-col items-center gap-3 z-30 cursor-pointer group"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={handleScrollClick}
        className="flex flex-col items-center gap-3 w-full h-full"
      >
        <div className="scroll-circle-container transform scale-75 md:scale-100">
          <svg className="scroll-circle-svg" viewBox="0 0 144 144" width="144" height="144">
            <path id="circlePath" d="M 72, 72 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0" fill="transparent" />
            <text>
              <textPath href="#circlePath" startOffset="0%" fill="currentColor" className="text-white">
                SCROLL DOWN • SCROLL DOWN • SCROLL DOWN • SCROLL DOWN •
              </textPath>
            </text>
          </svg>
          <div className="scroll-arrow text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- 3D PORTRAIT COMPONENT ---
const Portrait3D = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [currentFrame, setCurrentFrame] = useState(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Global mouse tracker for frame scrubbing
  useEffect(() => {
    if (!isInView) return;

    const handleGlobalMouseMove = (event) => {
      const percentage = Math.max(0, Math.min(1, event.clientX / window.innerWidth));
      const frameIndex = (frames.length - 1) - Math.floor(percentage * (frames.length - 1));
      setCurrentFrame(frameIndex);
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1200 }}
      className="relative w-full aspect-[4/5] max-w-[320px] mx-auto group"
    >
      <div className="absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full group-hover:bg-cyan-500/20 transition-colors duration-700" />
      <motion.div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl flex items-center justify-center">
        {frames.length > 0 && (
          <img
            src={frames[currentFrame]}
            alt="Kshitija Anant Shitole"
            className="w-[110%] h-[110%] object-contain transition-all duration-700 opacity-90 group-hover:opacity-100"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};

export default function Hero() {
  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white font-sans selection:bg-cyan-500/30 overflow-hidden flex flex-col">

      {/* Global Background Layer */}
      <DotsBackground />

      <GhostCursor
        color="#22d3ee" // Matching the cyan-400 theme
        brightness={0.4}
        edgeIntensity={0}
        trailLength={20}
        inertia={0.2}
        grainIntensity={0.05}
        bloomStrength={0.2}
        bloomRadius={0.7}
        bloomThreshold={0}
        fadeDelayMs={100}
        fadeDurationMs={1000}
        zIndex={2} // Setting z-index so it stays under main content but over dots
      />

      {/* 3-Column Content Wrapper */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-[1.2fr_2fr_1.2fr] gap-12 items-center relative z-10 pt-10 pb-40">

        {/* COLUMN 1: LEFT SIDE (INTRO & SOCIALS) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col gap-12 order-2 md:order-1"
        >
          <div className="flex flex-col gap-2">
            <span className="text-cyan-400 text-[10px] font-black tracking-[0.5em] uppercase">
              Hello, I'm
            </span>
            <div className="h-px w-12 bg-cyan-400/50" />
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.9] bg-gradient-to-b from-white via-white to-white/30 bg-clip-text text-transparent mt-4"
            >
              KSHITIJA ANANT<br />SHITOLE
            </motion.h1>
          </div>

          <div className="space-y-6">
            <p className="text-neutral-400 text-xs md:text-sm leading-relaxed tracking-wide max-w-xs">
              Based in Pune, India. Specializing in high-performance frontend architectures and immersive digital experiences.
            </p>
            <div className="flex flex-col gap-4 text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase">
              <a href="https://www.linkedin.com/in/kshitija-a-shitole-532757195/" target="_blank" className="hover:text-cyan-400 transition-colors">LinkedIn //</a>
              <a href="https://github.com/kshitijashitole16" target="_blank" className="hover:text-cyan-400 transition-colors">GitHub //</a>
              {/* <a href="https://twitter.com/kshitijashitole" className="hover:text-cyan-400 transition-colors">Twitter //</a> */}
            </div>
          </div>
        </motion.div>

        {/* COLUMN 2: CENTER (THE HERO) */}
        <div className="flex flex-col items-center justify-center gap-8 order-1 md:order-2 relative w-full h-[600px]">
          {/* Revolving Text specifically confined behind the portrait */}
          {/* <div className="absolute inset-0 z-0 opacity-70 scale-[1.3] md:scale-150 pointer-events-none">
            <RevolvingTextBackground />
          </div> */}

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative z-10 -mt-16 md:-mt-24"
          >
            <Portrait3D />
          </motion.div>

          <div className="text-center space-y-4 relative z-10 pointer-events-none">


            <div className="relative h-12 flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-cyan-400 text-[10px] font-black tracking-[0.6em] uppercase mb-1"
              >
                Creative
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="text-[10px] md:text-xs text-neutral-500 font-bold tracking-[0.3em] uppercase"
              >
                Software Developer
              </motion.p>
            </div>
          </div>
        </div>

        {/* COLUMN 3: RIGHT SIDE (STATUS & ACTION) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col items-start md:items-end gap-12 order-3"
        >
          {/* CV Download CTA */}
          <div className="flex flex-col items-start md:items-end gap-3">
            <a
              href={resumePdf}
              download="Kshitija_Shitole_Resume.pdf"
              className="flex items-center gap-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-400/50 px-5 py-2.5 rounded-full backdrop-blur-sm transition-all duration-300 group/cv shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-[9px] font-black tracking-[0.2em] text-neutral-300 group-hover/cv:text-cyan-400 uppercase transition-colors duration-300">
                Download CV
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-neutral-400 group-hover/cv:text-cyan-400 group-hover/cv:translate-y-0.5 transition-all duration-300"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
            <span className="text-[10px] text-neutral-600 font-medium tracking-[0.1em] md:text-right">Currently looking for new opportunities and collaborations.</span>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group relative px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Get in touch</span>
            <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>

          {/* Quick Info */}
          <div className="text-neutral-500 text-[10px] font-medium tracking-widest text-left md:text-right border-t border-white/5 pt-8 w-full">
            EST. 2024<br />
            PUNE // IN<br />
            18.5204° N, 73.8567° E
          </div>
        </motion.div>

      </main>

      <ScrollIndicator />


    </div>
  );
}
