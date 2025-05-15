'use client';

import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export function Hero() {
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const aiChipRef = useRef(null);

  // AI-related keywords for typing animation
  const aiKeywords = [
    "Machine Learning",
    "Neural Networks",
    "Predictive Analytics",
    "Deep Learning",
    "Algorithmic Optimization"
  ];

  useEffect(() => {
    // Quick fade-in for the entire section
    gsap.fromTo(
      heroRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );

    // Master timeline for sequenced animations
    const masterTL = gsap.timeline();

    // Background gradient (static, no animation to reduce load)
    masterTL.set(
      heroRef.current,
      { background: "linear-gradient(135deg, #f0f9ff 0%, #e6f4fe 50%, #d8effa 100%)" }
    );

    // Typing animation for AI keywords (faster)
    masterTL.to(subheadingRef.current, {
      duration: 1, // Reduced from 2
      text: { value: aiKeywords[0], delimiter: "" },
      ease: "none"
    });

    // Cycle through AI keywords (less frequent)
    let keywordIndex = 0;
    const keywordInterval = setInterval(() => {
      keywordIndex = (keywordIndex + 1) % aiKeywords.length;
      gsap.to(subheadingRef.current, {
        duration: 1, // Reduced from 1.5
        text: { value: aiKeywords[keywordIndex], delimiter: "" },
        ease: "power1.inOut"
      });
    }, 4000); // Increased interval to reduce visual noise

    // Floating AI elements animation (subtle)
   // Floating AI elements animation (subtle)
const floatingElements = gsap.utils.toArray<HTMLElement>('.floating-element');
floatingElements.forEach((el, i) => {
  const duration = 6 + Math.random() * 4; // Slightly faster
  const movement = 20 + Math.random() * 20; // Reduced movement
  gsap.to(el, {
    y: movement,
    duration: duration,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: Math.random() * 1
  });
});

    // Main content animations (faster and less offset)
    masterTL.fromTo(
      headingRef.current,
      { y: 20, opacity: 0 }, // Reduced y from 80, removed skewY
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, // Reduced from 1.2
      "+=0.1"
    );

    masterTL.fromTo(
      textRef.current,
      { y: 20, opacity: 0 }, // Reduced y from 50
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, // Reduced from 1
      "-=0.4"
    );

    masterTL.fromTo(
      buttonRef.current,
      { scale: 0.9, opacity: 0 }, // Reduced scale from 0.8
      {
        scale: 1,
        opacity: 1,
        duration: 0.5, // Reduced from 0.8
        ease: 'back.out(1.4)', // Slightly less bouncy
        onStart: () => {
          // Subtle pulsing effect
          gsap.to(buttonRef.current, {
            scale: 1.03, // Reduced pulse intensity
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
          });
        }
      },
      "-=0.3"
    );

    // AI chip animation (faster)
    masterTL.fromTo(
      aiChipRef.current,
      { scale: 0.9, opacity: 0 }, // Removed rotation
      {
        scale: 1,
        opacity: 1,
        duration: 0.5, // Reduced from 1
        ease: 'power2.out'
      },
      "-=0.3"
    );

    // Image animation (subtle)
    masterTL.fromTo(
      imageRef.current,
      { y: 20, opacity: 0 }, // Reduced y from 60, removed rotation
      {
        y: 0,
        opacity: 1,
        duration: 0.7, // Reduced from 1.5
        ease: 'power2.out',
        onComplete: () => {
          // Subtle floating animation
          gsap.to(imageRef.current, {
            y: 10, // Reduced from 20
            duration: 3, // Faster
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
      },
      "-=0.4"
    );

    // Particle Network Animation (delayed to prioritize content)
    const initParticleNetwork = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 1.5 + 0.5; // Smaller particles
          this.baseX = this.x;
          this.baseY = this.y;
          this.density = (Math.random() * 20) + 1; // Lighter density
          this.color = `hsl(${Math.random() * 60 + 180}, 60%, 60%)`; // Softer color
          this.velocity = Math.random() * 0.1 - 0.05; // Slower movement
          this.angle = 0;
        }

        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fillStyle = this.color;
          ctx.fill();
        }

        update() {
          this.angle += this.velocity;
          this.x = this.baseX + Math.cos(this.angle) * 8; // Reduced movement
          this.y = this.baseY + Math.sin(this.angle) * 8;

          for (let i = 0; i < particlesRef.current.length; i++) {
            const dx = this.x - particlesRef.current[i].x;
            const dy = this.y - particlesRef.current[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 80) { // Reduced connection distance
              ctx.beginPath();
              ctx.strokeStyle = `rgba(20, 117, 111, ${1 - distance/80})`;
              ctx.lineWidth = 0.3; // Thinner lines
              ctx.moveTo(this.x, this.y);
              ctx.lineTo(particlesRef.current[i].x, particlesRef.current[i].y);
              ctx.stroke();
              ctx.closePath();
            }
          }

          this.draw();
        }
      }

      particlesRef.current = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 12000); // Fewer particles

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle());
      }

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesRef.current.length; i++) {
          particlesRef.current[i].update();
        }
        requestAnimationFrame(animate);
      }

      // Delay particle animation slightly
      setTimeout(animate, 300);

      const onMouseMove = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        for (let i = 0; i < particlesRef.current.length; i++) {
          const dx = mouseX - particlesRef.current[i].x;
          const dy = mouseY - particlesRef.current[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) { // Reduced interaction range
            particlesRef.current[i].baseX = particlesRef.current[i].x - (dx * 0.03);
            particlesRef.current[i].baseY = particlesRef.current[i].y - (dy * 0.03);
          }
        }
      };

      window.addEventListener('mousemove', onMouseMove);

      const onResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      window.addEventListener('resize', onResize);

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
        clearInterval(keywordInterval);
      };
    };

    // Delay particle network to ensure content loads first
    setTimeout(initParticleNetwork, 100);

    return () => {
      clearInterval(keywordInterval);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0" // Initial opacity for fade-in
      style={{ willChange: 'opacity' }} // Optimize rendering
    >
      {/* Interactive Particle Network Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 w-full h-full filter blur-[1px]" // Reduced blur
        style={{ willChange: 'transform, opacity' }}
      />

      {/* Floating AI Elements */}
      <div className="absolute inset-0 overflow-hidden z-10">
        {[...Array(8)].map((_, i) => ( // Reduced number of elements
          <div
            key={i}
            className="floating-element absolute opacity-15"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 80 + 40}px`, // Smaller elements
              height: `${Math.random() * 80 + 40}px`,
              background: `radial-gradient(circle, rgba(20, 117, 111, 0.2) 0%, transparent 70%)`,
              borderRadius: '50%',
              filter: 'blur(8px)', // Slightly less blur
              willChange: 'transform'
            }}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-cyan-50/20 z-20" />

      <div className="max-w-7xl mx-auto md:mt-10 flex flex-col md:flex-row items-center justify-between relative z-30 gap-12">
        {/* Text Content */}
        <div className="text-center md:text-left md:max-w-2xl">
          <div className="mb-6">
            <div
              ref={aiChipRef}
              className="inline-flex items-center px-4 py-2 rounded-full bg-[#14756F]/10 border border-[#14756F]/20 mb-4"
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="w-2 h-2 rounded-full bg-[#14756F] mr-2 animate-pulse"></div>
              <span className="text-sm font-medium text-[#14756F]">AI-Powered Platform</span>
            </div>
          </div>

          <h1
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#14756F] to-[#0B3D38]"
            style={{ willChange: 'transform, opacity' }}
          >
            Transforming Renewable Fuel Compliance with AI
          </h1>

          <div className="h-12 mb-4">
            <h2
              ref={subheadingRef}
              className="text-xl sm:text-2xl font-medium text-[#14756F]"
              style={{ willChange: 'opacity' }}
            >
              Machine Learning
            </h2>
          </div>

          <p
            ref={textRef}
            className="text-lg sm:text-xl text-gray-700 mb-8 max-w-lg mx-auto md:mx-0"
            style={{ willChange: 'transform, opacity' }}
          >
            Our intelligent platform leverages cutting-edge artificial intelligence to simplify compliance, optimize operations, and maximize value across RNG, Ethanol, Renewable Diesel, and SAF markets.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              ref={buttonRef}
              size="lg"
              className="bg-[#14756F] hover:bg-[#0f5c57] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              style={{ willChange: 'transform, opacity' }}
            >
              Request Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#14756F] text-[#14756F] hover:bg-[#14756F]/10 shadow-sm transition-all duration-300"
            >
              Learn How It Works
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2">4.9/5 (128 reviews)</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
            <div>Trusted by 50+ renewable fuel producers</div>
          </div>
        </div>

        {/* Animated Image with AI Elements */}
        <div ref={imageRef} className="relative mt-10 md:mt-0 md:max-w-xl" style={{ willChange: 'transform, opacity' }}>
          <div className="relative">
            <Image
              src="/hero.png"
              alt="AI Compliance Dashboard"
              width={450}
              height={350}
              className="object-contain rounded-xl shadow-2xl border border-white/20"
              priority
            />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-white flex items-center justify-center p-2">
              <svg className="w-10 h-10 text-[#14756F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="absolute top-1/4 -right-8 w-14 h-14 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-white flex items-center justify-center">
              <svg className="w-8 h-8 text-[#14756F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}