// You have a 2D grid of numbers.
// Write a function that zooms in by an integer factor k >= 2
// by turning each cell into a k x k block with the same value,
// returning the bigger grid.

import test from "node:test";
import assert from "node:assert";

function zoom(input: number[][], size: number): number[][] {
  const result: number[][] = [];
  for (let y = 0; y < input.length * size; y += 1) {
    result[y] = [];
    for (let x = 0; x < input[0].length * size; x += 1) {
      result[y][x] = input[Math.floor(y / size)][Math.floor(x / size)];
    }
  }
  return result;
}

test("scenario 1", () => {
  assert.deepEqual(
    zoom(
      [
        [1, 2],
        [3, 4],
      ],
      2,
    ),
    [
      [1, 1, 2, 2],
      [1, 1, 2, 2],
      [3, 3, 4, 4],
      [3, 3, 4, 4],
    ],
  );
});

test("scenario 2", () => {
  assert.deepEqual(zoom([[7, 8, 9]], 3), [
    [7, 7, 7, 8, 8, 8, 9, 9, 9],
    [7, 7, 7, 8, 8, 8, 9, 9, 9],
    [7, 7, 7, 8, 8, 8, 9, 9, 9],
  ]);
});

test("scenario 3", () => {
  assert.deepEqual(zoom([[1], [2]], 3), [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [2, 2, 2],
    [2, 2, 2],
    [2, 2, 2],
  ]);
});
