const ConflictLog = require("../models/conflictLog.js");

async function logConflict(trainA, trainB, decision, features, outcome = null) {
  try {
    const log = new ConflictLog({
      trainA,
      trainB,
      decision,
      features,
      outcome
    });
    await log.save();
    console.log("✅ Conflict logged:", log._id);
    return log;
  } catch (err) {
    console.error("❌ Error logging conflict:", err);
  }
}

module.exports = { logConflict };
