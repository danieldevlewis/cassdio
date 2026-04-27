// You are given a 2D grid where 1 represents an intact tile
// and 0 represents a broken tile.
//
// A "broken region" is a group of connected 0s (connected horizontally or vertically).
// Find the minimum number of tiles you need to repair to ensure no broken region has an area larger than k.

import test from "node:test";
import assert from "node:assert";

type Coord = [number, number];
type Square = 0 | 1;

function* combinations<T>(items: Array<T>, count: number): Generator<Array<T>> {
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

// Find a set of all continuous regions
function findRegions(holes: Coord[]): Set<Set<Coord>> {
  // Our final continuous regions
  const regions = new Set<Set<Coord>>();
  // Map each hole to a region
  const regionMap = new Map<Coord, Set<Coord>>();
  // Map a string coord to a hole
  const coordMap = new Map<string, Coord>();

  // Create a region for each hole and populate the maps
  holes.forEach((coord) => {
    coordMap.set(`${coord[0]},${coord[1]}`, coord);
    const region = new Set([coord]);
    regions.add(region);
    regionMap.set(coord, region);
  });

  holes.forEach((hole) => {
    const [x, y] = hole;
    const region = regionMap.get(hole);
    // Try item left and below our hole
    [`${x + 1},${y}`, `${x},${y + 1}`].forEach((s) => {
      // If it is a hole
      const newCoord = coordMap.get(s);
      if (region && newCoord) {
        const newRegion = regionMap.get(newCoord);
        // If it is a different region combine the regions together
        // and update the regionMap
        if (newRegion && region !== newRegion) {
          regionMap.delete(newCoord);
          regions.delete(newRegion);
          newRegion.forEach((coord) => {
            region.add(coord);
            regionMap.set(coord, region);
          });
        }
      }
    });
  });
  return regions;
}

function minRepairs(grid: Square[][], k: number): number {
  const holes: Coord[] = grid.flatMap((row, y) =>
    row
      .map((v, x) => [v, x, y])
      .filter(([v]) => v === 0)
      .map(([, x, y]) => [x, y] as Coord),
  );

  if (k === 0 && holes.length === 0) {
    return 0;
  }

  for (let i = 0; i <= holes.length; i += 1) {
    // Find each unique combination of holes for count i
    for (const holeSet of combinations(holes, i)) {
      // Repair our set of holes
      const newHoles = new Set(holes).difference(new Set(holeSet));
      // Work out the largest continuous area
      const maxSize = Math.max(
        ...[...findRegions([...newHoles])].map((s) => s.size),
      );
      if (maxSize <= k) {
        return i;
      }
    }
  }

  // This is not possible as you can always repair all holes,
  // but keeps the type signature happy
  return -1;
}

test("scenario 1", () => {
  assert.equal(
    minRepairs(
      [
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 1, 0, 1],
        [0, 0, 1, 1],
      ],
      1,
    ),
    3,
  );
});

test("scenario 2", () => {
  assert.equal(
    minRepairs(
      [
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 1, 0, 1],
        [0, 1, 1, 1],
      ],
      2,
    ),
    2,
  );
});

test("no holes", () => {
  assert.equal(
    minRepairs(
      [
        [1, 1],
        [1, 1],
      ],
      0,
    ),
    0,
  );
});

test("no repairs required", () => {
  assert.equal(
    minRepairs(
      [
        [1, 0],
        [1, 0],
      ],
      2,
    ),
    0,
  );
});

test("all repairs required", () => {
  assert.equal(
    minRepairs(
      [
        [0, 0],
        [0, 0],
      ],
      0,
    ),
    4,
  );
});

test("negative k", () => {
  assert.equal(
    minRepairs(
      [
        [0, 0],
        [0, 0],
      ],
      -1,
    ),
    4,
  );
});
