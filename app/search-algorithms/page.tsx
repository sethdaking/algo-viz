'use client';

import { BsArrowDownRight } from 'react-icons/bs';
import Link from "next/link";

const searchAlgorithms = [
  {
    num: '01',
    title: 'Binary Search',
    description: 'An efficient algorithm that finds the position of a target value within a sorted array by repeatedly dividing the search interval in half. If the target value is less than the middle element, the search continues in the lower half, otherwise in the upper half.',
    href: "/search-algorithms/binary-search"
  },
  {
    num: '02',
    title: 'Linear Search',
    description: 'A straightforward search algorithm that checks each element in a list sequentially until the desired element is found or the list ends. It is simple to implement but inefficient for large datasets, with a time complexity of O(n).',
    href: "/search-algorithms/linear-search"
  },
  {
    num: '03',
    title: 'Jump Search',
    description: 'An algorithm that works on sorted arrays by dividing the array into blocks of a fixed size and performing a linear search within the blocks. It jumps ahead by a set number of steps to find the target value, reducing the number of comparisons needed.',
    href: "/search-algorithms/jump-search"
  },
  {
    num: '04',
    title: 'Exponential Search',
    description: 'An efficient search algorithm that finds the range of the target value and then performs a binary search within that range. It is particularly useful for unbounded or infinite lists, with a time complexity of O(log i) for finding the target, where i is the position of the target.',
    href: "/search-algorithms/exponential-search"
  },
  {
    num: '05',
    title: 'Interpolation Search',
    description: 'An improvement over binary search for uniformly distributed data. It estimates the position of the target value based on the value of the target compared to the values at the bounds of the search range, allowing for faster searches in certain conditions.',
    href: "/search-algorithms/interpolation-search"
  },
]

const SearchAlgos = () => {
  return (
    <section className='min-h-[80vh] flex flex-col justify-center py-12 xl:py:0'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-[60px]'>
          {searchAlgorithms.map((searchAlgorithm, index) => {
            return (
              <div key={index} className='flex-1 flex flex-col justify-center gap-6 group'>
                <div className='w-full flex justify-between items-center'>
                  <div className='text-5xl font-extrabold text-outiline text-transparent group-hover:text-outline-hover transition-all duration-500'>
                    {searchAlgorithm.num}
                  </div>
                  <Link href={searchAlgorithm.href} className='w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all
                  duration-500 flex justify-center items-center hover:-rotate-45'>
                    <BsArrowDownRight className='text-primary text-3xl'/>
                  </Link>
                </div>
                <h2 className='text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500'>
                  {searchAlgorithm.title}
                </h2>
                <p className='text-white/60'>{searchAlgorithm.description}</p>
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

export default SearchAlgos;
