import match from './exactStringMatching';

describe('exactStringMatching', function() {
    it('works for simple case', () => {
        expect(match('hello', 'he')).toEqual([0]);
        expect(match('no hello', 'he')).toEqual([3]);
    });

    it('works with multiple indizes', () => {
        expect(match('hello hello', 'he')).toEqual([0, 6]);
    });

    it('works when patterns overlap', () => {
        expect(match('oooooo', 'oo')).toEqual([0, 1, 2, 3, 4]);
    });

    it('works with pattern and no text', () => {
        expect(match('', 'he')).toEqual([]);
    });

    it('returns empty array if nothing matches', () => {
        expect(match('hello', 'x')).toEqual([]);
    });

    it('returns null if is has no pattern', () => {
        expect(match('hello hello', '')).toEqual(null);
    });
});
