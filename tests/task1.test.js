import { countOccurances } from '../task';

test('counts the number of occurrences of a given letter in a string', () => {
    expect(countOccurances('e', 'I have some cheese')).toBe(5);
});

test('function is caps insensitive', () => {
    expect(countOccurances('H', 'How many hops are here')).toBe(3);
});

test('punctuation does not break the function', () => {
    expect(countOccurances('e', 'I don\'t have anymore cheese')).toBe(5);
});