'use client';

import React from 'react';
import { FaShieldAlt, FaFileAlt, FaTh } from 'react-icons/fa';
import { motion, useInView, useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';

const CentralPlatform: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Animation variants for heading
  const headingVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        type: 'spring', 
        bounce: 0.4 
      },
    },
  };

  // Animation variants for subheading
  const subheadingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1],
        delay: 0.3 
      },
    },
  };

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1],
        delay: i * 0.2 
      },
    }),
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    }
  };

  // Animation variants for icons
  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1],
        type: 'spring',
        stiffness: 150
      },
    },
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 10 
      }
    }
  };

  // Floating particles animation
  const Particle = ({ style }: { style: React.CSSProperties }) => (
    <motion.div
      className="absolute rounded-full bg-[#34b3a0] opacity-20"
      style={style}
      animate={{
        y: [0, -20, 0],
        x: [0, 15, 0],
        opacity: [0.2, 0.4, 0.2]
      }}
      transition={{
        duration: Math.random() * 10 + 10,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-[#1F2937] to-[#0a3a36] text-white py-24 overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: yBg }}
      >
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <Particle
            key={i}
            style={{
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Gradient circles */}
        <motion.div
          className="absolute top-0 left-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[#14756F] opacity-10 rounded-full -translate-x-1/4 -translate-y-1/4"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-0 right-0 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[#34b3a0] opacity-10 rounded-full translate-x-1/4 translate-y-1/4"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        {/* Heading and Subheading */}
        <motion.div 
          className="text-center mb-16 px-4"
          style={{ y: yText }}
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={headingVariants}
          >
            One Central Platform
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 leading-relaxed"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={subheadingVariants}
          >
            Gain complete visibility into your compliance data, how it's processed, and how it supports credit generation—all while consolidating reporting for multiple compliance programs on one seamless platform.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {[
            {
              icon: FaTh,
              title: 'Real-Time Insights',
              description: 'Gain real-time insights to stay informed and make proactive decisions with our dynamic dashboard and analytics tools.',
              color: 'from-[#34b3a0] to-[#14756F]'
            },
            {
              icon: FaFileAlt,
              title: 'Risk Mitigation',
              description: 'Streamline document processing with automated workflows that reduce risk and ensure continuous compliance.',
              color: 'from-[#14756F] to-[#0f5c57]'
            },
            {
              icon: FaShieldAlt,
              title: 'Audit Preparation',
              description: 'Simplify audits with organized, verified supply chain data and automated report generation.',
              color: 'from-[#0f5c57] to-[#0a3a36]'
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              custom={index}
              whileHover="hover"
            >
              <div className={`bg-gradient-to-br ${card.color} rounded-xl p-8 h-full flex flex-col items-center text-center border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg`}>
                <motion.div
                  className="flex justify-center mb-6 p-4 rounded-full bg-white/10 backdrop-blur-sm"
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <card.icon className="text-4xl text-white" />
                </motion.div>
                <h2 className="text-xl font-semibold mb-4">{card.title}</h2>
                <p className="text-sm opacity-90 leading-relaxed">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CentralPlatform;