'use client'
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import generateArray from '@/utils/generateArray'; // Utility to generate a random array

export default function LinearSearchComponent() {
  const [array, setArray] = useState<{ value: number; highlighted: boolean }[]>([]);
  const [target, setTarget] = useState<number | null>(null); // Target value for search
  const [resultIndex, setResultIndex] = useState<number | null>(null);
  const [speed] = useState(100); // Speed for visualization

  useEffect(() => {
    const newArray = generateArray(50, 999).map(value => ({
      value,
      highlighted: false,
    }));
    setArray(newArray);
  }, []);

  const handleShuffle = () => {
    const newArray = generateArray(50, 999).map(value => ({
      value,
      highlighted: false,
    }));
    setArray(newArray);
    setTarget(null);
    setResultIndex(null);
  };

  const handleLinearSearch = async () => {
    if (target !== null) {
      const index = await linearSearch(target);
      setResultIndex(index);
    }
  };

  const linearSearch = async (target: number) => {
    for (let i = 0; i < array.length; i++) {
      highlightArray([i]); // Highlight the current element being checked

      await new Promise((resolve) => setTimeout(resolve, speed)); // Add delay for visualization

      if (array[i].value === target) {
        return i; // Target found
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
            <h2 className='text-3xl text-accent'>Linear Search</h2>
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
            <Button onClick={handleLinearSearch} className="px-4 py-2 rounded-full ml-2">
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

        {/* Technical overview of Linear Search */}
        <div className="mt-8 p-4 rounded shadow-lg">
          <h3 className="text-2xl font-bold">Linear Search - Technical Overview</h3>
          <p className="mt-2"><strong>1. Algorithm Description:</strong> Linear Search is a simple search algorithm that checks each element of the array until the target is found or all elements are checked.</p>
          
          <p className="mt-2"><strong>2. Steps of Linear Search:</strong></p>
          <ul className="list-disc list-inside">
            <li>Start from the first element of the array.</li>
            <li>Compare each element with the target.</li>
            <li>If the target is found, return its index.</li>
            <li>If the target is not found after checking all elements, return -1.</li>
          </ul>

          <p className="mt-2"><strong>3. Time Complexity:</strong> O(n), where n is the number of elements in the array.</p>
          <p className="mt-2"><strong>4. Space Complexity:</strong> O(1), as it operates in-place.</p>
          <p className="mt-2"><strong>5. Stability:</strong> Linear Search is a stable search algorithm since it preserves the relative order of equal elements.</p>
          <p className="mt-2"><strong>6. Usage:</strong> Linear Search is generally used in unsorted arrays where binary search cannot be applied.</p>
        </div>
      </div>
    </div>
  );
}
