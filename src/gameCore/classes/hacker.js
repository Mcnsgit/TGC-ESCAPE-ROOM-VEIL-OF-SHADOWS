import Player from "./player.js";
class Hacker extends Player {
    constructor(name) {
      super(name);
      this.hackingSkills = 10; // Unique ability modifier
    }
  
    hackSystem() {
      console.log(`${this.name} uses their hacking skills to infiltrate the system.`);
      // Implementation of hackSystem method
    }
  }

export default Hacker;