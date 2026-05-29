import React, { useState, useEffect, useRef } from 'react';
import {
  Code2, Terminal, Database, Cpu,
  TrendingUp, Award, ChevronRight,
  Globe, Server, Layout, Binary
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SkillNode = ({ label, icon: Icon, color, level = 0, subskills = [] }) => {
  const [isOpen, setIsOpen] = useState(level < 2);
  const hasSubskills = subskills && subskills.length > 0;
  const isLeaf = !hasSubskills;

  return (
    <div className="flex flex-col items-center">
      {/* Node Box */}
      <div
        onClick={() => hasSubskills && setIsOpen(!isOpen)}
        className={`
          relative group flex items-center gap-2 p-2 px-4 
          rounded-xl border transition-all duration-300
          ${hasSubskills ? 'cursor-pointer' : 'cursor-default'}
          ${level === 0
            ? 'bg-cyan-600/10 border-cyan-400/30 ring-4 ring-cyan-500/5 backdrop-blur-md mt-4'
            : isLeaf
              ? 'bg-white/5 border-white/10 backdrop-blur-xl shadow-lg hover:bg-white/10 hover:border-white/20'
              : 'bg-transparent border-transparent hover:bg-white/5'
          }
          w-fit z-10
        `}
      >
        {/* Liquid Glass Background Effect (only for leaves) */}
        {isLeaf && (
          <div className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/30 to-transparent rotate-45 translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]" />
          </div>
        )}

        {Icon && <Icon className={`w-4 h-4 md:w-5 md:h-5 ${color || 'text-cyan-400'}`} />}
        <span className={`font-medium relative z-10 whitespace-nowrap ${level === 0 ? 'text-base md:text-lg text-white font-bold tracking-wider' : isLeaf ? 'text-xs md:text-sm text-white font-semibold' : 'text-xs md:text-sm text-gray-300'}`}>
          {label}
        </span>

        {hasSubskills && (
          <ChevronRight
            className="w-3 h-3 md:w-4 md:h-4 text-gray-500 transition-transform duration-300"
            style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
          />
        )}

        {/* Glow indicator for high level nodes */}
        {level === 0 && (
          <div className="absolute -right-1 -top-1 w-2 h-2 md:w-3 md:h-3 bg-cyan-400 rounded-full blur-sm animate-pulse" />
        )}
      </div>

      {/* Parent Vertical Line */}
      {isOpen && hasSubskills && (
        <div className="w-[2px] h-6 bg-cyan-500/30"></div>
      )}

      {/* Children Container */}
      {isOpen && hasSubskills && (
        <div className="flex flex-row items-start gap-2 md:gap-4">
          {subskills.map((skill, idx) => (
            <div key={idx} className="relative flex flex-col items-center pt-6">
              {/* Vertical line to child */}
              <div className="absolute top-0 left-1/2 w-[2px] h-6 bg-cyan-500/30 -translate-x-1/2" />

              {/* Horizontal lines */}
              {subskills.length > 1 && (
                <>
                  {idx !== 0 && (
                    <div className="absolute top-0 left-0 right-1/2 h-[2px] bg-cyan-500/30" />
                  )}
                  {idx !== subskills.length - 1 && (
                    <div className="absolute top-0 left-1/2 right-0 h-[2px] bg-cyan-500/30" />
                  )}
                </>
              )}

              <SkillNode {...skill} level={level + 1} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      }
    );
  }, []);

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
                { label: "Redux" },
              ]
            },
            {
              label: "JavaScript",
              subskills: [
                { label: "HLS.js" },
                { label: "Shaka player" },
                { label: "Websockets" }
              ]
            },
            { label: "SCSS" },
            { label: "Jest.js" }
          ]
        },
        {
          label: "Backend",
          icon: Server,
          subskills: [
            { label: "Node.js" },
            { label: "Express.js" },
            { label: "Java" },
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
    <section id="skills" ref={sectionRef} className="min-h-screen relative w-full flex flex-col items-center py-32 px-4 md:px-8 font-sans z-10 bg-transparent overflow-hidden">

      <header className="relative z-10 mb-20 max-w-4xl text-center flex flex-col items-center">
        <h1 className="text-[10px] md:text-xs text-cyan-400 font-bold tracking-[0.4em] uppercase mb-4">
          SKILL ARCHITECTURE
        </h1>
        <p className="text-4xl md:text-6xl font-black tracking-tighter text-white/10 uppercase mb-8">
          Domain Expertise
        </p>
        <p className="text-gray-400 max-w-xl text-sm border-l-2 border-cyan-500/50 pl-4 text-left">
          A hierarchical mapping of my technical stack and domain expertise,
          from core web technologies to financial logic.
        </p>
      </header>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-row flex-nowrap md:flex-wrap justify-start md:justify-center items-start gap-8 md:gap-16 overflow-x-auto pb-12 custom-scrollbar">
        {skillData.map((category, idx) => (
          <SkillNode key={idx} {...category} />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(200%) rotate(45deg); }
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.5);
        }
      `}} />
    </section>
  );
};

export default Skills;
