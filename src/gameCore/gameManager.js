import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import PuzzleManager from './PuzzleManager.js';
import NarrativeManager from './NarrativeManager.js';
import { styles } from '../utils/chalkStyles.js';

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
    try {
      const asciiArt =  this.loadAsciiArt('./title-veil-of-shadows.txt');
      console.log(chalk.green(asciiArt));
      await this.narrativeManager.displayIntroduction();
      await this.promptForPlayerName();
      await this.promptForPlayerClass();
      await this.chooseDifficulty();
      this.startGameLoop();
    } catch (error) {
      console.error(chalk.red(`Initialization Error: ${error}`));
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