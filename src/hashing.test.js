import HashMap from './hashing';

describe('HasMap(size)', () => {
    describe('insert(key)', () => {
        it('inserts an element at the ith position', () => {
            const map = new HashMap(5);
            map.insert(0);
            map.insert(1);
            map.insert(2);
            map.insert(3);
            map.insert(4);

            expect(map.array[0].elementAt(0)).toBe(0);
            expect(map.array[1].elementAt(0)).toBe(1);
            expect(map.array[2].elementAt(0)).toBe(2);
            expect(map.array[3].elementAt(0)).toBe(3);
            expect(map.array[4].elementAt(0)).toBe(4);
        });

        it('can insert multiple times for the same i (it probes correctly)', () => {
            const map = new HashMap(5);
            map.insert(0);
            map.insert(5);
            map.insert(10);

            const list = map.array[0];

            expect(list.length).toBe(3);
            expect(list.elementAt(0)).toBe(10);
            expect(list.elementAt(1)).toBe(5);
            expect(list.elementAt(2)).toBe(0);
        });
    });

    describe('has(key)', () => {
        it('returns true if an element is in the map', () => {
            const map = new HashMap(5);
            map.insert(13);
            expect(map.has(13)).toBe(true);
        });

        it('returns false if an element is not in the map', () => {
            const map = new HashMap(5);
            map.insert(26); // is inserted into the same list
            expect(map.has(13)).toBe(false);
        });
    });

    describe('delete(key)', () => {
        it('returns true if an inserted element was deleted', () => {
            const map = new HashMap(5);
            map.insert(26);
            expect(map.array[1].search(26)).toBe(0)
            expect(map.delete(26)).toBe(true);
            expect(map.array[1].search(26)).toBe(-1)
        });

        it('returns false if an unknown element should be deleted', () => {
            const map = new HashMap(5);
            expect(map.delete(5)).toBe(false);
        });
    });
});
