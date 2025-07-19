const OpenAI = require('openai');
const { OPENAI_API_KEY } = require('../config/openai');
const { getQuestionGenerationPrompt,
  getAnswerEvaluationPrompt } = require('./prompts');

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});

//  Generates role and experience specific interview questions
async function generateQuestions(name, role, experience) {
  const prompt = getQuestionGenerationPrompt(name, role, experience);

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });

    return response.choices[0].message.content
      .split('\n')
      .filter(line => line.trim())
      .map(q => q.replace(/^\d+[\).\s]*/, '').trim());
  } catch (error) {
    console.error('OpenAI question generation failed:', error.message);
    return [
      "What are your strengths and weaknesses?",
      "Describe a technical challenge you've overcome.",
      "How do you stay updated with industry trends?"
    ];
  }
}

// Evaluates a candidate’s answer and provides feedback
async function evaluateAnswer(question, answer) {
  const prompt = getAnswerEvaluationPrompt(question, answer);

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5
    });

    const content = response.choices[0].message.content;

    return JSON.parse(content);
  } catch (error) {
    console.error('OpenAI evaluation failed or returned invalid JSON:', error.message);
    return {
      feedback: {
        clarity: "Could not evaluate clarity due to AI response issue.",
        technical_depth: "Could not evaluate depth due to AI response issue.",
        relevance: "Could not evaluate relevance due to AI response issue."
      },
      score: 0
    };
  }
}

module.exports = { generateQuestions, evaluateAnswer };
