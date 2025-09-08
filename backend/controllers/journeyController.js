const CompletedJourney = require("../models/completedJourney.js");
const wrapAsync = require("../utils/wrapAsync.js");
const getJourneys = wrapAsync(async (req, res) => {
  const journeys = await CompletedJourney.find().sort({ completedAt: -1 });
  res.json({
    totalCompleted: journeys.length,
    journeys,
  });
})
const postJourneys = wrapAsync(async (req, res) => {
  const { trainId, trainName, type, route, totalDelay } = req.body;
  const journey = new CompletedJourney({
    trainId,
    trainName,
    type,
    route,
    totalDelay
  });
  await journey.save();
  res.status(201).json(journey);
});
module.exports = { getJourneys, postJourneys };

