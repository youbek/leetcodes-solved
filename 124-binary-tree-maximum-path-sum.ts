import assert from "node:assert";
import path from "node:path";
import { toBinaryTree } from "./lib/to-binary-tree";

type TreeNode = {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
};

function maxPathSum(root: TreeNode | null): number {
  const stack = [];
  let pointer = root;
  let lastVisistedNode: TreeNode | null = null;
  let maxPathSeenSoFar = Number.NEGATIVE_INFINITY;

  if (!root) {
    return maxPathSeenSoFar;
  }

  while (stack.length || pointer !== null) {
    if (pointer) {
      stack.push(pointer);
      pointer = pointer.right;
    } else {
      const latestNode = stack[stack.length - 1];

      if (latestNode?.left && lastVisistedNode !== latestNode?.left) {
        pointer = latestNode.left;
      } else {
        const visitedNode = stack.pop()!;
        lastVisistedNode = visitedNode;

        // calculation
        const closedPath =
          (visitedNode?.left?.val ?? 0) +
          visitedNode.val +
          (visitedNode.right?.val ?? 0);

        visitedNode.val = Math.max(
          visitedNode.val,
          (visitedNode.left?.val ?? 0) + visitedNode.val,
          (visitedNode.right?.val ?? 0) + visitedNode.val,
        );

        maxPathSeenSoFar = Math.max(
          maxPathSeenSoFar,
          closedPath,
          visitedNode.val,
        );
      }
    }
  }

  return maxPathSeenSoFar;
}

const inputA = toBinaryTree([1, 2, 3]);
assert.equal(
  maxPathSum(inputA),
  6,
  `❗️ ${path.basename(__filename)} - Input A expected to pass!`,
);

const inputB = toBinaryTree([-3]);
assert.equal(
  maxPathSum(inputB),
  -3,
  `❗️ ${path.basename(__filename)} - Input B expected to pass!`,
);

const inputC = toBinaryTree([1, -2, 3]);
assert.equal(
  maxPathSum(inputC),
  4,
  `❗️ ${path.basename(__filename)} - Input C expected to pass!`,
);

console.log(`✅ ${path.basename(__filename)}`);
