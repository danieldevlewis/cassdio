// You're given a 2D grid representing a city where each
// cell is either empty (0), a fire station (1), or a building (2).
// Fire stations can serve buildings based on horizontal + verticals
// moves only.
//
// Return a 2D grid where each cell shows the minimum distanced
// to the nearest fire station.
//
// Notes:
//
// The second example clearly has an error, I have corrected this
//
// It does not specify if you can move through a building
// I assume you cannot move through buildings, you can only
// access a building from an empty square
//
// This might be an incorrect assumption

import test from "node:test";
import assert from "node:assert";

const moves = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function fireStationCoverage(grid: number[][]): number[][] {
  const queue: [number, [number, number]][] = [];
  const distances = grid.map((v) => Array(v.length).fill(null));
  const xLength = grid[0].length;
  for (const [y, row] of grid.entries()) {
    for (const [x, v] of row.entries()) {
      if (v === 1) {
        queue.push([0, [x, y]]);
      }
    }
  }

  while (queue.length > 0) {
    const [d, [x, y]] = queue.shift()!;
    if (distances[y][x] !== null) {
      continue;
    }
    distances[y][x] = d;
    if (grid[y][x] === 2) {
      continue;
    }
    for (const [dx, dy] of moves) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= xLength || ny >= grid.length) {
        // Off grid
        continue;
      }

      if (distances[ny][nx] === null) {
        queue.push([d + 1, [nx, ny]]);
      }
    }
    queue.sort(([a], [b]) => a - b);
  }

  return distances;
}

test("scenario 1", () => {
  assert.deepEqual(
    fireStationCoverage([
      [2, 0, 1],
      [0, 2, 0],
      [1, 0, 2],
    ]),
    [
      [2, 1, 0],
      [1, 2, 1],
      [0, 1, 2],
    ],
  );
});

test("scenario 2", () => {
  assert.deepEqual(
    fireStationCoverage([
      [1, 0, 0, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 1],
    ]),
    [
      [0, 1, 1, 0],
      [1, 2, 2, 1],
      [1, 2, 2, 1],
      [0, 1, 1, 0],
    ],
  );
});

test("scenario 3", () => {
  assert.deepEqual(
    fireStationCoverage([
      [1, 2, 0],
      [2, 2, 0],
      [0, 0, 0],
    ]),
    [
      [0, 1, null],
      [1, null, null],
      [null, null, null],
    ],
  );
});

test("scenario 4", () => {
  assert.deepEqual(
    fireStationCoverage([
      [1, 0, 0],
      [2, 2, 0],
      [0, 0, 0],
    ]),
    [
      [0, 1, 2],
      [1, 2, 3],
      [6, 5, 4],
    ],
  );
});
