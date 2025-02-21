const client = require('./client');

const createRestaurant = async (name) => {
  const { rows } = await client.query(
    `INSERT INTO restaurants (name) VALUES ($1) RETURNING *;`,
    [name]
  );
  return rows[0];
};

const fetchRestaurants = async () => {
  const { rows } = await client.query(`SELECT * FROM restaurants;`);
  return rows;
};

module.exports = { createRestaurant, fetchRestaurants };
