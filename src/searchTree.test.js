import SearchTree, { Node } from './searchTree';

describe('SearchTree', () => {
    describe('insert()', () => {
        let s;
        beforeEach(() => {
            s = new SearchTree();
        });

        it('can insert a root node', () => {
            const pointer = s.insert(10);
            expect(pointer).toBe(s.root);
            expect(pointer.left).toBeNull();
            expect(pointer.right).toBeNull();
        });

        it('returns a pointer to a node', () => {
            const pointer = s.insert(10);
            expect(pointer).toBeInstanceOf(Node);
        });

        it('does not insert the same key twice', () => {
            s.insert(1);
            const pointer1 = s.insert(10);
            const pointer2 = s.insert(10);
            expect(pointer1).toBeDefined();
            expect(pointer1).toBe(pointer2);
        });

        it('inserts a smaller element as the left child', () => {
            const parent = s.insert(20);
            const leftChild = s.insert(15);
            expect(leftChild).toBe(parent.left);
        });

        it('inserts a bigger element as the right child', () => {
            const parent = s.insert(20);
            const rightChild = s.insert(25);
            expect(rightChild).toBe(parent.right);
        });

        it('can insert elements on more than one level', () => {
            const rootNode = s.insert(10);
            s.insert(11);
            s.insert(12);
            const node = s.insert(13);
            expect(rootNode.right.right.right).toBe(node);
        });
    });

    describe('find(key)', () => {
        let s;
        beforeEach(() => {
            s = new SearchTree();
            s.root = new Node(10);
            s.root.left = new Node(5);
            s.root.right = new Node(15);
        });

        it('returns true if it finds a given key', () => {
            expect(s.find(10)).toBe(true);
            expect(s.find(5)).toBe(true);
            expect(s.find(15)).toBe(true);
        });

        it('returns false if it does not find a key', () => {
            expect(s.find(0)).toBe(false);
            expect(s.find(16)).toBe(false);
            expect(s.find(145)).toBe(false);
        });
    });

    describe('delete(key)', () => {
        let s;
        beforeEach(() => {
            /*
                          12
                      6       15
                    3  11   14
            */
            s = new SearchTree();
            s.root = new Node(12);
            s.root.left = new Node(6);
            s.root.left.left = new Node(3);
            s.root.left.right = new Node(11);
            s.root.right = new Node(15);
            s.root.right.left = new Node(14);
        });

        it('returns true if a key was deleted', () => {
            s.insert(20);
            expect(s.delete(20)).toBe(true);
        });

        it('can delete a leaf', () => {
            expect(s.delete(3)).toBe(true);
            const root = s.root;
            expect(root.is(12)).toBe(true);

            const right = s.root.right;
            expect(right.is(15)).toBe(true);
            expect(right.left.is(14)).toBe(true);
            expect(right.right).toBeNull();

            const left = s.root.left;
            expect(left.is(6)).toBe(true);
            expect(left.left).toBeNull();
            expect(left.right.is(11)).toBe(true);
        });

        it('can delete a node with only one child', () => {
            expect(s.delete(15)).toBe(true);

            const root = s.root;
            expect(root.is(12)).toBe(true);

            const right = s.root.right;
            expect(right.is(14)).toBe(true);
            expect(right.left).toBeNull();
            expect(right.right).toBeNull();

            const left = s.root.left;
            expect(left.is(6)).toBe(true);
            expect(left.left.is(3)).toBe(true);
            expect(left.right.is(11)).toBe(true);
        });

        it('can delete an inner node with two children and replace it with its symmetric successor', () => {
            expect(s.delete(12)).toBe(true);
            console.log(s);
            const root = s.root;
            expect(root.is(14)).toBe(true);

            const right = s.root.right;
            expect(right.is(15)).toBe(true);
            expect(right.left).toBeNull();
            expect(right.right).toBeNull();

            const left = s.root.left;
            expect(left.is(6)).toBe(true);
            expect(left.left.is(3)).toBe(true);
            expect(left.right.is(11)).toBe(true);
        });
    });
});
