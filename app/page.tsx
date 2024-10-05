'use client';

import { BsArrowDownRight } from 'react-icons/bs';
import Link from "next/link";

const algorithms = [
  {
    num: '01',
    title: 'Sorting Algorithms',
    description: 'Sorting algorithms are methods used to arrange elements of a list or array in a specific order, typically either ascending or descending. They are essential in computer science for tasks like data searching, organizing, and optimizing storage. Some popular sorting algorithms include Bubble Sort, which repeatedly swaps adjacent elements; Quick Sort, which partitions data around a pivot; and Merge Sort, which divides and merges sorted sub-arrays. Sorting algorithms can vary in efficiency, with some being more suitable for large datasets while others are easier to implement but slower on larger inputs.',
    href: "/sorting-algorithms"
  },
  {
    num: '02',
    title: 'Search Algorithms',
    description: 'Search algorithms are techniques used to retrieve information stored within data structures. They are crucial for locating specific data or items efficiently. Common search algorithms include Linear Search, which checks each element sequentially, and Binary Search, which divides the data in half repeatedly to locate a target value quickly. These algorithms vary in complexity and efficiency, making them suitable for different types of data structures and datasets.',
    href: "/search-algorithms"
  },
  {
    num: '03',
    title: 'Graph Algorithms',
    description: 'Graph algorithms are essential for solving problems related to networks and relationships between interconnected data points. They include various techniques like Depth First Search (DFS), Breadth First Search (BFS), Dijkstra’s Algorithm, and Minimum Spanning Tree algorithms, which help analyze and navigate graphs efficiently. These algorithms are widely used in fields such as social networks, transportation, and computer networking.',
    href: "/graph-algorithms"
  },

]

const Home = () => {
  return (
    <section className='min-h-[80vh] flex flex-col justify-center py-12 xl:py:0'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-[60px]'>
          {algorithms.map((algorithm, index) => {
            return (
              <div key={index} className='flex-1 flex flex-col justify-center gap-6 group'>
                <div className='w-full flex justify-between items-center'>
                  <div className='text-5xl font-extrabold text-outiline text-transparent group-hover:text-outline-hover transition-all duration-500'>
                    {algorithm.num}
                  </div>
                  <Link href={algorithm.href} className='w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all
                  duration-500 flex justify-center items-center hover:-rotate-45'>
                    <BsArrowDownRight className='text-primary text-3xl'/>
                  </Link>
                </div>
                <h2 className='text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500'>
                  {algorithm.title}
                </h2>
                <p className='text-white/60'>{algorithm.description}</p>
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

export default Home;
