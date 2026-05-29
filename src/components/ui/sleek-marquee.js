import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

const STYLES = `
@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-scroll-marquee-reverse {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}

.animate-footer-scroll-marquee-reverse {
  animation: footer-scroll-marquee-reverse 40s linear infinite;
}
`;

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>High-Performance</span> <span className="text-primary/60">✦</span>
    <span>React Expert</span> <span className="text-[#a0a0a0]/60">✦</span>
    <span>Framer Motion Mastery</span> <span className="text-primary/60">✦</span>
    <span>Pixel Perfect Execution</span> <span className="text-[#a0a0a0]/60">✦</span>
    <span>Responsive Design</span> <span className="text-primary/60">✦</span>
  </div>
);

export function SleekMarquee({ className }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div 
        className={`relative overflow-hidden border-y border-white/20 bg-black/40 backdrop-blur-md py-4 z-10 shadow-2xl flex flex-col gap-3 ${className || ''}`}
      >
        <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] text-[#a0a0a0] uppercase">
          <MarqueeItem />
          <MarqueeItem />
        </div>
        <div className="flex w-max animate-footer-scroll-marquee-reverse text-xs md:text-sm font-bold tracking-[0.3em] text-[#a0a0a0] uppercase">
          <MarqueeItem />
          <MarqueeItem />
        </div>
      </div>
    </>
  );
}
