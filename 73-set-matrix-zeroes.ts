import assert from "node:assert";
import path from "node:path";

export function setZeroes(matrix: number[][]) {
  const m = matrix.length;
  const n = matrix[0]?.length ?? 0;

  const topIndicators: (number | null)[] = new Array(n).fill(null);
  const leftIndicators: (number | null)[] = new Array(m).fill(null);

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const cell = matrix[i]![j]!;
      if (cell == 0) {
        topIndicators[j] = 0;
        leftIndicators[i] = 0;
      }
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      matrix[i]![j]! =
        topIndicators[j] === 0
          ? 0
          : leftIndicators[i] === 0
            ? 0
            : matrix[i]![j]!;
    }
  }
}

const inputA = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];
setZeroes(inputA);
assert.equal(
  inputA.join(","),
  [
    [1, 0, 1],
    [0, 0, 0],
    [1, 0, 1],
  ].join(","),
  `❗️ ${path.basename(__filename)} - Input A expected to pass!`,
);

const inputB = [
  [0, 1, 2, 0],
  [3, 4, 5, 2],
  [1, 3, 1, 5],
];

setZeroes(inputB);
assert.equal(
  inputB.join(","),
  [
    [0, 0, 0, 0],
    [0, 4, 5, 0],
    [0, 3, 1, 0],
  ].join(","),
  `❗️ ${path.basename(__filename)} - Input B expected to pass!`,
);
console.log(`✅ ${path.basename(__filename)}`);
