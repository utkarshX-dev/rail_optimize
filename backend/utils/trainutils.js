// trainutils.js - AI Integrated Train Coordination
const { activeTrains } = require("../state.js");
const { ai } = require("../state.js");
const CompletedJourney = require("../models/completedJourney.js");
const createDetectConflicts = require("./detectConflicts.js");

// -------------------- Utility Functions --------------------
function calculateEstimatedArrival(train) {
  const currentTime = Date.now();
  const baseTravelTime = 60 * 1000; // 60s per station
  const delayTime = ((train.currentDelay || train.delay) || 0) * 1000;
  const speedFactor = (train.speed || 60) / 60;

  return currentTime + (baseTravelTime / speedFactor) + delayTime;
}

function checkTrainConflict(train1, train2) {
  if (train1.nextStation === train2.nextStation) {
    const estimatedArrival1 = calculateEstimatedArrival(train1);
    const estimatedArrival2 = calculateEstimatedArrival(train2);

    const timeDiff = Math.abs(estimatedArrival1 - estimatedArrival2);

    if (timeDiff < 20 * 1000) { // 20s conflict window
      return {
        id: `conflict_${train1.id}_${train2.id}`,
        station: train1.nextStation,
        trains: [train1, train2],
        estimatedTime: Math.min(estimatedArrival1, estimatedArrival2),
        severity: timeDiff < 25 * 1000 ? "High" : "Medium",
        type: "route_conflict",
      };
    }
  }
  return null;
}

// -------------------- Conflict Detector --------------------
const detectConflicts = createDetectConflicts({
  checkTrainConflict,
  calculateEstimatedArrival,
  activeTrains
});

// -------------------- Coordination Loop --------------------
async function coordinationLoop() {
  const now = Date.now();
  const baseTravelTime = 30 * 1000; // 30s per segment
  let movementOccurred = false;
  let aiDecisionMade = null;

  activeTrains.forEach((train) => {
    if (train.status === "completed") return;

    if (!train.nextStation) {
      train.status = "completed";
      console.log(`🚂 Train ${train.id} (${train.name}) completed its journey!`);

      const journey = new CompletedJourney({
        trainId: train.id,
        trainName: train.name,
        type: train.type,
        route: train.route,
        completedAt: new Date(),
        totalDelay: train.currentDelay || train.delay || 0,
      });

      journey.save().catch(err =>
        console.error("Error saving completed journey:", err)
      );
      return;
    }

    const delayTime = ((train.currentDelay || train.delay || 0) * 1000);
    const speedFactor = (train.speed || 60) / 60;
    const effectiveTravelTime = (baseTravelTime / speedFactor) + delayTime;

    if (!train.lastMoveTime) {
      train.lastMoveTime = now;
    }

    const timeSinceLastMove = now - train.lastMoveTime;

    if (timeSinceLastMove >= effectiveTravelTime) {
      train.currentStation = train.nextStation;
      const currentIndex = train.route.indexOf(train.currentStation);
      const nextIndex = currentIndex + 1;
      train.nextStation = train.route[nextIndex] || null;
      train.lastMoveTime = now;
      train.status = "running";
      movementOccurred = true;

      const timeToNext = train.nextStation ?
        `${Math.round(effectiveTravelTime / 1000)}s to ${train.nextStation}` :
        'Journey Complete';

      console.log(`🚂 Train ${train.id} (${train.name}) → ${train.currentStation} | Next: ${timeToNext}`);

      if (!train.nextStation) {
        train.status = "completed";
        console.log(`✅ Train ${train.id} (${train.name}) completed journey! Route: ${train.route.join(" → ")}`);

        const journey = new CompletedJourney({
          trainId: train.id,
          trainName: train.name,
          type: train.type,
          route: train.route,
          completedAt: new Date(),
          totalDelay: train.currentDelay || train.delay || 0,
        });

        journey.save().catch(err =>
          console.error("Error saving completed journey:", err)
        );
      }

      if (train.currentDelay > 0) {
        train.currentDelay = Math.max(0, train.currentDelay - 0.25);
      }
    }
  });

  const conflicts = detectConflicts();
  if (conflicts.length > 0) {
    console.log(`⚠️ ${conflicts.length} conflicts detected, consulting AI...`);

    try {
      aiDecisionMade = await ai.makeDecision(conflicts);
      console.log(`🤖 AI Decision: ${aiDecisionMade.decisions.length} actions taken`);

      if (aiDecisionMade.recommendation) {
        console.log(`💡 AI Recommendation: ${aiDecisionMade.recommendation}`);
      }
    } catch (error) {
      console.error('❌ Error in AI coordination:', error.message);
    }
  }

  return {
    movementOccurred,
    aiDecision: aiDecisionMade,
    conflicts: conflicts.length,
    activeTrains: activeTrains.size
  };
}

// -------------------- Status Helpers --------------------
function getQuickTrainStatus() {
  const trains = Array.from(activeTrains.values());
  return {
    total: trains.length,
    running: trains.filter(t => t.status === 'running').length,
    completed: trains.filter(t => t.status === 'completed').length,
    delayed: trains.filter(t => (t.currentDelay || 0) > 0).length,
    conflicts: detectConflicts().length,
    timestamp: Date.now()
  };
}

function getBulkTrainData() {
  return Array.from(activeTrains.values()).map(t => ({
    id: t.id,
    name: t.name,
    currentStation: t.currentStation,
    nextStation: t.nextStation,
    status: t.status,
    delay: t.currentDelay || t.delay || 0,
    speed: t.speed,
    type: t.type,
    priority: t.priority,
    lastMoveTime: t.lastMoveTime
  }));
}

// -------------------- Exports --------------------
module.exports = {
  checkTrainConflict,
  calculateEstimatedArrival,
  detectConflicts,
  coordinationLoop,
  getQuickTrainStatus,
  getBulkTrainData
};
