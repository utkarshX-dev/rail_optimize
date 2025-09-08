const express = require("express");
const {
  getRoot,
  getTrains,
  getStations,
  getConflicts,
  addTrain,
  checkConflictsNow,
  resetTrains,
} = require("../controllers/trainController.js");

const router = express.Router();

router.get("/", getRoot);
router.get("/api/trains", getTrains);
router.get("/api/stations", getStations);
router.get("/api/conflicts", getConflicts);
router.post("/api/trains", addTrain);
router.get("/api/check-conflicts-now", checkConflictsNow);
router.post("/api/reset-trains", resetTrains);

module.exports = router;