// Given an integer array and a number n,
// move all of the ns to the end of the arrays
// while maintaining the relative order of the non-ns.
//
// Bonus: do this without making a copy of the array!

import test from "node:test";
import assert from "node:assert";

function moveNums(array, move) {
  let i = 0;
  let last = array.length;
  do {
    if (array[i] === move) {
      array.push(...array.splice(i, 1));
      last -= 1;
    } else {
      i += 1;
    }
  } while (i < last);
  return array;
}

test("example", () => {
  assert.deepEqual(moveNums([0, 2, 0, 3, 10], 0), [2, 3, 10, 0, 0]);
});

test("no-op", () => {
  assert.deepEqual(moveNums([0, 2, 0, 3, 10], 1), [0, 2, 0, 3, 10]);
});

test("all-same", () => {
  assert.deepEqual(moveNums([0, 0, 0, 0, 0], 0), [0, 0, 0, 0, 0]);
});

test("no array copy", () => {
  const array = [0, 2];
  const result = moveNums(array, 0);
  assert.equal(array, result);
});
