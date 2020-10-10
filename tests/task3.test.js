import { censorApp } from '../task';

test('counts the number of time a censored word appears, caps insensitive', () => {
    const mockApp = new censorApp(['caps', 'are', 'fun'], "still detect CAPS even if the ArE fuN cases, fun fun")
    expect(mockApp.censorCount()).toEqual({"caps": 1, "are": 1, "fun": 3});
})

test('stores user inputted censor words in lower caps, partly sanitised', () => {
    const mockApp = new censorApp(['USER', 'inPUt', 'wOrdS'], "if users input words in various cases, function still works")
    expect(mockApp.censorCount()).toEqual({"user": 1, "input": 1, "words": 1});
})

test('can detect and count if the censor word that appears is a substring of a word', () => {
    const mockApp = new censorApp(['dog', 'cat', 'large'], "I have a cat named Meow and a dog name Woof. I love the dog a lot. He is larger than a small horse.")
    expect(mockApp.censorCount()).toEqual({"cat": 1, "dog": 2, "large": 1});
})

test('can mask censored words', () => {
    const mockApp = new censorApp(["meow", "woof"], 'I have a cat named Meow and a dog name Woof. I love the dog a lot. He is larger than a small horse.')
    expect(mockApp.censorMask()).toBe('I have a cat named M$$w and a dog name W$$f. I love the dog a lot. He is larger than a small horse.');
})

test('masks punctuation within a word', () => {
    const mockApp = new censorApp(["don't", "jump"], 'Do not jump, don\'t jump, JUMP')
    expect(mockApp.censorMask()).toBe('Do not j$$p, d$$$t j$$p, J$$P');
})

test('can mask palindromes', () => {
    const mockApp = new censorApp([],'Anna went to vote in the election to fulfil her civic duty')
    expect(mockApp.censorPalindrome()).toBe('A$$a went to vote in the election to fulfil her c$$$c duty');
})
