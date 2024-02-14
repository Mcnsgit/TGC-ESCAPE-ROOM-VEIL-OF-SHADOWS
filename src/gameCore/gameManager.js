const Inquirer = require('inquirer');
const Chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const PuzzleManager = require('./puzzleManager');
const NarrativeManager = require('./narrativeManager');
const styles = require('../utils/chalkStyles'); 

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
            const artPath = path.join(__dirname, '..', 'assets', filename);
            return fs.readFileSync(artPath, 'utf8');
        } catch (error) {
            console.error(Chalk.red(`Failed to load ASCII art from ${filename}: ${error}`));
            return '';
        }
    }


    async initializeGame() {
        console.log(styles.title('VEIL OF SHADOWS'));
        console.log(Chalk.yellow('A journey through shadows and truths awaits you.'));
        const asciiArt = this.loadAsciiArt('ascii-art(1).txt'); // Ensure the ASCII art file is correctly named and located
        console.log(Chalk.yellow(asciiArt));

        const playerName = await this.promptForPlayerName();
        this.player = new Player(playerName);
        await this.promptForPlayerClass();

        console.log(Chalk.yellow(`Welcome, ${this.player.name}. You're about to embark on a journey where every decision matters, and the truth is more elusive than it appears. Are you ready to lift the veil of shadows?`));

        this.startGameLoop();
    }

    async promptForPlayerName() {
        const response = await Inquirer.prompt({
            name: 'playerName',
            type: 'input',
            message: 'What is your name?',
        });
        return response.playerName;
    }

    async promptForPlayerClass() {
        const response = await Inquirer.prompt({
            name: 'class',
            type: 'list',
            message: 'Choose your class:',
            choices: ['Investigator', 'Scientist', 'Hacker'],
        });
        this.player.class = response.class;
        console.log(Chalk.yellow(`${this.player.name} has chosen the class: ${this.player.class}.`));
    }

    async startGameLoop() {
        console.log(Chalk.yellow('The adventure begins...'));
        let gameOver = false;

        while (!gameOver) {
            // This switch structure can be expanded with additional cases as the game develops
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
                    console.log(Chalk.red('The journey concludes... for now.'));
                    gameOver = true;
                    break;
            }
        }

        console.log(Chalk.green('Thank you for playing Veil of Shadows.'));
    }

    // Method for transitioning to different scenes
    transitionToScene(sceneId) {
        console.log(Chalk.yellow(`Transitioning to scene: ${sceneId}`));
        this.gameState.currentScene = sceneId;
    }

    // Placeholder method for choosing game difficulty
    async chooseDifficulty() {
        const response = await Inquirer.prompt({
            name: 'difficulty',
            type: 'list',
            message: 'Select game difficulty:',
            choices: ['Easy', 'Medium', 'Hard'],
        });
        this.gameState.difficulty = response.difficulty;
        this.transitionToScene('firstPuzzle');
    }

    // Checking the outcome of puzzles and making decisions based on that
    checkPuzzleOutcome() {
        // This method should be filled with logic to check if a puzzle was solved and decide what happens next
    }

    // Additional utility methods such as saving/loading game state can be added here
}

module.exports = GameManager;
