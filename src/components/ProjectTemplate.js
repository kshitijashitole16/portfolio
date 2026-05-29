import React, { useState, useEffect } from 'react';
import {
    ChevronRight,
    ChevronLeft,
    ExternalLink,
    Code2,
    Layers,
    Zap,
    Database,
    Lock,
    LineChart,
    Terminal,
    Package
} from 'lucide-react';

const projects = [
    {
        id: 1,
        title: "Bloomberg-Style Financial Terminal",
        category: "Personal Project",
        description: "A Bloomberg Terminal replica featuring live equity market data streaming and real-time WebSocket feeds. Implemented using React, TanStack Query, Context API, JWT authentication, and a Node.js backend with TypeScript strict mode.",
        tags: ["React", "WebSockets", "Node.js", "TypeScript", "TanStack Query"],
        color: "from-emerald-500 to-teal-700",
        icon: <LineChart className="w-6 h-6" />,
        stats: { complexity: "High", stack: "Fullstack" }
    },
    {
        id: 2,
        title: "Full-Stack Authentication Library",
        category: "Personal Project",
        description: "Published a plug-and-play NPM authentication library for React, streamlining developer workflows. Built a Node.js and PostgreSQL backend using Prisma, implementing JWT auth with refresh token rotation and automated email OTPs.",
        tags: ["React", "NPM", "Node.js", "PostgreSQL", "Prisma", "JWT"],
        color: "from-blue-600 to-indigo-800",
        icon: <Lock className="w-6 h-6" />,
        stats: { complexity: "Medium", stack: "Backend/Lib" }
    },
    {
        id: 3,
        title: "Coming Soon...",
        category: "Future Project",
        description: "Currently architecting a distributed systems monitoring tool with high-availability requirements and real-time visualization dashboards.",
        tags: ["Go", "gRPC", "Redis", "Docker"],
        color: "from-slate-700 to-slate-900",
        icon: <Terminal className="w-6 h-6" />,
        stats: { complexity: "N/A", stack: "Systems" }
    }
];

const ProjectCard = ({ project, index, total, isActive, onShuffle }) => {
    // Calculate 3D transforms based on position in stack
    const zIndex = total - index;
    const translateY = index * -15;
    const translateZ = index * -40;
    const scale = 1 - index * 0.05;
    const opacity = 1 - index * 0.2;

    return (
        <div
            style={{
                zIndex,
                transform: `perspective(1000px) translate3d(0, ${translateY}px, ${translateZ}px) scale(${scale})`,
                opacity: opacity > 0 ? opacity : 0,
                transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
            }}
            className={`absolute top-0 left-0 w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col ${isActive ? 'cursor-default' : 'cursor-pointer'}`}
            onClick={!isActive ? onShuffle : undefined}
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
                                <p className="text-[10px] uppercase text-white/50 mb-0.5">Complexity</p>
                                <p className="text-sm font-semibold">{project.stats.complexity}</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase text-white/50 mb-0.5">Stack</p>
                                <p className="text-sm font-semibold">{project.stats.stack}</p>
                            </div>
                        </div>

                        {isActive && (
                            <button className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl font-bold hover:bg-opacity-90 transition-all active:scale-95">
                                View Project <ExternalLink size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function App() {
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
        <div className="min-h-screen bg-[#0a0a0a] text-slate-100 flex flex-col items-center justify-center p-4 md:p-8 font-sans overflow-hidden">
            {/* Background Ambience */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px]" />
            </div>

            <header className="relative z-10 text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                    PROJECT ARCHIVE
                </h1>
                <p className="text-slate-400 font-mono text-xs uppercase tracking-[0.3em]">
                    Interactive 3D Portfolio Showcase
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
                            onShuffle={shuffleNext}
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
        </div>
    );
}