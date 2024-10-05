'use client'
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import generateArray from '@/utils/generateArray'; // Import the utility

export default function HeapSort() {
  const [array, setArray] = useState(generateArray(50));
  const [algorithm] = useState('Heap Sort');
  const [speed] = useState(100); // Sorting speed

  useEffect(() => {
    setArray(generateArray(50)); // Use the utility function
  }, []);

  const handleShuffle = () => {
    setArray(generateArray(50)); // Use the utility function
  };

  const handleSort = async () => {
    if (algorithm === 'Heap Sort') {
      await heapSort(); 
    }
  };

  // Heapify function to maintain the heap structure
  const heapify = async (arr: number[], n: number, i: number) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    // Check if the left child is larger than the root
    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    // Check if the right child is larger than the largest so far
    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    // If largest is not root
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Swap
      setArray([...arr]); // Update the array visually
      await new Promise((resolve) => setTimeout(resolve, speed)); // Visualize the swap

      // Recursively heapify the affected sub-tree
      await heapify(arr, n, largest);
    }
  };

  // Heap Sort function
  const heapSort = async () => {
    const arr = array.slice();
    const n = arr.length;

    // Build a max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }

    // One by one extract elements from heap
    for (let i = n - 1; i > 0; i--) {
      // Move the current root to the end
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setArray([...arr]); // Visualize the swap
      await new Promise((resolve) => setTimeout(resolve, speed)); // Visualize the swap

      // Call heapify on the reduced heap
      await heapify(arr, i, 0);
    }
  };

  return (
    <div>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div>
            <h2 className='text-3xl text-accent'>Heap Sort</h2>
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

        {/* Technical overview of Heap Sort */}
        <div className="mt-8 p-4 rounded shadow-lg">
          <h3 className="text-2xl font-bold">Heap Sort - Technical Overview</h3>
          <p className="mt-2"><strong>1. Algorithm Description:</strong> Heap Sort is a comparison-based sorting algorithm. It is based on a binary heap data structure, and is an in-place sorting algorithm.</p>
          
          <p className="mt-2"><strong>2. Steps of Heap Sort:</strong></p>
          <ul className="list-disc list-inside">
            <li>Build a max heap from the input array.</li>
            <li>Extract the maximum element from the heap (the root).</li>
            <li>Swap it with the last element in the array.</li>
            <li>Reduce the size of the heap and heapify the root.</li>
            <li>Repeat the process until the array is sorted.</li>
          </ul>

          <p className="mt-2"><strong>3. Time Complexity:</strong> O(n log n) in all cases (worst, average, best).</p>
          <p className="mt-2"><strong>4. Space Complexity:</strong> O(1), as it operates in-place.</p>
          <p className="mt-2"><strong>5. Stability:</strong> Heap Sort is not a stable algorithm because it does not maintain the relative order of equal elements.</p>
        </div>
      </div>
    </div>
  );
}
