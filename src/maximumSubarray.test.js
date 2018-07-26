import {
    completeSearchV1,
    completeSearchV2,
    divideAndConquer,
    scanline,
} from './maximumSubarray';

createTestcasesForFunction(completeSearchV1, 'completeSearchV1');
createTestcasesForFunction(completeSearchV2, 'completeSearchV2');
createTestcasesForFunction(divideAndConquer, 'divideAndConquer');
createTestcasesForFunction(scanline, 'scanline')

function createTestcasesForFunction(maxSubarrayFunc, name) {
    describe(`maximumSubarray - ${name}`, function() {
        it('returns correct number for even amount of numbers', () => {
            expect(maxSubarrayFunc([1, 2, 3, 4, 5, 6])).toBe(21);
        });

        it('returns correct number for odd amount of numbers', () => {
            expect(maxSubarrayFunc([1, 2, 3, 4, 5])).toBe(15);
        });

        it('returns correct number for array with negative numbers', () => {
            expect(maxSubarrayFunc([1, 2, -10, 4, 5])).toBe(9);
            expect(maxSubarrayFunc([4, 5, -10, 1, 2])).toBe(9);
            expect(maxSubarrayFunc([-10])).toBe(0);
        });

        it('returns zero for array full of negative numbers', () => {
            // because the subarray then would be an empty array
            expect(maxSubarrayFunc([-12, -6, -22])).toBe(0);
        });

        it('returns 0 for empty array', () => {
            expect(maxSubarrayFunc([])).toBe(0);
        });

        it('can handle a lot of zeroes', () => {
            expect(maxSubarrayFunc([0, 0, 0, 5, 0, 0, 0])).toBe(5);
        });
    });
}
