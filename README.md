# AI-Based Mock Interview API System

A backend-only API service built with **Node.js**, **Express**, **PostgreSQL**, and **OpenAI GPT** that simulates AI-powered mock interviews based on user role and experience. It allows users to start an interview session, receive tailored questions, submit their answers, and receive AI-generated feedback and scores.

---

## 📦 Features

- 🎯 Role and experience-based question generation
- 🤖 GPT-based evaluation of submitted answers
- 📊 Numeric score and constructive feedback
- 📄 Auto-generated Swagger API documentation
- 🔁 Postman collection for easy testing
- ✅ Modular file structure (controllers, services, routes, config, etc.)
- 🔐 Environment-based secret key management

---

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- OpenAI API Key (create one at [platform.openai.com](https://platform.openai.com/account/api-keys))

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ghardik25/mock-interview-api.git
cd mock-interview-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables
Create a .env file in the root of the project:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# PostgreSQL Database Configuration
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name

```

### 4. Initialize the database

```bash
npm run init-db
```

### 5. Start the development server

```bash
npm run dev
```
Or start normally:

```bash
npm start
```
Your API should now be running at:
http://localhost:3000

---

## 🧾 API Documentation

### 📘 Swagger UI

This provides a complete interactive interface to explore and test the API endpoints.
- 🔗 **URL:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)


### 🧪 Postman Collection

To quickly test the API using Postman:

1. Import the included [Postman collection](postman/mock-interview-api.postman_collection.json) into Postman.
2. Set the environment variable `base_url` to:
http://localhost:3000

3. Manually update the `session_id` and `question_id` when testing the `/answer` and `/evaluate` endpoints.

> 💡 This is especially helpful for local testing or showcasing functionality without using Swagger.

