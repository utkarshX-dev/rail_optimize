const { activeTrains } = require("../state.js"); 
const { stationCoordinates, sampleTrains } = require("../data/trainData.js");
const detectConflicts = require("../utils/detectConflicts.js");

const getRoot = (async (req, res) => {
  res.send("🚆 Train Coordination Backend Running");
});

const getTrains = (async (req, res) => {
  const trains = Array.from(activeTrains.values());
  res.json(trains);
});

const getStations = (async (req, res) => {
  res.json(stationCoordinates);
});

const getConflicts = async (req, res, next) => {
  try {
    const conflicts = detectConflicts();
    res.json(conflicts);
  } catch (err) {
    console.error("❌ Error in getConflicts:", err);
    res.status(500).json({ error: err.message });
  }
};


const addTrain = (async (req, res) => {
  const newTrain = {
    ...req.body,
    id: `T${Date.now()}`,
    status: "running",
    delay: 0,
    lastMoveTime: Date.now(),
    nextStation: req.body.route && req.body.route.length > 1 ? req.body.route[1] : null,
    currentStation: req.body.route && req.body.route.length > 0 ? req.body.route[0] : null,
  };

  activeTrains.set(newTrain.id, newTrain);
  console.log(`Added new train: ${newTrain.id}`);
  res.json(newTrain);
});

const checkConflictsNow = (async (req, res) => {
  const conflicts = detectConflicts();
  const trains = Array.from(activeTrains.values());

  console.log(`Manual conflict check: ${conflicts.length} conflicts found`);

  res.json({
    conflicts,
    trains: trains.map((t) => ({
      id: t.id,
      name: t.name,
      currentStation: t.currentStation,
      nextStation: t.nextStation,
      status: t.status,
      priority: t.priority,
    })),
    conflictCount: conflicts.length,
    message: conflicts.length > 0 ? "Conflicts detected!" : "No conflicts found",
  });
});

const resetTrains = (async (req, res) => {
  activeTrains.clear();
  sampleTrains.forEach((train) => {
    const resetTrain = {
      ...train,
      lastMoveTime: Date.now(),
      status: "running",
      currentStation: train.route[0],
      nextStation: train.route.length > 1 ? train.route[1] : null,
    };
    activeTrains.set(resetTrain.id, resetTrain);
  });

  console.log("Trains reset to initial state");
  res.json({
    message: "Trains reset successfully",
    trains: Array.from(activeTrains.values()),
  });
});

module.exports = {
  getRoot,
  getTrains,
  getStations,
  getConflicts,
  addTrain,
  checkConflictsNow,
  resetTrains,
};
