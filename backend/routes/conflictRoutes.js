const express = require('express');
const router = express.Router();

router.get('/export', (req, res) => {
  res.json({ 
    message: 'Conflict export endpoint - coming soon',
    status: 'placeholder' 
  });
});

module.exports = router;