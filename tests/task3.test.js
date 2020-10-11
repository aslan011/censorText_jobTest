import { censorApp } from '../task';

test('counts the number of time a censored word appears, caps insensitive', () => {
    const mockApp = censorApp(['caps', 'are', 'fun'], 'still detect CAPS even if the ArE fuN cases, fun fun');
    expect(mockApp.countCensors()).toEqual({'caps': 1, 'are': 1, 'fun': 3});
});

test('stores user inputted censor words in lower caps, partly sanitised', () => {
    const mockApp = censorApp(['USER', 'inPUt', 'wOrdS'], 'if users input words in various cases, function still works');
    expect(mockApp.countCensors()).toEqual({'user': 1, 'input': 1, 'words': 1});
});

test('can detect and count if the censor word that appears is a substring of a word', () => {
    const mockApp = censorApp(['dog', 'cat', 'large'], 'I have a cat named Meow and a dog name Woof. I love the dog a lot. He is larger than a small horse.');
    expect(mockApp.countCensors()).toEqual({'cat': 1, 'dog': 2, 'large': 1});
});

test('can mask censored words', () => {
    const mockApp = censorApp(['fruit', 'veg'], 'fruit veg meat beans');
    expect(mockApp.maskString()).toBe('f$$$t v$g meat beans');
});

test('does not remove required puncutation e.g. fullstops and commas', () => {
    const mockApp = censorApp(['meow', 'woof'], 'I have a cat named Meow, a dog name Woof. I love the dog a lot. He is larger than a small horse.');
    expect(mockApp.maskString()).toBe('I have a cat named M$$w, a dog name W$$f. I love the dog a lot. He is larger than a small horse.');
});

test('should not mask puncutation that is within the word, should remove the symbol instead', () => {
    const mockApp = censorApp(['don\'t', 'jum'], 'Do not jump, don\'t jump, JUMP');
    expect(mockApp.maskString()).toBe('Do not j$$p, d$$t j$$p, J$$P');
});

test('can mask palindromes', () => {
    const mockApp = censorApp([],'Anna went to vote in the election to fulfil her civic duty');
    expect(mockApp.maskPalindromes()).toBe('A$$a went to vote in the election to fulfil her c$$$c duty');
});

test('can change censor words', () => {
    const mockApp = censorApp(['meow', 'woof'], 'meow woof roar');
    mockApp.changeSensors(['New', 'sensors']);
    expect(mockApp.getCensors()).toEqual(['New', 'sensors']);
})

test('can change string', () => {
    const mockApp = censorApp(['meow', 'woof'], 'meow woof roar');
    mockApp.changeString('A newly changed string')
    expect(mockApp.getString()).toEqual('A newly changed string');
})
