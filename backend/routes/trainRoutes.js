// Updated trainRoutes.js - Add AI routes
const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const { activeTrains } = require('../state.js');
const { stationCoordinates } = require('../data/trainData.js');
const { getBulkTrainData, detectConflicts } = require('../utils/trainutils.js');
const {
  getRoot,
  getTrains,
  getStations,
  getConflicts,
  addTrain,
  checkConflictsNow,
  resetTrains,
  // AI endpoints
  getAIStatus,
  getAIDecisionHistory,
  requestAIDecision,
  retrainAIModel
} = require("../controllers/trainController.js");

const router = express.Router();
// Get all stations with coordinates
router.get('/api/stations', (req, res) => {
  try {
    res.json(stationCoordinates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Get bulk train data (used by frontend for real-time updates)
router.get('/api/trains/bulk', (req, res) => {
  try {
    const trainData = getBulkTrainData();
    res.json(trainData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Get current conflicts
router.get('/api/conflicts', (req, res) => {
  try {
    const conflicts = detectConflicts();
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Add a new train (for the "Add Train" button)
router.post('/api/trains', (req, res) => {
  try {
    const { name, type, priority, route, speed, departureTime, delay = 0 } = req.body;
    
    const newTrain = {
      id: `T${Date.now()}`,
      name: name || `${type} ${Date.now()}`,
      type,
      priority,
      route,
      currentStation: route[0],
      nextStation: route[1] || null,
      speed,
      delay,
      departureTime,
      status: "running",
      lastMoveTime: Date.now(),
      currentDelay: delay
    };
    
    activeTrains.set(newTrain.id, newTrain);
    
    console.log(`🚂 New train added: ${newTrain.id} (${newTrain.name})`);
    res.status(201).json(newTrain);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Existing routes
router.get("/", wrapAsync(getRoot));
router.get("/api/trains", wrapAsync(getTrains));
router.get("/api/stations", wrapAsync(getStations));
router.get("/api/conflicts", wrapAsync(getConflicts));
router.post("/api/trains", wrapAsync(addTrain));
router.get("/api/check-conflicts-now", wrapAsync(checkConflictsNow));
router.post("/api/reset-trains", wrapAsync(resetTrains));

// New AI routes
router.get("/api/ai/status", wrapAsync(getAIStatus));
router.get("/api/ai/history", wrapAsync(getAIDecisionHistory));
router.post("/api/ai/decide", wrapAsync(requestAIDecision));
router.post("/api/ai/retrain", wrapAsync(retrainAIModel));

module.exports = router;