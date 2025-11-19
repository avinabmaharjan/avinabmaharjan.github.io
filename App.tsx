import React, { useEffect, useRef, useState } from 'react';
import { Skill, Project, SocialLink } from './types';

// --- Content Data ---

const SKILLS: Skill[] = [
  {
    category: "CONNECTIVITY",
    description: "Tracing invisible paths. Understanding how data travels beneath the surface. Mapping the void."
  },
  {
    category: "DEFENSE",
    description: "Curiosity with boundaries. Breaking things ethically to understand how they hold together."
  },
  {
    category: "EFFICIENCY",
    description: "Making the heavy feel lighter. Writing code to carry the weight I used to fear."
  },
  {
    category: "MARKET",
    description: "Testing ideas in the real world. Shipping imperfect things. Treating rejection as data."
  },
  {
    category: "SOUL WORK",
    description: "Making room for the abstract. Not everything needs to be 'useful' to be valid."
  }
];

const PROJECTS: Project[] = [
  {
    id: "001",
    category: "UTILITY",
    title: "Memory Architecture",
    description: "My mind is noisy. I built this to remember what I forget. Focused on 'calm' states rather than productivity porn.",
    insight: "Building for yourself teaches you self-kindness.",
    tags: ["personal", "tool", "data"]
  },
  {
    id: "002",
    category: "CLI",
    title: "The Guard Dog",
    description: "A command-line tool running basic checks. I needed a ritual to feel secure, not just read about it.",
    insight: "Security is a habit, not a switch.",
    tags: ["command-line", "utility", "scripting"]
  },
  {
    id: "003",
    category: "VIZ",
    title: "Social Pattern Map",
    description: "Turning invisible scrolling habits into data visualizations. I wanted to see exactly where I was vanishing.",
    insight: "If you can map it, you can change it.",
    tags: ["visualization", "data-art", "tracking"]
  }
];

const LINKS: SocialLink[] = [
  { label: "Email", url: "mailto:avinabmaharjan@protonmail.com", display: "ENCRYPTED::SIGNAL" },
  { label: "GitHub", url: "#", display: "VIEW REPOSITORIES" },
  { label: "X/Twitter", url: "#", display: "THOUGHT STREAM" },
  { label: "LinkedIn", url: "#", display: "PROFESSIONAL RECORD" }
];

const LINK_ICONS: Record<string, React.ReactNode> = {
  "Email": (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  ),
  "GitHub": (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
  ),
  "X/Twitter": (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733-16z"/><path d="M4 20l6.768-6.768m2.46-2.46L20 4"/></svg>
  ),
  "LinkedIn": (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
  )
};

// --- Utilities ---

const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
  e.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    // Update URL hash without jumping
    window.history.pushState(null, '', `#${id}`);
  }
};

// --- Components ---

const StaggeredText = ({ text, baseDelay = 0, className = "" }: { text: string, baseDelay?: number, className?: string }) => {
  return (
    <span aria-label={text} className={className}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="hero-char"
          aria-hidden="true"
          style={{ 
            animationDelay: `${baseDelay + (index * 0.04)}s`,
            whiteSpace: 'pre'
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-glass-border backdrop-blur-md bg-void/80 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="font-serif italic text-2xl tracking-wider text-white">
          AM.
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {['JOURNEY', 'PRACTICE', 'WORK', 'SIGNAL'].map((item, index) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={(e) => handleSmoothScroll(e, item.toLowerCase())}
              className="font-mono text-xs text-neutral-500 hover:text-signal transition-colors duration-300 tracking-widest"
            >
              0{index + 1}.{item}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-signal font-mono text-sm"
        >
          {isOpen ? 'CLOSE::X' : 'MENU::+'}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`absolute top-20 left-0 w-full bg-void border-b border-glass-border overflow-hidden transition-all duration-500 ease-magnet ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col p-6 space-y-4">
          {['JOURNEY', 'PRACTICE', 'WORK', 'SIGNAL'].map((item, index) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                handleSmoothScroll(e, item.toLowerCase());
                setIsOpen(false);
              }}
              className="font-mono text-sm text-neutral-400 hover:text-signal block tracking-widest"
            >
              0{index + 1}. {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

const Section = ({ id, className, children }: { id?: string, className?: string, children?: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} ref={ref} className={`reveal-section min-h-screen flex flex-col justify-center py-24 px-6 md:px-12 lg:px-24 ${className}`}>
      {children}
    </section>
  );
};

const Separator = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-glass-border to-transparent my-12 opacity-50" />
);

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-void text-neutral-300 font-sans selection:bg-signal selection:text-black antialiased relative">
      <Nav />

      {/* HERO SECTION */}
      <Section className="pt-40 pb-20 items-start">
        <div className="max-w-5xl">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-2 h-2 bg-signal rounded-full animate-pulse-slow"></div>
            <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-neutral-500">
              REBUILDING FROM ZERO
            </span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl leading-[0.9] text-white mb-6 tracking-tight">
            <StaggeredText text="Trace of a" /> <br/>
            <span className="italic text-neutral-400">
              <StaggeredText text="Quiet Climb." baseDelay={0.4} />
            </span>
          </h1>

          <p className="font-mono text-xs md:text-sm text-neutral-600 mb-12 tracking-wider uppercase">
            [ Builder · Learner · Still Becoming ]
          </p>

          <div className="max-w-2xl space-y-6">
            <p className="text-lg md:text-xl font-light text-neutral-400 leading-relaxed">
              I wasn't born talented. I wasn’t the smart kid or the disciplined one. My life has been a series of detours—restarts, quiet failures, and vanishings. Now, I choose to surface.
            </p>
            <p className="text-lg md:text-xl font-light text-neutral-400 leading-relaxed">
              This site isn’t a portfolio of mastery; it is a log of my attempt to emerge from the void. From ashes, slowly.
            </p>
          </div>

          <div className="mt-16">
            <a 
              href="#journey" 
              onClick={(e) => handleSmoothScroll(e, 'journey')}
              className="group inline-flex items-center space-x-2 font-mono text-sm text-signal hover:text-white transition-colors duration-500"
            >
              <span>Explore the Evidence</span>
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">-&gt;</span>
            </a>
          </div>
        </div>
      </Section>

      {/* 01 // THE NARRATIVE */}
      <Section id="journey">
        <div className="border-l border-signal/30 pl-6 mb-12">
          <span className="font-mono text-signal text-sm tracking-widest">01 // THE NARRATIVE</span>
        </div>
        
        <h2 className="font-serif text-4xl md:text-6xl mb-16 text-white">My story isn't linear.</h2>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          <div className="space-y-6">
            <h3 className="font-mono text-xs text-neutral-600 uppercase tracking-widest mb-4">Background</h3>
            <p className="text-neutral-400 leading-loose font-light text-lg">
              I used to run from hard things. I procrastinated, avoided responsibility, and let fear dictate my timeline. I watched others move ahead while I fought invisible battles. The truth is less heroic: I was stuck.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="font-mono text-xs text-neutral-600 uppercase tracking-widest mb-4">Current Reality</h3>
            <p className="text-neutral-200 leading-loose font-light text-lg">
              I decided to stop vanishing. Now, I treat every restart as a rebirth. I study, I break code, I build scripts that crash, and then I fix them. I’m leaving breadcrumbs here to find my way back. This is my anchor.
            </p>
          </div>
        </div>
      </Section>

      <Separator />

      {/* 02 // THE DISCIPLINE */}
      <Section id="practice">
        <div className="border-l border-signal/30 pl-6 mb-12">
          <span className="font-mono text-signal text-sm tracking-widest">02 // THE DISCIPLINE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-glass-border border border-glass-border">
          {SKILLS.map((skill, i) => (
            <div key={i} className="bg-void p-8 md:p-12 hover:bg-neutral-900/20 transition-colors duration-700 group">
              <h3 className="font-mono text-sm text-signal mb-6 tracking-widest uppercase">{skill.category}</h3>
              <p className="font-sans text-neutral-400 font-light leading-relaxed group-hover:text-neutral-200 transition-colors duration-500">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 03 // THE EVIDENCE */}
      <Section id="work">
        <div className="border-l border-signal/30 pl-6 mb-12">
          <span className="font-mono text-signal text-sm tracking-widest">03 // THE EVIDENCE</span>
        </div>

        <div className="space-y-24">
          {PROJECTS.map((project) => (
            <div key={project.id} className="group grid md:grid-cols-12 gap-8 md:gap-12 items-baseline border-b border-glass-border/30 pb-12 last:border-0">
              <div className="md:col-span-3 font-mono text-xs text-neutral-500 tracking-wider">
                <span className="text-signal mr-2">{project.id}</span>
                <span>· {project.category}</span>
              </div>
              
              <div className="md:col-span-9 space-y-6">
                <h3 className="font-serif text-3xl text-white italic group-hover:text-signal transition-colors duration-500">
                  {project.title}
                </h3>
                <p className="font-light text-neutral-400 text-lg leading-relaxed max-w-2xl">
                  {project.description}
                </p>
                <div className="pt-4 flex flex-col gap-4 items-start">
                  <span className="font-mono text-xs text-neutral-600 bg-glass-border px-3 py-1 rounded-full">
                    "{project.insight}"
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="font-mono text-[10px] text-neutral-500 border border-neutral-800 px-2 py-1 rounded uppercase tracking-wider hover:text-neutral-300 hover:border-neutral-600 transition-colors duration-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Separator />

      {/* 04 // SIGNAL */}
      <Section id="signal" className="pb-40">
        <div className="border-l border-signal/30 pl-6 mb-12">
          <span className="font-mono text-signal text-sm tracking-widest">04 // SIGNAL</span>
        </div>

        <h2 className="font-serif text-5xl md:text-7xl text-white mb-12">
          Compare notes <br/><span className="italic text-neutral-500">from the void.</span>
        </h2>
        
        <p className="font-light text-neutral-400 text-lg max-w-xl mb-16">
          I value resonance over networking. If you are rebuilding yourself, let’s talk. No agenda needed.
        </p>

        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {LINKS.map((link) => (
            <a 
              key={link.label} 
              href={link.url}
              className="signal-link"
              aria-label={link.label}
            >
              {LINK_ICONS[link.label]}
            </a>
          ))}
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-glass-border py-12 px-6 md:px-12">
        <div className="flex justify-center items-center max-w-7xl mx-auto">
          <p className="font-mono text-xs text-neutral-600">
            © 2025 Avinab Maharjan
          </p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-6 md:right-12 z-40 p-3 border border-glass-border bg-void/80 backdrop-blur hover:border-signal text-neutral-500 hover:text-signal transition-all duration-500 ease-magnet group ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <span className="font-mono text-xs tracking-widest group-hover:text-white transition-colors">UP::^</span>
      </button>
    </div>
  );
}
