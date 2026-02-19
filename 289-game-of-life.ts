import assert from "node:assert";
import path from "node:path";

function gameOfLife(board: number[][]) {
  const m = board.length;
  const n = board[0]!.length;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i]!.length; j++) {
      const cell = board[i]![j]!;

      const leftCell = j > 0 ? board[i]![j - 1]! : null;
      const rightCell = j < n - 1 ? board[i]![j + 1]! : null;
      const topCell = i > 0 ? board[i - 1]![j]! : null;
      const bottomCell = i < m - 1 ? board[i + 1]![j]! : null;
      const topLeftCell =
        topCell !== null && leftCell !== null ? board[i - 1]![j - 1]! : null;
      const topRightCell =
        topCell !== null && rightCell !== null ? board[i - 1]![j + 1]! : null;
      const bottomLeftCell =
        bottomCell !== null && leftCell !== null ? board[i + 1]![j - 1]! : null;
      const bottomRightCell =
        bottomCell !== null && rightCell !== null
          ? board[i + 1]![j + 1]!
          : null;

      const neighbourCells = [
        leftCell,
        rightCell,
        topCell,
        bottomCell,
        topLeftCell,
        topRightCell,
        bottomLeftCell,
        bottomRightCell,
      ];

      const aliveNeighbours = neighbourCells.reduce(
        (count: number, neighbour: number | null) => {
          const isAlive = neighbour == 1 || neighbour == -1;
          count = isAlive ? count + 1 : count;

          return count;
        },
        0,
      );

      const isAlive = cell == 1;
      if (isAlive && aliveNeighbours < 2) {
        board[i]![j] = -1;
      } else if (isAlive && (aliveNeighbours === 2 || aliveNeighbours === 3)) {
        board[i]![j] = 1;
      } else if (isAlive && aliveNeighbours > 3) {
        board[i]![j] = -1;
      } else if (aliveNeighbours === 3) {
        board[i]![j] = 2;
      }
    }
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i]!.length; j++) {
      const cellState = board[i]![j]!;
      board[i]![j] = cellState === 2 ? 1 : cellState === -1 ? 0 : cellState;
    }
  }
}

const inputA = [
  [0, 1, 0],
  [0, 0, 1],
  [1, 1, 1],
  [0, 0, 0],
];
gameOfLife(inputA);
assert.equal(
  inputA.join(","),
  [
    [0, 0, 0],
    [1, 0, 1],
    [0, 1, 1],
    [0, 1, 0],
  ].join(","),
  `❗️ ${path.basename(__filename)} - Input A expected to pass!`,
);

const inputB = [
  [1, 1],
  [1, 0],
];
gameOfLife(inputB);
assert.equal(
  inputB.join(","),
  [
    [1, 1],
    [1, 1],
  ].join(","),
  `❗️ ${path.basename(__filename)} - Input B expected to pass!`,
);

console.log(`✅ ${path.basename(__filename)}`);
