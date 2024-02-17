async function gameSetUp() {
  const playerName = await promptForInput('What is your name?');
  console.log(`Ah yes! Come in quick, ${playerName}. We don't have a lot of time!`);

  const playerClass = await PromptForSelection('Choose your class', ['Investigator', 'Scientist', 'Hacker']); // Corrected typo in 'Scientist'
  console.log(`I'm a ${playerClass}.`);
  console.log(`A ${playerClass} is exactly who we're looking for to help us!`);

  const isReady = await promptForConfirmation('Are you ready to find out the truth about what is really going on?');
  if (isReady) {
    console.log('Ok, let me show you the evidence I have so far!');
  } else {
    console.log('Come back when you are ready!');
  }
}




export default gameSetUp;
