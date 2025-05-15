"use client"
import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { ArrowRight } from 'lucide-react'

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
    delay: 0.2
  },
  {
    title: "Smart Reporting",
    description: "Generate comprehensive reports with a single click, saving time and reducing errors.",
    image: "/3.svg",
    delay: 0.3
  }
]

export function CaseStudies() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Streamline Your Compliance Process
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureItems.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Card className="p-8 h-full flex flex-col group hover:shadow-lg transition-shadow duration-300">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="overflow-hidden rounded-lg mb-6 flex justify-center items-center bg-gray-100 h-48"
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="max-h-full max-w-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
                
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{feature.description}</p>
                
                <motion.button
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-teal-600 font-medium self-start"
                >
                  Read more
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
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
  )
}