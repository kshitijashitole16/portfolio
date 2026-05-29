import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: 'Nuvama Wealth',
    location: 'Bangalore',
    role: 'Software Developer I',
    duration: 'Jun 2023 – Mar 2026',
    achievements: [
      'Spearheaded front-end development of IPO, NCD, and Mutual Fund financial journeys on the new trading platform, increasing overall revenue from IPO and NCD by 4% YoY.',
      'Optimized in-house WebSocket streaming for live market data, reducing price-update latency from 3 seconds to under 100 ms — a 97% improvement — by redesigning the data-binding pipeline.',
      'Build 12+ investment product showcase pages for 1,500+ Relationship Managers, driving 6% YoY AUM growth through 4 animated experiences, text effects, and fully responsive layouts.',
      'Built a complex F&O Margin Calculator with real-time streaming data for NAV, LTP, and percentage-change calculations, accelerating margin decisions for high-frequency traders.'
    ]
  },
  {
    company: 'IBM',
    location: 'Mumbai',
    role: 'Frontend Engineer Intern',
    duration: 'May 2022 – Jun 2022',
    achievements: [
      'Built a reusable component library (15+ UI components) in HTML and CSS for enterprise-level internal tools, reducing per-page development time by an estimated 40% across 3 product teams.',
      'Improved cross-browser compatibility and responsive layout coverage to 100% across Chrome, Firefox, Safari, and Edge, eliminating client-reported rendering bugs in production.'
    ]
  }
];

const Experience = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.experience-card');
    
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    gsap.fromTo(timelineRef.current,
      { height: 0 },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true
        }
      }
    );
  }, []);

  return (
    <section className="experience-section" id="experience" ref={sectionRef}>
      <h2 className="section-title">Professional Experience</h2>
      
      <div className="timeline-container">
        <div className="timeline-line-bg"></div>
        <div className="timeline-line" ref={timelineRef}></div>

        {experiences.map((exp, index) => (
          <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
            <div className="timeline-dot"></div>
            <div className="experience-card glass-panel">
              <div className="card-header">
                <h3>{exp.role}</h3>
                <span className="duration">{exp.duration}</span>
              </div>
              <h4 className="company">{exp.company} <span className="location">| {exp.location}</span></h4>
              <ul className="achievements">
                {exp.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
