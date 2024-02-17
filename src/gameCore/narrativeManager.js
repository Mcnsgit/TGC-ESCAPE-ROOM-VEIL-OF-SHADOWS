import inquirer from 'inquirer';
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import { styles } from '../utils/chalkStyles.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class NarrativeManager {
    constructor() {
        this.storyScenes = {
            introduction: "The truth behind a global conspiracy awaits your discovery.",
            puzzleIntroduction: "A critical message needs your decryption skills.",
            success: "The veil of shadows begins to lift, revealing the truth.",
            failure: "The path remains obscured, but not all hope is lost."
        };
    }

    async displayAsciiArt(artFileName) {
        try {
            const filePath = path.join(__dirname, '..', 'assets', 'asciiArt', artFileName);
            const art = await fs.readFile(filePath, 'utf8');
            console.log(chalk.yellow(art));
        } catch (error) {
            console.error(chalk.red(`Error loading ASCII art: ${error.message}`));
        }
    }

//     async displayIntroduction() {
//         const narrative = styles.default.narrative
//         await this.displayAsciiArt('title.txt');
//         console.log(narrative(this.storyScenes.introduction));
//         await this.continuePrompt();
//     }

//     async introducePuzzle() {
//         const narrative = styles.default.narrative
//         console.log(narrative(this.storyScenes.puzzleIntroduction));
//         await this.continuePrompt();
//     }

//     async displayOutcome(isSuccess) {
//         if (isSuccess) {
//             console.log(styles.correctAnswer(this.storyScenes.success));
//         } else {
//             console.log(styles.error(this.storyScenes.failure));
//         }
//         await this.continuePrompt();
//     }


async displayScene(sceneId) {
    const scene = this.storyScenes[sceneId];
    if (scene) {
        await this.displayAsciiArt(scene.artFileName); //splayAsciiArt(scene.artFileame); //splayAsciiArt(scene.artfile); //
        console.log(styles.default.narrative(scene.text));
        await this.continuePrompt();
    } else {
        console.log(styles.error('Scene not found.'));

    }
}
async continuePrompt() {
        await inquirer.prompt({
            name: 'continue',
            type: 'confirm',
            message: 'Press ENTER to continue...'
        });
    }
}
export default NarrativeManager;
