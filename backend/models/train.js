class Train {
    constructor(id, route, priority, scheduledTime, currentDelay = 0) {
      this.id = id;
      this.route = route; // Array of station IDs
      this.priority = priority; // 1=Express, 2=Local, 3=Freight
      this.scheduledTime = scheduledTime;
      this.currentDelay = currentDelay;
      this.status = 'scheduled';
      this.currentPosition = 0;
    }
  }
  
  class Station {
    constructor(id, name, platforms, coordinates) {
      this.id = id;
      this.name = name;
      this.platforms = platforms;
      this.coordinates = coordinates;
      this.occupiedPlatforms = 0;
    }
  }
  
  module.exports = { Train, Station };