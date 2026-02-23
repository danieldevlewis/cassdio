// Given an array of integers, find the contiguous sub array
// that has the largest sum and return that sum.
// A subarray must contain at least one element.
// If all elements are negative, return the largest (least negative) value

import test from "node:test";
import assert from "node:assert";

// My algorithum O(n^2) - less efficient but works
// function maxSubarraySum(array: number[]): number {
//   let max = -Infinity;
//   for (let i = 0; i < array.length; i += 1) {
//     let sum = 0;
//     for (let j = i; j < array.length; j += 1) {
//       sum += array[j];
//       max = Math.max(sum, max);
//     }
//   }
//   return max;
// }

// Kadane (looked up on Wikipedia) - most efficient O(n)
function maxSubarraySum(array: number[]): number {
  let max = -Infinity;
  let current = 0;
  for (const n of array) {
    current = Math.max(n, current + n);
    max = Math.max(current, max);
  }
  return max;
}

test("scenario 1", () => {
  assert.equal(maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4]), 6);
});

test("scenario 2", () => {
  assert.equal(maxSubarraySum([5]), 5);
});

test("scenario 3", () => {
  assert.equal(maxSubarraySum([-1, -2, -3, -4]), -1);
});

test("scenario 4", () => {
  assert.equal(maxSubarraySum([5, 4, -1, 7, 8]), 23);
});
