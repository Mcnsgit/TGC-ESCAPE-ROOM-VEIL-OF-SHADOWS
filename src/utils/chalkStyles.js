import chalk from 'chalk';

export const styles = () => ({

    narrative:chalk.hex('#F0EAD6'),
    npcDialogue: chalk.cyan.bold,
    playerDialogue: chalk.green,
    puzzleText: chalk.yellow,
    correctAnswer: chalk.lightgreen,Bold,
    incorrectAnswer: chalk.red.bold,
    hint: chalk.magenta,
    systemMessage: chalk.blue,
    title: chalk.hex('#FFA07A').bold,
    option:chalk.hex('#DAA520').bold,
});

module.exports = styles;