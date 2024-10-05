'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// Class to represent edges in the graph
class Edge {
  constructor(public src: number, public dest: number, public weight: number) {}
}

// Initial graph setup: nodes and weighted edges
const initialGraph: Edge[] = [
  new Edge(0, 1, 4), new Edge(0, 2, 3),
  new Edge(1, 2, 1), new Edge(1, 3, 2),
  new Edge(2, 3, 4), new Edge(3, 4, 2),
  new Edge(4, 5, 6)
];

const nodePositions = [
  { x: 100, y: 50 },   // Node 0 position
  { x: 200, y: 150 },  // Node 1 position
  { x: 300, y: 50 },   // Node 2 position
  { x: 400, y: 150 },  // Node 3 position
  { x: 500, y: 50 },   // Node 4 position
  { x: 600, y: 150 }   // Node 5 position
];

const nodeRadius = 20; // Radius for each node

// Utility function for Union-Find operations
class UnionFind {
  parent: number[];
  rank: number[];

  constructor(size: number) {
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = Array(size).fill(0);
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x: number, y: number) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX] += 1;
      }
    }
  }
}

export default function KruskalComponent() {
  const [mst, setMST] = useState<Edge[]>([]); // Minimum Spanning Tree
  const [animationSpeed] = useState(500); // Speed of the animation

  const handleRunKruskal = async () => {
    // Sort edges by ascending weights
    const sortedEdges = [...initialGraph].sort((a, b) => a.weight - b.weight);
    const uf = new UnionFind(nodePositions.length);
    const result: Edge[] = []; // Store edges in the MST

    for (const edge of sortedEdges) {
      const { src, dest } = edge;

      // If src and dest are in different components, add the edge to the MST
      if (uf.find(src) !== uf.find(dest)) {
        uf.union(src, dest);
        result.push(edge);
        await highlightEdge(src, dest); // Visualize the edge being added
        if (result.length === nodePositions.length - 1) break; // Stop if MST is complete
      }
    }

    setMST(result);
  };

  const highlightEdge = async (from: number, to: number) => {
    console.log(`Adding edge from ${from} to ${to}`);
    await new Promise((resolve) => setTimeout(resolve, animationSpeed));
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl text-accent">Kruskal&apos;s Algorithm</h2>
      <div className="mt-4">
        <Button onClick={handleRunKruskal} className="px-4 py-2 rounded-full">
          Run Kruskal&apos;s Algorithm
        </Button>
      </div>

      {/* Visualization of the Graph */}
      <div className="mt-4 flex justify-center">
        <svg width={700} height={300} className="border">
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
          {initialGraph.map((edge, index) => {
            const { src, dest, weight } = edge;
            const startX = nodePositions[src].x;
            const startY = nodePositions[src].y;
            const endX = nodePositions[dest].x;
            const endY = nodePositions[dest].y;

            const midX = (startX + endX) / 2;
            const midY = (startY + endY) / 2;

            return (
              <g key={index}>
                {/* Edge line */}
                <line
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke={mst.includes(edge) ? 'green' : 'black'}
                  strokeWidth="2"
                />
                {/* Edge weight */}
                <text x={midX} y={midY - 10} textAnchor="middle" fill="red">
                  {weight}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Display MST Result */}
      <div className="mt-8 p-4 rounded shadow-lg">
        <h3 className="text-2xl font-bold">Minimum Spanning Tree (MST)</h3>
        {mst.length > 0 ? (
          <ul className="list-disc list-inside">
            {mst.map((edge, index) => (
              <li key={index}>
                Edge from {edge.src} to {edge.dest} with weight {edge.weight}
              </li>
            ))}
          </ul>
        ) : (
          <p>No MST formed yet. Click "Run Kruskal&apos;s Algorithm" to see the result.</p>
        )}
            <div className="p-4">
    <h2 className="text-3xl text-accent">Kruskal&apos;s Algorithm</h2>
    
    <div className="mt-4 p-4 rounded shadow-lg">
      <h3 className="text-2xl font-bold">Overview</h3>
      <p className="mt-2">
        Kruskal&apos;s Algorithm is used to find the <strong>Minimum Spanning Tree (MST)</strong> of a connected, undirected graph. The MST is a subgraph that connects all vertices with the smallest total edge weight without forming any cycles.
      </p>

      <h3 className="text-2xl font-bold mt-4">Steps of Kruskal&apos;s Algorithm</h3>
      <ol className="list-decimal list-inside mt-2">
        <li>Sort all edges by their weight in ascending order.</li>
        <li>Initialize a Disjoint Set to track connected components.</li>
        <li>For each edge, add it to the MST if it doesn’t form a cycle, using the Union-Find structure.</li>
        <li>Stop when you have added V-1 edges (for V vertices).</li>
      </ol>

      <h3 className="text-2xl font-bold mt-4">Example</h3>
      <p className="mt-2">Consider the following graph:</p>
      {/* You can display an image or a drawing of the graph here */}
      <p className="mt-2">Sorted edges: (1-2: 1), (1-3: 2), (3-4: 2), (0-2: 3), (0-1: 4), (2-3: 4), (4-5: 6)</p>
      <p className="mt-2">Steps:</p>
      <ul className="list-disc list-inside mt-2">
        <li>Add edge (1-2: 1) → Connects vertices 1 and 2.</li>
        <li>Add edge (1-3: 2) → Connects vertices 1 and 3.</li>
        <li>Add edge (3-4: 2) → Connects vertices 3 and 4.</li>
        <li>Add edge (0-2: 3) → Connects vertices 0 and 2.</li>
        <li>Add edge (4-5: 6) → Connects vertices 4 and 5.</li>
      </ul>
      <p className="mt-2">Now, the MST is complete with 5 edges.</p>

      <h3 className="text-2xl font-bold mt-4">Time Complexity</h3>
      <p className="mt-2">The time complexity is <strong>O(E log E)</strong> due to sorting the edges, where E is the number of edges.</p>

      <h3 className="text-2xl font-bold mt-4">Use Cases</h3>
      <p className="mt-2">Kruskal’s algorithm is useful for designing networks like telecommunication systems or transportation grids.</p>
    </div>
  </div>
      </div>

    </div>

  );
}
