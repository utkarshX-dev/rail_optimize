const TrainCoordinationAI = require("./utils/trainCoordinationAI.js");

const activeTrains = new Map();

const networkState = {
  stations: ["DEL", "AGR", "JHS", "BPL", "NGP"],
  conflicts: [],
  lastUpdate: new Date(),
};

const ai = new TrainCoordinationAI();

module.exports = { activeTrains, networkState, ai };
