const GameManager = require('./src/gameCore/gameManager');
const PuzzleManager = require('./src/gameCore/puzzleManager');
const NarrativeManager = require('./src/gameCore/narrativeManager'); 
const styles = require('./src/utils/styles');
async function main() {
    console.log(styles.title("Welcome to Veil of Shadows"));
    const gameManager = new GameManager();
    const puzzleManager = new PuzzleManager();
    const narrativeManager = new NarrativeManager();
    await gameManager.initializeGame();
    await gameManager.startGameLoop({
        puzzleManager,
        narrativeManager
    });
    console.log(styles.ending("Thank you for playing Veil of Shadows. The journey may end, but the mystery remains in the shadows for now..  "));
}
main().catch(err => console.error("An unexpected error occurred:" ,err));