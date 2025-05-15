  'use client';

  import React from 'react';
  import { FaShieldAlt, FaFileAlt, FaTh } from 'react-icons/fa';
  import { motion, useInView } from 'framer-motion';
  import { useRef } from 'react';

  const CentralPlatform: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

    // Animation variants for heading
    const headingVariants = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: 'easeOut', type: 'spring', bounce: 0.3 },
      },
    };

    // Animation variants for subheading
    const subheadingVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut', delay: 0.2 },
      },
    };

    // Animation variants for cards
    const cardVariants = {
      hidden: (direction: string) => ({
        opacity: 0,
        x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
        y: direction === 'bottom' ? 50 : 0,
      }),
      visible: (i: number) => ({
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.2 },
      }),
    };

    // Animation variants for icons
    const iconVariants = {
      hidden: { opacity: 0, scale: 0, rotate: -45 },
      visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { duration: 0.4, ease: 'easeOut' },
      },
    };

    return (
      <section
        ref={sectionRef}
        className="relative bg-gradient-to-b from-[#1F2937] to-[#14756F] text-[#FFFFFF] py-16 overflow-hidden"
      >
        {/* Background Circular Decorations */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#14756F] opacity-20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#14756F] opacity-20 rounded-full translate-x-1/2 -translate-y-1/2"></div>

        {/* Heading and Subheading */}
        <div className="text-center mb-12 relative z-10">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 font-['Orbitron']"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={headingVariants}
          >
            One Central Platform
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto font-['Inter']"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={subheadingVariants}
          >
            Gain complete visibility into your compliance data, how it’s processed, and how it supports credit generation—all while consolidating reporting for multiple compliance programs on one seamless platform.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 relative z-10">
          {[
            {
              icon: FaTh,
              title: 'Real-Time Insights',
              description: 'Gain real-time insights to stay informed and make proactive decisions.',
              direction: 'left',
            },
            {
              icon: FaFileAlt,
              title: 'Risk Mitigation',
              description: 'Streamline document processing to reduce risk and ensure compliance.',
              direction: 'bottom',
            },
            {
              icon: FaShieldAlt,
              title: 'Audit Preparation',
              description: 'Simplify audits and compliance with verified supply chain data.',
              direction: 'right',
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={cardVariants}
              custom={index}
            >
              <div className="bg-[#0f5c57] rounded-lg p-6 text-center group hover:shadow-xl transition-all duration-300">
                <motion.div
                  className="flex justify-center mb-4"
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  variants={iconVariants}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <card.icon className="text-4xl text-[#34b3a0] group-hover:text-[#FFFFFF] transition-colors duration-200" />
                </motion.div>
                <h2 className="text-xl font-semibold mb-2 font-['Inter']">{card.title}</h2>
                <p className="text-sm font-['Inter']">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    );
  };

  export default CentralPlatform;