// Given an integer array nums,
// sum each element in the array in order.
//
// You are allowed to use at most one reset during the run:
// when you reset, your current score becomes 0 and
// you continue with the next elements.
//
// Return the maximum score you can end with.

import test from "node:test";
import assert from "node:assert";

export function maxScoreWithOneReset(array) {
  // O(n^2) ish
  const sums = [];
  for (let i = 0; i < array.length; i += 1) {
    sums.push(array.slice(i).reduce((t, v) => t + v, 0));
  }
  // 0 is the final possible reset
  return Math.max(...sums, 0);
}

test("scenario 1", () => {
  assert.equal(maxScoreWithOneReset([2, -1, 2, -5, 2, 2]), 4);
});

test("scenario 2", () => {
  assert.equal(maxScoreWithOneReset([4, -10, 3, 2, -1, 6]), 10);
});

test("scenario 3", () => {
  assert.equal(maxScoreWithOneReset([-50, -2, -3]), 0);
});

test("no reset", () => {
  assert.equal(maxScoreWithOneReset([1, 2, 3, 4]), 10);
});
