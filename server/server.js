const express = require('express');
const path = require('path');
const pool = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Allow the server to read JSON data
app.use(express.json());

// Connect the frontend to the server
app.use(express.static(path.join(__dirname, '../public')));

// Technology check: proves the Node server can talk to PostgreSQL.
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() AS time');
    res.json({ status: 'ok', database: 'connected', time: result.rows[0].time });
  } catch (err) {
    res.status(500).json({ status: 'error', database: 'unreachable' });
  }
});

// Start the server only when this file is run directly (not when tests import it)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`MealDeal is running at http://localhost:${PORT}`);
  });
}

module.exports = app;
