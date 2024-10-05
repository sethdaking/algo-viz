'use client';

import { BsArrowDownRight } from 'react-icons/bs';
import Link from "next/link";

const graphAlgorithms = [
  {
    num: '01',
    title: "Dijkstra's Algorithm",
    description: 'An algorithm used for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. It efficiently calculates the minimum distance from a starting node to all other nodes using a priority queue.',
    href: "/graph-algorithms/dijkstras-algorithm"
  },
  {
    num: '02',
    title: 'Depth First Search',
    description: 'A fundamental graph traversal algorithm that explores as far down a branch as possible before backtracking. It is useful for tasks such as finding connected components and performing topological sorts.',
    href: "/graph-algorithms/depth-first-search"
  },
  {
    num: '03',
    title: 'Breadth First Search',
    description: 'An algorithm for traversing or searching tree or graph data structures. It explores all neighbors at the present depth prior to moving on to nodes at the next depth level, making it ideal for finding the shortest path in unweighted graphs.',
    href: "/graph-algorithms/breadth-first-search"
  },
  {
    num: '04',
    title: 'A* Search',
    description: 'A powerful pathfinding and graph traversal algorithm that uses heuristics to improve search efficiency. It combines the benefits of Dijkstra’s algorithm and greedy best-first search to find the least-cost path to the target node.',
    href: "/graph-algorithms/a-search"
  },
  {
    num: '05',
    title: 'Bellman-Ford Algorithm',
    description: 'An algorithm that computes shortest paths from a single source vertex to all other vertices in a graph, even if the graph has edges with negative weights. It is capable of detecting negative cycles in the graph.',
    href: "/graph-algorithms/bellman-ford-algorithm"
  },
  {
    num: '06',
    title: 'Floyd-Warshall Algorithm',
    description: 'A dynamic programming algorithm used to find the shortest paths in a weighted graph with positive or negative edge weights (but with no negative cycles). It calculates the shortest paths between all pairs of vertices efficiently.',
    href: "/graph-algorithms/floyd-warshall-algorithm"
  },
  {
    num: '07',
    title: "Kruskal's Algorithm",
    description: 'An algorithm for finding the minimum spanning tree of a graph. It works by sorting the edges and adding them one by one to the spanning tree, ensuring that no cycles are formed, ultimately resulting in the minimum cost.',
    href: "/graph-algorithms/kruskals-algorithm"
  },
  {
    num: '08',
    title: "Prim's Algorithm",
    description: 'An algorithm that finds a minimum spanning tree for a weighted undirected graph. It starts from an arbitrary node and grows the spanning tree by adding the lowest-weight edge connecting the tree to a vertex outside the tree.',
    href: "/graph-algorithms/prims-algorithm"
  },
  {
    num: '09',
    title: "Topological Sort",
    description: 'An algorithm used to order the vertices of a directed acyclic graph (DAG) such that for every directed edge from vertex A to vertex B, vertex A comes before vertex B in the ordering. It is essential for scheduling tasks with dependencies.',
    href: "/graph-algorithms/topological-sort"
  },
  {
    num: '10',
    title: "Tarjan's Algorithm",
    description: 'An efficient algorithm for finding strongly connected components in a directed graph. It uses depth-first search and can find all components in linear time relative to the number of vertices and edges.',
    href: "/graph-algorithms/tarjans-algorithm"
  },
  {
    num: '11',
    title: "Kosaraju's Algorithm",
    description: 'An algorithm that finds strongly connected components in a directed graph using two passes of depth-first search. It first processes the original graph and then the transposed graph to identify all strongly connected components efficiently.',
    href: "/graph-algorithms/kosarajus-algorithm"
  },
]

const graphAlgos = () => {
  return (
    <section className='min-h-[80vh] flex flex-col justify-center py-12 xl:py:0'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-[60px]'>
          {graphAlgorithms.map((graphAlgorithm, index) => {
            return (
              <div key={index} className='flex-1 flex flex-col justify-center gap-6 group'>
                <div className='w-full flex justify-between items-center'>
                  <div className='text-5xl font-extrabold text-outiline text-transparent group-hover:text-outline-hover transition-all duration-500'>
                    {graphAlgorithm.num}
                  </div>
                  <Link href={graphAlgorithm.href} className='w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all
                  duration-500 flex justify-center items-center hover:-rotate-45'>
                    <BsArrowDownRight className='text-primary text-3xl'/>
                  </Link>
                </div>
                <h2 className='text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500'>
                  {graphAlgorithm.title}
                </h2>
                <p className='text-white/60'>{graphAlgorithm.description}</p>
                <div className='border-b border-white/20'>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default graphAlgos;
