'use client';

import type { FC } from 'react';
import Head from 'next/head';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const Footer: FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -30]); // Smoother parallax
  const [email, setEmail] = useState('');
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: false, amount: 0.2 });

  // Animation variants for hero section
  const heroVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', type: 'spring', bounce: 0.4 },
    },
  };

  // Animation variants for footer grid items
  const gridItemVariants = {
    hidden: (direction: string) => ({
      opacity: 0,
      x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
      y: direction === 'bottom' ? 50 : 0,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  // Animation variants for social icons
  const socialVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -45 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' },
    }),
  };

  // Newsletter form handler (placeholder)
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <>
      <Head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Orbitron:wght@700&display=swap"
          rel="stylesheet"
        />
        <style>
          {`
            body {
              font-family: 'Inter', sans-serif;
              margin: 0;
            }
            html, body, #__next {
              height: 100%;
            }
            .particle-bg {
              position: absolute;
              inset: 0;
              pointer-events: none;
              background: radial-gradient(circle at 50% 50%, rgba(20, 117, 111, 0.2) 0%, transparent 70%);
              animation: pulse 8s infinite ease-in-out;
            }
            @keyframes pulse {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 0.6; }
            }
            .glow-on-hover:hover {
              box-shadow: 0 0 20px rgba(20, 117, 111, 0.6);
            }
            .pulse-glow {
              animation: pulse-glow 2s infinite ease-in-out;
            }
            @keyframes pulse-glow {
              0%, 100% { box-shadow: 0 0 10px rgba(20, 117, 111, 0.3); }
              50% { box-shadow: 0 0 20px rgba(20, 117, 111, 0.6); }
            }
          `}
        </style>
      </Head>
      <div className="relative bg-[#042F2E] overflow-hidden">
        <div className="particle-bg"></div>
        <footer ref={footerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          {/* Hero Section with Parallax */}
          <motion.section
            className="flex flex-col md:flex-row items-center justify-between gap-8 py-12 bg-[#1F2937]/20 backdrop-blur-lg rounded-xl p-8"
            style={{ y }}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={heroVariants}
          >
            <motion.h1
              className="text-[#FFFFFF] text-4xl md:text-5xl font-bold uppercase text-center md:text-left font-['Orbitron']"
              variants={heroVariants}
            >
              Empower Trust with AI Innovation
            </motion.h1>
            <motion.div
              variants={heroVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                className="bg-gradient-to-r from-[#14756F] to-[#0f5c57] text-[#FFFFFF] font-semibold py-3 px-10 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 glow-on-hover pulse-glow"
              >
                Request a Demo
              </button>
            </motion.div>
          </motion.section>

          {/* Divider */}
          <motion.hr
            className="border-[#4B5563]/30 my-12"
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : { width: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />

          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-[#FFFFFF]">
            {/* Company Links */}
            <motion.div
              className="flex flex-col space-y-4"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={gridItemVariants}
              custom="left"
            >
              <motion.h3
                className="text-[#14756F] text-xl font-semibold font-['Orbitron']"
                variants={gridItemVariants}
              >
                Company
              </motion.h3>
              {[
                { name: 'About Us', href: '#' },
                { name: 'FAQ', href: '#' },
                { name: 'Careers', href: '#' },
              ].map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-[#FFFFFF] hover:text-[#14756F] text-base relative group"
                  variants={gridItemVariants}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#14756F] group-hover:w-full transition-all duration-300"></span>
                </motion.a>
              ))}
            </motion.div>

            {/* Legal Links */}
            <motion.div
              className="flex flex-col space-y-4"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={gridItemVariants}
              custom="left"
            >
              <motion.h3
                className="text-[#14756F] text-xl font-semibold font-['Orbitron']"
                variants={gridItemVariants}
              >
                Legal
              </motion.h3>
              {[
                { name: 'Privacy Policy', href: '#' },
                { name: 'Cookie Policy', href: '#' },
                { name: 'Terms of Service', href: '#' },
              ].map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-[#FFFFFF] hover:text-[#14756F] text-base relative group"
                  variants={gridItemVariants}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#14756F] group-hover:w-full transition-all duration-300"></span>
                </motion.a>
              ))}
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div
              className="flex flex-col space-y-4"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={gridItemVariants}
              custom="right"
            >
              <motion.h3
                className="text-[#14756F] text-xl font-semibold font-['Orbitron']"
                variants={gridItemVariants}
              >
                Stay Updated
              </motion.h3>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-3">
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-[#1F2937]/50 text-[#FFFFFF] rounded-lg p-3 border border-[#4B5563]/50 focus:outline-none focus:border-[#14756F] transition-all duration-200 glow-on-hover"
                  variants={gridItemVariants}
                />
                <motion.button
                  type="submit"
                  className="bg-[#14756F] text-[#FFFFFF] font-semibold py-2 rounded-lg hover:bg-[#0f5c57] transition-all duration-200 glow-on-hover pulse-glow"
                  variants={gridItemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </form>
            </motion.div>

            {/* Social Media & Contact */}
            <motion.div
              className="flex flex-col space-y-4"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={gridItemVariants}
              custom="right"
            >
              <motion.h3
                className="text-[#14756F] text-xl font-semibold font-['Orbitron']"
                variants={gridItemVariants}
              >
                Connect
              </motion.h3>
              <div className="flex space-x-6">
                {[
                  { platform: 'LinkedIn', icon: 'fab fa-linkedin', href: 'https://www.linkedin.com/company/rimba-ai/' },
                  { platform: 'Twitter', icon: 'fab fa-twitter', href: 'https://twitter.com/rimba_ai' },
                  { platform: 'YouTube', icon: 'fab fa-youtube', href: 'https://www.youtube.com/@rimbaai' },
                ].map((item, index) => (
                  <motion.a
                    key={item.platform}
                    href={item.href}
                    aria-label={item.platform}
                    className="text-[#FFFFFF] hover:text-[#14756F] text-2xl pulse-glow"
                    rel="noopener noreferrer"
                    target="_blank"
                    variants={socialVariants}
                    custom={index}
                  >
                    <i className={`${item.icon}`}></i>
                  </motion.a>
                ))}
              </div>
              <motion.div
                className="flex items-center space-x-3 text-sm"
                variants={gridItemVariants}
              >
                <i className="fas fa-phone-alt text-[#14756F]"></i>
                <span>510-543-1864</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2 text-sm"
                variants={gridItemVariants}
              >
                <i className="fas fa-copyright text-[#14756F]"></i>
                <span>2025 Rimba AI Inc. All Rights Reserved.</span>
              </motion.div>
            </motion.div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;