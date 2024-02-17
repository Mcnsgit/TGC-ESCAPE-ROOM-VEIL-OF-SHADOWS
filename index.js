import styles from './src/utils/chalkStyles.js';
import Inquirer from 'inquirer';
import Chalk from 'chalk';
import Investigator from './src/gameCore/classes/investigator.js';  
import Scientist from './src/gameCore/classes/scientist.js';
import Hacker from './src/gameCore/classes/hacker.js';
import DecryptLeakedDocument from './src/puzzles/DecryptLeakedDocument.js';
import BypassAlienTechSecurity from './src/puzzles/bypassAlienTechSecurity.js';
import synthesiseCure from './src/puzzles/synthesiseCure.js';

async function main() {
  const title = styles.default.title;
const ending = styles.default.ending;
const promptForPlayerClass = styles.default.promptForPlayerClass;
const promptForPlayerName = styles.default.promptForPlayerName;
const chooseDifficulty = styles.default.chooseDifficulty;
const displayAsciiArtForScene = styles.default.displayAsciiArtForScene;
const narrative = styles.default.narrative;
const handleScene = styles.default.handleScene;
const transitionToScene = styles.default.transitionToScene;
const initializeGame = styles.default.initializeGame;
const loadAsciiArt = styles.default.loadAsciiArt;
}
console.log(Chalk.yellow('Welcome to Veil of Shadows!'));
console.log(Chalk.green('A journey through shadows and truths awaits you.'));

function startGame() {
    selectClass();
}
function selectClass() {
        Inquirer.prompt([{
          type: 'list',
          name: 'playerClass',
          message: 'Choose your class:',
          choices: ['Investigator', 'Scientist', 'Hacker'],
        }])
        .then(answers => {
          switch (answers.playerClass) {
            case 'Investigator':
              startInvestigatorPath();
              break;
            case 'Scientist':
                startscientistPath();
              console.log('Starting Scientist storyline...');
              break;
            case 'Hacker':
              startHackerPath();
              console.log('Starting Hacker storyline...');
              break;
          }
        });
      }
      
      function startInvestigatorPath() {
        console.log("As an Investigator, your keen eye for detail and deductive reasoning skills will be crucial.");
        console.log("Your first task arrives via a mysterious email, hinting at the pandemic's engineered origins...");
        const decryptLeakedDocument = new DecryptLeakedDocument();
        decryptLeakedDocument.investigatorFirstChallenge()
          .then(outcome => {
            console.log(outcome);
            if (outcome === 'defer') {
              // Handle defer logic if needed
            } else {
              // Handle success logic if needed
              initiateFirstChallenge();
            }
          });
        }
           
       



function startscientistPath(player) {
    console.log(Chalk.yellow('A strange virus is spreading. Can you synthesize a cure before it’s too late?'));
    const curePuzzle = new synthesiseCure();
    curePuzzle.synthesiseAntidote(); 
}
function startHackerPath() {
    console.log(Chalk.yellow('As a Hacker, your skills at digital infiltration will face the ultimate test.'));
    const hackerPuzzle = new BypassAlienTechSecurity();
    hackerPuzzle.bypassAlienTechSecurity();
}

function initiateFirstChallenge(player) {
    // Example for an Investigator class
    if (player instanceof Investigator) {
      console.log(Chalk.yellow("Your first task is to investigate a mysterious letter found at the crime scene."));
    }else if (player instanceof Scientist) {
      console.log(Chalk.yellow("Your first task is to synthesize a cure for the virus."));
    }else if (player instanceof Hacker) {
      console.log(Chalk.yellow("Your first task is to hack into the government's system."));
    }
    
  }


function proceedWithStorylineAfterSuccess() {
    console.log(Chalk.yellow("Investigating the old research facility might uncover more about the pandemic's origins..."));
    
    console.log(Chalk.green("You arrive at the decrepit facility, its secrets hidden within. However..."));
    
    // Wrapping up the demo
    setTimeout(() => { // Using setTimeout to simulate the passage of time before the message.
        console.log(Chalk.blue("Thank you for playing the demo for Veil of Shadows. More mysteries await in the full game."));
    }, 3000); // Wait for 3 seconds before showing the thank you message.
}

function offerAlternativePathsOrRetry() {
    Inquirer.prompt([{
        type: 'list',
        name: 'retryOrExplore',
        message: 'Would you like to try decrypting the message again, or would you prefer to investigate other leads?',
        choices: ['Retry decryption', 'Explore other leads', 'Exit demo'],
    }])
    .then(answers => {
        switch(answers.retryOrExplore) {
            case 'Retry decryption':
                // Call the decryption function again; for simplicity, let's log a message.
                console.log(Chalk.yellow("Let's attempt to decrypt the message once more..."));
                // This would be a call to the decryption puzzle function again.
                break;
            case 'Explore other leads':
                console.log(Chalk.yellow("You decide to look for more clues elsewhere..."));
                // Simulate exploring other leads with a message.
                setTimeout(() => {
                    console.log(Chalk.blue("Thank you for playing the demo for Veil of Shadows. Explore further in the full game."));
                }, 3000);
                break;
            case 'Exit demo':
                console.log(Chalk.blue("Thank you for playing the demo for Veil of Shadows. Your journey has only just begun."));
                // Exit the demo.
                break;
        }
    });
}
main().catch(err => console.error("An unexpected error occurred:", err));

startGame();
