'use client'
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import generateArray from '@/utils/generateArray'; // Import the utility

export default function InsertionSort() {
  const [array, setArray] = useState(generateArray(50));
  const [speed] = useState(100); // Sorting speed

  useEffect(() => {
    setArray(generateArray(50)); // Use the utility function
  }, []);

  const handleShuffle = () => {
    setArray(generateArray(50)); // Use the utility function
  };

  const handleSort = async () => {
    await insertionSort(); 
  };

  const insertionSort = async () => {
    const arr = [...array]; // Create a copy of the array to sort
    const n = arr.length;

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;

      // Move elements of arr[0..i-1] that are greater than key
      // to one position ahead of their current position
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j = j - 1;

        // Update state for visualization
        setArray([...arr]); // Update state to trigger re-render
        await new Promise((resolve) => setTimeout(resolve, speed)); // Delay for visualization
      }
      arr[j + 1] = key; // Place key in the correct position
    }
  };

  return (
    <div>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div>
            <h2 className='text-3xl text-accent'>Insertion Sort</h2>
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

        {/* Technical overview of Insertion Sort */}
        <div className="mt-8 bg-primary p-4 rounded shadow-lg">
          <h3 className="text-2xl font-bold">Insertion Sort - Technical Overview</h3>
          <p className="mt-2"><strong>1. Algorithm Description:</strong> Insertion Sort is a simple sorting algorithm that builds a sorted array one element at a time by repeatedly taking one element from the unsorted portion and inserting it into the correct position in the sorted portion.</p>
          
          <p className="mt-2"><strong>2. Steps of Insertion Sort:</strong></p>
          <ul className="list-disc list-inside">
            <li>Start with the second element (first element is considered sorted).</li>
            <li>Compare the current element (key) with the elements in the sorted portion (to its left).</li>
            <li>Shift all larger elements in the sorted portion one position to the right to make space for the key.</li>
            <li>Insert the key in its correct position.</li>
            <li>Repeat until all elements are sorted.</li>
          </ul>

          <p className="mt-2"><strong>3. Time Complexity:</strong> O(n²) in the worst and average case, and O(n) in the best case (when the array is already sorted).</p>
          <p className="mt-2"><strong>4. Space Complexity:</strong> O(1), as it operates in-place.</p>
          <p className="mt-2"><strong>5. Stability:</strong> Insertion Sort is a stable algorithm.</p>
          <p className="mt-2"><strong>6. Suitability:</strong> Efficient for small datasets or nearly sorted arrays.</p>
        </div>
      </div>
    </div>
  );
}
