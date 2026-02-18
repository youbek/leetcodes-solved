type BaseTreeNode<TValue> = {
  val: TValue;
  left: BaseTreeNode<TValue> | null;
  right: BaseTreeNode<TValue> | null;
  next: BaseTreeNode<TValue> | null;
};

export function toBinaryTree<TValue>(
  arr: (TValue | null)[],
): BaseTreeNode<TValue> | null {
  if (!arr.length || arr[0] == null) return null;

  const root: BaseTreeNode<TValue> = {
    val: arr[0],
    left: null,
    right: null,
    next: null,
  };
  const queue = [root];
  let i = 1;

  while (i < arr.length) {
    const current = queue.shift()!;

    if (arr[i] != null) {
      current.left = { val: arr[i]!, left: null, right: null, next: null };
      queue.push(current.left);
    }
    i++;

    if (i < arr.length && arr[i] != null) {
      current.right = { val: arr[i]!, left: null, right: null, next: null };
      queue.push(current.right);
    }
    i++;
  }

  return root;
}
