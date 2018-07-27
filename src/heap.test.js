import Heap from './heap';

function isValidHeap(heap, index = 1) {
    // index is one-based
    const arr = heap.array;
    const maxIndex = heap.heapSize;
    const leftChildIndex = 2 * index;
    const rightChildIndex = 2 * index + 1;

    const leftChild = arr[leftChildIndex];
    const rightChild = arr[rightChildIndex];

    let leftChildValid = true;
    if (leftChild) {
        leftChildValid = leftChild >= arr[index] && isValidHeap(heap, leftChildIndex);
    }

    let rightChildValid = true;
    if (rightChild) {
        rightChildValid = rightChild >= arr[index] && isValidHeap(heap, rightChildIndex);
    }

    return leftChildValid && rightChildValid;
}

describe('Heap', () => {
    describe('isValidHeap(heap, index)', () => {
        it('returns true for valid heap', () => {
            const heap = new Heap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10);
            expect(isValidHeap(heap)).toBe(true);
        });

        it('returns false for invalid heap', () => {
            const heap = new Heap([0, 1, 2, 3, 4, 5, 4, 3, 2, 1], 10);
            expect(isValidHeap(heap)).toBe(false);
        });

        it('returns true for heap with one element', () => {
            const heap = new Heap([0, 1], 1);
            expect(isValidHeap(heap)).toBe(true);
        });

        it('returns true for heap with one element but with parents', () => {
            const heap = new Heap([0, 1, 2, 3], 2);
            expect(isValidHeap(heap)).toBe(true);
        });
    });

    describe('insert(number)', () => {
        it('inserts as first element', () => {
            const heap = new Heap();
            expect(heap.array).toEqual([0]);

            heap.insert(10);
            expect(heap.array).toEqual([0, 10]);
        });

        it('inserts with full heap to the top', () => {
            const heap = new Heap([0, 2, 3, 4, 5, 6]);
            heap.insert(1);
            expect(heap.array).toEqual([0, 1, 3, 2, 5, 6, 4]);
        });

        it('inserts with full heap to the bottom', () => {
            const heap = new Heap([0, 2, 3, 4, 5, 6]);
            heap.insert(10);
            expect(heap.array).toEqual([0, 2, 3, 4, 5, 6, 10]);
        });
    });

    describe('decreaseKey(index, newKey)', () => {
        it('leaves a correct heap', () => {
            const heap = new Heap([0, 2, 3, 4, 5, 6, 7]);
            heap.decreaseKey(5, 1);
            expect(heap.array).toEqual([0, 1, 2, 4, 5, 3, 7]);
        });
    });

    describe('heapifyUp(index)', () => {
        it('can swap a number up', () => {
            const heap = new Heap([0, 1, 2, 3, 4, 5, 6, 2.5]);
            heap.heapifyUp(7);
            expect(heap.array).toEqual([0, 1, 2, 2.5, 4, 5, 6, 3]);
        });

        it('can swap a number up 2', () => {
            const heap = new Heap([0, 2, 3, 4, 5, 6, 1]);
            heap.heapifyUp(6);
            expect(heap.array).toEqual([0, 1, 3, 2, 5, 6, 4]);
        });

        it('can swap a zero', () => {
            const heap = new Heap([0, 1, 2, 3, 4, 5, 6, 0]);
            heap.heapifyUp(7);
            expect(heap.array).toEqual([0, 0, 2, 1, 4, 5, 6, 3]);
        });

        it('does not swap a number that is already in place', () => {
            const heap = new Heap([0, 1, 2, 3, 4, 5, 6, 7]);
            heap.heapifyUp(4);
            expect(heap.array).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
        });
    });

    describe('heapifyDown(index)', () => {
        it('chooses the correct side for heapifying down', () => {
            const heap = new Heap([0, 5, 2, 3]);
            heap.heapifyDown(1);
            expect(heap.array).toEqual([0, 2, 5, 3]);
        });

        it('can swap at least twice', () => {
            const heap = new Heap([0, 7, 2, 3, 4, 5, 6]);
            heap.heapifyDown(1);
            expect(heap.array).toEqual([0, 2, 4, 3, 7, 5, 6]);
        });

        it('can swap for a heap with even count of numbers', () => {
            const heap = new Heap([0, 1, 2, 3, 4]);
            heap.heapifyDown(3);
            expect(heap.array).toEqual([0, 1, 2, 3, 4]);
            heap.heapifyDown(2);
            expect(heap.array).toEqual([0, 1, 2, 3, 4]);
            heap.heapifyDown(1);
            expect(heap.array).toEqual([0, 1, 2, 3, 4]);
        });

        it('does not alter a correct heap', () => {
            const heap = new Heap([0, 1, 2, 3, 4, 5, 6, 7]);
            heap.heapifyDown(1);
            expect(heap.array).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
        });
    });

    describe('extractMin()', () => {
        it('returns the minimum', () => {
            const heap = new Heap([0, 1, 2, 3, 4, 5, 6, 7]);
            expect(heap.extractMin()).toBe(1);
        });

        it('leaves the heap in a correct state', () => {
            const heap = new Heap([0, 1, 2, 3, 4, 5, 6, 7]);
            heap.extractMin();
            expect(heap.array).toEqual([0, 2, 4, 3, 7, 5, 6]);
        });
    });

    describe('static buildHeap(array)', () => {
        function getShuffledArray(size) {
            // partly borrowed from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array#6274381
            const a = [];
            for (let i = 0; i < size; i++) {
                a[i] = i + 1;
            }

            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }

        it('returns a valid heap for a shuffled array', () => {
            for (let i = 0; i < 100; i++) {
                // do this more than once to ensure we aren't just "lucky"
                const array = getShuffledArray(Math.ceil(Math.random() * 150));
                const heap = Heap.buildHeap([0, ...array]); // add 0 because index starts at 1
                expect(isValidHeap(heap)).toBe(true);
            }
        });
    });
});
