const mongoose = require("mongoose");

const CompletedJourneySchema = new mongoose.Schema({
  trainId: { type: String, required: true },
  trainName: { type: String, required: true },
  type: { type: String, required: true }, 
  route: { type: [String], required: true }, 
  completedAt: { type: Date, default: Date.now }, 
  totalDelay: { type: Number, default: 0 }, 
});

const CompletedJourney = mongoose.model("CompletedJourney", CompletedJourneySchema);

module.exports = CompletedJourney;
