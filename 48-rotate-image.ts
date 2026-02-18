import assert from "node:assert";
import path from "node:path";

function rotate(matrix: number[][]): void {
  const n = matrix.length - 1;

  for (let i = 0; i < Math.floor(matrix.length / 2); i++) {
    for (let j = i; j < n - i; j++) {
      const x = j - n / 2;
      const y = n / 2 - i;

      let swapX = y;
      let swapY = -x;

      let [swapI, swapJ] = [n / 2 - swapY, swapX + n / 2];

      const value = matrix[i]![j]!;
      let swapValue = matrix[swapI]![swapJ]!;

      matrix[i]![j] = swapValue;
      matrix[swapI]![swapJ] = value;

      while (swapI !== i || swapJ !== j) {
        const oldSwapValue = swapValue;
        const oldSwapX = swapX;
        const oldSwapY = swapY;

        swapX = oldSwapY;
        swapY = -oldSwapX;

        [swapI, swapJ] = [n / 2 - swapY, swapX + n / 2];
        swapValue = matrix[swapI]![swapJ]!;

        matrix[i]![j] = swapValue;
        matrix[swapI]![swapJ] = oldSwapValue;
      }
    }
  }
}

const inputB: number[][] = [
  [5, 1, 9, 11],
  [2, 4, 8, 10],
  [13, 3, 6, 7],
  [15, 14, 12, 16],
];

rotate(inputB);

assert.equal(
  inputB.join(","),
  [
    [15, 13, 2, 5],
    [14, 3, 4, 1],
    [12, 6, 8, 9],
    [16, 7, 10, 11],
  ].join(","),
  "❗️ InputB Failed!!!",
);

const inputA: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

rotate(inputA);

assert.equal(
  inputA.join(","),
  [
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3],
  ].join(","),
  "❗️ InputA Failed!!!",
);

console.log(`✅ ${path.basename(__filename)}`);
