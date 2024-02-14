// Rewritten code to fix performance issues

const Inquirer = require('inquirer');
const Chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const PuzzleManager = require('./puzzleManager');
const NarrativeManager = require('../narrative/narrativeManager');
const Player = require('./Player');

class GameManager {
    constructor() {
        this.player = null; // Player instance
        this.currentScene = null; // Tracks the current game scene or puzzle
        this.gameState = {}; // Object to store game state variables
    }

    // Initializes the game, setting up the player and initial game state
    async initializeGame() {
        try {
            const playerName = (await Inquirer.prompt({
                name: 'playerName',
                type: 'input',
                message: 'What is your name?',
            })).playerName;
            console.log(Chalk.yellow('Welcome, ' + playerName + "You're about to embark on a journey where every decision matters, and the truth is more elusive than it appears. Are you ready to lift the veil of shadows?'"));

            console.log(Chalk.green('VEIL OF SHADOWS.'));
            // Display ASCII art and introduction
            console.log(Chalk.yellow('A journey through shadows and truths.'));
            const asciiArt = await this.loadAsciiArt();
            if (asciiArt) {
                console.log(Chalk.green(asciiArt));
            }

            } catch (error) {
                console.error(error);
            }

            this.player = new Player(playerName);

            let classChoice = (await Inquirer.prompt({ 
                name: 'class',
                type: 'list',
                message: 'Choose your class:',
                choices: ['Investigator', 'Scientist', 'Hacker'],
            })).class;

            this.player.setClass(classChoice);
            console.log(Chalk.yellow('Choose your class:'));
            console.log(Chalk.yellow(`${this.player.name} has chosen the class: ${this.player.class}.`));

            // Initialize player and game state
            return classChoice;
            }

            async loadAsciiArt() {
                const filePath = path.join(__dirname, 'asciiArt.txt');
                return fs.readFileSync(filePath, 'utf8');
            }

module.exports = GameManager;
    // Main game loop
    startGameLoop() {
        let 
            
        }
        // While game is not over
            // Display current scene or puzzle
            // Process player input
            // Update game state and check for transitions
    }

    // Handles transitions between game scenes or puzzles
    transitionToScene(sceneId) {
        // Based on sceneId, update currentScene and gameState as necessary
    }

    // Processes player actions and updates the game state accordingly
    processPlayerAction(action) {
        // Logic to handle different player actions
    }

    // Saves the current game state to allow resuming
    saveGame() {
        // Implement save functionality
    }

    // Loads a previously saved game state
    loadGame() {
        // Implement load functionality
    }

    // Utility methods as needed (e.g., displayHelp, showInventory)
}

module.exports = GameManager;
