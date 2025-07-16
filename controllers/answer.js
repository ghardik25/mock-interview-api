const pool = require('../config/db'); 

exports.submitAnswer = async (req, res) => {

    // Get data from the request body
    const { session_id, question_id, answer } = req.body;

  if (!session_id || !question_id || !answer) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const client = await pool.connect();
  try {
    // Check if the session token exists
    const sessionRes = await client.query(
      'SELECT id FROM interview_sessions WHERE session_token = $1',
      [session_id]
    );

    if (sessionRes.rows.length === 0) {
      return res.status(404).json({ error: 'Invalid session ID' });
    }

    const sessionId = sessionRes.rows[0].id;

    // Check if the question belongs to the same session
    const questionCheck = await client.query(
      'SELECT id FROM questions WHERE id = $1 AND session_id = $2',
      [question_id, sessionId]
    );

    if (questionCheck.rows.length === 0) {
      return res.status(400).json({ error: 'Question does not belong to session' });
    }

    // save the answer in the answers table
    await client.query(
      'INSERT INTO answers (question_id, answer) VALUES ($1, $2)',
      [question_id, answer]
    );

    res.status(200).json({ status: 'Answer submitted successfully' });
  } catch (err) {
    console.error('Error in submitAnswer:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
};