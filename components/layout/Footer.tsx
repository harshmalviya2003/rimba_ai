'use client';
import type { FC } from 'react';
import Head from 'next/head';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useState, useRef } from 'react';

const Footer: FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -30]);
  const [email, setEmail] = useState('');
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.2 }); // Changed to once: true

  // Animation variants
  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const gridItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' },
    }),
  };

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
        <style>
          {`
            .particle-bg {
              position: absolute;
              inset: 0;
              pointer-events: none;
              background: radial-gradient(circle at 50% 50%, rgba(20, 117, 111, 0.2) 0%, transparent 70%);
            }
            .glow-on-hover:hover {
              box-shadow: 0 0 20px rgba(20, 117, 111, 0.6);
            }
          `}
        </style>
      </Head>
      <div className="relative bg-[#042F2E] overflow-hidden">
        <div className="particle-bg"></div>
        <footer ref={footerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          {/* Hero Section */}
          <motion.section
            className="flex flex-col md:flex-row items-center justify-between gap-8 py-12 bg-[#1F2937]/20 backdrop-blur-lg rounded-xl p-8"
            style={{ y }}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={heroVariants}
          >
            <h1 className="text-white text-3xl md:text-4xl font-bold text-center md:text-left">
              Empower Trust with AI Innovation
            </h1>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="bg-gradient-to-r from-[#14756F] to-[#0f5c57] text-white font-medium py-3 px-8 rounded-lg shadow-lg transition-all duration-300 glow-on-hover">
                Request a Demo
              </button>
            </motion.div>
          </motion.section>

          {/* Divider - now static */}
          <hr className="border-[#4B5563]/30 my-12 w-full" />

          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-white">
            {/* Company Links */}
            <motion.div
              className="flex flex-col space-y-4"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={gridItemVariants}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-[#14756F] text-lg font-semibold">Company</h3>
              {['About Us', 'FAQ', 'Careers'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-white hover:text-[#14756F] text-sm relative group transition-colors duration-300"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#14756F] group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </motion.div>

            {/* Legal Links */}
            <motion.div
              className="flex flex-col space-y-4"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={gridItemVariants}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-[#14756F] text-lg font-semibold">Legal</h3>
              {['Privacy Policy', 'Cookie Policy', 'Terms of Service'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-white hover:text-[#14756F] text-sm relative group transition-colors duration-300"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#14756F] group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div
              className="flex flex-col space-y-4"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={gridItemVariants}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-[#14756F] text-lg font-semibold">Stay Updated</h3>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-[#1F2937]/50 text-white rounded-lg p-2 border border-[#4B5563]/50 focus:outline-none focus:border-[#14756F] transition-all duration-200"
                />
                <button
                  type="submit"
                  className="bg-[#14756F] text-white font-medium py-2 rounded-lg hover:bg-[#0f5c57] transition-all duration-200"
                >
                  Subscribe
                </button>
              </form>
            </motion.div>

            {/* Social Media & Contact */}
            <motion.div
              className="flex flex-col space-y-4"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={gridItemVariants}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-[#14756F] text-lg font-semibold">Connect</h3>
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
                    className="text-white hover:text-[#14756F] text-xl transition-colors duration-300"
                    rel="noopener noreferrer"
                    target="_blank"
                    variants={socialVariants}
                    custom={index}
                  >
                    <i className={item.icon}></i>
                  </motion.a>
                ))}
              </div>
              <div className="flex items-center space-x-3 text-xs">
                <i className="fas fa-phone-alt text-[#14756F]"></i>
                <span>510-543-1864</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <i className="fas fa-copyright text-[#14756F]"></i>
                <span>2025 Rimba AI Inc. All Rights Reserved.</span>
              </div>
            </motion.div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;