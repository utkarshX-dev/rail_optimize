const { Train, Station } = require('../models/train');

function generateMockData() {
  const stations = [
    new Station('DEL', 'New Delhi', 16, [28.6562, 77.2410]),
    new Station('AGR', 'Agra', 6, [27.1767, 78.0081]),
    new Station('JHS', 'Jhansi', 8, [25.4484, 78.5685]),
    new Station('BPL', 'Bhopal', 10, [23.2599, 77.4126]),
    new Station('NGP', 'Nagpur', 12, [21.1458, 79.0882])
  ];

  const trains = [
    new Train('12001', ['DEL', 'AGR', 'JHS', 'BPL'], 1, new Date()),
    new Train('12002', ['BPL', 'JHS', 'AGR', 'DEL'], 1, new Date()),
    new Train('11058', ['DEL', 'JHS', 'NGP'], 2, new Date()),
    new Train('11057', ['NGP', 'JHS', 'DEL'], 2, new Date()),
    new Train('51901', ['DEL', 'AGR'], 3, new Date())
  ];

  return { trains, stations };
}

module.exports = { generateMockData };