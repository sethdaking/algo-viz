'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

// Define the types for edges and graph nodes
interface Edge {
  to: number;
}

interface Node {
  id: number;
  edges: Edge[];
}

const initialGraph: Node[] = [
  { id: 0, edges: [{ to: 1 }, { to: 2 }] },
  { id: 1, edges: [{ to: 2 }] },
  { id: 2, edges: [{ to: 0 }, { to: 3 }] },
  { id: 3, edges: [] },
];

const nodePositions = [
  { x: 50, y: 100 },   // Node 0 position
  { x: 150, y: 50 },   // Node 1 position
  { x: 250, y: 150 },  // Node 2 position
  { x: 350, y: 100 },  // Node 3 position
];

export default function KosarajuComponent() {
  const [graph] = useState<Node[]>(initialGraph);
  const [sccs, setSccs] = useState<number[][]>([]); // Store strongly connected components
  const [visited, setVisited] = useState<boolean[]>([]); // Track visited nodes
  const [animationSpeed] = useState(500); // Animation speed in milliseconds

  useEffect(() => {
    const nodeCount = graph.length;
    if (nodeCount > 0) {
      setVisited(new Array(nodeCount).fill(false)); // Initialize visited nodes
    }
  }, [graph]);

  const handleRunKosaraju = async () => {
    const transposedGraph = transposeGraph(graph);
    const finishingOrder = await dfsStack(graph);
    const newSccs = await dfsOnTransposedGraph(transposedGraph, finishingOrder);

    setSccs(newSccs);
  };

  const dfsStack = async (graph: Node[]) => {
    const stack: number[] = [];
    const visited = new Array(graph.length).fill(false);

    for (let i = 0; i < graph.length; i++) {
      if (!visited[i]) {
        await dfsVisit(graph, i, visited, stack);
      }
    }
    return stack; // Return the finishing order
  };

  const dfsVisit = async (graph: Node[], node: number, visited: boolean[], stack: number[]) => {
    visited[node] = true;
    await highlightNode(node); // Highlight the current node

    for (const edge of graph[node].edges) {
      if (!visited[edge.to]) {
        await dfsVisit(graph, edge.to, visited, stack);
      }
    }
    stack.push(node); // Push the finished node onto the stack
  };

  const transposeGraph = (graph: Node[]) => {
    const transposed: Node[] = graph.map(() => ({ id: 0, edges: [] }));
    graph.forEach((node) => {
      node.edges.forEach((edge) => {
        transposed[edge.to].edges.push({ to: node.id });
      });
    });
    return transposed;
  };

  const dfsOnTransposedGraph = async (graph: Node[], finishingOrder: number[]) => {
    const visited = new Array(graph.length).fill(false);
    const sccs: number[][] = [];

    for (let i = finishingOrder.length - 1; i >= 0; i--) {
      const node = finishingOrder[i];
      if (!visited[node]) {
        const currentSCC: number[] = [];
        await dfsOnTransposedVisit(graph, node, visited, currentSCC);
        sccs.push(currentSCC); // Store the current SCC
      }
    }
    return sccs;
  };

  const dfsOnTransposedVisit = async (graph: Node[], node: number, visited: boolean[], currentSCC: number[]) => {
    visited[node] = true;
    currentSCC.push(node); // Add the node to the current SCC
    await highlightNode(node); // Highlight the current node

    for (const edge of graph[node].edges) {
      if (!visited[edge.to]) {
        await dfsOnTransposedVisit(graph, edge.to, visited, currentSCC);
      }
    }
  };

  const highlightNode = async (node: number) => {
    console.log(`Visiting node ${node}`);
    await new Promise((resolve) => setTimeout(resolve, animationSpeed));
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl text-accent">Kosaraju&apos;s Algorithm</h2>
      <div className="mt-4">
        <Button onClick={handleRunKosaraju} className="px-4 py-2 rounded-full">
          Run Kosaraju&apos;s Algorithm
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
                  r={20}
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

      {/* Technical overview of Kosaraju&apos;s Algorithm */}
      <div className="mt-8 p-4 rounded shadow-lg">
        <h3 className="text-2xl font-bold">Kosaraju&apos;s Algorithm - Technical Overview</h3>
        <p className="mt-2"><strong>1. Algorithm Description:</strong> Kosaraju&apos;s Algorithm finds all strongly connected components (SCCs) of a directed graph.</p>

        <p className="mt-2"><strong>2. Steps of Kosaraju&apos;s Algorithm:</strong></p>
        <ul className="list-disc list-inside">
          <li>Perform a DFS on the original graph to get the finishing times.</li>
          <li>Transpose (reverse) the graph.</li>
          <li>Perform a DFS on the transposed graph in the order of finishing times to identify SCCs.</li>
        </ul>

        <p className="mt-2"><strong>3. Time Complexity:</strong> O(V + E) where V is the number of vertices and E is the number of edges.</p>
        <p className="mt-2"><strong>4. Space Complexity:</strong> O(V) due to the storage of the stack and the visited array.</p>
        <p className="mt-2"><strong>5. Usage:</strong> Kosaraju&apos;s Algorithm is used in network analysis, compilers, and various applications in graph theory.</p>
      </div>
    </div>
  );
}
