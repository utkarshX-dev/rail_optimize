// Updated server.js - Slower coordination loop for realistic simulation
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const { coordinationLoop, getQuickTrainStatus } = require("./utils/trainutils.js");
const { sampleTrains } = require("./data/trainData.js");
const registerSocketHandlers = require("./socket.js");
const trainRoutes = require("./routes/trainRoutes.js");
const journeyRoutes = require("./routes/journeyRoute.js");
const { activeTrains, ai } = require("./state.js");
// At the top of server.js, modify your imports:
const {getBulkTrainData } = require("./utils/trainutils.js");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());
app.use("/", trainRoutes);
app.use("/", journeyRoutes);

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" Connected to MongoDB");
  } catch (err) {
    console.error(" MongoDB connection error:", err);
    process.exit(1);
  }
}

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: {
      message: err.message || "Internal Server Error",
      status: statusCode
    }
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

async function start() {
  await connectDB();
  
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  registerSocketHandlers(io);

  // Initialize trains with proper setup
  sampleTrains.forEach(train => {
    const initialTrain = {
      ...train,
      lastMoveTime: Date.now(),
      currentStation: train.route[0],
      nextStation: train.route[1] || null,
      currentDelay: train.delay || 0,
      status: "running"
    };
    activeTrains.set(initialTrain.id, initialTrain);
    console.log(` Initialized Train ${train.id} (${train.name}) at ${train.route[0]}`);
  });

  // Slower coordination loop - 5 second intervals (instead of 1 second)
  console.log("🔄 Starting coordination loop (5-second intervals)...");
// In your server.js coordination loop interval
const coordinationInterval = setInterval(async () => {
  try {
    const result = await coordinationLoop();
    
    // Emit updates when there are changes
    if (result.movementOccurred || result.aiDecision || result.conflicts > 0) {
      const quickStatus = getQuickTrainStatus();
      io.emit("quick_update", quickStatus);
      
      // IMPORTANT: Send updated train positions to frontend
      const trainData = getBulkTrainData();
      io.emit("trains_updated", trainData);
      
      if (result.aiDecision) {
        io.emit("ai_decision", result.aiDecision);
      }
    }
  } catch (error) {
    console.error("Coordination loop error:", error);
  }
}, 5000);
  // Detailed updates every 15 seconds (instead of 5 seconds)
  const detailedUpdateInterval = setInterval(() => {
    const trainStatus = Array.from(activeTrains.values()).map(t => ({
      id: t.id,
      name: t.name,
      currentStation: t.currentStation,
      nextStation: t.nextStation,
      status: t.status,
      delay: t.currentDelay || t.delay || 0,
    }));

    const runningTrains = trainStatus.filter(t => t.status === 'running').length;
    const completedTrains = trainStatus.filter(t => t.status === 'completed').length;
    
    console.log(`📊 Status Update | Running: ${runningTrains} | Completed: ${completedTrains} | Total: ${trainStatus.length}`);
    
    // Show detailed train positions
    trainStatus.forEach(train => {
      if (train.status === 'running') {
        const delayInfo = train.delay > 0 ? ` (${train.delay}s delay)` : '';
        console.log(`    ${train.name}: ${train.currentStation} → ${train.nextStation || 'END'}${delayInfo}`);
      }
    });
    
    io.emit("trains_updated", trainStatus);
  }, 15000); // 15 seconds for detailed updates

  // Status summary every minute
  const summaryInterval = setInterval(() => {
    const summary = getQuickTrainStatus();
    console.log(`\n📈 SYSTEM SUMMARY (${new Date().toLocaleTimeString()})`);
    console.log(`   Total Trains: ${summary.total}`);
    console.log(`   Running: ${summary.running}`);
    console.log(`   Completed: ${summary.completed}`);
    console.log(`   Delayed: ${summary.delayed}`);
    console.log(`   Active Conflicts: ${summary.conflicts}\n`);
  }, 60000); // 1 minute summaries

  // Initialize AI service
  console.log(" Initializing AI service...");
  try {
    await ai.checkMLServiceHealth();
    console.log("AI service is ready");
  } catch (error) {
    console.log(" AI service not available:", error.message);
  }

  console.log(`\n Train Management System Started`);
  console.log(`📍 Initialized ${activeTrains.size} trains`);
  console.log(`🔗 ML Service URL: ${process.env.ML_SERVICE_URL || 'http://localhost:5001'}`);
  console.log(`⏱️ Travel Time: 30 seconds per station`);
  console.log(`🔄 Coordination Loop: Every 5 seconds`);
  console.log(`📊 Status Updates: Every 15 seconds\n`);

  server.listen(PORT, () => {
    console.log(`🌐 Server running on port ${PORT}`);
    console.log(`🔗 API Available at: http://localhost:${PORT}`);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('⚠️shutting down...');
    clearInterval(coordinationInterval);
    clearInterval(detailedUpdateInterval);
    clearInterval(summaryInterval);
    server.close(() => {
      console.log('✅ Server shut down successfully');
    });
  });

  process.on('SIGINT', () => {
    console.log('\n⚠️shutting down gracefully...');
    clearInterval(coordinationInterval);
    clearInterval(detailedUpdateInterval);
    clearInterval(summaryInterval);
    server.close(() => {
      console.log('Server shut down successfully');
      process.exit(0);
    });
  });
}

start().catch(console.error);