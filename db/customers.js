const client = require('./client');
const { v4: uuidv4 } = require('uuid');

const createCustomer = async (name) => {
  const { rows } = await client.query(
    'INSERT INTO customers (id, name) VALUES ($1, $2) RETURNING *',
    [uuidv4(), name]
  );
  return rows[0];
};

const fetchCustomers = async () => {
  const { rows } = await client.query('SELECT * FROM customers');
  return rows;
};

module.exports = { createCustomer, fetchCustomers };
