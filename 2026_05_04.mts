// Given an array of positive integers,
// find the length of the longest subsequence where every
// adjacent pair of elements in the subsequence is
// coprime (where the greatest common divisor, or GCD, is 1).

import test from "node:test";
import assert from "node:assert";

export function greatestCommonDivider(a: number, b: number): number {
  while (b !== 0) {
    let x = b;
    b = a % b;
    a = x;
  }
  return a;
}

function longestCoprimeSubsequence(numbers: number[]): number {
  const seq: number[] = [];
  let i = 0;
  let j = 1;
  while (j < numbers.length) {
    if (greatestCommonDivider(numbers[i], numbers[j]) === 1) {
      seq.push(numbers[i], numbers[j]);
      i += 1;
      j += 1;
    } else {
      j += 1;
    }
  }
  return seq.length || (numbers.length > 0 ? 1 : 0);
}

test("no coprime", () => {
  assert.equal(longestCoprimeSubsequence([6, 12, 4, 8]), 1);
});

test("adjacent match", () => {
  assert.equal(longestCoprimeSubsequence([4, 3]), 2);
});

test("split match", () => {
  assert.equal(longestCoprimeSubsequence([4, 12, 24, 3]), 2);
});

test("coprime", () => {
  // [4, 3, 7, 2], where gcd(4,3)=1, gcd(3,7)=1, gcd(7,2)=1
  assert.equal(longestCoprimeSubsequence([4, 3, 6, 9, 7, 2]), 4);
});

test("empty", () => {
  assert.equal(longestCoprimeSubsequence([]), 0);
});
