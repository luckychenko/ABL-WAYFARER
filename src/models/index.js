import { pool } from '../config';

// user signup
const createUser = values => pool.query('INSERT INTO public."User"(email, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *', values);

const findUserByEmail = values => pool.query('SELECT * FROM public."User" WHERE email = $1', values);

const getUser = () => pool.query('SELECT * FROM public."User"');

module.exports = {
  createUser,
  findUserByEmail,
  getUser,
};
