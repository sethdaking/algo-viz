'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const initialGraph = [
  { id: 0, edges: [{ to: 1 }, { to: 2 }] },
  { id: 1, edges: [{ to: 2 }, { to: 3 }] },
  { id: 2, edges: [{ to: 3 }] },
  { id: 3, edges: [] },
];

const nodeRadius = 20; // Radius of the nodes

const nodePositions = [
  { x: 50, y: 100 },   // Node 0 position
  { x: 150, y: 50 },   // Node 1 position
  { x: 250, y: 150 },  // Node 2 position
  { x: 350, y: 100 },  // Node 3 position
];

export default function DFSComponent() {
  const [graph] = useState(initialGraph);
  const [visited, setVisited] = useState<boolean[]>(new Array(initialGraph.length).fill(false));
  const [animationSpeed] = useState(500); // Animation speed in milliseconds

  const handleRunDFS = async () => {
    const visitedNodes = new Array(graph.length).fill(false); // Track visited nodes
    setVisited(visitedNodes);
    await dfs(0, visitedNodes);
  };

  const dfs = async (node: number, visitedNodes: boolean[]) => {
    visitedNodes[node] = true;
    setVisited([...visitedNodes]);

    // Highlight the current node
    await highlightNode(node);

    for (const edge of graph[node].edges) {
      if (!visitedNodes[edge.to]) {
        await dfs(edge.to, visitedNodes);
      }
    }
  };

  const highlightNode = async (node: number) => {
    console.log(`Visiting node ${node}`);
    await new Promise((resolve) => setTimeout(resolve, animationSpeed));
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl text-accent">Depth-First Search (DFS)</h2>
      <div className="mt-4">
        <Button onClick={handleRunDFS} className="px-4 py-2 rounded-full">
          Run DFS
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

      <div className="mt-8 p-4 rounded shadow-lg">
        <h3 className="text-2xl font-bold">Depth-First Search - Technical Overview</h3>
        <p className="mt-2"><strong>1. Algorithm Description:</strong> DFS is a graph traversal algorithm that starts at a source node and explores as far as possible along each branch before backtracking.</p>

        <p className="mt-2"><strong>2. Steps of DFS:</strong></p>
        <ul className="list-disc list-inside">
          <li>Mark the current node as visited.</li>
          <li>Explore all unvisited neighbors of the current node.</li>
          <li>For each neighbor, recursively apply DFS until all nodes in the branch are visited.</li>
          <li>Backtrack to explore other branches.</li>
        </ul>

        <p className="mt-2"><strong>3. Time Complexity:</strong> O(V + E) where V is the number of vertices and E is the number of edges.</p>
        <p className="mt-2"><strong>4. Space Complexity:</strong> O(V) due to the storage of visited nodes.</p>
        <p className="mt-2"><strong>5. Usage:</strong> DFS is commonly used for tasks like detecting cycles, pathfinding in mazes, and analyzing connectivity in graphs.</p>
      </div>
    </div>
  );
}
