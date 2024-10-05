'use client'
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import generateArray from '@/utils/generateArray'; // Utility to generate a sorted array

export default function BinarySearchComponent() {
  const [array, setArray] = useState<{ value: number; highlighted: boolean }[]>([]);
  const [target, setTarget] = useState<number | null>(null); // Target value for search
  const [resultIndex, setResultIndex] = useState<number | null>(null);
  const [speed] = useState(100); // Speed for visualization

  useEffect(() => {
    const sortedArray = generateArray(50, 999).sort((a, b) => a - b).map(value => ({
      value,
      highlighted: false,
    }));
    setArray(sortedArray);
  }, []);

  const handleShuffle = () => {
    const sortedArray = generateArray(50, 999).sort((a, b) => a - b).map(value => ({
      value,
      highlighted: false,
    }));
    setArray(sortedArray);
    setTarget(null);
    setResultIndex(null);
  };

  const handleBinarySearch = async () => {
    if (target !== null) {
      const index = await binarySearch(target);
      setResultIndex(index);
    }
  };

  const binarySearch = async (target: number) => {
    let low = 0;
    let high = array.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      highlightArray([low, mid, high]); // Highlight the current search window

      await new Promise((resolve) => setTimeout(resolve, speed)); // Add delay for visualization

      if (array[mid].value === target) {
        return mid; // Target found
      } else if (array[mid].value < target) {
        low = mid + 1; // Search in the right half
      } else {
        high = mid - 1; // Search in the left half
      }
    }

    return -1; // Target not found
  };

  const highlightArray = (indices: number[]) => {
    const highlightedArray = array.map((item, index) => {
      if (indices.includes(index)) {
        return { ...item, highlighted: true }; // Highlight the item
      } else {
        return { ...item, highlighted: false }; // Remove highlight
      }
    });
    setArray(highlightedArray);
  };

  return (
    <div>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div>
            <h2 className='text-3xl text-accent'>Binary Search</h2>
          </div>
          <div>
            <Button onClick={handleShuffle} className="px-4 py-2 rounded-full">
              Shuffle
            </Button>
            <input
              type="number"
              value={target ?? ""}
              onChange={(e) => setTarget(parseInt(e.target.value))}
              placeholder="Target"
              className="border rounded px-2 py-1 ml-2 text-black"
            />
            <Button onClick={handleBinarySearch} className="px-4 py-2 rounded-full ml-2">
              Search
            </Button>
          </div>
        </div>

        {/* Display array as vertical bars */}
        <div className="flex justify-center space-x-1">
          {array.map((item, index) => (
            <div
              key={index}
              className={`border-r-2 ${item.highlighted ? 'border-red-500' : 'border-blue-500'}`}
              style={{ height: `${item.value * 3}px` }}
            ></div>
          ))}
        </div>

        {resultIndex !== null && (
          <div className="mt-4 text-center">
            {resultIndex === -1 ? (
              <p className="text-xl text-red-500">Target not found.</p>
            ) : (
              <p className="text-xl text-green-500">Target found at index {resultIndex}.</p>
            )}
          </div>
        )}

        {/* Technical overview of Binary Search */}
        <div className="mt-8 p-4 rounded shadow-lg">
          <h3 className="text-2xl font-bold">Binary Search - Technical Overview</h3>
          <p className="mt-2"><strong>1. Algorithm Description:</strong> Binary Search is an efficient algorithm used to search for a target value in a sorted array. It works by dividing the search interval in half and comparing the target with the middle element of the array.</p>
          
          <p className="mt-2"><strong>2. Steps of Binary Search:</strong></p>
          <ul className="list-disc list-inside">
            <li>Start with two pointers, `low` at the beginning and `high` at the end of the array.</li>
            <li>Find the middle element and compare it with the target.</li>
            <li>If the target is equal to the middle element, return its index.</li>
            <li>If the target is smaller, search in the left half; otherwise, search in the right half.</li>
            <li>Repeat the process until the target is found or the search interval is empty.</li>
          </ul>

          <p className="mt-2"><strong>3. Time Complexity:</strong> O(log n) as the search space is halved with each iteration.</p>
          <p className="mt-2"><strong>4. Space Complexity:</strong> O(1) for the iterative version, as it only requires a few extra variables.</p>
          <p className="mt-2"><strong>5. Stability:</strong> Binary Search is not concerned with stability as it&apos;s not a sorting algorithm.</p>
          <p className="mt-2"><strong>6. Usage:</strong> Binary Search is commonly used in scenarios where the data is already sorted, such as searching in dictionaries, databases, or other sorted structures.</p>
        </div>
      </div>
    </div>
  );
}
