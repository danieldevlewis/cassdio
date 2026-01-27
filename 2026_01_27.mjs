// You are given a string consisting of lowercase words,
// each separated by a single space.
//
// Determine how many vowels appear in the first word.
// Then, reverse each following word that has the same vowel count.

import test from "node:test";
import assert from "node:assert";

function vowelCount(string) {
  return string.replace(/[^aeiou]/g, "").length;
}

function flippedy(string) {
  const [first, ...others] = string.split(" ");
  const vowels = vowelCount(first);
  return [
    first,
    ...others.map((word) => {
      if (vowelCount(word) === vowels) {
        return word.split("").reverse().join("");
      }
      return word;
    }),
  ].join(" ");
}

test("scenario 1", () => {
  assert.equal(flippedy("cat and mice"), "cat dna mice");
});

test("scenario 2", () => {
  assert.equal(flippedy("banana healthy"), "banana healthy");
});
