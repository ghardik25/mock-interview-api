require('dotenv').config();

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is missing in environment variables.");
}

module.exports = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY
};
