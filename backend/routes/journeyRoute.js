const express = require("express");
const router = express.Router();
const { getJourneys, postJourneys } = require("../controllers/journeyController.js");

router.get("/:id", getJourneys);
router.post("/", postJourneys);
module.exports = router;