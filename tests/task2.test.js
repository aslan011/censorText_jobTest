import { palindromeCheck } from '../task'

test('checks is a string is a palindrome', () => {
    expect(palindromeCheck('I have some cheese')).toBe(false);
});

test('can output True, with puncutation and upper/lower cases', () => {
    expect(palindromeCheck('God saved Eva’s dog')).toBe(true);
});

test('works with numbers in the string', () => {
    expect(palindromeCheck('12 35 10 01 53 21')).toBe(true);
})