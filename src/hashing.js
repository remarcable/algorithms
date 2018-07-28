import { LinkedList } from './lists';

export default class HashMap {
    constructor(size) {
        this.size = size;
        this.array = [];

        for (let i = 0; i < size; i++) {
            this.array[i] = new LinkedList();
        }
    }

    hashFn(key) {
        return key % this.size;
    }

    insert(key) {
        this.array[this.hashFn(key)].insert(0, key);
        return key;
    }

    has(key) {
        const posInLinkedList = this.array[this.hashFn(key)].search(key);
        return posInLinkedList >= 0;
    }

    delete(key) {
        const list = this.array[this.hashFn(key)];
        const posInLinkedList = list.search(key);
        return list.delete(posInLinkedList);
    }
}
