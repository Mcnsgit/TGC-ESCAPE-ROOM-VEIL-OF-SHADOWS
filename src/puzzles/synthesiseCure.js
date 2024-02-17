import inquirer from 'inquirer';

class synthesiseCure {
  constructor() {
    this.geneticSequence = "AGTC"; // Simplified for example
    this.compounds = {
      A: 'Compound X',
      G: 'Compound Y',
      T: 'Compound Z',
      C: 'Compound W'
    };
    this.correctCombination = ['Compound X', 'Compound Y', 'Compound Z', 'Compound W']; // The correct sequence of compounds
  }

  async analyzeSequence() {
    console.log("Dr. Shaw hands you a complex genetic sequence and a set of chemical compounds.");
    console.log("To synthesise the antidote, match the genetic markers with the correct compounds.");
    
    const sequenceAnalysis = Object.keys(this.compounds).map(key => this.compounds[key]);
    console.log(`Available Compounds: ${sequenceAnalysis.join(', ')}`);

    return inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selectedCompounds',
        message: 'Select the compounds in the order AGTC to synthesise the antidote:',
        choices: sequenceAnalysis,
      }
    ]);
  }

  async synthesiseAntidote() {
    const analysis = await this.analyzeSequence();
    const selectedCompounds = analysis.selectedCompounds;

    if (JSON.stringify(selectedCompounds) === JSON.stringify(this.correctCombination)) {
      console.log("Dr. Shaw examines the concocted antidote and remarks, 'Incredible work. You've not only proven your scientific prowess but also revealed the depth of their manipulation.'");
      // Proceed with success narrative...
      console.log("Investigating the old research facility might uncover more about the pandemic's origins...");
      console.log("Thank you for playing the demo for Veil of Shadows. More mysteries await in the full game.");
    } else {
      console.log("The concoction fizzles out harmlessly. 'It seems we've missed the mark,' says Dr. Shaw. 'Let's review our notes and try again.'");
      // Offer alternative paths or the option to retry
      this.offerAlternativePathsOrRetry();
    }
  }

  async offerAlternativePathsOrRetry() {
    const retry = await inquirer.prompt([{
      type: 'confirm',
      name: 'retry',
      message: 'Would you like to attempt synthesising the antidote again?',
      default: true,
    }]);

    if (retry.retry) {
      this.synthesiseAntidote();
    } else {
      console.log("You decide to investigate further before attempting again. There might be more clues out there.");
      console.log("Thank you for playing the demo for Veil of Shadows. Explore further in the full game.");
    }
  }
}

export default synthesiseCure;