// trainUtils.js
import { activeTrains } from "../state.js";

// ===== Conflict detection =====
function calculateEstimatedArrival(train) {
  const currentTime = Date.now();
  const baseTravelTime = 30 * 60 * 1000;
  const delayTime = train.delay * 60 * 1000;
  const randomVariance = Math.random() * 30 * 60 * 1000;

  return currentTime + baseTravelTime + delayTime + randomVariance;
}

function checkTrainConflict(train1, train2) {
  if (train1.nextStation === train2.nextStation) {
    const estimatedArrival1 = calculateEstimatedArrival(train1);
    const estimatedArrival2 = calculateEstimatedArrival(train2);

    const timeDiff = Math.abs(estimatedArrival1 - estimatedArrival2);

    if (timeDiff < 60 * 60 * 1000) {
      return {
        id: `conflict_${train1.id}_${train2.id}`,
        station: train1.nextStation,
        trains: [train1, train2],
        estimatedTime: Math.min(estimatedArrival1, estimatedArrival2),
        severity: timeDiff < 30 * 60 * 1000 ? "High" : "Medium",
        type: "route_conflict",
      };
    }
  }
  return null;
}

export function detectConflicts() {
  const trains = Array.from(activeTrains.values());
  const conflicts = [];

  for (let i = 0; i < trains.length; i++) {
    for (let j = i + 1; j < trains.length; j++) {
      const conflict = checkTrainConflict(trains[i], trains[j]);
      if (conflict) conflicts.push(conflict);
    }
  }

  return conflicts;
}

export function coordinationLoop() {
  console.log("Running train coordination loop...");
}
