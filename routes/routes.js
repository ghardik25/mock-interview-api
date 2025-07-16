const express = require('express');
const router = express.Router();

// Importing Controllers
const { startInterview } = require('../controllers/interview');
const { submitAnswer } = require('../controllers/answer');
const { evaluateSession } = require('../controllers/evaluation');

// Routes
router.post('/start', startInterview);
router.post('/answer', submitAnswer);
router.get('/evaluate/:session_id', evaluateSession);

module.exports = router;
