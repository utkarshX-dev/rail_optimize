// Updated socket.js
const { activeTrains, networkState, ai } = require("./state.js");
const { stationCoordinates } = require("./data/trainData.js");
const { getBulkTrainData, detectConflicts } = require("./utils/trainutils.js");

function registerSocketHandlers(io) {
  io.on("connection", (socket) => {
    console.log("✅ Client connected:", socket.id);

    // Send enhanced initial state with proper data structure
    const initialState = {
      stations: networkState.stations, // This is your array ["DEL", "AGR", ...]
      stationCoordinates: stationCoordinates, // Add coordinate data too
      conflicts: detectConflicts(),
      trains: getBulkTrainData(),
      lastUpdate: new Date().toISOString()
    };
    
    socket.emit("initial-state", initialState);

    socket.on("update_train", (trainData) => {
      try {
        activeTrains.set(trainData.id, {
          ...activeTrains.get(trainData.id),
          ...trainData,
          lastMoveTime: Date.now(),
        });

        networkState.conflicts = detectConflicts();
        networkState.lastUpdate = new Date();

        // Emit updated network state with train data
        io.emit("network-update", {
          trains: getBulkTrainData(),
          conflicts: networkState.conflicts,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error("Error updating train:", error);
      }
    });

    socket.on("request_ai_decision", async () => {
      try {
        const conflicts = detectConflicts();
        if (conflicts.length > 0) {
          const decision = await ai.makeDecision(conflicts);
          io.emit("ai_decision", decision);
        }
      } catch (error) {
        console.error("Error in AI decision:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });

  // Broadcast function for use by coordination loop
  function broadcastUpdate(data) {
    io.emit("trains_updated", data);
  }

  function broadcastQuickUpdate(data) {
    io.emit("quick_update", data);
  }

  function broadcastConflictResolution(conflict, decision) {
    io.emit("conflict-detected", {
      conflict,
      decision,
      timestamp: new Date().toISOString()
    });
  }

  return {
    broadcastUpdate,
    broadcastQuickUpdate,
    broadcastConflictResolution
  };
}

module.exports = registerSocketHandlers;