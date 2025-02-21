const express = require('express');
const app = express();
const { fetchCustomers } = require('./db/customers');
const { fetchRestaurants } = require('./db/restaurants');
const { fetchReservations, createReservation, destroyReservation } = require('./db/reservations');

app.use(express.json());

app.get('/api/customers', async (req, res) => {
  const customers = await fetchCustomers();
  res.json(customers);
});

app.get('/api/restaurants', async (req, res) => {
  const restaurants = await fetchRestaurants();
  res.json(restaurants);
});

app.get('/api/reservations', async (req, res) => {
  const reservations = await fetchReservations();
  res.json(reservations);
});

app.post('/api/customers/:id/reservations', async (req, res) => {
  try {
    const { restaurant_id, date, party_count } = req.body;
    const reservation = await createReservation(req.params.id, restaurant_id, date, party_count);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/customers/:customer_id/reservations/:id', async (req, res) => {
  try {
    await destroyReservation(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
