import assert from "node:assert";
import path from "node:path";

function spiralOrder(matrix: number[][]): number[] {
  const result: number[] = [];
  let i = 0;
  let rowIndex = 0;
  let colIndex = 0;
  let rowDirection = 0;
  let colDirection = 1;
  let left = 0;
  let top = 0;
  let bottom = matrix.length;
  let right = matrix[0]?.length ?? 0;
  const totalIterationCount = bottom * right;
  while (i < totalIterationCount) {
    const row = matrix[rowIndex] as unknown as number[];
    result.push(row[colIndex] as unknown as number);

    const colBoundaryReached =
      (colIndex == left && colDirection == -1) ||
      (colIndex == right - 1 && colDirection == 1);
    const rowBoundaryReached =
      (rowIndex == top && rowDirection == -1) ||
      (rowIndex == bottom - 1 && rowDirection == 1);

    if (colBoundaryReached) {
      rowDirection = colDirection == 1 ? 1 : -1;

      if (colDirection == 1) {
        top++;
      } else {
        bottom--;
      }

      colDirection = 0;
    }

    if (rowBoundaryReached) {
      colDirection = rowDirection == -1 ? 1 : -1;

      if (rowDirection == 1) {
        right--;
      } else {
        left++;
      }

      rowDirection = 0;
    }

    rowIndex += rowDirection;
    colIndex += colDirection;
    i++;
  }

  return result;
}

const inputA = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const expectedA = [1, 2, 3, 6, 9, 8, 7, 4, 5];

assert.deepStrictEqual(
  spiralOrder(inputA).join(","),
  expectedA.join(","),
  "❗️ExampleA failed!",
);

const inputB = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];
const expectedB = [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7];
assert.strictEqual(
  spiralOrder(inputB).join(","),
  expectedB.join(","),
  "❗️ExampleB failed!",
);

console.log(`✅ ${path.basename(__filename)}`);
