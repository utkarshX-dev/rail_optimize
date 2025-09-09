const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const { coordinationLoop } = require("./utils/trainutils.js");
const { sampleTrains } = require("./data/trainData.js");
const registerSocketHandlers = require("./socket.js");
const trainRoutes = require("./routes/trainRoutes.js");
const journeyRoutes = require("./routes/journeyRoute.js");
const { activeTrains } = require("./state.js");
const userRoutes = require("./routes/userRoutes.js");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*", methods: ["GET","POST","PUT","DELETE"], allowedHeaders: ["Content-Type","Authorization"], credentials: true }));
app.use(express.json());
app.use("/", trainRoutes);
app.use("/api/journeys", journeyRoutes);
app.use("/api/users", userRoutes);

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({ error: { message: err.message || "Internal Server Error", status: statusCode } });
});

app.use((req, res) => { res.status(404).json({ message: "Route Not Found" }); });

async function start() {
  await connectDB();
  const server = http.createServer(app);
  const io = new Server(server, { cors: { origin: "*", methods: ["GET","POST"] } });

  registerSocketHandlers(io);

  sampleTrains.forEach(train => {
    const initialTrain = { ...train, lastMoveTime: Date.now(), currentStation: train.route[0], nextStation: train.route[1] || null };
    activeTrains.set(initialTrain.id, initialTrain);
  });

  // setInterval(() => {
  //   coordinationLoop();
  //   console.log(Array.from(activeTrains.values()).map(t => ({
  //     id: t.id,
  //     currentStation: t.currentStation,
  //     nextStation: t.nextStation,
  //     status: t.status,
  //     delay: t.delay || 0,
  //   })));
  // }, 5000);
   setInterval(() => {
    coordinationLoop();
  }, 5000);

  console.log(`Initialized ${activeTrains.size} trains`);

  server.listen(PORT, () => {
    console.log(`🚆 Server running on port ${PORT}`);
  });
}

start();
