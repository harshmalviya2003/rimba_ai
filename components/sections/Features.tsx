'use client';

import { motion, useInView } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

const featureItems = [
  {
    title: "Real-Time Monitoring",
    description: "Track and analyze your compliance data in real-time with our advanced monitoring system.",
    delay: 0.1,
    image: "/1.png",
  },
  {
    title: "Automated Compliance",
    description: "Let our AI handle your compliance requirements while you focus on growing your business.",
    image: "/2.png",
    delay: 0.2,
  },
  {
    title: "Smart Reporting",
    description: "Generate comprehensive reports with a single click, saving time and reducing errors.",
    image: "/3.svg",
    delay: 0.3,
  },
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  // Animation variants for heading
  const headingVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', type: 'spring', bounce: 0.3 },
    },
  };

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.2, ease: 'easeOut' },
    }),
  };

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-[#FFFFFF] relative overflow-hidden">
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,_rgba(20,117,111,0.1)_0%,_transparent_70%)] animate-pulse-slow"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-[#1F2937] font-['Orbitron'] mb-16"
          initial="hidden_snaps"
          animate={isInView ? 'visible' : 'hidden'}
          variants={headingVariants}
        >
          Streamline Your Compliance Process
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureItems.map((feature, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={cardVariants}
              custom={index}
            >
              <Card className="p-8 h-full flex flex-col group bg-[#FFFFFF]/80 backdrop-blur-md border border-[#4B5563]/30 hover:border-[#14756F]/50 hover:shadow-xl transition-all duration-300 rounded-xl">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className="overflow-hidden rounded-lg mb-6 flex justify-center items-center bg-[#F5F5F5] h-48"
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="max-h-full max-w-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>
                
                <h3 className="text-2xl font-semibold mb-4 text-[#1F2937] font-['Inter']">{feature.title}</h3>
                <p className="text-[#4B5563] mb-6 flex-grow font-['Inter']">{feature.description}</p>
                
                <motion.button
                  whileHover={{ x: 8 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-[#14756F] font-medium self-start group/button"
                >
                  Read more
                  <motion.span
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="group-hover/button:text-[#0f5c57]"
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                </motion.button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}