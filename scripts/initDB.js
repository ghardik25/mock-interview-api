// scripts/initDB.js
const fs = require('fs');
const path = require('path');
const pool = require('../config/db');

const schemaPath = path.join(__dirname, '../db/schema.sql');
const schemaSQL = fs.readFileSync(schemaPath, 'utf8');

(async () => {
  try {
    await pool.query(schemaSQL);
    console.log('Tables created successfully.');
  } catch (err) {
    console.error('Error creating tables:', err);
  } finally {
    await pool.end();
  }
})();
