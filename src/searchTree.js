export class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }

    is(key) {
        return key === this.key;
    }
}

export default class SearchTree {
    constructor() {
        this.root = null;
    }

    insert(key) {
        if (this.root === null) {
            return this.root = new Node(key);
        }

        const alreadyInsertedNode = this.findNode(key);
        if (alreadyInsertedNode) {
            return alreadyInsertedNode;
        }

        let lastNode = this.root;
        let currentNode = this.root;
        while (currentNode !== null) {
            if (key < currentNode.key) {
                lastNode = currentNode;
                currentNode = currentNode.left;
            } else if (key > currentNode.key) {
                lastNode = currentNode;
                currentNode = currentNode.right;
            }
        }

        if (key < lastNode.key) {
            return lastNode.left = new Node(key);
        } else {
            return lastNode.right = new Node(key);
        }
    }

    find(key) {
        return this.findNode(key) instanceof Node;
    }

    findNode(key) {
        if (key === this.root.key) {
            return this.root;
        }

        const parent = this.findParentNode(key);

        if (key < parent.key) {
            return parent.left;
        } else {
            return parent.right;
        }
    }

    findParentNode(key) {
        if (key === this.root.key) {
            return null;
        }

        let lastNode = this.root;
        let currentNode = this.root;
        while (currentNode !== null && !currentNode.is(key)) {
            if (key < currentNode.key) {
                lastNode = currentNode;
                currentNode = currentNode.left;
            } else {
                lastNode = currentNode;
                currentNode = currentNode.right;
            }
        }

        return lastNode;
    }

    delete(key) {
        let parent = this.findParentNode(key);
        const isRootNode = !parent;
        if (isRootNode) {
            parent = new Node(key + 1); // the key just needs to be smaller
            parent.left = this.root;
        }

        const isLeftNode = key < parent.key;
        const node = isLeftNode ? parent.left : parent.right;

        if (!node) {
            return false;
        }

        const isLeaf = !node.left && !node.right; // === has no children
        if (isLeaf) {
            if (isLeftNode) {
                parent.left = null;
            } else {
                parent.right = null;
            }

        }

        const hasOneChild = node.left && !node.right || !node.left && node.right;
        if (hasOneChild) {
            const child = node.left || node.right;
            if (isLeftNode) {
                parent.left = child;
            } else {
                parent.right = child;
            }

        }

        const hasTwoChildren = node.left && node.right;
        if (hasTwoChildren) {
            const symmetricSuccessor = this.findSymmetricSuccessor(node); // because there are two children it will always be a symmetric successor

            this.delete(symmetricSuccessor.key);

            if (isLeftNode) {
                parent.left.key = symmetricSuccessor.key;
            } else {
                parent.right.key = symmetricSuccessor.key;
            }

        }

        if (isRootNode) {
            this.root = parent.left;
        }

        return true;
    }

    findSymmetricSuccessor(node) {
        // find the minimum of the right branch
        let minimumNode = node.right;
        let currentNode = node.right;
        while (currentNode !== null) {
            minimumNode = currentNode;
            currentNode = currentNode.left;
        }

        return minimumNode;
    }
}
