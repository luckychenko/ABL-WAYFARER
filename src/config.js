import dotenv from 'dotenv';
import { Pool } from 'pg';

// initiate evironment variables
const env = dotenv;
dotenv.config();


// database connection
let dbEnv = process.env.DATABASE_URL;
// const env = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'test') {
  dbEnv = process.env.TEST_DATABASE_URL;
} else {
  dbEnv = process.env.DATABASE_URL;
}
const pool = new Pool({
  connectionString: dbEnv,
});

pool.on('connect', () => {
//  console.log('connected to the db');
});

module.exports = {
  pool,
  env,
};
