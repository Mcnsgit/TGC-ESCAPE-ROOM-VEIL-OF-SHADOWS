import styles from './src/utils/chalkStyles.js';
import { GameManager } from './src/gameCore/gameManager.js';

async function main() {
  const title = styles.default.title;
const ending = styles.default.ending;
const promptForPlayerClass = styles.default.promptForPlayerClass;
const promptForPlayerName = styles.default.promptForPlayerName;
  const gameManager = new GameManager();
  await gameManager.initializeGame();

    console.log(title("Welcome to Veil of Shadows"));

    await gameManager.initializeGame();
    await gameManager.startGameLoop();
    
    await gameManager.narrativeManager.displayEnding();
    console.log(ending("Thank you for playing Veil of Shadows. The journey may end, but the mystery remains in the shadows for now."));
}

main().catch(err => console.error("An unexpected error occurred:", err));

