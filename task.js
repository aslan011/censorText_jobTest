// splits the string into a lowercased array, and loops through it, comparing to the index word
function countOccurances(index, string) {
    const splitStr = string.toLowerCase().split('');
    let count = 0;
    splitStr.forEach((char) => {
        if (char === index.toLowerCase()) {
            count += 1;
        }
    });
    return count;
};

/*  Splits the string in the same way as above, with an additional check to see if the character is a letter.
    If it is a letter, adds it to the start of one array and the same letter is added to the end of another array.
    These two arrays can then be compared, if they match then the string is a palindrome. 
*/
function palindromeCheck(str) {
    const strArray = [];
    const reverseStr = [];

    str
        .toLowerCase()
        .split('')
        .forEach((char) => {
            if (char.toLowerCase() !== char.toUpperCase()) {
                strArray.push(char);
                reverseStr.unshift(char);
            }
        });

    return strArray.join('') === reverseStr.join('');
};

/*  Seperated this function out of the main censorApp.
    This created two arrays, 'tempArr' array is characters which were split from the string.
    'tempArr' is used to check if the last letter is a symbol.
    The second array created, 'cleanedArr' removes puncutation within the string, such as commas.
    This method allows words like 'don't' to be masked as a four character string; d$$t, rather than the comma also being masked.
    Returns a cleaned masked string, with any symbol at the end readded. 
*/
function mask(str) {
    let symbol = '';
    const tempArr = str.split('');
    const cleanedArr = str.replace(/[^\w]/g, '').split('');
    if (tempArr[tempArr.length - 1].toLowerCase() === tempArr[tempArr.length - 1].toUpperCase()) {
        symbol = tempArr.pop();
    }
    cleanedArr.fill('$', 1, -1);
    return cleanedArr.join('') + symbol;
};

/*  Loops through each word in the given text and checks if it matches (or partially matches) the censor word.
    Creates an empty object which will contain the censor words (lowered case), initally all values (occurances) are set to 0. 
*/
function censorCount (censors, strArray) {
    const censorsObj = {};

    censors.forEach((censor) => {
        censorsObj[censor.toLowerCase()] = 0;
    });

    strArray.forEach((word) => {
        censors.forEach((censor) => {
            if (word.toLowerCase().includes(censor.toLowerCase())) {
                censorsObj[censor.toLowerCase()] += 1;
            }
        });
    });
    return (censorsObj);
};

/*  Creates an array of masked word (where required), like the above, check if the word matches the
    censor word and if so, passes the word to the mask function.
    This uses some() instead of forEach(), this is because some() stopped once a condition, this is more efficient than looping through every word.
    I chose to pass the whole word to the mask function, instead of just the matched characters.
    This was based on my personal view of how the application would work.
*/  
function censorMask (censors, strArray) {
    const maskedArr = strArray.map((word) => {
        if (censors.some((censor) => word.toLowerCase().includes(censor.toLowerCase()))) {
            return mask(word);
        }
        return word;
    });
    return (maskedArr.join(' '));
};

/*  Uses the palindromeCheck function to loop through the given text, checking for palindromes.
    If a palindrome is found, the word is passed to the mask function.
*/
function censorPalindromes(strArray) {
    const maskedArr = strArray.map((word) => {
        if (palindromeCheck(word)) {
            return mask(word);
        }
        return word;
    });
    return (maskedArr.join(' '));
};

//  Could have used a class or contructor design pattern here, however I prefer using a factory pattern.
const censorApp = (censorWords, stringText) => {
    const strArray = stringText.split(' ');
    let censors = censorWords;
    let string = stringText;

    return {
        getCensors() {
            return censors
        },

        getString() {
            return string
        },

        changeSensors (censorWords) {
            return censors = censorWords
        },

        changeString (stringText) {
            return string = stringText
        },

        countCensors () { 
            return censorCount(censors, strArray) 
        },

        maskString () {
            return censorMask(censors, strArray)
        },

        maskPalindromes () {
            return censorPalindromes(strArray)
        }
    };
};

export {
    countOccurances,
    palindromeCheck,
    censorApp,
    mask,
    censorCount,
    censorMask,
    censorPalindromes
};