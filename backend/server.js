const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes.js');
const trainRoutes = require('./routes/trainRoutes.js');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());


app.use('/api/trains', trainRoutes);
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});


async function start() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

start().catch((err) => console.log(err));
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: statusCode
    }
  });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route Not Found' });
});
