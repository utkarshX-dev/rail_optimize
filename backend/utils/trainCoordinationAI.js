const { activeTrains } = require("../server");

class TrainCoordinationAI {
  constructor() {
    this.decisionHistory = [];
  }

  makeDecision(conflict) {
    const features = this.extractFeatures(conflict);
    const decision = this.priorityBasedDecision(conflict);

    this.decisionHistory.push({
      timestamp: new Date(),
      conflict,
      decision,
      features,
    });

    // Apply delays if any
    decision.decisions.forEach(d => {
      if (d.action === "HOLD") {
        const train = activeTrains.get(d.trainId);
        if (train) train.addDelay(d.delay);
      }
    });

    return decision;
  }

  extractFeatures(conflict) {
    return {
      trainCount: conflict.trains.length,
      priorityDifference: Math.abs(conflict.trains[0].priority - conflict.trains[1].priority),
      delayImpact: conflict.trains.reduce((sum, t) => sum + (t.currentDelay || 0), 0),
      stationCongestion: this.calculateStationCongestion(conflict.station),
      timeOfDay: new Date().getHours(),
    };
  }

  priorityBasedDecision(conflict) {
    const trains = conflict.trains.sort((a, b) => a.priority - b.priority);
    const highPriorityTrain = trains[0];
    const decisions = [];

    trains.forEach((train) => {
      if (train.id === highPriorityTrain.id) {
        decisions.push({
          trainId: train.id,
          action: "PROCEED",
          delay: 0,
          reason: `${train.type} has higher priority`,
        });
      } else {
        decisions.push({
          trainId: train.id,
          action: "HOLD",
          delay: 15,
          reason: `Waiting for higher priority train ${highPriorityTrain.id}`,
        });
      }
    });

    return {
      timestamp: new Date(),
      station: conflict.station,
      severity: "High",
      decisions,
    };
  }

  calculateStationCongestion(station) {
    let congestion = 0;
    activeTrains.forEach((train) => {
      if (train.currentStation === station || train.nextStation === station) {
        congestion++;
      }
    });
    return congestion;
  }
}

module.exports = TrainCoordinationAI;
