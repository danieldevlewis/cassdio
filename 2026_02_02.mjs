// February 2026 is a perfect month!
//
// Write a function that returns the closest
// previous and next perfect month around the
// given Gregorian year.

import test from "node:test";
import assert from "node:assert";

// It has to be a February - only month divisible by 7
// Can't be a leap year as no longer divisible by 7
// From the tests it seems we allow ISO and Sunday based weeks

function* generatePerfectMonth(year, next) {
  do {
    if (new Date(year, 1, 29).getMonth() === 1) {
      // Not a leap year - (crude!)
      continue;
    }
    if (new Date(year, 1, 1).getDay(year) <= 1) {
      // Sunday OR Monday
      yield `${year}-02`;
    }
  } while ((year = next(year)));
}

function nearestPerfectMonth(year) {
  return {
    prev: generatePerfectMonth(year, (y) => y - 1).next().value,
    next: generatePerfectMonth(year + 1, (y) => y + 1).next().value,
  };
}

test("2025", () => {
  assert.deepEqual(nearestPerfectMonth(2025), {
    prev: "2021-02",
    next: "2026-02",
  });
});

test("2026", () => {
  assert.deepEqual(nearestPerfectMonth(2026), {
    prev: "2026-02",
    next: "2027-02",
  });
});

test("Not leap years", () => {
  assert.deepEqual(nearestPerfectMonth(2016), {
    prev: "2015-02",
    next: "2021-02",
  });
});
