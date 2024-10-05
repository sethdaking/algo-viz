'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const initialGraph = [
  { id: 0, edges: [{ to: 1 }, { to: 2 }] },
  { id: 1, edges: [{ to: 2 }, { to: 3 }] },
  { id: 2, edges: [{ to: 3 }, { to: 4 }] },
  { id: 3, edges: [{ to: 5 }] },
  { id: 4, edges: [{ to: 5 }] },
  { id: 5, edges: [{ to: 6 }] },
  { id: 6, edges: [] },
];

const nodeRadius = 20; // Radius of the nodes

// Adjusting positions to fit the new nodes in the graph
const nodePositions = [
  { x: 50, y: 100 },   // Node 0 position
  { x: 150, y: 50 },   // Node 1 position
  { x: 250, y: 150 },  // Node 2 position
  { x: 350, y: 50 },   // Node 3 position
  { x: 250, y: 250 },  // Node 4 position
  { x: 450, y: 100 },  // Node 5 position
  { x: 550, y: 200 },  // Node 6 position
];

export default function BFSComponent() {
  const [graph] = useState(initialGraph);
  const [visited, setVisited] = useState<boolean[]>(new Array(initialGraph.length).fill(false));
  const [animationSpeed] = useState(500); // Animation speed in milliseconds

  const handleRunBFS = async () => {
    const visitedNodes = new Array(graph.length).fill(false); // Track visited nodes
    setVisited(visitedNodes);
    await bfs(0, visitedNodes); // Start BFS at node 0
  };

  const bfs = async (startNode: number, visitedNodes: boolean[]) => {
    const queue: number[] = [startNode];
    visitedNodes[startNode] = true;
    setVisited([...visitedNodes]);

    while (queue.length > 0) {
      const currentNode = queue.shift()!;

      // Highlight the current node
      await highlightNode(currentNode);

      for (const edge of graph[currentNode].edges) {
        if (!visitedNodes[edge.to]) {
          visitedNodes[edge.to] = true;
          queue.push(edge.to);
        }
      }

      setVisited([...visitedNodes]);
    }
  };

  const highlightNode = async (node: number) => {
    console.log(`Visiting node ${node}`);
    await new Promise((resolve) => setTimeout(resolve, animationSpeed));
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl text-accent">Breadth-First Search (BFS)</h2>
      <div className="mt-4">
        <Button onClick={handleRunBFS} className="px-4 py-2 rounded-full">
          Run BFS
        </Button>
      </div>

      {/* Visualization of the Graph */}
      <div className="mt-4 flex justify-center">
        <svg width={600} height={300} className="border">
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
        <h3 className="text-2xl font-bold">Breadth-First Search - Technical Overview</h3>
        <p className="mt-2"><strong>1. Algorithm Description:</strong> BFS is a graph traversal algorithm that explores all nodes at the present depth level before moving on to nodes at the next depth level.</p>

        <p className="mt-2"><strong>2. Steps of BFS:</strong></p>
        <ul className="list-disc list-inside">
          <li>Start at the source node, mark it as visited, and enqueue it.</li>
          <li>Dequeue a node from the queue and explore all its unvisited neighbors.</li>
          <li>Mark each neighbor as visited and enqueue it.</li>
          <li>Repeat this process until the queue is empty.</li>
        </ul>

        <p className="mt-2"><strong>3. Time Complexity:</strong> O(V + E) where V is the number of vertices and E is the number of edges.</p>
        <p className="mt-2"><strong>4. Space Complexity:</strong> O(V) due to the storage of visited nodes and the queue.</p>
        <p className="mt-2"><strong>5. Usage:</strong> BFS is useful for finding the shortest path in unweighted graphs and is commonly used in level-order traversal of trees.</p>
      </div>
    </div>
  );
}
