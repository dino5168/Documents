type TreeNode<T> = {
  Node: T;
  Left: TreeNode<T> | null;
  Right: TreeNode<T> | null;
};

class MyTree<T> {
  Root: TreeNode<T> | null;
  constructor(root: TreeNode<T> | null = null) {
    this.Root = root;
  }

  insertNode(newNode: TreeNode<T>) {
    if (this.Root === null) {
      this.Root = newNode;
    } else {
      this._insertNode(this.Root, newNode);
    }
  }

  private _insertNode(node: TreeNode<T>, newNode: TreeNode<T>) {
    if (newNode.Node < node.Node) {
      if (node.Left === null) {
        node.Left = newNode;
      } else {
        this._insertNode(node.Left, newNode);
      }
    } else {
      if (node.Right === null) {
        node.Right = newNode;
      } else {
        this._insertNode(node.Right, newNode);
      }
    }
  }
}

const mytree = new MyTree<number>();
const rootNode: TreeNode<number> = {Node: 10, Left: null, Right: null};
mytree.insertNode(rootNode);
