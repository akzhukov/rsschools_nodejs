var alpPower = 26

function shiftLetter(letter, shift) {
    shift = (shift % alpPower + alpPower) % alpPower;

    if (letter >= 'a' && letter <= 'z') {
        letter = String.fromCharCode((letter.charCodeAt(0) - 'a'.charCodeAt(0) + shift) % alpPower + 'a'.charCodeAt(0));
    }
    if (letter >= 'A' && letter <= 'Z') {
        letter = String.fromCharCode((letter.charCodeAt(0) - 'A'.charCodeAt(0) + shift) % alpPower + 'A'.charCodeAt(0));
    }
    return letter;
}

function encode(text, shift){
    let outputText = '';
    for (let i = 0; i < text.length; i++) {
        outputText += shiftLetter(text[i], shift);
    }
    return outputText;
}

function decode(text, shift){
    return encode(text, -shift);
}

module.exports = {encode,decode};