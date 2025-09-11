const ConflictLog = require("../models/conflictLog.js");

async function logConflict(trainA, trainB, decision, features, outcome = null) {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0,0,0,0);

    const existing = await ConflictLog.findOne({
      trainA, trainB, createdAt: { $gte: startOfDay }
    });
    if (existing) return existing;

    const log = new ConflictLog({ trainA, trainB, decision, features, outcome });
    await log.save();
    console.log("✅ Conflict logged:", log._id);
    return log;
  } catch (err) {
    console.error("❌ Error logging conflict:", err);
  }
}

module.exports = { logConflict };
