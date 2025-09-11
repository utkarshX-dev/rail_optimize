// detectConflicts.js - Factory to avoid circular deps
function createDetectConflicts({ checkTrainConflict, calculateEstimatedArrival, activeTrains }) {
  return function detectConflicts() {
    const conflicts = [];
    const trainsArray = Array.from(activeTrains.values()).filter(
      train => train.status === "running" && train.nextStation
    );

    // Pairwise conflict detection
    for (let i = 0; i < trainsArray.length; i++) {
      for (let j = i + 1; j < trainsArray.length; j++) {
        const conflict = checkTrainConflict(trainsArray[i], trainsArray[j]);
        if (conflict) conflicts.push(conflict);
      }
    }

    // Station congestion detection
    const stationGroups = {};
    trainsArray.forEach(train => {
      if (!stationGroups[train.nextStation]) {
        stationGroups[train.nextStation] = [];
      }
      stationGroups[train.nextStation].push(train);
    });

    Object.keys(stationGroups).forEach(station => {
      const group = stationGroups[station];
      if (group.length > 1) {
        conflicts.push({
          id: `station_conflict_${station}_${Date.now()}`,
          station,
          trains: group,
          estimatedTime: Math.min(...group.map(t => calculateEstimatedArrival(t))),
          severity: group.length > 2 ? "High" : "Medium",
          type: "station_congestion"
        });
      }
    });

    return conflicts;
  };
}

module.exports = createDetectConflicts;
