// Assuming ES6 imports are enabled in your Node.js environment
import GameManager from './src/gameCore/gameManager.js';
import styles from './src/utils/chalkStyles.js';

async function main() {
    console.log(styles.title("Welcome to Veil of Shadows"));
    const gameManager = new GameManager();

    await gameManager.initializeGame();
    await gameManager.startGameLoop();
    console.log(styles.ending("Thank you for playing Veil of Shadows. The journey may end, but the mystery remains in the shadows for now."));
}

main().catch(err => console.error("An unexpected error occurred:", err));
