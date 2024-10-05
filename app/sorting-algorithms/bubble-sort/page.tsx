'use client'
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import generateArray from '@/utils/generateArray'; // Import the utility

export default function BubbleSort() {
  const [array, setArray] = useState(generateArray(50));
  const [algorithm] = useState('Bubble Sort');
  const [speed] = useState(100); // Sorting speed

  useEffect(() => {
    setArray(generateArray(50)); // Use the utility function
  }, []);

  const handleShuffle = () => {
    setArray(generateArray(50)); // Use the utility function
  };

  const handleSort = async () => {
    if (algorithm === 'Bubble Sort') {
      await bubbleSort(); 
    }
  };

  const bubbleSort = async () => {
    const arr = array.slice();
    const n = arr.length;
    for (let i = 0; i < n; i++) {
      let swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          // Swap and visualize
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          swapped = true;
          await new Promise((resolve) => setTimeout(resolve, speed));
        }
      }
      if (!swapped) break; // Early exit if no swaps
    }
  };

  return (
    <div>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div>
            <h2 className='text-3xl text-accent'>Bubble Sort</h2>
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

        {/* Technical overview of Bubble Sort */}
        <div className="mt-8 bg-gray-100 p-4 rounded shadow-lg">
          <h3 className="text-2xl font-bold">Bubble Sort - Technical Overview</h3>
          <p className="mt-2"><strong>1. Algorithm Description:</strong> Bubble Sort is a simple comparison-based sorting algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.</p>
          
          <p className="mt-2"><strong>2. Steps of Bubble Sort:</strong></p>
          <ul className="list-disc list-inside">
            <li>Start at the beginning of the array.</li>
            <li>Compare adjacent elements and swap if needed.</li>
            <li>Move larger elements towards the end of the list.</li>
            <li>Repeat for the unsorted portion until the array is sorted.</li>
          </ul>

          <p className="mt-2"><strong>3. Time Complexity:</strong> O(n²) in the worst and average case, and O(n) in the best case (when the array is already sorted).</p>
          <p className="mt-2"><strong>4. Space Complexity:</strong> O(1), as it operates in-place.</p>
          <p className="mt-2"><strong>5. Stability:</strong> Bubble Sort is a stable algorithm.</p>
          <p className="mt-2"><strong>6. Optimizations:</strong> Early termination if no swaps are made in a pass.</p>
        </div>
      </div>
    </div>
  );
}
