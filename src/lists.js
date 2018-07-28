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
        if (pos > this.arr.length - 1 || pos < 0) {
            return false;
        }

        if (pos === this.arr.length - 1) {
            this.arr.pop();
        } else {
            this.arr = [...this.arr.slice(0, pos), ...this.arr.slice(pos + 1, this.arr.length)];
        }

        return true;
    }
}

class Element {
    constructor(value, next, previous) {
        this.value = value;
        this.previous = null;
        this.next = null;
    }
}

export class LinkedList {
    constructor() {
        this.first = null;
        this.last = null;
        this.length = 0; // 0-based
    }

    insert(pos, element) {
        const el = new Element(element);
        this.length += 1;
        if (pos === 0 || this.first === null) {
            const first = this.first;
            this.first = el;
            el.next = first;
        } else {
            const previousElement = this.elementObjectAt(pos - 1);
            const nextElement = previousElement.next;
            previousElement.next = el;
            el.next = nextElement;
        }

        if (el.next === null) {
            this.last = el;
        }

        return true;
    }

    elementObjectAt(pos) {
        let count = 0;
        let element = this.first;
        while (count < this.length && element !== null) {
            if (count === pos) {
                return element;
            }

            element = element.next;
            count += 1;
        }

        return null;
    }

    elementAt(pos) {
        const { value } = this.elementObjectAt(pos) || {};
        return value !== undefined ? value : -1;
    }

    search(element) {
        let current = this.first;
        for (let i = 0; i < this.length; i++) {
            if (current.value === element) {
                return i;
            }
            current = current.next;
        }

        return -1;
    }

    delete(pos) {
        if (pos > this.length - 1 || pos < 0) {
            return false;
        }

        if (pos === 0) {
            this.first = this.first.next;
        } else {
            const previousElement = this.elementObjectAt(pos - 1);
            const toBeDeleted = previousElement.next;
            const nextElement = toBeDeleted.next;
            previousElement.next = nextElement;

            if (nextElement === null) {
                this.last = previousElement;
            }
        }

        this.length -= 1;
        return true;
    }
}
