import { pool } from '../db';

console.log('db', pool.options.connectionString);
// model.pool.end(() => {console.log('connection pool has ended') });
// user signup
const createUser = values => pool.query('INSERT INTO public."User"(email, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *', values);

const findUserByEmail = values =>  pool.query('SELECT * FROM public."User" WHERE email = $1', values);

const getUser = () => pool.query('SELECT * FROM public."User"');

const delUser = (values) => pool.query('DELETE FROM public."User" WHERE id = $1', values);

module.exports = {
  pool,
  createUser,
  findUserByEmail,
  getUser,
  delUser,
};
