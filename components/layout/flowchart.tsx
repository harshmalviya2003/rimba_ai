'use client';
import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Flowchart = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  // Node data
  const nodes = {
    left: [
      { id: 1, x: 20, y: 30, width: 120, height: 40, text: "Compliance Requirements", color: "node" },
      { id: 2, x: 20, y: 90, width: 120, height: 40, text: "External Data", color: "node" },
      { id: 3, x: 20, y: 150, width: 120, height: 40, text: "Internal Data", color: "node" }
    ],
    center: [
      { id: 4, x: 180, y: 90, width: 100, height: 40, text: "RIMBA", color: "rimba-node" }
    ],
    right: [
      { id: 5, x: 320, y: 30, width: 120, height: 40, text: "Mass Balance", color: "output-node" },
      { id: 6, x: 320, y: 90, width: 120, height: 40, text: "Carbon Intensity", color: "output-node" },
      { id: 7, x: 320, y: 150, width: 120, height: 40, text: "Fuel Transactions", color: "output-node" },
      { id: 8, x: 320, y: 210, width: 120, height: 40, text: "Audit Preparation", color: "output-node" },
      { id: 9, x: 480, y: 90, width: 120, height: 40, text: "Audit with Ease", color: "right-node" },
      { id: 10, x: 480, y: 150, width: 120, height: 40, text: "Reporting Simplified", color: "right-node" }
    ],
    bottom: [
      { id: 11, x: 20, y: 310, width: 120, height: 40, text: "Data Reconciliation", color: "bottom-node" },
      { id: 12, x: 160, y: 310, width: 120, height: 40, text: "Automate Workflows", color: "bottom-node" },
      { id: 13, x: 300, y: 310, width: 120, height: 40, text: "Generate Reports", color: "bottom-node" },
      { id: 14, x: 440, y: 310, width: 120, height: 40, text: "Monitor Compliance", color: "bottom-node" },
      { id: 15, x: 580, y: 310, width: 120, height: 40, text: "Simplify Audit", color: "bottom-node" }
    ]
  };

  // Connection paths
  const connections = [
    { id: 1, d: "M140 50 H180", delay: 0.2 },
    { id: 2, d: "M140 110 H180", delay: 0.3 },
    { id: 3, d: "M140 170 H180", delay: 0.4 },
    { id: 4, d: "M280 110 H320", delay: 0.5 },
    { id: 5, d: "M280 110 V50 H320", delay: 0.6 },
    { id: 6, d: "M280 110 V170 H320", delay: 0.7 },
    { id: 7, d: "M280 110 V230 H320", delay: 0.8 },
    { id: 8, d: "M440 110 H480", delay: 0.9 },
    { id: 9, d: "M440 170 H480", delay: 1.0 },
    { id: 10, d: "M140 330 H160", delay: 1.1 },
    { id: 11, d: "M280 330 H300", delay: 1.2 },
    { id: 12, d: "M420 330 H440", delay: 1.3 },
    { id: 13, d: "M560 330 H580", delay: 1.4 }
  ];

  return (
    <div ref={containerRef} className="flowchart-container bg-gradient-to-b from-[#F7FDFC] to-white py-20 px-4">
      <motion.div 
        className="flowchart-header text-center mb-16"
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-[#042F2E] mb-4">RIMBA Data Flow Process</h2>
        <p className="text-xl text-[#4B5563] max-w-3xl mx-auto">
          Visualizing how RIMBA integrates and processes compliance data with precision
        </p>
      </motion.div>
      
      <div className="window-container max-w-6xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-[#E5E7EB]/50">
        <div className="window-content p-8">
          <svg
            viewBox="0 0 800 450"
            xmlns="http://www.w3.org/2000/svg"
            className="flowchart-svg w-full h-auto"
          >
            {/* Define styles */}
            <style>
              {`
                .node { fill: #2E2E2E; stroke: #1A1A1A; stroke-width: 1; rx: 8; ry: 8; 
                       filter: url(#soft-shadow); transition: all 0.3s ease; }
                .node:hover { fill: #3A3A3A; }
                .rimba-node { fill: url(#rimba-gradient); stroke: #0a3a36; stroke-width: 1; rx: 8; ry: 8; 
                             filter: url(#soft-shadow); }
                .rimba-node:hover { fill: url(#rimba-gradient-hover); }
                .output-node { fill: #F0F7FF; stroke: #B3D1F0; stroke-width: 1; rx: 8; ry: 8; 
                              filter: url(#soft-shadow); }
                .output-node:hover { fill: #F8FBFF; }
                .right-node { fill: url(#right-gradient); stroke: #0a3a36; stroke-width: 1; rx: 8; ry: 8; 
                             filter: url(#soft-shadow); }
                .right-node:hover { fill: url(#right-gradient-hover); }
                .bottom-node { fill: #FFFFFF; stroke: #D1E0F0; stroke-width: 1; rx: 8; ry: 8; 
                              filter: url(#soft-shadow); }
                .bottom-node:hover { fill: #F8FBFF; }
                .text { fill: #fff; font-size: 12px; font-family: 'Inter', sans-serif; 
                        text-anchor: middle; dominant-baseline: middle; font-weight: 500; }
                .output-text { fill: #1F2937; font-size: 12px; font-family: 'Inter', sans-serif; 
                               text-anchor: middle; dominant-baseline: middle; font-weight: 500; }
                .arrow { stroke: #555; stroke-width: 2; fill: none; marker-end: url(#arrowhead);
                         opacity: 0.7; }
                .animate-arrow { animation: draw 1s forwards cubic-bezier(0.65, 0, 0.35, 1); }
                @keyframes draw { from { stroke-dashoffset: 1000; } to { stroke-dashoffset: 0; } }
              `}
            </style>

            {/* Gradients and filters */}
            <defs>
              {/* Gradients */}
              <linearGradient id="rimba-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1A7A6D" />
                <stop offset="100%" stopColor="#14756F" />
              </linearGradient>
              <linearGradient id="rimba-gradient-hover" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E8C7D" />
                <stop offset="100%" stopColor="#168A7A" />
              </linearGradient>
              <linearGradient id="right-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14756F" />
                <stop offset="100%" stopColor="#0f5c57" />
              </linearGradient>
              <linearGradient id="right-gradient-hover" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#168A7A" />
                <stop offset="100%" stopColor="#127066" />
              </linearGradient>
              
              {/* Shadow filter */}
              <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                <feOffset dx="1" dy="1" result="offsetblur" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.1" />
                </feComponentTransfer>
                <feMerge> 
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              
              {/* Arrowhead marker */}
              <marker
                id="arrowhead"
                markerWidth="6"
                markerHeight="4"
                refX="5"
                refY="2"
                orient="auto"
              >
                <path d="M0,0 L6,2 L0,4 Z" fill="#555" />
              </marker>
            </defs>

            {/* Render nodes with animations */}
            {Object.entries(nodes).map(([group, groupNodes]) => (
              <React.Fragment key={group}>
                {groupNodes.map((node, i) => (
                  <motion.g
                    key={node.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                  >
                    <rect
                      x={node.x}
                      y={node.y}
                      width={node.width}
                      height={node.height}
                      className={node.color}
                      rx="8"
                      ry="8"
                    />
                    <text
                      x={node.x + node.width / 2}
                      y={node.y + node.height / 2}
                      className={node.color.includes('output') || node.color.includes('bottom') ? "output-text" : "text"}
                    >
                      {node.text}
                    </text>
                  </motion.g>
                ))}
              </React.Fragment>
            ))}

            {/* Render connections with animations */}
            {connections.map((conn) => (
              <motion.path
                key={conn.id}
                d={conn.d}
                className="arrow"
                initial={{ strokeDashoffset: 1000 }}
                animate={isInView ? { strokeDashoffset: 0 } : {}}
                transition={{ delay: conn.delay, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                strokeDasharray="1000"
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Flowchart;