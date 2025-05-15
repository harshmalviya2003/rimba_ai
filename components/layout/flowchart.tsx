// Flowchart.tsx
"use client"
import React, { useEffect, useRef } from 'react';
import './flowcart.css';

const Flowchart = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (svgRef.current) {
      observer.observe(svgRef.current);
    }

    return () => {
      if (svgRef.current) {
        observer.unobserve(svgRef.current);
      }
    };
  }, []);

  return (
    <div className="flowchart-container">
      <div className="flowchart-header">
        <h2>RIMBA Data Flow Process</h2>
        <p>Visualizing how RIMBA integrates and processes compliance data</p>
      </div>
      
      <div className="window-container">
        <div className="window-content">
          <svg
            ref={svgRef}
            viewBox="0 0 800 450"
            xmlns="http://www.w3.org/2000/svg"
            className="flowchart-svg"
          >
            {/* Define styles */}
            <style>
              {`
                .node { fill: #2E2E2E; stroke: #000; stroke-width: 1; rx: 8; ry: 8; 
                       filter: url(#drop-shadow); transition: all 0.3s ease; }
                .node:hover { fill: #3A3A3A; stroke-width: 1.5; }
                .rimba-node { fill: #1A7A6D; stroke: #000; stroke-width: 1; rx: 8; ry: 8; 
                              filter: url(#drop-shadow); }
                .rimba-node:hover { fill: #1E8C7D; stroke-width: 1.5; }
                .output-node { fill: #E6F0FA; stroke: #000; stroke-width: 1; rx: 8; ry: 8; 
                              filter: url(#drop-shadow); }
                .output-node:hover { fill: #F0F7FF; stroke-width: 1.5; }
                .right-node { fill: #1A7A6D; stroke: #000; stroke-width: 1; rx: 8; ry: 8; 
                             filter: url(#drop-shadow); }
                .right-node:hover { fill: #1E8C7D; stroke-width: 1.5; }
                .bottom-node { fill: #E6F0FA; stroke: #000; stroke-width: 1; rx: 8; ry: 8; 
                              filter: url(#drop-shadow); }
                .bottom-node:hover { fill: #F0F7FF; stroke-width: 1.5; }
                .text { fill: #fff; font-size: 11px; font-family: 'Segoe UI', sans-serif; 
                        text-anchor: middle; dominant-baseline: middle; font-weight: 500; }
                .output-text { fill: #000; font-size: 11px; font-family: 'Segoe UI', sans-serif; 
                               text-anchor: middle; dominant-baseline: middle; font-weight: 500; }
                .arrow { stroke: #555; stroke-width: 1.5; fill: none; marker-end: url(#arrowhead);
                         stroke-dasharray: 1000; stroke-dashoffset: 1000; }
                .animate .arrow { animation: draw 1.5s forwards; }
                .node-group { opacity: 0; transform: translateY(20px); transition: all 0.5s ease; }
                .animate .node-group { opacity: 1; transform: translateY(0); }
                @keyframes draw { to { stroke-dashoffset: 0; } }
              `}
            </style>

            {/* Filters */}
            <defs>
              <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                <feOffset dx="1" dy="1" result="offsetblur" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.2" />
                </feComponentTransfer>
                <feMerge> 
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#555" />
              </marker>
            </defs>

            {/* Left Nodes */}
            <g className="node-group" style={{ transitionDelay: '0.1s' }}>
              <rect x="20" y="30" width="120" height="40" className="node" />
              <text x="80" y="50" className="text">Compliance Requirements</text>

              <rect x="20" y="90" width="120" height="40" className="node" />
              <text x="80" y="110" className="text">External Data</text>

              <rect x="20" y="150" width="120" height="40" className="node" />
              <text x="80" y="170" className="text">Internal Data</text>
            </g>

            {/* Center Node (RIMBA) */}
            <g className="node-group" style={{ transitionDelay: '0.2s' }}>
              <rect x="180" y="90" width="100" height="40" className="rimba-node" />
              <text x="230" y="110" className="text">RIMBA</text>
            </g>

            {/* Output Nodes from RIMBA */}
            <g className="node-group" style={{ transitionDelay: '0.3s' }}>
              <rect x="320" y="30" width="120" height="40" className="output-node" />
              <text x="380" y="50" className="output-text">Mass Balance</text>

              <rect x="320" y="90" width="120" height="40" className="output-node" />
              <text x="380" y="110" className="output-text">Carbon Intensity</text>

              <rect x="320" y="150" width="120" height="40" className="output-node" />
              <text x="380" y="170" className="output-text">Fuel Transactions</text>

              <rect x="320" y="210" width="120" height="40" className="output-node" />
              <text x="380" y="230" className="output-text">Audit Preparation</text>
            </g>

            {/* Right Nodes */}
            <g className="node-group" style={{ transitionDelay: '0.4s' }}>
              <rect x="480" y="90" width="120" height="40" className="right-node" />
              <text x="540" y="110" className="text">Audit with Ease</text>

              <rect x="480" y="150" width="120" height="40" className="right-node" />
              <text x="540" y="170" className="text">Reporting Simplified</text>
            </g>

            {/* Bottom Row Nodes */}
            <g className="node-group" style={{ transitionDelay: '0.5s' }}>
              <rect x="20" y="310" width="120" height="40" className="bottom-node" />
              <text x="80" y="330" className="output-text">Data Reconciliation</text>

              <rect x="160" y="310" width="120" height="40" className="bottom-node" />
              <text x="220" y="330" className="output-text">Automate Workflows</text>

              <rect x="300" y="310" width="120" height="40" className="bottom-node" />
              <text x="360" y="330" className="output-text">Generate Reports</text>

              <rect x="440" y="310" width="120" height="40" className="bottom-node" />
              <text x="500" y="330" className="output-text">Monitor Compliance</text>

              <rect x="580" y="310" width="120" height="40" className="bottom-node" />
              <text x="640" y="330" className="output-text">Simplify Audit</text>
            </g>

            {/* Arrows */}
            <g className="arrow-group">
              {/* Left to RIMBA */}
              <path d="M140 50 H180" className="arrow" style={{ animationDelay: '0.6s' }} />
              <path d="M140 110 H180" className="arrow" style={{ animationDelay: '0.7s' }} />
              <path d="M140 170 H180" className="arrow" style={{ animationDelay: '0.8s' }} />

              {/* RIMBA to Outputs */}
              <path d="M280 110 H320" className="arrow" style={{ animationDelay: '0.9s' }} />
              <path d="M280 110 V50 H320" className="arrow" style={{ animationDelay: '1.0s' }} />
              <path d="M280 110 V170 H320" className="arrow" style={{ animationDelay: '1.1s' }} />
              <path d="M280 110 V230 H320" className="arrow" style={{ animationDelay: '1.2s' }} />

              {/* Outputs to Right Nodes */}
              <path d="M440 110 H480" className="arrow" style={{ animationDelay: '1.3s' }} />
              <path d="M440 170 H480" className="arrow" style={{ animationDelay: '1.4s' }} />

              {/* Bottom Row Connections */}
              <path d="M140 330 H160" className="arrow" style={{ animationDelay: '1.5s' }} />
              <path d="M280 330 H300" className="arrow" style={{ animationDelay: '1.6s' }} />
              <path d="M420 330 H440" className="arrow" style={{ animationDelay: '1.7s' }} />
              <path d="M560 330 H580" className="arrow" style={{ animationDelay: '1.8s' }} />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Flowchart;