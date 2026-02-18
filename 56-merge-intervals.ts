import assert from "node:assert";
import path from "node:path";

export function merge(intervals: number[][]): number[][] {
  if (intervals.length <= 1) {
    return intervals;
  }

  intervals.sort((intervalA, intervalB) => {
    return intervalA[0]! - intervalB[0]!;
  });

  const result: number[][] = [];

  for (
    let i = 1, a = intervals[0]![0]!, b = intervals[0]![1]!;
    i < intervals.length;
    i++
  ) {
    const currentStartValue = intervals[i]![0]!;
    const currentEndValue = intervals[i]![1]!;

    if (b < currentStartValue) {
      result.push([a, b]);

      a = currentStartValue;
      b = currentEndValue;
    } else if (currentEndValue > b) {
      b = currentEndValue;
    }

    if (i === intervals.length - 1) {
      result.push([a, b]);
    }
  }

  return result;
}

const inputA = [
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
];
const outputA = [
  [1, 6],
  [8, 10],
  [15, 18],
];
assert.equal(merge(inputA).join(","), outputA.join(","));

const inputB = [
  [1, 4],
  [4, 5],
];
const outputB = [[1, 5]];
assert.equal(merge(inputB).join(","), outputB.join(","));

const inputC = [
  [4, 7],
  [1, 4],
];
const outputC = [[1, 7]];
assert.equal(merge(inputC).join(","), outputC.join(","));

console.log(`✅ ${path.basename(__filename)}`);
