'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking a menu item
  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  // Animation variants for mobile menu
  const menuVariants = {
    closed: {
      x: '100%',
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  // Animation variants for nav items
  const navItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <header className="fixed top-4 left-4 right-4 mx-auto max-w-7xl z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex items-center justify-between bg-white/70 backdrop-blur-lg border border-white/20 rounded-full shadow-lg py-2 px-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo */}
          <motion.div
            className="flex items-center flex-shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            <a href="/" className="flex items-center">
              <Image
                src="/logo.png" // Replace with your logo path
                alt="Rimba Logo"
                width={100}
                height={32}
                className="object-contain"
                priority
              />
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {[
              { name: 'Solutions', href: '#' },
              { name: 'Resources', href: '#' },
              { name: 'Newsroom', href: '#' },
              { name: 'About', href: '#' },
            ].map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-sm text-gray-700 hover:text-[#14756F] font-medium px-3 py-1 rounded-full hover:bg-white/30 transition-all duration-200"
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                {item.name}
              </motion.a>
            ))}
          </nav>

          {/* Right-side buttons */}
          <div className="flex items-center space-x-2">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="hidden md:block"
            >
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-700 hover:text-[#14756F] hover:bg-white/30 rounded-full"
              >
                Login
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                className="bg-[#14756F] hover:bg-[#0f5c57] text-white rounded-full shadow-sm px-4"
              >
                Demo
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              className="fixed top-4 right-4 w-64 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 md:hidden p-4 mt-12"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex flex-col space-y-2">
                {[
                  { name: 'Solutions', href: '#' },
                  { name: 'Resources', href: '#' },
                  { name: 'Newsroom', href: '#' },
                  { name: 'About', href: '#' },
                ].map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-[#14756F] hover:bg-white/30 font-medium text-sm px-4 py-2 rounded-lg transition-colors"
                    onClick={handleMenuItemClick}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <div className="border-t border-gray-200/50 my-2"></div>
                <motion.div
                  className="flex flex-col space-y-2"
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={5}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-gray-700 hover:text-[#14756F] hover:bg-white/30 rounded-lg"
                    onClick={handleMenuItemClick}
                  >
                    Login
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#14756F] hover:bg-[#0f5c57] text-white rounded-lg"
                    onClick={handleMenuItemClick}
                  >
                    Request Demo
                  </Button>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}