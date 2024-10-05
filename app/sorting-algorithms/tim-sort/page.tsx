'use client'
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import generateArray from '@/utils/generateArray'; // Import the utility

export default function TimSortComponent() {
  const [array, setArray] = useState(generateArray(50, 999));
  const [algorithm] = useState('Tim Sort');
  const [speed] = useState(100); // Sorting speed
  const RUN = 32; // Small run size for insertion sort

  useEffect(() => {
    setArray(generateArray(50, 999)); // Generate random array on mount
  }, []);

  const handleShuffle = () => {
    setArray(generateArray(50, 999)); // Shuffle the array
  };

  const handleSort = async () => {
    if (algorithm === 'Tim Sort') {
      await timSort(); 
    }
  };

  // Insertion Sort for small runs
  const insertionSort = async (arr: number[], left: number, right: number) => {
    for (let i = left + 1; i <= right; i++) {
      const temp = arr[i];
      let j = i - 1;
      while (j >= left && arr[j] > temp) {
        arr[j + 1] = arr[j];
        j--;
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, speed));
      }
      arr[j + 1] = temp;
      setArray([...arr]);
    }
  };

  // Merge function to merge sorted runs
  const merge = async (arr: number[], l: number, m: number, r: number) => {
    const len1 = m - l + 1, len2 = r - m;
    const left = new Array(len1);
    const right = new Array(len2);

    for (let i = 0; i < len1; i++) left[i] = arr[l + i];
    for (let i = 0; i < len2; i++) right[i] = arr[m + 1 + i];

    let i = 0, j = 0, k = l;

    while (i < len1 && j < len2) {
      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }
      setArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, speed));
      k++;
    }

    while (i < len1) {
      arr[k] = left[i];
      i++;
      k++;
      setArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, speed));
    }

    while (j < len2) {
      arr[k] = right[j];
      j++;
      k++;
      setArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, speed));
    }
  };

  // Tim Sort algorithm
  const timSort = async () => {
    const arr = array.slice();
    const n = arr.length;

    // Sort individual subarrays of size RUN using Insertion Sort
    for (let i = 0; i < n; i += RUN) {
      await insertionSort(arr, i, Math.min(i + RUN - 1, n - 1));
    }

    // Merge sorted subarrays
    for (let size = RUN; size < n; size = 2 * size) {
      for (let left = 0; left < n; left += 2 * size) {
        const mid = left + size - 1;
        const right = Math.min(left + 2 * size - 1, n - 1);

        if (mid < right) {
          await merge(arr, left, mid, right);
        }
      }
    }
  };

  return (
    <div>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div>
            <h2 className='text-3xl text-accent'>Tim Sort</h2>
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

        {/* Technical overview of Tim Sort */}
        <div className="mt-8 p-4 rounded shadow-lg">
          <h3 className="text-2xl font-bold">Tim Sort - Technical Overview</h3>
          <p className="mt-2"><strong>1. Algorithm Description:</strong> Tim Sort is a hybrid sorting algorithm derived from Merge Sort and Insertion Sort. It takes advantage of naturally occurring runs (sorted sequences) in data and merges them efficiently.</p>
          
          <p className="mt-2"><strong>2. Steps of Tim Sort:</strong></p>
          <ul className="list-disc list-inside">
            <li>Break the array into small subarrays (runs) and sort each run using Insertion Sort.</li>
            <li>Merge the sorted runs using a merge function similar to Merge Sort.</li>
            <li>Repeat merging until the entire array is sorted.</li>
          </ul>

          <p className="mt-2"><strong>3. Time Complexity:</strong> O(n log n) in the worst and average case.</p>
          <p className="mt-2"><strong>4. Space Complexity:</strong> O(n) due to the auxiliary arrays used during merging.</p>
          <p className="mt-2"><strong>5. Stability:</strong> Tim Sort is a stable sorting algorithm.</p>
          <p className="mt-2"><strong>6. Optimizations:</strong> Tim Sort takes advantage of pre-sorted data (natural runs), making it efficient for real-world data. It also uses Insertion Sort for small arrays, which is faster for small input sizes.</p>
        </div>
      </div>
    </div>
  );
}
