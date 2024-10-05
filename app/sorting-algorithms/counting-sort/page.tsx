'use client'
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import generateArray from '@/utils/generateArray'; // Import the utility

export default function CountingSort() {
  const [array, setArray] = useState(generateArray(50, 999));
  const [algorithm] = useState('Counting Sort');
  const [speed] = useState(100); // Sorting speed

  useEffect(() => {
    setArray(generateArray(50, 999)); // Use the utility function
  }, []);

  const handleShuffle = () => {
    setArray(generateArray(50, 999)); // Use the utility function
  };

  const handleSort = async () => {
    if (algorithm === 'Counting Sort') {
      await countingSort(); 
    }
  };

  const countingSort = async () => {
    const arr = array.slice();
    const n = arr.length;

    // Find the maximum element in the array to determine the range of counting
    const max = Math.max(...arr);

    // Initialize the count array
    const count = Array(max + 1).fill(0);

    // Count the occurrences of each element
    for (let i = 0; i < n; i++) {
      count[arr[i]]++;
    }

    // Reconstruct the sorted array based on the count array
    let index = 0;
    for (let i = 0; i <= max; i++) {
      while (count[i] > 0) {
        arr[index] = i;
        setArray([...arr]); // Update the array visually
        await new Promise((resolve) => setTimeout(resolve, speed)); // Visualize the sorting process
        index++;
        count[i]--;
      }
    }
  };

  return (
    <div>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div>
            <h2 className='text-3xl text-accent'>Counting Sort</h2>
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

        {/* Technical overview of Counting Sort */}
        <div className="mt-8 p-4 rounded shadow-lg">
          <h3 className="text-2xl font-bold">Counting Sort - Technical Overview</h3>
          <p className="mt-2"><strong>1. Algorithm Description:</strong> Counting Sort is an integer sorting algorithm that counts the occurrences of each distinct element in the input, then calculates their position in the sorted array.</p>
          
          <p className="mt-2"><strong>2. Steps of Counting Sort:</strong></p>
          <ul className="list-disc list-inside">
            <li>Find the maximum value in the array to create the count array.</li>
            <li>Count the occurrences of each element in the input array.</li>
            <li>Use the count array to place elements in the correct order in the output array.</li>
            <li>Iterate over the count array to build the sorted array.</li>
          </ul>

          <p className="mt-2"><strong>3. Time Complexity:</strong> O(n + k), where n is the number of elements in the input array, and k is the range of the input values.</p>
          <p className="mt-2"><strong>4. Space Complexity:</strong> O(n + k), where additional space is required for the count array.</p>
          <p className="mt-2"><strong>5. Stability:</strong> Counting Sort is a stable sorting algorithm.</p>
          <p className="mt-2"><strong>6. Limitations:</strong> Counting Sort is effective when the range of input elements (k) is not significantly larger than the number of elements (n). Otherwise, it may require large amounts of memory.</p>
        </div>
      </div>
    </div>
  );
}
