import assert from "node:assert";
import path from "node:path";

function isValidSudoku(board: string[][]): boolean {
  const rowsSet: Set<number>[] = [];
  const colsSet: Set<number>[] = [];
  const innerBoxSets: Set<number>[] = [];

  for (let i = 0; i < board.length; i++) {
    const row = board[i] as any as string[];
    for (let j = 0; j < row.length; j++) {
      const rowSet = rowsSet[i] ?? new Set<number>();
      const colSet = colsSet[j] ?? new Set<number>();
      const innerBoxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
      const innerBoxSet = innerBoxSets[innerBoxIndex] ?? new Set<number>();

      const character = row[j];

      if (character == ".") {
        continue;
      }

      const number = Number(character);

      if (rowSet.has(number) || colSet.has(number) || innerBoxSet.has(number)) {
        return false;
      }
      rowSet.add(number);
      colSet.add(number);
      innerBoxSet.add(number);

      colsSet[j] = colSet;
      rowsSet[i] = rowSet;
      innerBoxSets[innerBoxIndex] = innerBoxSet;
    }
  }
  return true;
}

const validInput = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
] as string[][];

const invalidInput = [
  ["8", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

const failedOne = [
  [".", "4", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", "4", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", "1", ".", ".", "7", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", "3", ".", ".", ".", "6", "."],
  [".", ".", ".", ".", ".", "6", ".", "9", "."],
  [".", ".", ".", ".", "1", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", "2", ".", "."],
  [".", ".", ".", "8", ".", ".", ".", ".", "."],
];

assert.equal(isValidSudoku(validInput), true);
assert.equal(isValidSudoku(failedOne), false);
assert.equal(isValidSudoku(invalidInput), false);

console.log(`✅ ${path.basename(__filename)}`);
