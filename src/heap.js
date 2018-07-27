export default class Heap {
    // only for numbers >= 0
    constructor(array = [0], heapSize) {
        this.array = array;
        this.heapSize = heapSize ? heapSize : array.length - 1;
    }

    insert(number) {
        this.array.push(number);
        this.heapSize++;

        this.heapifyUp(this.heapSize);
    }

    decreaseKey(index, newKey) {
        const element = this.array[index];
        if (newKey < element) {
            this.array[index] = newKey;
            this.heapifyUp(index);
        }
    }

    heapifyUp(index) {
        const parentIndex = Math.floor(index / 2);
        const element = this.array[index];
        const parent = this.array[parentIndex];

        if (element < parent) {
            this.array[index] = parent;
            this.array[parentIndex] = element;

            this.heapifyUp(parentIndex);
        }
    }

    heapifyDown(index) {
        const element = this.array[index];

        const leftChildIndex = index * 2;
        const rightChildIndex = index * 2 + 1;
        const leftChild = this.array[leftChildIndex];
        const rightChild = this.array[rightChildIndex];

        if (element < leftChild && element < rightChild) {
            return;
        }

        const hasTwoChildren = leftChild && rightChild;
        const hasOnlyLeftChild = !hasTwoChildren && leftChild;
        const hasOnlyRightChild = !hasTwoChildren && rightChild;
        const leftChildIsSmallerThanRightChild = leftChild < rightChild;
        const chooseLeftChildSwap = (hasTwoChildren && leftChildIsSmallerThanRightChild) || hasOnlyLeftChild;
        if (chooseLeftChildSwap && leftChild < element) {
            this.array[index] = leftChild;
            this.array[leftChildIndex] = element;

            this.heapifyDown(leftChildIndex);
        } else if (((hasTwoChildren && !leftChildIsSmallerThanRightChild) || hasOnlyRightChild)  && rightChild < element) {
            this.array[index] = rightChild;
            this.array[rightChildIndex] = element;

            this.heapifyDown(rightChildIndex);
        }
    }

    extractMin() {
        const min = this.array[1];
        const lastElement = this.array[this.heapSize];
        this.array[1] = lastElement;
        this.array.pop();
        this.heapSize--;

        this.heapifyDown(1);

        return min;
    }

    static buildHeap(array) {
        const heap = new Heap(array);
        for (let i = Math.ceil((array.length + 1) / 2); i > 0; i--) {
            heap.heapifyDown(i);
        }

        return heap;
    }
}
