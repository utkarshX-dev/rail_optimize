const ConflictLog = require("../models/conflictLog.js");
const { Parser } = require('json2csv'); // CSV conversion

const exportConflicts = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // midnight today

    const conflicts = await ConflictLog.find({
      createdAt: { $gte: startOfDay }
    });

    // Serve CSV if requested
    if (req.query.format && req.query.format.toLowerCase() === 'csv') {
      const fields = ['trainA', 'trainB', 'decision', 'outcome', 'createdAt'];
      const parser = new Parser({ fields });
      const csv = parser.parse(conflicts);

      res.header('Content-Type', 'text/csv');
      res.attachment(`conflicts_${startOfDay.toISOString().slice(0,10)}.csv`);
      return res.send(csv);
    }

    // Otherwise serve JSON
    res.json(conflicts);
  } catch (err) {
    console.error("Error exporting conflicts:", err);
    res.status(500).json({ error: "Failed to export conflicts" });
  }
};

module.exports = { exportConflicts };
