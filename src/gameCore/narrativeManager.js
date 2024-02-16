import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk'; // Ensure chalk is imported if you're using it for error messages
import  styles  from '../utils/chalkStyles.js';

// Assuming __dirname is defined correctly as shown in your original code
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
class NarrativeManager {
    constructor() {
        this.currentNarrativeState = 'introduction';
        this.characters = {
            elenaMartinez: { 
                name: "Elena Martinez",
                roles: "whistleblower",
                dialogue: {
                    introduction: "The truth is encrypted in this message. I've done all I can to bring it to you. Can you uncover what's hidden?",
                    success: "You've done it! The message you've uncovered could change everything. We're one step closer to the truth.",
                    failure: "It's difficult, I know. But we can't give up now. The truth is too important. Try again?"
                }
            }
        }
        this.puzzle1 = {
            description: "Decipher the encrypted message to reveal a hidden truth.",
            hint: "The key might be closer than you think. Pay attention to the patterns.",
        };
    }

    async loadAsciiArt(filename) {
        try {
            const artPath = path.join(__dirname, '','assets', filename); 
            return await fs.promises.readFile(artPath, 'utf8');
        } catch (error) {
            console.error(chalk.red(`Failed to load ASCII art: ${error}`));
            return 'ASCII art not found.';
        }
    }
 

    async displayIntroduction() {
        console.clear();
        const narrative = styles.default.narrative;
        
        const asciiArt = await this.loadAsciiArt('title.txt'); 
        console.log((asciiArt));
        console.log('\n\n');

        const narrativeintro = `In a world where shadows hide not just secrets, but conspiracies that weave through the very fabric of society, you embark on a journey to uncover truths too dangerous to see the light of day.\n\nAfter months of following elusive leads, your investigation has led you to Elena Martinez, a whistleblower with crucial information on the pandemic's engineered origins.`;
        await printWithDelay(narrative, 100); // Adjust delay as needed
    
        await this.continuePrompt();
        
    async function printWithDelay(text, delay = 100) {
        for (const line of text.split('\n')) {
            await new Promise(resolve => setTimeout(resolve, delay));
            console.log(line);
        }
    }
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
        await inquirer.prompt({
            name: 'continue',
            type: 'confirm',
            message: 'Press enter to continue...',
        });
    }
}

export default NarrativeManager;