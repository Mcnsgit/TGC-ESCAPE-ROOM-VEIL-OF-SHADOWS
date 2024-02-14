const Inquirer = require('inquirer');
const styles = require('../utils/styles');

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

    async displayIntroduction() {
        console.clear();
        console.log(styles.title("Welcome to veil of Shadows"));
        console.log(chalkStyles.narrative("In a world where shadows hide not just secrets, but conspiracies that weave through the very fabric of society, you embark on a journey to uncover truths too dangerous to see the light of day."));
        console.log(chalkStyles.narrative("After months of following elusive leads, your investigation has led you to Elena Martinez, a whistleblower with crucial information on the pandemic's engineered origins."));
        await this.continuePrompt();
        this.currentNarrativeState = 'puzzle1';
    }

    async introduceDecryptMessagePuzzle() {
        console.log(chalkStyles.narrative("You meet Elena in a dimly lit room, filled with papers scattered across the table. She trusts you with a document that could change everything."));
        console.log(chalkStyles.dialogue(`${this.characters.elenaMartinez.name}: '${this.characters.elenaMartinez.dialogue.introduction}'`));
        console.log(chalkStyles.instruction(this.puzzle1.description));
        console.log(chalkStyles.hint(this.puzzle1.hint));
        await this.continuePrompt();
    }

    async displayPuzzleOutcome(success) {
        if (success) {
            console.log(chalkStyles.success(this.characters.elenaMartinez.dialogue.success));
        } else {
            console.log(chalkStyles.failure(this.characters.elenaMartinez.dialogue.failure));
        }
        await this.continuePrompt();
    }

    async continuePrompt() {
        await Inquirer.prompt([{
            type: 'input',
            name: 'continue',
            message: chalkStyles.option('Press enter to continue...')
        }]);
    }
}

module.exports = NarrativeManager;