const express = require('express');
const router = express.Router();

// Importing Controllers
const { startInterview } = require('../controllers/interview');
const { submitAnswer } = require('../controllers/answer');

// Routes
router.post('/start', startInterview);
router.post('/answer', submitAnswer);

module.exports = router;
