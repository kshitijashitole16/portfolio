import React, { useState, useEffect, useRef } from 'react';
import {
    Code2, Terminal, Database, Cpu,
    TrendingUp, Award, ChevronRight,
    Globe, Server, Layout, Binary
} from 'lucide-react';

const SkillNode = ({ label, icon: Icon, color, level = 0, subskills = [] }) => {
    const [isOpen, setIsOpen] = useState(level < 2); // Auto-open high-level categories
    const hasSubskills = subskills.length > 0;

    return (
        <div className={`flex flex-col ml-${level * 4} relative`}>
            {/* Horizontal Connector Line */}
            {level > 0 && (
                <div className="absolute left-[-2rem] top-[1.5rem] w-8 h-[2px] bg-gradient-to-r from-blue-500/20 to-blue-400/50" />
            )}

            <div
                onClick={() => hasSubskills && setIsOpen(!isOpen)}
                className={`
          relative group flex items-center gap-3 p-3 px-5 my-2
          rounded-2xl border border-white/10 backdrop-blur-xl
          transition-all duration-300 cursor-pointer
          ${level === 0 ? 'bg-blue-600/20 border-blue-400/30 ring-4 ring-blue-500/5' : 'bg-white/5 hover:bg-white/10'}
          ${isOpen && hasSubskills ? 'shadow-[0_0_20px_rgba(59,130,246,0.2)]' : ''}
        `}
            >
                {/* Liquid Glass Background Effect */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]" />
                </div>

                {Icon && <Icon className={`w-5 h-5 ${color || 'text-blue-400'}`} />}
                <span className={`font-medium ${level === 0 ? 'text-lg text-white' : 'text-sm text-gray-200'}`}>
                    {label}
                </span>

                {hasSubskills && (
                    <ChevronRight
                        className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
                    />
                )}

                {/* Glow indicator for high level nodes */}
                {level === 0 && (
                    <div className="absolute -right-1 -top-1 w-3 h-3 bg-blue-400 rounded-full blur-sm animate-pulse" />
                )}
            </div>

            {/* Vertical Connection Line for children */}
            {isOpen && hasSubskills && (
                <div className="relative flex flex-col ml-8 border-l-2 border-dashed border-blue-500/20">
                    {subskills.map((skill, idx) => (
                        <SkillNode key={idx} {...skill} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

const App = () => {
    const skillData = [
        {
            label: "Web Development",
            icon: Globe,
            color: "text-blue-400",
            subskills: [
                {
                    label: "Frontend",
                    icon: Layout,
                    subskills: [
                        {
                            label: "React.js",
                            subskills: [
                                { label: "TanStack Query" },
                                { label: "Zustand" },
                                { label: "Redux" }
                            ]
                        },
                        { label: "TypeScript" },
                        { label: "JavaScript (ES6+)" },
                        { label: "HTML / SCSS" },
                        { label: "Jest.js (Testing)" }
                    ]
                },
                {
                    label: "Backend",
                    icon: Server,
                    subskills: [
                        { label: "Node.js" },
                        { label: "Express.js" },
                        { label: "Java (Spring)" },
                        { label: "C++" }
                    ]
                }
            ]
        },
        {
            label: "Data & Architecture",
            icon: Database,
            color: "text-emerald-400",
            subskills: [
                { label: "PostgreSQL" },
                { label: "MongoDB" },
                { label: "SQL (Complex Queries)" }
            ]
        },
        {
            label: "Financial Instruments",
            icon: TrendingUp,
            color: "text-amber-400",
            subskills: [
                { label: "Equity Markets" },
                { label: "Derivatives" },
                { label: "Mutual Funds" }
            ]
        },
        {
            label: "Certifications",
            icon: Award,
            color: "text-purple-400",
            subskills: [
                { label: "Meta Front-End Developer Professional" },
                { label: "LeetCode 1800+ Rating (Top 5%)" }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[#05070a] text-white p-8 md:p-20 overflow-x-hidden">
            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full" />
            </div>

            <header className="relative z-10 mb-16 max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 italic">
                    SKILL <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 underline decoration-blue-500/30">ARCHITECTURE</span>
                </h1>
                <p className="text-gray-400 max-w-xl text-lg border-l-2 border-blue-500/50 pl-4">
                    A hierarchical mapping of my technical stack and domain expertise,
                    from core web technologies to financial logic.
                </p>
            </header>

            <main className="relative z-10 max-w-6xl">
                <div className="flex flex-col gap-4">
                    {skillData.map((category, idx) => (
                        <SkillNode key={idx} {...category} />
                    ))}
                </div>
            </main>

            <footer className="mt-24 pt-8 border-t border-white/5 text-gray-500 text-sm flex items-center gap-4">
                <Binary className="w-4 h-4" />
                <span>Built with React & Liquid-Glass UI Principles</span>
            </footer>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(200%) rotate(45deg); }
        }
        
        body {
          scrollbar-width: thin;
          scrollbar-color: #1e293b #05070a;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #05070a;
        }
        ::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
      `}} />
        </div>
    );
};

export default App;