const { activeTrains, networkState, ai } = require("./state.js");
const detectConflicts = require("./utils/detectConflicts.js");

function registerSocketHandlers(io) {
  io.on("connection", (socket) => {
    console.log("✅ Client connected:", socket.id);

    socket.emit("network_state", networkState);

    socket.on("update_train", (trainData) => {
      activeTrains.set(trainData.id, {
        ...activeTrains.get(trainData.id),
        ...trainData,
        lastMoveTime: Date.now(),
      });

      networkState.conflicts = detectConflicts();
      networkState.lastUpdate = new Date();

      io.emit("network_state", networkState);
    });

    socket.on("request_ai_decision", async () => {
      const decision = await ai.decide(
        Array.from(activeTrains.values()),
        networkState.conflicts
      );
      io.emit("ai_decision", decision);
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });
}

module.exports = registerSocketHandlers;
