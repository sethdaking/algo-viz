'use client'
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import generateArray from '@/utils/generateArray'; // Utility function to generate random numbers

export default function JumpSearchComponent() {
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

  const handleJumpSearch = async () => {
    if (target !== null) {
      const index = await jumpSearch(target);
      setResultIndex(index);
    }
  };

  const jumpSearch = async (target: number) => {
    const n = array.length;
    let jump = Math.floor(Math.sqrt(n)); // Optimal jump size
    let prev = 0;

    // Finding the block where the target may reside
    while (array[Math.min(jump, n) - 1].value < target) {
      prev = jump;
      jump += Math.floor(Math.sqrt(n));
      highlightArray([prev]); // Highlight the last position checked
      await new Promise((resolve) => setTimeout(resolve, speed)); // Delay for visualization

      if (prev >= n) {
        return -1; // Target not found
      }
    }

    // Linear search within the block
    while (array[prev].value < target) {
      highlightArray([prev]); // Highlight the current position
      await new Promise((resolve) => setTimeout(resolve, speed)); // Delay for visualization
      prev++;
      if (prev === Math.min(jump, n)) {
        return -1; // Target not found
      }
    }

    // Check if target is found
    if (array[prev].value === target) {
      highlightArray([prev]); // Highlight the found position
      return prev;
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
            <h2 className='text-3xl text-accent'>Jump Search</h2>
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
            <Button onClick={handleJumpSearch} className="px-4 py-2 rounded-full ml-2">
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

        {/* Technical overview of Jump Search */}
        <div className="mt-8 p-4 rounded shadow-lg">
          <h3 className="text-2xl font-bold">Jump Search - Technical Overview</h3>
          <p className="mt-2"><strong>1. Algorithm Description:</strong> Jump Search divides the sorted array into blocks and performs a linear search within the block to find the target value.</p>
          
          <p className="mt-2"><strong>2. Steps of Jump Search:</strong></p>
          <ul className="list-disc list-inside">
            <li>Determine the optimal jump size, which is typically the square root of the array length.</li>
            <li>Jump ahead in the array to find the block where the target may reside.</li>
            <li>Perform a linear search within the identified block to locate the target.</li>
          </ul>

          <p className="mt-2"><strong>3. Time Complexity:</strong> O(√n) in the average and worst case.</p>
          <p className="mt-2"><strong>4. Space Complexity:</strong> O(1), as it operates in-place.</p>
          <p className="mt-2"><strong>5. Stability:</strong> Jump Search is not a stable search algorithm.</p>
          <p className="mt-2"><strong>6. Usage:</strong> Ideal for searching in large, sorted datasets.</p>
        </div>
      </div>
    </div>
  );
}
