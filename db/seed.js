const client = require('./client');
const { createCustomer, fetchCustomers} = require('./customers');
const { createRestaurant, fetchRestaurants} = require('./restaurants');
const { createReservation } = require('./reservations');

const dropTables = async () => {
  console.log('Dropping tables...');
  await client.query(`
    DROP TABLE IF EXISTS reservations;
    DROP TABLE IF EXISTS customers;
    DROP TABLE IF EXISTS restaurants;

  `);
};

const createTables = async () => {
  console.log('Creating tables...');
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
      party_count INTEGER NOT NULL CHECK (party_count > 0),
      restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE NOT NULL,
      customer_id UUID REFERENCES customers(id) ON DELETE CASCADE NOT NULL
    );
  `);
};

const seedData = async () => {
  console.log('Seeding database...');
  const customer = await createCustomer('John Doe');
  const restaurant = await createRestaurant('The Fancy Fork');

  await createReservation(customer.id, restaurant.id, '2025-02-25', 4);
};

const init = async () => {
  try {
    await dropTables();
    await createTables();
    await seedData();
    console.log('Database setup complete');
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
};
