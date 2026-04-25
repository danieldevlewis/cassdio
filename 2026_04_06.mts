// Given an integer n,
// return all unique combinations of Perrin number's
// (up to and including the nth Perrin number)
// that sum to a target value k,
// where each Perrin number can be used at most once.
// Return the combinations sorted in ascending order.

import test from "node:test";
import assert from "node:assert";

function* perrin(): Generator<number> {
  let numbers = [3, 0, 2];
  yield 3;
  yield 0;
  yield 2;
  let i = 3;
  while (true) {
    const p = numbers[i - 2] + numbers[i - 3];
    numbers.push(p);
    yield p;
    i += 1;
  }
}

export function* combinations<T>(
  items: Array<T>,
  count: number,
): Generator<Array<T>> {
  if (count === 0) {
    yield [];
    return;
  }
  for (let i = 0; i < items.length; i += 1) {
    for (const values of combinations(items.slice(i + 1), count - 1)) {
      yield [items[i], ...values];
    }
  }
}

function unique<T>(a: Array<T>): Array<T> {
  const r: Array<T> = [];
  for (const v of a) {
    if (!r.includes(v)) {
      r.push(v);
    }
  }
  return r;
}

function* perrinCombinations(n: number, sum: number): Generator<number[]> {
  const numbers = unique([...perrin().take(n + 1)]);
  for (let i = numbers.length; i > 0; i -= 1) {
    yield* combinations(numbers, i)
      .filter((numbers) => numbers.reduce((c, n) => c + n, 0) === sum)
      .map((numbers) => numbers.sort((a, b) => a - b))
      .toArray()
      .sort((a, b) => a[0] - b[0]);
  }
  return [];
}

test("scenario 1", () => {
  assert.deepEqual(
    [...perrinCombinations(7, 12)],
    [
      [0, 2, 3, 7],
      [0, 5, 7],
      [2, 3, 7],
      [5, 7],
    ],
  );
});

test("scenario 2", () => {
  assert.deepEqual(
    [...perrinCombinations(6, 5)],
    [[0, 2, 3], [0, 5], [2, 3], [5]],
  );
});
