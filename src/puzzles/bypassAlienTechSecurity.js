import Inquirer from 'inquirer';
import chalk from 'chalk';

class BypassAlienTechSecurity {
  constructor() {
    this.encryptedDeviceMessage = "ALIEN COMMUNICATION ENCRYPTED MESSAGE";
    this.decryptionKey = "SIMPLE DECRYPTION KEY"; // For simplicity, a placeholder
  }

  async decryptDeviceMessage(encryptedMessage, key) {
    // Simulate decryption logic (for complexity, consider using a real encryption algorithm in a full game)
    return encryptedMessage.split('').reverse().join(''); // Placeholder decryption logic
  }

  async hackAttempt() {
    console.log(chalk.green("You're in front of the alien device. Its interface is unlike anything you've seen, but you're ready to hack it."));
    console.log(this.encryptedDeviceMessage);
    console.log(chalk.yellow("The device's security is formidable. You'll need to decrypt the message to proceed."));
    const decryptedMessage = await this.decryptDeviceMessage(this.encryptedDeviceMessage, this.decryptionKey);
    
    return Inquirer.prompt([{
      type: 'input',
      name: 'hackedMessage',
      message: 'Enter your hack attempt to decrypt the alien message:',
    }])
    .then(answer => {
      if (answer.hackedMessage.trim() === decryptedMessage) {
        console.log(chalk.green("Access granted. Alien communications intercepted. Plans for a global surveillance network unveiled."));
        return 'success';
      } else {
        console.log(chalk.red("Access denied. Security protocols initiated. Would you like to try again or seek another approach?"));
        return this.offerRetryOrExplore();
      }
    });
  }

  async offerRetryOrExplore() {
    return Inquirer.prompt([{
      type: 'list',
      name: 'nextStep',
      message: 'Your hacking attempt was unsuccessful. What would you like to do next?',
      choices: ['Retry hacking attempt', 'Seek alternative methods', 'Exit puzzle'],
    }])
    .then(answer => {
      switch (answer.nextStep) {
        case 'Retry hacking attempt':
          return this.hackAttempt();
        case 'Seek alternative methods':
          console.log(chalk.yellow("Exploring alternative methods to uncover the alien plans."));
          // Implement alternative methods here
          break;
        case 'Exit puzzle':
          console.log(chalk.blue("Exiting the hacking attempt. The truth remains hidden... for now."));
          break;
      }
    });
  }

  async startHackingChallenge() {
    console.log(chalk.blue("A defector from the New World Order has tipped you off about an alien communication device..."));
    await this.hackAttempt();
  }
}
function hackerScenario() {
    console.log(chalk.yellow('An alien communication device, heavily encrypted, holds secrets critical to understanding the global conspiracy.'));
    hackIntoAlienCommDevice();
}

// Define the hacking challenge
async function hackIntoAlienCommDevice() {
    console.log(chalk.green("You're in front of the alien device, ready to breach its defenses."));
    // Simulate a hacking attempt
    const outcome = await Inquirer.prompt([{
        type: 'input',
        name: 'hackAttempt',
        message: 'Type "hack" to initiate the infiltration attempt:',
    }]);

    if (outcome.hackAttempt.toLowerCase() === 'hack') {
        console.log(chalk.green("Access granted. Alien communications intercepted."));
        revealAlienPlans();
    } else {
        console.log(chalk.red("Access denied. The device's security protocols have been triggered."));
        offerRetryOrExplore();
    }
}

// Function to reveal the alien plans upon successful hack
function revealAlienPlans() {
    console.log(chalk.blue("The hacked communications reveal plans for a global surveillance network, a collaboration between the government and extraterrestrial forces."));
    // Proceed with the narrative or offer choices for the next steps
}

// Function to offer retry or explore other leads upon failure or choosing not to hack immediately
function offerRetryOrExplore() {
    Inquirer.prompt([{
        type: 'list',
        name: 'nextAction',
        message: 'What do you do next?',
        choices: ['Retry hacking', 'Explore other leads', 'End demo'],
    }])
    .then(answer => {
        switch(answer.nextAction) {
            case 'Retry hacking':
                hackIntoAlienCommDevice();
                break;
            case 'Explore other leads':
                console.log(chalk.yellow('You decide to look for more clues elsewhere.'));
                // Logic for exploring other leads
                break;
            case 'End demo':
                console.log(chalk.blue('Thank you for playing the demo of Veil of Shadows.'));
                break;
        }
    });
}

export default BypassAlienTechSecurity;
