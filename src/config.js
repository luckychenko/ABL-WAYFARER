import dotenv from 'dotenv';

// initiate evironment variables
const env = dotenv;
dotenv.config();

console.log('env: ', process.env.NODE_ENV);

module.exports = {
  env,
};
