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
  const baseTravelTime = 30 * 1000;
  let movementOccurred = false;
  let aiDecisionMade = null;

  activeTrains.forEach((train) => {
    if (train.status === "completed") return;

    if (!train.nextStation) {
      train.status = "completed";
      console.log(`🚂 Train ${train.id} (${train.name}) completed its journey!`);
      // Save completed journey...
      return;
    }

    const delayTime = ((train.currentDelay || train.delay || 0) * 1000);
    const speedFactor = (train.speed || 60) / 60;
    const effectiveTravelTime = (baseTravelTime / speedFactor) + delayTime;

    // CRITICAL: Initialize lastMoveTime only if it doesn't exist
    if (!train.lastMoveTime) {
      train.lastMoveTime = now;
      return; // Skip first iteration to establish baseline
    }

    const timeSinceLastMove = now - train.lastMoveTime;

    // IMPORTANT: Only move train if it's not held by AI decision
    const isHeldByAI = train.status === "delayed" && 
                       train.lastDecision && 
                       train.lastDecision.action === "HOLD" &&
                       (now - train.lastDecisionTime) < (train.lastDecision.delay * 60 * 1000);

    if (!isHeldByAI && timeSinceLastMove >= effectiveTravelTime) {
      // Train can proceed to next station
      train.currentStation = train.nextStation;
      const currentIndex = train.route.indexOf(train.currentStation);
      const nextIndex = currentIndex + 1;
      train.nextStation = train.route[nextIndex] || null;
      
      // CRITICAL: Update lastMoveTime to current time for new segment
      train.lastMoveTime = now;
      train.status = "running";
      movementOccurred = true;

      console.log(`🚂 Train ${train.id} → ${train.currentStation}`);

      if (!train.nextStation) {
        train.status = "completed";
        // Save completed journey...
      }

      // Gradually reduce delay over time
      if (train.currentDelay > 0) {
        train.currentDelay = Math.max(0, train.currentDelay - 0.25);
      }
    } else if (isHeldByAI) {
      // Train is being held, maintain current position calculation
      console.log(`⏸️ Train ${train.id} held by AI decision`);
    }
  });

  // Detect conflicts AFTER movement updates
  const conflicts = detectConflicts();
  if (conflicts.length > 0) {
    console.log(`⚠️ ${conflicts.length} conflicts detected, consulting AI...`);

    try {
      aiDecisionMade = await ai.makeDecision(conflicts);
      console.log(`🤖 AI Decision: ${aiDecisionMade.decisions.length} actions taken`);
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
