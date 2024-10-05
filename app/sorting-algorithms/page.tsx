'use client';

import { BsArrowDownRight } from 'react-icons/bs';
import Link from "next/link";

const sortingAlgorithms = [
  {
    num: '01',
    title: 'Bubble Sort',
    description: 'A simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. It continues until no swaps are needed.',
    href: "/sorting-algorithms/bubble-sort"
  },
  {
    num: '02',
    title: 'Selection Sort',
    description: 'This algorithm divides the list into a sorted and an unsorted region. It repeatedly selects the smallest (or largest) element from the unsorted region and moves it to the end of the sorted region.',
    href: "/sorting-algorithms/selection-sort"
  },
  {
    num: '03',
    title: 'Merge Sort',
    description: 'A divide-and-conquer algorithm that splits the array into two halves, recursively sorts each half, and then merges the sorted halves back together.',
    href: "/sorting-algorithms/merge-sort"
  },
  {
    num: '04',
    title: 'Quick Sort',
    description: 'A divide-and-conquer algorithm that selects a "pivot" element and partitions the other elements into two sub-arrays according to whether they are less than or greater than the pivot. It then recursively sorts the sub-arrays.',
    href: "/sorting-algorithms/quick-sort"
  },
  {
    num: '05',
    title: 'Heap Sort',
    description: 'This algorithm converts the array into a binary heap structure, then repeatedly removes the largest (or smallest) element from the heap and rebuilds the heap until the array is sorted.',
    href: "/sorting-algorithms/heap-sort"
  },
  {
    num: '06',
    title: 'Counting Sort',
    description: 'A non-comparison-based sorting algorithm that counts the number of occurrences of each distinct element, then calculates the positions of each element in the sorted output.',
    href: "/sorting-algorithms/counting-sort"
  },
  {
    num: '07',
    title: 'Radix Sort',
    description: 'A non-comparison-based sorting algorithm that sorts numbers digit by digit, starting from the least significant digit to the most significant digit, using a stable sub-sorting algorithm like counting sort for individual digits.',
    href: "/sorting-algorithms/radix-sort"
  },
  {
    num: '08',
    title: 'Tim Sort',
    description: 'A hybrid sorting algorithm derived from merge sort and insertion sort, designed to perform well on many kinds of real-world data. It is used in Python’s built-in sort function and Java’s Arrays.sort.',
    href: "/sorting-algorithms/tim-sort"
  },
]

const SortingAlgos = () => {
  return (
    <section className='min-h-[80vh] flex flex-col justify-center py-12 xl:py:0'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-[60px]'>
          {sortingAlgorithms.map((sortingAlgorithm, index) => {
            return (
              <div key={index} className='flex-1 flex flex-col justify-center gap-6 group'>
                <div className='w-full flex justify-between items-center'>
                  <div className='text-5xl font-extrabold text-outiline text-transparent group-hover:text-outline-hover transition-all duration-500'>
                    {sortingAlgorithm.num}
                  </div>
                  <Link href={sortingAlgorithm.href} className='w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all
                  duration-500 flex justify-center items-center hover:-rotate-45'>
                    <BsArrowDownRight className='text-primary text-3xl'/>
                  </Link>
                </div>
                <h2 className='text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500'>
                  {sortingAlgorithm.title}
                </h2>
                <p className='text-white/60'>{sortingAlgorithm.description}</p>
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

export default SortingAlgos;
