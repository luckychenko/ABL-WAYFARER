import { pool } from '../db';

// model.pool.end(() => {console.log('connection pool has ended') });

/**
 *
 * @param {user model} values
 */

const createUser = values => pool.query('INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING *', values);

const findUserByEmail = values => pool.query('SELECT * FROM users WHERE email = $1', values);

const checkIfAdmin = values => pool.query('SELECT id FROM users WHERE id = $1 AND is_admin = true', values);

const getUser = () => pool.query('SELECT * FROM users');

const delUser = values => pool.query('DELETE FROM users WHERE id = $1', values);

/**
 *
 * @param {bus model}
 */
const findBus = values => pool.query('SELECT * FROM bus WHERE id = $1', values);

/**
 *
 * @param {trip model}
 */
const createTrip = values => pool.query('INSERT INTO trip (bus_id, origin, destination, fare, trip_date) VALUES ($1, $2, $3, $4, $5) RETURNING *', values);


module.exports = {
  pool,
  createUser,
  findUserByEmail,
  checkIfAdmin,
  getUser,
  delUser,
  findBus,
  createTrip,
};
