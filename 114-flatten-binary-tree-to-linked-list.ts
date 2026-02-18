import path from "node:path";
import { toBinaryTree } from "./lib/to-binary-tree";

type TreeNode = {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
};

function flatten(root: TreeNode | null): void {
  const stack = [];
  let pointer = root;
  let lastLeafNodeVisited = null;

  while (stack.length || pointer !== null) {
    if (pointer !== null) {
      stack.push(pointer);
      pointer = pointer.left;
    } else {
      const visited = stack.pop() ?? null;

      pointer = visited?.right ?? null;

      if (lastLeafNodeVisited && visited && visited.left) {
        const oldRightNode = visited.right;
        visited.right = visited.left;
        lastLeafNodeVisited.right = oldRightNode;
        visited.left = null;
      }

      if (!visited?.left && !visited?.right) {
        lastLeafNodeVisited = visited;
      }
    }
  }
}

flatten(toBinaryTree([1, 2, 5, 3, 4, null, 6]));
console.log(`✅ ${path.basename(__filename)}`);
