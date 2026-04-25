// You're building a pizza ordering system that enforces
// strict ingredient layering rules. Given an array of
// pizza layers (bottom to top) and a set of rules where
// each rule states that ingredient A must appear some where
// below ingredient B, write a function that determines whether
// the pizza is valid. If any rule is violated,
// return the pair [A, B] that was violated first (in the order the rules are given).
// If the pizza is valid, return true.

import test from "node:test";
import assert from "node:assert";

function validatePizza(
  layers: string[],
  rules: [string, string][],
): [string, string] | true {
  for (const [a, b] of rules) {
    if (layers.indexOf(a) > layers.indexOf(b)) {
      return [a, b];
    }
  }
  return true;
}

const layers = ["dough", "sauce", "cheese", "pepperoni", "basil"];

test("scenario 1", () => {
  assert.equal(
    validatePizza(layers, [
      ["sauce", "cheese"],
      ["cheese", "pepperoni"],
      ["dough", "basil"],
    ]),
    true,
  );
});

test("scenario 2", () => {
  assert.deepEqual(
    validatePizza(layers, [
      ["cheese", "pepperoni"],
      ["cheese", "sauce"], // "it's under the sauce"
    ]),
    ["cheese", "sauce"],
  );
});
