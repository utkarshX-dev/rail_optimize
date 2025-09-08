const express = require("express");
const router = express.Router();
const { getJourneys, addJourney } = require("../controllers/journeyController.js");

router.get("/api/journeys", getJourneys);
router.post("/api/journeys", addJourney);

module.exports = router;
