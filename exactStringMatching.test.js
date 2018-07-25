import match from './exactStringMatching';

describe('exactStringMatching', function() {
    it('runs without errors', () => {
        expect(match('hello', 'he')).toBe(0);
    })
});
