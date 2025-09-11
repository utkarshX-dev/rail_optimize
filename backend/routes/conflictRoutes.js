const express = require('express');
const router = express.Router();
const { exportConflicts } = require('../controllers/conflictController.js');

router.get('/export', exportConflicts);

module.exports = router;
