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
 *     description: Accepts user profile details (name, role, experience), generates an interview session using OpenAI and returns session ID with generated questions.
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 session_id:
 *                   type: string
 *                   example: xyz123
 *                 questions:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - Can you explain your experience with RESTful APIs?
 *                     - How do you ensure your backend is scalable?
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
 *                 example: xyz123
 *               question_id:
 *                 type: integer
 *                 example: 1
 *               answer:
 *                 type: string
 *                 example: REST uses fixed endpoints while GraphQL allows flexible queries.
 *     responses:
 *       200:
 *         description: Answer submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Answer submitted successfully
 *                 answer_id:
 *                   type: integer
 *                   example: 1
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
 *         description: Session token (returned from /interview/start)
 *     responses:
 *       200:
 *         description: Evaluation completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 evaluations:
 *                   type: array
 *                   description: List of evaluations for each answer
 *                   items:
 *                     type: object
 *                     properties:
 *                       question:
 *                         type: string
 *                         example: Can you explain the difference between REST and GraphQL?
 *                       answer:
 *                         type: string
 *                         example: REST uses fixed endpoints while GraphQL allows flexible queries.
 *                       feedback:
 *                         type: string
 *                         example: Great answer! Consider adding examples.
 *                       score:
 *                         type: number
 *                         format: float
 *                         example: 8.5
 *                 average_score:
 *                   type: number
 *                   format: float
 *                   description: Average score across all evaluated answers
 *                   example: 8.2
 */
router.get('/evaluate/:session_id', evaluateSession);

module.exports = router;
