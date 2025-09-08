const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
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

router.get("/", wrapAsync(getRoot));
router.get("/api/trains", wrapAsync(getTrains));
router.get("/api/stations", wrapAsync(getStations));
router.get("/api/conflicts", wrapAsync(getConflicts));
router.post("/api/trains", wrapAsync(addTrain));
router.get("/api/check-conflicts-now", wrapAsync(checkConflictsNow));
router.post("/api/reset-trains", wrapAsync(resetTrains));

module.exports = router;
