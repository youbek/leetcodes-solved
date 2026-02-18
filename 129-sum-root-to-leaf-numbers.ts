import assert from "node:assert";
import path from "node:path";
import { toBinaryTree } from "./lib/to-binary-tree";

type TreeNode = {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
};

function sumNumbers(root: TreeNode | null): number {
  if (!root) return 0;

  const stack: TreeNode[] = [];
  let pointer: TreeNode | null = root;
  let totalSum = 0;
  let currentSumToLeaf = "";
  let lastNodeVisited: TreeNode | null = null;

  while (stack.length || pointer != null) {
    if (pointer) {
      currentSumToLeaf += String(pointer.val);
      stack.push(pointer);
      pointer = pointer.left;
    } else {
      const latestNode = stack[stack.length - 1];

      if (latestNode?.right && lastNodeVisited != latestNode?.right) {
        pointer = latestNode.right;
      } else {
        const visitedNode = stack.pop()!;

        const isLeaf = !visitedNode.left && !visitedNode.right;

        if (isLeaf) {
          totalSum += Number(currentSumToLeaf);
        }

        currentSumToLeaf = currentSumToLeaf.slice(0, -1);
        lastNodeVisited = visitedNode;
      }
    }
  }

  return totalSum;
}

const inputA = toBinaryTree([4, 9, 0, 5, 1]);
assert.equal(
  sumNumbers(inputA),
  1026,
  `❗️ ${path.basename(__filename)} - Input A expected to pass!`,
);

const inputB = toBinaryTree([1, 2, 3]);
assert.equal(
  sumNumbers(inputB),
  25,
  `❗️ ${path.basename(__filename)} - Input B expected to pass!`,
);

console.log(`✅ ${path.basename(__filename)}`);
