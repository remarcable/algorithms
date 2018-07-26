import { ArrayList, LinkedList, DoublyLinkedList } from './lists.js';

createTestcasesForFunction(ArrayList, 'ArrayList');
// createTestcasesForFunction(LinkedList, 'LinkedList');
// createTestcasesForFunction(DoublyLinkedList, 'DoublyLinkedList');

function createTestcasesForFunction(List, name) {
    describe(`Lists - ${name}`, () => {
        const ELEMENT = 'ELEMENT';
        const ELEMENT0 = 'ELEMENT0';
        const ELEMENT1 = 'ELEMENT1';
        const ELEMENT2 = 'ELEMENT2';
        const ELEMENT3 = 'ELEMENT3';

        it('can be instantiated without throwing', () => {
            expect(() => new List()).not.toThrow();
        });

        describe('search(element) => pos', () => {
            it('returns the position for an element', () => {
                const list = new List();
                list.insert(0, ELEMENT);
                expect(list.search(ELEMENT)).toBe(0);
            });

            it('returns the position for an element with multiple inserts', () => {
                const list = new List();
                list.insert(0, ELEMENT0);
                list.insert(1, ELEMENT1);
                list.insert(2, ELEMENT2);
                expect(list.search(ELEMENT1)).toBe(1);
            });

            it('returns -1 if element was not found', () => {
                const list = new List();
                expect(list.search(ELEMENT)).toBe(-1);

                list.insert(0, ELEMENT0);
                list.insert(1, ELEMENT1);
                list.insert(2, ELEMENT2);

                expect(list.search(ELEMENT)).toBe(-1);
            });
        });

        describe('elementAt(pos) => element', () => {
            it('returns an inserted element at the pos', () => {
                const list = new List();
                list.insert(0, ELEMENT);
                expect(list.elementAt(0)).toBe(ELEMENT);
            });

            it('returns -1 if no pos is out of bound', () => {
                const list = new List();
                expect(list.elementAt(0)).toBe(-1);
                expect(list.elementAt(-5)).toBe(-1);
            });
        });

        describe('insert(pos, element) => true', () => {
            it('inserts without throwing', () => {
                const list = new List();
                expect(() => list.insert(ELEMENT)).not.toThrow();
            });

            it('inserts the first element', () => {
                const list = new List();
                list.insert(0, ELEMENT);
                expect(list.elementAt(0)).toBe(ELEMENT);
            });

            it('inserts the first element at an pos that is bigger than 0', () => {
                const list = new List();
                list.insert(10, ELEMENT);
                expect(list.elementAt(0)).toBe(ELEMENT); // it's still the first element to be inserted
            });

            it('inserts multiple elements', () => {
                const list = new List();
                list.insert(0, ELEMENT0);
                list.insert(1, ELEMENT1);
                list.insert(2, ELEMENT2);
                list.insert(3, ELEMENT3);

                expect(list.elementAt(0)).toBe(ELEMENT0);
                expect(list.elementAt(1)).toBe(ELEMENT1);
                expect(list.elementAt(2)).toBe(ELEMENT2);
                expect(list.elementAt(3)).toBe(ELEMENT3);
            });

            it('inserts multiple elements using always the same pos', () => {
                const list = new List();
                list.insert(0, ELEMENT0);
                list.insert(0, ELEMENT1);
                list.insert(0, ELEMENT2);
                list.insert(0, ELEMENT3);

                expect(list.elementAt(0)).toBe(ELEMENT3);
                expect(list.elementAt(1)).toBe(ELEMENT2);
                expect(list.elementAt(2)).toBe(ELEMENT1);
                expect(list.elementAt(3)).toBe(ELEMENT0);
            });

            it('returns true after successful insert', () => {
                const list = new List();
                expect(list.insert(0, ELEMENT)).toBe(true);
            });

            if (List === ArrayList) {
                it('returns false if there is not enough space', () => {
                    const list = new List(2); // available indizes: 0, 1
                    expect(list.insert(0, ELEMENT0)).toBe(true);
                    expect(list.insert(1, ELEMENT1)).toBe(true);
                    expect(list.insert(2, ELEMENT2)).toBe(false);
                });
            }
        });

        describe('delete(pos) => true', () => {
            it('returns false if no element was removed', () => {
                const list = new List();
                expect(list.delete(0)).toBe(false);
                expect(list.delete(10)).toBe(false);
            });

            it('removes last element', () => {
                const list = new List();
                list.insert(0, ELEMENT0);
                list.insert(1, ELEMENT1);
                list.insert(2, ELEMENT2);

                expect(list.delete(2)).toBe(true);
                expect(list.elementAt(2)).toBe(-1);
            });

            it('removes first element', () => {
                const list = new List();
                list.insert(0, ELEMENT0);
                list.insert(1, ELEMENT1);
                list.insert(2, ELEMENT2);

                expect(list.delete(0)).toBe(true);
                expect(list.elementAt(0)).toBe(ELEMENT1);
                expect(list.elementAt(1)).toBe(ELEMENT2);
                expect(list.elementAt(2)).toBe(-1);
            });

            it('removes element in the middle', () => {
                const list = new List();
                list.insert(0, ELEMENT0);
                list.insert(1, ELEMENT1);
                list.insert(2, ELEMENT2);

                expect(list.delete(1)).toBe(true);
                expect(list.elementAt(0)).toBe(ELEMENT0);
                expect(list.elementAt(1)).toBe(ELEMENT2);
                expect(list.elementAt(2)).toBe(-1);
            });
        });
    });
}
