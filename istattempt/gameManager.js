import fs from 'fs/promises'; // Use fs/promises for async/await support
import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import PuzzleManager from './PuzzleManager.js';
import NarrativeManager from './NarrativeManager.js';
import { styles } from './utils/chalkStyles.js';
import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Player {
  constructor(name, playerClass) {
    this.name = name;
    this.class = playerClass;
  }
}

class GameManager {
  constructor() {
    this.player = new Player('Player', 'Investigator');
    this.gameState = { currentScene: 'introduction', difficulty: 'Easy' };
    this.puzzleManager = new PuzzleManager();
    this.narrativeManager = new NarrativeManager();
  }

  async initializeGame() {
    console.clear();
    try {
      await this.displayAsciiArtForScene('title'); // Assuming 'title.txt' exists in the specified directory
      await this.narrativeManager.displayIntroduction();
      await this.transitionToScene('chooseDifficulty');
    } catch (error) {
      console.error(chalk.red(`Initialization Error: ${error}`));
    }
  }

  async chooseDifficulty() {
    const response = await inquirer.prompt({
      name: 'difficulty',
      type: 'list',
      message: 'Select game difficulty:',
      choices: ['Easy', 'Medium', 'Hard'],
    });
    this.gameState.difficulty = response.difficulty;
    console.log(chalk.green(`Difficulty set to ${response.difficulty}.`));
    await this.transitionToScene('chooseClass');
  }

  async transitionToScene(sceneId) {
    await this.displayAsciiArtForScene(sceneId);
    this.handleScene(sceneId);
  }

  async displayAsciiArtForScene(sceneId) {
    const asciiArtPath = path.join(__dirname, 'assets', 'asciiArt', `${sceneId}.txt`);
    try {
      const asciiArt = await fs.readFile(asciiArtPath, 'utf8');
      console.log(chalk.yellow(asciiArt));
    } catch (error) {
      console.error(chalk.red(`Error reading ASCII art for scene ${sceneId}: ${error}`));
    }
  }

  async handleScene(sceneId) {
    switch (sceneId) {
      case 'chooseDifficulty':
        await this.chooseDifficulty();
        break;
      case 'chooseClass':
        await this.promptForPlayerClass();
        break;
      case 'enterName':
        await this.promptForPlayerName();
        break;
      case 'firstPuzzle':
        await this.puzzleManager.startPuzzle('DecipherMessagePuzzle', this.player.class);
        break;
      case 'nextScene':
        await this.narrativeManager.displayNextScene();
        break;
      case 'retryPuzzle':
        // Ensure retryPuzzle method is implemented in PuzzleManager
        await this.puzzleManager.retryPuzzle();
        break;
      default:
        console.log(chalk.red('Scene not recognized, returning to introduction.'));
        await this.transitionToScene('introduction');
    }
  }
  async promptForPlayerClass() {
    const response = await inquirer.prompt({
      name: 'class',
      type: 'list',
      message: 'Choose your class:',
      choices: ['Investigator', 'Scientist', 'Hacker'],
    });
    this.player.class = response.class;
    console.log(chalk.green(`Class set to ${response.class}.`));
    await this.transitionToScene('enterName');
  }

  async promptForPlayerName() {
    const response = await inquirer.prompt({
      name: 'playerName',
      type: 'input',
      message: 'What is your name?',
      validate: input => input.trim() ? true : 'Name cannot be empty.',
    });
    this.player.name = response.playerName;
    console.log(chalk.green(`Name set to ${response.playerName}.`));
    await this.transitionToScene('firstPuzzle');
  }

  async startGameLoop() {
    try {
      let gameOver = false;
      while (!gameOver) {
        await this.handleScene(this.gameState.currentScene);
      }
      console.log(chalk.yellow('Thank you for playing Veil of Shadows.'));
    } catch (error) {
      console.error(chalk.red(`Game Loop Error: ${error}`));
    }
  }

  async checkPuzzleOutcome() {
    if (this.gameState.puzzleOutcome) {
      console.log(styles.correctAnswer('Puzzle solved successfully!'));
      await this.transitionToScene('nextScene');
    } else {
      console.log(styles.incorrectAnswer('Puzzle was not solved. Try again?'));
      await this.transitionToScene('retryPuzzle');
    }
  }
}



export { GameManager };
