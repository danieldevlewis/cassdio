// Given a string str, find a contiguous substring of length 10
// whose characters can be bijectively mapped to the moves
// {U,D,L,R,B,A} so that the substring decodes to the Konami
// code "UUDDLRLRBA" (a character always maps to the same move,
// and two different moves can’t share a character).
//
// Return a valid mapping as an object.

import test from "node:test";
import assert from "node:assert";

function konamiMapping(string) {
  for (const result of string.matchAll(/(.)\1(.)\2(.)(.)\3\4(.)(.)/g)) {
    if (new Set(result.slice(1, 7)).size === 6) {
      return Object.fromEntries(
        "UDLRBA".split("").map((c, i) => [result[i + 1], c]),
      );
    }
  }
}

test("scenario 1", () => {
  assert.deepEqual(konamiMapping("xx2233454590yy11110"), {
    0: "A",
    2: "U",
    3: "D",
    4: "L",
    5: "R",
    9: "B",
  });
});

test("scenario 2", () => {
  assert.deepEqual(konamiMapping("sduwahoda22ii0d0dbn"), {
    0: "L",
    2: "U",
    i: "D",
    d: "R",
    b: "B",
    n: "A",
  });
});

test("scenario - invalid repeats", () => {
  assert.deepEqual(konamiMapping("22220d0dbb22ii0d0dbn"), {
    0: "L",
    2: "U",
    i: "D",
    d: "R",
    b: "B",
    n: "A",
  });
});
