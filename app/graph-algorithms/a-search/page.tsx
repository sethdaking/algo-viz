'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const initialGraph = [
  { id: 0, edges: [{ to: 1, weight: 1 }, { to: 2, weight: 4 }] }, // Node 0
  { id: 1, edges: [{ to: 2, weight: 2 }, { to: 3, weight: 5 }] }, // Node 1
  { id: 2, edges: [{ to: 3, weight: 1 }, { to: 4, weight: 2 }] }, // Node 2
  { id: 3, edges: [{ to: 5, weight: 3 }] },                       // Node 3
  { id: 4, edges: [{ to: 6, weight: 1 }] },                       // Node 4
  { id: 5, edges: [{ to: 6, weight: 1 }] },                       // Node 5
  { id: 6, edges: [] },                                          // Node 6 (Goal Node)
];

const nodeRadius = 20; // Radius of the nodes

const nodePositions = [
  { x: 50, y: 100 },   // Node 0 position
  { x: 150, y: 50 },   // Node 1 position
  { x: 250, y: 150 },  // Node 2 position
  { x: 350, y: 100 },  // Node 3 position
  { x: 250, y: 50 },   // Node 4 position
  { x: 400, y: 150 },  // Node 5 position
  { x: 450, y: 100 },  // Node 6 position
];

export default function AStarComponent() {
  const [graph, setGraph] = useState(initialGraph);
  const [visited, setVisited] = useState<boolean[]>(new Array(initialGraph.length).fill(false));
  const [path, setPath] = useState<number[]>([]); // To store the path taken
  const [animationSpeed] = useState(500); // Animation speed in milliseconds

  const handleRunAStar = async () => {
    const startNode = 0; // Starting from Node 0
    const goalNode = 6; // Goal is Node 6
    const visitedNodes = new Array(graph.length).fill(false);
    const cameFrom: number[] = new Array(graph.length).fill(-1); // To store the path
    const gScore: number[] = new Array(graph.length).fill(Infinity);
    const fScore: number[] = new Array(graph.length).fill(Infinity);

    gScore[startNode] = 0;
    fScore[startNode] = heuristic(startNode, goalNode);

    const openSet = [startNode];

    while (openSet.length > 0) {
      const currentNode = openSet.sort((a, b) => fScore[a] - fScore[b]).shift()!; // Get node with lowest fScore
      visitedNodes[currentNode] = true;
      setVisited([...visitedNodes]);

      // Highlight the current node
      await highlightNode(currentNode);

      if (currentNode === goalNode) {
        // Reconstruct path
        setPath(reconstructPath(cameFrom, currentNode));
        break;
      }

      for (const edge of graph[currentNode].edges) {
        const tentativeGScore = gScore[currentNode] + edge.weight;

        if (tentativeGScore < gScore[edge.to]) {
          // This path to the neighbor is better than any previous one
          cameFrom[edge.to] = currentNode;
          gScore[edge.to] = tentativeGScore;
          fScore[edge.to] = gScore[edge.to] + heuristic(edge.to, goalNode);

          if (!openSet.includes(edge.to)) {
            openSet.push(edge.to);
          }
        }
      }
    }
  };

  const heuristic = (node: number, goal: number) => {
    // Simple heuristic: distance between nodes based on their index (can be adjusted)
    return Math.abs(node - goal);
  };

  const highlightNode = async (node: number) => {
    console.log(`Visiting node ${node}`);
    await new Promise((resolve) => setTimeout(resolve, animationSpeed));
  };

  const reconstructPath = (cameFrom: number[], current: number) => {
    const totalPath = [current];
    while (cameFrom[current] !== -1) {
      current = cameFrom[current];
      totalPath.push(current);
    }
    return totalPath.reverse(); // Reverse the path to show from start to goal
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl text-accent">A* Search Algorithm</h2>
      <div className="mt-4">
        <Button onClick={handleRunAStar} className="px-4 py-2 rounded-full">
          Run A* Search
        </Button>
      </div>

      {/* Visualization of the Graph */}
      <div className="mt-4 flex justify-center">
        <svg width={500} height={200} className="border">
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
                      <text
                        x={(x + targetPos.x) / 2}
                        y={(y + targetPos.y) / 2 - 5}
                        textAnchor="middle"
                        fill="black"
                      >
                        {edge.weight}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* Draw path if it exists */}
          {path.map((node, index) => {
            if (index < path.length - 1) {
              const startPos = nodePositions[node];
              const endPos = nodePositions[path[index + 1]];
              return (
                <line
                  key={index}
                  x1={startPos.x}
                  y1={startPos.y}
                  x2={endPos.x}
                  y2={endPos.y}
                  stroke="red"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              );
            }
            return null;
          })}
        </svg>
      </div>

      <div className="mt-8 p-4 rounded shadow-lg">
        <h3 className="text-2xl font-bold">A* Search - Technical Overview</h3>
        <p className="mt-2"><strong>1. Algorithm Description:</strong> A* Search finds the shortest path from a start node to a goal node by considering both the actual cost to reach a node and a heuristic estimate of the cost to reach the goal.</p>

        <p className="mt-2"><strong>2. Steps of A* Search:</strong></p>
        <ul className="list-disc list-inside">
          <li>Initialize open and closed sets. Add the starting node to the open set.</li>
          <li>While the open set is not empty, select the node with the lowest f-score.</li>
          <li>If it is the goal node, reconstruct the path and return it.</li>
          <li>For each neighbor of the current node, calculate tentative g-scores and update if better paths are found.</li>
          <li>Continue until the goal node is found or the open set is empty.</li>
        </ul>

        <p className="mt-2"><strong>3. Time Complexity:</strong> O(E), where E is the number of edges.</p>
        <p className="mt-2"><strong>4. Space Complexity:</strong> O(V), where V is the number of vertices in the graph.</p>
        <p className="mt-2"><strong>5. Usage:</strong> A* Search is commonly used in pathfinding and graph traversal for AI and robotics.</p>
      </div>
    </div>
  );
}
