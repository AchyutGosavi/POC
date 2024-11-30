const express = require('express');
const router = express.Router();
const path = require('path');

// Serve the Individual Page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin.html'));
});

module.exports = router;
