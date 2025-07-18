const express = require('express');
const router = express.Router();

const { startInterview } = require('../controllers/start');
const { submitAnswer } = require('../controllers/answer');
const { evaluateSession } = require('../controllers/evaluation');

/**
 * @swagger
 * /interview/start:
 *   post:
 *     summary: Start a mock interview session
 *     description: Accepts user profile details (name, role, experience), generates an interview session, and returns session ID with questions.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - role
 *               - experience
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               role:
 *                 type: string
 *                 example: Backend Developer
 *               experience:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Interview session started successfully
 */
router.post('/start', startInterview);

/**
 * @swagger
 * /interview/answer:
 *   post:
 *     summary: Submit answer to a question
 *     description: Submits a user's answer for a specific question under a session.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - session_id
 *               - question_id
 *               - answer
 *             properties:
 *               session_id:
 *                 type: string
 *               question_id:
 *                 type: integer
 *               answer:
 *                 type: string
 *     responses:
 *       200:
 *         description: Answer submitted successfully
 */
router.post('/answer', submitAnswer);

/**
 * @swagger
 * /interview/evaluate/{session_id}:
 *   get:
 *     summary: Evaluate all answers in a session
 *     description: Evaluates all answers submitted in a session and returns question-wise feedback and an overall score.
 *     parameters:
 *       - in: path
 *         name: session_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session token (returned from /start)
 *     responses:
 *       200:
 *         description: Evaluation completed successfully
 */
router.get('/evaluate/:session_id', evaluateSession);

module.exports = router;
