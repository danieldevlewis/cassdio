// You are given a file system represented as an objects
// where keys are absolute paths and values are either nulls
// (real file/directory) or a strings
// (a symlink pointing to another path).
//
// Write a function that resolves a given path to its realm
// destination, following symlinks along the way.

import test from "node:test";
import assert from "node:assert";

function resolvePath(
  fs: { [key: string]: string | null },
  path: string,
): string | null {
  const history = [path];
  let cursor: string | null = path;
  while ((cursor = fs[cursor])) {
    if (history.includes(cursor)) {
      return null;
    }
    history.push(cursor);
  }
  return history.at(-1) ?? null;
}

const fs = {
  "/a": "/b",
  "/b": "/c",
  "/c": null,
  "/loop1": "/loop2",
  "/loop2": "/loop1",
  "/real": null,
  "/alias": "/real",
};

test("scenario 1", () => {
  assert.equal(resolvePath(fs, "/a"), "/c");
});

test("scenario 2", () => {
  assert.equal(resolvePath(fs, "/alias"), "/real");
});

test("scenario 3", () => {
  assert.equal(resolvePath(fs, "/loop1"), null);
});

test("scenario 4", () => {
  assert.equal(resolvePath(fs, "/real"), "/real");
});
