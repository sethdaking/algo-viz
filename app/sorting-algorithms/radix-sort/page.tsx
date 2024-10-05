'use client'
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import generateArray from '@/utils/generateArray'; // Import the utility

export default function RadixSort() {
  const [array, setArray] = useState(generateArray(50, 999)); // Set a range up to 999 for multiple digits
  const [algorithm] = useState('Radix Sort');
  const [speed] = useState(100); // Sorting speed

  useEffect(() => {
    setArray(generateArray(50, 999)); // Use the utility function, generating numbers with up to 3 digits
  }, []);

  const handleShuffle = () => {
    setArray(generateArray(50, 999)); // Shuffle generates new random numbers
  };

  const handleSort = async () => {
    if (algorithm === 'Radix Sort') {
      await radixSort(); 
    }
  };

  const getMax = (arr: number[]) => Math.max(...arr); // Helper function to get the maximum number

  const countingSortForRadix = async (arr: number[], exp: number) => {
    const n = arr.length;
    const output = new Array(n).fill(0); // Output array to store the sorted values
    const count = new Array(10).fill(0); // Count array for digits (0-9)

    // Count the occurrences of digits at exp position
    for (let i = 0; i < n; i++) {
      const index = Math.floor(arr[i] / exp) % 10;
      count[index]++;
    }

    // Change count[i] to store actual positions
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
      const index = Math.floor(arr[i] / exp) % 10;
      output[count[index] - 1] = arr[i];
      count[index]--;
    }

    // Copy the output array to arr[], to be sorted according to the current digit
    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
      setArray([...arr]); // Update the array visually
      await new Promise((resolve) => setTimeout(resolve, speed)); // Visualize sorting step
    }
  };

  const radixSort = async () => {
    const arr = array.slice();
    const max = getMax(arr);

    // Perform counting sort for every digit, starting from least significant to most significant
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      await countingSortForRadix(arr, exp);
    }
  };

  return (
    <div>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div>
            <h2 className='text-3xl text-accent'>Radix Sort</h2>
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

        {/* Technical overview of Radix Sort */}
        <div className="mt-8  p-4 rounded shadow-lg">
          <h3 className="text-2xl font-bold">Radix Sort - Technical Overview</h3>
          <p className="mt-2"><strong>1. Algorithm Description:</strong> Radix Sort is a non-comparative sorting algorithm that works by sorting integers digit by digit, from the least significant digit (LSD) to the most significant digit (MSD).</p>
          
          <p className="mt-2"><strong>2. Steps of Radix Sort:</strong></p>
          <ul className="list-disc list-inside">
            <li>Find the maximum number in the array to determine the number of digits.</li>
            <li>Perform Counting Sort for each digit, starting from the least significant digit.</li>
            <li>Move up to the next digit and repeat until all digits are sorted.</li>
          </ul>

          <p className="mt-2"><strong>3. Time Complexity:</strong> O(d * (n + k)), where n is the number of elements, d is the number of digits in the maximum number, and k is the range of digits (0-9).</p>
          <p className="mt-2"><strong>4. Space Complexity:</strong> O(n + k), where additional space is required for the output and count arrays.</p>
          <p className="mt-2"><strong>5. Stability:</strong> Radix Sort is a stable sorting algorithm.</p>
          <p className="mt-2"><strong>6. Optimizations:</strong> Radix Sort is most effective when the number of digits is much smaller than the number of elements. It is generally faster than comparison-based algorithms like QuickSort and MergeSort for sorting large numbers with a small range of digits.</p>
        </div>
      </div>
    </div>
  );
}
