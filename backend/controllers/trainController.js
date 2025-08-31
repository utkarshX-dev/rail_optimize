const fs = require('fs').promises;
const path = require('path');
const { findOptimalRoute } = require('../utils/algorithms');

// Helper function to read JSON files
const readJsonFile = async (filename) => {
  try {
    const data = await fs.readFile(path.join(__dirname, '../data', filename), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    throw error;
  }
};

// Get all trains
const getAllTrains = async (req, res) => {
  try {
    const trains = await readJsonFile('trains.json');
    res.json(trains);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trains' });
  }
};

// Get train by ID
const getTrainById = async (req, res) => {
  try {
    const trains = await readJsonFile('trains.json');
    const train = trains.find(t => t.id === req.params.id);
    if (!train) return res.status(404).json({ error: 'Train not found' });
    res.json(train);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch train' });
  }
};

// Find route between stations
const findRoute = async (req, res) => {
  try {
    const { from, to } = req.query;
    if (!from || !to) {
      return res.status(400).json({ error: 'Please provide both from and to stations' });
    }

    const [stations, routes] = await Promise.all([
      readJsonFile('stations.json'),
      readJsonFile('routes.json')
    ]);

    const route = findOptimalRoute(stations, routes, from, to);
    if (!route) {
      return res.status(404).json({ error: 'No route found between the specified stations' });
    }

    res.json(route);
  } catch (error) {
    console.error('Error finding route:', error);
    res.status(500).json({ error: 'Failed to find route' });
  }
};

module.exports = {
  getAllTrains,
  getTrainById,
  findRoute
};
