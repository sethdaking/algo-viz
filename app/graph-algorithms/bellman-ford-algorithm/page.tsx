'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// Class to represent edges in the graph
class Edge {
  constructor(public src: number, public dest: number, public weight: number) {}
}

// Initial graph setup: 7 nodes, multiple edges
const initialGraph = [
    new Edge(0, 1, 3), new Edge(0, 2, 1), // Node 0 -> Node 1 and Node 2
    new Edge(1, 3, 1),  new Edge(1, 4, 2),  // Node 1 -> Node 3, 2, 4 (fixed the edge weight from -2 to 3)
    new Edge(2, 1, 2), new Edge(2, 3, 5), new Edge(2, 5, 10), // Node 2 -> Node 1, 3, 5
    new Edge(3, 4, -1), // Node 3 -> Node 4
    new Edge(4, 5, 3), new Edge(4, 6, 4), // Node 4 -> Node 5, 6
  ];

const nodeRadius = 20; // Radius of the nodes

const nodePositions = [
  { x: 50, y: 100 },   // Node 0 position
  { x: 150, y: 50 },   // Node 1 position
  { x: 250, y: 150 },  // Node 2 position
  { x: 350, y: 100 },  // Node 3 position
  { x: 450, y: 50 },   // Node 4 position
  { x: 550, y: 150 },  // Node 5 position
  { x: 650, y: 100 },  // Node 6 position
];

export default function BellmanFordComponent() {
  const [distances, setDistances] = useState<number[]>(new Array(7).fill(Infinity));
  const [predecessors, setPredecessors] = useState<number[]>(new Array(7).fill(-1));
  const [animationSpeed] = useState(500); // Animation speed in milliseconds
  const [source] = useState(0); // Starting from Node 0

  const handleRunBellmanFord = async () => {
    const dist = new Array(7).fill(Number.MAX_SAFE_INTEGER);
    const pred = new Array(7).fill(-1);
    dist[source] = 0; // Distance to the source is 0

    // Relax all edges |V| - 1 times
    for (let i = 1; i <= 7 - 1; i++) {
      for (const edge of initialGraph) {
        const { src, dest, weight } = edge;
        if (dist[src] !== Number.MAX_SAFE_INTEGER && dist[src] + weight < dist[dest]) {
          dist[dest] = dist[src] + weight;
          pred[dest] = src;
          await highlightEdge(src, dest, weight); // Highlight edge being relaxed
        }
      }
    }

    // Check for negative-weight cycles
    for (const edge of initialGraph) {
      const { src, dest, weight } = edge;
      if (dist[src] !== Number.MAX_SAFE_INTEGER && dist[src] + weight < dist[dest]) {
        console.log("Graph contains negative weight cycle");
        return; // Early exit if a negative cycle is detected
      }
    }

    setDistances(dist);
    setPredecessors(pred);
  };

  const highlightEdge = async (from: number, to: number, weight: number) => {
    console.log(`Relaxing edge from ${from} to ${to} with weight ${weight}`);
    await new Promise((resolve) => setTimeout(resolve, animationSpeed));
  };

  // Function to determine the color of the distance text based on the value
  const getDistanceColor = (distance: number) => {
    if (distance === Infinity) return 'gray'; // Infinite distance
    if (distance === 0) return 'green'; // Source node distance
    if (distance <= 5) return 'blue'; // Short distances
    if (distance <= 10) return 'orange'; // Medium distances
    return 'red'; // Long distances
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl text-accent">Bellman-Ford Algorithm</h2>
      <div className="mt-4">
        <Button onClick={handleRunBellmanFord} className="px-4 py-2 rounded-full">
          Run Bellman-Ford
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

                {/* Show distance from the source to each node */}
                {distances[index] !== Infinity && (
                  <text
                    x={x}
                    y={y - 15}
                    textAnchor="middle"
                    fill={getDistanceColor(distances[index])} // Apply the dynamic color
                  >
                    {distances[index]}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-8 p-4 rounded shadow-lg">
        <h3 className="text-2xl font-bold">Bellman-Ford - Technical Overview</h3>
        <p className="mt-2"><strong>1. Algorithm Description:</strong> The Bellman-Ford algorithm calculates the shortest path from a single source vertex to all other vertices in a graph, handling negative weight edges.</p>

        <p className="mt-2"><strong>2. Steps of the Bellman-Ford Algorithm:</strong></p>
        <ul className="list-disc list-inside">
          <li>Initialize distances from the source to all vertices as infinite and to the source itself as 0.</li>
          <li>Relax all edges |V| - 1 times.</li>
          <li>If the distance to a vertex can be shortened by a path, update the distance.</li>
          <li>Check for negative-weight cycles by verifying if any edge can be relaxed further.</li>
        </ul>

        <p className="mt-2"><strong>3. Time Complexity:</strong> O(V * E) where V is the number of vertices and E is the number of edges.</p>
        <p className="mt-2"><strong>4. Space Complexity:</strong> O(V) due to the storage of distances and predecessors.</p>
        <p className="mt-2"><strong>5. Usage:</strong> Bellman-Ford is useful for graphs with negative weights and can detect negative weight cycles.</p>
      </div>
    </div>
  );
}
