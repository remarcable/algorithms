export class ArrayList {
    constructor(size = null) {
        this.arr = [];
        this.size = size;
    }

    insert(pos, element) {
        if (this.size !== null) {
            const arrayIsFull = this.arr.length === this.size;
            if (arrayIsFull) {
                return false;
            }
        }

        const shouldInsertAtEnd = this.arr.length < pos;
        if (shouldInsertAtEnd) {
            this.arr.push(element);
        } else {
            this.arr = [
                ...this.arr.slice(0, pos),
                element,
                ...this.arr.slice(pos, this.arr.length),
            ];
        }
        return true;
    }

    elementAt(pos) {
        if (pos > this.arr.length - 1 || pos < 0) {
            return -1;
        }

        return this.arr[pos];
    }

    search(element) {
        for (let i = 0; i < this.arr.length; i++) {
            if (this.arr[i] === element) {
                return i;
            }
        }

        return -1;
    }

    delete(pos) {
        if (pos > this.arr.length -1 || pos < 0) {
            return false;
        }

        if (pos === this.arr.length - 1) {
            this.arr.pop();
        } else {
            this.arr = [
                ...this.arr.slice(0, pos),
                ...this.arr.slice(pos + 1, this.arr.length),
            ];
        }

        return true;
    }
}

export class LinkedList {
    constructor() {}
    insert(pos, element) {}
    elementAt(pos) {}
    search(element) {}
    delete(pos) {}
}

export class DoublyLinkedList {
    constructor() {}
    insert(pos, element) {}
    elementAt(pos) {}
    search(element) {}
    delete(pos) {}
}
