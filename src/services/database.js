
const { Pool } = require('pg');
const dotenv = require('dotenv');
// const bcrypt = require('bcryptjs');

dotenv.config();

// database connection
let dbEnv = '';
if (process.env.NODE_ENV === 'test') {
  dbEnv = process.env.TEST_DATABASE_URL;
} else {
  dbEnv = process.env.DATABASE_URL;
}

console.log('inconfig', process.env.NODE_ENV);
console.log('inconfig', dbEnv);
const pool = new Pool({
  connectionString: dbEnv,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Tables
 */

const createTables = () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS
      booking (
        id SERIAL,
        trip_id integer,
        user_id integer,
        created_on date,
        PRIMARY KEY(trip_id, user_id)
      );
    CREATE TABLE IF NOT EXISTS
      bus (
        id SERIAL PRIMARY KEY,
        number_plate varchar NOT NULL,
        manufacturer varchar NOT NULL,
        model varchar NOT NULL,
        year varchar NOT NULL,
        capacity integer NOT NULL
      );
    CREATE TABLE IF NOT EXISTS
      trip (
        id SERIAL PRIMARY KEY,
        bus_id integer NOT NULL,
        origin varchar NOT NULL,
        destination varchar NOT NULL,
        trip_date date NOT NULL,
        fare double precision NOT NULL,
        status varchar NOT NULL DEFAULT 'active'
      );
    CREATE TABLE IF NOT EXISTS
      users (
        id SERIAL PRIMARY KEY,
        email varchar NOT NULL,
        first_name varchar NOT NULL,
        last_name varchar NOT NULL,
        password varchar NOT NULL,
        is_admin boolean NOT NULL DEFAULT false,
        UNIQUE(email)
      );
    INSERT INTO users (email, first_name, last_name, password, is_admin) VALUES
      ('luckychenko@gmail.com', 'Mikael', 'Chenko', '$2a$10$nhvggt.YpR/YadHZtMffdeGl5ojmn18bLVROc6xRmjnG7VaSwJhPO', true);
    INSERT INTO bus (id, number_plate, manufacturer, model, year, capacity) VALUES ('100', 'KUJ-01-ABJ', 'Toyota', 'Hiace', '2005', 18);
    INSERT INTO trip (bus_id, origin, destination, fare, trip_date) VALUES ('100', 'lagos', 'abuja', '9500', '2019/08/02'), ('100', 'abuja', 'ibadan', '9000', '2019/08/05');`;


  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS users, booking, bus, trip';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables,
};

require('make-runnable');
