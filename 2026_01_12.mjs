// Given an array of objects representing bears in a forest,
// each with a name and hunger level,
// return the names of all bears whose hunger level is above the forest average,
// sorted alphabetically.
//
// In how few lines can you do this one?

import test from "node:test";
import assert from "node:assert";

export function hungryBears(bears) {
  const average = bears.reduce((s, b) => s + b.hunger, 0) / bears.length;
  return bears
    .filter((b) => b.hunger > average)
    .map((b) => b.name)
    .sort();
}

test("scenario 1", () => {
  const bears = [
    { name: "Baloo", hunger: 6 },
    { name: "Yogi", hunger: 9 },
    { name: "Paddington", hunger: 4 },
    { name: "Winnie", hunger: 10 },
    { name: "Chicago", hunger: 20 },
  ];
  assert.deepStrictEqual(hungryBears(bears), ["Chicago", "Winnie"]);
});
