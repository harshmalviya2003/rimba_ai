'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  // Animation variants for heading
  const headingVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', type: 'spring', bounce: 0.3 },
    },
  };

  // Animation variants for accordion items
  const accordionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: 'easeOut' },
    }),
  };

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-[#FFFFFF] relative overflow-hidden">
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,_rgba(20,117,111,0.1)_0%,_transparent_70%)] animate-pulse-slow"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-[#1F2937] font-['Orbitron'] mb-16"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={headingVariants}
        >
          Frequently Asked Questions
        </motion.h2>
        <Accordion type="single" collapsible className="space-y-4">
          {[
            {
              value: 'item-1',
              question: 'What is Rimba?',
              answer: 'Rimba is an AI-powered ERP platform designed specifically for renewable fuel compliance, helping companies manage regulatory requirements efficiently.',
            },
            {
              value: 'item-2',
              question: 'Who can benefit from using Rimba?',
              answer: 'Renewable fuel producers, traders, and compliance managers who need to manage complex regulatory requirements and reporting obligations.',
            },
            {
              value: 'item-3',
              question: 'What types of compliance does Rimba handle?',
              answer: 'Rimba handles LCFS, RFS, ISCC, CORSIA, and other regulatory frameworks in the renewable fuels industry.',
            },
          ].map((item, index) => (
            <motion.div
              key={item.value}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={accordionVariants}
              custom={index}
            >
              <AccordionItem
                value={item.value}
                className="bg-[#FFFFFF]/80 backdrop-blur-md rounded-xl border border-[#4B5563]/30 hover:border-[#14756F]/50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <AccordionTrigger className="text-[#1F2937] text-lg font-semibold font-['Inter'] px-6 py-4 hover:text-[#14756F] group">
                  <span className="flex items-center">
                    <motion.span
                      className="mr-3 text-[#14756F]"
                      animate={{ rotate: isInView ? 0 : -90 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </motion.span>
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-[#1F2937] text-base font-['Inter'] px-6 py-4 bg-[#FFFFFF]/50 rounded-b-xl">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}