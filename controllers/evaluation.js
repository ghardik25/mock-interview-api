const pool = require('../config/db');

exports.evaluateSession = async (req, res) => {
  const { session_id } = req.params;

  const client = await pool.connect();
  try {
    // Get session DB ID using session token
    const sessionRes = await client.query(
      'SELECT id FROM interview_sessions WHERE session_token = $1',
      [session_id]
    );

    if (sessionRes.rows.length === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const sessionDbId = sessionRes.rows[0].id;

    // Get all questions and answers for the session
    const qaRes = await client.query(
    ` SELECT q.id AS question_id, q.question, a.id AS answer_id, a.answer
      FROM questions q
      JOIN answers a ON q.id = a.question_id
      WHERE q.session_id = $1`
      , [sessionDbId]);

    if (qaRes.rows.length === 0) {
      return res.status(400).json({ error: 'No answers found for this session' });
    }

    const evaluations = [];

    // Loop and generate fake score, feedback
    for (const qa of qaRes.rows) {
      const score = Math.floor(Math.random() * 4) + 7; // Score between 7 and 10
      const feedback = `Good answer to "${qa.question.slice(0, 20)}...". Consider adding examples.`;

      // Save evaluation in DB
      await client.query(
        'INSERT INTO evaluations (answer_id, score, feedback) VALUES ($1, $2, $3)',
        [qa.answer_id, score, feedback]
      );

      // Push to response array
      evaluations.push({
        question_id: qa.question_id,
        question: qa.question,
        answer: qa.answer,
        score,
        feedback
      });
    }

    // Overall score
    const totalScore = evaluations.reduce((sum, e) => sum + e.score, 0);
    const overall_score = parseFloat((totalScore / evaluations.length).toFixed(1));

    // Return the response
    res.status(200).json({
      session_id,
      overall_score,
      evaluations
    });

  } catch (err) {
    console.error('Error in evaluateSession:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
};
