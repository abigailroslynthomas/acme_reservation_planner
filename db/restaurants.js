const client = require('./client');
const { v4: uuidv4 } = require('uuid');

const createRestaurant = async (name) => {
  const { rows } = await client.query(
    'INSERT INTO restaurants (id, name) VALUES ($1, $2) RETURNING *',
    [uuidv4(), name]
  );
  return rows[0];
};

const fetchRestaurants = async () => {
  const { rows } = await client.query('SELECT * FROM restaurants');
  return rows;
};

module.exports = { createRestaurant, fetchRestaurants };
