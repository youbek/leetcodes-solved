import assert from "node:assert";
import path from "node:path";
import { toBinaryTree } from "./lib/to-binary-tree";

type TreeNode = {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
};

function rightSideView(root: TreeNode | null): number[] {
  if (!root) return [];

  let stack = [root];
  const visible: number[] = [root.val];
  let nextLevel: TreeNode[] = [];
  let depthLevel = 0;

  while (stack.length) {
    const node = stack.shift()!;

    if (node.right) {
      nextLevel.push(node.right);
    }

    if (node.left) {
      nextLevel.push(node.left);
    }

    if (!stack.length && nextLevel.length) {
      visible.push(nextLevel[0]!.val);

      stack = [...nextLevel];
      nextLevel = [];
      depthLevel++;
    }
  }

  return visible;
}

const inputA = [1, 2, 3, null, 5, null, 4];
assert.equal(
  rightSideView(toBinaryTree(inputA)).join(","),
  [1, 3, 4].join(","),
);

const inputB = [1, null, 3];
assert.equal(rightSideView(toBinaryTree(inputB)).join(","), [1, 3].join(","));

const inputC: number[] = [];
assert.equal(rightSideView(toBinaryTree(inputC)).join(","), [].join(","));

const inputD = [1, 2, 3, 4, null, null, null, 5];
assert.equal(
  rightSideView(toBinaryTree(inputD)).join(","),
  [1, 3, 4, 5].join(","),
);

console.log(`✅ ${path.basename(__filename)}`);
