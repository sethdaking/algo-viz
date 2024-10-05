'use client'
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import generateArray from '@/utils/generateArray'; // Import utility for generating sorted array

export default function InterpolationSearchComponent() {
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

  const handleInterpolationSearch = async () => {
    if (target !== null) {
      const index = await interpolationSearch(target);
      setResultIndex(index);
    }
  };

  const interpolationSearch = async (target: number) => {
    let low = 0;
    let high = array.length - 1;

    while (low <= high && target >= array[low].value && target <= array[high].value) {
      // Estimate the position
      const pos = low + Math.floor(((target - array[low].value) * (high - low)) / (array[high].value - array[low].value));

      highlightArray([pos]); // Highlight the current position
      await new Promise((resolve) => setTimeout(resolve, speed)); // Delay for visualization

      if (array[pos].value === target) {
        return pos; // Target found
      }

      if (array[pos].value < target) {
        low = pos + 1; // Move to the right
      } else {
        high = pos - 1; // Move to the left
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
            <h2 className='text-3xl text-accent'>Interpolation Search</h2>
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
            <Button onClick={handleInterpolationSearch} className="px-4 py-2 rounded-full ml-2">
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

        {/* Technical overview of Interpolation Search */}
        <div className="mt-8 p-4 rounded shadow-lg">
          <h3 className="text-2xl font-bold">Interpolation Search - Technical Overview</h3>
          <p className="mt-2"><strong>1. Algorithm Description:</strong> Interpolation Search improves upon binary search for uniformly distributed data by estimating the position of the target value.</p>
          
          <p className="mt-2"><strong>2. Steps of Interpolation Search:</strong></p>
          <ul className="list-disc list-inside">
            <li>Start with low and high indices.</li>
            <li>Estimate the position of the target based on the values at low and high.</li>
            <li>If the target is found at the estimated position, return the index.</li>
            <li>If the target is less than the value at the estimated position, search the left half; otherwise, search the right half.</li>
          </ul>

          <p className="mt-2"><strong>3. Time Complexity:</strong> O(log log n) on average, O(n) in the worst case when data is not uniformly distributed.</p>
          <p className="mt-2"><strong>4. Space Complexity:</strong> O(1), as it operates in-place.</p>
          <p className="mt-2"><strong>5. Stability:</strong> Interpolation Search is not a stable search algorithm.</p>
          <p className="mt-2"><strong>6. Usage:</strong> Useful for searching in large, uniformly distributed datasets.</p>
        </div>
      </div>
    </div>
  );
}
