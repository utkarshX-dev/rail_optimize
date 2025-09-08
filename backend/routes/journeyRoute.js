const express = require("express");
const router = express.Router();
const { getJourneys, postJourneys } = require("../controllers/journeyController.js");

router.get("/api/journeys", getJourneys);
router.post("/api/journeys", postJourneys);
module.exports = router;