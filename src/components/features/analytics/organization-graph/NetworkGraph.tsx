/**
 * Network Graph Component
 * Displays organization network visualization with interactive nodes
 */

import React from 'react';
import { GraphNode, GraphEdge } from '@/types/api/analytics';

interface NetworkGraphProps {
  nodes: GraphNode[];
  edges?: GraphEdge[];
}

export const NetworkGraph: React.FC<NetworkGraphProps> = ({ nodes, edges = [] }) => {
  if (!nodes || nodes.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
        <div className="relative w-full h-96 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">No network data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
      <div className="relative w-full h-96 bg-gradient-to-br from-gray-50 via-white to-blue-50 rounded-lg overflow-hidden">
        {/* SVG Container for network visualization */}
        <svg className="w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid meet">
          {/* Render edges (connections) first so they appear behind nodes */}
          {edges.map((edge, index) => {
            const sourceNode = nodes.find(n => n.id === edge.source);
            const targetNode = nodes.find(n => n.id === edge.target);
            
            if (!sourceNode || !targetNode || !sourceNode.x || !targetNode.x) return null;
            
            return (
              <line
                key={`edge-${index}`}
                x1={sourceNode.x}
                y1={sourceNode.y || 200}
                x2={targetNode.x}
                y2={targetNode.y || 200}
                stroke="#E5E7EB"
                strokeWidth="2"
                opacity="0.6"
              />
            );
          })}

          {/* Render nodes */}
          {nodes.map((node) => {
            const x = node.x || 600;
            const y = node.y || 200;
            
            return (
              <g key={node.id} className="cursor-pointer hover:opacity-90 transition-opacity">
                {/* Node circle with shadow */}
                <circle
                  cx={x}
                  cy={y}
                  r="32"
                  fill={node.color}
                  filter="drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))"
                  className="transition-all hover:r-35"
                />
                {/* White border */}
                <circle
                  cx={x}
                  cy={y}
                  r="30"
                  fill={node.color}
                  stroke="white"
                  strokeWidth="3"
                />
                {/* Node label (initials) */}
                <text
                  x={x}
                  y={y + 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize="16"
                  fontWeight="700"
                  className="pointer-events-none select-none"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  {node.initials}
                </text>
                
                {/* Tooltip on hover - Name below the node */}
                <g className="opacity-0 hover:opacity-100 transition-opacity">
                  <rect
                    x={x - 50}
                    y={y + 45}
                    width="100"
                    height="30"
                    fill="rgba(0, 0, 0, 0.8)"
                    rx="4"
                  />
                  <text
                    x={x}
                    y={y + 64}
                    textAnchor="middle"
                    fill="white"
                    fontSize="12"
                    fontWeight="500"
                    className="pointer-events-none"
                  >
                    {node.name}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
