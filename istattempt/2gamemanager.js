import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import PuzzleManager from '../src/gameCore/PuzzleManager.js';
import NarrativeManager from '../src/gameCore/NarrativeManager.js';
import { styles } from '../src/utils/chalkStyles.js';
import { fileURLToPath } from 'url';

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
    this.player = null;
    this.gameState = { currentScene: 'introduction', difficulty: 'Easy' };
    this.puzzleManager = new PuzzleManager();
    this.narrativeManager = new NarrativeManager();
  }
  async initializeGame() {
    // Load and display ASCII art
    const asciiArt = await this.loadAsciiArt('title.txt');
    console.log(chalk.blue(asciiArt));
    // Display game introduction
    await this.narrativeManager.displayIntroduction();
    // Prompt for player name and class
    await this.promptForPlayerName();
    await this.promptForPlayerClass();
    // Choose difficulty
    await this.chooseDifficulty();
    // Start the game loop
    this.startGameLoop();
  }

  async loadAsciiArt(filename) {
    try {
      const artPath = path.join(__dirname, '..', 'assets', filename);
      return fs.promises.readFile(artPath, 'utf8');
    } catch (error) {
      console.error(chalk.red(`Failed to load ASCII art: ${error}`));
      return 'Failed to load ASCII art.';
    }
  }
  async promptForPlayerName() {
    const { playerName } = await inquirer.prompt({
      name: 'playerName',
      type: 'input',
      message: 'What is your name?',
      validate: input => input.trim() ? true : 'Name cannot be empty.',
    });
    this.player = new Player(playerName);
  }
  
  async promptForPlayerClass() {
    const { class: playerClass } = await inquirer.prompt({
      name: 'class',
      type: 'list',
      message: 'Choose your class:',
      choices: ['Investigator', 'Scientist', 'Hacker'],
    });
    this.player.class = playerClass;
  }
  

  async promptForPlayerClass() {
    const { class: playerClass } = await inquirer.prompt({
      name: 'class',
      type: 'list',
      message: 'Choose your class:',
      choices: ['Investigator', 'Scientist', 'Hacker'],
    });
    this.player.class = playerClass;
  }

  async chooseDifficulty() {
    const { difficulty } = await inquirer.prompt({
      name: 'difficulty',
      type: 'list',
      message: 'Select game difficulty:',
      choices: ['Easy', 'Medium', 'Hard'],
    });
    this.gameState.difficulty = difficulty;
  }
  
  async startGameLoop() {
    try {
      let gameOver = false;
      while (!gameOver) {
        switch (this.gameState.currentScene) {
          case 'introduction':
            await this.narrativeManager.displayIntroduction();
            this.transitionToScene('chooseDifficulty');
            break;
          case 'chooseDifficulty':
            await this.chooseDifficulty();
            this.transitionToScene('firstPuzzle');
            break;
            case 'firstPuzzle':
            await this.puzzleManager.startPuzzle('DecipherTheCode');
            this.checkPuzzleOutcome();
            break;
            case 'nextScene':
            await this.narrativeManager.displayNextScene();
            break;
            case 'retryPuzzle':
            await this.puzzleManager.startPuzzle();
            this.checkPuzzleOutcome();
            break;
            default:
              console.log(styles.green('Thank you for playing Veil of Shadows.'));
              gameOver = true;
              break;
          }
        }
      } catch (error) {
        console.error(chalk.red(`Game Loop Error: ${error}`));
      }
    }

  transitionToScene(sceneId) {
    const systemMessage = styles.default.systemMessage;
    console.log(systemMessage(`Transitioning to scene: ${sceneId}`));
    this.gameState.currentScene = sceneId;
  }
  async saveGame() {
    const saveData = JSON.stringify({
      player: this.player,
      gameState: this.gameState,
    });
  
    try {
      await fs.writeFile('saveGame.json', saveData, 'utf8');
      console.log(styles.systemMessage('Game saved successfully.'));
    } catch (error) {
      console.error(styles.error(`Failed to save game: ${error}`));
    }
  }
  
  async loadGame() {
    try {
      const data = await fs.readFile('saveGame.json', 'utf8');
      const { player, gameState } = JSON.parse(data);
      this.player = player;
      this.gameState = gameState;
      console.log(styles.systemMessage('Game loaded successfully.'));
      this.startGameLoop(); // Resume game loop
    } catch (error) {
      console.error(styles.error(`Failed to load game: ${error}`));
    }
  }
  
  checkPuzzleOutcome() {
    if (this.gameState.puzzleOutcome === true) {
      console.log(styles.success('Puzzle solved successfully!'));
      this.transitionToScene('nextScene');
    } else {
      console.log(styles.error('Puzzle was not solved. Try again?'));
      this.transitionToScene('retryPuzzle');
    }
  }
}

export { GameManager };