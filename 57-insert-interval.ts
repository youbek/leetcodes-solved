import assert from "node:assert";
import path from "node:path";

export function insert(
  intervals: number[][],
  newInterval: number[],
): number[][] {
  const result: number[][] = [];

  if (!intervals.length) {
    return [newInterval];
  }

  for (let i = 0; i < intervals.length; i++) {
    const startValue = intervals[i]![0]!;

    if (newInterval[0]! < startValue) {
      intervals.splice(i, 0, newInterval);
      break;
    } else if (i == intervals.length - 1) {
      intervals.push(newInterval);
      break;
    }
  }

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

const intervalsA: number[][] = [
  [1, 3],
  [6, 9],
];
const newIntervalA: number[] = [2, 5];

assert.equal(
  insert(intervalsA, newIntervalA).join(","),
  [
    [1, 5],
    [6, 9],
  ].join(","),
);

const intervalsB: number[][] = [
  [1, 2],
  [3, 5],
  [6, 7],
  [8, 10],
  [12, 16],
];
const newIntervalB: number[] = [4, 8];

assert.equal(
  insert(intervalsB, newIntervalB).join(","),
  [
    [1, 2],
    [3, 10],
    [12, 16],
  ].join(","),
);

const intervalsC: number[][] = [[1, 5]];
const newIntervalC: number[] = [2, 3];

assert.equal(insert(intervalsC, newIntervalC).join(","), [[1, 5]].join(","));

console.log(`✅ ${path.basename(__filename)}`);
