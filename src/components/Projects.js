import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Lock,
  LineChart,
  Terminal
} from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Bloomberg-Style Financial Terminal",
    category: "Fintech Project",
    description: "A Bloomberg Terminal replica featuring live equity market data streaming and real-time WebSocket feeds. Implemented using React, TanStack Query, Context API, JWT authentication, and a Node.js backend with TypeScript strict mode.",
    tags: ["React", "WebSockets", "Node.js", "TypeScript", "TanStack Query"],
    color: "from-emerald-500 to-teal-700",
    icon: <LineChart className="w-6 h-6" />,
    stats: { github: "Bloombergterminal", link: "https://github.com/kshitijashitole16/Bloombergterminal", stack: "MERN" },
    navlink: 'https://github.com/kshitijashitole16/Bloombergterminal'
  },
  {
    id: 2,
    title: "Full-Stack Authentication Library",
    category: "NPM library",
    description: "Published a plug-and-play NPM authentication library for React, streamlining developer workflows. Built a Node.js and PostgreSQL backend using Prisma, implementing JWT auth with refresh token rotation and automated email OTPs.",
    tags: ["React", "NPM", "Node.js", "PostgreSQL", "Prisma", "JWT"],
    color: "from-blue-600 to-indigo-800",
    icon: <Lock className="w-6 h-6" />,
    stats: { github: "Auth SDK", link: "https://github.com/kshitijashitole16/Node_2026/tree/main/auth-sdk", stack: "React +Backend/Lib" },
    navlink: 'https://www.npmjs.com/~kshitijashitole43'
  },
  {
    id: 3,
    title: "Stream Optics",
    category: "Coming Soon",
    description: "A front-end-heavy media playback web application featuring custom multi-protocol streaming engines (HLS/DASH) and a high-precision, low-latency WebSocket client-side telemetry pipeline that tracks real-time video Quality of Service (QoS) metrics.",
    tags: ["Next.js", "Media APIs", "HLS.js", "Shaka Player", "Adaptive Bitrate (ABR)", "WebSockets", "Prisma", "Tailwind CSS"],
    color: "from-slate-700 to-slate-900",
    icon: <Terminal className="w-6 h-6" />,
    stats: { github: "StreamOptics", link: "https://github.com/kshitijashitole16/StreamOptics", stack: "NextJS" }
  }
];

const ProjectCard = ({ project, index, total, isActive, onShuffleNext, onShufflePrev }) => {
  // Calculate relative position: 0 is active, > 0 is next (right), < 0 is prev (left)
  let position = 0;
  if (index > 0) {
    position = index > total / 2 ? index - total : index;
  }

  const isNext = position > 0;
  const isPrev = position < 0;

  // 3D transforms based on relative position
  const zIndex = total - Math.abs(position);
  const translateX = position * 300; // Spread out left and right
  const translateZ = Math.abs(position) * -60; // Push back into Z space
  const scale = 1 - Math.abs(position) * 0.05;
  const opacity = 1 - Math.abs(position) * 0.4; // Fade background cards
  const rotateY = position * -10; // Angle cards slightly towards center

  const handleClick = () => {
    if (isActive) return;
    if (isNext && onShuffleNext) onShuffleNext();
    if (isPrev && onShufflePrev) onShufflePrev();
    if (!isNext && !isPrev && onShuffleNext) onShuffleNext(); // Fallback
  };

  return (
    <div
      style={{
        zIndex,
        transformOrigin: 'center center',
        transform: `perspective(1000px) translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
        opacity: opacity > 0 ? opacity : 0,
        transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
      }}
      className={`absolute top-0 left-0 w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col ${isActive ? 'cursor-default' : 'cursor-pointer'}`}
      onClick={handleClick}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-90`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]" />

      {/* Glass Content Container */}
      <div className="relative h-full flex flex-col p-6 md:p-10 backdrop-blur-sm text-white">
        <div className="flex justify-between items-start mb-6">
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md border border-white/30">
            {project.icon}
          </div>
          <span className="px-3 py-1 rounded-full bg-black/20 text-xs font-mono uppercase tracking-widest border border-white/10">
            {project.category}
          </span>
        </div>

        <h3 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
          {project.title}
        </h3>

        <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8 flex-grow">
          {project.description}
        </p>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-white/10 rounded-lg text-xs font-medium border border-white/10 hover:bg-white/20 transition-colors">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <div className="flex gap-4">
              <div>
                <p className="text-[10px] uppercase text-white/50 mb-0.5">Github</p>
                <p onClick={() => window.open(project.stats.link, '_blank')} className="text-sm font-semibold cursor-pointer hover:text-cyan-400 transition-colors">{project.stats.github}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-white/50 mb-0.5">Stack</p>
                <p className="text-sm font-semibold">{project.stats.stack}</p>
              </div>
            </div>

            {isActive && project.navlink && (
              <button
                onClick={() => window.open(project.navlink, '_blank')}
                className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl font-bold hover:bg-opacity-90 transition-all active:scale-95">
                View Project <ExternalLink size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const [items, setItems] = useState(projects);
  const [isShuffling, setIsShuffling] = useState(false);

  const shuffleNext = () => {
    if (isShuffling) return;
    setIsShuffling(true);

    setItems(prev => {
      const newItems = [...prev];
      const first = newItems.shift();
      newItems.push(first);
      return newItems;
    });

    setTimeout(() => setIsShuffling(false), 600);
  };

  const shufflePrev = () => {
    if (isShuffling) return;
    setIsShuffling(true);

    setItems(prev => {
      const newItems = [...prev];
      const last = newItems.pop();
      newItems.unshift(last);
      return newItems;
    });

    setTimeout(() => setIsShuffling(false), 600);
  };

  return (
    <section id="projects" className="min-h-screen relative w-full flex flex-col items-center justify-center py-20 px-4 md:px-8 font-sans z-10 overflow-hidden bg-transparent">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      <header className="relative z-10 text-center mb-16">
        <h1 className="text-[10px] md:text-xs text-cyan-400 font-bold tracking-[0.4em] uppercase mb-4">
          PROJECT ARCHIVE
        </h1>
        <p className="text-4xl md:text-6xl font-black tracking-tighter text-white/10 uppercase">
          Interactive Showcase
        </p>
      </header>

      {/* Cards Container */}
      <div className="relative w-full max-w-[500px] h-[550px] md:h-[600px] z-20">
        <div className="relative w-full h-full">
          {items.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              total={items.length}
              isActive={index === 0}
              onShuffleNext={shuffleNext}
              onShufflePrev={shufflePrev}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="relative z-30 mt-12 flex items-center gap-8">
        <button
          onClick={shufflePrev}
          className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-110 transition-all active:scale-95 group"
          aria-label="Previous Project"
        >
          <ChevronLeft className="w-6 h-6 text-slate-400 group-hover:text-white" />
        </button>

        <div className="flex gap-2">
          {projects.map((p, idx) => (
            <div
              key={p.id}
              className={`h-1.5 rounded-full transition-all duration-500 ${items[0].id === p.id ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
            />
          ))}
        </div>

        <button
          onClick={shuffleNext}
          className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-110 transition-all active:scale-95 group"
          aria-label="Next Project"
        >
          <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-white" />
        </button>
      </div>

      {/* Footer Hint */}
      <footer className="mt-12 text-slate-500 font-mono text-[10px] uppercase tracking-widest animate-pulse">
        Click background cards or use arrows to navigate
      </footer>
    </section>
  );
}
