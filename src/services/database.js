
const { Pool } = require('pg');
const dotenv = require('dotenv');

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
  const queryText =
    `BEGIN;
    CREATE TABLE IF NOT EXISTS
      Bookingz(
        id SERIAL PRIMARY KEY,
        trip_id integer,
        user_id integer,
        created_on date
      );
    CREATE TABLE IF NOT EXISTS
      Bux (
        id SERIAL PRIMARY KEY,
        number_plate varchar(15) NOT NULL,
        manufacturer varchar(100) NOT NULL,
        model varchar(20) NOT NULL,
        year varchar(4) NOT NULL,
        capacity integer NOT NULL
      );
    CREATE TABLE IF NOT EXISTS
      Tripx (
        id SERIAL PRIMARY KEY,
        bus_id integer NOT NULL,
        origin varchar(50) NOT NULL,
        destination varchar(50) NOT NULL,
        trip_date date NOT NULL,
        fare double precision NOT NULL,
        status varchar(10) NOT NULL DEFAULT 'active'
      );
    CREATE TABLE IF NOT EXISTS
      Userx (
        id SERIAL PRIMARY KEY,
        email varchar(50) NOT NULL,
        first_name varchar(20) NOT NULL,
        last_name varchar(20) NOT NULL,
        password varchar(50) NOT NULL,
        is_admin boolean NOT NULL DEFAULT false
      );
    INSERT INTO Userx (email, first_name, last_name, password, is_admin) VALUES
      ('luckychenko@gmail.com', 'Lucky', 'Ogidan', 'eminem', true);
      COMMIT;`;


  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}


/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS User, Booking, Bus, Trip';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables
};

require('make-runnable');
