const { Client } = require('pg');
require('dotenv').config();

console.log("🔄 Attempting to connect to PostgreSQL...");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect()
  .then(() => {
    console.log('✅ Connected to PostgreSQL');
    return client.query('SELECT NOW()'); // Fetch current timestamp
  })
  .then((res) => {
    console.log('🕒 Database time:', res.rows[0]);
    client.end(); // Close connection
  })
  .catch(err => {
    console.error('❌ Database connection error:', err.stack);
    client.end(); // Close connection in case of failure
  });
