/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import generateArray from '@/utils/generateArray'; // Import the utility

export default function QuickSort() {
  const [array, setArray] = useState(generateArray(50));
  const [speed, setSpeed] = useState(100); // Sorting speed

  useEffect(() => {
    setArray(generateArray(50)); // Use the utility function
  }, []);

  const handleShuffle = () => {
    setArray(generateArray(50)); // Use the utility function
  };

  const handleSort = async () => {
    await quickSort(array, 0, array.length - 1);
  };

  const quickSort = async (arr, low, high) => {
    if (low < high) {
      const pi = await partition(arr, low, high);

      // Recursively sort elements before and after partition
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }

    // Update array for visualization
    setArray([...arr]);
  };

  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
      }
      setArray([...arr]); // Update for visualization
      await new Promise((resolve) => setTimeout(resolve, speed)); // Delay for visualization
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Place pivot in the correct position
    return i + 1;
  };

  return (
    <div>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div>
            <h2 className='text-3xl text-accent'>Quick Sort</h2>
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

        {/* Technical overview of Quick Sort */}
        <div className="mt-8 p-4 rounded shadow-lg">
          <h3 className="text-2xl font-bold">Quick Sort - Technical Overview</h3>
          <p className="mt-2"><strong>1. Algorithm Description:</strong> Quick Sort is an efficient, comparison-based, divide-and-conquer sorting algorithm. It works by selecting a &apos;pivot&apos; element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.</p>
          
          <p className="mt-2"><strong>2. Steps of Quick Sort:</strong></p>
          <ul className="list-disc list-inside">
            <li>Select a pivot element from the array.</li>
            <li>Partition the array into two halves: elements less than the pivot and elements greater than the pivot.</li>
            <li>Recursively apply the above steps to the two halves.</li>
          </ul>

          <p className="mt-2"><strong>3. Time Complexity:</strong> O(n log n) on average, O(n²) in the worst case (when the pivot is the smallest or largest element repeatedly).</p>
          <p className="mt-2"><strong>4. Space Complexity:</strong> O(log n) for the stack space used by recursive calls.</p>
          <p className="mt-2"><strong>5. Stability:</strong> Quick Sort is not a stable sorting algorithm.</p>
          <p className="mt-2"><strong>6. Suitability:</strong> Efficient for large datasets and widely used in practice. It&apos;s often preferred for in-memory sorting.</p>
        </div>
      </div>
    </div>
  );
}
