import inquirer from 'inquirer';
import { styles } from './utils/chalkStyles.js';
import DecipherMessagePuzzle from '../src/puzzles/decipherMessage.js';

class PuzzleManager {
    constructor() {
        this.puzzles = {
            decryptMessage: new DecipherMessagePuzzle()
        };
        
    }

        async startPuzzle(puzzleName) {
            const puzzle = this.puzzles[puzzleName];
            if (puzzle) {
              console.log(styles.narrative(`Starting puzzle: ${puzzleName}`));
              const isSuccess = await puzzle.challengePlayer();
              this.handlePuzzleOutcome(isSuccess, puzzle);
            } else {
              console.log(styles.error('Puzzle not found.'));
            }
          }
          
    async initiatePuzzle(puzzle) {
        console.log(styles.narrative(puzzle.getDescription()));
        const { answer } = await inquirer.prompt([{
            name: 'answer',
            type: 'input',
            message: puzzle.getQuestion(),
        }]);

        if (puzzle.checkAnswer(answer)) {
            console.log(styles.correctAnswer('Correct! You have successfully solved the puzzle.'));
        } else {
            console.log(styles.error('Incorrect. Would you like to try again?'));
            await this.retryPuzzle(puzzle);
        }
    }

    async retryPuzzle(puzzle) {
        const { tryAgain } = await inquirer.prompt([{
            name: 'tryAgain',
            type: 'confirm',
            message: 'Try again?',
        }]);

        if (tryAgain) {
            await this.initiatePuzzle(puzzle);
        } else {
            console.log(styles.systemMessage('Moving on to the next challenge.'));
            // Logic to move on or handle the choice of not retrying the puzzle
        }
    }
}

export default PuzzleManager;
