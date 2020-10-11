import { mask, censorCount, censorMask, censorPalindromes } from '../task';

test('masks all characters expect first and last', () => {
    expect(mask('Aeroplane')).toBe('A$$$$$$$e');
});

test('does not mask ending symbols', () => {
    expect(mask('Ending.')).toBe('E$$$$g.');
});

test('counts occurances of censored words', () => {
    expect(censorCount(['hop', 'skip', 'jump'], ['hop', 'hop', 'lunge', 'fly'])).toEqual({'hop': 2, 'skip': 0, 'jump': 0});
});

test('masks words that need to be censored', () => {
    expect(censorMask(['all', 'the', 'pie'], ['all', 'pie', 'lunge', 'fly'])).toBe('a$l p$e lunge fly')
});

test('masks all the palindromes', () => {
    expect(censorPalindromes(['anna', 'hannah', 'billy', 'stanley yelnats'])).toBe('a$$a h$$$$h billy s$$$$$$$$$$$$s')
});