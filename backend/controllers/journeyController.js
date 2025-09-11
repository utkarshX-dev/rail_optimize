const CompletedJourney = require("../models/completedJourney.js");
const User = require("../models/userModel.js");
const wrapAsync = require("../utils/wrapAsync.js");
const getJourneys = wrapAsync(async (req, res) => {
  const id = req.params.id;
  const admin = await User.findById(id);
  if (!admin || admin.role !== 'admin') {
    return res.status(403).json({ message: "Access denied" });
  }
  const journeys = await CompletedJourney.find().sort({ createdAt: -1 });
  res.json(journeys);
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

