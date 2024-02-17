import inquirer from 'inquirer';
import styles from '../utils/chalkStyles.js';
import { decryptMessage } from '../utils/puzzleHelpers.js';

class DecipherMessagePuzzle {
    constructor() {
        this.playerClass = '';
        this.encryptedMessage = "Gsv xlwv gl gsv Hklovmg: R mvevi rh zmwvihgzb lu gsviv rh gsv Ufm.";
        this.cipherKey = this.generateCipherKey();
    }

    setPlayerClass(playerClass) {
        this.playerClass = playerClass;
        this.cipherKey = this.generateCipherKey();
    }

    generateCipherKey() {
        const keys = {
            Investigator: "Flu1918",
            Scientist: "CRISPR",
            Hacker: "DataTrail"
        };
        return keys[this.playerClass] || "";
    }

    async initiatePuzzle() {
        console.log(styles.narrative("Elena Martinez has provided you with crucial information to uncover the conspiracy."));
        await this.presentPuzzleContext();
        const decryptedMessage = this.decryptMessage(this.encryptedMessage, this.cipherKey);
        this.interpretDecryptedMessage(decryptedMessage);
    }

    async presentPuzzleContext() {
        let contextMessage;
        switch (this.playerClass) {
            case 'Investigator':
                contextMessage = "The coordinates you've received lead you to a hidden cache. Inside, you find a coded message.";
                break;
            case 'Scientist':
                contextMessage = "Analyzing the genetic sequence, you realize it's encoded with a message. Deciphering it could reveal its origins.";
                break;
            case 'Hacker':
                contextMessage = "You've infiltrated a secure network. Among the data, you find an encrypted file.";
                break;
        }
        console.log(styles.hint(contextMessage));
    }

    decryptMessage(encryptedMessage, cipherKey) {
        let decryptedMessage = '';
        for (let i = 0, j = 0; i < encryptedMessage.length; i++) {
            const currentChar = encryptedMessage[i];
            if (currentChar.match(/[a-z]/i)) { // Check if it's a letter
                const code = encryptedMessage.charCodeAt(i);
                let shift = cipherKey.charCodeAt(j % cipherKey.length) - 65; // A=0, B=1, C=2, etc.
                
                if (code >= 65 && code <= 90) { // Uppercase
                    decryptedMessage += String.fromCharCode((code - 65 - shift + 26) % 26 + 65);
                } else if (code >= 97 && code <= 122) { // Lowercase
                    decryptedMessage += String.fromCharCode((code - 97 - shift + 26) % 26 + 97);
                }
                j++;
            } else {
                decryptedMessage += currentChar; // Non-alphabetic characters
            }
        }
        return decryptedMessage;
    }

    interpretDecryptedMessage(decryptedMessage) {
        console.log(styles.correctAnswer(`Decrypted message: ${decryptedMessage}`));
        console.log(styles.systemMessage("Using the information uncovered, you realize the next step in unraveling the conspiracy."));
    }

    async verifySolution() {
        const { isCorrect } = await inquirer.prompt({
            name: 'isCorrect',
            type: 'confirm',
            message: 'Did you understand the message?',
        });

        if (isCorrect) {
            console.log(styles.success("You've successfully uncovered the truth."));
        } else {
            console.log(styles.error("Let's try deciphering the message again."));
            await this.solvePuzzle();
        }
    }
}

export default DecipherMessagePuzzle;