import inquirer from 'inquirer';
import styles from '../../istattempt/utils/chalkStyles.js';
import {  decryptMessage } from '../../istattempt/utils/puzzleHelpers.js';


class DecipherMessagePuzzle {
    constructor(playerClass) {
        this.playerClass = playerClass;
        this.encryptedMessage = "Gsv xlwv gl gsv Hklovmg: R mvevi rh zmwvihgzb lu gsviv rh gsv Ufm.";
        this.cipherKey = "";
    }
    generateCipherKeyForClass() {
        switch (this.playerClass) {
            case 'Investigator':
                return "Flu1918";
            case 'Scientist':
                return "CRISPR";
            case 'Hacker':
                return "DataTrail";
            default:
                return "";
        }
    }

    async initiatePuzzle() {
        console.log("Elena Martinez has provided you with crucial information to uncover the conspiracy.");
        switch (this.playerClass) {
            case 'Investigator':
                console.log("I'm relieved you found my email. The truth is hidden deeper than you think. Check the coordinates I sent. What you find there will change everything.");
                break;
            case 'Scientist':
                console.log("Your expertise is crucial now. This sequence isn't natural—it's a message, a blueprint. Decode it, and you'll see the real origin.");
                break;
            case 'Hacker':
                console.log("I knew your skills would lead you here. This backdoor isn't just any entry—it's a gateway to their darkest plans. Be ready for what you'll uncover.");
                break;
            default:
                console.log("An unexpected error occurred. Please try again.");
                break;
        }
        const decryptedMessage = this.simulateDecryption(this.encryptedMessage, this.cipherKey);
        this.interpretDecryptedMessage(decryptedMessage);
    }

    async collectKeyFragment() {
        let keyFragment = '';
        switch (this.playerClass) {
            case 'Investigator':
                console.log("Investigator Challenge: You've received a mysterious map leading to a hidden document.");
                keyFragment = await this.findLibraryKeyFragment();
                break;
            case 'Scientist':
                console.log("Scientist Challenge: A genetic puzzle awaits you in Dr. Adrian Shaw's abandoned lab.");
                keyFragment = await this.findLabKeyFragment();
                break;
            case 'Hacker':
                console.log("Hacker Challenge: Can you bypass the security of the New Dawn's encrypted server?");
                keyFragment = await this.findHackerDenKeyFragment();
                break;
            default:
                console.log("An unexpected error occurred. Please try again.");
                return;

        }

        this.cipherKey = keyFragment;
        console.log(`Key Fragment Collected: ${this.cipherKey}`);
    }
    simulateDecryption(encryptedMessage, cipherKey) {
        if (this.playerClass === 'Investigator') {
            return decryptMessage(encryptedMessage, cipherKey);
        } else if (this.playerClass === 'Scientist') {
            return decryptMessage(encryptedMessage, cipherKey);
        } else if (this.playerClass === 'Hacker') {
            return decryptMessage(encryptedMessage, cipherKey);
        } else {
            return "";
        }

    }
    decryptMessage(encryptedMessage, cipherKey) {
        return `In the shadows of a world gripped by fear and uncertainty, a truth has been concealed. The pandemic, a veil masking the machinations of a global elite known as the New World Order, was not a natural calamity but a carefully engineered crisis. This revelation, uncovered through the diligence of those who dare to question, who dare to seek what lies beyond the veil, marks only the beginning. The encrypted messages, the clandestine meetings, the silent whispers in the dark - all lead to the heart of their operation: a facility hidden away from prying eyes, where the next phase of their plan awaits. The key to thwarting their agenda lies not just in exposing the conspiracy, but in uniting those who have been divided, in awakening the masses to the chains that seek to bind them. Your journey, marked by courage and the unyielding quest for truth, ventures into the unknown. What lies ahead is a path fraught with danger, but illuminated by the light of hope. For in the depths of darkness, even the faintest spark can illuminate the way forward. The key you've uncovered, ${cipherKey}, is but the first step. The real challenge begins now, as you prepare to delve deeper into the heart of their domain. Trust in those who have shown themselves to be true allies, for together, you hold the power to unveil the shadows and reclaim the future that is rightfully ours.`;
    }
    interpretDecryptedMessage(encryptedMessage) {
        console.log(encryptedMessage);
        console.log("Armed with the knowledge of the conspiracy's depth and the identity of those behind it, your next step is clear. The coordinates embedded within the decrypted message point you towards a remote facility, the epicenter of their operations. It's there that you'll find the answers you seek and perhaps, the means to stop them once and for all.");
    }
}

async function findLibraryKeyFragment() {
    console.log("You've stumbled upon an old newspaper article from 1918, describing an event during the Spanish Flu. To access the key fragment, answer this question:");
    const { answer } = await inquirer.prompt({
        type: 'list',
        name: 'answer',
        message: 'What was a common preventive measure recommended during the Spanish Flu pandemic?',
        choices: [
            'Wearing masks',
            'Using hand sanitizer',
            'Social distancing',
            'All of the above'
        ],
    });
    if (answer === 'All of the above') {
            console.log("Correct! You've found the key fragment: Flu1918");
            return "Flu1918";
        }
        else {
            const tryAgain = inquirer.prompt({
                name: 'tryAgain',
                type: 'confirm',
                message: 'Would you like to try again?',
            })
            if (tryAgain.tryAgain) {
                this.findLibraryKeyFragment();

            }
        }
    }
    async function findLabKeyFragment() {
        console.log("Inside Dr. Shaw's lab, you find a genetic sequence that seems out of place. To unlock the safe containing the key fragment, identify the odd one out:");
        const { answer } = await inquirer.prompt({
            type: 'list',
            name: 'answer',
            message: 'Which of these is not a base of DNA?',
            choices: [
                'Adenine (A)',
                'Cytosine (C)',
                'Uracil (U)',
                'Guanine (G)'
            ],
        });
        if (answer === 'Uracil (U)') {
            console.log("Correct! Uracil is found in RNA, not DNA. You've found the key fragment: CRISPR");
            return "CRISPR";
        } else {
            const tryAgain = inquirer.prompt({
                name: 'tryAgain',
                type: 'confirm',
                message: 'Would you like to try again?',
            })
            if (tryAgain.tryAgain) {
                this.findLabKeyFragment();
            }
        }
    }
        
        async function findHackerDenKeyFragment() {
                    console.log("You're facing a digital lock with a simple cipher to crack. To access the key fragment, decode the following message: 'Vguvg'");
                    const { answer } = await inquirer.prompt({
                        type: 'input',
                        name: 'answer',
                        message: 'Enter the decoded message:',
                    });
                    if (answer.toLowerCase() === 'truth') {
                        console.log("Correct! The message was 'Truth'. You've bypassed the security and found a key fragment: DataTrail");
                        return "DataTrail";
                    } else {
                        console.log("That's not quite right. try again? The encrypted message was a simple shift. Try looking into Caesar cipher decoding.");
                        const tryAgain = inquirer.prompt({
                            name: 'tryAgain',
                            type: 'confirm',
                            message: 'Would you like to try again?',
                        })
                        if (tryAgain.tryAgain) {
                            this.findHackerDenKeyFragment(); {
                            }
                            this.cipherKey = this.generateCipherKeyForClass();
                            await this.simulateDecryption();
                        }
                    }

        }
        export default DecipherMessagePuzzle;