-- users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL,
  experience INTEGER NOT NULL
);

-- interview_sessions table
CREATE TABLE interview_sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  session_token VARCHAR(20) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- questions table
CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  session_id INTEGER REFERENCES interview_sessions(id),
  question TEXT NOT NULL
);

-- answers table
CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id),
  answer TEXT NOT NULL
);

-- evaluations table
CREATE TABLE evaluations (
  id SERIAL PRIMARY KEY,
  answer_id INTEGER REFERENCES answers(id),
  score FLOAT,
  feedback TEXT
);
