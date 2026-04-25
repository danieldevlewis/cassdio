// Given a string s containing letters and ? wild cards
// (that can match any letter), and a target pattern string pattern,
// rearrange the entire string however you like.
//
// Return the maximum number of non-overlapping copies
// of pattern that can appear in the rearranged result.

import test from "node:test";
import assert from "node:assert";

function maxPatternCopies(pattern: string, target: string): number {
  const letters = pattern.split("");
  let count = 0;
  while (true) {
    for (const letter of target) {
      let index = letters.indexOf(letter);
      if (index === -1) {
        index = letters.indexOf("?");
      }
      if (index === -1) {
        return count;
      }
      letters.splice(index, 1);
    }
    count += 1;
  }
}

test("scenario 1", () => {
  assert.equal(maxPatternCopies("abcabc???", "ac"), 3);
});

test("scenario 2", () => {
  assert.equal(maxPatternCopies("aab??", "aab"), 1);
});

test("scenario 3", () => {
  assert.equal(maxPatternCopies("??????", "abc"), 2);
});

test("scenario no match", () => {
  assert.equal(maxPatternCopies("ffffff", "abc"), 0);
});
