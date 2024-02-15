import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import PuzzleManager from './puzzleManager.js';
import NarrativeManager from './NarrativeManager.js';
import {styles} from '../utils/chalkStyles.js';

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
    const asciiArt = await this.loadAsciiArt('title-veil-of-shadows.txt');
    console.log(asciiArt);
    await this.narrativeManager.displayIntroduction();
    await this.loadAscii.GameManager.initialize
    await this.promptForPlayerName();
    await this.promptForPlayerClass();
    await this.chooseDifficulty();

    this.startGameLoop();

  } catch(error){
    console.error(chalk.red(`Failed to load ASCII art: ${error}`));
  }
  async loadAsciiArt(filename) {
    try {
      const artPath = path.join(__dirname, '..', 'assets', filename);
        return fs.promises.readFile(artPath, 'utf8');
    } catch (error) {
      console.error(chalk.red(`Failed to load ASCII art: ${error}`));
    return 'ASCII art not found.'
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
    console.clear();
    const intro = styles.default.narrative;
    const title = styles.default.title;
    const ascii = styles.default.incorrectAnswer;
    const asciiArt = await this.loadAsciiArt('ascii-art.txt');
    console.log(ascii(asciiArt));
    console.log(title('Veil of Shadows'));
    console.log(intro("In the shadowed corners of a world not unlike our own, you stand at the brink of uncovering truths that have long been shrouded in mystery. 'Veil of Shadows' beckons you into a realm where the line between reality and conspiracy blurs. With only your wit and determination, you're about to dive into an investigation that could change everything—or cost you everything."));

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
        default:
          console.log(styles.red('The journey concludes... for now.'));
          gameOver = true;
          break;
      }
    }
    console.log(styles.green('Thank you for playing Veil of Shadows.'));
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