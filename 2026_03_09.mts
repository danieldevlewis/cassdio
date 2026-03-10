// Given a string s consisting only of 'a' and 'b',
// you may swap adjacent characters any number of times.
// Return the minimum number of adjacent swaps needed to transform s into an alternating string,
// either "ababab..." or "bababa...", or return -1 if it's impossible.

import test from "node:test";
import assert from "node:assert";

function minSwapsToAlternate(string: string): number {
  const array = string.split("");
  let swaps = 0;
  let char: string;
  let count = 0;
  for (let i = 0; i < array.length; ) {
    char ||= array[i];
    if (array[i - 1] === array[i] && array[i + 1] !== array[i]) {
      if (array[i] === char) {
        count -= 1;
      }
      array.splice(i, 2, array[i + 1], array[i]);
      i -= 1;
      swaps += 1;
    } else {
      if (array[i] === char) {
        count += 1;
      }
      i += 1;
    }
  }
  if (string.length / 2 > count + 0.5 || string.length / 2 < count - 0.5) {
    return -1;
  }
  return swaps;
}

test("scenario 1", () => {
  assert.equal(1, minSwapsToAlternate("aabb"));
});

test("scenario 2", () => {
  assert.equal(-1, minSwapsToAlternate("aaab"));
});

test("scenario 3", () => {
  assert.equal(6, minSwapsToAlternate("aaaabbbb"));
});

test("scenario 4", () => {
  assert.equal(1, minSwapsToAlternate("aab"));
});

test("scenario 5", () => {
  assert.equal(1, minSwapsToAlternate("abb"));
});

test("scenario 6", () => {
  assert.equal(0, minSwapsToAlternate("ababa"));
});

test("scenario 7", () => {
  assert.equal(1, minSwapsToAlternate("abbaa"));
});

test("scenario 8", () => {
  assert.equal(3, minSwapsToAlternate("aaabbba"));
});
