'use client'
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import generateArray from '@/utils/generateArray'; // Import utility for generating sorted array

export default function ExponentialSearchComponent() {
  const [array, setArray] = useState<{ value: number; highlighted: boolean }[]>([]);
  const [target, setTarget] = useState<number | null>(null); // Target value for search
  const [resultIndex, setResultIndex] = useState<number | null>(null);
  const [speed] = useState(300); // Speed for visualization

  useEffect(() => {
    const newArray = generateArray(50, 999).sort((a, b) => a - b).map(value => ({
      value,
      highlighted: false,
    }));
    setArray(newArray);
  }, []);

  const handleShuffle = () => {
    const newArray = generateArray(50, 999).sort((a, b) => a - b).map(value => ({
      value,
      highlighted: false,
    }));
    setArray(newArray);
    setTarget(null);
    setResultIndex(null);
  };

  const handleExponentialSearch = async () => {
    if (target !== null) {
      const index = await exponentialSearch(target);
      setResultIndex(index);
    }
  };

  const exponentialSearch = async (target: number) => {
    if (array[0].value === target) {
      highlightArray([0]); // Highlight the first element if it's the target
      return 0; // Target found at index 0
    }

    let bound = 1;
    
    // Find the range where the target may exist
    while (bound < array.length && array[bound].value <= target) {
      highlightArray([bound]); // Highlight the current bound
      await new Promise((resolve) => setTimeout(resolve, speed)); // Delay for visualization
      bound *= 2; // Exponentially increase the bound
    }

    // Perform binary search in the found range
    return await binarySearch(bound / 2, Math.min(bound, array.length), target);
  };

  const binarySearch = async (left: number, right: number, target: number) => {
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      highlightArray([mid]); // Highlight the middle element
      await new Promise((resolve) => setTimeout(resolve, speed)); // Delay for visualization

      if (array[mid].value === target) {
        return mid; // Target found
      }
      if (array[mid].value < target) {
        left = mid + 1; // Search in the right half
      } else {
        right = mid; // Search in the left half
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
            <h2 className='text-3xl text-accent'>Exponential Search</h2>
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
            <Button onClick={handleExponentialSearch} className="px-4 py-2 rounded-full ml-2">
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

        {/* Technical overview of Exponential Search */}
        <div className="mt-8 p-4 rounded shadow-lg">
          <h3 className="text-2xl font-bold">Exponential Search - Technical Overview</h3>
          <p className="mt-2"><strong>1. Algorithm Description:</strong> Exponential Search is an algorithm that finds the range where the target element may exist and performs a binary search within that range.</p>
          
          <p className="mt-2"><strong>2. Steps of Exponential Search:</strong></p>
          <ul className="list-disc list-inside">
            <li>Start by checking the first element.</li>
            <li>Exponentially increase the search range (1, 2, 4, 8, ...).</li>
            <li>Once the range is found, perform a binary search within that range.</li>
            <li>If the target is found, return its index; otherwise, return -1.</li>
          </ul>

          <p className="mt-2"><strong>3. Time Complexity:</strong> O(log i), where i is the index of the target element (if present) and O(log n) for the binary search.</p>
          <p className="mt-2"><strong>4. Space Complexity:</strong> O(1), as it operates in-place.</p>
          <p className="mt-2"><strong>5. Stability:</strong> Exponential Search is not a stable search algorithm.</p>
          <p className="mt-2"><strong>6. Usage:</strong> Useful for unbounded or infinite lists, or when searching in sorted arrays.</p>
        </div>
      </div>
    </div>
  );
}
