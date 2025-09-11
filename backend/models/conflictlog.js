const mongoose = require("mongoose");

const ConflictLogSchema = new mongoose.Schema({
  trainA: { type: String, required: true },   // First train in conflict
  trainB: { type: String, required: true },   // Second train in conflict
  decision: { type: String, required: true }, // AI decision: Move / Stop / SlowDown
  features: { type: Object, required: true }, // Snapshot of all inputs (delay, congestion, etc.)
  outcome: { type: String, default: "pending" }, // later updated: success / fail / worsened
  createdAt: { type: Date, default: Date.now }
});

const ConflictLog = mongoose.model("ConflictLog", ConflictLogSchema);

module.exports = ConflictLog;
