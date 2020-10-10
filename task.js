function countOccurances(index, string) {
    const splitStr = string.toLowerCase().split('')
    let count = 0;
    splitStr.forEach(char => {
        if (char === index.toLowerCase()) {
            count += 1;
        }
    })
    return count
}

function palindromeCheck(str) {
  const strArray = [];
  const reverseStr = [];

  str
    .toLowerCase()
    .split('')
    .forEach(letter => {
      if (letter.toLowerCase() !== letter.toUpperCase()) {
        strArray.push(letter);
        reverseStr.unshift(letter);
      }
    });

  return strArray.join('') === reverseStr.join('');
};

function mask(str) {
    let symbol = '';
    const tempArr = str.split('')
    if (tempArr[tempArr.length - 1].toLowerCase() == tempArr[tempArr.length - 1].toUpperCase()) {
        symbol = tempArr.pop();
    }
    tempArr.fill('$', 1, -1)
    return tempArr.join('') + symbol
}

function censorApp(censors, string) {
    const censorsObj = {};

    censors.forEach(censor => {
        censorsObj[censor.toLowerCase()] = 0
    })

    const strArray = string.split(' ');

    this.censorCount = () => {
        strArray.forEach(word => {
            Object.keys(censorsObj).forEach(censor => {
                if (word.toLowerCase().includes(censor)) {
                censorsObj[censor] = censorsObj[censor] + 1
            }})
        })
        return (censorsObj);    
    }

    this.censorMask = () => {
        const maskedArr =  strArray.map(word => {
            if (censors.some(val => word.toLowerCase().includes(val))) {
                return mask(word)
            }
            return word
        })
        return (maskedArr.join(' '))
    }

    this.censorPalindrome = function() {
        const maskedArr = strArray.map(word => {
            if (palindromeCheck(word)) {
                return mask(word)
            }
            return word
        })
        return (maskedArr.join(' '))
    }
};

export { countOccurances, palindromeCheck, censorApp, mask };

