const { test, after } = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const pool = require('../server/database');
const app = require('../server/server');

after(async () => {
  await pool.end();
});

test('Node connects to PostgreSQL and runs a query', async () => {
  const result = await pool.query('SELECT 1 + 1 AS sum');
  assert.strictEqual(result.rows[0].sum, 2);
});

test('Node can write to and read from PostgreSQL', async () => {
  const client = await pool.connect();
  try {
    await client.query('CREATE TEMP TABLE tech_check (name TEXT)');
    await client.query("INSERT INTO tech_check (name) VALUES ('MealDeal')");
    const result = await client.query('SELECT name FROM tech_check');
    assert.strictEqual(result.rows[0].name, 'MealDeal');
  } finally {
    client.release();
  }
});

test('GET /api/health reports a database connection', async () => {
  const server = http.createServer(app).listen(0);
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/api/health`);
    const body = await res.json();
    assert.strictEqual(res.status, 200);
    assert.strictEqual(body.database, 'connected');
  } finally {
    server.close();
  }
});
