"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var dbEnv = process.env.DATABASE_URL;
var env = process.env.NODE_ENV || 'development';

if (env === 'test') {
  dbEnv = process.env.TEST_DATABASE_URL;
} else {
  dbEnv = process.env.DATABASE_URL;
}

var pool = new _pg.Pool({
  connectionString: dbEnv
});
pool.on('connect', function () {//  console.log('connected to the db');
}); // user signup

var createUser = function createUser(values) {
  return pool.query('INSERT INTO public."User"(email, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *', values);
};

var findUserByEmail = function findUserByEmail(values) {
  return pool.query('SELECT * FROM public."User" WHERE email = $1', values);
};

var getUser = function getUser() {
  return pool.query('SELECT * FROM public."User"');
};

module.exports = {
  createUser: createUser,
  findUserByEmail: findUserByEmail,
  getUser: getUser
};