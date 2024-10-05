'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

// Define the initial directed graph as an adjacency list
const initialGraph: { [key: number]: number[] } = {
  0: [1, 2], // Node 0 -> Nodes 1 and 2
  1: [3],    // Node 1 -> Node 3
  2: [3],    // Node 2 -> Node 3
  3: [4],    // Node 3 -> Node 4
  4: []      // Node 4 has no outgoing edges
};

// Positions for the nodes in the SVG visualization
const nodePositions = [
  { x: 50, y: 150 },  // Node 0
  { x: 150, y: 50 },  // Node 1
  { x: 150, y: 250 }, // Node 2
  { x: 250, y: 150 }, // Node 3
  { x: 350, y: 150 }  // Node 4
];

export default function TopologicalSortComponent() {
  const [topologicalOrder, setTopologicalOrder] = useState<number[]>([]); // State to hold the topological order

  // Function to handle the Topological Sort execution
  const handleRunTopologicalSort = () => {
    const order = topologicalSort(initialGraph); // Call the sorting function with the initial graph
    setTopologicalOrder(order); // Update the state with the obtained order
  };

  // Topological Sort function implementation
  const topologicalSort = (graph: { [key: number]: number[] }) => {
    const indegree: { [key: number]: number } = {}; // Object to track the indegree of each vertex
    const queue: number[] = []; // Queue for vertices with indegree 0
    const order: number[] = []; // Array to store the topological order

    // Step 1: Compute the indegree of each vertex
    for (const vertex in graph) {
      indegree[vertex] = 0; // Initialize indegree to 0 for each vertex
    }

    // Calculate indegree based on the outgoing edges from each vertex
    for (const vertex in graph) {
      for (const neighbor of graph[vertex]) {
        indegree[neighbor] = (indegree[neighbor] || 0) + 1; // Increment indegree for each neighbor
      }
    }

    // Step 2: Initialize the queue with vertices that have an indegree of 0
    for (const vertex in indegree) {
      if (indegree[vertex] === 0) {
        queue.push(Number(vertex)); // Push vertex to queue if it has indegree 0
      }
    }

    // Step 3: Process the vertices in the queue
    while (queue.length > 0) {
      const currentVertex = queue.shift()!; // Dequeue a vertex from the queue
      order.push(currentVertex); // Add the vertex to the topological order

      // Decrement the indegree of neighboring vertices
      for (const neighbor of graph[currentVertex]) {
        indegree[neighbor]--; // Decrement indegree for each neighbor
        if (indegree[neighbor] === 0) {
          queue.push(neighbor); // Add to queue if indegree becomes 0
        }
      }
    }

    // Check if topological sort was successful (i.e., all vertices are processed)
    return order.length === Object.keys(graph).length ? order : [];
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl text-accent">Topological Sort</h2>
      <div className="mt-4">
        <Button onClick={handleRunTopologicalSort} className="px-4 py-2 rounded-full">
          Run Topological Sort
        </Button>
      </div>

      <div className="mt-4">
        {topologicalOrder.length > 0 && (
          <h3 className="text-2xl mt-4">Topological Order: {topologicalOrder.join(' -> ')}</h3>
        )}
      </div>

      {/* Visualization of the Graph */}
      <div className="mt-4 flex justify-center">
        <svg width={500} height={300} className="border">
          {nodePositions.map((pos, index) => {
            const { x, y } = pos;

            return (
              <g key={index}>
                <circle cx={x} cy={y} r={20} fill="lightgray" stroke="black" />
                <text x={x} y={y + 5} textAnchor="middle" fill="black">
                  {index}
                </text>

                {initialGraph[index]?.map((neighbor, idx) => {
                  const targetPos = nodePositions[neighbor];

                  return (
                    <g key={idx}>
                      <line
                        x1={x}
                        y1={y}
                        x2={targetPos.x}
                        y2={targetPos.y}
                        stroke="black"
                        strokeWidth="2"
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
        <h3 className="text-2xl font-bold">Topological Sort - Technical Overview</h3>
        <p className="mt-2"><strong>1. Definition:</strong> Topological sort is an ordering of the vertices in a directed acyclic graph (DAG) such that for every directed edge u → v, vertex u comes before vertex v.</p>
        <p className="mt-2"><strong>2. Purpose:</strong> It is used for scheduling tasks, resolving dependencies, and organizing data.</p>
        <p className="mt-2"><strong>3. Algorithm Steps:</strong></p>
        <ul className="list-disc list-inside">
          <li>Calculate in-degree for each vertex.</li>
          <li>Enqueue vertices with in-degree of zero.</li>
          <li>While the queue is not empty, dequeue a vertex and append it to the sorted order.</li>
          <li>Decrease the in-degree of its neighbors. Enqueue any neighbor that reaches an in-degree of zero.</li>
          <li>Check for cycles by comparing the sorted order&apos;s length to the number of vertices.</li>
        </ul>
        <p className="mt-2"><strong>4. Complexity:</strong> The time complexity is O(V + E), where V is the number of vertices and E is the number of edges.</p>
      </div>
    </div>
  );
}
