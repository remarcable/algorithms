import {
    bubbleSort,
    insertionSort,
    selectionSort,
    quickSort,
    mergeSort,
    merge,
} from './sorting';

createTestcasesForFunction(bubbleSort, 'bubbleSort');
createTestcasesForFunction(insertionSort, 'insertionSort');
// createTestcasesForFunction(selectionSort, 'selectionSort');
createTestcasesForFunction(quickSort, 'quickSort');
createTestcasesForFunction(mergeSort, 'mergeSort')

function createRandomArray(length) {
    const array = [];
    for (let i = 0; i < length; i++) {
        array.push(Math.floor(Math.random() * 500));
    }

    return array;
}

describe('createRandomArray', () => {
    it('returns empty array for length 0', () => {
        expect(createRandomArray(0)).toEqual([]);
    });

    it('returns exactly "length" numbers', () => {
        expect(createRandomArray(100)).toHaveLength(100);
    });
});

function createTestcasesForFunction(sort, name) {
    describe(`Sorting - ${name}`, function() {
        it('returns sorted numbers', () => {
            const array = createRandomArray(100);
            const sorted = sort(array);
            expect(sorted).toEqual(array.sort((a, b) => a - b));
        });

        it('"sorts" and array with length 1', () => {
            expect(sort([1])).toEqual([1]);
        });

        it('works with sorted array', () => {
            expect(sort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
        });

        it('sorted arrays have the same size', () => {
            expect(sort(createRandomArray(100))).toHaveLength(100);
        });

        it('can handle empty array', () => {
            expect(sort([])).toEqual([]);
        });

        it('can handle negative numbers', () => {
            expect(sort([1, 5, -1, 6, 10])).toEqual([-1, 1, 5, 6, 10]);
        });
    });
}

describe('merge', () => {
    it('merges two arrays of the same size', () => {
        const a = [1, 3, 5];
        const b = [2, 4, 6];
        expect(merge(a, b)).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('merges two arrays of different size', () => {
        const a = [1, 3, 5];
        const b = [2, 4];
        expect(merge(a, b)).toEqual([1, 2, 3, 4, 5]);
    });

    it('merges arrays of one', () => {
        const a = [1];
        const b = [2];
        expect(merge(a, b)).toEqual([1, 2]);
    });

    it('merges array with empty array', () => {
        const a = [1, 2, 3];
        const b = [];
        expect(merge(a, b)).toEqual([1, 2, 3]);
    });
});
