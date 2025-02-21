const client = require('./client');

const createCustomer = async (name) => {
  const { rows } = await client.query(
    `INSERT INTO customers (name) VALUES ($1) RETURNING *;`,
    [name]
  );
  return rows[0];
};

const fetchCustomers = async () => {
  const { rows } = await client.query(`SELECT * FROM customers;`);
  return rows;
};

module.exports = { createCustomer, fetchCustomers };