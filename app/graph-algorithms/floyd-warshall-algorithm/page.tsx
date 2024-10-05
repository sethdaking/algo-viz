'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// Number of vertices in the graph
const V = 4;

// Initial adjacency matrix of the graph (Infinity represents no direct path)
const initialGraph = [
  [0, 5, Infinity, 10],
  [Infinity, 0, 3, Infinity],
  [Infinity, Infinity, 0, 1],
  [Infinity, Infinity, Infinity, 0]
];

// Positions for graph nodes on the screen
const nodePositions = [
  { x: 100, y: 100 },  // Node 0
  { x: 300, y: 100 },  // Node 1
  { x: 300, y: 300 },  // Node 2
  { x: 100, y: 300 },  // Node 3
];

const nodeRadius = 20; // Radius for each node

export default function FloydWarshallComponent() {
  const [distances, setDistances] = useState<number[][]>(initialGraph);
  const [animationSpeed] = useState(500); // Speed of the animation

  const handleRunFloydWarshall = async () => {
    const dist = initialGraph.map((row) => [...row]); // Copy of the initial graph

    // Main Floyd-Warshall algorithm
    for (let k = 0; k < V; k++) {
      for (let i = 0; i < V; i++) {
        for (let j = 0; j < V; j++) {
          if (dist[i][k] + dist[k][j] < dist[i][j]) {
            dist[i][j] = dist[i][k] + dist[k][j];
            await highlightEdge(i, j, dist[i][j]); // Highlight edge being updated
          }
        }
      }
    }

    setDistances(dist); // Update state with final distance matrix
  };

  const highlightEdge = async (from: number, to: number, weight: number) => {
    console.log(`Updating distance from ${from} to ${to} with new weight ${weight}`);
    await new Promise((resolve) => setTimeout(resolve, animationSpeed));
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl text-accent">Floyd-Warshall Algorithm</h2>
      <div className="mt-4">
        <Button onClick={handleRunFloydWarshall} className="px-4 py-2 rounded-full">
          Run Floyd-Warshall
        </Button>
      </div>

      {/* Visualization of the Graph */}
      <div className="mt-4 flex justify-center">
        <svg width={500} height={400} className="border">
          {/* Draw Nodes */}
          {nodePositions.map((pos, index) => (
            <g key={index}>
              <circle cx={pos.x} cy={pos.y} r={nodeRadius} fill="lightgray" stroke="black" />
              <text x={pos.x} y={pos.y + 5} textAnchor="middle" fill="black">
                {index}
              </text>
            </g>
          ))}

          {/* Draw Edges */}
          {initialGraph.map((row, i) =>
            row.map((weight, j) => {
              if (weight !== Infinity && i !== j) {
                const startX = nodePositions[i].x;
                const startY = nodePositions[i].y;
                const endX = nodePositions[j].x;
                const endY = nodePositions[j].y;

                const midX = (startX + endX) / 2;
                const midY = (startY + endY) / 2;

                return (
                  <g key={`${i}-${j}`}>
                    {/* Edge line */}
                    <line
                      x1={startX}
                      y1={startY}
                      x2={endX}
                      y2={endY}
                      stroke="black"
                      strokeWidth="2"
                    />
                    {/* Edge weight */}
                    <text x={midX} y={midY - 10} textAnchor="middle" fill="red">
                      {weight}
                    </text>
                  </g>
                );
              }
              return null;
            })
          )}
        </svg>
      </div>

      {/* Display Resultant Distance Matrix Outside the Graph */}
      <div className="mt-8 p-4 rounded shadow-lg">
        <h3 className="text-2xl font-bold">Resultant Distance Matrix</h3>
        <table className="table-auto border-collapse border border-gray-400 w-full mt-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">From / To</th>
              {Array.from({ length: V }, (_, i) => (
                <th key={i} className="border border-gray-300 px-4 py-2">{i}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {distances.map((row, i) => (
              <tr key={i}>
                <td className="border border-gray-300 px-4 py-2">{i}</td>
                {row.map((dist, j) => (
                  <td key={j} className="border border-gray-300 px-4 py-2">
                    {dist === Infinity ? '∞' : dist}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 p-4 rounded shadow-lg">
        <h3 className="text-2xl font-bold">Floyd-Warshall - Technical Overview</h3>
        <p className="mt-2"><strong>1. Algorithm Description:</strong> The Floyd-Warshall algorithm computes shortest paths between all pairs of vertices, handling both positive and negative edge weights.</p>

        <p className="mt-2"><strong>2. Steps of the Floyd-Warshall Algorithm:</strong></p>
        <ul className="list-disc list-inside">
          <li>Initialize a distance matrix using the input graph&apos;s adjacency matrix.</li>
          <li>Iterate through every pair of vertices `(i, j)` and update their shortest path considering all other vertices `k` as intermediaries.</li>
        </ul>

        <p className="mt-2"><strong>3. Time Complexity:</strong> O(V³) due to three nested loops over the vertices.</p>
        <p className="mt-2"><strong>4. Space Complexity:</strong> O(V²) as a 2D matrix is required to store distances between all pairs.</p>
        <p className="mt-2"><strong>5. Usage:</strong> Floyd-Warshall is used for finding shortest paths in dense graphs and can handle negative weights but not negative weight cycles.</p>
      </div>
    </div>
  );
}
