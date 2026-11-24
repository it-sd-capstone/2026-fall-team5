const fs = require('fs');
const path = require('path');
const pool = require('./database');

// Runs database/schema.sql against the configured database.
async function main() {
  const sql = fs.readFileSync(path.join(__dirname, '../database/schema.sql'), 'utf8');
  await pool.query(sql);
  console.log('Database tables created.');
  await pool.end();
}

main().catch((err) => {
  console.error('Could not set up the database:', err.message);
  process.exit(1);
});
