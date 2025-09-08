const CompletedJourney = require("../models/completedJourney.js");
const wrapAsync = require("../utils/wrapAsync.js");
const getJourneys = wrapAsync(async (req, res) => {
  const journeys = await CompletedJourney.find().sort({ completedAt: -1 });
  res.json({
    totalCompleted: journeys.length,
    journeys,
  });
})
module.exports = { getJourneys };

