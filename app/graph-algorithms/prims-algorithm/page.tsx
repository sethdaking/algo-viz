'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// Class to represent edges in the graph
class Edge {
  constructor(public src: number, public dest: number, public weight: number) {}
}

// Initial graph setup: 6 nodes, multiple edges
const initialGraph = [
  new Edge(0, 1, 2), new Edge(0, 3, 6),  // Node 0 connections
  new Edge(1, 0, 2), new Edge(1, 2, 3), new Edge(1, 4, 1), // Node 1 connections
  new Edge(2, 1, 3), new Edge(2, 4, 5), new Edge(2, 5, 7), // Node 2 connections
  new Edge(3, 0, 6), new Edge(3, 4, 4), // Node 3 connections
  new Edge(4, 1, 1), new Edge(4, 2, 5), new Edge(4, 3, 4), new Edge(4, 5, 7), // Node 4 connections
  new Edge(5, 2, 7), new Edge(5, 4, 7)  // Node 5 connections
];

const nodeRadius = 20; // Radius of the nodes

const nodePositions = [
  { x: 50, y: 100 },   // Node 0 position
  { x: 150, y: 50 },   // Node 1 position
  { x: 250, y: 150 },  // Node 2 position
  { x: 350, y: 100 },  // Node 3 position
  { x: 450, y: 50 },   // Node 4 position
  { x: 550, y: 150 }   // Node 5 position
];

export default function PrimsAlgorithmComponent() {
  const [mstEdges, setMstEdges] = useState<Edge[]>([]);
  const [animationSpeed] = useState(500); // Animation speed in milliseconds

  const handleRunPrimsAlgorithm = async () => {
    const selected = new Set<number>(); // Set to track selected nodes
    const minHeap: { node: number, weight: number, from: number }[] = [];

    // Start from node 0
    selected.add(0);
    const edgesToAdd = initialGraph.filter(edge => edge.src === 0 || edge.dest === 0);

    // Add edges to the minHeap
    edgesToAdd.forEach(edge => {
      const targetNode = edge.src === 0 ? edge.dest : edge.src;
      minHeap.push({ node: targetNode, weight: edge.weight, from: 0 });
    });

    // Sort initial edges in minHeap
    minHeap.sort((a, b) => a.weight - b.weight);

    // Continue until we have included all nodes
    while (selected.size < nodePositions.length && minHeap.length > 0) {
      const { node, weight, from } = minHeap.shift()!; // Get the edge with the minimum weight

      if (!selected.has(node)) {
        setMstEdges(prev => [...prev, new Edge(from, node, weight)]);
        selected.add(node);

        // Add new edges to the minHeap
        initialGraph.forEach(edge => {
          const targetNode = edge.src === node ? edge.dest : edge.src;

          if (!selected.has(targetNode)) {
            minHeap.push({ node: targetNode, weight: edge.weight, from: node });
          }
        });

        // Sort the minHeap again
        minHeap.sort((a, b) => a.weight - b.weight);
        await new Promise(resolve => setTimeout(resolve, animationSpeed)); // Animation delay
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl text-accent">Prim&apos;s Algorithm</h2>
      <div className="mt-4">
        <Button onClick={handleRunPrimsAlgorithm} className="px-4 py-2 rounded-full">
          Run Prim&apos;s Algorithm
        </Button>
      </div>

      {/* Visualization of the Graph */}
      <div className="mt-4 flex justify-center">
        <svg width={800} height={300} className="border">
          {nodePositions.map((pos, index) => {
            const { x, y } = pos;

            return (
              <g key={index}>
                <circle cx={x} cy={y} r={nodeRadius} fill="lightgray" stroke="white" />
                <text x={x} y={y + 5} textAnchor="middle" fill="black">
                  {index}
                </text>

                {/* Draw the edges */}
                {initialGraph
                  .filter(edge => edge.src === index)
                  .map((edge, idx) => {
                    const targetPos = nodePositions[edge.dest];

                    // Midpoint for the edge text (weight display)
                    const midX = (x + targetPos.x) / 2;
                    const midY = (y + targetPos.y) / 2;

                    return (
                      <g key={idx}>
                        <line
                          x1={x}
                          y1={y}
                          x2={targetPos.x}
                          y2={targetPos.y}
                          stroke="white"
                          strokeWidth="1"
                        />
                        <text x={midX} y={midY - 5} textAnchor="middle" fill="red">
                          {edge.weight}
                        </text>
                      </g>
                    );
                  })}

                {/* Show MST edges */}
                {mstEdges.map((edge, idx) => {
                  const startPos = nodePositions[edge.src];
                  const endPos = nodePositions[edge.dest];

                  return (
                    <line
                      key={idx}
                      x1={startPos.x}
                      y1={startPos.y}
                      x2={endPos.x}
                      y2={endPos.y}
                      stroke="blue"
                      strokeWidth="2"
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-8 p-4 rounded shadow-lg">
        <h3 className="text-2xl font-bold">Prim&apos;s Algorithm - Technical Overview</h3>
        <p className="mt-2"><strong>1. Algorithm Description:</strong> Prim&apos;s algorithm finds the Minimum Spanning Tree (MST) of a weighted undirected graph by expanding the tree one edge at a time.</p>

        <p className="mt-2"><strong>2. Steps of Prim&apos;s Algorithm:</strong></p>
        <ul className="list-disc list-inside">
          <li>Initialize the MST with a single vertex, and set all other vertices as unvisited.</li>
          <li>While there are unvisited vertices, select the smallest edge that connects a visited vertex to an unvisited vertex.</li>
          <li>Add the selected edge and vertex to the MST.</li>
          <li>Repeat until all vertices are included in the MST.</li>
        </ul>

        <p className="mt-2"><strong>3. Time Complexity:</strong> O(E log V) with a priority queue.</p>
        <p className="mt-2"><strong>4. Space Complexity:</strong> O(V) for the storage of the MST and edge weights.</p>
        <p className="mt-2"><strong>5. Usage:</strong> Prim&apos;s algorithm is often used in network design and to find optimal connections between nodes.</p>
      </div>
    </div>
  );
}
