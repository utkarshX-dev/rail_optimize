class Train {
  constructor(id, route, priority, scheduledTime, currentDelay = 0) {
    this.id = id;
    this.route = route;
    this.priority = priority;
    this.scheduledTime = scheduledTime;
    this.currentDelay = currentDelay;
    this.totalDelay = 0;
    this.status = 'scheduled';
    this.currentPosition = 0;
    this.lastMoveTime = null;
  }

  addDelay(minutes) {
    this.currentDelay += minutes;
    this.totalDelay += minutes;
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
