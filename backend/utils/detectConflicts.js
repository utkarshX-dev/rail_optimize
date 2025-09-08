const activeTrains = require('../server.js').activeTrains;
function detectConflicts() {
  const conflicts = [];
  const trainsArray = Array.from(activeTrains.values()).filter(train => 
    train.status === 'running' && train.nextStation
  );


  for (let i = 0; i < trainsArray.length; i++) {
    for (let j = i + 1; j < trainsArray.length; j++) {
      const conflict = checkTrainConflict(trainsArray[i], trainsArray[j]);
      if (conflict) conflicts.push(conflict);
    }
  }

  
  const stationGroups = {};
  trainsArray.forEach(train => {
    if (train.nextStation) {
      if (!stationGroups[train.nextStation]) {
        stationGroups[train.nextStation] = [];
      }
      stationGroups[train.nextStation].push(train);
    }
  });

  // Create conflicts for stations with multiple incoming trains
  Object.keys(stationGroups).forEach(station => {
    if (stationGroups[station].length > 1) {
      conflicts.push({
        id: `conflict_${station}_${Date.now()}`,
        station: station,
        trains: stationGroups[station],
        estimatedTime: Date.now() + 60000, // 1 minute from now
        severity: stationGroups[station].length > 2 ? "High" : "Medium",
        type: "station_congestion"
      });
    }
  });

  return conflicts;
}
module.exports = detectConflicts;