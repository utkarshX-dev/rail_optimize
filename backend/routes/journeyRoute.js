const express = require("express");
const router = express.Router();
const { getJourneys } = require("../controllers/journeyController.js");

router.get("/api/journeys", getJourneys);
module.exports = router;