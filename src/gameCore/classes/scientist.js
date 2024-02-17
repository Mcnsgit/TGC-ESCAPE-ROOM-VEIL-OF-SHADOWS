import Player from './player.js';
class Scientist extends Player {
    constructor(name) {
      super(name);
      this.scienceKnowledge = 10; // Unique ability modifier
    }
  
    synthesizeCure() {
      console.log(`${this.name} uses their scientific knowledge to work on a cure.`);
      // Implementation of synthesizeCure method
    }
  }

  export default Scientist;