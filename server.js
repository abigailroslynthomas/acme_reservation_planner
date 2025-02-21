const express = require('express');
const app = express();
const { fetchCustomers } = require('./db/customers');
const { fetchRestaurants } = require('./db/restaurants');
const { fetchReservations, createReservation, destroyReservation } = require('./db/reservations');

app.use(express.json());

app.get('/api/customers', async (req, res) => {
  res.json(await fetchCustomers());
});

app.get('/api/restaurants', async (req, res) => {
  res.json(await fetchRestaurants());
});

app.get('/api/reservations', async (req, res) => {
  res.json(await fetchReservations());
});

app.post('/api/customers/:id/reservations', async (req, res) => {
  const { id } = req.params;
  const { restaurant_id, date, party_count } = req.body;
  try {
    const reservation = await createReservation(id, restaurant_id, date, party_count);
    res.status(201).json(reservation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/customers/:customer_id/reservations/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await destroyReservation(id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
