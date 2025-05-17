'use client';
import React from 'react';
import { FaShieldAlt, FaFileAlt, FaTh } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const CentralPlatform: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Simplified animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "backOut"
      }
    }
  };

  // Simplified floating particles (reduced count)
  const Particle = ({ style }: { style: React.CSSProperties }) => (
    <motion.div
      className="absolute rounded-full bg-[#34b3a0] opacity-20"
      style={style}
      animate={{
        y: [0, -10],
        opacity: [0.2, 0.3]
      }}
      transition={{
        duration: Math.random() * 5 + 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear"
      }}
    />
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-[#1F2937] to-[#0a3a36] text-white py-24 overflow-hidden"
    >
      {/* Simplified background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Reduced number of particles */}
        {[...Array(5)].map((_, i) => (
          <Particle
            key={i}
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Static gradient circles (no animation) */}
        <div className="absolute top-0 left-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[#14756F] opacity-10 rounded-full -translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[#34b3a0] opacity-10 rounded-full translate-x-1/4 translate-y-1/4" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <motion.div 
          className="text-center mb-16 px-4"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            variants={itemVariants}
          >
            One Central Platform
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 leading-relaxed"
            variants={itemVariants}
          >
            Gain complete visibility into your compliance data, how it's processed, and how it supports credit generation—all while consolidating reporting for multiple compliance programs on one seamless platform.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div 
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {[
            {
              icon: FaTh,
              title: 'Real-Time Insights',
              description: 'Gain real-time insights to stay informed and make proactive decisions with our dynamic dashboard and analytics tools.',
              color: 'bg-[#14756F]'
            },
            {
              icon: FaFileAlt,
              title: 'Risk Mitigation',
              description: 'Streamline document processing with automated workflows that reduce risk and ensure continuous compliance.',
              color: 'bg-[#0f5c57]'
            },
            {
              icon: FaShieldAlt,
              title: 'Audit Preparation',
              description: 'Simplify audits with organized, verified supply chain data and automated report generation.',
              color: 'bg-[#0a3a36]'
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="h-full"
              whileHover={{ y: -5 }}
            >
              <div className={`${card.color} rounded-xl p-8 h-full flex flex-col items-center text-center border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg`}>
                <motion.div
                  className="flex justify-center mb-6 p-4 rounded-full bg-white/10"
                  variants={iconVariants}
                >
                  <card.icon className="text-4xl text-white" />
                </motion.div>
                <h2 className="text-xl font-semibold mb-4">{card.title}</h2>
                <p className="text-sm opacity-90 leading-relaxed">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CentralPlatform;