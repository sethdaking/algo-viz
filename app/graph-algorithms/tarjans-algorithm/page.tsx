'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const initialGraph = [
  { id: 0, edges: [{ to: 1 }, { to: 2 }] },
  { id: 1, edges: [{ to: 2 }] },
  { id: 2, edges: [{ to: 0 }, { to: 3 }] },
  { id: 3, edges: [] },
];

const nodeRadius = 20; // Radius of the nodes

const nodePositions = [
  { x: 50, y: 100 },   // Node 0 position
  { x: 150, y: 50 },   // Node 1 position
  { x: 250, y: 150 },  // Node 2 position
  { x: 350, y: 100 },  // Node 3 position
];

export default function TarjanComponent() {
  const [graph] = useState(initialGraph);
  const [sccs, setSccs] = useState<number[][]>([]); // Store strongly connected components
  const [, setIndex] = useState<number>(0); // Current index for nodes
  const [stack, setStack] = useState<number[]>([]); // Stack for Tarjan&apos;s algorithm
  const [lowLink, setLowLink] = useState<number[]>([]); // Low link values
  const [onStack, setOnStack] = useState<boolean[]>([]); // Track nodes on stack
  const [visited, setVisited] = useState<boolean[]>([]); // Track visited nodes
  const [animationSpeed] = useState(500); // Animation speed in milliseconds

  useEffect(() => {
    const nodeCount = graph.length;
    if (nodeCount > 0) {
      setLowLink(new Array(nodeCount).fill(-1)); // Initialize low link values
      setVisited(new Array(nodeCount).fill(false)); // Initialize visited nodes
      setOnStack(new Array(nodeCount).fill(false)); // Initialize stack tracking
    }
  }, [graph]);

  const handleRunTarjan = async () => {
    const nodeCount = graph.length;
    const newLowLink = [...lowLink];
    const newOnStack = [...onStack];
    const newVisited = [...visited];
    const newSccs: number[][] = [];
    const newIndex = 0; // Reset index for each run

    // Update state to reflect the reset
    setIndex(0);
    setStack([]);
    setSccs([]);

    for (let i = 0; i < nodeCount; i++) {
      if (!newVisited[i]) {
        await strongConnect(i, newLowLink, newOnStack, newVisited, newSccs, newIndex);
      }
    }

    setSccs(newSccs);
  };

  const strongConnect = async (v: number, lowLink: number[], onStack: boolean[], visited: boolean[], sccs: number[][], currentIndex: number) => {
    lowLink[v] = currentIndex; // Set the low link value
    visited[v] = true; // Mark as visited
    setIndex((prev) => prev + 1); // Increment the index
    setStack((prev) => [...prev, v]); // Push v on stack
    onStack[v] = true; // Mark v as on stack

    await highlightNode(v); // Highlight the current node

    for (const edge of graph[v].edges) {
      const neighbor = edge.to;
      if (!visited[neighbor]) {
        await strongConnect(neighbor, lowLink, onStack, visited, sccs, currentIndex);
        lowLink[v] = Math.min(lowLink[v], lowLink[neighbor]); // Update low link value
      } else if (onStack[neighbor]) {
        lowLink[v] = Math.min(lowLink[v], lowLink[neighbor]); // Update low link value if on stack
      }
    }

    // If v is a root node, pop the stack and generate an SCC
    if (lowLink[v] === lowLink[v]) {
      const currentSCC = [];
      let w;
      do {
        if (stack.length === 0) break; // Check for empty stack to avoid RangeError
        w = stack.pop()!; // Safely pop from stack
        onStack[w] = false; // Mark w as not on stack
        currentSCC.push(w); // Add to the current SCC
      } while (w !== v);
      sccs.push(currentSCC); // Add the SCC to the result
    }
  };

  const highlightNode = async (node: number) => {
    console.log(`Visiting node ${node}`);
    await new Promise((resolve) => setTimeout(resolve, animationSpeed));
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl text-accent">Tarjan&apos;s Algorithm</h2>
      <div className="mt-4">
        <Button onClick={handleRunTarjan} className="px-4 py-2 rounded-full">
          Run Tarjan&apos;s Algorithm
        </Button>
      </div>

      {/* Visualization of the Graph */}
      <div className="mt-4 flex justify-center">
        <svg width={400} height={200} className="border">
          {graph.map((node, index) => {
            const { x, y } = nodePositions[index];

            return (
              <g key={node.id}>
                <circle
                  cx={x}
                  cy={y}
                  r={nodeRadius}
                  fill={visited[index] ? 'green' : 'lightgray'}
                  stroke="black"
                  strokeWidth="2"
                />
                <text x={x} y={y + 5} textAnchor="middle" fill="black">
                  {node.id}
                </text>

                {node.edges.map((edge) => {
                  const targetPos = nodePositions[edge.to];

                  return (
                    <g key={edge.to}>
                      <line
                        x1={x}
                        y1={y}
                        x2={targetPos.x}
                        y2={targetPos.y}
                        stroke="black"
                        strokeWidth="1"
                      />
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4">
        <h3 className="text-2xl">Strongly Connected Components:</h3>
        <ul className="list-disc list-inside">
          {sccs.map((scc, index) => (
            <li key={index}>SCC {index}: {scc.join(', ')}</li>
          ))}
        </ul>
      </div>

      {/* Technical overview of Tarjan&apos;s Algorithm */}
      <div className="mt-8 p-4 rounded shadow-lg">
        <h3 className="text-2xl font-bold">Tarjan&apos;s Algorithm - Technical Overview</h3>
        <p className="mt-2"><strong>1. Algorithm Description:</strong> Tarjan&apos;s Algorithm finds all strongly connected components (SCCs) of a directed graph.</p>

        <p className="mt-2"><strong>2. Steps of Tarjan&apos;s Algorithm:</strong></p>
        <ul className="list-disc list-inside">
          <li>Initialize an index and a low-link value for each node.</li>
          <li>Use a stack to track the nodes and mark nodes as visited.</li>
          <li>For each unvisited node, recursively visit its neighbors, updating low-link values.</li>
          <li>If the node is a root node (its low-link value equals its index), pop nodes off the stack to form an SCC.</li>
        </ul>

        <p className="mt-2"><strong>3. Time Complexity:</strong> O(V + E) where V is the number of vertices and E is the number of edges.</p>
        <p className="mt-2"><strong>4. Space Complexity:</strong> O(V) due to the storage of indices, low-link values, and the stack.</p>
        <p className="mt-2"><strong>5. Usage:</strong> Tarjan&apos;s Algorithm is used in network analysis, compilers, and various applications in graph theory.</p>
      </div>
    </div>
  );
}
