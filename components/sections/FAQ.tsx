'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [activeItem, setActiveItem] = useState<string | null>(null);

  // Animation variants (unchanged)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      },
    },
  };

  const accordionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const chevronVariants = {
    open: { rotate: 45 },
    closed: { rotate: 0 }
  };

  // Updated faqItems with unique values
  const faqItems = [
    {
      value: 'item-1',
      question: 'What is Rimba and how does it work?',
      answer: 'Rimba is an AI-powered ERP platform specifically designed for the renewable fuel industry. It combines regulatory expertise with advanced technology to automate compliance processes, track carbon intensity, and generate required reports for frameworks like LCFS, RFS, and ISCC. Our system integrates with your existing operations to provide real-time compliance monitoring and predictive analytics.'
    },
    {
      value: 'item-2', // Unique value
      question: 'What is Rimba and how does it work?', // You can update the question if needed
      answer: 'Rimba is an AI-powered ERP platform specifically designed for the renewable fuel industry. It combines regulatory expertise with advanced technology to automate compliance processes, track carbon intensity, and generate required reports for frameworks like LCFS, RFS, and ISCC. Our system integrates with your existing operations to provide real-time compliance monitoring and predictive analytics.'
    },
    {
      value: 'item-3', // Unique value
      question: 'What is Rimba and how does it work?', // You can update the question if needed
      answer: 'Rimba is an AI-powered ERP platform specifically designed for the renewable fuel industry. It combines regulatory expertise with advanced technology to automate compliance processes, track carbon intensity, and generate required reports for frameworks like LCFS, RFS, and ISCC. Our system integrates with your existing operations to provide real-time compliance monitoring and predictive analytics.'
    },
    {
      value: 'item-4', // Unique value
      question: 'What is Rimba and how does it work?', // You can update the question if needed
      answer: 'Rimba is an AI-powered ERP platform specifically designed for the renewable fuel industry. It combines regulatory expertise with advanced technology to automate compliance processes, track carbon intensity, and generate required reports for frameworks like LCFS, RFS, and ISCC. Our system integrates with your existing operations to provide real-time compliance monitoring and predictive analytics.'
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="py-24 px-4 bg-gradient-to-b from-[#F9FAFB] to-[#FFFFFF] relative overflow-hidden"
    >
      {/* Background elements (unchanged) */}
     <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#14756F]/10 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#14756F]/05 blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-[#042F2E] mb-12"
            variants={headingVariants}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <p className="text-xl text-[#4B5563] max-w-2xl mx-auto">
              Everything you need to know about Rimba and renewable fuel compliance
            </p>
          </motion.div>

          <Accordion 
            type="single" 
            collapsible 
            className="space-y-4"
            value={activeItem || undefined}
            onValueChange={setActiveItem}
          >
            {faqItems.map((item, index) => (
              <motion.div
                key={item.value} // Use unique value as key
                custom={index}
                variants={accordionVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover={{ scale: 1.01 }}
              >
                <AccordionItem
                  value={item.value}
                  className="bg-white/90 rounded-2xl border border-[#E5E7EB] hover:border-[#14756F]/50 transition-all duration-200 shadow-sm hover:shadow-md overflow-hidden"
                >
                  <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-[#042F2E] px-6 py-5 hover:text-[#14756F] group">
                    <div className="flex items-start w-full">
                      <motion.div
                        className="mr-4 mt-1 text-[#14756F]"
                        variants={chevronVariants}
                        animate={activeItem === item.value ? "open" : "closed"}
                        transition={{ duration: 0.2 }}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </motion.div>
                      <span className="flex-1 text-left">{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  
                  <AnimatePresence>
                    {activeItem === item.value && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={contentVariants}
                      >
                        <AccordionContent className="px-6 pb-5 text-[#4B5563] text-base md:text-lg leading-relaxed whitespace-pre-line">
                          {item.answer}
                        </AccordionContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}