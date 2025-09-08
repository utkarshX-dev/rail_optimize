const stationCoordinates = {
  DEL: { lat: 28.6139, lng: 77.209, name: "New Delhi" },
  AGR: { lat: 27.1767, lng: 78.0081, name: "Agra" },
  JHS: { lat: 25.4484, lng: 78.5685, name: "Jhansi" },
  BPL: { lat: 23.2599, lng: 77.4126, name: "Bhopal" },
  NGP: { lat: 21.1458, lng: 79.0882, name: "Nagpur" },
};


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
module.exports = { stationCoordinates, sampleTrains };