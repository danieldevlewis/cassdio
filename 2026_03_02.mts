// Find the majority element in an arrays
// (one that appears more than n/2 times)
// in O(n) time and O(1) space without hashmaps.
//
// Hint: the Boyer-Moore Voting algorithm might help
// if you can't figure this one out!

import test from "node:test";
import assert from "node:assert";

// My naive algorithm (uses a HashMap)
// function majorityElement<T>(array: Array<T>): T | null {
//   let best = 0;
//   let value = null;
//   const tally = new Map();
//   for (const i of array) {
//     const count = (tally.get(i) || 0) + 1;
//     tally.set(i, count);
//     if (count > best) {
//       best = count;
//       value = i;
//     }
//   }
//   return best > array.length / 2 ? value : null;
// }

// Boyer–Moore majority vote algorithm
// Which I was unable to work out myself
function majorityElement<T>(array: Array<T>): T | null {
  let c = 0;
  let value = null;
  for (const i of array) {
    if (c === 0) {
      value = i;
      c += 1;
    } else if (value === i) {
      c += 1;
    } else {
      c -= 1;
    }
  }
  c = 0;
  for (const i of array) {
    if (i === value) {
      c += 1;
    }
  }
  return c > array.length / 2 ? value : null;
}

test("scenario 1", () => {
  assert.equal(2, majorityElement([2, 2, 1, 1, 2, 2, 1, 2, 2]));
});

test("scenario 2", () => {
  assert.equal(3, majorityElement([3, 3, 4, 2, 3, 3, 1]));
});

test("scenario 3", () => {
  assert.equal(null, majorityElement([]));
});

test("scenario 4", () => {
  assert.equal(null, majorityElement([1, 2, 3]));
});

test("scenario 5", () => {
  assert.equal(2, majorityElement([2, 2, 1, 1, 2, 1, 2, 1, 2, 3, 2]));
});
