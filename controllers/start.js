const pool = require('../config/db');
const generateToken = require('../utils/generate_token');
const { generateQuestions } = require('../services/openaiService');

exports.startInterview = async (req, res) => {
  const { name, role, experience } = req.body;

  if (!name || !role || !experience) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Insert user
    const userResult = await client.query(
      'INSERT INTO users (name, role, experience) VALUES ($1, $2, $3) RETURNING id',
      [name, role, experience]
    );
    const userId = userResult.rows[0].id;

    // Create session
    const sessionToken = generateToken();
    const sessionResult = await client.query(
      'INSERT INTO interview_sessions (user_id, session_token) VALUES ($1, $2) RETURNING id',
      [userId, sessionToken]
    );
    const sessionId = sessionResult.rows[0].id;

    // GPT Generate questions
    let questions = [];
    try {
      questions = await generateQuestions(name, role, experience);
    } catch (err) {
      console.error('OpenAI generation failed, using fallback.', err.message || err);
      return res.status(500).json({
        message: 'Failed to generate interview questions. Please try again later.',
        error: err.message || 'OpenAI API error'
      });
    }

    // Insert question into DB
    const questionInserts = questions.map(q =>
      client.query(
        'INSERT INTO questions (session_id, question) VALUES ($1, $2) RETURNING id, question',
        [sessionId, q]
      )
    );
    const insertedQuestions = await Promise.all(questionInserts);
    const questionsOutput = insertedQuestions.map(q => q.rows[0]);

    await client.query('COMMIT');

    res.status(200).json({
      session_id: sessionToken,
      questions: questionsOutput
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error in startInterview:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
};
