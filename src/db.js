
import { Pool } from 'pg';

// console.log('inconfig', process.env.NODE_ENV);


// database connection
let dbEnv = '';
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
 console.log(`connected to the ${dbEnv} db`);
});

module.exports = {
  pool,
};
