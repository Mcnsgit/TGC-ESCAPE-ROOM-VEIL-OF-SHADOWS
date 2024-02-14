const { promptForInput, PromptForSelection, promptForConfirmation } = require('./inquirerHelpers');

async function gameSetUp() {
    const PlayerName = await promptForInput('What is your name?');
    console.log('Ah yes! Come in quick' + PlayerName + ". we don't have a lot of time!"); // TODO: Prompt for PlayerName


    const PlayerClass = await PromptForSelection('Choose your class', ['Investigator', 'Scienist', 'Hacker']); 
    console.log("i'm a" + PlayerClass);
    console.log('A  ${PlayerClass} is exaclty who were looking for to help us!'); // TODO: Prompt for PlayerClass

    const isReady = await promptForConfirmation('Are you ready to find out the truth about what is really going on?');
    if (isReady) {
        console.log('Ok, let me show you the evidence I have so far!');
    }
    else {
        console.log('come back when you are ready!');
    }
}

gameSetUp();

