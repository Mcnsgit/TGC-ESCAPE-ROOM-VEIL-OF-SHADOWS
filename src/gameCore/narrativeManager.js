import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { styles } from '../utils/chalkStyles.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);


class NarrativeManager {
    constructor() {
        this.currentNarrativeState = 'introduction';
        this.characters = {
            elenaMartine:{
                name: "Elena Martinez",
                roles: "whistleblower",
                dialogue: {
                    introduction: "The truth is encrypted in this message. I've done all I can to bring it to you. Can you uncover what's hidden?",
                    success: "You've done it! The message you've uncovered could change everything. We're one step closer to the truth.",
                    failure: "it's difficult, I know. But we can't give up now. The truth is too important. Try Again?"
                }
            }
        }
        this.puzzle1 = {
            description: "Decipher the encrypted message to reveal a hidden truth.",
            hint: "The key might be closer than you think, Pay attention to the patterns.",
        }
    }

    async loadInquirer() {
        this.prompt = inquirer.prompt;
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

    async displayIntroduction() {
        console.clear();
        const narrative = styles.default.narrative;
        const title = styles.default.title;
        const yellow = styles.default.narrative;
        
        const asciiArt =  this.loadAsciiArt('../assets/title-veil-of-shadows.txt');
        console.log(yellow(asciiArt));
        console.log(title("Veil of Shadows"));
        console.log(narrative("In a world where shadows hide not just secrets, but conspiracies that weave through the very fabric of society, you embark on a journey to uncover truths too dangerous to see the light of day."));
        console.log(narrative("After months of following elusive leads, your investigation has led you to Elena Martinez, a whistleblower with crucial information on the pandemic's engineered origins."));
        await this.continuePrompt();
    }

    async introduceDecryptMessagePuzzle() {
        const dialogue = styles.default.dialogue;
        const hint = styles.default.hint;
        const instruction = styles.default.systemMessage;
        
        console.log(narrative("You meet Elena in a dimly lit room, filled with papers scattered across the table. She trusts you with a document that could change everything."));
        console.log(dialogue(`${this.characters.elenaMartinez.name}: '${this.characters.elenaMartinez.dialogue.introduction}'`));
        console.log(instruction(this.puzzle1.description));
        console.log(hint(this.puzzle1.hint));
        await this.continuePrompt();
    }

    async displayPuzzleOutcome(success) {
        const correctAnswer = styles.default.correctAnswer;
        const failure = styles.default.incorrectAnswer;
        
        if (success) {
            console.log(correctAnswer(this.characters.elenaMartinez.dialogue.success));
        } else {
            console.log(failure(this.characters.elenaMartinez.dialogue.failure));
        }
        await this.continuePrompt();
    }

    async continuePrompt() {
        const { continue: input } = await this.prompt({
            name: 'continue',
            type: 'input',
            message: 'Press enter to continue...',
            validate: input => input.trim() ? true : 'Please press enter to continue.',
        });

        if (input) {
            return;
        }
    }
}

export default NarrativeManager;