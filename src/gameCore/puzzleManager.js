import Inquirer  from'inquirer';
import {styles} from '../utils/chalkStyles.js';


class PuzzleManager {    
    constructor() {
       
        this.puzzles = {};
        this.puzzles= {
            decryptMessage: {
                description: "You've received an encrypted message from Elena Martinez, a former government epidemiologist who quit after having found out the truth about the origins of the pandemic.",
                question: "I hope you can understand the risks uncovering the truth will bring, I've had to encrypt any important details in this message hope you got what it takes to uncover the truth and help us expose it.",
                hint: "The message is encrypted with a combination of letters and numbers.",
                correctAnswer: "CORRECT_ANSWER" // Add the correct answer property
            }
        };
    }

    async startPuzzle(puzzleName) {
        const incorrectAnswer = styles.default.incorrectAnswer;
        const puzzle = this.puzzles[puzzleName];
        try {
            if (!puzzle) {
                throw new Error('Puzzle not found');
            }
            console.log(styles.default.narrative(puzzle.description));
            const userAnswer = await this.askQuestion(puzzle.question, puzzle.hint);
            this.validateAnswer(userAnswer, puzzle.correctAnswer, puzzleName);
        } catch (error) {
            console.log(incorrectAnswer(error.message));
        }
    }

    async askQuestion(question, hint) {
        const response = await Inquirer.prompt([
            {
                name: 'answer',
                type: 'input',
                message: `${styles.question(question)} Hint: ${styles.hint(hint)}`, // Adjusted for proper string concatenation
            }
        ]);
        return response.answer.toUpperCase();
    }

    validateAnswer(userAnswer, correctAnswer, puzzleName) {
        if (userAnswer === correctAnswer.toUpperCase()) {
            console.log(styles.correctAnswer("Correct! You've deciphered the message"));
        } else {
            console.log(styles.incorrectAnswer("That's not quite right. Try again?"));
            this.startPuzzle(puzzleName);
        }
    }
}

export default PuzzleManager;
