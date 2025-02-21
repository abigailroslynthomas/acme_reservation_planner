const client = require('./client');
const { createCustomer, fetchCustomers } = require('./customers');
const { createRestaurant, fetchRestaurants } = require('./restaurants');
const { createReservation, fetchReservations } = require('./reservations');

const dropTables = async () => {
  await client.query(`
    DROP TABLE IF EXISTS reservations;
    DROP TABLE IF EXISTS customers;
    DROP TABLE IF EXISTS restaurants;
  `);
};

const createTables = async () => {
  await client.query(`
    CREATE TABLE customers (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL
    );
    CREATE TABLE restaurants (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL
    );
    CREATE TABLE reservations (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      date DATE NOT NULL,
      party_count INTEGER NOT NULL,
      restaurant_id UUID REFERENCES restaurants(id) NOT NULL,
      customer_id UUID REFERENCES customers(id) NOT NULL
    );
  `);
};

const seedData = async () => {
  await dropTables();
  await createTables();

  const alice = await createCustomer('Alice');
  const bob = await createCustomer('Bob');

  const mcd = await createRestaurant('McDonalds');
  const kfc = await createRestaurant('KFC');

  await createReservation(alice.id, mcd.id, '2025-03-01', 4);
  await createReservation(bob.id, kfc.id, '2025-03-05', 2);

  console.log(await fetchCustomers());
  console.log(await fetchRestaurants());
};

seedData()
  .then(() => client.end())
  .catch((err) => {
    console.error(err);
    client.end();
  });
