const express = require('express');
const messageRoutes = require('./message.route');

const router = express.Router();

/**
 * GET /health-check (Check service health)
 */
router.get('/health-check', (req, res) => res.send('OK'));

// mount message routes
router.use('/messages', messageRoutes);

module.exports = router;
