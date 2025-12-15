const ones = [
    "", "one", "two", "three", "four", "five",
    "six", "seven", "eight", "nine", "ten",
    "eleven", "twelve", "thirteen", "fourteen",
    "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
];

const tens = [
    "", "", "twenty", "thirty", "forty",
    "fifty", "sixty", "seventy", "eighty", "ninety"
];

function twoDigitToWords(num) {
    if (num < 20) return ones[num];
    return tens[Math.floor(num / 10)] +
        (num % 10 ? " " + ones[num % 10] : "");
}

//NUMBER to WORDS 
function convertNumberToWords(num) {
    if (num === 0) return "zero";

    let result = "";

    if (num >= 10000000) {
        result += twoDigitToWords(Math.floor(num / 10000000)) + " crore ";
        num %= 10000000;
    }

    if (num >= 100000) {
        result += twoDigitToWords(Math.floor(num / 100000)) + " lakh ";
        num %= 100000;
    }

    if (num >= 1000) {
        result += twoDigitToWords(Math.floor(num / 1000)) + " thousand ";
        num %= 1000;
    }

    if (num >= 100) {
        result += ones[Math.floor(num / 100)] + " hundred ";
        num %= 100;
    }

    if (num > 0) {
        result += twoDigitToWords(num);
    }

    return result.trim();
}

//WORDS to NUMBER 
function convertWordsToNumber(words) {
    const wordMap = {
        zero: 0, one: 1, two: 2, three: 3, four: 4,
        five: 5, six: 6, seven: 7, eight: 8, nine: 9,
        ten: 10, eleven: 11, twelve: 12, thirteen: 13,
        fourteen: 14, fifteen: 15, sixteen: 16,
        seventeen: 17, eighteen: 18, nineteen: 19,
        twenty: 20, thirty: 30, forty: 40, fifty: 50,
        sixty: 60, seventy: 70, eighty: 80, ninety: 90
    };

    let tokens = words
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim()
        .split(" ");

    let total = 0;
    let current = 0;

    for (let word of tokens) {
        if (word === "crore") {
            total += current * 10000000;
            current = 0;
        } else if (word === "lakh") {
            total += current * 100000;
            current = 0;
        } else if (word === "thousand") {
            total += current * 1000;
            current = 0;
        } else if (word === "hundred") {
            current *= 100;
        } else if (wordMap[word] !== undefined) {
            current += wordMap[word];
        }
    }

    return total + current;
}

document.getElementById("numberInput").addEventListener("input", function () {
    let value = parseInt(this.value);
    document.getElementById("numberOutput").innerText =
        isNaN(value) ? "" : convertNumberToWords(value);
});

document.getElementById("wordsInput").addEventListener("input", function () {
    let value = this.value.trim();
    document.getElementById("wordsOutput").innerText =
        value === "" ? "" : convertWordsToNumber(value);
});
