import Player from "./player.js";

class Investigator extends Player {
    constructor(name) {
      super(name);
      this.deductionSkills = 10; // Unique ability modifier
    }
  
    investigate() {
      console.log(`${this.name} is investigating...`);
    // Implementation of class-specific ability
    
    }
  }
  

  export default Investigator;