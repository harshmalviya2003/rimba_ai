"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import {
  Shield,
  FileText,
  Layers,
  Database,
  Zap,
  Gauge,
  ChevronRight,
} from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, icon, index }) => {
  return (
    <div className={`project-box-${index} bg-gray-100/50 backdrop-blur-sm p-8 rounded-2xl border border-[#0F766E]/20 shadow-2xl`}>
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-[#0F766E]/20 rounded-full border border-[#0F766E]/50">
          {icon}
        </div>
      </div>
      <div className="text-[#0F766E] text-sm uppercase tracking-widest mb-4 text-center">Project Feature</div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">{title}</h2>
      <p className="text-base text \ text-gray-600 mb-6 leading-relaxed">{description}</p>
      <div className="text-center">
        <Link
          href={`/projects#project-${index}`}
          className="inline-flex items-center px-6 py-3 bg-[#0F766E] hover:bg-[#0A5B55] text-white rounded-lg transition-colors"
        >
          <ChevronRight className="mr-2" /> Learn More
        </Link>
      </div>
    </div>
  );
};

const EnhancedProjectHub: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if the screen is mobile-sized
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Create cosmic particles
    const createParticles = () => {
      if (!particlesRef.current) return;

      particlesRef.current.innerHTML = "";
      const particleCount = isMobile ? 20 : 50;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "absolute rounded-full bg-[#0F766E]";

        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 8;

        gsap.set(particle, {
          width: `${size}px`,
          height: `${size}px`,
          left: `${posX}%`,
          top: `${posY}%`,
          opacity: 0,
          scale: 0,
        });

        gsap.to(particle, {
          opacity: Math.random() * 0.4 + 0.2,
          scale: 1,
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          duration: duration,
          delay: delay,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        particlesRef.current.appendChild(particle);
      }
    };

    createParticles();

    if (!isMobile) {
      // Desktop: Horizontal scrolling
      const panels = gsap.utils.toArray(".panel") as HTMLElement[];
      const scrollTween = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 0.5,
          end: () => `+=${containerRef.current?.offsetWidth || window.innerWidth * panels.length}`,
          markers: false,
        },
      });

      // Project card animations
      [0, 1, 2, 3, 4, 5].forEach((index) => {
        gsap.to(`.project-box-${index}`, {
          boxShadow: "0 0 30px rgba(15, 118, 110, 0.7)",
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: `.project-box-${index}`,
            containerAnimation: scrollTween,
            start: "left 70%",
            toggleActions: "play none none reset",
          },
        });
      });

      gsap.from(".cascade-text", {
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".cascade-section",
          containerAnimation: scrollTween,
          start: "left 60%",
        },
      });
    } else {
      // Mobile: Vertical scrolling
      [0, 1, 2, 3, 4, 5].forEach((index) => {
        gsap.to(`.project-box-${index}`, {
          boxShadow: "0 0 30px rgba(15, 118, 110, 0.7)",
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: `.project-box-${index}`,
            start: "top 70%",
            toggleActions: "play none none reset",
          },
        });
      });

      gsap.from(".cascade-text", {
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".cascade-section",
          start: "top 60%",
        },
      });
    }

    // Force ScrollTrigger refresh
    setTimeout(() => ScrollTrigger.refresh(), 100);

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => ScrollTrigger.refresh(), 200);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  const projects = [
    {
      title: "Catch the missing minutes — before the EPA or CARB does",
      description: "We hunt the gap, retrieve the data and keep it off the back—so a hiccup never turns into a fine.",
      icon: <Shield size={40} className="text-[#0F766E]" />,
    },
    {
      title: "Audit-ready in 6 weeks—no more living-document ping-pong",
      description: "Keep your LOS (log of issues), alive in one place, share updates with auditors in real time, and let Rimba automate the back-and-forth.",
      icon: <FileText size={40} className="text-[#0F766E]" />,
    },
    {
      title: "One dashboard, multiple regulations—zero nights",
      description: "Track, validate LCFS, RFS, ISCC, CORSIA and SB-253 reports in one place. Map your data once and auto-format it for each standard.",
      icon: <Layers size={40} className="text-[#0F766E]" />,
    },
    {
      title: "Single source of truth for every meter—matched to the pipeline",
      description: "Stop stitching siloed data feeds. Rimba ingests your site meters, and flags any mismatch for Ops or regulators to see it.",
      icon: <Database size={40} className="text-[#0F766E]" />,
    },
    {
      title: "Turn CI scores into the highest $ / MMBTU, instantly",
      description: "Rimba runs GREET TIER 1 or 2 models for you to always sell in the richest live intel market.",
      icon: <Zap size={40} className="text-[#0F766E]" />,
    },
    {
      title: "Continuous Air Permitting Monitoring",
      description: "Build safety alerts to track H2S or NOX emissions.",
      icon: <Gauge size={40} className="text-[#0F766E]" />,
    },
  ];

  return (
    <div className="relative bg-white overflow-hidden">
      {/* Cosmic Background */}
      <div ref={particlesRef} className="fixed inset-0 z-0 pointer-events-none" />

      {isMobile ? (
        // Mobile View (Vertical Grid Layout)
        <div className="relative z-10 box-border">
          <section className="min-h-screen w-full py-16 px-4 sm:px-8">
            <div className="w-full max-w-7xl mx-auto">
              <div className="mb-20">
                <div className="flex justify-center mb-12">
                  <div className="p-4 bg-[#0F766E]/20 rounded-full border border-[#0F766E]/50">
                    <Layers className="text-5xl text-[#0F766E]" />
                  </div>
                </div>
                <h1 className="cascade-text text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-800 text-center">
                  <span className="text-[#0F766E]">Rimba</span> Hub
                </h1>
                <p className="cascade-text text-base sm:text-lg md:text-xl text-gray-600 mb-12 text-center leading-relaxed max-w-3xl mx-auto">
                  Streamline project management with powerful tools for compliance, data integration, and real-time monitoring—all in one platform.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 max-w-6xl mx-auto">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={index}
                    title={project.title}
                    description={project.description}
                    icon={project.icon}
                    index={index}
                  />
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
                <Link
                  href="/rimba-hub"
                  className="flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-[#0F766E] hover:bg-[#0A5B55] text-white font-semibold rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-[#0F766E]/50"
                >
                  <Zap className="mr-2" /> Discover Hub
                </Link>
                <Link
                  href="/projects"
                  className="flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-[#0F766E] text-[#0F766E] hover:text-gray-800 hover:bg-[#0F766E]/20 font-semibold rounded-full transition-all transform hover:scale-105"
                >
                  <Layers className="mr-2" /> Explore Projects
                </Link>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="relative py-16 flex flex-col justify-center items-center text-center px-4 sm:px-6 bg-white z-10 overflow-hidden">
            <div className="w-full max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-[#0F766E]/20 rounded-full border border-[#0F766E]/50">
                  <Layers className="text-5xl text-[#0F766E]" />
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Launch Your <span className="text-[#0F766E]">Project</span> Success
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                Join innovators using Rimba Hub to power compliance and efficiency in project management.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/contact-us"
                  className="flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3 bg-[#0F766E] hover:bg-[#0A5B55] text-white font-semibold rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-[#0F766E]/50"
                >
                  <Zap className="mr-2" /> Contact Us
                </Link>
                <Link
                  href="/rimba-network"
                  className="flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3 bg-transparent border-2 border-[#0F766E] text-[#0F766E] hover:text-gray-800 hover:bg-[#0F766E]/20 font-semibold rounded-full transition-all transform hover:scale-105"
                >
                  <Layers className="mr-2" /> Explore Rimba Network
                </Link>
              </div>
            </div>
          </section>
        </div>
      ) : (
        // Desktop View (Horizontal Scrolling)
        <div ref={containerRef} className="relative h-screen w-[700%] flex z-10 box-border">
          {/* Rimba Hub Panel */}
          <section className="panel w-full h-full flex items-center justify-center p-4 sm:p-8">
            <div className="w-full max-w-4xl mx-auto text-center bg-gray-100/50 backdrop-blur-sm p-6 sm:p-12 rounded-2xl border border-[#0F766E]/20 shadow-2xl">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-[#0F766E]/20 rounded-full border border-[#0F766E]/50">
                  <Layers className="text-5xl text-[#0F766E]" />
                </div>
              </div>
              <h1 className="cascade-text text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-800">
                <span className="text-[#0F766E]">Rimba</span> Hub
              </h1>
              <p className="cascade-text text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 leading-relaxed max-w-3xl mx-auto">
                Streamline project management with powerful tools for compliance, data integration, and real-time monitoring—all in one platform.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 sm:mb-16">
                <Link
                  href="/rimba-hub"
                  className="flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-[#0F766E] hover:bg-[#0A5B55] text-white font-semibold rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-[#0F766E]/50"
                >
                  <Zap className="mr-2" /> Discover Hub
                </Link>
                <Link
                  href="/projects"
                  className="flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-[#0F766E] text-[#0F766E] hover:text-gray-800 hover:bg-[#0F766E]/20 font-semibold rounded-full transition-all transform hover:scale-105"
                >
                  <Layers className="mr-2" /> Explore Projects
                </Link>
              </div>
              <div className="flex justify-center space-x-8 mt-8 opacity-80">
                <Shield className="text-2xl text-[#0F766E]" />
                <FileText className="text-2xl text-[#0F766E]" />
                <Layers className="text-2xl text-[#0F766E]" />
                <Database className="text-2xl text-[#0F766E]" />
              </div>
            </div>
          </section>

          {/* Project Panels */}
          {projects.map((project, index) => (
            <section key={index} className="panel w-full h-full flex items-center justify-center p-4 sm:p-8">
              <div className={`project-box-${index} w-full max-w-4xl mx-auto text-center bg-gray-100/50 backdrop-blur-sm p-6 sm:p-12 rounded-2xl border border-[#0F766E]/20 shadow-2xl`}>
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-[#0F766E]/20 rounded-full border border-[#0F766E]/50">
                    {project.icon}
                  </div>
                </div>
                <div className="text-[#0F766E] text-sm uppercase tracking-widest mb-4">Project Feature</div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6">{project.title}</h2>
                <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">{project.description}</p>
                <Link
                  href={`/projects#project-${index}`}
                  className="inline-flex items-center px-6 py-3 bg-[#0F766E] hover:bg-[#0A5B55] text-white rounded-lg transition-colors"
                >
                  <ChevronRight className="mr-2" /> Learn More
                </Link>
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Final CTA Section */}
      <section className="relative py-16 flex flex-col justify-center items-center text-center px-4 sm:px-6 bg-white z-10 overflow-hidden">
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-[#0F766E]/20 rounded-full border border-[#0F766E]/50">
              <Layers className="text-5xl text-[#0F766E]" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Launch Your <span className="text-[#0F766E]">Project</span> Success
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Join innovators using Rimba Hub to power compliance and efficiency in project management.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact-us"
              className="flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3 bg-[#0F766E] hover:bg-[#0A5B55] text-white font-semibold rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-[#0F766E]/50"
            >
              <Zap className="mr-2" /> Contact Us
            </Link>
            <Link
              href="/rimba-network"
              className="flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3 bg-transparent border-2 border-[#0F766E] text-[#0F766E] hover:text-gray-800 hover:bg-[#0F766E]/20 font-semibold rounded-full transition-all transform hover:scale-105"
            >
              <Layers className="mr-2" /> Explore Rimba Network
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnhancedProjectHub;