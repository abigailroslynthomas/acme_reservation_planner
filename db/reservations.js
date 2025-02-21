const client = require('./client');
const { v4: uuidv4 } = require('uuid');

const createReservation = async (customer_id, restaurant_id, date, party_count) => {
  const { rows } = await client.query(
    'INSERT INTO reservations (id, customer_id, restaurant_id, date, party_count) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [uuidv4(), customer_id, restaurant_id, date, party_count]
  );
  return rows[0];
};

const fetchReservations = async () => {
  const { rows } = await client.query('SELECT * FROM reservations');
  return rows;
};

const destroyReservation = async (id) => {
  await client.query('DELETE FROM reservations WHERE id = $1', [id]);
};

module.exports = { createReservation, fetchReservations, destroyReservation };
