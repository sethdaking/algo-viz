'use client';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import generateArray from '@/utils/generateArray'; // Import the utility

export default function MergeSort() {
  const [array, setArray] = useState(generateArray(50, 999));
  const [speed] = useState(100); // Sorting speed

  useEffect(() => {
    setArray(generateArray(50, 999)); // Use the utility function
  }, []);

  const handleShuffle = () => {
    setArray(generateArray(50, 999)); // Use the utility function
  };

  const handleSort = async () => {
    await mergeSort(array);
  };

  const mergeSort = async (arr: number[]): Promise<number[]> => {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = await mergeSort(arr.slice(0, mid));
    const right = await mergeSort(arr.slice(mid));

    const sortedArray = await merge(left, right);
    setArray(sortedArray); // Update state for visualization
    return sortedArray;
  };

  const merge = async (left: number[], right: number[]): Promise<number[]> => {
    const result: number[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Merge two sorted arrays
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }

      setArray([...result, ...left.slice(leftIndex), ...right.slice(rightIndex)]); // Update for visualization
      await new Promise((resolve) => setTimeout(resolve, speed)); // Delay for visualization
    }

    // Concatenate any remaining elements
    return [...result, ...left.slice(leftIndex), ...right.slice(rightIndex)];
  };

  return (
    <div>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div>
            <h2 className='text-3xl text-accent'>Merge Sort</h2>
          </div>
          <div>
            <Button onClick={handleShuffle} className="px-4 py-2 rounded-full">
              Shuffle
            </Button>
            <Button onClick={handleSort} className="px-4 py-2 rounded-full ml-2">
              Sort
            </Button>
          </div>
        </div>

        {/* Display array as vertical bars */}
        <div className="flex justify-center space-x-1">
          {array.map((value, index) => (
            <div
              key={index}
              className="border-r-2 border-blue-500"
              style={{ height: `${value * 3}px` }}
            ></div>
          ))}
        </div>

        {/* Technical overview of Merge Sort */}
        <div className="mt-8 p-4 rounded shadow-lg">
          <h3 className="text-2xl font-bold">Merge Sort - Technical Overview</h3>
          <p className="mt-2"><strong>1. Algorithm Description:</strong> Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, recursively sorts both halves, and then merges the sorted halves back together.</p>
          
          <p className="mt-2"><strong>2. Steps of Merge Sort:</strong></p>
          <ul className="list-disc list-inside">
            <li>Divide the unsorted array into n subarrays, each containing one element (a sorted array of one element).</li>
            <li>Repeatedly merge subarrays to produce new sorted subarrays until there is only one subarray remaining (the sorted array).</li>
          </ul>

          <p className="mt-2"><strong>3. Time Complexity:</strong> O(n log n) in the worst, average, and best cases.</p>
          <p className="mt-2"><strong>4. Space Complexity:</strong> O(n), as it requires additional space for temporary arrays during merging.</p>
          <p className="mt-2"><strong>5. Stability:</strong> Merge Sort is a stable algorithm.</p>
          <p className="mt-2"><strong>6. Suitability:</strong> Suitable for large datasets and linked lists, but requires more space compared to in-place sorting algorithms.</p>
        </div>
      </div>
    </div>
  );
}
