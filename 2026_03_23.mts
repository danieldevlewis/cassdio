// Given a text string and a pattern,
// implement a fuzzy string search using the Bitap algorithm
// that finds all positions in the text where the pattern matches
// with at most k errors (insertions, deletions, or substitutions).
// Return an array of objects containing the position and the number of errors at that match.

// Note: The examples only include substitution.
// Getting the position for insertion and deletion is actually really hard so I'm not sure it was intended

import test from "node:test";
import assert from "node:assert";

function* fuzzySearch(text: string, pattern: string, k: number = 0) {
  const m = pattern.length;
  const patternMask = Array(256).fill(0);

  for (let i = 0; i < m; ++i) {
    patternMask[pattern.charCodeAt(i)] |= 1 << i;
  }

  let s = Array(k + 1).fill(0);
  for (let i = 0; i < text.length; i++) {
    const newS = Array(k + 1).fill(0);
    for (let j = 0; j <= k; j += 1) {
      const match = ((s[j] << 1) | 1) & patternMask[text[i].charCodeAt(0)];
      if (j === 0) {
        newS[j] = match;
      } else {
        const insertion = (s[j - 1] << 1) | 1;
        const deletion = s[j - 1];

        newS[j] = match | insertion | deletion;
      }
    }
    for (let j = 0; j <= k; j += 1) {
      if (newS[j] & (1 << (m - 1))) {
        yield { position: i - m + 1, errors: j };
        break;
      }
    }
    s = newS;
  }
}

test("scenario 1", () => {
  assert.deepEqual(
    [...fuzzySearch("the cat sat on the mat", "cat", 0)],
    [{ position: 4, errors: 0 }],
  );
});

test("scenario 2", () => {
  assert.deepEqual([...fuzzySearch("cassidoo", "cool", 1)], []);
});

test("no errors", () => {
  assert.deepEqual(
    [...fuzzySearch("test", "test", 4)],
    [{ errors: 0, position: 0 }],
  );
});

test("1 substitution first character", () => {
  assert.deepEqual(
    [...fuzzySearch("xest", "test", 4)],
    [{ errors: 1, position: 0 }],
  );
});

test("1 substitution second character", () => {
  assert.deepEqual(
    [...fuzzySearch("txst", "test", 4)],
    [{ errors: 1, position: 0 }],
  );
});

test("1 substitution third character", () => {
  assert.deepEqual(
    [...fuzzySearch("text", "test", 4)],
    [{ errors: 1, position: 0 }],
  );
});

test("1 substitution fourth character", () => {
  assert.deepEqual(
    [...fuzzySearch("tesx", "test", 4)],
    [{ errors: 1, position: 0 }],
  );
});

test("2 substitutions start and end", () => {
  assert.deepEqual(
    [...fuzzySearch("xesx", "test", 4)],
    [{ errors: 2, position: 0 }],
  );
});

test("2 substitutions middle", () => {
  assert.deepEqual(
    [...fuzzySearch("txxt", "test", 4)],
    [{ errors: 2, position: 0 }],
  );
});

test("3 substitutions", () => {
  assert.deepEqual(
    [...fuzzySearch("xxxt", "test", 4)],
    [{ errors: 3, position: 0 }],
  );
});

test("4 substitutions", () => {
  assert.deepEqual(
    [...fuzzySearch("xxxx", "test", 4)],
    [{ errors: 4, position: 0 }],
  );
});
