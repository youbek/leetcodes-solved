import path from "node:path";
import { toBinaryTree } from "./lib/to-binary-tree";

type _Node = {
  val: number;
  left: _Node | null;
  right: _Node | null;
  next: _Node | null;
};

function findNextNodeChild(nextNode: _Node | null): _Node | null {
  if (!nextNode) return null;

  return nextNode?.left || nextNode?.right || findNextNodeChild(nextNode?.next);
}

function connect(root: _Node | null) {
  if (!root) return null;

  let currentPointer: _Node | null = root;
  let nextPointer: _Node | null = root;

  while (currentPointer != null) {
    if (currentPointer.left) {
      currentPointer.left.next =
        currentPointer.right || findNextNodeChild(currentPointer.next);
    }

    if (currentPointer.right) {
      currentPointer.right.next = findNextNodeChild(currentPointer.next);
    }

    if (currentPointer.next) {
      currentPointer = currentPointer.next;
    } else {
      nextPointer = findNextNodeChild(nextPointer);
      currentPointer = nextPointer;
    }
  }

  return root;
}

const inputA = [1, 2, 3, 4, 5, null, 6, 7, null, null, null, null, 8];
const result = connect(toBinaryTree(inputA));
console.log(JSON.stringify(result, null, 2));

console.log(`✅ ${path.basename(__filename)}`);
