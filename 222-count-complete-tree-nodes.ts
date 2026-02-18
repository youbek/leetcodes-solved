import assert from "node:assert";
import path from "node:path";
import { toBinaryTree } from "./lib/to-binary-tree";

type TreeNode = {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
};

function countNodes(root: TreeNode | null): number {
  if (!root) return 0;

  let heightL = 0;
  let left = root?.left;
  while (left) {
    heightL++;
    left = left.left;
  }

  let heightR = 0;
  let right = root?.right;
  while (right) {
    heightR++;
    right = right.right;
  }

  if (heightL === heightR) {
    return Math.pow(2, heightL + 1) - 1;
  }

  return countNodes(root?.left) + countNodes(root?.right) + 1;
}

assert.equal(countNodes(toBinaryTree([1, 2, 3, 4, 5, 6])), 6);
console.log(`✅ ${path.basename(__filename)}`);
