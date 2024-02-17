// Generates a random shift for the Caesar cipher
export function generateCipherKey() {
    const shift = Math.floor(Math.random() * 26) + 1; // Generates a shift between 1 and 26
    return shift.toString();
}

// Validates the decryption attempt
export function validateDecryption(decryptionAttempt, encryptedMessage, cipherKey) {
    const decryptedMessage = decryptMessage(encryptedMessage, parseInt(cipherKey, 10));
    return decryptionAttempt.toLowerCase() === decryptedMessage.toLowerCase();
}

// Decrypts the message using the Caesar cipher key
export function decryptMessage(encryptedMessage, cipherKey) {
    let decryptedMessage = '';
    const shift = cipherKey % 26; // Ensure the shift is within the alphabet range

    for (let i = 0; i < encryptedMessage.length; i++) {
        let char = encryptedMessage[i];

        if (char.match(/[a-z]/i)) { // Check if the character is a letter
            let code = encryptedMessage.charCodeAt(i);

            // Uppercase letters
            if ((code >= 65) && (code <= 90)) {
                char = String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
            }
            // Lowercase letters
            else if ((code >= 97) && (code <= 122)) {
                char = String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
            }
        }

        decryptedMessage += char;
    }

    return decryptedMessage;
}
