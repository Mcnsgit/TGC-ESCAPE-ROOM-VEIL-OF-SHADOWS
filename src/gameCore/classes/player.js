class Player {
    constructor(name) {
      this.name = name;
      this.health = 100; // Default health value
    }
  
    displayStats() {
      console.log(`${this.name} has ${this.health} health.`);
    }
  }
 
 export default Player;