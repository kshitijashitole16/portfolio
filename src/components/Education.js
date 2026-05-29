import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, MapPin, Award, Trophy } from 'lucide-react';
import { FlippingCard } from './ui/flipping-card';
import vjtiImg from './ui/images/vjti.jpeg';
import wecImg from './ui/images/wec.jpeg';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    institution: 'Veermata Jijabai Technological Institute (VJTI)',
    location: 'Mumbai',
    degree: 'B.Tech — Electronics & Telecommunication',
    duration: 'Graduated: June 2023',
    score: 'CGPA: 7.95 / 10',
    image: vjtiImg,
    icon: <GraduationCap className="w-8 h-8 text-cyan-400" />,
    achievements: [
      {
        title: "Deep Learning for Driver Safety (Final Year Project)",
        desc: "Engineered a computer vision model that recognizes eye movement patterns to detect driver fatigue in real-time. This project bridged the gap between complex neural networks and life-saving public safety applications."
      },
      {
        title: "KJ Somaiya Cup Winning Captain",
        desc: "Led the university volleyball team to a championship victory. Beyond the trophy, this role involved managing team morale, strategic play-calling under pressure, and the logistical coordination of a high-performing squad."
      }
    ]
  },
  {
    institution: 'Walchand College of Engineering',
    location: 'Sangli',
    degree: 'Diploma — Industrial Electronics',
    duration: 'Graduated: October 2019',
    score: 'Final Year Avg: 97.6%',
    image: wecImg,
    icon: <Award className="w-8 h-8 text-emerald-400" />,
    achievements: [
      {
        header: "🏛️ Academic & Leadership Honors"
      },
      {
        title: "Departmental Silver Medalist (ECE)",
        desc: "Graduated as the 2nd highest-ranking student in the Electronics and Communication Engineering department, reflecting a consistent commitment to technical excellence."
      },
      {
        title: "Student of the Year (2019)",
        desc: "Honored with this prestigious title for demonstrating a rare balance of academic rigor, campus leadership, and holistic contribution to the university community."
      },
      {
        title: "Sports General Secretary",
        desc: "Elected to lead the university's athletic department, where I oversaw large-scale tournament logistics, budget management, and the strategic promotion of sports culture on campus."
      },
      {
        header: "🏆 Athletic Milestones"
      },
      {
        title: "State-Level Cricketer (Maharashtra U19 Ranji)",
        desc: "Represented Maharashtra at the highest tier of youth cricket. Competing at this level sharpened my ability to perform under high-pressure environments and ingrained a \"team-first\" mindset."
      },
      {
        title: "Multi-Disciplinary Gold Medalist",
        desc: "Secured Gold Medals in both Inter-Departmental Chess and Volleyball, showcasing a unique blend of analytical strategy and physical teamwork."
      }
    ]
  }
];

const EducationFront = ({ edu }) => (
  <div className="flex flex-col justify-between h-full p-4 text-neutral-900 dark:text-neutral-50">
    <div className="w-full h-48  rounded-2xl overflow-hidden mb-4 relative shadow-inner">
      <img src={edu.image} alt={edu.institution} className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" />
      <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/10 shadow-lg">
        {edu.icon}
      </div>
    </div>
    <div className="flex flex-col items-center text-center">
      <h3 className="text-xl font-bold mb-2">{edu.institution}</h3>
      <p className="text-cyan-600 dark:text-cyan-400 font-medium text-sm">{edu.degree}</p>
    </div>
    <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 text-left">
      <div className="flex justify-between items-center text-sm text-neutral-500 dark:text-neutral-400">
        <span>{edu.duration}</span>
        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {edu.location}</span>
      </div>
      <div className="text-sm font-semibold mt-2">
        Score: {edu.score}
      </div>
    </div>
  </div>
);

const EducationBack = ({ edu }) => (
  <div className="flex flex-col justify-center h-full p-6 text-neutral-900 dark:text-neutral-50 text-left">
    <div className="flex items-center justify-center gap-3 mb-6">
      <Trophy className="w-5 h-5 text-amber-500" />
      <h4 className="font-bold uppercase tracking-widest text-sm">Achievements</h4>
      <Trophy className="w-5 h-5 text-amber-500" />
    </div>
    <ul className="space-y-3 overflow-y-auto pr-2 custom-scrollbar" style={{ maxHeight: '450px' }}>
      {edu.achievements.map((ach, i) => {
        if (ach.header) {
          return (
            <h5 key={i} className="font-bold text-cyan-400 mt-4 mb-2 text-xs uppercase tracking-wider border-b border-white/10 pb-1">
              {ach.header}
            </h5>
          );
        }
        return (
          <li key={i} className="text-xs md:text-sm flex items-start gap-2">
            <span className="text-cyan-500 mt-1 flex-shrink-0">▹</span>
            <span className="leading-relaxed text-neutral-600 dark:text-neutral-300">
              <strong className="text-white font-semibold mr-1">{ach.title}:</strong>
              {ach.desc}
            </span>
          </li>
        );
      })}
    </ul>
  </div>
);

const Education = () => {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    const cards = cardsContainerRef.current.children;
    gsap.fromTo(cards,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      }
    );
  }, []);

  return (
    <section id="education" ref={sectionRef} className="dark min-h-screen relative w-full flex flex-col items-center justify-center py-32 px-4 md:px-8 font-sans z-10 bg-transparent overflow-hidden">

      <header className="relative z-10 text-center mb-20">
        <h1 className="text-[10px] md:text-xs text-cyan-400 font-bold tracking-[0.4em] uppercase mb-4">
          ACADEMIC BACKGROUND
        </h1>
        <p className="text-4xl md:text-6xl font-black tracking-tighter text-white/10 uppercase mb-4">
          Education
        </p>
        <p className="text-gray-400 font-mono text-xs uppercase tracking-widest animate-pulse">
          Hover cards to view achievements
        </p>
      </header>

      <div
        ref={cardsContainerRef}
        className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-center gap-10"
      >
        {educationData.map((edu, index) => (
          <FlippingCard
            key={index}
            width={490}
            height={590}
            frontContent={<EducationFront edu={edu} />}
            backContent={<EducationBack edu={edu} />}
          />
        ))}
      </div>
    </section>
  );
};

export default Education;
