'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const initialGraph = [
  { id: 0, edges: [{ to: 1, weight: 1 }, { to: 2, weight: 4 }] },
  { id: 1, edges: [{ to: 2, weight: 2 }, { to: 3, weight: 5 }] },
  { id: 2, edges: [{ to: 3, weight: 1 }] },
  { id: 3, edges: [] },
];

const nodeRadius = 20; // Radius of the nodes

const nodePositions = [
  { x: 50, y: 100 },   // Node 0 position
  { x: 150, y: 50 },   // Node 1 position
  { x: 250, y: 150 },  // Node 2 position
  { x: 350, y: 100 },  // Node 3 position
];

export default function DijkstraComponent() {
  const [graph, setGraph] = useState(initialGraph);
  const [source, setSource] = useState<number>(0);
  const [distances, setDistances] = useState<number[]>([]);
  const [previous, setPrevious] = useState<(number | null)[]>([]); // Store previous nodes
  const [visited, setVisited] = useState<boolean[]>([]);
  const [animationSpeed] = useState(500); // Animation speed in milliseconds

  useEffect(() => {
    setDistances(new Array(graph.length).fill(Infinity)); // Initialize distances
    setVisited(new Array(graph.length).fill(false)); // Initialize visited nodes
    setPrevious(new Array(graph.length).fill(null)); // Initialize previous nodes
  }, [graph]);

  const handleRunDijkstra = async () => {
    const newDistances = [...distances];
    const newPrevious = [...previous];
    newDistances[source] = 0; // Distance to source is zero
    setDistances(newDistances);
    const queue: number[] = [source];

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (visited[current]) continue;

      setVisited((prev) => {
        const updated = [...prev];
        updated[current] = true;
        return updated;
      });

      await highlightNode(current);

      for (const edge of graph[current].edges) {
        const newDist = newDistances[current] + edge.weight;

        if (newDist < newDistances[edge.to]) {
          newDistances[edge.to] = newDist;
          newPrevious[edge.to] = current; // Update the previous node
          setDistances(newDistances);
          setPrevious(newPrevious);
          if (!visited[edge.to]) queue.push(edge.to);
        }
      }
    }
    setDistances(newDistances);
    setPrevious(newPrevious); // Save the previous nodes
  };

  const highlightNode = async (node: number) => {
    console.log(`Visiting node ${node}`);
    await new Promise((resolve) => setTimeout(resolve, animationSpeed));
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl text-accent">Dijkstra&apos;s Algorithm</h2>
      <div className="mt-4">
        <Button onClick={handleRunDijkstra} className="px-4 py-2 rounded-full">
          Run Dijkstra&apos;s Algorithm
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

                  // Midpoint for the edge text (weight display)
                  const midX = (x + targetPos.x) / 2;
                  const midY = (y + targetPos.y) / 2;

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
                      {/* Display edge weight at the midpoint */}
                      <text x={midX} y={midY - 5} textAnchor="middle" fill="red">
                        {edge.weight}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4">
        <h3 className="text-2xl">Shortest Distances and Previous Nodes from Source Node {source}:</h3>
        <ul className="list-disc list-inside">
          {distances.map((distance, index) => (
            <li key={index}>
              Node {index}: Distance = {distance === Infinity ? '∞' : distance}, Previous Node = {previous[index] !== null ? previous[index] : 'None'}
            </li>
          ))}
        </ul>
      </div>

      {/* Technical overview of Dijkstra's Algorithm */}
      <div className="mt-8 p-4 rounded shadow-lg">
        <h3 className="text-2xl font-bold">Dijkstra&apos;s Algorithm - Technical Overview</h3>
        <p className="mt-2"><strong>1. Algorithm Description:</strong> Dijkstra&apos;s Algorithm finds the shortest path from a source node to all other nodes in a weighted graph with non-negative edge weights.</p>

        <p className="mt-2"><strong>2. Steps of Dijkstra&apos;s Algorithm:</strong></p>
        <ul className="list-disc list-inside">
          <li>Initialize distances from the source to all nodes as infinity, except the source itself (which is 0).</li>
          <li>Mark all nodes as unvisited. Set the source node as the current node.</li>
          <li>For the current node, consider all its unvisited neighbors and calculate their tentative distances through the current node.</li>
          <li>Update the shortest distance if the calculated distance is less than the current stored distance.</li>
          <li>Once all neighbors have been considered, mark the current node as visited.</li>
          <li>Select the unvisited node with the smallest tentative distance and set it as the new current node. Repeat until all nodes are visited.</li>
        </ul>

        <p className="mt-2"><strong>3. Time Complexity:</strong> O((V + E) log V) where V is the number of vertices and E is the number of edges.</p>
        <p className="mt-2"><strong>4. Space Complexity:</strong> O(V) due to the storage of distances and visited nodes.</p>
        <p className="mt-2"><strong>5. Usage:</strong> Dijkstra&apos;s Algorithm is commonly used in routing and as a subroutine in other graph algorithms.</p>
      </div>
    </div>
  );
}
