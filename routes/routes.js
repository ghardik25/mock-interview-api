const express = require('express');
const router = express.Router();

// Importing Controllers
const { startInterview } = require('../controllers/interview');
const { submitAnswer } = require('../controllers/answer');
const { evaluateSession } = require('../controllers/evaluation');

/**
 * @openapi
 * /interview/start:
 *   post:
 *     description: Start an interview session by taking input from user and providing a generated session_id.
 *     responses:
 *       200:
 *         description: Interview session started.
 */
router.post('/start', startInterview);

router.post('/answer', submitAnswer);
router.get('/evaluate/:session_id', evaluateSession);

module.exports = router;
