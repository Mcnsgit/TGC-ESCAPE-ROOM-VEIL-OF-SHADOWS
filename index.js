import fs from 'fs/promises'; // Use fs/promises for async/await support
import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import  styles  from './src/utils/chalkStyles.js'; 
import { fileURLToPath } from 'url';
import DecipherMessagePuzzle from './istattempt/decipherMessage.js';
import BypassAlienTechSecurity from './src/puzzles/bypassAlienTechSecurity.js';
import DecryptLeakedDocument from './src/puzzles/decryptLeakedDocument.js';
import synthesiseCure from './src/puzzles/synthesiseCure.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Player {
  constructor(name, playerClass) {
    this.name = name;
    this.class = playerClass;
  }
}

class GameManager {
  constructor() {
    this.player = { name: '', class: '' };
    this.gameState = { currentScene: 'introduction', difficulty: 'Easy' };
    this.DecipherMessagePuzzle = new DecipherMessagePuzzle();
    this.BypassAlienTechSecurity = new BypassAlienTechSecurity(); 
    this.DecryptLeakedDocument = new DecryptLeakedDocument();
    this.synthesiseCure = new synthesiseCure();};

  

  async displayAsciiArtForScene(sceneId) {
    const asciiArtPath = path.join(__dirname, 'assets', 'asciiArt', `${sceneId}.txt`);
    try {
      const asciiArt = await fs.readFile(filePath, 'utf8');
      console.log(chalk.yellow(asciiArt));
      await this.pressToContinue(); // Ensure the user has time to view the art
    } catch (error) {
      console.error(chalk.red(`Error reading ASCII art for scene ${sceneId}: ${error}`));
    }
  }

  async pressToContinue() {
    console.log(chalk.cyan('\nPress Enter to continue...'));
    await inquirer.prompt([{
      type: 'input',
      name: 'continue',
      message: ''
    }]);
  }

  async slowPrint(text, delay = 100) {
    for (const char of text) {
      process.stdout.write(char);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    console.log(''); // Ensure there's a newline after text
    await this.pressToContinue();
  }

  async initializeGame() {
    const narrative = styles.default.narrative;
    try {
      console.clear();
      await this.displayAsciiArtForScene('title');
      await this.slowPrint(narrative(`In the shadow of a world ravaged by a pandemic, the thin line between reality and deception blurs. "Veil of Shadows" is not just a game; it's a journey into the heart of darkness, where conspiracy threads the narrative fabric, power plays hide in the unseen, and the pursuit of truth becomes a beacon in the night.\n Navigating through this intricate maze, you'll uncover hidden motives that challenge perception, forge alliances in hushed tones, and face moral quandaries that reflect the true weight of choice. As the darkness grows, revealing the clandestine forces shaping our fate, one question lingers, carried by the winds of change:
      \n\n"Are you prepared to traverse the veil, to champion a future where truth, freed from the clutches of power, can bask in the light of day?"`), 1); 
      await this.chooseDifficulty();
    } catch (error) {
      console.error(chalk.red(`Initialization Error: ${error}`));
    }
  }

  async chooseDifficulty() {
    try {
      await this.displayAsciiArtForScene('chooseDifficulty');
      const response = await inquirer.prompt({
        name: 'difficulty',
        type: 'list',
        message: 'Select game difficulty:',
        choices: ['Easy', 'Medium', 'Hard'],
      });
      this.gameState.difficulty = response.difficulty;
      console.log(chalk.green(`Difficulty set to ${response.difficulty}.`));
      await this.transitionToScene('selectClass');
    } catch (error) {
      console.error(chalk.red(`Error in chooseDifficulty: ${error}`));
    }
  }

  async selectClass() {
    try {
      await this.displayAsciiArtForScene('selectClass');
      const response = await inquirer.prompt({
        type: 'list',
        name: 'playerClass',
        message: 'Choose your class:',
        choices: ['Investigator', 'Scientist', 'Hacker'],
      });
      this.player.class = response.playerClass;
      console.log(chalk.green(`Class set to ${response.playerClass}.`));
      await this.transitionToScene('promptForPlayerName');
    } catch (error) {
      console.error(chalk.red(`Error in selectClass: ${error}`));
    }
  }

  async promptForPlayerName() {
    try {
      await this.displayAsciiArtForScene('enterName');
      const response = await inquirer.prompt({
        name: 'playerName',
        type: 'input',
        message: 'What is your name?',
        validate: input => input.trim() ? true : 'Name cannot be empty.',
      });
      this.player.name = response.playerName;
      console.log(chalk.green(`Name set to ${response.playerName}.`));

      // Directly start the puzzle after setting the player's name.
      this.startPuzzleForClass();
  } catch (error) {
      console.error(chalk.red(`Error in promptForPlayerName: ${error}`));
  }
}

async startPuzzleForClass() {
  try {
    switch (this.player.class) {
      case 'Investigator':
        this.DecryptLeakedDocument = new DecryptLeakedDocument();
        await this.DecryptLeakedDocument.start();
        break;
      case 'Scientist':
        this.synthesiseCure = new synthesiseCure();
        await this.synthesiseCure.synthesiseAntidote();
        break;
      case 'Hacker':
        this.BypassAlienTechSecurity = new BypassAlienTechSecurity();
        await this.BypassAlienTechSecurity.hackAttempt();
        break;
      default:
        throw new Error(`Invalid class: ${this.player.class}`);
    }
  } catch (error) {
    console.error(chalk.red(`Error starting puzzle: ${error}`));
  }
}


  async displayAsciiArtForScene(sceneId) {
    const asciiArtPath = path.join(__dirname, `${sceneId}.txt`);
    try {
      const asciiArt = await fs.readFile(asciiArtPath, 'utf8');
      console.log(chalk.yellow(asciiArt));
    } catch (error) {
      console.error(chalk.red(`Error reading ASCII art for scene ${sceneId}: ${error}`));
    }
  }
async introStart(sceneId) {
  const introduction = await this.displayAsciiArtForScene('introduction');
  console.log(introduction);

  await this.displayAsciiArtForScene('introduction');
  await this.transitionToScene('chooseDifficulty');
}
async transitionToScene(sceneId) {
  switch (sceneId) {
    case 'chooseDifficulty':
      await this.chooseDifficulty();
      break;
    case 'selectClass':
      await this.selectClass();
      break;
    case 'promptForPlayerName':
      await this.promptForPlayerName();
      break;
    // Add other cases for different scenes
    default:
      console.log(chalk.red('Scene not recognized, returning to introduction.'));
      await this.transitionToScene('introduction');
  }
}
      
      async startInvestigatorPath() {
        console.log("As an Investigator, your keen eye for detail and deductive reasoning skills will be crucial.");
        console.log("Your first task arrives via a mysterious email, hinting at the pandemic's engineered origins...");
       DecryptLeakedDocument = new DecryptLeakedDocument();
        DecryptLeakedDocument.investigatorFirstChallenge()
         await then(outcome => {
            console.log(outcome);
            if (outcome === 'defer') {
              // Handle defer logic if needed
            } else {
              // Handle success logic if needed
              initiateFirstChallenge();
            }
          });
        
           
async function printWithDelay(text, delay = 100) {
          if (typeof text !== 'string') {
              text = 'An unexpected error occurred. Please try again.';
              console.error('printWithDelay called with non-string text:', text);
              return; 
          }
      
          for (const line of text.split('\n')) {
              await new Promise(resolve => setTimeout(resolve, delay));
              console.log(line);
          }
      }
  }   



startscientistPath(player) {
 console.log(chalk.yellow('A strange virus is spreading. Can you synthesize a cure before it’s too late?'));
  const curePuzzle = new synthesiseCure();
  curePuzzle.synthesiseAntidote(); 
}

startHackerPath() {
  console.log(chalk.yellow('As a Hacker, your skills at digital infiltration will face the ultimate test.'));
  const hackerPuzzle = new BypassAlienTechSecurity();
  hackerPuzzle.bypassAlienTechSecurity();
}

initiateFirstChallenge(player) {
    // Example for an Investigator class
    if (player instanceof Investigator) {
      console.log(chalk.yellow("Your first task is to investigate a mysterious letter found at the crime scene."));
    }else if (player instanceof Scientist) {
      console.log(chalk.yellow("Your first task is to synthesize a cure for the virus."));
    }else if (player instanceof Hacker) {
      console.log(chalk.yellow("Your first task is to hack into the government's system."));
    }
    
  }

proceedWithStorylineAfterSuccess() {
    console.log(chalk.yellow("Investigating the old research facility might uncover more about the pandemic's origins..."));
    
    console.log(chalk.green("You arrive at the decrepit facility, its secrets hidden within. However..."));
    
    // Wrapping up the demo
    setTimeout(() => { // Using setTimeout to simulate the passage of time before the message.
        console.log(Chalk.blue("Thank you for playing the demo for Veil of Shadows. More mysteries await in the full game."));
    }, 3000); // Wait for 3 seconds before showing the thank you message.
}

 offerAlternativePathsOrRetry() {
    inquirer.prompt([{
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
}}
const gameManager = new GameManager();
gameManager.initializeGame().catch((error) => console.error(chalk.red(`Failed to start the game: ${error}`)));
       export default new GameManager(); 
