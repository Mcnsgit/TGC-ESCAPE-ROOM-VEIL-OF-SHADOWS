import { prompt } from 'inquirer';
import { red, yellow, green } from 'chalk';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import PuzzleManager from './puzzleManager.js';
import NarrativeManager from './narrativeManager.js';
import styles from '../utils/chalkStyles.js'; // Assuming ES6 import syntax

class Player {
    constructor(name, playerClass) {
        this.name = name;
        this.class = playerClass;
    }
}

class GameManager {
    constructor() {
        this.player = null;
        this.gameState = {
            currentScene: 'introduction',
            difficulty: 'Easy', 
        };
        this.puzzleManager = new PuzzleManager(); 
        this.narrativeManager = new NarrativeManager(); 
    }

    loadAsciiArt(filename) {
        try {
            const artPath = join(__dirname, '..', 'assets', filename);
            return readFileSync(artPath, 'utf8');
        } catch (error) {
            console.error(red(`Failed to load ASCII art from ${filename}: ${error}`));
            return '';
        }
    }

    async initializeGame() {
        console.log(title('VEIL OF SHADOWS'));
        console.log(yellow('A journey through shadows and truths awaits you.'));
        const asciiArt = this.loadAsciiArt('ascii-art.txt'); // Ensure this is the correct filename
        console.log(yellow(asciiArt));

        const playerName = await this.promptForPlayerName();
        this.player = new Player(playerName, null); // Initially, player class is null until chosen
        await this.promptForPlayerClass();

        console.log(yellow(`Welcome, ${this.player.name}. Are you ready to lift the veil of shadows?`));
        this.startGameLoop();
    }

    async startGameLoop() {
        let gameOver = false;

        while (!gameOver) {
            switch (this.gameState.currentScene) {
                case 'introduction':
                    await this.narrativeManager.displayIntroduction();
                    this.transitionToScene('chooseDifficulty');
                    break;
                case 'chooseDifficulty':
                    await this.chooseDifficulty();
                    break;
                case 'firstPuzzle':
                    await this.puzzleManager.startPuzzle('DecipherTheCode');
                    this.checkPuzzleOutcome();
                    break;
                default:
                    console.log(red('The journey concludes... for now.'));
                    gameOver = true;
                    break;
            }
        }

        console.log(green('Thank you for playing Veil of Shadows.'));
    }

    async chooseDifficulty() {
        const response = await prompt({
            name: 'difficulty',
            type: 'list',
            message: 'Select game difficulty:',
            choices: ['Easy', 'Medium', 'Hard'],
        });
        this.gameState.difficulty = response.difficulty;
        this.transitionToScene('firstPuzzle');
    }

    async promptForPlayerName() {
        const response = await prompt({
            name: 'playerName',
            type: 'input',
            message: 'What is your name?',
        });
        return response.playerName;
    }

    async promptForPlayerClass() {
        const response = await prompt({
            name: 'class',
            type: 'list',
            message: 'Choose your class:',
            choices: ['Investigator', 'Scientist', 'Hacker'],
        });
        this.player.class = response.class;
        console.log(yellow(`${this.player.name} has chosen the class: ${this.player.class}.`));
    }

    transitionToScene(sceneId) {
        console.log(yellow(`Transitioning to scene: ${sceneId}`));
        this.gameState.currentScene = sceneId;
    }

    checkPuzzleOutcome() {
        if (this.gameState.puzzleOutcome === true) {
            console.log(success('Puzzle solved successfully!'));
            this.transitionToScene('nextScene');
        } else {
            console.log(error('Puzzle was not solved. Try again?'));
            this.transitionToScene('retryPuzzle');
        }
    }

    saveGame() {
        const saveData = JSON.stringify(this.gameState);
        writeFileSync('gameSave.json', saveData, 'utf8');
        console.log(info('Game saved successfully.'));
    }


    loadGame() {
        try {
            const saveData = fs.readFileSync('gameSave.json', 'utf8');
            this.gameState = JSON.parse(saveData);
            console.log(styles.info('Game loaded successfully.'));
            // After loading, you may want to transition to the appropriate scene
            this.transitionToScene(this.gameState.currentScene);
        } catch (error) {
            console.error(styles.error('Failed to load game.'));
        }
    }
}

module.exports = GameManager;

