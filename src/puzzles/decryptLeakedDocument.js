import inquirer  from 'inquirer';


// Cipher key and encrypted message
const cipherKey = {
  'A': 'N', 'B': 'O', 'C': 'P', 'D': 'Q', 'E': 'R', 'F': 'S', 'G': 'T',
  'H': 'U', 'I': 'V', 'J': 'W', 'K': 'X', 'L': 'Y', 'M': 'Z', 'N': 'A',
  'O': 'B', 'P': 'C', 'Q': 'D', 'R': 'E', 'S': 'F', 'T': 'G', 'U': 'H',
  'V': 'I', 'W': 'J', 'X': 'K', 'Y': 'L', 'Z': 'M'
};
const encryptedMessage = "GUR YBPNGVBA VF NG GUR BYQ ERFRNEPU SNPVYVGL";

function decryptMessage(encryptedMsg, key) {
  return encryptedMsg.split('').map(char => key[char] || char).join('');
}
class DecryptLeakedDocument {
    constructor() {
        this.decryptMessage = decryptMessage;
      }
    
    // Method to attempt decryption
    async decryptAttempt() {
        console.log("You decide to attempt to decrypt the encrypted message.");
        return inquirer.prompt([{
          type: 'input',
          name: 'decryptedMessage',
          message: 'Enter your decrypted message:',
        }])
        .then(answer => {
          const decryptedMessage = this.decryptMessage(encryptedMessage, cipherKey).toLowerCase();
          if (answer.decryptedMessage.trim().toLowerCase() === decryptedMessage) {
            console.log("Elena responds, 'You've uncovered what many wouldn't dare to believe. This is just the beginning. The truth is far more sinister.'");
            console.log("With the decrypted message, you now have a lead on the pandemic's origins. It's time to investigate the old research facility.");
            console.log("Thank you for playing the demo for Veil of Shadows. Explore further in the full game.");
            return 'success';
          } else {
            console.log("That doesn't seem to be the right decryption. Elena suggests double-checking the cipher key and trying again.");
            // Offer to retry the decryption attempt
            return this.offerAlternativePathsOrRetry();
          }
        });
      }
    async offerAlternativePathsOrRetry() {
        const retry = await inquirer.prompt([{
          type: 'confirm',
          name: 'retry',
          message: 'Would you like to attempt to decrypt the message again?',
          default: true,
        }])
              if (retry.retry) {
                this.decryptAttempt();
            } else {
                console.log("You decide to investigate further before attempting again. There might be more clues out there.");
                console.log("Thank you for playing the demo for Veil of Shadows. Explore further in the full game.");
              }
            }
    // Method to start the decryption challenge
    async start() {
        return this.investigatorFirstChallenge();
      }
  
    async investigatorFirstChallenge() {
        console.log("The email contains a series of numbers and letters - a cipher key, and an encrypted message. 'The truth is locked behind these characters,' the email concludes.");
        return inquirer.prompt([{
          type: 'confirm',
          name: 'attemptDecrypt',
          message: 'Will you attempt to decrypt the message now?',
        }])
        .then(answer => {
          if (answer.attemptDecrypt) {
            return this.decryptAttempt(); d
          } else {
            console.log("You decide to investigate further before attempting decryption. There might be more clues out there.");
            return 'defer';
          }
        });
      }
    }
    
    export default DecryptLeakedDocument;