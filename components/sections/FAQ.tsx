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
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [activeItem, setActiveItem] = useState<string | null>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2
      },
    },
  };

  const accordionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }),
    hover: { 
      scale: 1.02,
      boxShadow: "0 10px 25px -5px rgba(20, 117, 111, 0.2)"
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const chevronVariants = {
    open: { rotate: 45 },
    closed: { rotate: 0 }
  };

  const faqItems = [
    {
      value: 'item-1',
      question: 'What is Rimba and how does it work?',
      answer: 'Rimba is an AI-powered ERP platform specifically designed for the renewable fuel industry. It combines regulatory expertise with advanced technology to automate compliance processes, track carbon intensity, and generate required reports for frameworks like LCFS, RFS, and ISCC. Our system integrates with your existing operations to provide real-time compliance monitoring and predictive analytics.'
    },
    {
      value: 'item-2',
      question: 'Who can benefit from using Rimba?',
      answer: 'Rimba is ideal for renewable fuel producers, traders, compliance managers, and sustainability teams. Specifically:\n\n- Ethanol, biodiesel, and renewable diesel producers\n- Renewable natural gas (RNG) operators\n- Fuel blenders and distributors\n- Compliance officers managing multiple regulatory programs\n- Sustainability teams tracking carbon credits'
    },
    {
      value: 'item-3',
      question: 'What regulatory programs does Rimba support?',
      answer: 'Rimba currently supports:\n\n- Low Carbon Fuel Standard (LCFS) - California and Oregon\n- Renewable Fuel Standard (RFS)\n- International Sustainability & Carbon Certification (ISCC)\n- CORSIA (aviation biofuels)\n- State-specific renewable fuel programs\n\nWe continuously add support for new programs as they emerge.'
    },
    {
      value: 'item-4',
      question: 'How does Rimba handle data security?',
      answer: 'Rimba employs enterprise-grade security measures:\n\n- AES-256 encryption for data at rest and in transit\n- SOC 2 Type II compliant infrastructure\n- Role-based access controls with multi-factor authentication\n- Regular third-party security audits\n- Compliance with GDPR and CCPA regulations\n\nYour data remains your property, and we never share it without explicit permission.'
    },
    {
      value: 'item-5',
      question: 'What makes Rimba different from spreadsheets or generic ERP systems?',
      answer: 'Unlike generic solutions, Rimba offers:\n\n1. Built specifically for renewable fuel compliance\n2. Real-time regulatory updates as policies change\n3. AI-powered error detection and suggestions\n4. Automated report generation for all major programs\n5. Integrated carbon intensity (CI) modeling\n6. Predictive analytics for credit pricing and market trends\n7. Seamless integration with existing business systems'
    },
    {
      value: 'item-6',
      question: 'How long does implementation typically take?',
      answer: 'Implementation timelines vary based on your needs:\n\n- Basic compliance tracking: 2-4 weeks\n- Full ERP integration: 6-8 weeks\n- Custom CI modeling add-ons: +2 weeks\n\nOur team works closely with you to ensure minimal disruption to your operations during onboarding.'
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="py-24 px-4 bg-gradient-to-b from-[#F9FAFB] to-[#FFFFFF] relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#14756F]/10 blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#14756F]/05 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
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
          
          <motion.div className="text-center mb-16">
            <motion.p 
              className="text-xl text-[#4B5563] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 20
              }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Everything you need to know about Rimba and renewable fuel compliance
            </motion.p>
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
                key={item.value}
                custom={index}
                variants={accordionVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover="hover"
              >
                <AccordionItem
                  value={item.value}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl border border-[#E5E7EB] hover:border-[#14756F]/50 transition-all duration-300 shadow-sm hover:shadow-lg overflow-hidden"
                >
                  <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-[#042F2E] px-6 py-5 hover:text-[#14756F] group">
                    <div className="flex items-start w-full">
                      <motion.div
                        className="mr-4 mt-1 text-[#14756F]"
                        variants={chevronVariants}
                        animate={activeItem === item.value ? "open" : "closed"}
                        transition={{ duration: 0.3 }}
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