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
        console.log('\n\n\n');

        const narrativeintro = `In the aftermath of a global pandemic, a world teeters on the edge of truth and deception, freedom and control. "Veil of Shadows" weaves a narrative tapestry rich with conspiracy, where power is a game played in the dark, and the quest for truth is the only light. Through the labyrinth of intrigue, hidden agendas emerge, challenging the very fabric of reality. Here, alliances are forged in whispers, and moral dilemmas echo the complexities of choice. \n\nAs the shadows deepen, revealing the unseen forces molding our destiny, a solitary question remains, whispered on the winds of change: Are you ready to journey through the veil, to fight for a future where truth might finally stand unobscured by power's grasp?`;
        await printWithDelay(narrativeintro, 400); 
        await this.continuePrompt();
        
        async function printWithDelay(text, delay = 100) {
            if (typeof text !== 'string') {
                text = 'An unexpected error occurred. Please try again.';
                console.error('printWithDelay called with non-string text:', text);
                return; // Early return or convert text to a string if appropriate
            }
        
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
        const instruction = styles.default.systemMessage;
        await inquirer.prompt({
            name: 'continue',
            type: 'confirm',
            message: 'Press enter to continue...',
        });
        console.log(instruction(this.inquirer.Prompt));
        
    }
}

export default NarrativeManager;