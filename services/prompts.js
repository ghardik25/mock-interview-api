function getQuestionGenerationPrompt(name, role, experience) {
  return `
You are a senior technical interviewer.

Candidate Details:
Name: ${name}
Role: ${role}
Experience: ${experience} years

Generate 3 interview questions specific to the candidate's role and experience level.

Only return a numbered list of the questions with no explanation or intro.
`;
}

function getAnswerEvaluationPrompt(question, answer) {
  return `
You are a senior technical interviewer evaluating a candidate's answer.

Question:
${question}

Candidate's Answer:
${answer}

Evaluate the response based on the following:
- Clarity: Is the answer well-explained and easy to understand?
- Technical Depth: Does the candidate demonstrate deep knowledge of the topic?
- Relevance: How directly does the answer address the question?

Provide a JSON response only in this exact format:

{
  "feedback": {
    "clarity": "....",
    "technical_depth": "....",
    "relevance": "...."
  },
  "score": 0-10
}

Only return the raw JSON. Do not include markdown, code blocks, or extra comments.
`;
}

module.exports = { getQuestionGenerationPrompt, getAnswerEvaluationPrompt };
