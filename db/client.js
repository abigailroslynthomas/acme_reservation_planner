const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://localhost/acme_reservation_planner'
});

client.connect();

module.exports = client;
