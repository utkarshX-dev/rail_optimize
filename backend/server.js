const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Middleware =====
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

// ===== MongoDB Connect =====
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

// ===== In-memory storage =====
let activeTrains = new Map();
let networkState = {
  stations: ["DEL", "AGR", "JHS", "BPL", "NGP"],
  conflicts: [],
  lastUpdate: new Date(),
};

const stationCoordinates = {
  DEL: { lat: 28.6139, lng: 77.209, name: "New Delhi" },
  AGR: { lat: 27.1767, lng: 78.0081, name: "Agra" },
  JHS: { lat: 25.4484, lng: 78.5685, name: "Jhansi" },
  BPL: { lat: 23.2599, lng: 77.4126, name: "Bhopal" },
  NGP: { lat: 21.1458, lng: 79.0882, name: "Nagpur" },
};

// ===== Sample trains =====
const sampleTrains = [
  {
    id: "T12345",
    name: "Express",
    type: "Express",
    priority: 1,
    route: ["DEL", "AGR", "JHS", "BPL"],
    currentStation: "DEL",
    nextStation: "AGR",
    speed: 80,
    delay: 0,
    departureTime: "10:00",
    status: "running",
    lastMoveTime: Date.now(), // Add timestamp for movement control
  },
  {
    id: "T67890",
    name: "Local",
    type: "Local",
    priority: 3,
    route: ["BPL", "JHS", "AGR", "DEL"],
    currentStation: "BPL",
    nextStation: "JHS",
    speed: 60,
    delay: 0,
    departureTime: "12:00",
    status: "running",
    lastMoveTime: Date.now(),
  },
  {
    id: "T54321",
    name: "Freight",
    type: "Freight",
    priority: 4,
    route: ["NGP", "BPL", "JHS"],
    currentStation: "NGP",
    nextStation: "BPL",
    speed: 40,
    delay: 5,
    departureTime: "08:00",
    status: "running",
    lastMoveTime: Date.now(),
  },
];

// ===== AI Class =====
class TrainCoordinationAI {
  constructor() {
    this.decisionHistory = [];
  }

  makeDecision(conflict) {
    const features = this.extractFeatures(conflict);
    const decision = this.priorityBasedDecision(conflict);

    this.decisionHistory.push({
      timestamp: new Date(),
      conflict,
      decision,
      features,
    });

    return decision;
  }

  extractFeatures(conflict) {
    return {
      trainCount: conflict.trains.length,
      priorityDifference: Math.abs(
        conflict.trains[0].priority - conflict.trains[1].priority
      ),
      delayImpact: conflict.trains.reduce((sum, t) => sum + t.delay, 0),
      stationCongestion: this.calculateStationCongestion(conflict.station),
      timeOfDay: new Date().getHours(),
    };
  }

  priorityBasedDecision(conflict) {
    const trains = conflict.trains.sort((a, b) => a.priority - b.priority);
    const highPriorityTrain = trains[0];
    const decisions = [];

    trains.forEach((train) => {
      if (train.id === highPriorityTrain.id) {
        decisions.push({
          trainId: train.id,
          action: "PROCEED",
          delay: 0,
          reason: `${train.type} has higher priority`,
        });
      } else {
        decisions.push({
          trainId: train.id,
          action: "HOLD",
          delay: 15,
          reason: `Waiting for higher priority train ${highPriorityTrain.id}`,
        });
      }
    });

    return {
      timestamp: new Date(),
      station: conflict.station,
      severity: "High",
      decisions,
    };
  }

  calculateStationCongestion(station) {
    let congestion = 0;
    activeTrains.forEach((train) => {
      if (train.currentStation === station || train.nextStation === station) {
        congestion++;
      }
    });
    return congestion;
  }
}

const ai = new TrainCoordinationAI();

// ===== Conflict detection =====
function detectConflicts() {
  const conflicts = [];
  const trainsArray = Array.from(activeTrains.values()).filter(train => 
    train.status === 'running' && train.nextStation
  );

  // Check for same destination conflicts
  for (let i = 0; i < trainsArray.length; i++) {
    for (let j = i + 1; j < trainsArray.length; j++) {
      const conflict = checkTrainConflict(trainsArray[i], trainsArray[j]);
      if (conflict) conflicts.push(conflict);
    }
  }

  // Check for station congestion (multiple trains at same station)
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

function checkTrainConflict(train1, train2) {
  // Check if trains are heading to the same station
  if (train1.nextStation === train2.nextStation) {
    const estimatedArrival1 = calculateEstimatedArrival(train1);
    const estimatedArrival2 = calculateEstimatedArrival(train2);
    
    const timeDiff = Math.abs(estimatedArrival1 - estimatedArrival2);
    
    // Conflict if trains arrive within 60 minutes of each other
    if (timeDiff < 60 * 60 * 1000) { // 60 minutes in milliseconds
      return {
        id: `conflict_${train1.id}_${train2.id}`,
        station: train1.nextStation,
        trains: [train1, train2],
        estimatedTime: Math.min(estimatedArrival1, estimatedArrival2),
        severity: timeDiff < 30 * 60 * 1000 ? "High" : "Medium", // 30 minutes
        type: "route_conflict"
      };
    }
  }
  
  return null;
}

function calculateEstimatedArrival(train) {
  const currentTime = Date.now();
  // Base travel time between stations (30-60 minutes)
  const baseTravelTime = 30 * 60 * 1000; // 30 minutes in milliseconds
  // Add delay and some randomness
  const delayTime = train.delay * 60 * 1000; // Convert delay minutes to milliseconds
  const randomVariance = Math.random() * 30 * 60 * 1000; // Random 0-30 minutes
  
  return currentTime + baseTravelTime + delayTime + randomVariance;
}

// ===== Fixed Train simulation =====
function simulateTrainMovement() {
  const currentTime = Date.now();
  
  activeTrains.forEach((train) => {
    if (train.status === "running" && train.nextStation) {
      // Only move train if enough time has passed (every 30-60 seconds instead of every 5 seconds)
      const timeSinceLastMove = currentTime - (train.lastMoveTime || 0);
      const moveInterval = (120 - train.speed) * 1000; // Faster trains move more frequently
      
      if (timeSinceLastMove > moveInterval && Math.random() > 0.3) { // 70% chance to move when interval passed
        const currentIndex = train.route.indexOf(train.currentStation);
        
        if (currentIndex < train.route.length - 1) {
          // Move to next station
          train.currentStation = train.nextStation;
          train.lastMoveTime = currentTime;
          
          // Set the next station correctly
          if (currentIndex + 1 < train.route.length - 1) {
            train.nextStation = train.route[currentIndex + 2];
          } else {
            // This is the last station
            train.nextStation = null;
            train.status = "completed";
          }
          
          // Random chance of delay
          if (Math.random() > 0.85) { // 15% chance of delay
            train.delay += Math.floor(Math.random() * 10) + 1;
            console.log(`Train ${train.id} delayed by additional time at ${train.currentStation}`);
          }
          
          console.log(`Train ${train.id} moved to ${train.currentStation}, next: ${train.nextStation}`);
        }
      }
    }
  });
}

// ===== Coordination loop =====
function coordinationLoop(io) {
  const conflicts = detectConflicts();

  if (conflicts.length > 0) {
    console.log(`Detected ${conflicts.length} conflicts`);
    
    conflicts.forEach((conflict) => {
      const aiDecision = ai.makeDecision(conflict);

      aiDecision.decisions.forEach((decision) => {
        const train = activeTrains.get(decision.trainId);
        if (train) {
          if (decision.action === "HOLD") {
            train.status = "held";
            train.delay += decision.delay;
            console.log(`Train ${train.id} held at ${train.currentStation}`);
          } else if (decision.action === "PROCEED") {
            train.status = "running";
            console.log(`Train ${train.id} proceeding from ${train.currentStation}`);
          }
        }
      });

      io.emit("conflict-detected", { conflict, decision: aiDecision });
    });
  }

  // Release held trains after some time
  activeTrains.forEach((train) => {
    if (train.status === "held" && Math.random() > 0.7) { // 30% chance to release held trains
      train.status = "running";
      console.log(`Train ${train.id} released from hold`);
    }
  });

  simulateTrainMovement();

  networkState.conflicts = conflicts;
  networkState.lastUpdate = new Date();

  // Emit network update
  const activeTrainsArray = Array.from(activeTrains.values());
  io.emit("network-update", {
    trains: activeTrainsArray,
    conflicts,
    timestamp: new Date(),
  });

  // Log current state
  console.log(`Active trains: ${activeTrainsArray.length}, Conflicts: ${conflicts.length}`);
}

// ===== Routes =====
app.get("/", (req, res) => {
  res.send("🚆 Train Coordination Backend Running");
});

app.get("/api/trains", (req, res) => {
  const trains = Array.from(activeTrains.values());
  console.log(`Returning ${trains.length} trains`);
  res.json(trains);
});

app.get("/api/stations", (req, res) => {
  res.json(stationCoordinates);
});

app.get("/api/conflicts", (req, res) => {
  const conflicts = detectConflicts(); // Get real-time conflicts
  console.log(`Returning ${conflicts.length} conflicts`);
  res.json(conflicts);
});

app.post("/api/trains", (req, res) => {
  const newTrain = {
    ...req.body,
    id: `T${Date.now()}`,
    status: "running",
    delay: 0,
    lastMoveTime: Date.now(),
    // Ensure nextStation is set correctly
    nextStation: req.body.route && req.body.route.length > 1 ? req.body.route[1] : null,
    currentStation: req.body.route && req.body.route.length > 0 ? req.body.route[0] : null,
  };
  
  activeTrains.set(newTrain.id, newTrain);
  console.log(`Added new train: ${newTrain.id}`);
  res.json(newTrain);
});

// New endpoint to manually trigger conflict detection (useful for testing)
app.get("/api/check-conflicts-now", (req, res) => {
  const conflicts = detectConflicts();
  const trains = Array.from(activeTrains.values());
  
  console.log(`Manual conflict check: ${conflicts.length} conflicts found`);
  
  res.json({
    conflicts,
    trains: trains.map(t => ({
      id: t.id,
      name: t.name,
      currentStation: t.currentStation,
      nextStation: t.nextStation,
      status: t.status,
      priority: t.priority
    })),
    conflictCount: conflicts.length,
    message: conflicts.length > 0 ? 'Conflicts detected!' : 'No conflicts found'
  });
});
app.post("/api/reset-trains", (req, res) => {
  activeTrains.clear();
  sampleTrains.forEach((train) => {
    const resetTrain = {
      ...train,
      lastMoveTime: Date.now(),
      status: "running",
      currentStation: train.route[0],
      nextStation: train.route.length > 1 ? train.route[1] : null,
    };
    activeTrains.set(resetTrain.id, resetTrain);
  });
  
  console.log("Trains reset to initial state");
  res.json({ message: "Trains reset successfully", trains: Array.from(activeTrains.values()) });
});

// ===== Error handlers =====
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: { message: err.message || "Internal Server Error", status: statusCode },
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

// ===== Start server =====
async function start() {
  await connectDB();

  const server = http.createServer(app);
  const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    
    const currentTrains = Array.from(activeTrains.values());
    const currentConflicts = detectConflicts();
    
    socket.emit("initial-state", {
      trains: currentTrains,
      stations: stationCoordinates,
      conflicts: currentConflicts,
    });

    socket.on("add-train", (trainData) => {
      const newTrain = {
        ...trainData,
        id: `T${Date.now()}`,
        status: "running",
        delay: 0,
        lastMoveTime: Date.now(),
        nextStation: trainData.route && trainData.route.length > 1 ? trainData.route[1] : null,
        currentStation: trainData.route && trainData.route.length > 0 ? trainData.route[0] : null,
      };
      
      activeTrains.set(newTrain.id, newTrain);
      io.emit("train-added", newTrain);
      console.log(`Train added via socket: ${newTrain.id}`);
    });

    socket.on("remove-train", (trainId) => {
      activeTrains.delete(trainId);
      io.emit("train-removed", trainId);
      console.log(`Train removed: ${trainId}`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  // Initialize trains with proper state
  sampleTrains.forEach((train) => {
    const initialTrain = {
      ...train,
      lastMoveTime: Date.now(),
      currentStation: train.route[0],
      nextStation: train.route.length > 1 ? train.route[1] : null,
    };
    activeTrains.set(initialTrain.id, initialTrain);
  });

  console.log(`Initialized ${activeTrains.size} trains`);

  // Start coordination loop - reduced frequency to every 10 seconds
  setInterval(() => coordinationLoop(io), 10000);

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();